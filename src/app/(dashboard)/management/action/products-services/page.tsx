import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';
import ActionFormWrapper from '@/components/actions/ActionFormWrapper';
import { getActionBySlug } from '@/lib/actions';

// Force this page to be dynamic (not cached)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const prisma = new PrismaClient();
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

export default async function ProductsServicesActionPage() {
  console.log('[ACTION PAGE] Starting page render...');

  // Verify session
  const session = await getSession();
  console.log('[ACTION PAGE] Session check:', { hasSession: !!session, userId: session?.userId });

  if (!session) {
    console.log('[ACTION PAGE] No session, redirecting to /login');
    redirect('/login');
  }

  // Get user and verify management team access
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, fullName: true, isManager: true }
  });

  console.log('[ACTION PAGE] User query result:', {
    hasUser: !!user,
    username: user?.username,
    isManager: user?.isManager,
    isManagerType: typeof user?.isManager
  });

  // Check if user exists and is a manager
  if (!user) {
    console.error('[ACTION PAGE AUTH] User not found, redirecting to /dashboard');
    redirect('/dashboard');
  }

  if (!user.isManager) {
    console.error('[ACTION PAGE AUTH] User is not a manager:', {
      username: user.username,
      isManager: user.isManager,
      redirectingTo: '/dashboard'
    });
    redirect('/dashboard');
  }

  console.log('[ACTION PAGE] ✅ Authorization passed - access granted for:', user.username);

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

  // Get user's existing responses for this action (if any)
  const existingResponse = await prisma.actionResponse.findFirst({
    where: {
      actionItem: {
        actionSlug: 'products-services'
      },
      userId: user.id
    },
    select: {
      responses: true,
      completed: true,
      submittedAt: true,
      updatedAt: true
    }
  });

  const initialResponses = existingResponse?.responses as Record<string, any> || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <a
          href="/management"
          className="inline-flex items-center text-[#0D8BFF] hover:text-[#0A6FCC] mb-6 transition-colors"
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
          Back to Management Dashboard
        </a>

        {/* Completion Status Banner */}
        {existingResponse?.completed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-green-800">
                  You submitted your responses on {existingResponse.submittedAt ? new Date(existingResponse.submittedAt).toLocaleDateString() : 'Unknown date'}
                </p>
                <p className="text-sm text-green-700">
                  You can still edit and update your responses at any time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Form */}
        <ActionFormWrapper
          action={actionMetadata}
          actionId={actionItem.id}
          userId={user.id}
          initialResponses={initialResponses}
        />

        {/* Additional Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#2C3E7C] mb-4">
            Team Collaboration
          </h2>
          <div className="space-y-3">
            <a
              href={`/management/action/products-services/team-responses`}
              className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#2C3E7C]">View Team Responses</p>
                  <p className="text-sm text-gray-600">
                    See what other management team members have submitted
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-[#0D8BFF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>

            <a
              href={`/management/action/products-services/consensus`}
              className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#2C3E7C]">Build Consensus</p>
                  <p className="text-sm text-gray-600">
                    Collaborate on final decisions and action items
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
