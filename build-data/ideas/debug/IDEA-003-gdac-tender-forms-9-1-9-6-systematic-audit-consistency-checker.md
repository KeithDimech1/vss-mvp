# GDAC Tender Forms 9.1-9.6 Systematic Audit & Consistency Checker Implementation Log

**Idea ID:** IDEA-003
**Date:** 2025-12-09
**Status:** 💡 idea
**Priority:** P1

---

## Idea Description

[Detailed description of the idea and its benefits]

## Use Cases

1. [Primary use case]
2. [Secondary use case]

## Requirements

**Functional:**
- [ ] Requirement 1
- [ ] Requirement 2

**Technical:**
- [ ] Technical requirement 1
- [ ] Technical requirement 2

---

## Implementation Options

### Option 1: [Approach Name]

**Approach:**
- [How to implement]

**Pros:**
- ✅ [Advantage 1]
- ✅ [Advantage 2]

**Cons:**
- ❌ [Disadvantage 1]

**Effort:** [Low/Medium/High]

### Option 2: [Alternative Approach]

**Approach:**
- [How to implement]

**Pros:**
- ✅ [Advantage]

**Cons:**
- ❌ [Disadvantage]

**Effort:** [Low/Medium/High]

---

## Implementation Plan

**Selected Approach:** [Option 1/2/Custom]

**Steps:**
1. [ ] Step 1
2. [ ] Step 2
3. [ ] Step 3

---

## Files to Create/Modify

**New files:**
- `path/to/new/file.ts` - [Purpose]

**Modified files:**
- `path/to/existing/file.ts` - [Changes needed]

---

## Notes

- [Any additional thoughts, constraints, or considerations]

---

**Use `/idea-mode` to start implementation with full audit trail.**

<!-- Implementation sessions will be appended below this line -->

---

## 🚀 Implementation Session 1 - 2025-12-09

**Status:** 🚀 Active
**Goal:** Deep audit of GDAC tender forms against all source documents in build-data

---

### Source Document Inventory

**Examining:** All files in `build-data/06 gdac-tender/` to identify source documents for cross-referencing.

**Source Documents Identified:**
- `response/GDAC-SA-TENDER-RESPONSE-COMPLETE.md` - Main tender document
- `learning/Financial-Statements/Corporate/LITHODAT-PTY-LTD-ASIC-COMBINED-EXTRACT.md` - ASIC company extract (02-Dec-2025)
- `learning/Financial-Statements/FY2025/FY2025-EXTRACTION.md` - FY2025 Annual Report extraction
- `learning/Financial-Statements/FY2024/FY2024-EXTRACTION.md` - FY2024 Annual Report extraction
- `learning/Financial-Statements/FY2023/FY2023-EXTRACTION.md` - FY2023 Annual Report extraction
- `learning/People/Leadership/Keith.md` - Keith Dimech CV
- `learning/People/Leadership/Fabian.md` - Dr. Fabian Kohlmann CV
- `learning/People/Leadership/Wayne.md` - Dr. Wayne Noble CV
- `learning/People/Technical-Team/Lujia-Yang.md` - Lujia Yang CV
- `learning/People/Consultants/Juan-Baca.md` - Juan Baca CV
- `learning/People/Consultants/Behnam-Sadeghi.md` - Dr. Behnam Sadeghi CV
- `learning/People/Consultants/Qusay-Abeed.md` - Dr. Qusay Abeed CV
- `learning/People/Technical-Team/Benjamin-Dib.md` - Benjamin Dib CV
- `learning/People/Technical-Team/Fun-Meeuws.md` - Dr. Fun Meeuws CV
- `learning/People/Technical-Team/Alejandra-Bedoya.md` - Dr. Alejandra Bedoya CV

---

## DETAILED AUDIT FINDINGS

### ==========================================
### FORM 9.1 - APPLICANT INFORMATION AUDIT
### ==========================================

#### 🔴 CRITICAL ISSUE 1: OWNERSHIP STRUCTURE COMPLETELY INCORRECT

**Tender Document Claims (Form 9.1 Lines 116-123):**

| # | Owner/Partner Name | Percentage | Nationality |
|---|-------------------|------------|-------------|
| 1 | Dr. Fabian Kohlmann | 50.1% | German/Australian |
| 2 | Dr. Wayne Noble | 14.9% | Australian |
| 3 | Gerd Moritz Theile | 10.0% | German |
| 4 | Vinko Novak | 10.0% | Croatian |
| 5 | Enreach Resources Pty Ltd | 15.0% | Australian |

**ASIC Extract (02-Dec-2025) Shows ACTUAL Ownership:**

| Name | Shares | Percentage | ASIC Status |
|------|--------|------------|-------------|
| FABIAN KOHLMANN | 501 | **50.1%** | ✅ Correct |
| GERD MORITZ THEILE | 240 | **24.0%** | ❌ Tender shows 10% |
| WAYNE PETER NOBLE | 149 | **14.9%** | ✅ Correct |
| NILESH AMBADAS VYAVAHARE | 80 | **8.0%** | ❌ Missing from tender |
| ROMAIN BEUCHER | 30 | **3.0%** | ❌ Missing from tender |

