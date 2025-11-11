import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'vss-secret-key-change-in-production-2025');

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const token = request.cookies.get('auth-token');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user: { userId: string; role: string };
    try {
      const { payload } = await jwtVerify(token.value, JWT_SECRET);
      user = payload as { userId: string; role: string };
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = user.userId;

    // Parse request body
    const body = await request.json();
    const { processId, answers, language } = body;

    if (!processId || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save research answers to database
    // Using upsert to either create new or update existing record
    const researchAnswers = await prisma.dataExtractionResearch.upsert({
      where: {
        userId_processId: {
          userId,
          processId,
        },
      },
      update: {
        answers,
        language: language || 'en',
        updatedAt: new Date(),
      },
      create: {
        userId,
        processId,
        answers,
        language: language || 'en',
      },
    });

    return NextResponse.json({
      success: true,
      data: researchAnswers,
    });

  } catch (error) {
    console.error('[RESEARCH API] Error saving research answers:', error);
    return NextResponse.json(
      { error: 'Failed to save research answers' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Auth check
    const token = request.cookies.get('auth-token');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user: { userId: string; role: string };
    try {
      const { payload } = await jwtVerify(token.value, JWT_SECRET);
      user = payload as { userId: string; role: string };
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = user.userId;

    // Get processId from query params
    const { searchParams } = new URL(request.url);
    const processId = searchParams.get('processId');

    if (!processId) {
      return NextResponse.json({ error: 'Missing processId' }, { status: 400 });
    }

    // Fetch research answers from database
    const researchAnswers = await prisma.dataExtractionResearch.findUnique({
      where: {
        userId_processId: {
          userId,
          processId,
        },
      },
    });

    if (!researchAnswers) {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      data: researchAnswers,
    });

  } catch (error) {
    console.error('[RESEARCH API] Error fetching research answers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research answers' },
      { status: 500 }
    );
  }
}
