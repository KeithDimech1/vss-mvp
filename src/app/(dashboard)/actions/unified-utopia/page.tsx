'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { utopiaQuestions, type UtopiaResponses } from '@/lib/utopia-questions';

export default function UnifiedUtopiaPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<UtopiaResponses>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const totalQuestions = utopiaQuestions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  // Load existing response
  useEffect(() => {
    async function loadResponse() {
      try {
        const res = await fetch('/api/actions/unified-utopia/response');
        const data = await res.json();

        if (data.exists && data.response) {
          setResponses(data.response.responses || {});
        }
      } catch (err) {
        console.error('Error loading response:', err);
      }
    }
    loadResponse();
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(responses).length > 0) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [responses]);

  const handleSaveDraft = async () => {
    try {
      setSaveStatus('saving');
      const res = await fetch('/api/actions/unified-utopia/response', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses }),
      });

      if (!res.ok) throw new Error('Failed to save draft');

      setLastSaved(new Date());
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error saving draft:', err);
      setSaveStatus('idle');
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const allAnswered = utopiaQuestions.every((q) => {
      const key = q.id as keyof UtopiaResponses;
      return responses[key] !== undefined && responses[key] !== '';
    });

    if (!allAnswered) {
      setError('Please answer all questions before submitting');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/actions/unified-utopia/response', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses }),
      });

      if (!res.ok) throw new Error('Failed to submit response');

      router.push('/actions/unified-utopia/complete');
    } catch (err) {
      setError('Failed to submit. Please try again.');
      setLoading(false);
    }
  };

  const currentQuestion = utopiaQuestions[currentStep];

  const handleAnswer = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleComment = (questionId: string, comment: string) => {
    setResponses((prev) => ({
      ...prev,
      [`${questionId}_comment`]: comment,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestionInput = () => {
    const key = currentQuestion.id as keyof UtopiaResponses;
    const value = responses[key];

    switch (currentQuestion.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, idx) => (
              <label
                key={idx}
                className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                style={{
                  borderColor: value === option ? '#0D8BFF' : '#e5e7eb',
                  backgroundColor: value === option ? '#EBF5FF' : 'white',
                }}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="mt-1 mr-3"
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const checkboxValues = (value as string[]) || [];
        const maxSelections = currentQuestion.maxSelections || 999;

        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-3">
              {maxSelections < 999 && `Select up to ${maxSelections} options`}
            </p>
            {currentQuestion.options?.map((option, idx) => {
              const isChecked = checkboxValues.includes(option);
              const isDisabled =
                !isChecked &&
                checkboxValues.length >= maxSelections;

              return (
                <label
                  key={idx}
                  className={`flex items-start p-4 border-2 rounded-lg transition-colors ${
                    isDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-gray-50'
                  }`}
                  style={{
                    borderColor: isChecked ? '#0D8BFF' : '#e5e7eb',
                    backgroundColor: isChecked ? '#EBF5FF' : 'white',
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...checkboxValues, option]
                        : checkboxValues.filter((v) => v !== option);
                      handleAnswer(currentQuestion.id, newValues);
                    }}
                    className="mt-1 mr-3"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              );
            })}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={(value as string) || ''}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            rows={6}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="Describe your vision..."
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C3E7C' }}>
          Action 2: Unified Utopia Vision
        </h1>
        <p className="text-gray-600">
          Answer 8 core questions to help build consensus on Lithodat's unified vision
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentStep + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0D8BFF 0%, #2C3E7C 100%)',
            }}
          />
        </div>

        {/* Question Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {utopiaQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                idx === currentStep
                  ? 'bg-blue-600 scale-125'
                  : responses[utopiaQuestions[idx].id as keyof UtopiaResponses]
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
              onClick={() => setCurrentStep(idx)}
            />
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#2C3E7C' }}>
            {currentQuestion.question}
          </h2>
          {currentQuestion.helpText && (
            <p className="text-gray-600 italic">{currentQuestion.helpText}</p>
          )}
        </div>

        {/* Question Input */}
        <div className="mb-6">{renderQuestionInput()}</div>

        {/* Comment Section (for all except Q8 which is already a textarea) */}
        {currentQuestion.type !== 'textarea' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional comments (optional)
            </label>
            <textarea
              value={(responses[`${currentQuestion.id}_comment` as keyof UtopiaResponses] as string) || ''}
              onChange={(e) => handleComment(currentQuestion.id, e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Add any additional context or explanation..."
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: currentStep === 0 ? '#e5e7eb' : '#0D8BFF',
            color: currentStep === 0 ? '#9ca3af' : 'white',
          }}
        >
          Previous
        </button>

        <div className="flex items-center gap-4">
          {/* Save Status */}
          {saveStatus === 'saving' && (
            <span className="text-sm text-gray-600">Saving...</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-sm text-green-600">✓ Saved</span>
          )}
          {lastSaved && saveStatus === 'idle' && (
            <span className="text-sm text-gray-500">
              Last saved {lastSaved.toLocaleTimeString()}
            </span>
          )}

          <button
            onClick={handleSaveDraft}
            className="px-6 py-3 rounded-lg font-medium border-2 transition-all hover:bg-gray-50"
            style={{ borderColor: '#0D8BFF', color: '#0D8BFF' }}
          >
            Save Draft
          </button>

          {currentStep < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-lg font-medium text-white transition-all"
              style={{ backgroundColor: '#0D8BFF' }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(90deg, #0D8BFF 0%, #2C3E7C 100%)',
              }}
            >
              {loading ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
