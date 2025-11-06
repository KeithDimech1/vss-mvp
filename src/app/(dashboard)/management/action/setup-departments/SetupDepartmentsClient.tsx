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

interface SetupDepartmentsClientProps {
  actionData: ActionData;
  userId: string;
}

export default function SetupDepartmentsClient({
  actionData,
  userId
}: SetupDepartmentsClientProps) {
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
            Action 3: Setup Three Departments
          </h1>
          <p className="text-gray-600">
            Formalize LithoSurfer, LithoBuild, and LithoData organizational structure
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 mb-6">
          <a
            href="/management/action/setup-departments/team-responses"
            className="px-4 py-2 bg-white border-2 border-[#C9A961] text-[#C9A961] rounded-lg hover:bg-[#C9A961] hover:text-white transition-colors font-medium"
          >
            📊 View Team Responses
          </a>
          <a
            href="/management/action/setup-departments/consensus"
            className="px-4 py-2 bg-white border-2 border-[#1B4332] text-[#1B4332] rounded-lg hover:bg-[#1B4332] hover:text-white transition-colors font-medium"
          >
            🤝 Build Consensus
          </a>
        </div>

        {/* Department Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🌊</div>
            <h3 className="font-bold text-blue-900 mb-1">LithoSurfer</h3>
            <p className="text-sm text-blue-700">Front-End / Customer Platform</p>
          </div>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-bold text-indigo-900 mb-1">LithoData</h3>
            <p className="text-sm text-indigo-700">Back-End Data / Strategic Asset</p>
          </div>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🏗️</div>
            <h3 className="font-bold text-amber-900 mb-1">LithoBuild</h3>
            <p className="text-sm text-amber-700">Contract Work / Bootstrap Revenue</p>
          </div>
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