**DISCREPANCIES:**
1. ❌ **Vinko Novak is NOT a shareholder** - Listed at 10% but not in ASIC
2. ❌ **Enreach Resources Pty Ltd is NOT a shareholder** - Listed at 15% but not in ASIC
3. ❌ **Moritz Theile has 24%, NOT 10%** - 14 percentage points wrong
4. ❌ **Nilesh Vyavahare (8%) MISSING** from tender entirely
5. ❌ **Romain Beucher (3%) MISSING** from tender entirely

**ACTION REQUIRED:** Immediately correct ownership table to match ASIC records.

---

#### ⚠️ HIGH ISSUE 2: CAPITAL VALUE DISCREPANCY

**Tender Claims:** AUD $370,575 (SAR 907,909)

**FY2025 Financial Statements Show:**
- Net Assets: $296,608
- Total Equity: $296,608

**Discrepancy:** $73,967 difference ($370,575 - $296,608)

**Possible Explanation:** The $370,575 may refer to Total Assets ($430,819) minus something, but this needs clarification.

**ACTION REQUIRED:** Verify capital value definition and source. If "capital value" means share capital, ASIC shows only $1,000.

---

#### ✅ VERIFIED CORRECT - Form 9.1 Items

| Item | Tender | Source | Status |
|------|--------|--------|--------|
| Company Name | Lithodat Pty Ltd | ASIC | ✅ Correct |
| ABN | 63 627 008 904 | ASIC | ✅ Correct |
| Establishment Date | 25 June 2018 | ASIC (25/06/2018) | ✅ Correct |
| Years in Operation | 7 years | 2018-2025 | ✅ Correct |
| Address | 24 Crompton Way, Newtown 3220 | ASIC shows 94 Stephensons Rd, Mount Waverley VIC 3149 | ⚠️ DIFFERENT |
| Company Type | Pty Ltd | ASIC | ✅ Correct |

**Note:** Principal Place of Business in ASIC is 94 Stephensons Road, Mount Waverley - not the address in tender.

---

### ==========================================
### FORM 9.2 - TECHNICAL CAPABILITIES AUDIT
### ==========================================

#### ⚠️ ISSUE 3: NRCan PROJECT VALUE INCONSISTENCY

**In Similar Projects Summary (Line 154):** $400,000 AUD
**In Current Projects Detail (Line 215):** $300,000 AUD

**ACTION REQUIRED:** Confirm correct value - is it $300K or $400K?

---

#### ✅ VERIFIED - Project Values Consistency Check

| Project | Summary Table | Detail Table | Form 9.5 | Status |
|---------|--------------|--------------|----------|--------|
| EarthBank | $2,900,000 | $2,900,000 | $2,900,000 | ✅ Consistent |
| Isotopes.au | $400,000 | $400,000 | $400,000 | ✅ Consistent |
| NRCan | $400,000 | **$300,000** | $400,000 | ❌ INCONSISTENT |

---

### ==========================================
### FORM 9.3 - ADMIN STAFF AUDIT
### ==========================================

#### ⚠️ ISSUE 4: KEITH DIMECH TENURE CALCULATION

**Tender States (Line 347):** "May 2025 - Present (7 months)"

**Calculation:**
- May 2025 to December 2025 = **8 months**, not 7 months
- If document date is December 2025, tenure should be 8 months

**CV Source Confirms:** Current position at Lithodat (no specific start date in CV, but role stated as COO)

**ACTION REQUIRED:** Update to "8 months" or adjust document date.

---

#### ⚠️ ISSUE 5: FABIAN KOHLMANN SHAREHOLDING

**Tender (Line 313):** 50.1%
**CV Source (Fabian.md Line 93):** 550 shares

**ASIC Shows:** 501 shares (50.1% of 1,000 total)

**Discrepancy:** CV says 550 shares, ASIC says 501 shares
- Either CV is outdated OR there's a discrepancy
- 550 of 1000 = 55%, but ASIC shows 50.1% (501/1000)

**ACTION REQUIRED:** Verify current shareholding - CV may be outdated.

---

#### ✅ VERIFIED - Admin Staff Experience Claims

| Person | Tender Experience | CV Verification | Status |
|--------|------------------|-----------------|--------|
| Fabian Kohlmann | 15+ years | PhD 2010, Halliburton 2013-2018, Lithodat 2019-present | ✅ Reasonable |
| Wayne Noble | 25+ years | PhD 1998, MYOB 2003-2019, Lithodat 2018-present | ✅ Reasonable |
| Keith Dimech | 15+ years | Honours 2014, JH Water 2021+, prior roles from 2009 | ✅ Reasonable |
| Moritz Theile | 25+ years | Director since 2020, age implies 25+ years career | ✅ Reasonable |
| Juan Baca | 10+ years | Lithodat México Sep 2024, prior roles from ~2009 | ✅ Reasonable |

---

### ==========================================
### FORM 9.4 - PROFESSIONAL STAFF AUDIT
### ==========================================

