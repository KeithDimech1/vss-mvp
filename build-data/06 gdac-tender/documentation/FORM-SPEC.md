# FORM-002: GDAC-SA Tender Tracker

## Overview

A comprehensive tender application tracker for the Saudi Geological Survey GDAC-SA Advanced Analytics Platform RFQ (Reference #251140007625).

## Tender Details

| Field | Value |
|-------|-------|
| Reference | RFQ #251140007625 |
| Client | Saudi Geological Survey (SGS) |
| Project | GDAC-SA Advanced Analytics Platform |
| Deadline | 24 December 2025 (UTC+3) |
| Submission Platform | Etimad (portal.etimad.sa) |

## Access Control

- **Requires Manager Role**: Yes
- Access granted to users with `isManager: true` OR `role: ADMIN`

## Features

1. **Live Countdown Timer**
   - Real-time countdown to deadline
   - Color coding: Green (>14 days), Yellow (7-14 days), Red (<7 days), Flashing Red (<24 hours)

2. **Phase Indicator**
   - Week 1 (26 Nov - 2 Dec): Strategy & Registration
   - Week 2 (3 Dec - 9 Dec): Document Collection
   - Week 3 (10 Dec - 16 Dec): Form Completion
   - Week 4 (17 Dec - 23 Dec): QA & Submission

3. **Progress Tracking**
   - Overall completion percentage
   - Section-by-section progress bars
   - Clickable sections to navigate

4. **Auto-save**
   - All field changes saved immediately
   - Visual indicator when saving

## Sections (8 Total)

### 1. Overview
- Tender information display
- Section progress summary
- Key contacts (SGS, Etimad)

### 2. Strategy (Week 1)
- Application structure (Solo/Consortium)
- Consortium partners (conditional)
- Saudi entity status
- Etimad registration status
- Go/No-Go decision
- Rationale documentation

### 3. Legal Documents (Week 2)
- Commercial Registration Certificate
- Zakat and Income Certificate
- VAT Certificate (optional)
- Social Insurance Certificate
- Chamber of Commerce Certificate
- Investment License (foreign bidders)
- Saudization Certificate (Taqat)
- Quality Certificate (ISO 9001)
- HSE Certificate
- Alliance Agreement (if consortium)

### 4. Financial Documents (Week 2)
- Financial Statements (3 years)
- Cash Ratio calculation
- Current Ratio calculation
- Quick Ratio calculation

### 5. Application Forms (Week 3)
- Applicant Information Form
- Technical & Administrative Capabilities Form
- Administrative Staff Experience (10 people)
- Professional Staff Experience (20 people)
- Similar Projects Forms (3 projects)
- Financial Capacity Criteria Form

### 6. Quality Assurance (Week 4)
- Certificate validity checks
- Document sealing verification
- PDF searchability check
- Form completion check
- Consistency verification
- Management review
- Legal review
- Finance review

### 7. Submission (Week 4)
- Package compilation status
- Etimad test upload
- Final submission status
- Confirmation reference
- Submission timestamp
- Screenshot confirmation

### 8. Contacts & Notes
- SGS Technical contact notes
- Etimad Support contact notes
- Internal notes & issues
- Lessons learned

## Database Model

Located in `prisma/schema.prisma` as `GdacTenderTracker`.

Key fields include:
- Strategic decisions (applicationStructure, saudiEntityStatus, goNoGoDecision)
- Document statuses (10 legal documents, 3 financial years, 8 forms)
- QA checks (6 quality checks, 3 internal reviews)
- Submission tracking (status, reference, timestamp)
- Notes (4 text areas)

## Files

| Type | Path |
|------|------|
| Page | `src/app/(dashboard)/gdac-tender/page.tsx` |
| API | `src/app/api/gdac-tender/route.ts` |
| Schema | `prisma/schema.prisma` (GdacTenderTracker model) |
| Registry | `build-data/FORM-REGISTRY.json` |
| Documentation | `build-data/06 gdac-tender/documentation/FORM-SPEC.md` |

## API Endpoints

### GET /api/gdac-tender
- Returns tracker data (creates new record if none exists)
- Requires manager authentication

### PUT /api/gdac-tender
- Updates tracker fields
- Body: `{ id: string, [field]: value }`
- Requires manager authentication

## Key Contacts

### SGS Technical
- Dr. Wadee Kashghari
- Email: TI-RGP@sgs.gov.sa
- Phone: +966-2 6195000 ext. 5222

### Etimad Support (24/7)
- Local: 19990
- International: +966-11-515-2666
- Email: ecare@etimad.sa
- Twitter/X: @etimadsa

## Source Documents

- `/Tenders/Saudi/extracted/APPLICATION-CHECKLIST.md`
- `/Tenders/Saudi/extracted/APPLICATION-PROGRAM.md`
- `/Tenders/Saudi/extracted/ETIMAD-GUIDE.md`
- `/Tenders/Saudi/extracted/VSS-FORM-PROMPT.md`

## Deployment

1. Run Prisma migration: `npx prisma migrate dev --name add-gdac-tender-tracker`
2. Generate Prisma client: `npx prisma generate`
3. Restart development server

---

*Created: 2025-11-26*
*Form ID: FORM-002*
