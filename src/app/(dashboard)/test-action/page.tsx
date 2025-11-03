import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
const MANAGEMENT_TEAM = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session');

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    return payload as { userId: string };
  } catch (error) {
    return null;
  }
}

export default async function TestPage() {
  // Verify session
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  // Get user and verify management team access
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, fullName: true }
  });

  if (!user || !MANAGEMENT_TEAM.includes(user.username)) {
    redirect('/dashboard');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page - Simple Render</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>✓ If you can see this, the server-side rendering works!</p>
        <p className="mt-2"><strong>User:</strong> {user.fullName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p className="mt-4 text-green-600">This page has the same auth checks as the action page.</p>
        <p className="text-blue-600">If this page stays visible, the issue is with ActionFormWrapper.</p>
      </div>
    </div>
  );
}
