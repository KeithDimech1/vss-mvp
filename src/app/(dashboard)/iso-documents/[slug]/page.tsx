'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DocumentTemplate, DocumentSection, SectionQuestion } from '@/lib/iso-documents/types';

interface DocumentData {
  id: string;
  documentType: string;
  documentSlug: string;
  title: string;
  version: string;
  status: string;
  organizationName: string;
  effectiveDate: string | null;
  reviewDate: string | null;
  approvedBy: string | null;
  sections: Record<string, any>;
  policyStatement: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  document: DocumentData;
  template: DocumentTemplate;
  typeLabel: string;
  sectionStatuses: Record<string, string>;
}

// Status badge colors
const statusColors: Record<string, string> = {
  NOT_STARTED: 'bg-gray-100 text-gray-600',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  NEEDS_REVIEW: 'bg-blue-100 text-blue-800',
  COMPLETE: 'bg-green-100 text-green-800',
  APPROVED: 'bg-green-100 text-green-700'
};

const sectionStatusLabels: Record<string, string> = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  NEEDS_REVIEW: 'Needs Review',
  COMPLETE: 'Complete',
  APPROVED: 'Approved'
};

export default function IsoDocumentEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [template, setTemplate] = useState<DocumentTemplate | null>(null);
  const [typeLabel, setTypeLabel] = useState<string>('');
  const [sectionStatuses, setSectionStatuses] = useState<Record<string, string>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [sectionData, setSectionData] = useState<Record<string, Record<string, any>>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Fetch document data
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/iso-documents/${resolvedParams.slug}`);
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          if (response.status === 403) {
            router.push('/dashboard');
            return;
          }
          throw new Error('Failed to fetch document');
        }

        const data: ApiResponse = await response.json();
        setDocument(data.document);
        setTemplate(data.template);
        setTypeLabel(data.typeLabel);
        setSectionStatuses(data.sectionStatuses);
        setSectionData(data.document.sections || {});

        // Auto-expand first incomplete section
        if (data.template) {
          const firstIncomplete = data.template.sections.find(
            s => data.sectionStatuses[s.key] !== 'COMPLETE'
          );
          if (firstIncomplete) {
            setExpandedSection(firstIncomplete.key);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [resolvedParams.slug, router]);

  // Auto-save functionality
  const saveSection = useCallback(async (sectionKey: string, content: Record<string, any>) => {
    if (!document) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/iso-documents/${resolvedParams.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionKey,
          sectionContent: content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      const data = await response.json();
      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      // Update section status
      if (template) {
        const section = template.sections.find(s => s.key === sectionKey);
        if (section) {
          // Recalculate status locally
          const requiredQuestions = section.questions.filter(q => q.required);
          const allRequiredAnswered = requiredQuestions.every(q => {
            const value = content[q.id];
            return value !== undefined && value !== '' && value !== null;
          });
          const anyAnswered = section.questions.some(q => {
            const value = content[q.id];
            return value !== undefined && value !== '' && value !== null;
          });

          const newStatus = allRequiredAnswered ? 'COMPLETE' : anyAnswered ? 'IN_PROGRESS' : 'NOT_STARTED';
          setSectionStatuses(prev => ({ ...prev, [sectionKey]: newStatus }));
        }
      }
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  }, [document, resolvedParams.slug, template]);

  // Auto-save every 30 seconds if there are changes
  useEffect(() => {
    if (!hasUnsavedChanges || !expandedSection) return;

    const timer = setTimeout(() => {
      const content = sectionData[expandedSection] || {};
      saveSection(expandedSection, content);
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasUnsavedChanges, expandedSection, sectionData, saveSection]);

  // Handle question value change
  const handleValueChange = (sectionKey: string, questionKey: string, value: any) => {
    setSectionData(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        [questionKey]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Toggle section expansion
  const toggleSection = async (sectionKey: string) => {
    // Save current section before switching
    if (expandedSection && hasUnsavedChanges) {
      const content = sectionData[expandedSection] || {};
      await saveSection(expandedSection, content);
    }

    setExpandedSection(prev => prev === sectionKey ? null : sectionKey);
  };

  // Calculate overall progress
  const calculateProgress = (): number => {
    if (!template) return 0;
    const completed = Object.values(sectionStatuses).filter(s => s === 'COMPLETE').length;
    return Math.round((completed / template.sections.length) * 100);
  };

  // Render question input based on type
  const renderQuestionInput = (
    section: DocumentSection,
    question: SectionQuestion
  ) => {
    const value = sectionData[section.key]?.[question.id] ?? '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={e => handleValueChange(section.key, question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A6FCC] focus:border-transparent"
          />
        );

      case 'textarea':
      case 'rich_text':
        return (
          <textarea
            value={value}
            onChange={e => handleValueChange(section.key, question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={question.rows || 4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A6FCC] focus:border-transparent resize-y"
          />
        );

      case 'checkbox':
      case 'checklist':
        const checkOptions = question.type === 'checklist'
          ? question.checklistItems || []
          : (question.options || []).map(o => typeof o === 'string' ? o : o.value);
        return (
          <div className="space-y-2">
            {checkOptions.map(option => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option)}
                  onChange={e => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option);
                    handleValueChange(section.key, question.id, newValues);
                  }}
                  className="w-4 h-4 text-[#0A6FCC] border-gray-300 rounded focus:ring-[#0A6FCC]"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        const radioOptions = (question.options || []).map(o => typeof o === 'string' ? o : o.value);
        return (
          <div className="space-y-2">
            {radioOptions.map(option => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`${section.key}-${question.id}`}
                  value={option}
                  checked={value === option}
                  onChange={e => handleValueChange(section.key, question.id, e.target.value)}
                  className="w-4 h-4 text-[#0A6FCC] border-gray-300 focus:ring-[#0A6FCC]"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'dropdown':
        const dropOptions = (question.options || []).map(o => typeof o === 'string' ? o : o.value);
        return (
          <select
            value={value}
            onChange={e => handleValueChange(section.key, question.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A6FCC] focus:border-transparent"
          >
            <option value="">Select an option...</option>
            {dropOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={e => handleValueChange(section.key, question.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A6FCC] focus:border-transparent"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={e => handleValueChange(section.key, question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A6FCC] focus:border-transparent"
          />
        );

      case 'info':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            {question.helpText || question.defaultValue || 'Information section'}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={e => handleValueChange(section.key, question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A6FCC] focus:border-transparent"
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#C9A961]/10 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-[#0A6FCC] mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document || !template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#C9A961]/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Document</h2>
            <p className="text-red-600 mb-4">{error || 'Document not found'}</p>
            <Link
              href="/iso-documents"
              className="inline-flex items-center text-[#0A6FCC] hover:text-[#0A3161]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Documents
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#C9A961]/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/iso-documents"
            className="inline-flex items-center text-[#C9A961] hover:text-[#0A6FCC] mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documents
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#0A3161]">{document.title}</h1>
              <p className="text-sm text-gray-600 mt-1">{typeLabel}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded text-sm font-medium ${statusColors[document.status] || 'bg-gray-100'}`}>
                {document.status}
              </span>
              <span className="text-sm text-gray-500">v{document.version}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <div className="flex items-center gap-3">
              {saving && (
                <span className="text-sm text-[#0A6FCC] flex items-center gap-1">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              )}
              {lastSaved && !saving && (
                <span className="text-xs text-gray-500">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <span className="text-sm font-medium text-[#0A3161]">{progress}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#0A6FCC] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{Object.values(sectionStatuses).filter(s => s === 'COMPLETE').length} of {template.sections.length} sections complete</span>
            {hasUnsavedChanges && <span className="text-yellow-600">Unsaved changes</span>}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {template.sections.map((section, index) => {
            const isExpanded = expandedSection === section.key;
            const status = sectionStatuses[section.key] || 'NOT_STARTED';

            return (
              <div key={section.key} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Section Header */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.key)}
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#0A3161] text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="text-left">
                      <h3 className="font-medium text-[#0A3161]">{section.title}</h3>
                      {section.isoClause && (
                        <span className="text-xs text-gray-500">ISO Clause {section.isoClause}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[status]}`}>
                      {sectionStatusLabels[status]}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6">
                    {section.description && (
                      <p className="text-sm text-gray-600 mb-6">{section.description}</p>
                    )}

                    <div className="space-y-6">
                      {section.questions.map(question => (
                        <div key={question.id}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {question.question}
                            {question.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {question.helpText && (
                            <p className="text-xs text-gray-500 mb-2">{question.helpText}</p>
                          )}
                          {renderQuestionInput(section, question)}
                        </div>
                      ))}
                    </div>

                    {/* Section Actions */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          const content = sectionData[section.key] || {};
                          saveSection(section.key, content);
                        }}
                        disabled={saving}
                        className="px-4 py-2 text-sm text-[#0A6FCC] hover:text-[#0A3161] font-medium"
                      >
                        {saving ? 'Saving...' : 'Save Progress'}
                      </button>
                      <div className="flex gap-2">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => toggleSection(template.sections[index - 1].key)}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Previous
                          </button>
                        )}
                        {index < template.sections.length - 1 && (
                          <button
                            type="button"
                            onClick={async () => {
                              const content = sectionData[section.key] || {};
                              await saveSection(section.key, content);
                              toggleSection(template.sections[index + 1].key);
                            }}
                            className="px-4 py-2 text-sm bg-[#0A6FCC] text-white rounded hover:bg-[#0A3161]"
                          >
                            Save & Continue
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit for Review */}
        {progress === 100 && document.status === 'DRAFT' && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-medium text-green-800 mb-2">Ready for Review</h3>
            <p className="text-sm text-green-700 mb-4">
              All sections are complete. You can now submit this document for review and approval.
            </p>
            <button
              type="button"
              onClick={async () => {
                const response = await fetch(`/api/iso-documents/${resolvedParams.slug}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status: 'REVIEW' })
                });
                if (response.ok) {
                  setDocument(prev => prev ? { ...prev, status: 'REVIEW' } : prev);
                }
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Submit for Review
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-[#0A3161] mb-2">Tips for completing this document</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Your progress is automatically saved every 30 seconds</li>
            <li>• Click on any section to expand and edit</li>
            <li>• Required fields are marked with a red asterisk (*)</li>
            <li>• You can navigate between sections using Previous/Next buttons</li>
            <li>• Submit for review when all sections are complete</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