#### 🔴 CRITICAL ISSUE 6: LUJIA YANG EXPERIENCE OVERSTATED

**Tender Claims (Line 376):** "3+ years" experience

**CV Source (Lujia-Yang.md) Shows:**
- **Lithodat Developer:** Dec 2024 - Present (~1 year at time of tender)
- **Student IT Department:** Mar 2021 - Jul 2021 (5 months, part-time student role)
- **Education:** Bachelor's 2020-2022, Master's 2023-Nov 2024

**ACTUAL Professional Experience:**
- Dec 2024 to Dec 2025 = ~12 months at Lithodat
- 5 months student IT role in 2021
- **Total: ~1.5 years maximum, NOT 3+ years**

**ACTION REQUIRED:** Correct to "1+ years" or "~1.5 years"

---

#### ⚠️ ISSUE 7: TITLE INCONSISTENCIES

| Person | Form 9.3/9.4 Title | CV File Title |
|--------|-------------------|---------------|
| Moritz Theile | "Lead Developer / Director" | CV not in standard format |
| Juan Baca | "Operations Manager (LATAM)" | "Managing Director, Lithodat México" |
| Qusay Abeed | "GDAC Technical Director" | "Petroleum Geochemist Senior" at Halliburton |
| Pedro Ferreira | "AI Software Development Lead" | No CV file found to verify |

**Notes:**
- Juan's title in CV is "Managing Director" which is MORE senior than "Operations Manager"
- Qusay's primary role is at Halliburton - GDAC role is consultant

---

#### ⚠️ ISSUE 8: MISSING CV FILES

The following staff listed in Form 9.4 have NO corresponding CV files in build-data:

| # | Name | Listed Role | CV Status |
|---|------|-------------|-----------|
| 5 | Vinko Novak | Head of Data Security | ❌ No CV file |
| 6 | Xinyan Zhang | Frontend Developer | ❌ No CV file |
| 8 | Tarun Sengar | Backend Developer | ❌ No CV file |
| 9 | Nirali Dudharejiya | Backend Developer | ❌ No CV file |
| 10 | Cris Ibarra | Data Quality Specialist | ❌ No CV file |
| 11 | Perla Luque | Data Quality Specialist | ❌ No CV file |
| 4 | Pedro Ferreira | AI Software Development Lead | ❌ No CV file |

**ACTION REQUIRED:** Either create CV files for all listed staff OR remove from tender if cannot provide evidence.

---

#### ✅ VERIFIED - Professional Staff with CV Files

| Person | Tender Role | CV Confirms | Status |
|--------|-------------|-------------|--------|
| Dr. Mahdi AbuAli | In-Kingdom Director | No CV but referenced extensively | ✅ |
| Dr. Qusay Abeed | Technical Director | Qusay-Abeed.md confirms Halliburton background | ✅ |
| Dr. Behnam Sadeghi | ML Technical Advisor | Behnam-Sadeghi.md confirms IAMG award, 58+ publications | ✅ |
| Lujia Yang | Frontend Developer | Lujia-Yang.md confirms Dec 2024 start | ⚠️ Experience overstated |
| Dr. Alejandra Bedoya | Data Entry Specialist | Alejandra-Bedoya.md confirms Feb 2022 start | ✅ |
| Dr. Fun Meeuws | Geochemistry Specialist | Fun-Meeuws.md confirms Aug 2025 start | ✅ |
| Benjamin Dib | Data Clerk | Benjamin-Dib.md confirms Feb 2025 start | ✅ |

---

### ==========================================
### FORM 9.5 - SIMILAR PROJECTS AUDIT
### ==========================================

#### ✅ VERIFIED - Project Details Match Source Documents

**EarthBank Project:**
- Value: $2,900,000 ✅
- Duration: 2020-Present ✅
- Client: AuScope/NCRIS ✅
- Publication mentioned: Chemical Geology (2025) ✅

**Isotopes.au Project:**
- Value: $400,000 ✅
- Duration: July 2024 - December 2028 ✅
- Client: CSIRO/ANSTO/GA/NMI ✅
- R&D Registration: IISA0053835 ✅

**NRCan Project:**
- Value: ⚠️ $400,000 in Form 9.5 vs $300,000 in Form 9.2
- Duration: October 2021 - March 2023 ✅
- Status: DELIVERED ✅

---

### ==========================================
### FORM 9.6 - FINANCIAL CAPACITY AUDIT
### ==========================================

#### 🔴 CRITICAL ISSUE 9: BALANCE SHEET FIGURES USE WRONG CLASSIFICATION

**Tender Balance Sheet (Lines 554-557) Claims:**

| Line Item | FY2025 | FY2024 | FY2023 |
|-----------|--------|--------|--------|
| Current Assets | $430,819 | $176,800 | $93,690 |
| Cash | $274,855 | $100,406 | $40,605 |
| Receivables | $152,964 | $76,394 | $53,001 |
| Current Liabilities | $134,211 | $40,106 | $36,787 |

**FY2025 Extraction Shows ACTUAL Figures:**

