'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SessionData {
  userId: string;
  username: string;
  fullName: string;
  role: string;
}

export default function DashboardPage() {
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    // Fetch session from API
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setSession(data.user);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the Viable System Model Assessment Platform
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Progress
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
            <div>
              <h3 className="font-medium text-gray-900">System 1 Assessment</h3>
              <p className="text-sm text-gray-600">
                Operations and implementation assessment
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Not Started
              </span>
              <Link
                href="/dashboard/assessment"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-800">
              About System 1
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            System 1 in the Viable System Model represents the operational units
            that perform the primary activities of the organization. This
            assessment will evaluate how well these operations are structured and
            functioning.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-800">
              Next Steps
            </h3>
          </div>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Complete the System 1 assessment questionnaire</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Review your responses before submission</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>View aggregated team results (if admin)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* User Info */}
      {session && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p>
            <strong>Logged in as:</strong> {session.fullName} ({session.username})
          </p>
          <p>
            <strong>Role:</strong> {session.role}
          </p>
        </div>
      )}
    </div>
  );
}
