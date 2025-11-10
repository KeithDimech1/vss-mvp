import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

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

export default async function ConsensusLandingPage() {
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

  // Get all action items with response counts
  const actions = await prisma.actionItem.findMany({
    where: {
      actionSlug: {
        in: ['products-services', 'unified-utopia', 'setup-departments']
      }
    },
    include: {
      _count: {
        select: {
          responses: true
        }
      },
      consensus: true
    }
  });

  // Map to action data
  const actionData = [
    {
      slug: 'products-services',
      number: 1,
      title: 'Products & Services Strategy',
      description: 'Define strategies for LithoSurfer, LithoData, and LithoBuild',
      color: 'blue',
      icon: '🎯'
    },
    {
      slug: 'unified-utopia',
      number: 2,
      title: 'Unified Utopia Vision',
      description: 'Build consensus on Lithodat\'s unified utopia vision',
      color: 'purple',
      icon: '🔮'
    },
    {
      slug: 'setup-departments',
      number: 3,
      title: 'Setup Three Departments',
      description: 'Formalize LithoSurfer, LithoBuild, LithoData systems',
      color: 'green',
      icon: '🏢'
    }
  ].map(action => {
    const dbAction = actions.find(a => a.actionSlug === action.slug);
    return {
      ...action,
      responseCount: dbAction?._count.responses || 0,
      hasConsensus: !!dbAction?.consensus,
      consensusResolved: dbAction?.consensus?.resolved || false
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#F5E6D3]/20 to-[#C9A961]/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C9A961] via-[#C9A961] to-[#1B4332] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-4 backdrop-blur-sm">
                Consensus Building Dashboard
              </div>
              <h1 className="text-5xl font-bold mb-3 tracking-tight">Build Consensus</h1>
              <p className="text-[#F5E6D3] text-xl font-light">
                Review team responses and align on strategic decisions
              </p>
            </div>
            <a
              href="/management"
              className="text-white hover:text-[#F5E6D3] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Introduction Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border-l-4 border-[#C9A961]">
          <h2 className="text-2xl font-bold text-[#1B4332] mb-3">📋 How Consensus Building Works</h2>
          <p className="text-gray-600 mb-4">
            Each action below has been completed by management team members. Your goal is to review all responses,
            discuss differences, and document the team's final consensus decision.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Review Responses</h3>
                <p className="text-xs text-gray-600 mt-1">
                  See what each team member answered for every question
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Build Consensus</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Discuss and agree on the team's unified answer
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Mark Resolved</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Finalize consensus and move to implementation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {actionData.map((action) => (
            <a
              key={action.slug}
              href={`/management/action/${action.slug}/consensus`}
              className={`bg-white rounded-xl shadow-lg p-6 border-t-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                action.color === 'blue' ? 'border-blue-500' :
                action.color === 'purple' ? 'border-purple-500' :
                'border-green-500'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{action.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-500">Action {action.number}</div>
                    <h3 className="font-bold text-[#1B4332] text-lg">{action.title}</h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Team Responses:</span>
                  <span className="font-semibold text-[#1B4332]">
                    {action.responseCount} submitted
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Consensus Status:</span>
                  {action.consensusResolved ? (
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Resolved
                    </span>
                  ) : action.hasConsensus ? (
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      In Progress
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500 font-semibold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Not Started
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className={`mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm font-semibold ${
                action.color === 'blue' ? 'text-blue-600' :
                action.color === 'purple' ? 'text-purple-600' :
                'text-green-600'
              }`}>
                <span>{action.responseCount > 0 ? 'Build Consensus' : 'Waiting for responses'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Availability Badge */}
              {action.responseCount > 0 && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">Ready for consensus</span>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-[#1B4332] mb-4">Overall Progress</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A961] mb-1">
                {actionData.reduce((sum, a) => sum + a.responseCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">
                {actionData.filter(a => a.hasConsensus && !a.consensusResolved).length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {actionData.filter(a => a.consensusResolved).length}
              </div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-[#F5E6D3]/30 border border-[#C9A961]/40 rounded-lg p-6">
          <h3 className="font-bold text-[#0F2922] mb-3">💡 Tips for Effective Consensus Building</h3>
          <ul className="list-disc list-inside text-sm text-[#1B4332] space-y-2">
            <li>Schedule a meeting to discuss responses together as a team</li>
            <li>Look for common themes and areas of agreement first</li>
            <li>For disagreements, understand the "why" behind each person's perspective</li>
            <li>Consensus doesn't mean unanimous - it means everyone can live with the decision</li>
            <li>Document any minority opinions or concerns in the notes section</li>
            <li>Mark as "Resolved" only when the team is aligned and committed to moving forward</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
