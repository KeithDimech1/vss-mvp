'use client';

import React, { useState } from 'react';
import { ActionMetadata, ActionQuestion } from '@/lib/actions/types';

interface TeamMemberResponse {
  userId: string;
  username: string;
  fullName: string;
  responses: Record<string, any>;
  completed: boolean;
  submittedAt: string | null;
  updatedAt: string;
}

interface TeamResponseViewProps {
  action: ActionMetadata;
  teamResponses: TeamMemberResponse[];
  nonRespondents: { username: string; fullName: string }[];
}

export default function TeamResponseView({
  action,
  teamResponses,
  nonRespondents
}: TeamResponseViewProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');

  // Get unique sections (excluding info-type questions which don't have responses)
  const sections = Array.from(
    new Set(
      action.questions
        .filter(q => q.section && q.type !== 'info')
        .map(q => q.section!)
    )
  );

  // Format response for display
  const formatResponse = (question: ActionQuestion, value: any): string => {
    if (value === undefined || value === null || value === '') {
      return '—';
    }

    // Handle implementation_table type specifically
    if (question.type === 'implementation_table' && Array.isArray(value)) {
      return value
        .filter(row => row.change || row.time) // Filter out empty rows
        .map(row => `• ${row.change || '(no description)'}: ${row.time || '(no time)'}`)
        .join('\n') || '—';
    }

    // Handle boolean values
    if (typeof value === 'boolean') {
      return value ? '✓' : '—';
    }

    // Handle arrays
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '—';
      }

      // Handle array of objects - extract meaningful text
      if (typeof value[0] === 'object' && value[0] !== null) {
        return value.map(item => {
          // Try to find a text/label/name field
          return item.text || item.label || item.name || item.value || JSON.stringify(item);
        }).join(', ');
      }

      // Handle simple array values
      return value.join(', ');
    }

    // Handle object values
    if (typeof value === 'object') {
      // Try to extract meaningful text from common object structures
      if (value.text) return value.text;
      if (value.label) return value.label;
      if (value.name) return value.name;
      if (value.value) return value.value;

      // If it's a complex object, stringify it nicely
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }

    switch (question.type) {
      case 'checkbox':
        return value ? '✓' : '—';

      case 'currency':
        return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD`;

      case 'date':
        return new Date(value).toLocaleDateString();

      case 'number':
        return String(value);

      case 'radio':
      case 'dropdown':
      case 'text':
        return String(value);

      case 'textarea':
        const strValue = String(value);
        return strValue.length > 100 ? strValue.substring(0, 100) + '...' : strValue;

      default:
        return String(value);
    }
  };

  // Calculate completion stats
  const totalMembers = teamResponses.length + nonRespondents.length;
  const completedCount = teamResponses.filter(r => r.completed).length;
  const inProgressCount = teamResponses.filter(r => !r.completed).length;
  const notStartedCount = nonRespondents.length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#1B4332] mb-4">Team Response Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-3xl font-bold text-[#1B4332]">{totalMembers}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-700">In Progress</p>
            <p className="text-3xl font-bold text-amber-600">{inProgressCount}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-700">Not Started</p>
            <p className="text-3xl font-bold text-red-600">{notStartedCount}</p>
          </div>
        </div>

        {/* Non-respondents */}
        {nonRespondents.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-semibold text-red-800 mb-2">Waiting for responses from:</p>
            <ul className="list-disc list-inside text-sm text-red-700">
              {nonRespondents.map(member => (
                <li key={member.username}>{member.fullName} ({member.username})</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#1B4332]">Responses</h3>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('summary')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'summary'
                  ? 'bg-[#C9A961] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Summary View
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'detailed'
                  ? 'bg-[#C9A961] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Detailed View
            </button>
          </div>
        </div>

        {/* Summary View */}
        {viewMode === 'summary' && (
          <div className="space-y-6">
            {sections.map(section => {
              // Filter out info-type questions - they don't have responses
              const sectionQuestions = action.questions.filter(q => q.section === section && q.type !== 'info');

              // Skip sections with no actual questions
              if (sectionQuestions.length === 0) {
                return null;
              }

              return (
                <div key={section} className="border-b border-gray-200 pb-6 last:border-0">
                  <h4 className="text-lg font-bold text-[#1B4332] mb-4">{section}</h4>

                  <div className="space-y-4">
                    {sectionQuestions.map(question => (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-3">
                          {question.question}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {teamResponses.map(member => (
                            <div key={member.userId} className="bg-white rounded p-3 border border-gray-200">
                              <p className="text-xs font-semibold text-gray-600 mb-1">
                                {member.fullName}
                                {member.completed && (
                                  <span className="ml-1 text-green-600">✓</span>
                                )}
                              </p>
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">
                                {formatResponse(question, member.responses[question.id])}
                              </p>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => setSelectedQuestion(question.id)}
                          className="mt-2 text-sm text-[#C9A961] hover:text-[#0A6FCC] underline"
                        >
                          View full details →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed View */}
        {viewMode === 'detailed' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                    Question
                  </th>
                  {teamResponses.map(member => (
                    <th key={member.userId} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div>
                        {member.fullName}
                        {member.completed && (
                          <span className="ml-1 text-green-600">✓</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 normal-case">
                        {member.username}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {action.questions.filter(q => q.type !== 'info').map((question, idx) => (
                  <tr key={question.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-900 sticky left-0 bg-inherit z-10 max-w-xs">
                      <div className="font-semibold">{question.question}</div>
                      {question.section && (
                        <div className="text-xs text-gray-500 mt-1">{question.section}</div>
                      )}
                    </td>
                    {teamResponses.map(member => (
                      <td key={member.userId} className="px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap">
                        {formatResponse(question, member.responses[question.id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Question Detail Modal */}
      {selectedQuestion && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedQuestion(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const question = action.questions.find(q => q.id === selectedQuestion);
              if (!question) return null;

              return (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1B4332]">
                        {question.question}
                      </h3>
                      {question.section && (
                        <p className="text-sm text-gray-600 mt-1">{question.section}</p>
                      )}
                      {question.helpText && (
                        <p className="text-sm text-gray-500 mt-2">{question.helpText}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {teamResponses.map(member => (
                      <div key={member.userId} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-900">
                            {member.fullName}
                            {member.completed && (
                              <span className="ml-2 text-green-600 text-sm">✓ Completed</span>
                            )}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {member.submittedAt
                              ? `Submitted ${new Date(member.submittedAt).toLocaleDateString()}`
                              : `Updated ${new Date(member.updatedAt).toLocaleDateString()}`}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-gray-900 whitespace-pre-wrap">
                            {member.responses[question.id]
                              ? formatResponse(question, member.responses[question.id])
                              : '(No response)'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
