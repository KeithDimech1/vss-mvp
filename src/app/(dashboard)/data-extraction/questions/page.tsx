import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import QuestionsClient from './QuestionsClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-here');

export default async function DataExtractionQuestionsPage() {
  // Auth check - Juan, Keith, and Fabian only
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    redirect('/login');
  }

  let user: { userId: string; role: string };
  let username: string;

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    user = payload as { userId: string; role: string };

    // Fetch user from database to get username
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { username: true }
    });

    if (!dbUser) {
      redirect('/login');
    }

    username = dbUser.username;

    // Only Juan, Keith, and Fabian can access this page
    const allowedUsers = ['juan', 'keith', 'fabian'];
    if (!allowedUsers.includes(username.toLowerCase())) {
      redirect('/dashboard');
    }
  } catch (error) {
    redirect('/login');
  }

  // Get the extraction process
  const process = await prisma.dataExtractionProcess.findFirst({
    orderBy: { version: 'desc' }
  });

  if (!process) {
    redirect('/data-extraction/process');
  }

  // Get existing question responses
  const questionResponse = await prisma.dataExtractionQuestion.findUnique({
    where: {
      processId_userId: {
        processId: process.id,
        userId: user.userId
      }
    }
  });

  const existingResponses = questionResponse?.responses as Record<string, any> || {};
  const existingWorkspaceLinks = questionResponse?.workspaceLinks as any[] || [];
  const defaultLanguage = questionResponse?.language || 'en';

  return (
    <QuestionsClient
      userId={user.userId}
      processId={process.id}
      existingResponses={existingResponses}
      existingWorkspaceLinks={existingWorkspaceLinks}
      language={defaultLanguage as 'en' | 'es'}
    />
  );
}
