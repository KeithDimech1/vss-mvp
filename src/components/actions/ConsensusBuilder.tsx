'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ActionMetadata, ActionQuestion } from '@/lib/actions/types';

interface TeamMemberResponse {
  userId: string;
  username: string;
  fullName: string;
  responses: Record<string, any>;
  completed: boolean;
  submittedAt: string | null;
}

interface ConsensusData {
  consensusData: Record<string, any>;
  notes: string;
  resolved: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
}

interface ConsensusBuilderProps {
  action: ActionMetadata;
  actionSlug: string;
  teamResponses: TeamMemberResponse[];
  existingConsensus: ConsensusData | null;
  currentUserId: string;
}

export default function ConsensusBuilder({
  action,
  actionSlug,
  teamResponses,
  existingConsensus,
  currentUserId
}: ConsensusBuilderProps) {
  const [consensusData, setConsensusData] = useState<Record<string, any>>(
    existingConsensus?.consensusData || {}
  );
  const [notes, setNotes] = useState(existingConsensus?.notes || '');
  const [resolved, setResolved] = useState(existingConsensus?.resolved || false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  // Handle consensus field change
  const handleConsensusChange = useCallback((questionId: string, value: any) => {
    setConsensusData(prev => ({
      ...prev,
      [questionId]: value
    }));
    setHasUnsavedChanges(true);
    setSaveError(null);
  }, []);

  // Toggle question expansion
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  // Expand all questions
  const expandAll = () => {
    setExpandedQuestions(new Set(action.questions.map(q => q.id)));
  };

  // Collapse all questions
  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!hasUnsavedChanges) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(`/api/actions/${actionSlug}/consensus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consensusData,
          notes,
          resolved
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save consensus');
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Auto-save error:', error);
      setSaveError('Failed to auto-save. Your changes may not be saved.');
    } finally {
      setIsSaving(false);
    }
  }, [consensusData, notes, resolved, hasUnsavedChanges, actionSlug]);

  // Set up auto-save interval (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasUnsavedChanges) {
        autoSave();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [autoSave, hasUnsavedChanges]);

  // Handle resolve toggle
  const handleResolveToggle = async () => {
    const newResolvedState = !resolved;
    setResolved(newResolvedState);
    setHasUnsavedChanges(true);

    // Immediate save when resolving
    if (newResolvedState) {
      await autoSave();
    }
  };

  // Format response for display
  const formatResponse = (question: ActionQuestion, value: any): string => {
    if (value === undefined || value === null || value === '') {
      return '—';
    }

    // Debug logging to understand data structure
    if (question.type === 'implementation_table') {
      console.log('Implementation table value:', JSON.stringify(value, null, 2));
      console.log('Is array?', Array.isArray(value));
      console.log('Value type:', typeof value);
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
        return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 0 })} USD`;

      case 'date':
        return new Date(value).toLocaleDateString();

      case 'radio':
      case 'dropdown':
        return String(value);

      default:
        return String(value);
    }
  };

  // Get unique sections
  const sections = Array.from(
    new Set(
      action.questions
        .filter(q => q.section)
        .map(q => q.section!)
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1B4332]">Build Consensus</h2>
            <p className="text-gray-600 mt-1">
              Review team responses and create consensus decisions
            </p>
          </div>

          <div className="flex items-center gap-4">
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
              <span className="text-green-600 text-sm">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}

            {!isSaving && hasUnsavedChanges && (
              <span className="text-amber-600 text-sm">Unsaved changes</span>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-lg ${
            resolved
              ? 'bg-green-100 text-green-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {resolved ? '✓ Consensus Reached' : 'In Progress'}
          </div>

          <button
            onClick={handleResolveToggle}
            className={`px-4 py-2 rounded-lg transition-colors ${
              resolved
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {resolved ? 'Reopen for Discussion' : 'Mark as Resolved'}
          </button>
        </div>

        {/* Response Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              <strong>{teamResponses.filter(r => r.completed).length}</strong> of{' '}
              <strong>{teamResponses.length}</strong> members completed
            </span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{saveError}</p>
        </div>
      )}

      {/* Expand/Collapse Controls */}
      <div className="flex gap-2">
        <button
          onClick={expandAll}
          className="px-4 py-2 bg-[#C9A961]/20 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Collapse All
        </button>
      </div>

      {/* Questions by Section */}
      <div className="space-y-6">
        {sections.map(section => {
          const sectionQuestions = action.questions.filter(q => q.section === section);

          return (
            <div key={section} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#1B4332] mb-4 pb-2 border-b-2 border-[#C9A961]">
                {section}
              </h3>

              <div className="space-y-4">
                {sectionQuestions.map(question => {
                  const isExpanded = expandedQuestions.has(question.id);

                  return (
                    <div key={question.id} className="border border-gray-200 rounded-lg">
                      {/* Question Header */}
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 text-left">
                          {question.question}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            isExpanded ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Question Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-4">
                          {/* Team Responses */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-sm text-gray-700 mb-3">Team Responses:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {teamResponses.map(member => (
                                <div key={member.userId} className="bg-white border border-gray-200 rounded p-3">
                                  <p className="text-xs font-semibold text-gray-600 mb-1">
                                    {member.fullName}
                                    {member.completed && (
                                      <span className="ml-1 text-green-600">✓</span>
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-900">
                                    {formatResponse(question, member.responses[question.id])}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Consensus Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Consensus Decision:
                            </label>
                            <textarea
                              value={consensusData[question.id] || ''}
                              onChange={(e) => handleConsensusChange(question.id, e.target.value)}
                              placeholder="Enter the agreed-upon decision or consensus for this question..."
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent resize-y"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Notes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-[#1B4332] mb-4">Overall Notes & Discussion</h3>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Add any overall notes, discussion points, or action items here..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent resize-y"
        />
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={autoSave}
            disabled={!hasUnsavedChanges || isSaving}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save Now
          </button>

          <div className="text-sm text-gray-600">
            Auto-saves every 30 seconds
          </div>
        </div>
      </div>
    </div>
  );
}
