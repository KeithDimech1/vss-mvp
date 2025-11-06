import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getActionBySlug } from '@/lib/actions';
import { requireManager } from '@/lib/server-auth';
import OkrImplementationClient from './OkrImplementationClient';

// Force this page to be dynamic (not cached)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OkrImplementationActionPage() {
  // Require manager authentication
  let user;
  try {
    user = await requireManager();
  } catch (error: any) {
    console.error('[OKR-IMPLEMENTATION PAGE] Authorization failed:', error.message);
    if (error.message === 'UNAUTHORIZED') {
      redirect('/login');
    } else if (error.message === 'FORBIDDEN') {
      redirect('/dashboard');
    } else {
      redirect('/login');
    }
  }

  // Get action metadata
  const actionMetadata = getActionBySlug('okr-implementation');
  if (!actionMetadata) {
    console.error('[OKR-IMPLEMENTATION PAGE] No metadata for okr-implementation');
    redirect('/management');
  }

  // Get the action item from database
  const actionItem = await prisma.actionItem.findUnique({
    where: { actionSlug: 'okr-implementation' }
  });

  if (!actionItem) {
    console.error('[OKR-IMPLEMENTATION PAGE] No action item for okr-implementation');
    redirect('/management');
  }

  // Get user's existing response for this action
  let existingResponse = null;
  try {
    existingResponse = await prisma.actionResponse.findUnique({
      where: {
        actionItemId_userId: {
          actionItemId: actionItem.id,
          userId: user.id
        }
      },
      select: {
        responses: true,
        completed: true,
        submittedAt: true,
        updatedAt: true
      }
    });

    console.log('[OKR-IMPLEMENTATION PAGE] Found response:', !!existingResponse);
  } catch (error: any) {
    console.error('[OKR-IMPLEMENTATION PAGE] Error fetching response:', error);
  }

  // Convert Prisma Json type to plain JavaScript object
  let initialResponses = existingResponse?.responses
    ? JSON.parse(JSON.stringify(existingResponse.responses))
    : {};

  const actionData = {
    actionMetadata,
    actionId: actionItem.id,
    initialResponses,
    existingResponse: existingResponse ? {
      completed: existingResponse.completed,
      submittedAt: existingResponse.submittedAt?.toISOString() || null
    } : null
  };

  // Pass data to client component
  return (
    <OkrImplementationClient
      actionData={actionData}
      userId={user.id}
    />
  );
}
