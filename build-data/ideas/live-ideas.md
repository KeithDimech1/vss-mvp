# Live Ideas Log

**Purpose:** Track feature ideas, enhancements, and future improvements

**Status:**
- 💡 **Idea:** New concept to explore
- 🚀 **Active:** Currently implementing
- ✅ **Completed:** Implemented (move to implemented-ideas.md)
- ❌ **Rejected:** Not pursuing

**Priority:**
- **P0:** Critical - implement immediately
- **P1:** High - next sprint
- **P2:** Medium - future sprint
- **P3:** Low - nice to have

---

## 📋 Quick Summary

| ID | Title | Priority | Status | Date |
|----|-------|----------|--------|------|
| [IDEA-005](idea-details.md#idea-005) | ESRI Partnership for GDAC-SA Tender - LithoSurfer Migration from Mapbox to ArcGIS | P0 | 💡 idea | 2025-12-30 |
| [IDEA-004](idea-details.md#idea-004) | Global Australian Legal AI Agents (Sovereign AI + Open Legal Corpus) | P1 | idea | 2025-12-17 |
| [IDEA-003](idea-details.md#idea-003) | GDAC Tender Forms 9.1-9.6 Systematic Audit & Consistency Checker | P1 | 🚀 active | 2025-12-09 |
| IDEA-002 | Lithodat HSE Policy & Procedures (ISO-Aligned for GDAC Tender) | P1 | ✅ implemented | 2025-12-09 |
| [IDEA-001](idea-details.md#idea-001) | Dext & Xero Documentation Knowledge Base for Kristy | P1 | idea | 2025-12-08 |
| IDEA-001 | ISO 9001-Based Geology Data Quality Management System | P1 | idea | 2025-12-02 |
| IDEA-000 | GDAC Tender Forms 2nd Stage Review - Offline Sync and Wayne Comments | P1 | idea | 2025-12-02 |

---

## 💡 Ideas

<!-- Ideas will be added below -->

### IDEA-002: Lithodat HSE Policy & Procedures (ISO-Aligned for GDAC Tender) ✅

**Priority:** P1 (High - Required for GDAC Saudi tender, worth 10% of technical evaluation)
**Status:** ✅ implemented
**Date:** 2025-12-09
**Completed:** 2025-12-09

**Summary:** ISO Document Builder form implemented to progressively build ISO-aligned HSE Policy & Procedures documents. The form guides managers through 10 sections with auto-save functionality.

**Implementation:**
- Form URL: `/iso-documents`
- Access: Managers only
- Template: HSE Policy (10 sections, 47 questions)
- Features: Auto-save, progress tracking, review/approval workflow

**Files Created:**
- `src/lib/iso-documents/` - Types, templates, and exports
- `src/app/api/iso-documents/` - API routes
- `src/app/(dashboard)/iso-documents/` - Frontend pages
- Database models: `IsoDocument`, `IsoDocumentSection`

**Next Steps:**
- Use the form at `/iso-documents` to create HSE Policy
- Future: Add Quality Policy template (ISO 9001)
- Future: Add IMS Manual template (integrated ISO 9001+14001+45001)

**Debug Log:** `build-data/ideas/debug/IDEA-002-lithodat-hse-policy-iso-aligned.md`

---

### IDEA-001: ISO 9001-Based Geology Data Quality Management System

**Priority:** P1 (High - Required for GDAC Saudi tender, worth 10% of technical evaluation)
**Status:** 💡 idea
**Date:** 2025-12-02

**Summary:** Develop an ISO 9001-aligned Quality Management System (QMS) for geological data services, with geologists as primary data quality reviewers through structured peer review.

**Key Points:**
- Satisfies GDAC-SA RFQ "Quality Assurance" requirement (10% of technical evaluation)
- Geologist-centered peer review model (based on JORC Competent Person principles)
- Focus on data model accuracy and geological data validation
- Recommended approach: ISO 9001-aligned documentation + operational key processes

**Effort Estimate:** 1-2 weeks (Option 3: Documentation + Key Processes)

**Implementation Phases:**
1. Core Documentation (3 days) - Quality Policy, Objectives, Structure
2. Peer Review Process (2 days) - SOPs, Checklists, Competence Register
3. Operational Setup (2 days) - Populate register, pilot review, evidence package

**Deliverables:**
- Quality Policy document (CEO-signed)
- Quality Manual (ISO 9001 aligned)
- Peer Review SOP
- Data Validation Checklists
- Competence Register (geologist qualifications)
- Quality Metrics Dashboard

[Full details in debug log]

**Quick Actions:**
- View: `cat build-data/ideas/debug/IDEA-000-iso-9001-based-geology-data-quality-management-system.md`
- Implement: `/idea-mode` and select IDEA-001
- Mark completed: `/idea-complete IDEA-001`

---

### IDEA-000: GDAC Tender Forms 2nd Stage Review - Offline Sync and Wayne Comments

**Priority:** P1 | **Status:** 💡 idea | **Date:** 2025-12-02

[Detailed description - edit in `/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/ideas/debug/IDEA-000-gdac-tender-forms-2nd-stage-review-offline-sync-and-wayne-comments.md`]

**Quick Actions:**
- View: `cat build-data/ideas/debug/IDEA-000-gdac-tender-forms-2nd-stage-review-offline-sync-and-wayne-comments.md`
- Implement: `/idea-mode` and select IDEA-000
- Mark completed: `/idea-complete IDEA-000`

---

