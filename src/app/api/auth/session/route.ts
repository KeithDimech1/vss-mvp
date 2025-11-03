import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get JWT session
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'No session found' },
        { status: 401 }
      );
    }

    // Fetch full user data from database
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        isManager: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    );
  }
}
