import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

// Management team members who can access actions
const MANAGEMENT_TEAM = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];

/**
 * GET /api/actions
 * Get all action items (management team only)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify session
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user to check if they're on management team
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

    // Fetch all action items
    const actions = await prisma.actionItem.findMany({
      orderBy: { actionNumber: 'asc' },
      include: {
        responses: {
          select: {
            id: true,
            userId: true,
            completed: true,
            updatedAt: true
          }
        },
        consensus: {
          select: {
            resolved: true,
            resolvedAt: true
          }
        }
      }
    });

    return NextResponse.json({ actions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching actions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
