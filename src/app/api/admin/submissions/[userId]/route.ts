import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Verify admin session
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const session = await verifySession(token);
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Get userId from params
    const { userId } = await params;

    // Fetch user with their completed assessment
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        assessments: {
          where: { completed: true },
          orderBy: { submittedAt: 'desc' },
          take: 1
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.assessments.length || !user.assessments[0].completed) {
      return NextResponse.json(
        { error: 'No completed assessment found for this user' },
        { status: 404 }
      );
    }

    const assessment = user.assessments[0];

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role
      },
      assessment: {
        id: assessment.id,
        completed: assessment.completed,
        submittedAt: assessment.submittedAt?.toISOString(),
        responses: assessment.responses as Record<string, string>
      }
    });

  } catch (error) {
    console.error('Error fetching user submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}
