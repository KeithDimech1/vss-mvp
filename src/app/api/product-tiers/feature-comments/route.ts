import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

interface FeatureComments {
  [featureId: string]: {
    suggestion?: string;
    development?: string;
  };
}

// GET /api/product-tiers/feature-comments - Get feature comments for a product
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

    // Get all tier configs for this product type
    const tiers = await prisma.productTierConfig.findMany({
      where: { productType },
      select: {
        tierName: true,
        restrictions: true // We'll store comments in restrictions as JSON
      }
    });

    // Build comments map from tier configs
    // We store comments in the ENTERPRISE tier's restrictions field as JSON
    const enterpriseTier = tiers.find(t => t.tierName === 'ENTERPRISE');
    let comments: FeatureComments = {};

    if (enterpriseTier?.restrictions) {
      try {
        const parsed = JSON.parse(enterpriseTier.restrictions);
        if (parsed.featureComments) {
          comments = parsed.featureComments;
        }
      } catch (e) {
        // Not JSON or doesn't have featureComments
      }
    }

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching feature comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feature comments' },
      { status: 500 }
    );
  }
}

// POST /api/product-tiers/feature-comments - Save feature comments
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
      return NextResponse.json({ error: 'Only managers can edit feature comments' }, { status: 403 });
    }

    const body = await request.json();
    const { productType, comments } = body;

    if (!productType) {
      return NextResponse.json(
        { error: 'productType is required' },
        { status: 400 }
      );
    }

    // Get existing enterprise tier to preserve other restrictions
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

    // Update with new comments
    restrictionsObj.featureComments = comments;

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
      message: 'Feature comments saved successfully'
    });
  } catch (error) {
    console.error('Error saving feature comments:', error);
    return NextResponse.json(
      { error: 'Failed to save feature comments' },
      { status: 500 }
    );
  }
}
