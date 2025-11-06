'use client';

import ActionFormWrapper from '@/components/actions/ActionFormWrapper';

interface ActionData {
  actionMetadata: any;
  actionId: string;
  initialResponses: Record<string, any>;
  existingResponse: {
    completed: boolean;
    submittedAt: string | null;
  } | null;
}

interface OkrImplementationClientProps {
  actionData: ActionData;
  userId: string;
}

export default function OkrImplementationClient({
  actionData,
  userId
}: OkrImplementationClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#C9A961]/10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <a
          href="/management"
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
          Back to Management Dashboard
        </a>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#1B4332] mb-2">
            Action 4: Implementation Plan (OKRs)
          </h1>
          <p className="text-gray-600">
            Define how we'll execute strategy using Objectives and Key Results
          </p>
        </div>

        {/* OKR Framework Overview Cards */}
        <div className="bg-white rounded-lg border-2 border-[#C9A961] p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
            📈 What are OKRs?
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Objectives and Key Results (OKRs)</strong> is a goal-setting framework used by Google, Netflix, and other world-class organizations to translate strategy into measurable outcomes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-blue-900 mb-2">Objectives</h3>
              <p className="text-sm text-blue-700">
                <strong>What</strong> you want to achieve. Qualitative, inspiring, time-bound goals.
              </p>
              <p className="text-xs text-blue-600 mt-2 italic">
                Example: "Become the leading data platform in mining"
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-green-900 mb-2">Key Results</h3>
              <p className="text-sm text-green-700">
                <strong>How</strong> you'll measure success. Quantifiable, specific, verifiable outcomes.
              </p>
              <p className="text-xs text-green-600 mt-2 italic">
                Example: "Acquire 15 new LithoSurfer customers by Q4"
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-purple-900 mb-2">Execution</h3>
              <p className="text-sm text-purple-700">
                Regular check-ins, transparent tracking, and continuous adaptation.
              </p>
              <p className="text-xs text-purple-600 mt-2 italic">
                Example: "Weekly reviews, 70% success target (Google model)"
              </p>
            </div>
          </div>
        </div>

        {/* Research Insight Banner */}
        <div className="bg-gradient-to-r from-[#1B4332] to-[#0A6FCC] text-white rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="font-bold text-xl mb-2">Why This Matters</h3>
              <p className="text-gray-100 mb-3">
                Harvard Business Review research shows that most strategies fail in <strong>execution</strong>, not conception. OKRs bridge the gap between vision and results.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#C9A961] text-xl">✓</span>
                  <span>Google achieved 10× growth using OKRs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C9A961] text-xl">✓</span>
                  <span>Netflix uses RICE framework for prioritization</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C9A961] text-xl">✓</span>
                  <span>Radical transparency creates accountability</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C9A961] text-xl">✓</span>
                  <span>Quarterly cycles enable fast adaptation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 mb-6">
          <a
            href="/management/action/okr-implementation/team-responses"
            className="px-4 py-2 bg-white border-2 border-[#C9A961] text-[#C9A961] rounded-lg hover:bg-[#C9A961] hover:text-white transition-colors font-medium"
          >
            📊 View Team Responses
          </a>
          <a
            href="/management/action/okr-implementation/consensus"
            className="px-4 py-2 bg-white border-2 border-[#1B4332] text-[#1B4332] rounded-lg hover:bg-[#1B4332] hover:text-white transition-colors font-medium"
          >
            🤝 Build Consensus
          </a>
        </div>

        {/* Completion Status Banner */}
        {actionData.existingResponse?.completed && (
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
                  You submitted your responses on{' '}
                  {actionData.existingResponse.submittedAt
                    ? new Date(actionData.existingResponse.submittedAt).toLocaleDateString()
                    : 'Unknown'}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  You can still edit your responses below. Changes will be saved automatically.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Form */}
        <ActionFormWrapper
          action={actionData.actionMetadata}
          actionId={actionData.actionId}
          initialResponses={actionData.initialResponses}
          userId={userId}
        />
      </div>
    </div>
  );
}
