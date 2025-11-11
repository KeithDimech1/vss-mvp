import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import ProcessVisualizationClient from './ProcessVisualizationClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-here');

export default async function DataExtractionProcessPage() {
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

  // Get or create the extraction process
  let process = await prisma.dataExtractionProcess.findFirst({
    orderBy: { version: 'desc' }
  });

  if (!process) {
    // Create initial process with empty steps (metadata drives the UI)
    process = await prisma.dataExtractionProcess.create({
      data: {
        version: 1,
        processSteps: []
      }
    });
  }

  // Get existing feedbacks
  const feedbacks = await prisma.dataExtractionFeedback.findMany({
    where: {
      processId: process.id,
      userId: user.userId
    }
  });

  // Detect language preference from browser or default to English
  const defaultLanguage = 'en'; // Could enhance this with actual browser detection

  return (
    <ProcessVisualizationClient
      userId={user.userId}
      processId={process.id}
      existingFeedbacks={feedbacks.map(f => ({
        stepId: f.stepId,
        isCorrect: f.isCorrect,
        comments: f.comments,
        questionAnswers: f.questionAnswers,
        language: f.language
      }))}
      language={defaultLanguage}
    />
  );
}
