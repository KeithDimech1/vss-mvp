import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, username: true }
    });

    // Get ALL action responses for this user
    const userResponses = await prisma.actionResponse.findMany({
      where: { userId: session.userId },
      select: {
        id: true,
        actionItemId: true,
        userId: true,
        completed: true,
        updatedAt: true,
        actionItem: {
          select: {
            actionSlug: true,
            title: true
          }
        }
      }
    });

    // Get the lithosurfer action item
    const lithoSurferAction = await prisma.actionItem.findUnique({
      where: { actionSlug: 'lithosurfer' },
      select: { id: true, actionSlug: true, title: true }
    });

    // Try to find response for lithosurfer specifically
    let lithoSurferResponse = null;
    if (lithoSurferAction) {
      lithoSurferResponse = await prisma.actionResponse.findUnique({
        where: {
          actionItemId_userId: {
            actionItemId: lithoSurferAction.id,
            userId: session.userId
          }
        },
        select: {
          id: true,
          responses: true,
          completed: true
        }
      });
    }

    return NextResponse.json({
      debug: {
        sessionUserId: session.userId,
        currentUser: user,
        lithoSurferAction,
        lithoSurferResponse: lithoSurferResponse ? {
          id: lithoSurferResponse.id,
          hasResponses: !!lithoSurferResponse.responses,
          responseKeys: lithoSurferResponse.responses ? Object.keys(lithoSurferResponse.responses as object) : [],
          completed: lithoSurferResponse.completed
        } : null,
        allUserResponses: userResponses.map(r => ({
          actionItemId: r.actionItemId,
          actionSlug: r.actionItem?.actionSlug,
          actionTitle: r.actionItem?.title,
          completed: r.completed,
          updatedAt: r.updatedAt
        }))
      }
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
