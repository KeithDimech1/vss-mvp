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

## IDEA-003 {#idea-003}

**Title:** GDAC Tender Forms 9.1-9.6 Systematic Audit & Consistency Checker
**Priority:** P1 | **Status:** 🚀 active | **Date:** 2025-12-09
**Updated:** 2025-12-09 (Session 1 Complete - Deep Audit)

### Description

Comprehensive audit of GDAC-SA Pre-Qualification Response Forms 9.1-9.6, cross-referencing against source documents in build-data for consistency, accuracy, formatting, spelling, and structural alignment.

---

## AUDIT FINDINGS

### CRITICAL DISCREPANCIES (Requires Immediate Fix)

#### 1. OWNERSHIP STRUCTURE (Form 9.1) - MAJOR ERROR

**Tender Document States:**
| Owner | Percentage |
|-------|------------|
| Dr. Fabian Kohlmann | 50.1% |
| Dr. Wayne Noble | 14.9% |
| Gerd Moritz Theile | 10.0% |
| Vinko Novak | 10.0% |
| Enreach Resources Pty Ltd | 15.0% |

**ASIC Extract (02-Dec-2025) Shows:**
| Owner | Shares | Percentage |
|-------|--------|------------|
| Fabian Kohlmann | 501 | 50.1% |
| Gerd Moritz Theile | 240 | **24.0%** |
| Wayne Peter Noble | 149 | 14.9% |
| Nilesh Ambadas Vyavahare | 80 | **8.0%** |
| Romain Beucher | 30 | **3.0%** |

**Issues:**
- ❌ **Vinko Novak is NOT a shareholder** per ASIC - shows 10% in tender
- ❌ **Enreach Resources Pty Ltd is NOT a shareholder** per ASIC - shows 15% in tender
- ❌ **Moritz Theile has 24%**, not 10% as stated
- ❌ **Two shareholders missing:** Nilesh Vyavahare (8%) and Romain Beucher (3%)
- **ACTION:** Verify current shareholding structure and correct Form 9.1

#### 2. FINANCIAL RATIOS (Form 9.6) - CALCULATION ERROR

**Problem:** Tender uses Total Assets/Liabilities instead of Current Assets/Liabilities

| Ratio | Tender Value | Correct Calculation | Issue |
|-------|-------------|---------------------|-------|
| Cash Ratio FY2025 | 2.05 | $274,855 ÷ $60,404 = **4.55** | Using Total Liabilities ($134,211) instead of Current ($60,404) |
| Current Ratio FY2025 | 3.21 | $364,840 ÷ $60,404 = **6.04** | Same error |
| Quick Ratio FY2025 | 3.19 | Same as Current = **6.04** | Same error |

