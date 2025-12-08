import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/finance/checklist?month=2025-12-01
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const monthParam = searchParams.get('month');

    if (!monthParam) {
      return NextResponse.json({ error: 'Month parameter required' }, { status: 400 });
    }

    const month = new Date(monthParam);
    month.setUTCHours(0, 0, 0, 0);

    const checklist = await prisma.financeChecklist.findUnique({
      where: { month },
    });

    return NextResponse.json({
      data: checklist?.data || {},
      month: monthParam,
    });
  } catch (error) {
    console.error('Error fetching finance checklist:', error);
    return NextResponse.json({ error: 'Failed to fetch checklist' }, { status: 500 });
  }
}

// POST /api/finance/checklist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { month, data } = body;

    if (!month || !data) {
      return NextResponse.json({ error: 'Month and data required' }, { status: 400 });
    }

    const monthDate = new Date(month);
    monthDate.setUTCHours(0, 0, 0, 0);

    const checklist = await prisma.financeChecklist.upsert({
      where: { month: monthDate },
      update: { data },
      create: { month: monthDate, data },
    });

    return NextResponse.json({ success: true, data: checklist.data });
  } catch (error) {
    console.error('Error saving finance checklist:', error);
    return NextResponse.json({ error: 'Failed to save checklist' }, { status: 500 });
  }
}
