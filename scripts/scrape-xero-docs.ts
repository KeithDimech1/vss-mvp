/**
 * Xero Central Scraper
 *
 * Scrapes articles from central.xero.com and converts them to Markdown
 *
 * Usage: npx ts-node scripts/scrape-xero-docs.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const XERO_BASE_URL = 'https://central.xero.com';
const OUTPUT_DIR = path.join(process.cwd(), 'public/docs/xero');

// Key topics for bookkeeping (most relevant for Kristy)
const TOPICS = [
  { slug: 'bank-reconciliation', name: 'Bank Reconciliation', searchTerms: ['bank reconciliation', 'bank feeds', 'reconcile'] },
  { slug: 'invoicing', name: 'Invoicing & Bills', searchTerms: ['invoice', 'bills', 'accounts payable', 'accounts receivable'] },
  { slug: 'reporting', name: 'Reporting', searchTerms: ['reports', 'profit and loss', 'balance sheet', 'financial statements'] },
  { slug: 'payroll', name: 'Payroll & STP', searchTerms: ['payroll', 'stp', 'single touch payroll', 'wages'] },
  { slug: 'gst-bas', name: 'GST & BAS', searchTerms: ['gst', 'bas', 'activity statement', 'tax'] },
  { slug: 'chart-of-accounts', name: 'Chart of Accounts', searchTerms: ['chart of accounts', 'account codes', 'tracking categories'] },
  { slug: 'getting-started', name: 'Getting Started', searchTerms: ['getting started', 'setup', 'configuration'] },
];

interface Article {
  id: string;
  title: string;
  slug: string;
  url: string;
  topic: string;
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

function htmlToMarkdown(html: string): string {
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

function extractSearchResults(html: string): { url: string; title: string }[] {
  const results: { url: string; title: string }[] = [];

  // Match article links from search results
  const linkRegex = /<a[^>]*href="(\/s\/article\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    const title = match[2].replace(/<[^>]+>/g, '').trim();
    if (url && title && !results.some(r => r.url === url)) {
      results.push({ url: XERO_BASE_URL + url, title });
    }
  }

  return results;
}

function extractArticleContent(html: string): { title: string; content: string } {
  // Try to find article title
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Untitled';

  // Try to find article body
  const bodyMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                    html.match(/<div[^>]*class="[^"]*article[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                    html.match(/<div[^>]*class="[^"]*slds-rich-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                    html.match(/<div[^>]*data-aura-class="[^"]*forceOutputRichText[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

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

async function searchXeroArticles(searchTerm: string): Promise<{ url: string; title: string }[]> {
  try {
    const searchUrl = `${XERO_BASE_URL}/s/global-search/${encodeURIComponent(searchTerm)}`;
    console.log(`    Searching: ${searchTerm}`);
    const html = await fetchWithRetry(searchUrl);
    return extractSearchResults(html);
  } catch (error) {
    console.error(`    Search failed for: ${searchTerm}`);
    return [];
  }
}

async function scrapeTopic(topic: typeof TOPICS[0]): Promise<Article[]> {
  const articles: Article[] = [];
  const seenUrls = new Set<string>();
  console.log(`\nScraping topic: ${topic.name}`);

  // Search for articles using each search term
  for (const searchTerm of topic.searchTerms) {
    const results = await searchXeroArticles(searchTerm);
    console.log(`    Found ${results.length} results for "${searchTerm}"`);

    for (const result of results.slice(0, 5)) { // Limit per search term
      if (seenUrls.has(result.url)) continue;
      seenUrls.add(result.url);

      try {
        console.log(`      Fetching: ${result.title.substring(0, 40)}...`);
        const articleHtml = await fetchWithRetry(result.url);
        const { title, content } = extractArticleContent(articleHtml);

        if (content.length > 50) {
          const slug = slugify(title);
          articles.push({
            id: `xero-${slug}`,
            title,
            slug,
            url: result.url,
            topic: topic.name,
            content,
            excerpt: content.substring(0, 200).replace(/\n/g, ' ') + '...',
          });
        }

        // Rate limiting
        await new Promise(r => setTimeout(r, 800));
      } catch (error) {
        console.error(`      Failed to fetch: ${result.title}`);
      }
    }

    // Rate limit between searches
    await new Promise(r => setTimeout(r, 1000));
  }

  return articles;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Xero Central Scraper');
  console.log('='.repeat(60));

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allArticles: Article[] = [];

  // Scrape each topic
  for (const topic of TOPICS) {
    const articles = await scrapeTopic(topic);
    allArticles.push(...articles);

    // Save topic articles
    const topicDir = path.join(OUTPUT_DIR, topic.slug);
    if (!fs.existsSync(topicDir)) {
      fs.mkdirSync(topicDir, { recursive: true });
    }

    for (const article of articles) {
      const filePath = path.join(topicDir, `${article.slug}.md`);
      const frontmatter = `---
title: "${article.title.replace(/"/g, '\\"')}"
url: "${article.url}"
topic: "${article.topic}"
source: "xero"
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
    topic: a.topic,
    excerpt: a.excerpt,
    source: 'xero',
    path: `/${a.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${a.slug}.md`,
  }));
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log(`Scraped ${allArticles.length} articles`);
  console.log(`Saved to: ${OUTPUT_DIR}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