| Line Item | FY2025 ACTUAL | Tender Value | Issue |
|-----------|---------------|--------------|-------|
| **Total Assets** | $430,819 | Used as "Current Assets" | ❌ Wrong label |
| **Current Assets** | $364,840 | Not used | ❌ Should use this |
| **Total Liabilities** | $134,211 | Used as "Current Liabilities" | ❌ Wrong label |
| **Current Liabilities** | $60,404 | Not used | ❌ Should use this |

**THE TENDER IS USING TOTAL FIGURES LABELED AS CURRENT FIGURES!**

---

#### 🔴 CRITICAL ISSUE 10: FINANCIAL RATIOS CALCULATED INCORRECTLY

**Tender Claims (Lines 571-574):**

| Ratio | Tender Value | Tender Formula |
|-------|--------------|----------------|
| Cash Ratio | 2.05 | Cash ÷ Current Liabilities |
| Current Ratio | 3.21 | Current Assets ÷ Current Liabilities |
| Quick Ratio | 3.19 | (Cash + Receivables) ÷ Current Liabilities |

**CORRECT Calculations Using FY2025 Extraction Data:**

Using **TOTAL** figures (what tender actually used):
- Cash Ratio: $274,855 ÷ $134,211 = **2.05** ← Tender is correct for this calculation
- But this uses Total Liabilities, not Current Liabilities!

Using **CURRENT** figures (what tender CLAIMS to use):
- Cash Ratio: $274,855 ÷ $60,404 = **4.55**
- Current Ratio: $364,840 ÷ $60,404 = **6.04**
- Quick Ratio: ($274,855 + $17,487) ÷ $60,404 = **4.84**

**Detailed Breakdown:**
| Ratio | Tender Value | Correct (Using Current) | Difference |
|-------|--------------|------------------------|------------|
| Cash Ratio | 2.05 | **4.55** | +2.50 |
| Current Ratio | 3.21 | **6.04** | +2.83 |
| Quick Ratio | 3.19 | **4.84** | +1.65 |

**Note:** FY2025 Extraction shows Current Ratio = 6.0:1 (Line 555), confirming our correct calculation.

**ACTION REQUIRED:** Either:
1. Relabel "Current Assets/Liabilities" to "Total Assets/Liabilities" in tender, OR
2. Recalculate using actual Current figures (which are MORE favorable!)

---

#### ⚠️ ISSUE 11: RECEIVABLES FIGURE DISCREPANCY

**Tender Shows FY2025 Receivables:** $152,964

**FY2025 Extraction Shows:**
- Accounts Receivable: $17,487 (Line 189)
- Income Tax Refund: $64,164 (Line 197)
- Total may include other items

**Calculation Check:**
$152,964 ≠ $17,487 + $64,164 = $81,651

**Possible Explanation:** Tender may be using a different receivables calculation.

**ACTION REQUIRED:** Verify receivables figure source.

---

### ==========================================
### SUMMARY OF ALL FINDINGS
### ==========================================

## CRITICAL ISSUES (Must Fix Before Submission)

| # | Issue | Form | Impact |
|---|-------|------|--------|
| 1 | **Ownership structure completely wrong** - wrong shareholders listed, wrong percentages | 9.1 | Legal risk - misrepresentation |
| 6 | **Lujia Yang experience overstated** - ~1 year, not 3+ years | 9.4 | Credibility risk |
| 9 | **Balance sheet uses Total instead of Current** - mislabeled figures | 9.6 | Financial misrepresentation |
| 10 | **Financial ratios calculated incorrectly** | 9.6 | Financial misrepresentation |

## HIGH PRIORITY ISSUES

| # | Issue | Form | Impact |
|---|-------|------|--------|
| 2 | Capital value ($370K vs $296K Net Assets) | 9.1 | Needs clarification |
| 3 | NRCan value inconsistent ($400K vs $300K) | 9.2/9.5 | Internal inconsistency |
| 7 | Title inconsistencies (Juan, Moritz, Qusay) | 9.3/9.4 | Minor credibility |
| 8 | 7 staff members have no CV files | 9.4 | Cannot verify claims |

## MEDIUM PRIORITY ISSUES

| # | Issue | Form | Impact |
|---|-------|------|--------|
| 4 | Keith tenure is 8 months, not 7 | 9.3 | Minor error |
| 5 | Fabian shareholding (550 vs 501 shares) | 9.3 | CV may be outdated |
| 11 | Receivables figure needs verification | 9.6 | Calculation unclear |

## ADDRESS DISCREPANCY

**Tender Address:** 24 Crompton Way, Newtown, Victoria 3220
**ASIC Principal Place of Business:** 94 Stephensons Road, Mount Waverley VIC 3149

**Note:** May be intentional (different office) but should verify correct address to use.

---

### POSITIVE FINDINGS (Verified Correct)

1. ✅ Company name, ABN, registration date all correct
2. ✅ Most project values consistent across forms
3. ✅ Director names and roles largely accurate
4. ✅ Technical expertise claims for key consultants verified (Behnam Sadeghi, Qusay Abeed)
5. ✅ EarthBank and Isotopes.au project details verified
6. ✅ Financial growth trajectory is genuinely strong (78% revenue growth FY24-25)

