import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifySession } from '@/lib/auth';

const prisma = new PrismaClient();

const MANAGEMENT_TEAM = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];

type RouteContext = {
  params: Promise<{ actionId: string }>;
};

/**
 * GET /api/actions/[actionId]/responses
 * Get the current user's response for an action
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

    // Find existing response for this user and action
    const response = await prisma.actionResponse.findUnique({
      where: {
        actionItemId_userId: {
          actionItemId: actionId,
          userId: session.userId
        }
      }
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error('Error fetching action response:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/actions/[actionId]/responses
 * Create a new response for an action (initial save)
 */
export async function POST(request: NextRequest, context: RouteContext) {
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
    const body = await request.json();
    const { responses, completed = false } = body;

    // Check if action exists
    const action = await prisma.actionItem.findUnique({
      where: { id: actionId }
    });

    if (!action) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Create new response
    const response = await prisma.actionResponse.create({
      data: {
        actionItemId: actionId,
        userId: session.userId,
        responses: responses || {},
        completed,
        submittedAt: completed ? new Date() : null
      }
    });

    return NextResponse.json({ response }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating action response:', error);

    // Handle unique constraint violation (response already exists)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Response already exists. Use PATCH to update.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/actions/[actionId]/responses
 * Update an existing response (always allowed - no version history needed)
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
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
    const body = await request.json();
    const { responses, completed } = body;

    // Update existing response
    const response = await prisma.actionResponse.update({
      where: {
        actionItemId_userId: {
          actionItemId: actionId,
          userId: session.userId
        }
      },
      data: {
        responses: responses,
        completed: completed !== undefined ? completed : undefined,
        submittedAt: completed ? new Date() : undefined,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating action response:', error);

    // Handle not found error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Response not found. Use POST to create.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
