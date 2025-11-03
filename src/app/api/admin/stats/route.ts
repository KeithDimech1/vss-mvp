import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Verify admin session
    const session = await verifySession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Fetch all users with their assessments
    const users = await prisma.user.findMany({
      include: {
        assessments: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1  // Get the most recent assessment for each user
        }
      },
      orderBy: {
        fullName: 'asc'
      }
    });

    // Calculate statistics
    const totalUsers = users.length;
    const assessmentsStarted = users.filter(u => u.assessments.length > 0).length;
    const assessmentsCompleted = users.filter(
      u => u.assessments.length > 0 && u.assessments[0].completed
    ).length;
    const completionRate = totalUsers > 0
      ? Math.round((assessmentsCompleted / totalUsers) * 100)
      : 0;

    // Format user data for the frontend
    const userData = users.map(user => ({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role
      },
      assessment: user.assessments.length > 0 ? {
        id: user.assessments[0].id,
        completed: user.assessments[0].completed,
        submittedAt: user.assessments[0].submittedAt?.toISOString() || null,
        responses: user.assessments[0].responses as Record<string, string>
      } : null
    }));

    return NextResponse.json({
      totalUsers,
      assessmentsStarted,
      assessmentsCompleted,
      completionRate,
      users: userData
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
