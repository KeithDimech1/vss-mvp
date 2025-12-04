import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';
import { TierName } from '@/lib/lithosurfer-features';

// GET /api/product-tiers/feature-assignments - Get feature assignments for a product
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
        featuresIn: true
      }
    });

    // Build assignments map from tier configs
    const assignments: Record<string, TierName> = {};

    for (const tier of tiers) {
      const tierName = tier.tierName.toLowerCase() as TierName;
      const features = tier.featuresIn as string[];

      if (features && Array.isArray(features)) {
        for (const featureId of features) {
          assignments[featureId] = tierName;
        }
      }
    }

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('Error fetching feature assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feature assignments' },
      { status: 500 }
    );
  }
}

// POST /api/product-tiers/feature-assignments - Save feature assignments
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
      return NextResponse.json({ error: 'Only managers can edit feature assignments' }, { status: 403 });
    }

    const body = await request.json();
    const { productType, assignments } = body;

    if (!productType || !assignments) {
      return NextResponse.json(
        { error: 'productType and assignments are required' },
        { status: 400 }
      );
    }

    // Group features by tier
    const featuresByTier: Record<string, string[]> = {
      free: [],
      pro: [],
      enterprise: []
    };

    for (const [featureId, tier] of Object.entries(assignments)) {
      if (tier && tier !== 'unassigned' && featuresByTier[tier as string]) {
        featuresByTier[tier as string].push(featureId);
      }
    }

    // Update each tier's featuresIn array
    const updates = await Promise.all(
      Object.entries(featuresByTier).map(([tierName, features]) =>
        prisma.productTierConfig.upsert({
          where: {
            productType_tierName: {
              productType,
              tierName: tierName.toUpperCase()
            }
          },
          update: {
            featuresIn: features,
            lastEditedBy: user.id,
            lastEditedAt: new Date()
          },
          create: {
            productType,
            tierName: tierName.toUpperCase(),
            featuresIn: features,
            featuresOut: [],
            lastEditedBy: user.id,
            lastEditedAt: new Date()
          }
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: 'Feature assignments saved successfully',
      updatedTiers: updates.length
    });
  } catch (error) {
    console.error('Error saving feature assignments:', error);
    return NextResponse.json(
      { error: 'Failed to save feature assignments' },
      { status: 500 }
    );
  }
}
