import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifySession } from '@/lib/auth';

const prisma = new PrismaClient();

const MANAGEMENT_TEAM = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];

type RouteContext = {
  params: Promise<{ actionId: string }>;
};

/**
 * GET /api/actions/[actionId]/team-responses
 * Get all team members' responses for an action (for comparison view)
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { username: true }
    });

    if (!user || !MANAGEMENT_TEAM.includes(user.username)) {
      return NextResponse.json(
        { error: 'Access denied - Management team only' },
        { status: 403 }
      );
    }

    const { actionId } = await context.params;

    // Check if action exists
    const action = await prisma.actionItem.findUnique({
      where: { id: actionId },
      select: { id: true, title: true }
    });

    if (!action) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Get all responses for this action with user info
    const responses = await prisma.actionResponse.findMany({
      where: {
        actionItemId: actionId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true
          }
        }
      },
      orderBy: {
        user: {
          username: 'asc'
        }
      }
    });

    // Get all management team users to show who hasn't responded
    const allManagementUsers = await prisma.user.findMany({
      where: {
        username: {
          in: MANAGEMENT_TEAM
        }
      },
      select: {
        id: true,
        username: true,
        fullName: true
      }
    });

    // Identify who hasn't responded yet
    const respondedUserIds = responses.map(r => r.userId);
    const nonRespondents = allManagementUsers.filter(
      u => !respondedUserIds.includes(u.id)
    );

    return NextResponse.json({
      action,
      responses,
      nonRespondents,
      totalResponses: responses.length,
      totalTeamMembers: MANAGEMENT_TEAM.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching team responses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