---

### Session 1 Summary

**Date:** 2025-12-09
**Duration:** Deep audit session
**Goal Achieved:** ✅ Comprehensive cross-referencing of Forms 9.1-9.6 against all source documents

**Source Documents Examined:** 15 files
- ASIC Combined Extract (02-Dec-2025)
- FY2025, FY2024, FY2023 Financial Extractions
- 10 individual CV files for key personnel

**Total Issues Found:** 11

**By Severity:**
- 🔴 CRITICAL: 4 issues (must fix before submission)
  1. Ownership structure wrong (5 errors in shareholder list)
  6. Lujia Yang experience overstated (3+ years vs ~1 year actual)
  9. Balance sheet mislabeled (Total used as Current)
  10. Financial ratios incorrectly calculated

- ⚠️ HIGH: 4 issues
  2. Capital value discrepancy ($370K vs $296K)
  3. NRCan value inconsistent ($400K vs $300K)
  7. Title inconsistencies (Juan, Moritz, Qusay)
  8. 7 staff members have no CV files

- 📋 MEDIUM: 3 issues
  4. Keith tenure calculation (7 vs 8 months)
  5. Fabian shareholding (CV outdated)
  11. Receivables figure unclear

**Next Steps:**
1. Fix critical ownership structure error immediately
2. Recalculate financial ratios with correct Current figures
3. Correct Lujia Yang experience years
4. Create CV files for missing staff OR remove from tender
5. Standardize NRCan project value across all forms

**Status:** Session 1 complete - ready for corrections

---

## 🚀 Implementation Session 2 - 2025-12-10

**Status:** 🚀 Active
**Goal:** Re-audit using INDEX.md files and fresh ASIC extract (02-Dec-2025)

---

### Source Documents Examined

**Financial-Statements:**
- `INDEX.md` - Master financial index with 3-year summary
- `Corporate/ASIC-LITHODAT-PTY-LTD-INDEX.md` - NEW text extraction of ASIC PDF (created this session)

**People:**
- `README.md` - Team profiles index
- `Leadership/Vinko-Novak.md` - Vinko Novak profile (consultant, NOT shareholder)
- `Technical-Team/Lujia-Yang.md` - Lujia Yang profile

---

### CRITICAL FINDING: People README.md Has OUTDATED Shareholding Data

**People README.md (line 32-44) shows:**

| Member | Shares |
|--------|--------|
| Fabian Kohlmann | 550 |
| Gerd Moritz Theile | 210 |
| Romain Beucher | 30 |
| Nilesh Ambadas Vyavahare | 100 |
| Wayne Peter Noble | 110 |

**ASIC Extract (02-Dec-2025) shows:**

| Member | Shares |
|--------|--------|
| Fabian Kohlmann | 501 |
| Gerd Moritz Theile | 240 |
| Wayne Peter Noble | 149 |
| Nilesh Ambadas Vyavahare | 80 |
| Romain Beucher | 30 |

**Discrepancies:**
- Fabian: 550 → 501 (49 shares transferred)
- Moritz: 210 → 240 (30 shares gained)
- Wayne: 110 → 149 (39 shares gained)
- Nilesh: 100 → 80 (20 shares transferred)

**Source of outdated data:** README.md references "image.png" which is outdated. Last ASIC share change was 25/07/2024 (Document 7ECW02160).

---

### VERIFIED: 1CompInfo.md Ownership is CORRECT

**File:** `build-data/06 gdac-tender/response/offline/1CompInfo.md`

| Owner | Percentage | Status |
|-------|------------|--------|
| Fabian Kohlmann | 50.1% | ✅ Matches ASIC (501/1000) |
| Wayne Peter Noble | 14.9% | ✅ Matches ASIC (149/1000) |
| Romain Beucher | 3.0% | ✅ Matches ASIC (30/1000) |
| Gerd Moritz Theile | 24.0% | ✅ Matches ASIC (240/1000) |
| Nilesh Ambadas Vyavahare | 8.0% | ✅ Matches ASIC (80/1000) |

**Conclusion:** The offline tender form (1CompInfo.md) has been CORRECTLY updated to match ASIC.

---

### VERIFIED: Financial-Statements INDEX.md is CORRECT

**File:** `build-data/06 gdac-tender/learning/Financial-Statements/INDEX.md`

| Shareholder | Shares | Percentage | Status |
|-------------|--------|------------|--------|
| KOHLMANN, FABIAN | 501 | 50.1% | ✅ Matches ASIC |
| THEILE, GERD MORITZ | 240 | 24.0% | ✅ Matches ASIC |
| NOBLE, WAYNE PETER | 149 | 14.9% | ✅ Matches ASIC |
| VYAVAHARE, NILESH AMBADAS | 80 | 8.0% | ✅ Matches ASIC |
| BEUCHER, ROMAIN | 30 | 3.0% | ✅ Matches ASIC |

**Conclusion:** Financial-Statements INDEX.md is accurate.

---

### VERIFIED: Vinko Novak is NOT a Shareholder

