/**
 * Server-side authentication utilities
 * For use in Server Components, Server Actions, and API Routes
 */

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from './prisma';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vss-secret-key-change-in-production-2025'
);

export interface SessionUser {
  id: string;
  username: string;
  fullName: string;
  role: string;
  isManager: boolean;
}

export interface AuthResult {
  isAuthenticated: boolean;
  user?: { userId: string; role: string };
}

/**
 * Get the current session from cookies (Server Components & API Routes)
 * Returns null if no valid session exists
 */
export async function getServerSession(): Promise<{ userId: string } | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return null;
    }

    const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET);
    return payload as { userId: string };
  } catch (error) {
    console.error('[SERVER AUTH] Session verification failed:', error);
    return null;
  }
}

/**
 * Get the current user with full details from the database
 * Returns null if no valid session or user not found
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const session = await getServerSession();

    if (!session) {
      return null;
    }

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
      console.error('[SERVER AUTH] User not found for session:', session.userId);
      return null;
    }

    return user;
  } catch (error) {
    console.error('[SERVER AUTH] Error getting current user:', error);
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 * Use this in Server Components/Actions that require auth
 */
export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  return user;
}

/**
 * Require manager authorization - throws if not a manager
 * Use this in Server Components/Actions that require manager access
 */
export async function requireManager(): Promise<SessionUser> {
  const user = await requireAuth();

  if (!user.isManager) {
    console.error('[SERVER AUTH] Access denied - user is not a manager:', user.username);
    throw new Error('FORBIDDEN');
  }

  return user;
}

/**
 * Verify authentication from a Next.js API route request
 * Returns authentication status and user info
 * Use this in API Route handlers that need to check auth
 */
export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return { isAuthenticated: false };
    }

    const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET);
    const session = payload as { userId: string; role: string };

    return {
      isAuthenticated: true,
      user: session
    };
  } catch (error) {
    console.error('[SERVER AUTH] Verify auth failed:', error);
    return { isAuthenticated: false };
  }
}
