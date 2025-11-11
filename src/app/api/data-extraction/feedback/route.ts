import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-here');

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

      // Fetch user from database to get username
      const dbUser = await prisma.user.findUnique({
        where: { id: user.userId },
        select: { username: true }
      });

      if (!dbUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Only Juan, Keith, and Fabian can access
      const allowedUsers = ['juan', 'keith', 'fabian'];
      if (!allowedUsers.includes(dbUser.username)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { processId, stepId, isCorrect, questionAnswers, comments, language } = body;

    if (!processId || !stepId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upsert feedback
    const feedback = await prisma.dataExtractionFeedback.upsert({
      where: {
        processId_userId_stepId: {
          processId,
          userId: user.userId,
          stepId
        }
      },
      update: {
        isCorrect,
        questionAnswers: questionAnswers || {},
        comments,
        language,
        updatedAt: new Date()
      },
      create: {
        processId,
        userId: user.userId,
        stepId,
        isCorrect,
        questionAnswers: questionAnswers || {},
        comments,
        language
      }
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error: any) {
    console.error('[DATA-EXTRACTION FEEDBACK API] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