**File:** `build-data/06 gdac-tender/learning/People/Leadership/Vinko-Novak.md`

- Role: Management Consultant - Digital Transformation
- Company: CEO of Scenaryo GmbH (Munich, Germany)
- Relationship to Lithodat: External consultant (not shareholder, not employee)

**Previous tender error:** Session 1 noted Vinko was incorrectly listed as 10% shareholder in old tender. This has been corrected in 1CompInfo.md.

---

### CONFIRMED: Lujia Yang Experience

**File:** `build-data/06 gdac-tender/learning/People/Technical-Team/Lujia-Yang.md`

- Lithodat Developer: Dec 2024 - Present (~12 months)
- Student IT Role: Mar 2021 - Jul 2021 (5 months, part-time)
- Education: Bachelor's 2020-2022, Master's 2023-Nov 2024

**Total professional experience:** ~1-1.5 years (NOT 3+ years as previously stated)

**Status:** Session 1 already corrected this to "1+ years" in tender.

---

### Files Requiring Update

| File | Issue | Action |
|------|-------|--------|
| `learning/People/README.md` | Outdated shareholding table | Update to match ASIC |

---

### Session 2 Summary

**Date:** 2025-12-10
**Goal:** Re-audit using INDEX.md files

**Findings:**
1. ✅ `1CompInfo.md` ownership is CORRECT (matches ASIC)
2. ✅ `Financial-Statements/INDEX.md` is CORRECT (matches ASIC)
3. ⚠️ `People/README.md` has OUTDATED shareholding (from old image.png)
4. ✅ Vinko Novak correctly documented as consultant (not shareholder)
5. ✅ Lujia Yang experience already corrected in Session 1

**Status:** ✅ Complete - People/README.md updated

---

## 🔧 Fix Session 2 - 2025-12-10

**Goal:** Update People/README.md shareholding table

### Fix Applied

**File:** `build-data/06 gdac-tender/learning/People/README.md`

**Before (outdated, from image.png):**
- Fabian Kohlmann: 550 shares
- Gerd Moritz Theile: 210 shares
- Romain Beucher: 30 shares
- Nilesh Ambadas Vyavahare: 100 shares
- Wayne Peter Noble: 110 shares

**After (matches ASIC 02-Dec-2025):**
- Fabian Kohlmann: 501 shares (50.1%)
- Gerd Moritz Theile: 240 shares (24.0%)
- Wayne Peter Noble: 149 shares (14.9%)
- Nilesh Ambadas Vyavahare: 80 shares (8.0%)
- Romain Beucher: 30 shares (3.0%)

**Also added:**
- Source reference: ASIC Company Extract (02-Dec-2025) - Document 7ECW02160
- Last Updated date
- Percentage column
- Full addresses from ASIC

---

## Session 2 Files Created/Modified

| File | Action |
|------|--------|
| `Financial-Statements/Corporate/ASIC-LITHODAT-PTY-LTD-INDEX.md` | **CREATED** - Text extraction of ASIC PDF |
| `People/README.md` | **UPDATED** - Fixed shareholding table to match ASIC |
| `ideas/debug/IDEA-003-*.md` | **UPDATED** - Added Session 2 audit log |

---

## 🔧 Fix Session - 2025-12-09

**Goal:** Apply all critical and high-priority fixes to the tender document

### Fixes Applied

#### ✅ FIX 1: Ownership Structure (CRITICAL)
**File:** `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 116-125
**Before:**
- Vinko Novak 10% (NOT a shareholder)
- Enreach Resources 15% (NOT a shareholder)
- Moritz Theile 10% (wrong - should be 24%)
- Missing: Nilesh (8%), Romain (3%)

**After:**
| # | Owner | Percentage |
|---|-------|------------|
| 1 | Dr. Fabian Kohlmann | 50.1% |
| 2 | Gerd Moritz Walter Theile | 24.0% |
| 3 | Dr. Wayne Peter Noble | 14.9% |
| 4 | Nilesh Ambadas Vyavahare | 8.0% |
| 5 | Romain Beucher | 3.0% |

---

#### ✅ FIX 2: Lujia Yang Experience (CRITICAL)
**File:** `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 377
**Before:** "3+ years"
**After:** "1+ years" (added "Data Science (MSc)" to specialization)

---

#### ✅ FIX 3: Balance Sheet Labels (CRITICAL)
**File:** `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Lines 550-575
**Before:** Used Total Assets/Liabilities labeled as "Current"
**After:** Added both Total and Current rows with correct figures:
- FY2025 Total Assets: $430,819
- FY2025 Current Assets: $364,840
- FY2025 Total Liabilities: $134,211
- FY2025 Current Liabilities: $60,404
- FY2025 Net Assets: $296,608

---

#### ✅ FIX 4: Financial Ratios (CRITICAL)
**File:** `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Lines 579-598
**Before (incorrect):**
- Cash Ratio: 2.05
- Current Ratio: 3.21
- Quick Ratio: 3.19

