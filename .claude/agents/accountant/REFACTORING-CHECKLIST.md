# Lesson 01 Refactoring Checklist

**Date:** 2026-01-11
**Agent:** Dollar Bill (Accountant)
**Lesson:** 01-financial-statement-extraction-methodology.md
**Purpose:** Remove progress tracking to achieve Gate 1 compliance (reusability)

---

## Tasks to Complete

### 1. Remove Progress Tracking Sections

- [ ] **Line 6:** Delete `**Status:** Active - Testing (1/3 tasks completed)`
- [ ] **Lines 575-591:** Delete entire `## Testing This Lesson` section
- [ ] **Lines 597-615:** Delete entire `## Lesson Status` section

### 2. Refactor "Lessons Learned" Insights

Move insights from "Lessons Learned from Task 1" INTO the methodology:

- [ ] Add bank account changes note to **Step 4** (Balance Sheet extraction)
- [ ] Add prior year restatements note to **Step 7** (Multi-Year Summary)
- [ ] Add R&D offset treatment note to **Step 5** (CTR extraction)
- [ ] Add asset acquisitions note to **Step 4** (Balance Sheet extraction)
- [ ] Add DocuSign verification note to **Step 1** (Document Conversion)

### 3. Fix Reference Issues

Choose approach:

**Option A: Commit example outputs**
- [ ] Create `accountant/examples/` folder
- [ ] Add `FY2025-EXTRACTION.md` example
- [ ] Add `INDEX.md` example
- [ ] Update lesson references

**Option B: Clarify references (RECOMMENDED)**
- [ ] Change "See FY2025-EXTRACTION.md" to "Example output: FY2025-EXTRACTION.md"
- [ ] Add note: "These are output file templates, not lesson files"
- [ ] Remove direct file references

### 4. Update Project Core

- [ ] Move "Known Gaps" from lesson to `.claude/agents/accountant.md` "Knowledge Gaps" section
- [ ] Update Active Lessons table to remove "Tasks Tested" column
- [ ] Simplify to: "Status: Active - methodology validated"

### 5. Re-run Audit

After refactoring:
- [ ] Run `~/.claude/scripts/validate-lesson-references.sh` (Gate 2)
- [ ] Verify no progress tracking sections (Gate 1)
- [ ] Confirm lesson is reusable knowledge (not task-specific)

---

## Expected Outcome

**Before Refactoring:**
- Gate 1: ❌ FAIL (progress tracking)
- Gate 2: ❌ FAIL (missing references)
- Gate 3: ✅ PASS
- Gate 4: ✅ PASS
- **Score: 50/100**

**After Refactoring:**
- Gate 1: ✅ PASS (no progress tracking)
- Gate 2: ✅ PASS (references clarified)
- Gate 3: ✅ PASS
- Gate 4: ✅ PASS
- **Score: 100/100**

---

## Notes

- Keep "## Example: Lithodat GDAC Tender Extraction Summary" (it's a case study, not progress tracking)
- Methodology steps should be timeless and reusable
- Focus on WHAT/HOW/WHY/WHEN, not "we did this task" or "next we'll do that task"

---

*Ready to refactor? Run Teacher agent to assist with implementation.*
