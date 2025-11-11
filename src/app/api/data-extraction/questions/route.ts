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
    const { processId, responses, workspaceLinks, language } = body;

    if (!processId) {
      return NextResponse.json({ error: 'Missing processId' }, { status: 400 });
    }

    // Check if all required questions are answered
    const requiredQuestionsCount = Object.keys(responses).filter(k => responses[k] != null && responses[k] !== '').length;
    const completed = requiredQuestionsCount >= 15; // Adjust based on your actual required count

    // Upsert question responses
    const questionResponse = await prisma.dataExtractionQuestion.upsert({
      where: {
        processId_userId: {
          processId,
          userId: user.userId
        }
      },
      update: {
        responses,
        workspaceLinks: workspaceLinks || [],
        language,
        completed,
        submittedAt: completed ? new Date() : null,
        updatedAt: new Date()
      },
      create: {
        processId,
        userId: user.userId,
        responses,
        workspaceLinks: workspaceLinks || [],
        language,
        completed,
        submittedAt: completed ? new Date() : null
      }
    });

    return NextResponse.json({ success: true, questionResponse });
  } catch (error: any) {
    console.error('[DATA-EXTRACTION QUESTIONS API] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
