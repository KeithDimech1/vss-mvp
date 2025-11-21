import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/finance/metrics - Get metrics for a specific month
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get('month'); // Format: YYYY-MM-01

    // Default to current month if not provided
    const targetMonth = month
      ? new Date(month)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    // Get the most recent metric for the target month
    const metric = await prisma.financeMetric.findFirst({
      where: {
        month: targetMonth,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate readiness score
    let readinessScore = 0;
    if (metric) {
      const dextScore = metric.dextTotal > 0
        ? (metric.dextPublished / metric.dextTotal) * 25
        : 25;

      const reconScore = metric.unreconciledLines === 0
        ? 25
        : Math.max(0, 25 - (metric.unreconciledOld * 2));

      const billsScore = metric.billsDueThisWeek > 0
        ? (metric.billsPaid / metric.billsDueThisWeek) * 25
        : 25;

      const payrollScore = metric.payrollCompleted ? 25 : 0;

      readinessScore = Math.round(dextScore + reconScore + billsScore + payrollScore);
    }

    return NextResponse.json({
      metric,
      readinessScore,
    });
  } catch (error) {
    console.error('Error fetching finance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

// POST /api/finance/metrics - Create or update metrics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      month,
      dextPublished,
      dextTotal,
      unreconciledLines,
      unreconciledOld,
      billsPaid,
      billsDueThisWeek,
      payrollCompleted,
    } = body;

    // Validate required fields
    if (!month) {
      return NextResponse.json(
        { error: 'Month is required' },
        { status: 400 }
      );
    }

    const targetMonth = new Date(month);

    // Create new metric entry
    const metric = await prisma.financeMetric.create({
      data: {
        month: targetMonth,
        dextPublished: dextPublished ?? 0,
        dextTotal: dextTotal ?? 0,
        unreconciledLines: unreconciledLines ?? 0,
        unreconciledOld: unreconciledOld ?? 0,
        billsPaid: billsPaid ?? 0,
        billsDueThisWeek: billsDueThisWeek ?? 0,
        payrollCompleted: payrollCompleted ?? false,
      },
    });

    // Calculate readiness score
    const dextScore = metric.dextTotal > 0
      ? (metric.dextPublished / metric.dextTotal) * 25
      : 25;

    const reconScore = metric.unreconciledLines === 0
      ? 25
      : Math.max(0, 25 - (metric.unreconciledOld * 2));

    const billsScore = metric.billsDueThisWeek > 0
      ? (metric.billsPaid / metric.billsDueThisWeek) * 25
      : 25;

    const payrollScore = metric.payrollCompleted ? 25 : 0;

    const readinessScore = Math.round(dextScore + reconScore + billsScore + payrollScore);

    return NextResponse.json({
      metric,
      readinessScore,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating finance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to create metrics' },
      { status: 500 }
    );
  }
}
