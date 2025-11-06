import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

// GET /api/actions/[actionSlug]/response - Get user's response for an action
export async function GET(
  request: NextRequest,
  { params }: { params: { actionSlug: string } }
) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { actionSlug } = params;

    // Get the action item
    const actionItem = await prisma.actionItem.findUnique({
      where: { actionSlug },
    });

    if (!actionItem) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Get user's response
    const response = await prisma.actionResponse.findUnique({
      where: {
        actionItemId_userId: {
          actionItemId: actionItem.id,
          userId: session.userId,
        },
      },
    });

    if (!response) {
      // Return empty response structure if not found
      return NextResponse.json({
        exists: false,
        actionItem: {
          id: actionItem.id,
          title: actionItem.title,
          description: actionItem.description,
        },
      });
    }

    return NextResponse.json({
      exists: true,
      response: {
        id: response.id,
        responses: response.responses,
        completed: response.completed,
        submittedAt: response.submittedAt,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      },
      actionItem: {
        id: actionItem.id,
        title: actionItem.title,
        description: actionItem.description,
      },
    });
  } catch (error) {
    console.error('Error fetching action response:', error);
    return NextResponse.json(
      { error: 'Failed to fetch action response' },
      { status: 500 }
    );
  }
}

// POST /api/actions/[actionSlug]/response - Create new response
export async function POST(
  request: NextRequest,
  { params }: { params: { actionSlug: string } }
) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { actionSlug } = params;
    const body = await request.json();

    // Get the action item
    const actionItem = await prisma.actionItem.findUnique({
      where: { actionSlug },
    });

    if (!actionItem) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Create new response
    const response = await prisma.actionResponse.create({
      data: {
        actionItemId: actionItem.id,
        userId: session.userId,
        responses: body.responses || {},
        completed: false,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error creating action response:', error);
    return NextResponse.json(
      { error: 'Failed to create action response' },
      { status: 500 }
    );
  }
}

// PATCH /api/actions/[actionSlug]/response - Save draft (update existing)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { actionSlug: string } }
) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { actionSlug } = params;
    const body = await request.json();

    // Get the action item
    const actionItem = await prisma.actionItem.findUnique({
      where: { actionSlug },
    });

    if (!actionItem) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Update response (save draft)
    const response = await prisma.actionResponse.upsert({
      where: {
        actionItemId_userId: {
          actionItemId: actionItem.id,
          userId: session.userId,
        },
      },
      update: {
        responses: body.responses,
        updatedAt: new Date(),
      },
      create: {
        actionItemId: actionItem.id,
        userId: session.userId,
        responses: body.responses || {},
        completed: false,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error saving draft:', error);
    return NextResponse.json(
      { error: 'Failed to save draft' },
      { status: 500 }
    );
  }
}

// PUT /api/actions/[actionSlug]/response - Submit final response
export async function PUT(
  request: NextRequest,
  { params }: { params: { actionSlug: string } }
) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { actionSlug } = params;
    const body = await request.json();

    // Get the action item
    const actionItem = await prisma.actionItem.findUnique({
      where: { actionSlug },
    });

    if (!actionItem) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Submit final response
    const response = await prisma.actionResponse.upsert({
      where: {
        actionItemId_userId: {
          actionItemId: actionItem.id,
          userId: session.userId,
        },
      },
      update: {
        responses: body.responses,
        completed: true,
        submittedAt: new Date(),
        updatedAt: new Date(),
      },
      create: {
        actionItemId: actionItem.id,
        userId: session.userId,
        responses: body.responses || {},
        completed: true,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error submitting response:', error);
    return NextResponse.json(
      { error: 'Failed to submit response' },
      { status: 500 }
    );
  }
}
