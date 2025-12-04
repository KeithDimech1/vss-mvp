'use client';

import { useState } from 'react';
import TeamResponseView from '@/components/actions/TeamResponseView';

type ProductTab = 'lithosurfer' | 'lithodata' | 'lithobuild';

interface Tab {
  id: string;
  slug: string;
  label: string;
  subtitle: string;
}

interface TeamMemberResponse {
  userId: string;
  username: string;
  fullName: string;
  responses: Record<string, any>;
  completed: boolean;
  submittedAt: string | null;
  updatedAt: string;
}

interface NonRespondent {
  username: string;
  fullName: string;
}

interface ActionData {
  tabId: string;
  actionMetadata: any;
  teamResponses: TeamMemberResponse[];
  nonRespondents: NonRespondent[];
}

interface ProductsServicesTeamResponsesClientProps {
  tabs: Tab[];
  actionsData: ActionData[];
}

export default function ProductsServicesTeamResponsesClient({
  tabs,
  actionsData
}: ProductsServicesTeamResponsesClientProps) {
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
          Back to Products & Services
        </a>

        {/* Page Title */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-[#1B4332] mb-2">
            Team Responses: Products & Services
          </h1>
          <p className="text-gray-600">
            Review and compare responses from all management team members for each product line
          </p>
        </div>

        {/* Response Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#1B4332] mb-4">Response Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            {tabs.map((tab) => {
              const actionData = actionsData.find(d => d.tabId === tab.id);
              const responseCount = actionData?.teamResponses.length || 0;
              const completedCount = actionData?.teamResponses.filter(r => r.completed).length || 0;
              const nonRespondentCount = actionData?.nonRespondents.length || 0;

              return (
                <div
                  key={tab.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTab === tab.id
                      ? 'border-[#C9A961] bg-[#C9A961]/10'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTab(tab.id as ProductTab)}
                >
                  <div className="font-semibold text-[#1B4332]">{tab.label}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {completedCount} completed / {responseCount} total
                  </div>
                  {nonRespondentCount > 0 && (
                    <div className="text-xs text-amber-600 mt-1">
                      {nonRespondentCount} pending
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab Selector */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6">
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

        {/* Team Response View for Selected Tab */}
        <div key={selectedTab}>
          <TeamResponseView
            action={currentActionData.actionMetadata}
            teamResponses={currentActionData.teamResponses}
            nonRespondents={currentActionData.nonRespondents}
          />
        </div>
      </div>
    </div>
  );
}
