'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { system1Questions } from '@/lib/questions';

interface UserSubmission {
  user: {
    id: string;
    username: string;
    fullName: string;
    role: string;
  };
  assessment: {
    id: string;
    completed: boolean;
    submittedAt: string;
    responses: Record<string, string>;
  };
}

export default function SubmissionDetailPage() {
  const [submission, setSubmission] = useState<UserSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        // Verify admin session first
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

        // Fetch user submission
        const submissionRes = await fetch(`/api/admin/submissions/${userId}`);
        if (!submissionRes.ok) {
          throw new Error('Failed to fetch submission');
        }

        const data = await submissionRes.json();
        setSubmission(data);
      } catch (err) {
        console.error('Error fetching submission:', err);
        setError(err instanceof Error ? err.message : 'Failed to load submission');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [userId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#C9A961] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submission...</p>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Submission</h2>
          <p className="text-red-600">{error || 'Submission not found'}</p>
          <Link
            href="/admin"
            className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getQuestionObject = (questionId: string) => {
    return system1Questions.find(q => q.id === questionId);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center text-[#C9A961] hover:text-[#1B4332] font-medium mb-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Admin Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-[#1B4332]">Assessment Submission</h1>
      </div>

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-[#C9A961] to-[#1B4332] rounded-xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#1B4332] font-bold text-2xl mr-6 shadow-lg">
              {submission.user.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{submission.user.fullName}</h2>
              <div className="flex items-center gap-4 text-[#F5E6D3]">
                <p className="text-lg">@{submission.user.username}</p>
                <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-medium">
                  {submission.user.role}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#F5E6D3] text-sm mb-1">Submitted on</p>
            <p className="text-xl font-semibold">
              {new Date(submission.assessment.submittedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-[#F5E6D3] text-sm mt-1">
              {new Date(submission.assessment.submittedAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Responses */}
      <div className="space-y-6">
        {system1Questions.map((question, index) => {
          const response = submission.assessment.responses[question.id];

          return (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              {/* Question Header */}
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#C9A961] to-[#1B4332] rounded-lg flex items-center justify-center text-white font-bold mr-4">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-[#1B4332] mb-2">
                    {question.question}
                  </h3>
                  {question.helpText && (
                    <p className="text-sm text-gray-500 italic mb-3">
                      {question.helpText}
                    </p>
                  )}

                  {/* Response */}
                  <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-[#C9A961]/10 rounded-lg border border-[#C9A961]/30">
                    {question.type === 'radio' && question.options ? (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-[#C9A961] mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-800 font-medium">{response}</p>
                      </div>
                    ) : (
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {response || <span className="text-gray-400 italic">No response provided</span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Assessment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Questions</p>
            <p className="text-2xl font-bold text-[#1B4332]">{system1Questions.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Responses Provided</p>
            <p className="text-2xl font-bold text-green-600">
              {Object.keys(submission.assessment.responses).length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold text-green-600">100%</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/admin"
          className="px-6 py-3 bg-[#C9A961] text-white rounded-lg hover:bg-[#1B4332] transition-colors font-medium shadow-md hover:shadow-lg"
        >
          ← Back to Dashboard
        </Link>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-white text-[#1B4332] rounded-lg hover:shadow-md transition-all border-2 border-[#C9A961] font-medium"
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Submission
        </button>
      </div>
    </div>
  );
}