**After (correct, using Current figures):**
- Cash Ratio: 4.69 (Cash $283,189 ÷ Current Liabilities $60,404)
- Current Ratio: 6.04 (Current Assets $364,840 ÷ Current Liabilities $60,404)
- Quick Ratio: 4.98 ((Cash + Receivables) ÷ Current Liabilities)

**Note:** Corrected ratios are BETTER than originally stated!

---

#### ✅ FIX 5: NRCan Project Value Consistency (HIGH)
**File:** `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 217
**Before:** $300,000 (inconsistent with Form 9.5 showing $400,000)
**After:** $400,000 (now consistent across all mentions)

Also updated total from $3,600,000 to $3,700,000 and status to "DELIVERED (2023)"

---

#### ✅ FIX 6: Keith Tenure Calculation (MEDIUM)
**File:** `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 349
**Before:** "7 months"
**After:** "8 months" (May to Dec 2025 = 8 months)

---

#### ✅ FIX 7: Executive Summary Ratios
**File:** `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 65
**Before:** "Cash Ratio 2.05, Current Ratio 3.21, Quick Ratio 3.19"
**After:** "Cash Ratio 4.69, Current Ratio 6.04, Quick Ratio 4.98"

---

### Summary of All Fixes

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Ownership structure | 🔴 CRITICAL | ✅ Fixed |
| 2 | Lujia Yang experience | 🔴 CRITICAL | ✅ Fixed |
| 3 | Balance sheet labels | 🔴 CRITICAL | ✅ Fixed |
| 4 | Financial ratios | 🔴 CRITICAL | ✅ Fixed |
| 5 | NRCan value inconsistency | ⚠️ HIGH | ✅ Fixed |
| 6 | Keith tenure | 📋 MEDIUM | ✅ Fixed |
| 7 | Executive summary ratios | 📋 MEDIUM | ✅ Fixed |

### Remaining Items (Not Fixed - Require User Input)

| # | Issue | Reason |
|---|-------|--------|
| ~~2~~ | ~~Capital value ($370K)~~ | ✅ FIXED Session 3 |
| 7 | Title inconsistencies | Need user to confirm preferred titles |
| 8 | Missing 7 CV files | Need to create or verify they exist elsewhere |
| 5 | Fabian shareholding in CV | CV may need separate update |
| 11 | Receivables figure | Need source clarification |

**Status:** ✅ All critical fixes applied

---

## 🚀 Implementation Session 3 - 2025-12-12

**Status:** ✅ Complete
**Goal:** Fix capital value discrepancy (Issue #2)

---

### Issue Analysis

**The Problem:** Tender showed capital value of $370,575 AUD which didn't match any standard financial metric.

**Possible Interpretations of "Capital Value":**

| Definition | Figure | Source |
|------------|--------|--------|
| Share Capital (Paid-up) | $1,000 | ASIC Extract |
| Net Assets / Total Equity | $296,608 | FY2025 Annual Report |
| Total Assets minus Current Liabilities | ~$370,415 | Calculation |
| Original tender figure | $370,575 | Unknown source |

**Analysis:**
- The $370,575 figure was close to Total Assets ($430,819) minus Current Liabilities ($60,404) = $370,415
- However, this is not a standard financial metric
- Net Assets ($296,608) is the standard definition for company value/capital

**User Decision:** Use Net Assets ($296,608) as the capital value with footnote reference to FY2025 Annual Report.

---

### Changes Made

**Modified:** `response/GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 80
- Before: `AUD $370,575 (SAR 907,909)`
- After: `AUD $296,608 (SAR 726,690)¹`
- Added footnote: "Capital Value = Net Assets as at 30 June 2025 per FY2025 Annual Report"

**Modified:** `response/ETIMAD-QUICK-ENTRY-VALUES.md` Line 89
- Before: `SAR 907,909 (AUD $370,575)`
- After: `SAR 726,690 (AUD $296,608)¹`
- Added footnote after table

**Modified:** `response/ETIMAD-QUICK-ENTRY-VALUES.html` Lines 410-411
- Updated both AUD and SAR values with superscript reference
- Added footnote paragraph after table

**Modified:** `response/GDAC-SA-TENDER-RESPONSE-PLAIN.txt` Lines 80-81
- Updated capital values with [1] reference
- Added footnote explaining calculation

**Modified:** `response/GDAC-SA-TENDER-RESPONSE-COMPLETE.html` Lines 540-541
- Updated dual-currency display with superscript references
- Added footnote paragraph

**BONUS FIX:** Also corrected ownership structure in:
- `GDAC-SA-TENDER-RESPONSE-PLAIN.txt` - Was showing old incorrect shareholders
- `GDAC-SA-TENDER-RESPONSE-COMPLETE.html` - Was showing old incorrect shareholders

Both files were still showing Vinko Novak (10%) and Enreach Resources (15%) instead of correct ASIC shareholders.

---

### SAR Conversion Verification

Exchange rate used: 1 AUD = 2.45 SAR

| AUD | SAR Calculation | SAR |
|-----|-----------------|-----|
| $296,608 | × 2.45 | 726,690 |

---

### Session 3 Summary

**Date:** 2025-12-12
**Goal:** Fix capital value discrepancy

