# GDAC-SA TENDER - APPENDICES ISSUES TRACKER
**Created:** 2026-01-11
**Status:** Initial Review Complete
**Reviewer:** Claude AI
**Next Steps:** Fix identified issues, stakeholder review

---

## CRITICAL ISSUES (Must Fix Before Submission)

### 🔴 ISSUE #1: Project Summaries Are Identical Files
**Severity:** CRITICAL
**Appendices Affected:** G, H, I
**Problem:** All three files (G-EarthBank, H-Isotopes, I-NRCan) contain the EXACT SAME content - all three projects repeated in each file.

**Current State:**
- G-EarthBank-Project-Summary.md contains: EarthBank + Isotopes + NRCan
- H-Isotopes-au-Project-Summary.md contains: EarthBank + Isotopes + NRCan
- I-NRCan-Project-Summary.md contains: EarthBank + Isotopes + NRCan

**Required State:**
- Appendix G should contain ONLY EarthBank project details
- Appendix H should contain ONLY Isotopes.au project details
- Appendix I should contain ONLY NRCan project details

**Action Required:**
1. Split the content into three separate files
2. Each file should contain only its respective project
3. Update file headers to match individual projects
4. Verify each appendix aligns with index description

**Priority:** P0 - BLOCKING
**Estimated Fix Time:** 15 minutes

---

### 🟡 ISSUE #2: CoreTrustSeal Certificate Number Missing
**Severity:** MEDIUM
**Appendix Affected:** E (QMS Policy)
**Location:** Line 138

**Current Text:**
```
- Certificate Number: *To be inserted*
```

**Required Action:**
- Insert actual CoreTrustSeal certificate number
- If not available, remove the line or state "Available upon request"
- Verify with EarthBank/AuScope team for certificate details

**Priority:** P1 - HIGH (but not blocking if unavailable)
**Estimated Fix Time:** 5 minutes (if number available)
**Alternative:** Change to "Certificate Number: Available upon request"

---

## FORMATTING ISSUES (Should Fix Before Submission)

### 🟢 ISSUE #3: Inconsistent Spacing in Location Field
**Severity:** LOW (Formatting)
**Appendices Affected:** G, H, I
**Location:** Line 14 in each file

**Current Text:**
```
Australia (nationwide)and international
```

**Should Be:**
```
Australia (nationwide) and international
```

**Note:** For Appendix I (NRCan - Canada), this should be:
```
Canada (nationwide) and international
```

**Priority:** P2 - MEDIUM (formatting/professionalism)
**Estimated Fix Time:** 2 minutes

---

### 🟢 ISSUE #4: Inconsistent Currency Formatting
**Severity:** LOW (Formatting)
**Appendices Affected:** H, I
**Locations:**
- Appendix H, Line 84: "400000AUD"
- Appendix I, Line 84: "400000AUD"
- Appendix I, Line 136: "400000 AUD" (correct format)

**Current (Inconsistent):**
- "400000AUD" (no space)
- "400000 AUD" (space)
- "2900000 AUD" (space, in Appendix G)

**Recommended Standard:**
Use "AUD $XXX,XXX" format for consistency with financial documents:
- "AUD $400,000"
- "AUD $2,900,000"

**Alternative (Current Pattern):**
Maintain "XXX AUD" with space:
- "400,000 AUD"
- "2,900,000 AUD"

**Priority:** P2 - MEDIUM (formatting/professionalism)
**Estimated Fix Time:** 5 minutes

---

## CONTENT VERIFICATION NEEDED

### ⚪ ISSUE #5: NRCan Project Location Incorrect
**Severity:** MEDIUM (Content Accuracy)
**Appendix Affected:** I (NRCan)
**Location:** Line 14

**Problem:** NRCan is a Canadian project, but the location says "Australia (nationwide)"

**Current Text:**
```
**2. Project Location:**
Australia (nationwide)and international
```

**Should Be:**
```
**2. Project Location:**
Canada (nationwide) and international
```

