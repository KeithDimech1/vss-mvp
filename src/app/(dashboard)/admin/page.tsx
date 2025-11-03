'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SessionData {
  userId: string;
  username: string;
  fullName: string;
  role: string;
}

interface UserAssessment {
  user: {
    id: string;
    username: string;
    fullName: string;
    role: string;
  };
  assessment: {
    id: string;
    completed: boolean;
    submittedAt: string | null;
    responses: Record<string, string>;
  } | null;
}

interface AdminStats {
  totalUsers: number;
  assessmentsStarted: number;
  assessmentsCompleted: number;
  completionRate: number;
  users: UserAssessment[];
}

export default function AdminDashboardPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verify admin session
        const sessionRes = await fetch('/api/auth/session');
        if (!sessionRes.ok) {
          router.push('/login');
          return;
        }

        const sessionData = await sessionRes.json();
        if (sessionData.user.role !== 'ADMIN') {
          router.push('/dashboard');
          return;
        }

        setSession(sessionData.user);

        // Fetch admin stats
        const statsRes = await fetch('/api/admin/stats');
        if (!statsRes.ok) {
          throw new Error('Failed to fetch admin stats');
        }

        const statsData = await statsRes.json();
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0D8BFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const getStatusBadge = (user: UserAssessment) => {
    if (!user.assessment) {
      return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
          Not Started
        </span>
      );
    }
    if (user.assessment.completed) {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
          ✓ Completed
        </span>
      );
    }
    const responseCount = Object.keys(user.assessment.responses || {}).length;
    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
        In Progress ({responseCount}/10)
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#2C3E7C]">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          System overview and team assessment progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#0D8BFF]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <svg className="w-8 h-8 text-[#0D8BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-[#2C3E7C]">{stats.totalUsers}</p>
          <p className="text-xs text-gray-500 mt-1">Team members</p>
        </div>

        {/* Assessments Started */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Started</h3>
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-[#2C3E7C]">{stats.assessmentsStarted}</p>
          <p className="text-xs text-gray-500 mt-1">Assessments in progress</p>
        </div>

        {/* Assessments Completed */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Completed</h3>
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-[#2C3E7C]">{stats.assessmentsCompleted}</p>
          <p className="text-xs text-gray-500 mt-1">Submissions received</p>
        </div>

        {/* Completion Rate */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-[#2C3E7C]">{stats.completionRate}%</p>
          <p className="text-xs text-gray-500 mt-1">of total users</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-[#2C3E7C] mb-4">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#0D8BFF] to-[#2C3E7C] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
            style={{ width: `${stats.completionRate}%` }}
          >
            <span className="text-white text-sm font-bold">{stats.completionRate}%</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {stats.assessmentsCompleted} of {stats.totalUsers} users have completed their assessment
        </p>
      </div>

      {/* All Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2C3E7C]">All Team Members</h2>
          <p className="text-sm text-gray-600 mt-1">
            Click on a user to view their detailed submission
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.users.map((userAssessment) => (
                <tr key={userAssessment.user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0D8BFF] to-[#2C3E7C] rounded-full flex items-center justify-center text-white font-bold">
                        {userAssessment.user.fullName.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {userAssessment.user.fullName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{userAssessment.user.username}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      userAssessment.user.role === 'ADMIN'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {userAssessment.user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(userAssessment)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {userAssessment.assessment?.submittedAt
                      ? new Date(userAssessment.assessment.submittedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '—'
                    }
                  </td>
                  <td className="px-6 py-4">
                    {userAssessment.assessment?.completed ? (
                      <Link
                        href={`/admin/submissions/${userAssessment.user.id}`}
                        className="inline-flex items-center px-4 py-2 bg-[#0D8BFF] text-white rounded-lg hover:bg-[#2C3E7C] transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-[#2C3E7C] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white text-[#2C3E7C] rounded-lg hover:shadow-md transition-all duration-200 font-medium border border-gray-200"
          >
            ← Back to Dashboard
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-[#2C3E7C] rounded-lg hover:shadow-md transition-all duration-200 font-medium border border-gray-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
