import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getActionBySlug } from '@/lib/actions';
import { requireManager } from '@/lib/server-auth';
import ProductsServicesConsensusClient from './ProductsServicesConsensusClient';

// Force this page to be dynamic (not cached)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Define tabs with their corresponding action slugs
const tabs = [
  {
    id: 'lithosurfer',
    slug: 'lithosurfer',
    label: '🌊 LithoSurfer',
    subtitle: 'Three-Tier Product'
  },
  {
    id: 'lithodata',
    slug: 'lithodata',
    label: '📊 LithoData',
    subtitle: 'Three-Type Data Model'
  },
  {
    id: 'lithobuild',
    slug: 'lithobuild',
    label: '🏗️ LithoBuild',
    subtitle: 'Consulting & Development'
  },
];

export default async function ProductsServicesConsensusPage() {
  // Require manager authentication
  let user;
  try {
    user = await requireManager();
  } catch (error: any) {
    console.error('[CONSENSUS PAGE] Authorization failed:', error.message);
    if (error.message === 'UNAUTHORIZED') {
      redirect('/login');
    } else if (error.message === 'FORBIDDEN') {
      redirect('/dashboard');
    } else {
      redirect('/login');
    }
  }

  // Fetch all three actions with their responses and consensus data
  const actionsData = await Promise.all(
    tabs.map(async (tab) => {
      // Get action metadata
      const actionMetadata = getActionBySlug(tab.slug);
      if (!actionMetadata) {
        console.error(`[CONSENSUS PAGE] No metadata for ${tab.slug}`);
        return null;
      }

      // Get the action item from database
      const actionItem = await prisma.actionItem.findUnique({
        where: { actionSlug: tab.slug }
      });

      if (!actionItem) {
        console.error(`[CONSENSUS PAGE] No action item for ${tab.slug}`);
        return null;
      }

      // Get all responses for this action
      const responses = await prisma.actionResponse.findMany({
        where: {
          actionItemId: actionItem.id
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              fullName: true
            }
          }
        }
      });

      // Format responses for component
      const teamResponses = responses.map(response => ({
        userId: response.user.id,
        username: response.user.username,
        fullName: response.user.fullName || response.user.username,
        responses: response.responses as Record<string, any>,
        completed: response.completed,
        submittedAt: response.submittedAt?.toISOString() || null
      }));

      // Get existing consensus (if any)
      const consensus = await prisma.actionConsensus.findUnique({
        where: { actionItemId: actionItem.id }
      });

      const existingConsensus = consensus ? {
        consensusData: consensus.consensusData as Record<string, any>,
        notes: consensus.notes || '',
        resolved: consensus.resolved,
        resolvedAt: consensus.resolvedAt?.toISOString() || null,
        resolvedBy: consensus.resolvedBy
      } : null;

      return {
        tabId: tab.id,
        actionMetadata,
        actionSlug: tab.slug,
        teamResponses,
        existingConsensus
      };
    })
  );

  // Filter out any null results
  const validActionsData = actionsData.filter(data => data !== null);

  if (validActionsData.length === 0) {
    console.error('[CONSENSUS PAGE] No valid actions found');
    redirect('/management');
  }

  // Pass data to client component
  return (
    <ProductsServicesConsensusClient
      tabs={tabs}
      actionsData={validActionsData}
      currentUserId={user.id}
    />
  );
}
