'use client';

import Link from 'next/link';

export default function CompleteUtopiaPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0D8BFF 0%, #2C3E7C 100%)' }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#2C3E7C' }}>
          Assessment Complete!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for completing the Unified Utopia Vision assessment.
          Your responses have been saved and will be used to build consensus
          across the management team.
        </p>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#0D8BFF' }}>
                8
              </div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#2C3E7C' }}>
                ✓
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-3" style={{ color: '#2C3E7C' }}>
            What happens next?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2" style={{ color: '#0D8BFF' }}>
                1.
              </span>
              <span>All management team responses will be collected</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: '#0D8BFF' }}>
                2.
              </span>
              <span>An analysis will identify areas of consensus and divergence</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: '#0D8BFF' }}>
                3.
              </span>
              <span>A workshop will be scheduled to build unified vision</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: '#0D8BFF' }}>
                4.
              </span>
              <span>Results will shape the 2-year, 5-year, and 10-year roadmap</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/actions/unified-utopia/view"
            className="px-6 py-3 rounded-lg font-medium border-2 transition-all hover:bg-gray-50"
            style={{ borderColor: '#0D8BFF', color: '#0D8BFF' }}
          >
            View My Responses
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg font-medium text-white transition-all"
            style={{
              background: 'linear-gradient(90deg, #0D8BFF 0%, #2C3E7C 100%)',
            }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
