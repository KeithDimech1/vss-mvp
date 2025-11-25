import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

// GET /api/product-tiers - Get all tier configs or filter by productType
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productType = searchParams.get('productType');

    const where = productType ? { productType } : {};

    const tiers = await prisma.productTierConfig.findMany({
      where,
      orderBy: [
        { productType: 'asc' },
        { tierName: 'asc' }
      ]
    });

    return NextResponse.json(tiers);
  } catch (error) {
    console.error('Error fetching product tiers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product tiers' },
      { status: 500 }
    );
  }
}

// POST /api/product-tiers - Create or update tier config (upsert)
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
      return NextResponse.json({ error: 'Only managers can edit tier configurations' }, { status: 403 });
    }

    const body = await request.json();
    const {
      productType,
      tierName,
      price,
      priceNote,
      target,
      source,
      featuresIn,
      featuresOut,
      restrictions,
      keyDifferentiator
    } = body;

    if (!productType || !tierName) {
      return NextResponse.json(
        { error: 'productType and tierName are required' },
        { status: 400 }
      );
    }

    // Upsert the tier config
    const tier = await prisma.productTierConfig.upsert({
      where: {
        productType_tierName: {
          productType,
          tierName
        }
      },
      update: {
        price,
        priceNote,
        target,
        source,
        featuresIn: featuresIn || [],
        featuresOut: featuresOut || [],
        restrictions,
        keyDifferentiator,
        lastEditedBy: user.id,
        lastEditedAt: new Date()
      },
      create: {
        productType,
        tierName,
        price,
        priceNote,
        target,
        source,
        featuresIn: featuresIn || [],
        featuresOut: featuresOut || [],
        restrictions,
        keyDifferentiator,
        lastEditedBy: user.id,
        lastEditedAt: new Date()
      }
    });

    return NextResponse.json(tier);
  } catch (error) {
    console.error('Error saving product tier:', error);
    return NextResponse.json(
      { error: 'Failed to save product tier' },
      { status: 500 }
    );
  }
}
