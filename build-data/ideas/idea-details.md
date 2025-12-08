# Idea Details

**Project:** VSM-Platform-Project
**Last Updated:** 2025-12-08

This file contains full details for all ideas. The [live-ideas.md](live-ideas.md) index links to anchors in this file.

---

<!-- New ideas are appended below this line -->

## IDEA-001

**Title:** Dext & Xero Documentation Knowledge Base for Kristy
**Priority:** P1 | **Status:** 💡 idea | **Date:** 2025-12-08

### Description

Download and index the entire Dext Help Centre and Xero Central documentation to create a unified searchable knowledge base for Kristy. This will enable quick lookup of how-to guides, troubleshooting steps, and feature explanations without needing to navigate external websites.

**Dext Help Centre Structure (658+ articles):**
- Getting Started (15 articles)
- Accounting Softwares (77 articles) - Xero integration
- Data Health & Insights (49 articles)
- Adding & Managing Documents (43 articles)
- For Practices (27 articles)
- Business Settings (24 articles)
- Costs & Sales (19 articles)
- Bank (4 articles)
- Account & User Settings (15 articles)
- Mobile App (14 articles)
- Solo (15 articles)
- Dextension (2 articles)
- Training & Support (2 articles)
- Troubleshooting (6 articles)
- Legacy Prepare (261 articles)
- Legacy Precision (81 articles)
- Dext Payments BETA (9 articles)

**Xero Central Structure (hundreds of articles):**
- Getting Started - Onboarding and setup guides
- Learning - Educational resources and courses
- Articles & Guides - Feature documentation
- Support & Cases - Troubleshooting
- Certifications - Professional credentials
- News & Updates - Platform changes

**Key Xero Topics for Kristy:**
- Bank reconciliation
- Invoicing and bills
- Reporting (P&L, Balance Sheet)
- Payroll and STP
- GST/BAS lodgement
- Chart of accounts
- Tracking categories

### Use Cases

1. **Quick answers during bookkeeping** - Kristy can search "how to code an invoice" and get instant results
2. **Troubleshooting** - Search error messages or issues to find solutions
3. **Training reference** - New team members can search for feature explanations
4. **Offline access** - Available even without internet or when Dext site is slow

### Requirements

**Functional:**
- [ ] Download all Dext help articles (HTML/Markdown)
- [ ] Download all Xero Central articles (HTML/Markdown)
- [ ] Create unified searchable index with full-text search
- [ ] Simple search interface accessible from VSS platform
- [ ] Filter by source (Dext / Xero / All)
- [ ] Results show article title, source, snippet, and link to full content

**Technical:**
- [ ] Web scraping/crawling capability for both sites
- [ ] Storage for downloaded articles (organized by source)
- [ ] Full-text search indexing (Fuse.js, Lunr.js, or similar)
- [ ] UI component for search with source filtering

### Implementation Options

#### Option 1: Static Markdown Download + Fuse.js Search

**Approach:**
1. Use a scraper (Puppeteer/Cheerio) to download all Dext and Xero articles
2. Convert to Markdown and store in `/public/docs/dext/` and `/public/docs/xero/`
3. Build unified JSON index at build time with source tags
4. Use Fuse.js for client-side fuzzy search with source filtering
5. Add `/bookkeeping-help` page with tabbed search interface (Dext | Xero | All)

**Pros:**
- No backend needed (static files)
- Fast client-side search
- Works offline once loaded
- Simple to maintain

**Cons:**
- Needs manual re-scrape to update
- Initial download script complexity

**Effort:** Medium (2-3 days)

#### Option 2: Database-Backed with API Search

**Approach:**
1. Store articles in PostgreSQL with full-text search
2. API endpoint for search queries
3. Admin interface to trigger re-sync

**Pros:**
- Easy to update via admin
- More powerful search (PostgreSQL full-text)
- Can track usage analytics

**Cons:**
- More complex architecture
- Requires database migrations
- API latency

**Effort:** High (4-5 days)

#### Option 3: Embedded Search Widget (If Dext Provides)

**Approach:** Check if Dext provides an embeddable search widget or API

**Pros:**
- Always up-to-date
- No scraping needed

**Cons:**
- Likely doesn't exist
- Dependency on external service

**Effort:** Low (if available)

### Recommended Approach

**Option 1 (Static + Fuse.js)** - Best balance of effort vs utility. Can be done in phases:
1. Phase 1: Scrape Dext core articles (Getting Started, Adding Documents, Troubleshooting)
2. Phase 2: Scrape Xero core articles (Bank Reconciliation, Invoicing, Reporting, Payroll)
3. Phase 3: Add remaining categories from both sources
4. Phase 4: Add auto-update script for monthly refresh

### Files to Create/Modify

**New files:**
- `scripts/scrape-dext-docs.ts` - Dext scraper script
- `scripts/scrape-xero-docs.ts` - Xero scraper script
- `scripts/build-docs-index.ts` - Unified index builder
- `public/docs/dext/` - Downloaded Dext articles (Markdown)
- `public/docs/xero/` - Downloaded Xero articles (Markdown)
- `public/docs/index.json` - Unified search index
- `src/app/(dashboard)/bookkeeping-help/page.tsx` - Tabbed search UI page
- `src/lib/docs-search.ts` - Fuse.js search helper with source filtering

**Modified files:**
- `src/app/(dashboard)/layout.tsx` - Add nav link to Bookkeeping Help

**Detail Log:** [debug/IDEA-001-dext-documentation-knowledge-base-for-kristy.md](debug/IDEA-001-dext-documentation-knowledge-base-for-kristy.md)

---
