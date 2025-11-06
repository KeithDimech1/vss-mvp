import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getActionBySlug } from '@/lib/actions';
import { requireManager } from '@/lib/server-auth';
import UnifiedUtopiaClient from './UnifiedUtopiaClient';

// Force this page to be dynamic (not cached)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UnifiedUtopiaActionPage() {
  // Require manager authentication
  let user;
  try {
    user = await requireManager();
  } catch (error: any) {
    console.error('[UNIFIED-UTOPIA PAGE] Authorization failed:', error.message);
    if (error.message === 'UNAUTHORIZED') {
      redirect('/login');
    } else if (error.message === 'FORBIDDEN') {
      redirect('/dashboard');
    } else {
      redirect('/login');
    }
  }

  // Get action metadata
  const actionMetadata = getActionBySlug('unified-utopia');
  if (!actionMetadata) {
    console.error('[UNIFIED-UTOPIA PAGE] No metadata for unified-utopia');
    redirect('/management');
  }

  // Get the action item from database
  const actionItem = await prisma.actionItem.findUnique({
    where: { actionSlug: 'unified-utopia' }
  });

  if (!actionItem) {
    console.error('[UNIFIED-UTOPIA PAGE] No action item for unified-utopia');
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

    console.log('[UNIFIED-UTOPIA PAGE] Found response:', !!existingResponse);
  } catch (error: any) {
    console.error('[UNIFIED-UTOPIA PAGE] Error fetching response:', error);
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
    <UnifiedUtopiaClient
      actionData={actionData}
      userId={user.id}
    />
  );
}
