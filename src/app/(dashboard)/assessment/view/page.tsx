'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { system1Questions } from '@/lib/questions'

interface SessionData {
  userId: string;
  username: string;
  fullName: string;
  role: string;
}

export default function ViewAssessmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [assessment, setAssessment] = useState<any>(null)
  const [session, setSession] = useState<SessionData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch session and assessment
        const [sessionRes, assessmentRes] = await Promise.all([
          fetch('/api/auth/session'),
          fetch('/api/assessment')
        ]);

        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();
          setSession(sessionData.user);
        }

        const data = await assessmentRes.json()

        if (data.assessment && data.assessment.completed) {
          setAssessment(data.assessment)
        } else {
          // If no completed assessment, redirect to assessment page
          router.push('/assessment')
        }
      } catch (err) {
        console.error('Failed to load assessment:', err)
        router.push('/assessment')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#C9A961] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your responses...</p>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return null
  }

  const responses = assessment.responses as Record<string, string>

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-[#C9A961] hover:text-[#1B4332] font-medium mb-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-[#1B4332]">Your Assessment Responses</h1>
        <p className="mt-2 text-gray-600">
          System 1: Operational Units Assessment
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-[#C9A961] to-[#1B4332] rounded-xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {session && (
              <>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#1B4332] font-bold text-2xl mr-6 shadow-lg">
                  {session.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{session.fullName}</h2>
                  <p className="text-[#F5E6D3]">@{session.username}</p>
                </div>
              </>
            )}
          </div>
          <div className="text-right">
            <p className="text-[#F5E6D3] text-sm mb-1">Submitted on</p>
            <p className="text-xl font-semibold">
              {new Date(assessment.submittedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-[#F5E6D3] text-sm mt-1">
              {new Date(assessment.submittedAt).toLocaleTimeString('en-US', {
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
          const response = responses[question.id]

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
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-green-800">Assessment Complete</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Thank you for completing the System 1 Assessment. Your responses have been recorded and will contribute to our organizational analysis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Questions</p>
            <p className="text-2xl font-bold text-[#1B4332]">{system1Questions.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Responses Provided</p>
            <p className="text-2xl font-bold text-green-600">
              {Object.keys(responses).length}
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
          href="/dashboard"
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
          Print Responses
        </button>
      </div>
    </div>
  )
}
