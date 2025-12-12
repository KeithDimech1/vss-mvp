'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  documentTypeLabels,
  documentTypeDescriptions,
  isTemplateAvailable
} from '@/lib/iso-documents';
import { IsoDocumentType } from '@/lib/iso-documents/types';

export default function NewIsoDocumentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedType = searchParams.get('type') as IsoDocumentType | null;

  const [selectedType, setSelectedType] = useState<IsoDocumentType | null>(preselectedType);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Document types that can be created
  const documentTypes: IsoDocumentType[] = [
    'HSE_POLICY',
    'QUALITY_POLICY',
    'ENVIRONMENTAL_POLICY',
    'OHS_POLICY',
    'IMS_MANUAL'
  ];

  const handleCreate = async () => {
    if (!selectedType) {
      setError('Please select a document type');
      return;
    }

    if (!isTemplateAvailable(selectedType)) {
      setError('This document type is not yet available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/iso-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: selectedType,
          title: title || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create document');
      }

      // Redirect to the new document editor
      router.push(`/iso-documents/${data.document.documentSlug}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#C9A961]/10 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/iso-documents"
            className="inline-flex items-center text-[#C9A961] hover:text-[#0A6FCC] mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documents
          </Link>
          <h1 className="text-3xl font-bold text-[#0A3161]">Create New ISO Document</h1>
          <p className="mt-2 text-gray-600">
            Select the type of document you want to create and customize its title.
          </p>
        </div>

        {/* Document Type Selection */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0A3161]">1. Select Document Type</h2>
          </div>
          <div className="p-6 space-y-3">
            {documentTypes.map(type => {
              const available = isTemplateAvailable(type);
              return (
                <button
                  key={type}
                  type="button"
                  disabled={!available}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedType === type
                      ? 'border-[#0A6FCC] bg-blue-50'
                      : available
                        ? 'border-gray-200 hover:border-[#C9A961] hover:bg-gray-50'
                        : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-[#0A3161]">
                        {documentTypeLabels[type]}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {documentTypeDescriptions[type]}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {available ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Available
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      )}
                      {selectedType === type && (
                        <svg className="w-5 h-5 text-[#0A6FCC]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Document Title */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0A3161]">2. Document Title (Optional)</h2>
          </div>
          <div className="p-6">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={selectedType ? documentTypeLabels[selectedType] : 'Enter document title...'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A6FCC] focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">
              Leave blank to use the default title based on document type.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link
            href="/iso-documents"
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!selectedType || loading || !isTemplateAvailable(selectedType || 'HSE_POLICY')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedType && isTemplateAvailable(selectedType)
                ? 'bg-[#0A6FCC] text-white hover:bg-[#0A3161]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </span>
            ) : (
              'Create Document'
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-[#0A3161] mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#0A6FCC] mt-0.5">1.</span>
              <span>Your document will be created with a draft status</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0A6FCC] mt-0.5">2.</span>
              <span>You&apos;ll be guided through each section with tailored questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0A6FCC] mt-0.5">3.</span>
              <span>Your progress is auto-saved as you work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0A6FCC] mt-0.5">4.</span>
              <span>When complete, submit for review and approval</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
