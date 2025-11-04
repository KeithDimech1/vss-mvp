'use client';

import { useEffect, useState } from 'react';

export default function DebugAuthPanel() {
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        setSessionData(data);
        setLoading(false);
        console.log('[DEBUG AUTH PANEL] Session data:', data);
      })
      .catch(err => {
        console.error('[DEBUG AUTH PANEL] Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 shadow-lg max-w-md">
        <h3 className="font-bold text-yellow-900 mb-2">🔍 Debug Auth Panel</h3>
        <p className="text-sm text-yellow-800">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-[#C9A961]/20 border-2 border-blue-400 rounded-lg p-4 shadow-lg max-w-md z-50">
      <h3 className="font-bold text-blue-900 mb-2">🔍 Debug Auth Panel</h3>
      <div className="text-xs text-blue-900 space-y-1">
        <p><strong>Username:</strong> {sessionData?.user?.username || 'N/A'}</p>
        <p><strong>Full Name:</strong> {sessionData?.user?.fullName || 'N/A'}</p>
        <p><strong>Role:</strong> {sessionData?.user?.role || 'N/A'}</p>
        <p><strong>Is Manager:</strong> {sessionData?.user?.isManager ? '✅ YES' : '❌ NO'}</p>
        <p><strong>Current Path:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-semibold"
      >
        🔄 Restart / Clear Cache
      </button>
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-blue-700 hover:text-blue-900">
          View Raw JSON
        </summary>
        <pre className="mt-2 text-xs bg-white p-2 rounded border border-blue-300 overflow-auto max-h-40">
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      </details>
    </div>
  );
}
