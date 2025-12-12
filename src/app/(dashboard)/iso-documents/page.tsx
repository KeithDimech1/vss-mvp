import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireManager } from '@/lib/server-auth';
import {
  getAvailableTemplates,
  documentTypeLabels,
  documentTypeDescriptions,
  isTemplateAvailable
} from '@/lib/iso-documents';
import { IsoDocumentType } from '@/lib/iso-documents/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Status badge colors
const statusColors: Record<string, string> = {
  DRAFT: 'bg-yellow-100 text-yellow-800',
  REVIEW: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  SUPERSEDED: 'bg-gray-100 text-gray-600',
  ARCHIVED: 'bg-gray-100 text-gray-500'
};

export default async function IsoDocumentsPage() {
  // Require manager authentication
  let user;
  try {
    user = await requireManager();
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      redirect('/login');
    } else if (error.message === 'FORBIDDEN') {
      redirect('/dashboard');
    }
    redirect('/login');
  }

  // Get existing documents
  const documents = await prisma.isoDocument.findMany({
    orderBy: { updatedAt: 'desc' }
  });

  // Get available templates
  const availableTemplates = getAvailableTemplates();

  // Document types that can be created
  const documentTypes: IsoDocumentType[] = [
    'HSE_POLICY',
    'QUALITY_POLICY',
    'ENVIRONMENTAL_POLICY',
    'OHS_POLICY',
    'IMS_MANUAL'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#C9A961]/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-[#C9A961] hover:text-[#0A6FCC] mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-[#0A3161]">ISO Document Builder</h1>
          <p className="mt-2 text-gray-600">
            Create and manage ISO-aligned policy documents for your organization.
            Build HSE, Quality, and Integrated Management System documentation.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-[#0A3161]">{documents.length}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {documents.filter(d => d.status === 'DRAFT').length}
            </div>
            <div className="text-sm text-gray-600">In Draft</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">
              {documents.filter(d => d.status === 'REVIEW').length}
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">
              {documents.filter(d => d.status === 'APPROVED').length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
        </div>

        {/* Create New Document Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0A3161]">Create New Document</h2>
            <p className="text-sm text-gray-600 mt-1">
              Select a document type to start building
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentTypes.map(type => {
              const isAvailable = isTemplateAvailable(type);
              return (
                <div
                  key={type}
                  className={`border rounded-lg p-4 ${
                    isAvailable
                      ? 'border-[#0A6FCC] bg-blue-50 hover:bg-blue-100 cursor-pointer'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#0A3161]">
                      {documentTypeLabels[type]}
                    </h3>
                    {isAvailable ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {documentTypeDescriptions[type]}
                  </p>
                  {isAvailable ? (
                    <Link
                      href={`/iso-documents/new?type=${type}`}
                      className="inline-flex items-center text-sm text-[#0A6FCC] hover:text-[#0A3161] font-medium"
                    >
                      Create Document
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">Not yet available</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Existing Documents */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0A3161]">Your Documents</h2>
          </div>
          {documents.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No documents yet</h3>
              <p className="mt-2 text-gray-500">
                Get started by creating your first ISO document.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {documents.map(doc => (
                <Link
                  key={doc.id}
                  href={`/iso-documents/${doc.documentSlug}`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#0A3161]">{doc.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {documentTypeLabels[doc.documentType as IsoDocumentType]}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
                        {doc.effectiveDate && (
                          <> | Effective: {new Date(doc.effectiveDate).toLocaleDateString()}</>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[doc.status]}`}>
                        {doc.status}
                      </span>
                      <span className="text-xs text-gray-500">v{doc.version}</span>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-[#0A3161] mb-2">About the ISO Document Builder</h3>
          <p className="text-sm text-gray-700 mb-3">
            This tool helps you create ISO-aligned policy documents through a guided, section-by-section approach.
            Documents are tailored for IT, software, and data analytics organizations.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              HSE Policy (ISO 45001 + ISO 14001) - Available now
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">○</span>
              Quality Policy (ISO 9001) - Coming soon
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">○</span>
              Integrated Management System - Coming soon
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
