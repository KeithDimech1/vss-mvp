'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { system1Questions } from '@/lib/questions'

export default function ViewAssessmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [assessment, setAssessment] = useState<any>(null)

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const res = await fetch('/api/assessment')
        const data = await res.json()

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

    loadAssessment()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your responses...</p>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return null
  }

  const responses = assessment.responses as Record<string, string>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Your System 1 Assessment Responses
        </h1>
        <p className="mt-2 text-gray-600">
          Submitted on{' '}
          {new Date(assessment.submittedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Responses */}
      <div className="space-y-6">
        {system1Questions.map((question, index) => {
          const response = responses[question.id]

          return (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
            >
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Question {index + 1}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {question.id}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  {question.question}
                </p>
                {question.helpText && (
                  <p className="text-sm text-gray-600 italic">
                    {question.helpText}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Your Response:
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {response ? (
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {response}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">No response provided</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