**Priority:** P1 - HIGH (factual accuracy)
**Estimated Fix Time:** 1 minute (once files are separated per Issue #1)

---

### ⚪ ISSUE #6: Contract Duration Inconsistency (NRCan)
**Severity:** LOW
**Appendix Affected:** I (NRCan)
**Locations:** Lines 138-139 vs Line 145

**Current Text:**
- Line 138: "2021 – 2023 (ongoing)"
- Line 145: "March 2023" (Delivery/Completion Date)

**Problem:** If project was delivered in March 2023, it shouldn't say "ongoing"

**Should Be:**
```
**6. Contract Duration:**
2021 – 2023 (completed)
```

OR (if still ongoing):
```
**8. Delivery / Completion Date:**
Expected completion: 2025
```

**Priority:** P2 - MEDIUM (clarity)
**Estimated Fix Time:** 2 minutes
**Action:** Verify actual project status with team

---

## RECOMMENDATIONS FOR IMPROVEMENT

### 📋 SUGGESTION #1: Add Project URLs
**Appendices:** G, H, I

**Recommendation:** Include public URLs for project platforms where available:
- EarthBank: https://earthbank.net.au (or similar)
- Isotopes.au: [URL if available]
- NRCan: [URL if available]

**Benefit:** Allows reviewers to verify projects independently

**Priority:** P3 - NICE TO HAVE
**Estimated Add Time:** 5 minutes

---

### 📋 SUGGESTION #2: Add Visual Elements
**Appendices:** G, H, I

**Recommendation:** Consider adding:
- Platform screenshots (1-2 per project)
- Architecture diagrams
- Data flow diagrams

**Benefit:** Makes technical capabilities more tangible to reviewers

**Priority:** P3 - NICE TO HAVE
**Estimated Add Time:** 30 minutes

---

### 📋 SUGGESTION #3: Standardize Project Summary Format
**Appendices:** G, H, I

**Current:** Each project has 11 fields but inconsistent emphasis
**Recommendation:** Create template with consistent structure:

```markdown
# PROJECT X – [Project Name]
## [Subtitle]

**Quick Facts:**
- Client: [Name]
- Value: AUD $XXX,XXX
- Duration: YYYY-YYYY
- Status: [Ongoing/Completed]
- Location: [Country]

**Project Description:**
[3-4 paragraphs]

**Key Achievements:**
- [Bullet points]

**Technical Capabilities Demonstrated:**
- [Bullet points]

**Client Reference:**
[Contact details]
```

**Priority:** P3 - NICE TO HAVE
**Estimated Time:** 20 minutes

---

## QUALITY ASSURANCE CHECKS

### ✅ Documents With No Issues Found:
- Appendix E: QMS Policy (except certificate number)
- Appendix F: HSE Policy (clean)
- Appendix K: Publications Summary (clean)
- Appendix L: Elsevier Book Reference (clean)
- Appendix M: Organizational Chart (clean)

### ⚠️ Documents Not Yet Reviewed:
- Appendix A: ASIC Extract (PDF) - No review needed (official document)
- Appendix B, C, D: Financial Statements (PDF) - No review needed (official documents)
- Appendix J: Combined CVs - **PENDING REVIEW** (see separate CV review task)

---

## PRIORITY SUMMARY

| Priority | Count | Description | Must Fix? |
|----------|-------|-------------|-----------|
| **P0** | 1 | Critical - Blocking issues | ✅ YES |
| **P1** | 2 | High - Content accuracy | ✅ YES |
| **P2** | 3 | Medium - Formatting/clarity | ⚠️ RECOMMENDED |
| **P3** | 3 | Low - Nice to have | ❌ OPTIONAL |

---

## ESTIMATED TIME TO FIX ALL ISSUES

| Category | Time Estimate |
|----------|---------------|
| Critical Issues (P0) | 15 minutes |
| High Priority (P1) | 6 minutes |
| Medium Priority (P2) | 9 minutes |
| **Total (P0-P2)** | **30 minutes** |
| Optional Improvements (P3) | 55 minutes |
| **Grand Total (All)** | **~1.5 hours** |

---

## ACTION PLAN

### Phase 1: Critical Fixes (15 min) - DO IMMEDIATELY
1. ✅ Split project summaries (G, H, I) into individual files
2. ✅ Update headers for each project
3. ✅ Verify content matches index descriptions

### Phase 2: High Priority (6 min) - DO BEFORE SUBMISSION
1. ✅ Fix NRCan location (Canada, not Australia)
2. ✅ Fix/verify CoreTrustSeal certificate number or add note

### Phase 3: Medium Priority (9 min) - RECOMMENDED
1. ✅ Fix spacing: "(nationwide)and" → "(nationwide) and"
2. ✅ Standardize currency formatting
3. ✅ Clarify NRCan contract duration (ongoing vs completed)

### Phase 4: Optional Improvements (55 min) - NICE TO HAVE
1. ⬜ Add project URLs
2. ⬜ Add screenshots/diagrams
3. ⬜ Standardize project summary format

---

## STAKEHOLDER REVIEW ASSIGNMENT

Once fixes are complete, assign for review:

| Appendix | Primary Reviewer | Secondary Reviewer | Topic |
|----------|------------------|-------------------|-------|
| E (QMS) | Fabian Kohlmann | Wayne Noble | Quality standards |
| F (HSE) | Fabian Kohlmann | Keith Dimech | Safety policies |
| G (EarthBank) | Fabian Kohlmann | Brent McInnes | Project accuracy |
| H (Isotopes) | Fabian Kohlmann | Nina Welti | Project accuracy |
| I (NRCan) | Fabian Kohlmann | Jeremy Powell | Project accuracy |
| K (Publications) | Behnam Sadeghi | - | Publication list |
| L (Book) | Behnam Sadeghi | - | Book details |
| M (Org Chart) | Keith Dimech | Wayne Noble | Team structure |

---

## NEXT STEPS

1. **Immediate:** Fix Issue #1 (split project files) - BLOCKING
2. **Before submission:** Fix Issues #2-#5 (P0-P1)
3. **Recommended:** Fix Issues #3-#4 (P2)
4. **Optional:** Implement suggestions #1-#3 (P3)
5. **Final:** Stakeholder review and sign-off

---

**Document Owner:** Keith Dimech (COO)
**Last Updated:** 2026-01-11
**Status:** Ready for fixing phase

---

*End of Issues Tracker*
