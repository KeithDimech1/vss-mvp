# Lesson 01: Tender Document Content Review and Copy Improvement

**Agent:** Jon Monk
**Created:** 2026-01-11
**Target Unknown:** How to systematically review and improve tender/proposal document copy for accuracy, consistency, and professionalism

---

## What This Lesson Covers

This lesson documents a systematic approach for reviewing tender and proposal documents to identify and fix content issues before visual design. The goal is to produce clean, accurate, consistent copy that is ready for design polish by Arty Farty.

**Two-stage workflow:**
1. **Stage 1 (Jon Monk):** Content quality - Fix critical errors, improve copy, ensure consistency
2. **Stage 2 (Arty Farty):** Visual design - Layout, typography, professional polish

This lesson focuses on Stage 1.

---

## Review Methodology

### Step 1: Initial Document Scan (10-15 minutes)

**Goal:** Understand document structure and identify major issues quickly

1. **Convert to readable format** (if binary format like .docx)
   ```bash
   textutil -convert txt "document.docx" -output "document.txt"
   ```

   **💡 Pro Tip:** Converting to .txt early saves time and makes it easier to search for specific terms or inconsistencies across multiple documents.

2. **Read Table of Contents** - Understand document structure

3. **Scan for obvious issues:**
   - Missing sections referenced in TOC
   - Formatting errors (visible even in text conversion)
   - Large gaps or incomplete sections

### Step 2: Deep Read with Issue Logging (30-60 minutes)

**Goal:** Identify all content issues categorized by severity

**Read through entire document systematically, logging issues in three categories:**

#### Category 1: CRITICAL ISSUES (Must Fix Before Submission)

Issues that:
- Create legal/compliance risks
- Undermine credibility
- Make document unusable or confusing
- Contain factually incorrect information