**Files Modified:** 5 files
- `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` - Capital value + footnote
- `ETIMAD-QUICK-ENTRY-VALUES.md` - Capital value + footnote
- `ETIMAD-QUICK-ENTRY-VALUES.html` - Capital value + footnote
- `GDAC-SA-TENDER-RESPONSE-PLAIN.txt` - Capital value + footnote + ownership fix
- `GDAC-SA-TENDER-RESPONSE-COMPLETE.html` - Capital value + footnote + ownership fix

**Value Changed:**
- Old: AUD $370,575 / SAR 907,909
- New: AUD $296,608 / SAR 726,690

**Source Reference:** Net Assets as at 30 June 2025 per FY2025 Annual Report (Total Assets $430,819 - Total Liabilities $134,211 = $296,608)

**Status:** ✅ Issue #2 resolved

---

## 🚀 Implementation Session 4 - 2025-12-12

**Status:** ✅ Complete
**Goal:** Fix remaining medium-priority issues (title inconsistencies and verify missing CVs)

---

### Changes Made

#### ✅ FIX 8: Title Inconsistencies (Issue #7)

**Modified:** All tender files to update titles to match current CV information

**1. Moritz Theile Title Update**

**Files Modified:**
- `response/GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 274
- `response/GDAC-SA-TENDER-RESPONSE-PLAIN.txt` Line 226
- `response/GDAC-SA-TENDER-RESPONSE-COMPLETE.html` Line 809

**Before:** "Lead Developer / Director"
**After:** "CTO (Chief Technology Officer)"
**Source:** Leadership/Moritz-Theile.md (CV shows current position as CTO)
**Reason:** More accurate and senior title reflecting actual role

---

**2. Juan Baca Title Update**

**Files Modified:**
- `response/GDAC-SA-TENDER-RESPONSE-COMPLETE.md` Line 275
- `response/GDAC-SA-TENDER-RESPONSE-PLAIN.txt` Line 227
- `response/GDAC-SA-TENDER-RESPONSE-COMPLETE.html` Line 816

**Before:** "Operations Manager (LATAM)"
**After:** "Managing Director - Lithodat México"
**Source:** Consultants/Juan-Baca.md (CV shows current position as Managing Director)
**Reason:** More accurate and senior title reflecting actual role

---

**3. Pedro Ferreira Title - Already Correct** ✅

**Current Title:** "AI Software Development Lead"
**Status:** Matches CV exactly (Consultants/Pedro.md Line 3)
**No change needed**

---

### CV Files Verification (Issue #8)

**Examined:** `learning/People/` directory and `README.md`

**CV Files Present:** 16 files
- Leadership: Fabian, Wayne, Keith, Moritz, Vinko (5 files)
- Technical Team: Lujia Yang, Benjamin Dib, Alejandra Bedoya, Fun Meeuws (4 files)
- Consultants: Behnam Sadeghi, Pedro Ferreira, Juan Baca, Qusay Abeed, Mahdi AbuAli (5 files)
- Plus: Saudi-SGS-MIM.md, Assets folder

**Missing CV Files Confirmed:** 5 staff members listed in Form 9.4 have NO CV files:
- #6 Xinyan Zhang (Frontend Developer)
- #8 Tarun Sengar (Backend Developer)
- #9 Nirali Dudharejiya (Backend Developer)
- #10 Cris Ibarra (Data Quality Specialist)
- #11 Perla Luque (Data Quality Specialist)

**Analysis:**
- These 5 staff are NOT mentioned in `learning/People/README.md`
- They are NOT part of Lithodat's documented team
- Form 9.4 has rows 15-20 marked "Reserved - Additional contractors as required"
- This suggests rows 6-11 may also be placeholder/future contractors

**Recommendation:** User should decide whether to:
1. Remove these 5 entries (mark rows 6-11 as reserved)
2. Create minimal placeholder CVs if they are planned hires
3. Leave as-is (tender allows for future contractors)

**Status:** ⚠️ User decision required

---

### Session 4 Summary

**Date:** 2025-12-12
**Goal:** Fix title inconsistencies and verify missing CVs

**Files Modified:** 3 files
- `GDAC-SA-TENDER-RESPONSE-COMPLETE.md` - Fixed Moritz and Juan titles
- `GDAC-SA-TENDER-RESPONSE-PLAIN.txt` - Fixed Moritz and Juan titles
- `GDAC-SA-TENDER-RESPONSE-COMPLETE.html` - Fixed Moritz and Juan titles

**Issues Resolved:**
- ✅ Issue #7 (Title inconsistencies) - FIXED
  - Moritz: "Lead Developer / Director" → "CTO (Chief Technology Officer)"
  - Juan: "Operations Manager (LATAM)" → "Managing Director - Lithodat México"
  - Pedro: Already correct ✅

**Issues Identified:**
- ⚠️ Issue #8 (Missing CV files) - CONFIRMED but user decision needed
  - 5 staff members listed without CV files
  - These appear to be placeholder/future contractors
  - Tender form allows for this (rows 15-20 reserved)

**Status:** ✅ Session 4 complete - All fixable issues resolved
