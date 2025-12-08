/**
 * Docs Search Helper
 *
 * Uses Fuse.js for fuzzy searching across Dext and Xero documentation
 */

import Fuse from 'fuse.js';

export interface DocArticle {
  id: string;
  title: string;
  url: string;
  category: string;
  excerpt: string;
  source: 'dext' | 'xero';
  path: string;
}

export interface DocsIndex {
  lastUpdated: string;
  counts: {
    total: number;
    dext: number;
    xero: number;
  };
  categories: {
    dext: string[];
    xero: string[];
  };
  articles: DocArticle[];
}

export interface SearchResult {
  item: DocArticle;
  score?: number;
  matches?: readonly Fuse.FuseResultMatch[];
}

// Fuse.js options for fuzzy search
const fuseOptions: Fuse.IFuseOptions<DocArticle> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'excerpt', weight: 0.3 },
    { name: 'category', weight: 0.2 },
  ],
  threshold: 0.4, // Lower = more strict matching
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

let fuseInstance: Fuse<DocArticle> | null = null;
let docsIndex: DocsIndex | null = null;

/**
 * Initialize the search index
 */
export async function initializeSearch(): Promise<DocsIndex | null> {
  if (docsIndex) return docsIndex;

  try {
    const response = await fetch('/docs/index.json');
    if (!response.ok) {
      console.error('Failed to load docs index');
      return null;
    }
    docsIndex = await response.json();
    if (docsIndex) {
      fuseInstance = new Fuse(docsIndex.articles, fuseOptions);
    }
    return docsIndex;
  } catch (error) {
    console.error('Error initializing search:', error);
    return null;
  }
}

/**
 * Search articles
 */
export function searchDocs(
  query: string,
  options?: {
    source?: 'dext' | 'xero' | 'all';
    category?: string;
    limit?: number;
  }
): SearchResult[] {
  if (!fuseInstance || !docsIndex) {
    console.warn('Search not initialized');
    return [];
  }

  const { source = 'all', category, limit = 20 } = options || {};

  // Get base results from Fuse
  let results = fuseInstance.search(query);

  // Filter by source
  if (source !== 'all') {
    results = results.filter(r => r.item.source === source);
  }

  // Filter by category
  if (category) {
    results = results.filter(r => r.item.category === category);
  }

  // Limit results
  return results.slice(0, limit);
}

/**
 * Get all articles (for browsing)
 */
export function getAllArticles(options?: {
  source?: 'dext' | 'xero' | 'all';
  category?: string;
}): DocArticle[] {
  if (!docsIndex) return [];

  const { source = 'all', category } = options || {};

  let articles = docsIndex.articles;

  if (source !== 'all') {
    articles = articles.filter(a => a.source === source);
  }

  if (category) {
    articles = articles.filter(a => a.category === category);
  }

  return articles;
}

/**
 * Get categories for a source
 */
export function getCategories(source?: 'dext' | 'xero'): string[] {
  if (!docsIndex) return [];

  if (source === 'dext') return docsIndex.categories.dext;
  if (source === 'xero') return docsIndex.categories.xero;

  return [...docsIndex.categories.dext, ...docsIndex.categories.xero];
}

/**
 * Get counts
 */
export function getCounts(): { total: number; dext: number; xero: number } {
  return docsIndex?.counts || { total: 0, dext: 0, xero: 0 };
}

/**
 * Get last updated timestamp
 */
export function getLastUpdated(): string | null {
  return docsIndex?.lastUpdated || null;
}
