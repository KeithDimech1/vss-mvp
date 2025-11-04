import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import ConsensusBuilder from '@/components/actions/ConsensusBuilder';
import { getActionBySlug } from '@/lib/actions';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

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

export default async function ConsensusPage() {
  // Verify session
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  // Get user and verify management team access
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, isManager: true }
  });

  if (!user || !user.isManager) {
    redirect('/dashboard');
  }

  // Get action metadata
  const actionMetadata = getActionBySlug('products-services');
  if (!actionMetadata) {
    redirect('/management');
  }

  // Get the action item from database
  const actionItem = await prisma.actionItem.findUnique({
    where: { actionSlug: 'products-services' }
  });

  if (!actionItem) {
    redirect('/management');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#C9A961]/10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <a
          href="/management/action/products-services"
          className="inline-flex items-center text-[#C9A961] hover:text-[#0A6FCC] mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Action 1
        </a>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-[#1B4332] mb-2">
            Consensus Building: {actionMetadata.title}
          </h1>
          <p className="text-gray-600">
            Review team responses and build consensus on final decisions
          </p>
        </div>

        {/* Consensus Builder */}
        <ConsensusBuilder
          action={actionMetadata}
          actionSlug="products-services"
          teamResponses={teamResponses}
          existingConsensus={existingConsensus}
          currentUserId={user.id}
        />

        {/* Help Section */}
        <div className="mt-6 bg-[#F5E6D3]/30 border border-[#C9A961]/40 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">How to Build Consensus</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>Review each team member's responses by expanding the questions</li>
            <li>Discuss differences and find common ground through team discussions</li>
            <li>Enter the agreed-upon consensus decision for each question</li>
            <li>Add overall notes about the discussion and any action items</li>
            <li>Your changes auto-save every 30 seconds</li>
            <li>Mark as "Resolved" when consensus is reached and finalized</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