**Examples:**
- ABN (business registration number) inconsistency across documents
- Date errors (submission date in wrong year)
- Missing required appendices
- Broken references (document references files that don't exist)

**Why Critical:** These issues can cause immediate disqualification or raise red flags about attention to detail.

#### Category 2: IMPORTANT ISSUES (Should Fix)

Issues that:
- Miss opportunities to strengthen the submission
- Leave questions unanswered
- Show gaps in addressing requirements

**Examples:**
- Missing client-specific requirements (e.g., Saudization plan, local employment strategy)
- Missing organization chart (referenced in TOC but not included)
- Weak sections that don't fully address RFQ requirements

**Why Important:** These issues don't disqualify but weaken competitiveness.

#### Category 3: MINOR IMPROVEMENTS (Nice to Have)

Issues that:
- Improve readability
- Enhance professionalism
- Make information easier to scan

**Examples:**
- Breaking long paragraphs for readability
- Improving table formatting consistency
- Adding glossary for technical terms
- Standardizing contact information format

**Why Minor:** These are polish items that improve quality but don't affect content accuracy.

**💡 Pro Tip:** The three-tier categorization system (Critical/Important/Minor) helps prioritize fixes clearly and communicate urgency to stakeholders.

### Step 3: Cross-Document Consistency Check (15-20 minutes)

**Goal:** Ensure all documents in the package are consistent with each other

**⚠️ CRITICAL:** This step catches the most serious errors. Cross-document inconsistencies (especially in company identifiers) can raise red flags about professionalism and attention to detail.

**Check across all documents:**

1. **Identifiers:**
   - Company name spelling
   - Registration numbers (ABN, ACN, etc.)
   - Addresses (street, city, postal code)
   - Phone numbers and email addresses

2. **Dates:**
   - Submission dates
   - Document creation dates
   - Financial year references
   - Project timelines

3. **References:**
   - Appendix letters/numbers match between main doc and actual files
   - Internal cross-references point to correct sections
   - External links are valid and work

4. **Formatting:**
   - Currency display (consistent format for AUD/SAR, etc.)
   - Number formatting (commas, decimals)
   - Date formats (DD-MM-YYYY vs MM/DD/YYYY)

5. **Branding:**
   - Company name format (Lithodat Pty Ltd vs Lithodat)
   - Logo usage (if applicable)
   - Color scheme consistency

### Step 4: Copywriting Improvements (20-30 minutes)

**Goal:** Improve clarity, flow, and persuasiveness without changing technical content

**Focus areas:**

#### Readability
- Break walls of text into 2-3 sentence paragraphs
- Use active voice ("We deliver solutions" not "Solutions are delivered")
- Remove jargon where possible, explain where necessary
- Add transition sentences between sections

#### Clarity
- Replace vague terms with specific statements
  - Before: "We have extensive experience"
  - After: "We have delivered 3 national government projects totaling $3.7M AUD"
- Define acronyms on first use
- Use concrete examples over abstract descriptions

#### Structure
- Ensure each section answers: What, Why, How, Evidence
- Add subheadings to break up long sections
- Use bulleted lists for multiple related points
- Ensure logical flow from section to section

#### Persuasiveness (for proposals/tenders)
- Lead with value proposition (what client gets)
- Support claims with evidence (metrics, references, examples)
- Address objections proactively
- Show understanding of client's challenges

---

## Review Output Format

**Structure the review as:**

**💡 Pro Tip:** This review output format is well-received by stakeholders because it's actionable, prioritized, and includes time estimates for planning.

### 1. Executive Assessment (3-5 sentences)
- Overall document quality (X/10)
- Main strengths (2-3 bullet points)
- Most critical issue

### 2. Critical Issues (Must Fix)
For each issue:
- **Location:** File name, section, line numbers
- **Problem:** What's wrong
- **Impact:** Why this matters
- **Fix Required:** Specific action needed

### 3. Important Issues (Should Fix)
Same format as critical issues

### 4. Minor Improvements (Nice to Have)
Can be more concise, grouped by type

### 5. Overall Recommendations
- Prioritized fix list
- Estimated time to address issues
- When to hand off to design specialist

---

## Example Review Output

```markdown
## 📋 TENDER DOCUMENTATION REVIEW

**Document:** GDAC-SA Pre-Qualification Response
**Review Date:** 2026-01-11
**Reviewer:** Jon Monk

### ✅ OVERALL ASSESSMENT: 7.5/10 (before fixes) → 9/10 (after fixes)

**Strengths:**
- ✅ Strong technical narrative with excellent evidence
- ✅ Clear value proposition backed by 3 government projects
- ✅ Well-structured with good use of tables

**Most Critical Issue:**
- 🚨 ABN inconsistency across documents (legal/compliance risk)

### 🚨 CRITICAL ISSUES (Must Fix Before Submission)

**Issue #1: ABN Inconsistency**
- **Location:** Multiple files (main doc line 4 vs QMS/HSE policies line 5)
- **Problem:** Two different ABN numbers used (63 627 008 904 vs 48 647 191 452)
- **Impact:** Raises questions about which company is bidding, potential legal issues
- **Fix Required:** Verify correct ABN from ASIC records, update ALL documents

**Issue #2: Date Errors**
[... continue with same format ...]

### ⚠️ IMPORTANT ISSUES (Should Fix)

[... continue with same format ...]

### 🔧 MINOR IMPROVEMENTS (Nice to Have)

[... continue with same format ...]

### 🎯 RECOMMENDED ACTION PLAN

**Priority 1 (Before Arty Farty involvement):**
1. Fix ABN consistency (1 hour)
2. Fix date errors (15 min)
3. Fix appendix references (30 min)

**Priority 2 (After content fixes):**
4. Add Saudization plan (2 hours)
5. Include organization chart (30 min)

**Priority 3 (Optional polish):**
6. Minor copywriting improvements (1-2 hours)

**Total Estimated Time:** 5-6 hours

**Handoff to Arty Farty:** After Priority 1 and 2 complete
```

---

## When to Involve Other Specialists

**Before you finish the review, consider:**

### Legal Eagle (for legal/compliance)
- Contract language
- Compliance with tender requirements
- Legal declarations
- Intellectual property references
- Liability statements

### Arty Farty (for design - AFTER content is finalized)
- Visual layout and typography
- Document formatting and styling
- Diagrams and infographics
- Professional polish and presentation
- Brand consistency

### Domain Specialists (Main Claude or others)
- Technical accuracy of domain-specific content
- Industry terminology validation
- Project methodology descriptions
- Technical specifications

### Carbos / Environmental Specialists
- Sustainability claims
- Environmental impact statements
- Carbon reduction strategies

---

## Handoff to Arty Farty

**After completing all content fixes, prepare handoff package:**

### 1. Clean Documents
- All critical and important issues fixed
- Copy improvements applied
- Consistency verified across all documents

### 2. Design Brief for Arty Farty
```markdown
## Design Brief: [Project Name]

**Document Type:** Tender response / Proposal / Report
**Page Count:** X pages
**Deadline:** [Date]

**Design Requirements:**
- Professional, corporate style
- Client industry: [e.g., Government, Mining, Geoscience]
- Target audience: [e.g., Technical evaluators, Executives]
- Branding: [Company colors, logo usage guidelines]

**Key Sections Needing Visual Enhancement:**
1. Executive Summary (most important - client reads this first)
2. Project examples (add visual interest with diagrams/screenshots)
3. Financial tables (ensure easy to scan and compare)
4. Organization chart (create clean visual hierarchy)

**Provided Assets:**
- Logo files
- Project screenshots
- Data visualization requirements
- Brand guidelines

**Output Format:**
- [e.g., PDF for digital submission]
- [e.g., Word + PDF for print and digital]
```

### 3. Flag Design Considerations

**Tell Arty Farty about:**
- Long tables that need layout optimization
- Sections where diagrams would help (e.g., data pipeline, org structure)
- Visual hierarchy needs (what should stand out)
- Page break suggestions (where sections should start on new pages)
- Image placement opportunities

---

## Key Rules for Tender/Proposal Reviews

### DO:
✅ **Fix facts first** - Accuracy before polish
✅ **Verify every claim** - Check references, metrics, dates
✅ **Be specific in feedback** - Give line numbers and exact fixes needed
✅ **Prioritize ruthlessly** - Not all issues are equal
✅ **Think like evaluator** - What questions will they have?
✅ **Check cross-document consistency** - Everything must match
✅ **Document the review** - Clear output that's actionable

### DON'T:
❌ **Skip consistency checks** - Inconsistency kills credibility
❌ **Assume references are correct** - Verify appendices exist, links work
❌ **Make design changes** - That's Arty Farty's job (visual layout, typography)
❌ **Rewrite without understanding** - Preserve technical accuracy
❌ **Ignore minor issues completely** - Log them, but deprioritize
❌ **Rush the cross-document check** - This catches critical errors

---

## Common Tender Document Gotchas

Issues that frequently appear in tender/proposal documents:

### Identifiers
- ❌ Company registration numbers inconsistent across documents
- ❌ Contact information varies between main doc and appendices
- ❌ Project references don't match actual project names

### References
- ❌ Appendix letters/numbers don't match files (calls it "Appendix K" but file is "J")
- ❌ Internal section references point to wrong sections
- ❌ Reference contacts have outdated email addresses

### Dates and Currency
- ❌ Submission date not updated from template
- ❌ Financial year references inconsistent (FY2024 vs FY2024-2025)
- ❌ Currency conversions calculated incorrectly or not updated
- ❌ Date formats mixed (American vs Australian/European)

### Required Content
- ❌ Missing sections referenced in Table of Contents
- ❌ Client-specific requirements not addressed (e.g., Saudization plan)
- ❌ Compliance declarations incomplete or unsigned

### Copy Quality
- ❌ Walls of text without paragraph breaks
- ❌ Jargon-heavy without definitions
- ❌ Weak executive summary (doesn't hook reader immediately)
- ❌ Vague claims without evidence

---

## Time Estimates

**Typical review timeframes:**
- Small proposal (10-20 pages): 1.5-2 hours
- Medium tender response (30-50 pages): 2-3 hours
- Large tender package (50+ pages + appendices): 3-5 hours

**Factors that increase time:**
- Multiple documents requiring consistency checks
- Heavy technical content requiring domain specialist consultation
- Significant copywriting improvements needed
- Complex cross-referencing between documents

**Note:** First use of this methodology may take 20-30% longer while learning the process. Time improves with practice.
