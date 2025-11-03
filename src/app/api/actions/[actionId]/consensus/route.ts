import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifySession } from '@/lib/auth';

const prisma = new PrismaClient();

const MANAGEMENT_TEAM = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];

type RouteContext = {
  params: Promise<{ actionId: string }>;
};

/**
 * GET /api/actions/[actionId]/consensus
 * Get the consensus data for an action
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

    // Find consensus data for this action
    const consensus = await prisma.actionConsensus.findUnique({
      where: { actionItemId: actionId }
    });

    return NextResponse.json({ consensus }, { status: 200 });
  } catch (error) {
    console.error('Error fetching consensus:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/actions/[actionId]/consensus
 * Create or update consensus data for an action
 */
export async function PUT(request: NextRequest, context: RouteContext) {
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
    const { consensusData, notes, resolved } = body;

    // Check if action exists
    const action = await prisma.actionItem.findUnique({
      where: { id: actionId }
    });

    if (!action) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Upsert consensus data (create if doesn't exist, update if it does)
    const consensus = await prisma.actionConsensus.upsert({
      where: { actionItemId: actionId },
      update: {
        consensusData,
        notes: notes || undefined,
        resolved: resolved !== undefined ? resolved : undefined,
        resolvedAt: resolved ? new Date() : undefined,
        resolvedBy: resolved ? session.userId : undefined,
        updatedAt: new Date()
      },
      create: {
        actionItemId: actionId,
        consensusData: consensusData || {},
        notes,
        resolved: resolved || false,
        resolvedAt: resolved ? new Date() : null,
        resolvedBy: resolved ? session.userId : null
      }
    });

    return NextResponse.json({ consensus }, { status: 200 });
  } catch (error) {
    console.error('Error updating consensus:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
