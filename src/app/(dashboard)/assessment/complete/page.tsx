'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AssessmentCompletePage() {
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
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Success Message */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Assessment Complete!
        </h1>
        <p className="text-lg text-gray-700">
          Thank you for completing the System 1 Assessment
        </p>
      </div>

      {/* Submission Details */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Submission Details
        </h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="font-medium">Submitted:</span>
            <span>
              {new Date(assessment.submittedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="font-medium">Status:</span>
            <span className="text-green-600 font-semibold">Completed</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Questions Answered:</span>
            <span>{Object.keys(assessment.responses).length}</span>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Happens Next?
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <svg
              className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Your responses have been saved and will be reviewed by the leadership team
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>
              We'll analyze all team member responses to identify patterns and opportunities
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span>
              Results will be shared with the team and used to guide our strategic planning
            </span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
        >
          Return to Dashboard
        </Link>
        <Link
          href="/assessment/view"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
        >
          View My Responses
        </Link>
      </div>

      {/* Thank You Message */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 italic">
          Thank you for taking the time to provide thoughtful responses. Your input is valuable
          to Lithodat's strategic development.
        </p>
      </div>
    </div>
  )
}
