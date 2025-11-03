import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    console.log('[SESSION API] User fetched from database:', {
      username: user?.username,
      isManager: user?.isManager,
      isManagerType: typeof user?.isManager,
      fullUser: user
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    const response = { user };
    console.log('[SESSION API] Returning response:', JSON.stringify(response, null, 2));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    );
  }
}
