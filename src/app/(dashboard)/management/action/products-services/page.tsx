import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getActionBySlug } from '@/lib/actions';
import { requireManager } from '@/lib/server-auth';
import ProductsServicesClient from './ProductsServicesClient';

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

export default async function ProductsServicesActionPage() {
  // Require manager authentication
  let user;
  try {
    user = await requireManager();
  } catch (error: any) {
    console.error('[PRODUCTS-SERVICES PAGE] Authorization failed:', error.message);
    if (error.message === 'UNAUTHORIZED') {
      redirect('/login');
    } else if (error.message === 'FORBIDDEN') {
      redirect('/dashboard');
    } else {
      redirect('/login');
    }
  }

  // Fetch all three actions and their responses
  const actionsData = await Promise.all(
    tabs.map(async (tab) => {
      // Get action metadata
      const actionMetadata = getActionBySlug(tab.slug);
      if (!actionMetadata) {
        console.error(`[PRODUCTS-SERVICES PAGE] No metadata for ${tab.slug}`);
        return null;
      }

      // Get the action item from database
      const actionItem = await prisma.actionItem.findUnique({
        where: { actionSlug: tab.slug }
      });

      if (!actionItem) {
        console.error(`[PRODUCTS-SERVICES PAGE] No action item for ${tab.slug}`);
        return null;
      }

      // Get user's existing responses for this action
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

        console.log(`[PRODUCTS-SERVICES PAGE] ${tab.slug} - Found response:`, !!existingResponse);
      } catch (error: any) {
        console.error(`[PRODUCTS-SERVICES PAGE] Error fetching ${tab.slug} response:`, error);
      }

      // Convert Prisma Json type to plain JavaScript object
      let initialResponses = existingResponse?.responses
        ? JSON.parse(JSON.stringify(existingResponse.responses))
        : {};

      return {
        tabId: tab.id,
        actionMetadata,
        actionId: actionItem.id,
        initialResponses,
        existingResponse: existingResponse ? {
          completed: existingResponse.completed,
          submittedAt: existingResponse.submittedAt?.toISOString() || null
        } : null
      };
    })
  );

  // Filter out any null results
  const validActionsData = actionsData.filter(data => data !== null);

  if (validActionsData.length === 0) {
    console.error('[PRODUCTS-SERVICES PAGE] No valid actions found');
    redirect('/management');
  }

  // Pass data to client component
  return (
    <ProductsServicesClient
      tabs={tabs}
      actionsData={validActionsData}
      userId={user.id}
    />
  );
}
