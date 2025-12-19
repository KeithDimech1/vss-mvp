'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SplitPaneEditor from '@/components/documents/SplitPaneEditor';

interface Document {
  id: string;
  title: string;
  slug: string;
  documentType: string;
  description: string | null;
  currentVersion: {
    id: string;
    versionNumber: number;
    htmlContent: string;
    cssContent: string;
  } | null;
  versions: Array<{
    id: string;
    versionNumber: number;
    versionName: string | null;
    createdAt: string;
  }>;
}

export default function EditDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch document');
      }
      const data = await response.json();
      setDocument(data.document);
      setHtml(data.document.currentVersion?.htmlContent || '');
      setCss(data.document.currentVersion?.cssContent || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (htmlContent: string, cssContent: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent,
          cssContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save document');
      }

      // Refresh document data
      await fetchDocument();
    } catch (err) {
      console.error('Save error:', err);
      throw err; // Re-throw to let SplitPaneEditor handle the error
    }
  };

  const handleExportPdf = () => {
    window.open(`/api/documents/${documentId}/pdf`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error || 'Document not found'}</p>
          <button
            onClick={() => router.push('/documents')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            ← Back to Documents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="bg-white border-b border-gray-300 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/documents')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back
          </button>
          <div className="border-l border-gray-300 pl-4">
            <h1 className="text-xl font-bold text-gray-900">{document.title}</h1>
            <p className="text-sm text-gray-600">
              Version {document.currentVersion?.versionNumber || 1}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVersionHistory(!showVersionHistory)}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Version History ({document.versions.length})
          </button>
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Version history sidebar (if open) */}
      {showVersionHistory && (
        <div className="absolute right-0 top-16 bottom-0 w-80 bg-white border-l border-gray-300 shadow-lg z-10 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Version History</h3>
              <button
                onClick={() => setShowVersionHistory(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {document.versions.map((version) => (
                <div
                  key={version.id}
                  className={`p-3 border rounded-md ${
                    version.id === document.currentVersion?.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      Version {version.versionNumber}
                    </span>
                    {version.id === document.currentVersion?.id && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  {version.versionName && (
                    <p className="text-sm text-gray-600 mt-1">
                      {version.versionName}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(version.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <SplitPaneEditor
          initialHtml={html}
          initialCss={css}
          onHtmlChange={setHtml}
          onCssChange={setCss}
          onSave={handleSave}
          autoSave={true}
          autoSaveInterval={30000}
        />
      </div>
    </div>
  );
}