**FY2025 Balance Sheet (from extraction):**
- Current Assets: $364,840 (NOT $430,819 - that's Total Assets)
- Current Liabilities: $60,404 (NOT $134,211 - that's Total Liabilities)

**ACTION:** Recalculate all ratios using Current figures OR clarify column headers

#### 3. NRCan PROJECT VALUE INCONSISTENCY (Forms 9.2 & 9.5)

| Location | Value Stated |
|----------|-------------|
| Form 9.2 Similar Projects Summary (Line 155) | $400,000 AUD |
| Form 9.2 Current Projects Detail (Line 216) | $300,000 AUD |
| Form 9.5 Project Details | $400,000 AUD |

**ACTION:** Confirm correct value and update to be consistent

---

### HIGH PRIORITY ISSUES

#### 4. STAFF EXPERIENCE CLAIMS INACCURATE (Form 9.4)

**Lujia Yang (#7) - "3+ years" experience stated but:**
- Lithodat Developer: Dec 2024 - Present (~1 year)
- Student IT role: 5 months (2021)
- Graduated: Nov 2024
- **Actual experience: ~1 year maximum**

**ACTION:** Correct experience years to accurate figure

#### 5. TITLE INCONSISTENCIES

| Person | Form 9.3/9.4 Title | CV File Title |
|--------|-------------------|---------------|
| Moritz Theile | "Lead Developer / Director" | "CTO - Lithodat Pty Ltd" |
| Juan Baca | "Operations Manager (LATAM)" | "Managing Director, Lithodat México" |
| Pedro Ferreira | "AI Software Development Lead" | "Fullstack Engineer" (various companies) |

**ACTION:** Standardize titles across documents

#### 6. MISSING CV REFERENCE FILES

The following staff listed in Form 9.4 have no corresponding CV files in build-data:
- #6 Xinyan Zhang (Frontend Developer)
- #8 Tarun Sengar (Backend Developer)
- #9 Nirali Dudharejiya (Backend Developer)
- #10 Cris Ibarra (Data Quality Specialist)
- #11 Perla Luque (Data Quality Specialist)

**ACTION:** Create CV files for all listed staff OR confirm they exist elsewhere

---

### MEDIUM PRIORITY ISSUES

#### 7. CV STRUCTURE INCONSISTENCY

Profiles have varying levels of detail:

**Full profiles (with tables, achievements, value propositions):**
- Dr. Mahdi AbuAli
- Dr. Qusay Abeed
- Dr. Behnam Sadeghi
- Dr. Fabian Kohlmann
- Dr. Wayne Noble
- Keith Dimech

**Minimal entries (just name, function, years):**
- Entries #6-14 in Form 9.4

**Recommended standard CV structure:**
1. Current Position & Location
2. Key Expertise Areas (bulleted)
3. Years of Experience
4. Education (Degree, Institution, Year)
5. Languages (if relevant)
6. GDAC-SA Value Proposition (1-2 sentences)

**ACTION:** Standardize all CV entries to consistent format

#### 8. KEITH DIMECH DATE DISCREPANCY

**Form 9.3 states:** "Years with Lithodat: May 2025 - Present (7 months)"
**But document date is December 2025:** May to Dec 2025 = 8 months, not 7

**ACTION:** Update to accurate tenure or use "8 months"

#### 9. CAPITAL VALUE VERIFICATION NEEDED

Form 9.1 states capital value: AUD $370,575 (SAR 907,909)

This needs verification against:
- Latest ASIC records
- FY2025 financial statements (Net Assets: $296,608 per extraction)

**Discrepancy:** Net Assets in FY2025 extraction = $296,608, but tender shows $370,575

**ACTION:** Verify and correct capital value

---

### LOW PRIORITY ISSUES

#### 10. SPELLING & FORMATTING

- Line 269: "Moritz Theile" in table vs "Gerd Moritz Theile" in CV - use consistent full name
- Various SAR conversions should be verified for consistency (all using 2.45 rate?)

#### 11. REPEATED CONTENT

- Organizational chart in Form 9.3 (lines 280-303) repeats similar info to project leadership structure
- Consider consolidating to reduce document length

---

## REPEATABLE AUDIT CHECKLIST

### Pre-Audit Setup
- [ ] Identify all source documents in build-data
- [ ] Create cross-reference mapping (tender section → source file)
- [ ] Note document dates for currency checks

### Form 9.1 - Applicant Information
- [ ] Verify company name against ASIC
- [ ] Verify ABN against ASIC
- [ ] Verify registration date against ASIC
- [ ] Verify capital value against latest financials
- [ ] **Verify ownership percentages against current ASIC extract**
- [ ] Verify address matches ASIC registered/principal place
- [ ] Verify contact details are current

### Form 9.2 - Technical & Administrative
- [ ] Cross-check project values across all mentions in document
- [ ] Verify experience years are current
- [ ] Verify project status (ongoing/delivered)
- [ ] Check quality certifications are accurate

### Form 9.3 - Administrative Staff
- [ ] Match titles to CV files
- [ ] Verify years of experience
- [ ] Check tenure calculations are current
- [ ] Verify education credentials

### Form 9.4 - Professional Staff
- [ ] Each entry has corresponding CV file
- [ ] Titles match CV files
- [ ] Experience years are accurate
- [ ] Consistent structure across all entries
- [ ] Education listed where available
- [ ] Languages noted where relevant

### Form 9.5 - Similar Projects
- [ ] Project values match Form 9.2
- [ ] Dates are accurate
- [ ] Client contact info is current
- [ ] Status (delivered/ongoing) is accurate

### Form 9.6 - Financial Capacity
- [ ] Balance sheet figures match extractions
- [ ] Distinguish Current vs Total assets/liabilities
- [ ] Ratio calculations use correct inputs
- [ ] Currency conversions are consistent
- [ ] All 3 years of data are accurate

### Final Checks
- [ ] Spelling and grammar review
- [ ] Consistent formatting throughout
- [ ] No repeated content/redundancy
- [ ] All cross-references are accurate

---

### Use Cases

1. **Pre-submission quality assurance** - Catch errors before tender deadline
2. **Document update tracking** - When source docs change, know what to update in tender
3. **Team onboarding** - New staff understand audit process

### Requirements

**Functional:**
- [ ] Automated cross-reference checker (source files → tender sections)
- [ ] Ownership structure validator (ASIC extract → Form 9.1)
- [ ] Financial ratio calculator with input verification
- [ ] CV completeness checker

**Technical:**
- [ ] ASIC API integration (if available) or manual extract comparison
- [ ] Financial statement parser
- [ ] Markdown diff tool for CV comparison

### Implementation Options

#### Option 1: Manual Checklist with Documented Process (Recommended)

**Approach:**
- Maintain checklist in build-data as markdown
- Run manually before each submission
- Document findings in audit log

**Pros:**
- ✅ No development needed
- ✅ Flexible and human-verified
- ✅ Catches nuanced issues

**Cons:**
- ❌ Time-consuming
- ❌ Requires deep document knowledge

**Effort:** Low (checklist already created above)

#### Option 2: Semi-Automated Validation Script

**Approach:**
- Node.js script that parses tender markdown
- Compares against known values from source files
- Outputs discrepancy report

**Pros:**
- ✅ Faster repeat audits
- ✅ Catches numeric discrepancies

**Cons:**
- ❌ Development time
- ❌ May miss contextual issues

**Effort:** Medium (2-3 days)

### Files to Create/Modify

**To Fix Immediately:**
- `build-data/06 gdac-tender/response/GDAC-SA-TENDER-RESPONSE-COMPLETE.md` - Apply all fixes above

**New files (if implementing Option 2):**
- `scripts/audit-tender.ts` - Automated checker
- `build-data/06 gdac-tender/documentation/AUDIT-CHECKLIST.md` - Standalone checklist

**Detail Log:** [debug/IDEA-003-gdac-tender-forms-9-1-9-6-systematic-audit-consistency-checker.md](debug/IDEA-003-gdac-tender-forms-9-1-9-6-systematic-audit-consistency-checker.md)

---

## IDEA-004

**Title:** Global Australian Legal AI Agents (Sovereign AI + Open Legal Corpus)
**Priority:** P1 | **Status:** 💡 idea | **Date:** 2025-12-17

### Description

Create global MCP (Model Context Protocol) servers that integrate Australian legal AI resources across all Claude Code projects. This would provide:

1. **Open Australian Legal Corpus Access** - The largest open database of Australian law (232k+ documents, 1.47B tokens) from Federal, State, and Territory sources
2. **Sovereign Australia AI Integration** - Future integration with Ginan (8B parameter Australian-focused LLM, open source when released)

These MCP servers would be globally available to all Claude Code projects, providing legal context, compliance checking, and Australian legal document understanding without project-specific setup.

**Key Resources:**
- [Open Australian Legal Corpus on Hugging Face](https://huggingface.co/datasets/isaacus/open-australian-legal-corpus)
- [Sovereign Australia AI](https://sovereign-au.ai/)
- [How the corpus was built](https://umarbutler.com/how-i-built-the-largest-open-database-of-australian-law/)

### Use Cases

1. **Legal Document Generation** - Generate Australian-compliant Terms of Service, Privacy Policies, contracts using actual legal precedents
2. **Compliance Checking** - Verify business documents against Australian Consumer Law, Privacy Act 1988, APP (Australian Privacy Principles)
3. **Legal Research Assistant** - Query Australian legislation, case law, and regulations across all jurisdictions
4. **Contract Analysis** - Analyze contracts for Australian legal requirements and risks
5. **Multi-Project Consistency** - Ensure legal language consistency across Lithodat products (LithoSurfer, VSM Platform, etc.)
6. **License/Terms Generation** - Generate tier-specific legal documents for Free/Pro/Enterprise tiers with Australian compliance

### Requirements

**Functional:**
- [ ] Query Open Australian Legal Corpus (100k+ legislative and judicial documents)
- [ ] Search by jurisdiction (Federal, NSW, QLD, WA, SA, TAS)
- [ ] Search by document type (legislation, case law, regulations)
- [ ] Generate legal document templates (Privacy Policy, Terms of Service, etc.)
- [ ] Check text for legal compliance and issues
- [ ] Provide Australian legal context and citations
- [ ] Future: Integrate with Sovereign AI Ginan model when API available

**Technical:**
- [ ] Build MCP server following Anthropic's Model Context Protocol spec
- [ ] Download and index Open Australian Legal Corpus dataset
- [ ] Implement vector search/RAG for efficient legal document retrieval
- [ ] Configure as global MCP server in `~/.claude/config.json`
- [ ] Handle large dataset efficiently (1.47B tokens)
- [ ] Provide secure, local processing (no external API calls for corpus data)
- [ ] Future: API integration with Sovereign AI when available

### Implementation Options

#### Option 1: Standalone MCP Server with Local Corpus

**Approach:** Build a Python MCP server that downloads and indexes the Open Australian Legal Corpus locally, providing RAG-based search and legal analysis.

**Pros:**
- ✅ Complete control over data and privacy
- ✅ No external API dependencies or costs
- ✅ Fast local queries after initial setup
- ✅ Works offline once corpus downloaded
- ✅ Can be used across all Lithodat projects globally

**Cons:**
- ❌ Large initial download (~1.47B tokens)
- ❌ Requires local storage and indexing infrastructure
- ❌ Maintenance overhead for corpus updates
- ❌ Need to build vector search/RAG pipeline

**Effort:** High (2-3 weeks)

**Tech Stack:**
- Python MCP server
- Hugging Face `datasets` library
- ChromaDB or FAISS for vector storage
- Sentence transformers for embeddings
- LangChain for RAG pipeline

#### Option 2: Hybrid Approach - Corpus MCP + Future Ginan Integration

**Approach:** Start with local Open Australian Legal Corpus MCP server, design architecture to add Sovereign AI Ginan when API becomes available.

**Pros:**
- ✅ Immediate value with corpus access
- ✅ Future-proof for Ginan integration
- ✅ Leverages both structured legal data and AI reasoning
- ✅ Modular design allows gradual enhancement

**Cons:**
- ❌ Uncertain timeline for Ginan API availability
- ❌ May need to refactor when Ginan API specs are known
- ❌ Complex architecture to maintain two systems

**Effort:** High initial (2-3 weeks), Medium ongoing

#### Option 3: Lightweight MCP with Hugging Face API

**Approach:** Use Hugging Face Datasets API to query corpus remotely instead of downloading, build minimal MCP wrapper.

**Pros:**
- ✅ Minimal local storage requirements
- ✅ Faster initial setup
- ✅ Automatic corpus updates from Hugging Face
- ✅ Simpler architecture

**Cons:**
- ❌ Requires internet connection
- ❌ Slower queries (API latency)
- ❌ Potential rate limits or API costs
- ❌ Less control over indexing and search

**Effort:** Medium (1 week)

#### Option 4: Integration with Existing Legal MCP Servers

**Approach:** Leverage existing LegalContext MCP server pattern, adapt for Australian corpus.

**Pros:**
- ✅ Proven MCP server architecture
- ✅ Existing patterns for legal document processing
- ✅ Security patterns already established
- ✅ Faster development using reference implementation

**Cons:**
- ❌ May need significant adaptation for Australian context
- ❌ Existing servers focused on US/Clio integration
- ❌ Still needs corpus integration work

**Effort:** Medium (1-2 weeks)

**Reference:** [LegalContext MCP Server](https://mcp.so/server/legal-context/protomated)

### Recommended Approach

**Start with Option 1** (Standalone MCP Server with Local Corpus):
- Most control and best long-term foundation
- Build proper RAG pipeline that can be reused
- Design with Option 2 in mind (future Ginan integration)
- Accept higher initial effort for better long-term value

**Phase 1:** Local Corpus MCP Server (2-3 weeks)
**Phase 2:** Add Ginan integration when API available (TBD)

### Files to Create/Modify

**New files:**
- `~/.claude/mcp-servers/australian-legal/` - MCP server directory
- `~/.claude/mcp-servers/australian-legal/server.py` - Main MCP server implementation
- `~/.claude/mcp-servers/australian-legal/corpus_indexer.py` - Download and index Open Australian Legal Corpus
- `~/.claude/mcp-servers/australian-legal/legal_search.py` - RAG-based legal document search
- `~/.claude/mcp-servers/australian-legal/requirements.txt` - Python dependencies
- `~/.claude/mcp-servers/australian-legal/README.md` - Setup and usage documentation
- `~/.claude/mcp-servers/australian-legal/config.json` - Corpus paths, embeddings config

**Modified files:**
- `~/.claude/config.json` - Add Australian Legal MCP server to global config
- `~/.claude/CLAUDE.md` - Document available legal AI capabilities

**Data storage:**
- `~/.claude/mcp-servers/australian-legal/data/corpus/` - Downloaded corpus files
- `~/.claude/mcp-servers/australian-legal/data/embeddings/` - Vector embeddings database

**Detail Log:** [debug/IDEA-004-global-australian-legal-ai-agents-sovereign-ai-open-legal-corpus.md](debug/IDEA-004-global-australian-legal-ai-agents-sovereign-ai-open-legal-corpus.md)

---
| IDEA-005 | ESRI Partnership for GDAC-SA Tender - LithoSurfer Migration from Mapbox to ArcGIS | P0 | 💡 idea | [debug/IDEA-005-esri-partnership-for-gdac-sa-tender-lithosurfer-migration-from-mapbox-to-arcgis.md](debug/IDEA-005-esri-partnership-for-gdac-sa-tender-lithosurfer-migration-from-mapbox-to-arcgis.md) |
