'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface SessionData {
  userId: string;
  username: string;
  fullName: string;
  role: string;
  isManager: boolean;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [vsmMeetingExpanded, setVsmMeetingExpanded] = useState(false);
  const [dataExtractionExpanded, setDataExtractionExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch session from API
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        setSession(data.user);
        setIsLoading(false);
      } catch (error) {
        console.error('[LAYOUT] Error fetching session:', error);
        router.push('/login');
      }
    };

    fetchSession();
  }, []); // Empty dependency array - only fetch session once on mount

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Check if user is a manager (from database field)
  const isManager = session?.isManager || false;

  // Check if user can access data extraction
  const canAccessDataExtraction = ['juan', 'keith', 'fabian'].includes((session?.username || '').toLowerCase());

  // Check if user can access finance dashboard
  const canAccessFinance = ['kristy', 'keith', 'fabian'].includes((session?.username || '').toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F5E6D3]/20 to-[#C9A961]/10">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#1B4332] to-[#0F2922] text-white shadow-2xl">
        <div className="p-6 border-b border-white/10 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-3">
            <Image
              src="/clair-logo.png"
              alt="Clair Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#F5E6D3]">VSS Platform</h1>
          <p className="text-sm text-[#C9A961] mt-1 font-light">Assessment System</p>
        </div>

        <nav className="mt-6">
          <Link
            href="/dashboard"
            className="block px-6 py-3 hover:bg-[#C9A961]/20 transition-all duration-200 border-l-4 border-transparent hover:border-[#C9A961]"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </div>
          </Link>
          {canAccessFinance && (
            <Link
              href="/finance"
              className="block px-6 py-3 hover:bg-[#C9A961]/20 transition-all duration-200 border-l-4 border-transparent hover:border-[#C9A961] text-[#F5E6D3]/80 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Finance</span>
              </div>
            </Link>
          )}
          {/* Assessment page hidden as per requirements */}
          {/* <Link
            href="/assessment"
            className="block px-6 py-3 hover:bg-[#C9A961]/20 transition-all duration-200 border-l-4 border-transparent hover:border-[#C9A961] text-[#F5E6D3]/80 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>System 1 Assessment</span>
            </div>
          </Link> */}
          {isManager && (
            <>
              {/* HR Review Dashboard */}
              <Link
                href="/hr-review"
                className="block px-6 py-3 hover:bg-[#C9A961]/20 transition-all duration-200 border-l-4 border-transparent hover:border-[#C9A961] text-[#F5E6D3]/80 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>HR Review</span>
                </div>
              </Link>

              {/* VSM Meeting Dropdown */}
              <div>
                <button
                  onClick={() => setVsmMeetingExpanded(!vsmMeetingExpanded)}
                  className="w-full text-left px-6 py-3 hover:bg-[#C9A961]/20 transition-all duration-200 border-l-4 border-transparent hover:border-[#C9A961] text-[#F5E6D3]/80 hover:text-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>VSM Meeting</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${vsmMeetingExpanded ? 'transform rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                {/* Action Items Submenu */}
                {vsmMeetingExpanded && (
                  <div className="bg-[#0F2922]/50">
                    <Link
                      href="/management/action/products-services"
                      className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-white"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <span>Action 1: Products & Services</span>
                      </div>
                    </Link>
                    <Link
                      href="/management/action/unified-utopia"
                      className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-white"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <span>Action 2: Unified Utopia</span>
                      </div>
                    </Link>
                    <Link
                      href="/management/action/setup-departments"
                      className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-white"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <span>Action 3: Setup Departments</span>
                      </div>
                    </Link>
                    <Link
                      href="/management/action/okrs"
                      className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-[#F5E6D3]/80 hover:text-white opacity-50 cursor-not-allowed"
                    >
                      Action 4: Implementation Plan
                    </Link>
                    <Link
                      href="/management/action/intelligence"
                      className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-[#F5E6D3]/80 hover:text-white opacity-50 cursor-not-allowed"
                    >
                      Action 5: System 4 Intelligence
                    </Link>
                    <Link
                      href="/management/action/career-paths"
                      className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-[#F5E6D3]/80 hover:text-white opacity-50 cursor-not-allowed"
                    >
                      Action 6: Career Paths
                    </Link>
                    <Link
                      href="/management/action/realtime-intelligence"
                      className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-[#F5E6D3]/80 hover:text-white opacity-50 cursor-not-allowed"
                    >
                      Action 7: Realtime Amplifiers and Attenuators
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Data Extraction Review - Expandable for authorized users */}
          {canAccessDataExtraction && (
            <div>
              <button
                onClick={() => setDataExtractionExpanded(!dataExtractionExpanded)}
                className="w-full text-left px-6 py-3 hover:bg-[#C9A961]/20 transition-all duration-200 border-l-4 border-transparent hover:border-[#C9A961] text-[#F5E6D3]/80 hover:text-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Data Extraction Review</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dataExtractionExpanded ? 'transform rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Data Extraction Submenu */}
              {dataExtractionExpanded && (
                <div className="bg-[#0F2922]/50">
                  <Link
                    href="/data-extraction/process"
                    className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-white"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>Process Flow</span>
                    </div>
                  </Link>
                  <Link
                    href="/data-extraction/questions"
                    className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-white"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>Questions</span>
                    </div>
                  </Link>
                  <Link
                    href="/data-extraction/research"
                    className="block px-6 py-2 pl-12 hover:bg-[#C9A961]/20 transition-all duration-200 text-sm text-white"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>Research</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}
          {session.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="block px-6 py-3 hover:bg-[#C9A961]/20 transition-all duration-200 border-l-4 border-transparent hover:border-[#C9A961] text-[#F5E6D3]/80 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Admin Panel</span>
              </div>
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-md border-b border-gray-200">
          <div className="px-8 py-5 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-[#1B4332]">
                Welcome, {session.fullName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {session.role === 'ADMIN' ? 'Administrator' : isManager ? 'Management Team' : 'Team Member'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
