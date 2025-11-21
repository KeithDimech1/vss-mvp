import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

/**
 * GET /api/hr-action-items/[id]
 *
 * Fetch a specific HR action item
 * Requires manager authentication
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params
    const { id } = await params;

    // Fetch action item
    const actionItem = await prisma.hRActionItem.findUnique({
      where: { id },
      include: {
        employee: {
          select: {
            id: true,
            username: true,
            fullName: true,
            isManager: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            username: true,
            fullName: true,
            isManager: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        interviewNote: {
          select: {
            id: true,
            interviewDate: true,
            interviewType: true,
          },
        },
      },
    });

    if (!actionItem) {
      return NextResponse.json(
        { error: 'Action item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ actionItem });
  } catch (error) {
    console.error('Error fetching HR action item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/hr-action-items/[id]
 *
 * Update an existing HR action item
 * Requires manager authentication
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params
    const { id } = await params;

    // Parse request body
    const body = await request.json();
    const {
      description,
      assignedToId,
      dueDate,
      status,
      priority,
      notes,
    } = body;

    // Build update data
    const updateData: any = {};

    if (description !== undefined) updateData.description = description;
    if (assignedToId !== undefined) updateData.assignedToId = assignedToId;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;

    // If status is being changed to COMPLETED, set completedAt
    if (status === 'COMPLETED') {
      updateData.completedAt = new Date();
    } else if (status && status !== 'COMPLETED') {
      updateData.completedAt = null;
    }

    // Update action item
    const actionItem = await prisma.hRActionItem.update({
      where: { id },
      data: updateData,
      include: {
        employee: {
          select: {
            id: true,
            username: true,
            fullName: true,
            isManager: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            username: true,
            fullName: true,
            isManager: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
    });

    return NextResponse.json({ actionItem });
  } catch (error) {
    console.error('Error updating HR action item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/hr-action-items/[id]
 *
 * Delete an HR action item
 * Requires manager authentication
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params
    const { id } = await params;

    // Delete action item
    await prisma.hRActionItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Action item deleted successfully' });
  } catch (error) {
    console.error('Error deleting HR action item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
