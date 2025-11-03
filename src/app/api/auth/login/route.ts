import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession } from '@/lib/auth';

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('[LOGIN] Starting login request');

    const body = await request.json();
    const { username, password } = body;
    console.log('[LOGIN] Received username:', username);

    // Validate input
    if (!username || !password) {
      console.log('[LOGIN] Missing username or password');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    console.log('[LOGIN] Querying database for user:', username);
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log('[LOGIN] User not found:', username);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    console.log('[LOGIN] User found, verifying password');
    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    console.log('[LOGIN] Password valid:', isValidPassword);

    if (!isValidPassword) {
      console.log('[LOGIN] Invalid password for user:', username);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    console.log('[LOGIN] Creating session for user:', user.id);
    // Create JWT session (sets cookie automatically)
    await createSession(user.id, user.role);

    console.log('[LOGIN] Login successful for user:', username);
    // Return success with user data (without sensitive information)
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[LOGIN] ERROR:', error);
    console.error('[LOGIN] Error name:', error?.name);
    console.error('[LOGIN] Error message:', error?.message);
    console.error('[LOGIN] Error stack:', error?.stack);
    console.error('[LOGIN] Error code:', error?.code);

    return NextResponse.json(
      {
        error: 'An error occurred during login',
        details: error?.message,
        name: error?.name,
        code: error?.code
      },
      { status: 500 }
    );
  }
}
