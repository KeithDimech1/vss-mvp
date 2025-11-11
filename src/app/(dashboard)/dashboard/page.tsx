'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SessionData {
  userId: string;
  username: string;
  fullName: string;
  role: string;
}

interface Assessment {
  id: string;
  completed: boolean;
  submittedAt: string | null;
  responses: Record<string, string>;
}

export default function DashboardPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch session and assessment from API
    const fetchData = async () => {
      try {
        const [sessionRes, assessmentRes] = await Promise.all([
          fetch('/api/auth/session'),
          fetch('/api/assessment')
        ]);

        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();
          setSession(sessionData.user);
        }

        if (assessmentRes.ok) {
          const assessmentData = await assessmentRes.json();
          setAssessment(assessmentData.assessment);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if user is a manager
  const managementTeam = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];
  const isManager = session && managementTeam.includes(session.username);

  // Check if user can access data extraction review (Juan, Keith, or Fabian)
  const canAccessDataExtraction = session && ['juan', 'keith', 'fabian'].includes(session.username);

  const getAssessmentStatus = () => {
    if (!assessment) {
      return {
        label: 'Not Started',
        color: 'yellow',
        action: 'Start Assessment',
        link: '/assessment'
      };
    }
    if (assessment.completed) {
      return {
        label: 'Completed',
        color: 'green',
        action: 'View Submission',
        link: '/assessment/complete'
      };
    }
    const responseCount = Object.keys(assessment.responses || {}).length;
    return {
      label: `In Progress (${responseCount}/10 questions)`,
      color: 'blue',
      action: 'Continue Assessment',
      link: '/assessment'
    };
  };

  const status = getAssessmentStatus();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1B4332]">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the Viable System Model Assessment Platform
        </p>
      </div>

      {/* Management Access Card - Top Priority */}
      {isManager && (
        <Link href="/management">
          <div className="bg-gradient-to-r from-[#1B4332] via-[#2D5A45] to-[#C9A961] rounded-xl shadow-xl p-8 mb-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🏢</span>
                  <h2 className="text-3xl font-bold text-white">Lithodat VSM Meeting</h2>
                </div>
                <p className="text-[#F5E6D3] text-lg mb-4">
                  Strategic overview, action dashboard, and management insights
                </p>
                <div className="flex items-center gap-4 text-sm text-[#F5E6D3]/80">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Management Team Only
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Last Updated: Nov 3, 2025
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Data Extraction Review Card (Juan, Keith, Fabian) */}
      {canAccessDataExtraction && (
        <Link href="/data-extraction/process">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-xl shadow-xl p-8 mb-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">⚙️</span>
                  <h2 className="text-3xl font-bold text-white">Data Extraction Process Review</h2>
                </div>
                <p className="text-blue-50 text-lg mb-4">
                  Interactive review of the LithoData extraction workflow - Provide feedback and answer diagnostic questions
                </p>
                <div className="flex items-center gap-4 text-sm text-blue-50/80">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Juan, Keith & Fabian
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    English/Spanish
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    3 Pages: Process + Questions + Research
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Progress Card - Hidden as per requirements */}
      {/* <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-[#C9A961]">
        <h2 className="text-2xl font-bold text-[#1B4332] mb-6">
          Your Progress
        </h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-3 border-[#C9A961]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-[#C9A961]/10 rounded-xl border border-[#C9A961]/30 hover:shadow-md transition-shadow duration-300">
              <div>
                <h3 className="font-semibold text-[#1B4332] text-lg">System 1 Assessment</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Operations and implementation assessment
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-2 bg-${status.color}-100 text-${status.color}-800 rounded-lg text-sm font-semibold shadow-sm`}>
                  {status.label}
                </span>
                <Link
                  href={status.link}
                  className="px-6 py-3 bg-gradient-to-r from-[#C9A961] to-[#1B4332] text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-medium"
                >
                  {status.action}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div> */}


      {/* User Info */}
      {session && (
        <div className="mt-8 bg-gradient-to-r from-[#F5E6D3]/30 to-[#C9A961]/20 rounded-xl p-6 text-sm text-gray-700 border border-[#C9A961]/30 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1B4332] to-[#C9A961] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {session.fullName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-[#1B4332]">
                {session.fullName} <span className="text-gray-500 font-normal">({session.username})</span>
              </p>
              <p className="text-gray-600 text-xs mt-1">
                <strong>Role:</strong> {session.role === 'ADMIN' ? 'Administrator' : isManager ? 'Management Team Member' : 'Team Member'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
