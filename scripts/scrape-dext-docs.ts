/**
 * Dext Help Centre Scraper
 *
 * Scrapes articles from help.dext.com and converts them to Markdown
 *
 * Usage: npx ts-node scripts/scrape-dext-docs.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const DEXT_BASE_URL = 'https://help.dext.com';
const OUTPUT_DIR = path.join(process.cwd(), 'public/docs/dext');

// Collections to scrape (from Dext Help Centre)
// URL format: https://help.dext.com/en/collections/{id}-{slug}
const COLLECTIONS = [
  { slug: 'getting-started-for-business-owners', name: 'Getting Started', id: '878134' },
  { slug: 'adding-managing-documents', name: 'Adding & Managing Documents', id: '3553095' },
  { slug: 'troubleshooting', name: 'Troubleshooting', id: '3553162' },
  { slug: 'accounting-softwares', name: 'Accounting Softwares', id: '3553096' },
  { slug: 'data-health-insights', name: 'Data Health & Insights', id: '3553155' },
  { slug: 'costs-sales', name: 'Costs & Sales', id: '3553098' },
  { slug: 'mobile-app', name: 'Mobile App', id: '3553160' },
];

interface Article {
  id: string;
  title: string;
  slug: string;
  url: string;
  collection: string;
  content: string;
  excerpt: string;
}

async function fetchWithRetry(url: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed for ${url}:`, error);
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw new Error('All retries failed');
}

function extractArticleLinks(html: string): { url: string; title: string }[] {
  const links: { url: string; title: string }[] = [];

  // Match article links in collection pages - various patterns
  const patterns = [
    /<a[^>]*href="(\/en\/articles\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
    /href="(https:\/\/help\.dext\.com\/en\/articles\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      let url = match[1];
      const titleHtml = match[2];
      const title = titleHtml.replace(/<[^>]+>/g, '').trim();

      // Ensure full URL
      if (!url.startsWith('http')) {
        url = DEXT_BASE_URL + url;
      }

      if (url && title && title.length > 3 && !links.some(l => l.url === url)) {
        links.push({ url, title });
      }
    }
  }

  return links;
}

function htmlToMarkdown(html: string): string {
  // Basic HTML to Markdown conversion
  let md = html;

  // Remove script and style tags
  md = md.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Headers
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

  // Lists
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');

  // Bold and italic
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n');

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();

  return md;
}

function extractArticleContent(html: string): { title: string; content: string } {
  // Try to find article title
  const titleMatch = html.match(/<h1[^>]*class="[^"]*article[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
                     html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Untitled';

  // Try to find article body
  const bodyMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                    html.match(/<div[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                    html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

  const rawContent = bodyMatch ? bodyMatch[1] : '';
  const content = htmlToMarkdown(rawContent);

  return { title, content };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

async function scrapeCollection(collection: typeof COLLECTIONS[0]): Promise<Article[]> {
  const articles: Article[] = [];
  console.log(`\nScraping collection: ${collection.name}`);

  try {
    // Fetch collection page
    const collectionUrl = `${DEXT_BASE_URL}/en/collections/${collection.id}-${collection.slug}`;
    console.log(`  Fetching: ${collectionUrl}`);
    const html = await fetchWithRetry(collectionUrl);

    // Extract article links
    const links = extractArticleLinks(html);
    console.log(`  Found ${links.length} articles`);

    // Fetch each article
    for (const link of links.slice(0, 20)) { // Limit to 20 per collection for now
      try {
        console.log(`    Fetching: ${link.title.substring(0, 50)}...`);
        const articleHtml = await fetchWithRetry(link.url);
        const { title, content } = extractArticleContent(articleHtml);

        if (content.length > 50) { // Only save if we got meaningful content
          const slug = slugify(title);
          articles.push({
            id: `dext-${slug}`,
            title,
            slug,
            url: link.url,
            collection: collection.name,
            content,
            excerpt: content.substring(0, 200).replace(/\n/g, ' ') + '...',
          });
        }

        // Rate limiting
        await new Promise(r => setTimeout(r, 500));
      } catch (error) {
        console.error(`    Failed to fetch article: ${link.title}`);
      }
    }
  } catch (error) {
    console.error(`  Failed to fetch collection: ${collection.name}`, error);
  }

  return articles;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Dext Help Centre Scraper');
  console.log('='.repeat(60));

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allArticles: Article[] = [];

  // Scrape each collection
  for (const collection of COLLECTIONS) {
    const articles = await scrapeCollection(collection);
    allArticles.push(...articles);

    // Save collection articles
    const collectionDir = path.join(OUTPUT_DIR, collection.slug);
    if (!fs.existsSync(collectionDir)) {
      fs.mkdirSync(collectionDir, { recursive: true });
    }

    for (const article of articles) {
      const filePath = path.join(collectionDir, `${article.slug}.md`);
      const frontmatter = `---
title: "${article.title.replace(/"/g, '\\"')}"
url: "${article.url}"
collection: "${article.collection}"
source: "dext"
---

`;
      fs.writeFileSync(filePath, frontmatter + article.content);
    }
  }

  // Save index
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  const indexData = allArticles.map(a => ({
    id: a.id,
    title: a.title,
    url: a.url,
    collection: a.collection,
    excerpt: a.excerpt,
    source: 'dext',
    path: `/${a.collection.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${a.slug}.md`,
  }));
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log(`Scraped ${allArticles.length} articles`);
  console.log(`Saved to: ${OUTPUT_DIR}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
