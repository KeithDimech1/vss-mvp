/**
 * Unified Docs Index Builder
 *
 * Combines Dext and Xero indexes into a single searchable index
 *
 * Usage: npx ts-node scripts/build-docs-index.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'public/docs');
const OUTPUT_PATH = path.join(DOCS_DIR, 'index.json');

interface DocEntry {
  id: string;
  title: string;
  url: string;
  category: string; // collection for Dext, topic for Xero
  excerpt: string;
  source: 'dext' | 'xero';
  path: string;
}

function loadIndex(source: 'dext' | 'xero'): DocEntry[] {
  const indexPath = path.join(DOCS_DIR, source, 'index.json');

  if (!fs.existsSync(indexPath)) {
    console.log(`No index found for ${source} at ${indexPath}`);
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    return data.map((entry: any) => ({
      ...entry,
      source,
      category: entry.collection || entry.topic || 'General',
    }));
  } catch (error) {
    console.error(`Error loading ${source} index:`, error);
    return [];
  }
}

function main() {
  console.log('='.repeat(60));
  console.log('Building Unified Docs Index');
  console.log('='.repeat(60));

  // Ensure output directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  // Load indexes from both sources
  const dextDocs = loadIndex('dext');
  const xeroDocs = loadIndex('xero');

  console.log(`\nDext articles: ${dextDocs.length}`);
  console.log(`Xero articles: ${xeroDocs.length}`);

  // Combine and deduplicate
  const allDocs = [...dextDocs, ...xeroDocs];

  // Create unified index
  const unifiedIndex = {
    lastUpdated: new Date().toISOString(),
    counts: {
      total: allDocs.length,
      dext: dextDocs.length,
      xero: xeroDocs.length,
    },
    categories: {
      dext: [...new Set(dextDocs.map(d => d.category))],
      xero: [...new Set(xeroDocs.map(d => d.category))],
    },
    articles: allDocs,
  };

  // Write unified index
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(unifiedIndex, null, 2));

  console.log(`\nUnified index saved to: ${OUTPUT_PATH}`);
  console.log(`Total articles: ${allDocs.length}`);
  console.log('\nCategories:');
  console.log('  Dext:', unifiedIndex.categories.dext.join(', '));
  console.log('  Xero:', unifiedIndex.categories.xero.join(', '));
  console.log('='.repeat(60));
}

main();
