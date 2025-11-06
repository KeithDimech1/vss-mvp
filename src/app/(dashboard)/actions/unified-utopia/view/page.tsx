'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { utopiaQuestions, type UtopiaResponses } from '@/lib/utopia-questions';

export default function ViewUtopiaPage() {
  const [responses, setResponses] = useState<UtopiaResponses | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  useEffect(() => {
    async function loadResponse() {
      try {
        const res = await fetch('/api/actions/unified-utopia/response');
        const data = await res.json();

        if (data.exists && data.response) {
          setResponses(data.response.responses);
          setSubmittedAt(data.response.submittedAt);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading response:', err);
        setLoading(false);
      }
    }
    loadResponse();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your responses...</p>
        </div>
      </div>
    );
  }

  if (!responses) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 mb-4">You haven't submitted an assessment yet.</p>
          <Link
            href="/actions/unified-utopia"
            className="inline-block px-6 py-3 rounded-lg font-medium text-white"
            style={{ backgroundColor: '#0D8BFF' }}
          >
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C3E7C' }}>
          Your Utopia Vision Responses
        </h1>
        {submittedAt && (
          <p className="text-gray-600">
            Submitted on {new Date(submittedAt).toLocaleDateString()} at{' '}
            {new Date(submittedAt).toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Responses */}
      <div className="space-y-6 mb-8">
        {utopiaQuestions.map((question, idx) => {
          const key = question.id as keyof UtopiaResponses;
          const answer = responses[key];
          const comment = responses[`${question.id}_comment` as keyof UtopiaResponses];

          return (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6">
              {/* Question Number */}
              <div
                className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3"
                style={{ backgroundColor: '#EBF5FF', color: '#0D8BFF' }}
              >
                Question {idx + 1}
              </div>

              {/* Question */}
              <h3 className="text-xl font-bold mb-4" style={{ color: '#2C3E7C' }}>
                {question.question}
              </h3>

              {/* Answer */}
              <div className="mb-4">
                <div className="font-medium text-gray-700 mb-2">Your Answer:</div>
                {Array.isArray(answer) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {answer.map((item, i) => (
                      <li key={i} className="text-gray-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {answer as string}
                  </div>
                )}
              </div>

              {/* Comment */}
              {comment && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="font-medium text-gray-700 mb-2">Additional Comments:</div>
                  <div className="text-gray-800 whitespace-pre-wrap bg-blue-50 p-4 rounded-lg">
                    {comment as string}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-lg font-medium border-2 transition-all hover:bg-gray-50"
          style={{ borderColor: '#0D8BFF', color: '#0D8BFF' }}
        >
          Print Responses
        </button>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-lg font-medium text-white transition-all"
          style={{ background: 'linear-gradient(90deg, #0D8BFF 0%, #2C3E7C 100%)' }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
