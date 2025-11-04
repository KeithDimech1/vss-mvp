import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ActionFormWrapper from '@/components/actions/ActionFormWrapper';
import { getActionBySlug } from '@/lib/actions';
import { requireManager } from '@/lib/server-auth';

// Force this page to be dynamic (not cached)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ActionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params (required in Next.js 15+)
  const { slug } = await params;

  // Require manager authentication - throws if not authorized
  let user;
  try {
    user = await requireManager();
  } catch (error: any) {
    console.error('[ACTION PAGE] Authorization failed:', error.message);
    if (error.message === 'UNAUTHORIZED') {
      redirect('/login');
    } else if (error.message === 'FORBIDDEN') {
      redirect('/dashboard');
    } else {
      redirect('/login');
    }
  }

  // Get action metadata
  const actionMetadata = getActionBySlug(slug);
  if (!actionMetadata) {
    redirect('/management');
  }

  // Get the action item from database
  const actionItem = await prisma.actionItem.findUnique({
    where: { actionSlug: slug }
  });

  if (!actionItem) {
    redirect('/management');
  }

  // Get user's existing responses for this action (if any)
  // Use findUnique with the composite key for reliability
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

    console.log('[ACTION PAGE] Query successful');
    console.log('[ACTION PAGE] Found existing response:', !!existingResponse);
    console.log('[ACTION PAGE] Response data:', existingResponse?.responses);
  } catch (error: any) {
    console.error('[ACTION PAGE] Error fetching existing response:', error);
    console.error('[ACTION PAGE] Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
  }

  // Convert Prisma Json type to plain JavaScript object for client component
  let initialResponses = existingResponse?.responses
    ? JSON.parse(JSON.stringify(existingResponse.responses))
    : {};

  console.log('[ACTION PAGE] Initial responses to pass to form:', initialResponses);
  console.log('[ACTION PAGE] Number of responses:', Object.keys(initialResponses).length);
  console.log('[ACTION PAGE] initialResponses type:', typeof initialResponses);
  console.log('[ACTION PAGE] initialResponses is empty?:', Object.keys(initialResponses).length === 0);
  console.log('[ACTION PAGE] Stringified initialResponses:', JSON.stringify(initialResponses).substring(0, 200));

  // Validate that stored response keys match current question IDs
  if (Object.keys(initialResponses).length > 0) {
    const currentQuestionIds = new Set(actionMetadata.questions.map(q => q.id));
    const storedQuestionIds = Object.keys(initialResponses).filter(key => key !== 'timestamp');
    const unmatchedKeys = storedQuestionIds.filter(key => !currentQuestionIds.has(key));

    if (unmatchedKeys.length > 0) {
      console.warn('[ACTION PAGE] Warning: Stored responses contain unrecognized question IDs:', unmatchedKeys);
      console.warn('[ACTION PAGE] This may indicate question IDs were changed. Consider running a migration.');
      console.warn('[ACTION PAGE] Current question IDs:', Array.from(currentQuestionIds));

      // In development, you might want to throw an error
      // In production, we'll just filter out unrecognized keys
      initialResponses = Object.fromEntries(
        Object.entries(initialResponses).filter(([key]) =>
          currentQuestionIds.has(key) || key === 'timestamp'
        )
      );
    }
  }

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
              href={`/management/action/${slug}/team-responses`}
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
              href={`/management/action/${slug}/consensus`}
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
