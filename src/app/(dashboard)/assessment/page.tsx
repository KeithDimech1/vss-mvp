'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { system1Questions, getTotalQuestions } from '@/lib/questions'

interface AssessmentResponse {
  [key: string]: string
}

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<AssessmentResponse>({})
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const totalSteps = getTotalQuestions()
  const currentQuestion = system1Questions[currentStep]
  const isLastStep = currentStep === totalSteps - 1

  // Load existing assessment on mount
  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const res = await fetch('/api/assessment')
        const data = await res.json()

        if (data.assessment) {
          setAssessmentId(data.assessment.id)
          setResponses(data.assessment.responses || {})

          // If already completed, redirect to view
          if (data.assessment.completed) {
            router.push('/assessment/complete')
            return
          }
        }
      } catch (err) {
        console.error('Failed to load assessment:', err)
        setError('Failed to load assessment')
      } finally {
        setLoading(false)
      }
    }

    loadAssessment()
  }, [router])

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(responses).length > 0) {
        saveDraft(true) // silent save
      }
    }, 30000) // 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [responses])

  // Save draft function
  const saveDraft = useCallback(async (silent = false) => {
    if (!silent) setSaving(true)
    setError(null)

    try {
      const res = await fetch('/api/assessment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ responses })
      })

      if (!res.ok) {
        throw new Error('Failed to save draft')
      }

      const data = await res.json()
      setAssessmentId(data.assessment.id)
      setLastSaved(new Date())
    } catch (err) {
      console.error('Failed to save draft:', err)
      if (!silent) {
        setError('Failed to save draft. Please try again.')
      }
    } finally {
      if (!silent) setSaving(false)
    }
  }, [responses])

  // Handle answer change
  const handleAnswerChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Navigate to next question
  const handleNext = async () => {
    // Save before moving forward
    await saveDraft(true)

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Submit assessment
  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/assessment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ responses })
      })

      if (!res.ok) {
        throw new Error('Failed to submit assessment')
      }

      // Redirect to completion page
      router.push('/assessment/complete')
    } catch (err) {
      console.error('Failed to submit assessment:', err)
      setError('Failed to submit assessment. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">System 1 Assessment</h1>
        <p className="mt-2 text-gray-600">
          Operational Units - Understanding the core operational parts of your organization
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {currentQuestion.question}
          </h2>
          {currentQuestion.helpText && (
            <p className="text-sm text-gray-600 italic">
              {currentQuestion.helpText}
            </p>
          )}
        </div>

        {/* Answer Input */}
        <div className="mb-6">
          {currentQuestion.type === 'textarea' ? (
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={8}
              placeholder={currentQuestion.placeholder}
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            />
          ) : currentQuestion.type === 'radio' ? (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={responses[currentQuestion.id] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          ) : currentQuestion.type === 'text' ? (
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={currentQuestion.placeholder}
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            />
          ) : null}
        </div>

        {/* Save Status */}
        {lastSaved && (
          <div className="text-sm text-gray-500 text-right mb-4">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <button
          onClick={() => saveDraft(false)}
          disabled={saving}
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Draft'}
        </button>

        {!isLastStep ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        )}
      </div>

      {/* Progress Indicator Dots */}
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-blue-600'
                : responses[system1Questions[index].id]
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
            aria-label={`Go to question ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
