import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Verify admin session
    const session = await verifySession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Fetch all users
    const users = await prisma.user.findMany({
      orderBy: {
        fullName: 'asc'
      }
    });

    // Calculate statistics
    const totalUsers = users.length;
    const totalManagers = users.filter(u => u.isManager).length;
    const totalStaff = totalUsers - totalManagers;

    // Format user data for the frontend
    const userData = users.map(user => ({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      isManager: user.isManager,
      createdAt: user.createdAt.toISOString()
    }));

    return NextResponse.json({
      totalUsers,
      totalManagers,
      totalStaff,
      users: userData
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
