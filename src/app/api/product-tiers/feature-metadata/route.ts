import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

interface FeatureMetadata {
  [featureId: string]: {
    description?: string;
    deleted?: boolean;
    phase2?: boolean;
  };
}

// GET /api/product-tiers/feature-metadata - Get feature metadata for a product
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productType = searchParams.get('productType');

    if (!productType) {
      return NextResponse.json(
        { error: 'productType is required' },
        { status: 400 }
      );
    }

    // Get enterprise tier to retrieve metadata
    const enterpriseTier = await prisma.productTierConfig.findUnique({
      where: {
        productType_tierName: {
          productType,
          tierName: 'ENTERPRISE'
        }
      },
      select: { restrictions: true }
    });

    let metadata: FeatureMetadata = {};

    if (enterpriseTier?.restrictions) {
      try {
        const parsed = JSON.parse(enterpriseTier.restrictions);
        if (parsed.featureMetadata) {
          metadata = parsed.featureMetadata;
        }
      } catch (e) {
        // Not JSON or doesn't have featureMetadata
      }
    }

    return NextResponse.json({ metadata });
  } catch (error) {
    console.error('Error fetching feature metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feature metadata' },
      { status: 500 }
    );
  }
}

// POST /api/product-tiers/feature-metadata - Save feature metadata
export async function POST(request: NextRequest) {
  try {
    // Verify session
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and check if manager
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, isManager: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (!user.isManager) {
      return NextResponse.json({ error: 'Only managers can edit feature metadata' }, { status: 403 });
    }

    const body = await request.json();
    const { productType, metadata } = body;

    if (!productType) {
      return NextResponse.json(
        { error: 'productType is required' },
        { status: 400 }
      );
    }

    // Get existing enterprise tier to preserve other data
    const existingTier = await prisma.productTierConfig.findUnique({
      where: {
        productType_tierName: {
          productType,
          tierName: 'ENTERPRISE'
        }
      },
      select: { restrictions: true }
    });

    let restrictionsObj: Record<string, unknown> = {};
    if (existingTier?.restrictions) {
      try {
        restrictionsObj = JSON.parse(existingTier.restrictions);
      } catch (e) {
        // Keep as empty object
      }
    }

    // Update with new metadata
    restrictionsObj.featureMetadata = metadata;

    // Store in ENTERPRISE tier
    await prisma.productTierConfig.upsert({
      where: {
        productType_tierName: {
          productType,
          tierName: 'ENTERPRISE'
        }
      },
      update: {
        restrictions: JSON.stringify(restrictionsObj),
        lastEditedBy: user.id,
        lastEditedAt: new Date()
      },
      create: {
        productType,
        tierName: 'ENTERPRISE',
        featuresIn: [],
        featuresOut: [],
        restrictions: JSON.stringify(restrictionsObj),
        lastEditedBy: user.id,
        lastEditedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Feature metadata saved successfully'
    });
  } catch (error) {
    console.error('Error saving feature metadata:', error);
    return NextResponse.json(
      { error: 'Failed to save feature metadata' },
      { status: 500 }
    );
  }
}
