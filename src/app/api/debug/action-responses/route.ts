import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

/**
 * DEBUG ENDPOINT - Get detailed info about action responses
 * GET /api/debug/action-responses?actionSlug=lithosurfer
 */
export async function GET(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const actionSlug = searchParams.get('actionSlug') || 'lithosurfer';

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, username: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get action item
    const actionItem = await prisma.actionItem.findUnique({
      where: { actionSlug }
    });

    if (!actionItem) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Get existing response
    const existingResponse = await prisma.actionResponse.findUnique({
      where: {
        actionItemId_userId: {
          actionItemId: actionItem.id,
          userId: user.id
        }
      },
      select: {
        responses: true,
        completed: true,
        submittedAt: true,
        updatedAt: true
      }
    });

    // Convert Prisma Json type to plain JavaScript object
    let initialResponses = existingResponse?.responses
      ? JSON.parse(JSON.stringify(existingResponse.responses))
      : {};

    return NextResponse.json({
      debug: {
        user: user.username,
        userId: user.id,
        actionSlug,
        actionItemId: actionItem.id,
        foundResponse: !!existingResponse,
        responseCompleted: existingResponse?.completed,
        responseSubmittedAt: existingResponse?.submittedAt,
        responseUpdatedAt: existingResponse?.updatedAt,
        rawResponsesType: typeof existingResponse?.responses,
        rawResponsesKeys: existingResponse?.responses ? Object.keys(existingResponse.responses as any) : [],
        initialResponsesType: typeof initialResponses,
        initialResponsesKeys: Object.keys(initialResponses),
        initialResponsesCount: Object.keys(initialResponses).length
      },
      data: {
        existingResponse,
        initialResponses
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
