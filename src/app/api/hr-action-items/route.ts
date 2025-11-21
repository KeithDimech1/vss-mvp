import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

/**
 * GET /api/hr-action-items
 *
 * Fetch HR action items with optional filtering
 * Requires manager authentication
 *
 * Query params:
 * - employeeId: Filter by employee (optional)
 * - assignedToId: Filter by assigned manager (optional)
 * - status: Filter by status (optional)
 * - interviewNoteId: Filter by interview note (optional)
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
    const employeeId = searchParams.get('employeeId');
    const assignedToId = searchParams.get('assignedToId');
    const status = searchParams.get('status');
    const interviewNoteId = searchParams.get('interviewNoteId');

    // Build filter condition
    const where: any = {};

    if (employeeId) {
      where.employeeId = employeeId;
    }

    if (assignedToId) {
      where.assignedToId = assignedToId;
    }

    if (status) {
      where.status = status;
    }

    if (interviewNoteId) {
      where.interviewNoteId = interviewNoteId;
    }

    // Fetch action items
    const actionItems = await prisma.hRActionItem.findMany({
      where,
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
      orderBy: [
        { status: 'asc' }, // PENDING first
        { priority: 'desc' }, // URGENT first
        { dueDate: 'asc' }, // Soonest first
      ],
    });

    return NextResponse.json({ actionItems });
  } catch (error) {
    console.error('Error fetching HR action items:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/hr-action-items
 *
 * Create a new HR action item
 * Requires manager authentication
 */
export async function POST(request: NextRequest) {
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

    // Parse request body
    const body = await request.json();
    const {
      description,
      employeeId,
      assignedToId,
      interviewNoteId,
      dueDate,
      status,
      priority,
      notes,
    } = body;

    // Validate required fields
    if (!description || !employeeId) {
      return NextResponse.json(
        { error: 'Missing required fields: description and employeeId' },
        { status: 400 }
      );
    }

    // Create action item
    const actionItem = await prisma.hRActionItem.create({
      data: {
        description,
        employeeId,
        assignedToId: assignedToId || null,
        interviewNoteId: interviewNoteId || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: status || 'PENDING',
        priority: priority || 'MEDIUM',
        notes: notes || null,
        createdById: session.userId,
      },
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

    return NextResponse.json({ actionItem }, { status: 201 });
  } catch (error) {
    console.error('Error creating HR action item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
