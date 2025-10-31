'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SessionData {
  userId: string;
  username: string;
  fullName: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        console.error('Error fetching session:', error);
        router.push('/login');
      }
    };

    fetchSession();
  }, [router]);

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">VSS Platform</h1>
          <p className="text-sm text-blue-200 mt-1">Assessment System</p>
        </div>

        <nav className="mt-6">
          <Link
            href="/dashboard"
            className="block px-6 py-3 hover:bg-blue-800 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/assessment"
            className="block px-6 py-3 hover:bg-blue-800 transition-colors text-blue-300"
          >
            System 1 Assessment
          </Link>
          {session.role === 'ADMIN' && (
            <Link
              href="/dashboard/admin"
              className="block px-6 py-3 hover:bg-blue-800 transition-colors text-blue-300"
            >
              Admin Panel
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome, {session.fullName}
              </h2>
              <p className="text-sm text-gray-600">
                {session.role === 'ADMIN' ? 'Administrator' : 'Team Member'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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
