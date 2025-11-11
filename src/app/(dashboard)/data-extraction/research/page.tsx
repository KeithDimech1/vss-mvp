import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import ResearchClient from './ResearchClient';

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-characters-long'
);

export default async function DataExtractionResearchPage() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      redirect('/login');
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    const user = payload as { userId: string; role: string };

    // Fetch user from database to get username
    const { prisma } = await import('@/lib/prisma');
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { username: true }
    });

    if (!dbUser) {
      redirect('/login');
    }

    // Only Juan, Keith, and Fabian can access this page
    const allowedUsers = ['juan', 'keith', 'fabian'];
    if (!allowedUsers.includes(dbUser.username.toLowerCase())) {
      redirect('/dashboard');
    }
  } catch (error) {
    console.error('Auth error:', error);
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-8">
      <ResearchClient language="en" />
    </div>
  );
}
