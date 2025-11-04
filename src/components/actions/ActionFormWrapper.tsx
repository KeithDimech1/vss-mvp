'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ActionMetadata } from '@/lib/actions/types';
import QuestionRenderer from './QuestionRenderer';

interface ActionFormWrapperProps {
  action: ActionMetadata;
  actionId: string; // Database ID for API calls
  userId: string;
  initialResponses?: Record<string, any>;
}

export default function ActionFormWrapper({
  action,
  actionId,
  userId,
  initialResponses = {}
}: ActionFormWrapperProps) {
  const [responses, setResponses] = useState<Record<string, any>>(initialResponses);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [responseExists, setResponseExists] = useState(Object.keys(initialResponses).length > 0);

  // Handle response change
  const handleResponseChange = useCallback((questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    setHasUnsavedChanges(true);
    setSaveError(null);
  }, []);

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!hasUnsavedChanges) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const method = responseExists ? 'PATCH' : 'POST';

      const response = await fetch(`/api/actions/${actionId}/responses`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses,
          completed: false // Auto-save doesn't mark as completed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save responses');
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setResponseExists(true); // Mark that response now exists
    } catch (error) {
      console.error('Auto-save error:', error);
      setSaveError('Failed to auto-save. Your changes may not be saved.');
    } finally {
      setIsSaving(false);
    }
  }, [responses, hasUnsavedChanges, actionId, responseExists]);

  // Set up auto-save interval (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasUnsavedChanges) {
        autoSave();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoSave, hasUnsavedChanges]);

  // Handle manual submit
  const handleSubmit = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      // Validate required fields
      const missingRequired = action.questions
        .filter(q => q.required && !responses[q.id])
        .filter(q => {
          // Check if question should be shown (conditional logic)
          if (q.conditionalOn) {
            const conditionMet = responses[q.conditionalOn.questionId] === q.conditionalOn.value ||
              (Array.isArray(responses[q.conditionalOn.questionId]) &&
                responses[q.conditionalOn.questionId]?.includes(q.conditionalOn.value));
            return conditionMet; // Only include in validation if condition is met
          }
          return true;
        });

      if (missingRequired.length > 0) {
        setSaveError(`Please complete all required fields: ${missingRequired.map(q => q.question).join(', ')}`);
        setIsSaving(false);
        return;
      }

      const method = responseExists ? 'PATCH' : 'POST';

      const response = await fetch(`/api/actions/${actionId}/responses`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses,
          completed: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit responses');
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setResponseExists(true);

      // Show success message
      alert('Your responses have been submitted successfully!');
    } catch (error) {
      console.error('Submit error:', error);
      setSaveError('Failed to submit responses. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate progress
  const totalQuestions = action.questions.length;
  const answeredQuestions = action.questions.filter(q => {
    const hasValue = responses[q.id] !== undefined && responses[q.id] !== '' && responses[q.id] !== null;

    // Don't count conditional questions that aren't shown
    if (q.conditionalOn) {
      const conditionMet = responses[q.conditionalOn.questionId] === q.conditionalOn.value ||
        (Array.isArray(responses[q.conditionalOn.questionId]) &&
          responses[q.conditionalOn.questionId]?.includes(q.conditionalOn.value));
      return conditionMet && hasValue;
    }

    return hasValue;
  }).length;
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E7C] mb-2">
          Action {action.actionNumber}: {action.title}
        </h1>
        <p className="text-gray-600 mb-4">{action.description}</p>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Progress: <span className="font-semibold text-[#0D8BFF]">{progressPercentage}%</span>
            </span>
            <span className="text-gray-600">
              {answeredQuestions} of {totalQuestions} questions answered
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isSaving && (
              <span className="text-amber-600 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            )}

            {!isSaving && lastSaved && (
              <span className="text-green-600">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}

            {!isSaving && hasUnsavedChanges && (
              <span className="text-amber-600">Unsaved changes</span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#0D8BFF] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Error Message */}
      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{saveError}</p>
        </div>
      )}

      {/* Questions Form */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid grid-cols-1 gap-6">
            {action.questions.map((question) => (
              <QuestionRenderer
                key={question.id}
                question={question}
                value={responses[question.id]}
                onChange={handleResponseChange}
                responses={responses}
              />
            ))}
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <button
              type="button"
              onClick={autoSave}
              disabled={!hasUnsavedChanges || isSaving}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Draft
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-[#0D8BFF] text-white rounded-lg hover:bg-[#0A6FCC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {isSaving ? 'Submitting...' : 'Submit Responses'}
            </button>
          </div>
        </form>
      </div>

      {/* Help Text */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your responses are automatically saved every 30 seconds.
          You can leave and come back to continue later. Click "Submit Responses" when you're done.
        </p>
      </div>
    </div>
  );
}
