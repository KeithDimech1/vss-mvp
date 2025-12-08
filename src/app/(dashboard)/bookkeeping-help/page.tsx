'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  initializeSearch,
  searchDocs,
  getAllArticles,
  getCategories,
  getCounts,
  getLastUpdated,
  type DocArticle,
  type SearchResult,
} from '@/lib/docs-search';

type SourceFilter = 'all' | 'dext' | 'xero';

export default function BookkeepingHelpPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allArticles, setAllArticles] = useState<DocArticle[]>([]);
  const [counts, setCounts] = useState({ total: 0, dext: 0, xero: 0 });
  const [categories, setCategories] = useState<{ dext: string[]; xero: string[] }>({ dext: [], xero: [] });
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Initialize search on mount
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const index = await initializeSearch();
      if (index) {
        setIsInitialized(true);
        setCounts(getCounts());
        setCategories({
          dext: getCategories('dext'),
          xero: getCategories('xero'),
        });
        setLastUpdated(getLastUpdated());
        setAllArticles(getAllArticles());
      }
      setIsLoading(false);
    }
    init();
  }, []);

  // Perform search when query or filters change
  const performSearch = useCallback(() => {
    if (!isInitialized) return;

    if (searchQuery.trim().length >= 2) {
      const searchResults = searchDocs(searchQuery, {
        source: sourceFilter,
        category: categoryFilter || undefined,
        limit: 50,
      });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery, sourceFilter, categoryFilter, isInitialized]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Get articles to display (search results or all articles)
  const displayArticles = searchQuery.trim().length >= 2
    ? results.map(r => r.item)
    : allArticles.filter(a => {
        if (sourceFilter !== 'all' && a.source !== sourceFilter) return false;
        if (categoryFilter && a.category !== categoryFilter) return false;
        return true;
      });

  // Get current categories based on source filter
  const currentCategories = sourceFilter === 'dext'
    ? categories.dext
    : sourceFilter === 'xero'
      ? categories.xero
      : [...categories.dext, ...categories.xero];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Documentation Not Available</h2>
            <p className="text-yellow-700 mb-4">
              The documentation index hasn&apos;t been built yet. Run the scrapers to download documentation.
            </p>
            <div className="bg-gray-800 text-green-400 rounded p-4 text-left font-mono text-sm">
              <p># Run these commands to build the docs:</p>
              <p className="mt-2">npx ts-node scripts/scrape-dext-docs.ts</p>
              <p>npx ts-node scripts/scrape-xero-docs.ts</p>
              <p>npx ts-node scripts/build-docs-index.ts</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Bookkeeping Help Centre</h1>
          <p className="text-blue-100">
            Search Dext and Xero documentation in one place
          </p>
          <div className="mt-2 text-sm text-blue-200">
            {counts.total} articles ({counts.dext} Dext, {counts.xero} Xero)
            {lastUpdated && ` | Last updated: ${new Date(lastUpdated).toLocaleDateString()}`}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation... (e.g., 'bank reconciliation', 'invoice coding')"
              className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Source Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => { setSourceFilter('all'); setCategoryFilter(''); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sourceFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({counts.total})
              </button>
              <button
                onClick={() => { setSourceFilter('dext'); setCategoryFilter(''); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sourceFilter === 'dext'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dext ({counts.dext})
              </button>
              <button
                onClick={() => { setSourceFilter('xero'); setCategoryFilter(''); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sourceFilter === 'xero'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Xero ({counts.xero})
              </button>
            </div>

            {/* Category Filter */}
            {currentCategories.length > 0 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {currentCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {displayArticles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">
                {searchQuery.trim().length >= 2
                  ? 'No articles found matching your search'
                  : 'Start typing to search documentation'}
              </p>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-500 mb-2">
                {searchQuery.trim().length >= 2
                  ? `Found ${displayArticles.length} results`
                  : `Showing ${displayArticles.length} articles`}
              </div>
              {displayArticles.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border-l-4 border-transparent hover:border-blue-500"
                >
                  <div className="flex items-start gap-3">
                    {/* Source Badge */}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        article.source === 'dext'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {article.source === 'dext' ? 'Dext' : 'Xero'}
                    </span>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="bg-gray-100 px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Opens in new tab
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
