import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateTasksForMonth } from '@/lib/finance/tasks';

const prisma = new PrismaClient();

// POST /api/finance/tasks/initialize - Initialize tasks for a specific month
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, month } = body;

    // Validate required fields
    if (!year || !month) {
      return NextResponse.json(
        { error: 'Missing required fields: year, month' },
        { status: 400 }
      );
    }

    // Find Kristy (or any finance user) to assign tasks to
    let kristy = await prisma.user.findFirst({
      where: {
        OR: [
          { username: 'kristy' },
          { fullName: { contains: 'Kristy', mode: 'insensitive' } },
        ],
      },
    });

    // If Kristy not found, get the first admin user
    if (!kristy) {
      kristy = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });
    }

    // If still no user found, create a system user
    if (!kristy) {
      kristy = await prisma.user.upsert({
        where: { username: 'system' },
        update: {},
        create: {
          username: 'system',
          passwordHash: 'not-used',
          fullName: 'System',
          role: 'ADMIN',
        },
      });
    }

    const assignedToId = kristy.id;
    const createdById = kristy.id;

    // Check if tasks already exist for this month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const existingTasks = await prisma.financeTask.findMany({
      where: {
        dueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    if (existingTasks.length > 0) {
      return NextResponse.json(
        {
          error: 'Tasks already exist for this month',
          existingCount: existingTasks.length,
          message: 'Use the reset endpoint to clear and regenerate tasks'
        },
        { status: 409 }
      );
    }

    // Generate tasks for the month
    const tasksData = generateTasksForMonth(
      year,
      month,
      assignedToId || createdById, // Default to creator if no assignee
      createdById
    );

    // Create tasks in database
    const createdTasks = await prisma.financeTask.createMany({
      data: tasksData.map(task => ({
        ...task,
        subItems: task.subItems || undefined,
      })),
    });

    // Fetch the created tasks with relations
    const tasks = await prisma.financeTask.findMany({
      where: {
        dueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
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
      },
      orderBy: [
        { dueDate: 'asc' },
        { priority: 'desc' },
      ],
    });

    return NextResponse.json({
      success: true,
      message: `Created ${createdTasks.count} tasks for ${year}-${month.toString().padStart(2, '0')}`,
      tasks,
    }, { status: 201 });

  } catch (error) {
    console.error('Error initializing finance tasks:', error);
    return NextResponse.json(
      { error: 'Failed to initialize tasks' },
      { status: 500 }
    );
  }
}
