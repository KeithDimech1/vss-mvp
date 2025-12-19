'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DOCUMENT_TEMPLATES, replaceTemplateVariables } from '@/lib/document-templates';

export default function NewDocumentPage() {
  const router = useRouter();
  const [step, setStep] = useState<'select-template' | 'configure'>('select-template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    documentType: 'CUSTOM' as const,
  });
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    const template = DOCUMENT_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    setSelectedTemplate(templateId);
    setFormData({
      ...formData,
      documentType: template.category,
      title: template.name,
      slug: template.id + '-' + Date.now(),
    });

    // Initialize variables with default values
    if (template.variables) {
      const initialVars: Record<string, string> = {};
      template.variables.forEach((v) => {
        initialVars[v.name] = v.defaultValue;
      });
      setVariables(initialVars);
    }

    setStep('configure');
  };

  const handleCreate = async () => {
    if (!selectedTemplate) return;

    const template = DOCUMENT_TEMPLATES.find((t) => t.id === selectedTemplate);
    if (!template) return;

    setLoading(true);
    setError(null);

    try {
      // Replace variables in template
      const htmlContent = replaceTemplateVariables(template.html, variables);
      const cssContent = template.css;

      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          htmlContent,
          cssContent,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create document');
      }

      const data = await response.json();
      // Redirect to edit page
      router.push(`/documents/${data.document.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create document');
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (step === 'select-template') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Document</h1>
          <p className="mt-2 text-gray-600">Choose a template to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENT_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className="text-left bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {template.category.replace('_', ' ')}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.push('/documents')}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Documents
          </button>
        </div>
      </div>
    );
  }

  const template = DOCUMENT_TEMPLATES.find((t) => t.id === selectedTemplate);
  if (!template) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configure Document</h1>
        <p className="mt-2 text-gray-600">Template: {template.name}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* Document Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData({
                ...formData,
                title: e.target.value,
                slug: generateSlug(e.target.value),
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="My Document"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="my-document"
          />
          <p className="mt-1 text-xs text-gray-500">
            Used in the URL. Only lowercase letters, numbers, and hyphens.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Optional description"
          />
        </div>

        {/* Template Variables */}
        {template.variables && template.variables.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Template Variables
            </h3>
            <div className="space-y-4">
              {template.variables.map((variable) => (
                <div key={variable.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {variable.description}
                  </label>
                  <input
                    type="text"
                    value={variables[variable.name] || ''}
                    onChange={(e) =>
                      setVariables({
                        ...variables,
                        [variable.name]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder={variable.defaultValue}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={() => setStep('select-template')}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Change Template
          </button>
          <button
            onClick={handleCreate}
            disabled={loading || !formData.title || !formData.slug}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Document'}
          </button>
        </div>
      </div>
    </div>
  );
}
