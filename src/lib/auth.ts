import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

/**
 * Hash a plain text password using bcrypt
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verify a plain text password against a hashed password
 * @param password - The plain text password to verify
 * @param hashedPassword - The hashed password to compare against
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT session management
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vss-secret-key-change-in-production-2025'
);

/**
 * Create a new session for a user
 * @param userId - The user's ID
 * @param role - The user's role (ADMIN or MEMBER)
 * @returns The JWT token
 */
export async function createSession(userId: string, role: string): Promise<string> {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return token;
}

/**
 * Get the current session from cookies
 * @returns The session payload or null if no valid session
 */
export async function getSession(): Promise<{ userId: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as { userId: string; role: string };
  } catch (err) {
    return null;
  }
}

/**
 * Verify and get the current session from cookies
 * Alias for getSession() to maintain API consistency
 * @returns The session payload or null if no valid session
 */
export async function verifySession(): Promise<{ userId: string; role: string } | null> {
  return await getSession();
}

/**
 * Delete the current session
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
