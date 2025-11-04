import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import TeamResponseView from '@/components/actions/TeamResponseView';
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

export default async function TeamResponsesPage() {
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

  // Get all management team members
  const managementMembers = await prisma.user.findMany({
    where: {
      isManager: true
    },
    select: {
      id: true,
      username: true,
      fullName: true
    }
  });

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
    submittedAt: response.submittedAt?.toISOString() || null,
    updatedAt: response.updatedAt.toISOString()
  }));

  // Find non-respondents
  const respondentIds = new Set(responses.map(r => r.userId));
  const nonRespondents = managementMembers
    .filter(member => !respondentIds.has(member.id))
    .map(member => ({
      username: member.username,
      fullName: member.fullName || member.username
    }));

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
            Team Responses: {actionMetadata.title}
          </h1>
          <p className="text-gray-600">
            Review and compare responses from all management team members
          </p>
        </div>

        {/* Team Response View */}
        <TeamResponseView
          action={actionMetadata}
          teamResponses={teamResponses}
          nonRespondents={nonRespondents}
        />
      </div>
    </div>
  );
}
