import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

/**
 * GET /api/hr-review
 *
 * Fetch HR review data with optional filtering by employee
 * Requires manager authentication
 *
 * Query params:
 * - userId: Filter by specific user ID (optional)
 * - username: Filter by username (optional)
 * - section: Which section to return (feedback|goals|interviews|all, default: all)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await verifySession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Get user details to check if they are a manager
    const authUser = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        role: true,
        isManager: true,
      },
    });

    if (!authUser || (!authUser.isManager && authUser.role !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Forbidden - Manager access required' },
        { status: 403 }
      );
    }

    // Parse query params
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const username = searchParams.get('username');
    const managerId = searchParams.get('managerId');
    const section = searchParams.get('section') || 'all';

    // Build filter condition
    let userFilter: any = {};
    let userIdList: string[] | undefined;

    if (managerId) {
      // Get all employees managed by this manager
      const managedEmployees = await prisma.userManager.findMany({
        where: { managerId },
        select: { employeeId: true },
      });
      userIdList = managedEmployees.map(e => e.employeeId);

      if (userIdList.length > 0) {
        userFilter = { id: { in: userIdList } };
      } else {
        // Manager has no employees, return empty results
        userFilter = { id: 'none' };
      }
    } else if (userId) {
      userFilter = { id: userId };
    } else if (username) {
      userFilter = { username };
    }

    // Fetch data based on section
    let data: any = {};

    if (section === 'feedback' || section === 'all') {
      const feedbackSurveys = await prisma.hRFeedbackSurvey.findMany({
        where: userFilter.hasOwnProperty('id') || userFilter.hasOwnProperty('username')
          ? { user: userFilter }
          : undefined,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              fullName: true,
              email: true,
              isManager: true,
            },
          },
        },
        orderBy: { timestamp: 'desc' },
      });

      data.feedbackSurveys = feedbackSurveys;
    }

    if (section === 'goals' || section === 'all') {
      const goalSettings = await prisma.hRGoalSetting.findMany({
        where: userFilter.hasOwnProperty('id') || userFilter.hasOwnProperty('username')
          ? { user: userFilter }
          : undefined,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              fullName: true,
              email: true,
              isManager: true,
            },
          },
        },
        orderBy: { timestamp: 'desc' },
      });

      data.goalSettings = goalSettings;
    }

    if (section === 'interviews' || section === 'all') {
      const interviewNotes = await prisma.hRInterviewNote.findMany({
        where: userFilter.hasOwnProperty('id') || userFilter.hasOwnProperty('username')
          ? { user: userFilter }
          : undefined,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              fullName: true,
              email: true,
              isManager: true,
            },
          },
        },
        orderBy: { interviewDate: 'desc' },
      });

      data.interviewNotes = interviewNotes;
    }

    // If filtering by user, also return summary statistics
    if (userId || username) {
      const user = await prisma.user.findUnique({
        where: userFilter,
        select: {
          id: true,
          username: true,
          fullName: true,
          email: true,
          role: true,
          isManager: true,
        },
      });

      data.user = user;
    }

    // Get all users for the filter dropdown
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        fullName: true,
        isManager: true,
      },
      orderBy: { fullName: 'asc' },
    });

    data.allUsers = allUsers;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching HR review data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
