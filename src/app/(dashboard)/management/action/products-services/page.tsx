'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ActionFormWrapper from '@/components/actions/ActionFormWrapper';
import { getActionBySlug } from '@/lib/actions';

type ProductTab = 'lithosurfer' | 'lithodata' | 'lithobuild';

export default function ProductsServicesActionPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<ProductTab>('lithosurfer');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const sessionRes = await fetch('/api/auth/session');
        if (!sessionRes.ok) {
          router.push('/login');
          return;
        }

        const sessionData = await sessionRes.json();
        if (!sessionData.user.isManager) {
          router.push('/dashboard');
          return;
        }

        setUserId(sessionData.user.userId);
        setLoading(false);
      } catch (error) {
        console.error('[ACTION PAGE] Error checking auth:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#0D8BFF]"></div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'lithosurfer' as ProductTab,
      label: '🌊 LithoSurfer',
      subtitle: 'Three-Tier Product',
      actionId: 'cmhieazy7000ks4ejdmyz68yd'
    },
    {
      id: 'lithodata' as ProductTab,
      label: '📊 LithoData',
      subtitle: 'Three-Type Data Model',
      actionId: 'cmhj3xgwc0000s4l15x97xke3'
    },
    {
      id: 'lithobuild' as ProductTab,
      label: '🏗️ LithoBuild',
      subtitle: 'Consulting & Development',
      actionId: 'cmhj3xgy60001s4l1cqyqryyd'
    },
  ];

  const currentTab = tabs.find(t => t.id === selectedTab);
  const currentActionMetadata = getActionBySlug(selectedTab);

  if (!currentActionMetadata || !currentTab) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Action not found</div>
      </div>
    );
  }

  // Use the correct actionId for each tab so responses are saved separately
  const actionId = currentTab.actionId;

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

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#2C3E7C] mb-2">Action 1: Products & Services Strategy</h1>
          <p className="text-gray-600">Define strategies for all three product lines</p>
        </div>

        {/* Three-Button Tab Selector */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 py-4 px-6 rounded-lg text-left transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-[#0D8BFF] to-[#2C3E7C] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-bold text-lg mb-1">{tab.label}</div>
                <div className={`text-sm ${selectedTab === tab.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {tab.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Form - Key changes to ensure correct rendering */}
        <div key={selectedTab}>
          <ActionFormWrapper
            action={currentActionMetadata}
            actionId={actionId}
            userId={userId!}
            initialResponses={{}}
          />
        </div>

        {/* Additional Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#2C3E7C] mb-4">
            Team Collaboration
          </h2>
          <div className="space-y-3">
            <a
              href={`/management/action/${selectedTab}/team-responses`}
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
              href={`/management/action/${selectedTab}/consensus`}
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
