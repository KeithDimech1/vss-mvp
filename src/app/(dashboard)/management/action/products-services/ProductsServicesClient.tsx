'use client';

import { useState } from 'react';
import ActionFormWrapper from '@/components/actions/ActionFormWrapper';

type ProductTab = 'lithosurfer' | 'lithodata' | 'lithobuild';

interface Tab {
  id: string;
  slug: string;
  label: string;
  subtitle: string;
}

interface ActionData {
  tabId: string;
  actionMetadata: any;
  actionId: string;
  initialResponses: Record<string, any>;
  existingResponse: {
    completed: boolean;
    submittedAt: string | null;
  } | null;
}

interface ProductsServicesClientProps {
  tabs: Tab[];
  actionsData: ActionData[];
  userId: string;
}

export default function ProductsServicesClient({
  tabs,
  actionsData,
  userId
}: ProductsServicesClientProps) {
  const [selectedTab, setSelectedTab] = useState<ProductTab>('lithosurfer');

  // Find the current action data based on selected tab
  const currentActionData = actionsData.find(data => data.tabId === selectedTab);

  if (!currentActionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Action not found</div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold text-[#1B4332] mb-2">Action 1: Products & Services Strategy</h1>
          <p className="text-gray-600">Define strategies for all three product lines by completing each step below</p>
        </div>

        {/* Completion Status Banner */}
        {currentActionData.existingResponse?.completed && (
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
                  {currentActionData.existingResponse.submittedAt
                    ? new Date(currentActionData.existingResponse.submittedAt).toLocaleDateString()
                    : 'Unknown date'}
                </p>
                <p className="text-sm text-green-700">
                  You can still edit and update your responses at any time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Three-Button Tab Selector with Step Indicators */}
        <div className="relative">
          {/* Step Indicators */}
          <div className="flex gap-2 mb-4">
            {tabs.map((tab, index) => (
              <div key={`step-${tab.id}`} className="flex-1 flex flex-col items-center">
                {/* Step Badge */}
                <div className="bg-[#C9A961] text-white px-4 py-2 rounded-lg shadow-md mb-2">
                  <span className="font-bold text-sm">Step {index + 1}</span>
                </div>
                {/* Arrow pointing down */}
                <svg
                  className="w-6 h-6 text-[#C9A961]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 16l-6-6h12l-6 6z" />
                </svg>
              </div>
            ))}
          </div>

          {/* Tab Buttons */}
          <div className="bg-white rounded-xl shadow-lg p-2">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as ProductTab)}
                  className={`flex-1 py-4 px-6 rounded-lg text-left transition-all duration-200 ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-[#C9A961] to-[#1B4332] text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{tab.label}</div>
                  <div className={`text-sm ${selectedTab === tab.id ? 'text-[#F5E6D3]' : 'text-gray-500'}`}>
                    {tab.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Form */}
        <div key={selectedTab}>
          <ActionFormWrapper
            action={currentActionData.actionMetadata}
            actionId={currentActionData.actionId}
            userId={userId}
            initialResponses={currentActionData.initialResponses}
          />
        </div>

        {/* Team Collaboration */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1B4332] mb-4">
            Team Collaboration
          </h2>
          <div className="space-y-3">
            <a
              href="/management/action/products-services/team-responses"
              className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1B4332]">View Team Responses</p>
                  <p className="text-sm text-gray-600">
                    Compare responses from all team members across all three products
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-blue-600"
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
              href="/management/action/products-services/consensus"
              className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1B4332]">Build Consensus</p>
                  <p className="text-sm text-gray-600">
                    Collaborate on final decisions for all three products
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
