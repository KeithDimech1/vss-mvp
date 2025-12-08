import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PATCH /api/finance/tasks/[id] - Update a task
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, completedById, userNotes, userCompletedDate, subItems } = body;

    const updateData: any = {};

    // Update status
    if (status) {
      updateData.status = status;

      // If marking as completed, set completedAt and completedBy
      if (status === 'COMPLETED') {
        updateData.completedAt = new Date();
        if (completedById) {
          updateData.completedById = completedById;
        }
      }

      // If marking as anything other than completed, clear completion data
      if (status !== 'COMPLETED') {
        updateData.completedAt = null;
        updateData.completedById = null;
      }
    }

    // Update user notes
    if (userNotes !== undefined) {
      updateData.userNotes = userNotes;
    }

    // Update user completed date
    if (userCompletedDate !== undefined) {
      updateData.userCompletedDate = userCompletedDate ? new Date(userCompletedDate) : null;
    }

    // Update sub-items
    if (subItems !== undefined) {
      updateData.subItems = subItems;
    }

    const task = await prisma.financeTask.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        completedBy: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                fullName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error updating finance task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/finance/tasks/[id] - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.financeTask.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting finance task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
