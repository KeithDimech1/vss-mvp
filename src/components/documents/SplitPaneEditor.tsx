'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SplitPaneEditorProps {
  initialHtml?: string;
  initialCss?: string;
  onHtmlChange?: (html: string) => void;
  onCssChange?: (css: string) => void;
  onSave?: (html: string, css: string) => void;
  autoSave?: boolean;
  autoSaveInterval?: number; // in milliseconds
}

export default function SplitPaneEditor({
  initialHtml = '',
  initialCss = '',
  onHtmlChange,
  onCssChange,
  onSave,
  autoSave = true,
  autoSaveInterval = 30000, // 30 seconds default
}: SplitPaneEditorProps) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update preview whenever HTML or CSS changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const combinedHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>${css}</style>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `;

      const doc = iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(combinedHtml);
      doc.close();
    }
  }, [html, css]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !onSave) return;

    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Set new timer
    autoSaveTimerRef.current = setTimeout(() => {
      handleAutoSave();
    }, autoSaveInterval);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [html, css, autoSave, autoSaveInterval]);

  const handleAutoSave = async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      await onSave(html, css);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualSave = async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      await onSave(html, css);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save document. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtml(newHtml);
    if (onHtmlChange) {
      onHtmlChange(newHtml);
    }
  };

  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCss = e.target.value;
    setCss(newCss);
    if (onCssChange) {
      onCssChange(newCss);
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved yet';
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000); // seconds

    if (diff < 60) return 'Saved just now';
    if (diff < 3600) return `Saved ${Math.floor(diff / 60)} minutes ago`;
    return `Saved at ${lastSaved.toLocaleTimeString()}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-gray-100 border-b border-gray-300 px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'html'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'css'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              CSS
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {isSaving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                Saving...
              </span>
            ) : (
              formatLastSaved()
            )}
          </span>
          <button
            onClick={handleManualSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save Now
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code editor pane */}
        <div className="w-1/2 border-r border-gray-300 flex flex-col">
          <div className="flex-1 overflow-auto">
            <textarea
              value={activeTab === 'html' ? html : css}
              onChange={activeTab === 'html' ? handleHtmlChange : handleCssChange}
              className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-gray-50"
              placeholder={
                activeTab === 'html'
                  ? 'Enter your HTML here...'
                  : 'Enter your CSS here...'
              }
              spellCheck={false}
            />
          </div>
          <div className="px-4 py-2 bg-gray-100 border-t border-gray-300 text-xs text-gray-600">
            {activeTab === 'html' ? 'HTML Editor' : 'CSS Editor'} •{' '}
            {activeTab === 'html' ? html.length : css.length} characters
          </div>
        </div>

        {/* Preview pane */}
        <div className="w-1/2 flex flex-col bg-white">
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-700">
            Live Preview
          </div>
          <div className="flex-1 overflow-auto">
            <iframe
              ref={iframeRef}
              title="Document Preview"
              className="w-full h-full border-none"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-300 text-xs text-gray-500">
        <span className="font-medium">Tips:</span> Auto-save is enabled. Press{' '}
        <kbd className="px-2 py-0.5 bg-gray-200 rounded">Cmd/Ctrl + S</kbd> to save
        manually.
      </div>
    </div>
  );
}
