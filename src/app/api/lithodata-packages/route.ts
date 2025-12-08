import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

// Default packages to seed if none exist
// Thermochronology = FT (67,870) + HE (15,208) + VITRINITE (22,192) + Ar-Ar (874) + TH (6,581) = 112,725
// Geochronology = U-Pb (20,067) only
// Geochemistry = GC (292,612) + ISO (32,656) = 325,268
const defaultPackages = [
  // Thermochronology (FT + HE + Vitrinite + Ar-Ar + Th)
  { packageId: 'thermo-global', category: 'Thermochronology', region: 'Global', regionCode: 'GLOBAL', records: 112725 },
  { packageId: 'thermo-afr', category: 'Thermochronology', region: 'Africa', regionCode: 'AFR', records: 6888 },    // 5521+1278+1+23+64
  { packageId: 'thermo-ant', category: 'Thermochronology', region: 'Antarctica', regionCode: 'ANT', records: 1317 }, // 758+122+0+435+2
  { packageId: 'thermo-ara', category: 'Thermochronology', region: 'Arabia', regionCode: 'ARA', records: 1952 },    // 1670+270+0+0+12
  { packageId: 'thermo-asi', category: 'Thermochronology', region: 'Asia', regionCode: 'ASI', records: 17092 },     // 12405+4645+0+10+32
  { packageId: 'thermo-cas', category: 'Thermochronology', region: 'Central Asia', regionCode: 'CAS', records: 2796 }, // 2228+550+0+2+18
  { packageId: 'thermo-eur', category: 'Thermochronology', region: 'Europe', regionCode: 'EUR', records: 13104 },   // 11937+639+502+286+26
  { packageId: 'thermo-nam', category: 'Thermochronology', region: 'North America', regionCode: 'NAM', records: 36726 }, // 11752+3599+21245+0+130
  { packageId: 'thermo-oce', category: 'Thermochronology', region: 'Oceania', regionCode: 'OCE', records: 12196 },  // 11394+554+444+0+248
  { packageId: 'thermo-sam', category: 'Thermochronology', region: 'South America', regionCode: 'SAM', records: 13927 }, // 9837+3356+0+0+734
  // Geochronology (U-Pb only)
  { packageId: 'geochron-global', category: 'Geochronology', region: 'Global', regionCode: 'GLOBAL', records: 20067 },
  { packageId: 'geochron-afr', category: 'Geochronology', region: 'Africa', regionCode: 'AFR', records: 297 },
  { packageId: 'geochron-ant', category: 'Geochronology', region: 'Antarctica', regionCode: 'ANT', records: 27 },
  { packageId: 'geochron-ara', category: 'Geochronology', region: 'Arabia', regionCode: 'ARA', records: 8 },
  { packageId: 'geochron-asi', category: 'Geochronology', region: 'Asia', regionCode: 'ASI', records: 852 },
  { packageId: 'geochron-cas', category: 'Geochronology', region: 'Central Asia', regionCode: 'CAS', records: 34 },
  { packageId: 'geochron-eur', category: 'Geochronology', region: 'Europe', regionCode: 'EUR', records: 100 },
  { packageId: 'geochron-nam', category: 'Geochronology', region: 'North America', regionCode: 'NAM', records: 11068 },
  { packageId: 'geochron-oce', category: 'Geochronology', region: 'Oceania', regionCode: 'OCE', records: 7384 },
  { packageId: 'geochron-sam', category: 'Geochronology', region: 'South America', regionCode: 'SAM', records: 241 },
  // Geochemistry (GC + ISO)
  { packageId: 'geochem-global', category: 'Geochemistry', region: 'Global', regionCode: 'GLOBAL', records: 325268 },
  { packageId: 'geochem-afr', category: 'Geochemistry', region: 'Africa', regionCode: 'AFR', records: 1364 },
  { packageId: 'geochem-ant', category: 'Geochemistry', region: 'Antarctica', regionCode: 'ANT', records: 1019 },
  { packageId: 'geochem-ara', category: 'Geochemistry', region: 'Arabia', regionCode: 'ARA', records: 68960 },
  { packageId: 'geochem-asi', category: 'Geochemistry', region: 'Asia', regionCode: 'ASI', records: 773 },
  { packageId: 'geochem-cas', category: 'Geochemistry', region: 'Central Asia', regionCode: 'CAS', records: 1731 },
  { packageId: 'geochem-eur', category: 'Geochemistry', region: 'Europe', regionCode: 'EUR', records: 205 },
  { packageId: 'geochem-nam', category: 'Geochemistry', region: 'North America', regionCode: 'NAM', records: 105677 },
  { packageId: 'geochem-oce', category: 'Geochemistry', region: 'Oceania', regionCode: 'OCE', records: 141614 },
  { packageId: 'geochem-sam', category: 'Geochemistry', region: 'South America', regionCode: 'SAM', records: 319 },
];

// GET - Fetch all packages
export async function GET() {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if packages exist, seed if not
    const count = await prisma.lithoDataPackage.count();
    if (count === 0) {
      await prisma.lithoDataPackage.createMany({
        data: defaultPackages.map(pkg => ({
          ...pkg,
          isAvailable: true,
          isFree: false,
        })),
      });
    }

    const packages = await prisma.lithoDataPackage.findMany({
      orderBy: [
        { category: 'asc' },
        { regionCode: 'asc' },
      ],
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Update package pricing
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if manager
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { isManager: true },
    });

    if (!user?.isManager) {
      return NextResponse.json({ error: 'Only managers can edit pricing' }, { status: 403 });
    }

    const body = await request.json();
    const { packageId, priceAnnual, priceOneTime, priceNotes, isAvailable, isFree } = body;

    if (!packageId) {
      return NextResponse.json({ error: 'Package ID required' }, { status: 400 });
    }

    const updated = await prisma.lithoDataPackage.update({
      where: { packageId },
      data: {
        priceAnnual: priceAnnual !== undefined ? priceAnnual : undefined,
        priceOneTime: priceOneTime !== undefined ? priceOneTime : undefined,
        priceNotes: priceNotes !== undefined ? priceNotes : undefined,
        isAvailable: isAvailable !== undefined ? isAvailable : undefined,
        isFree: isFree !== undefined ? isFree : undefined,
        lastEditedBy: session.userId,
        lastEditedAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Bulk update packages
export async function PUT(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if manager
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { isManager: true },
    });

    if (!user?.isManager) {
      return NextResponse.json({ error: 'Only managers can edit pricing' }, { status: 403 });
    }

    const body = await request.json();
    const { packages } = body;

    if (!Array.isArray(packages)) {
      return NextResponse.json({ error: 'Packages array required' }, { status: 400 });
    }

    // Update each package
    const updates = await Promise.all(
      packages.map((pkg: {
        packageId: string;
        priceAnnual?: number | null;
        priceOneTime?: number | null;
        priceNotes?: string | null;
        isAvailable?: boolean;
        isFree?: boolean;
      }) =>
        prisma.lithoDataPackage.update({
          where: { packageId: pkg.packageId },
          data: {
            priceAnnual: pkg.priceAnnual,
            priceOneTime: pkg.priceOneTime,
            priceNotes: pkg.priceNotes,
            isAvailable: pkg.isAvailable,
            isFree: pkg.isFree,
            lastEditedBy: session.userId,
            lastEditedAt: new Date(),
          },
        })
      )
    );

    return NextResponse.json({ updated: updates.length });
  } catch (error) {
    console.error('Error bulk updating packages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
