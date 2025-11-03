/**
 * Server-side authentication utilities
 * For use in Server Components, Server Actions, and API Routes
 */

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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
