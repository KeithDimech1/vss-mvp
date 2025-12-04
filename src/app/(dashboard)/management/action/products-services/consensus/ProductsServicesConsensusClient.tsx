'use client';

import { useState } from 'react';
import ConsensusBuilder from '@/components/actions/ConsensusBuilder';

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
}

interface ConsensusData {
  consensusData: Record<string, any>;
  notes: string;
  resolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
}

interface ActionData {
  tabId: string;
  actionMetadata: any;
  actionSlug: string;
  teamResponses: TeamMemberResponse[];
  existingConsensus: ConsensusData | null;
}

interface ProductsServicesConsensusClientProps {
  tabs: Tab[];
  actionsData: ActionData[];
  currentUserId: string;
}

export default function ProductsServicesConsensusClient({
  tabs,
  actionsData,
  currentUserId
}: ProductsServicesConsensusClientProps) {
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
            Consensus Building: Products & Services
          </h1>
          <p className="text-gray-600">
            Review team responses and build consensus on final decisions for each product line
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
              const hasConsensus = actionData?.existingConsensus?.resolved || false;

              return (
                <div
                  key={tab.id}
                  className={`p-4 rounded-lg border-2 ${
                    selectedTab === tab.id
                      ? 'border-[#C9A961] bg-[#C9A961]/10'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-[#1B4332]">{tab.label}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {completedCount}/{responseCount} responses completed
                  </div>
                  <div className={`text-xs mt-2 px-2 py-1 rounded-full inline-block ${
                    hasConsensus
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {hasConsensus ? 'Consensus Reached' : 'Pending Consensus'}
                  </div>
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

        {/* Consensus Builder for Selected Tab */}
        <div key={selectedTab}>
          <ConsensusBuilder
            action={currentActionData.actionMetadata}
            actionSlug={currentActionData.actionSlug}
            teamResponses={currentActionData.teamResponses}
            existingConsensus={currentActionData.existingConsensus}
            currentUserId={currentUserId}
          />
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-[#F5E6D3]/30 border border-[#C9A961]/40 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">How to Build Consensus</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>Select a product tab above to view and edit consensus for that product</li>
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
