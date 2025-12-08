# IDEA-000: GDAC Tender Forms 2nd Stage Review - Offline Sync and Wayne Comments

**Created:** 2025-12-02
**Priority:** P1 (High)
**Status:** 💡 Idea
**Estimated Effort:** 4-6 hours

---

## Problem Statement

The GDAC-SA tender forms (9.1-9.6) in the live system (`src/content/tender-forms/`) need updating based on:
1. **Offline reference documents** in `build-data/06 gdac-tender/response/offline/` that contain more accurate/complete information
2. **Wayne and Fabian's review comments** stored in the database (31 PENDING/ADDRESSED comments)

---

## Research Findings

### A. Offline Documents Available

| File | Maps To | Key Content |
|------|---------|-------------|
| `1CompInfo.md` | Form 9.1 | Company info, shareholdings, contact details |
| `2TechnicalCap.md` | Form 9.2 Section B | 6 major projects, 7 years experience, Science Advances publication |
| `3QAPolicies.md` | Form 9.2 Section C | CoreTrustSeal CERTIFIED (not "to be obtained"), AWS certifications |
| `4HSEpolicy.md` | Form 9.2 Section D | AWS ISO 14001/45001, HSE training programs |
| `5ExistObligations.md` | Form 9.2 Section E | $3.6M total contracts, LithoSurfer explanation, 50-60% capacity |
| `6HR.md` | Form 9.2 Section F | Saudization plan, hiring targets, KAUST/KSU/KFUPM partnerships |
| `9Threesimilar projects.md` | Form 9.5 | Contact emails for Brent, Nina, Jeremy |
| `10LithodatCompanyOverview.md` | General | Mission/Vision, BHP/AngloAmerican clients, conference list |

### B. Database Review Comments (31 PENDING/ADDRESSED)

#### FORM-9.1 Comments:
| Section | Reviewer | Issue |
|---------|----------|-------|
| A.1 | Fabian | Add Isotopes.au and LithoSpace to trading names |
| B.1 | Fabian | Capital is 1000 AUD NOT 100 |
| B.2 | Fabian | Assets should include IT equipment, not just retained earnings |
| C.2 | Wayne | Add Sam's Thermochronology paper |
| C.2 | Fabian | Add AI/ML ready data, exploration datasets, Tier 1 mining clients, international experience. Use offline md files. |

#### FORM-9.2 Comments:
| Section | Reviewer | Issue |
|---------|----------|-------|
| B.1 | Wayne | Clarify years of experience (from 2018 or director experience?) |
| B.4 | Wayne | Get references from Brent and/or Nina |
| B.6 | Wayne | Pedro experience is 10-15 years, NOT 25+ (he's ~30 years old) |
| F.7 | Wayne | Share % corrected (ADDRESSED) |

#### FORM-9.3 Comments:
| Section | Reviewer | Issue |
|---------|----------|-------|
| A.2 | Wayne | Percentages wrong; Moritz listed as Director but Wayne not - be consistent |
| C.1 | Wayne | Percentages incorrect |
| C.2 | Wayne | Wayne's address wrong - has PO Box not physical address; "Agile transformations" → "Agile Software development and coaching" |
| C.5 | Wayne | "Value for GDAC-SA" not listed for others - consistency |
| F.2 | Wayne | Pedro also fluent in Spanish |
| F.3 | Wayne | Behnam's Fulbright unclear; Europe via Ireland; South America via Pedro and Mx team |

#### FORM-9.4 Comments:
| Section | Reviewer | Issue |
|---------|----------|-------|
| B.1 | Wayne | Pedro's full name: "Pedro Henrique Candido Ferreira"; experience 10-15 years |
| B.2.1 | Wayne | Share holdings wrong; Moritz missing |
| C.4 | Wayne | Add thermochronology PhD studies |
| D.1 | Wayne | Pedro name and experience update |
| E.1 | Wayne | Add Sam Boone, Brandon Mahan (Melb Uni), Gail Iles (RMIT); recent publications |
| F.1 | Wayne | Pedro name; remove Moritz years of experience (not listed for others) |
| G.1-G.3 | Wayne | Pedro name throughout |
| G.2 | Wayne | Wayne's FTE numbers too high |

#### FORM-9.5 Comments:
| Section | Reviewer | Issue |
|---------|----------|-------|
| 1-key-achievements | Wayne | Add Sam's paper |
| 1.5 | Wayne | Brent: directorjdlc@curtin.edu.au; Bryant: bryant.ware@curtin.edu.au, 0477528459 |
| 2-alternative | Wayne | Geoff Fraser (GA), Steph Hawkins, Kathryn Waltenberg |
| 2.4 | Wayne | Isotopes.au is complete (lights on only), not "Full operation" |
| 2.5 | Wayne | Lian Flick: Lian.Flick@data61.csiro.au, +61 408 891 755; Nina Welti: Nina.Welti@csiro.au |
| 3-remaining | Wayne | Brandon Mahan (Melb Uni), Gail Iles (RMIT) contact details |

#### FORM-9.6 Comments:
| Section | Reviewer | Issue |
|---------|----------|-------|
| E.2 | Wayne | LithoSpace was self-funded for community benefit - note more strongly |

---

## Changes Required - Summary

### HIGH PRIORITY (Factual Corrections):

| Form | Field | Current | Should Be |
|------|-------|---------|-----------|
| 9.1 B.1 | Capital | $100 | **$1,000** |
| 9.1 A.1 | Trading Names | EarthBank only | **Add Isotopes.au, LithoSpace** |
| 9.2 C | CoreTrustSeal | "to be obtained" | **CERTIFIED (since 2023)** |
| 9.4/9.5 | Pedro name | Various | **Pedro Henrique Candido Ferreira** |
| 9.4/9.5 | Pedro experience | 25+ years | **10-15 years** |
| 9.5 | Contact emails | Placeholders | **Fill from Wayne's comments** |

### MEDIUM PRIORITY (Missing Content):

| Form | Content to Add |
|------|----------------|
| 9.1 C.2 | AI/ML ready data, Tier 1 mining clients (BHP, AngloAmerican), international experience |
| 9.1 C.2 | Sam's Thermochronology paper, Science Advances publication |
| 9.2 | Saudization plan with targets (20-30% year 1, 40-50% phases 2-4) |
| 9.2 | LithoSurfer platform explanation, 50-60% capacity available |
| 9.3 F.2 | Pedro also fluent in Spanish |
| 9.4 E.1 | Sam Boone, Brandon Mahan (Melb Uni), Gail Iles (RMIT) |
| 9.6 E.2 | LithoSpace self-funded for community benefit |

### LOW PRIORITY (Consistency/Format):

| Form | Issue |
|------|-------|
| 9.3 A.2 | Moritz as Director - add Wayne too or remove both |
| 9.3 C.5 | "Value for GDAC-SA" consistency across all staff |
| 9.4 F.1 | Remove Moritz years of experience (not on others) |
| 9.3 C.2 | Wayne address - use PO Box or remove |

---

## Implementation Options

### Option A: Manual Updates (Recommended)
- **Effort:** 4-6 hours
- **Approach:** Update each form systematically, section by section
- **Pros:** Full control, can verify each change
- **Cons:** Time-consuming

### Option B: Batch Script
- **Effort:** 2-3 hours + testing
- **Approach:** Create sed/awk scripts to make bulk replacements
- **Pros:** Faster for repetitive changes
- **Cons:** Risk of errors, harder to verify

### Option C: Staged Updates
- **Effort:** 6-8 hours total (2-3 sessions)
- **Approach:** Update one form per session, get review between
- **Pros:** Allows incremental review
- **Cons:** Longer total time

---

## Affected Files

### Primary (to be modified):
1. `src/content/tender-forms/FORM-9.1-APPLICANT-INFORMATION.md`
2. `src/content/tender-forms/FORM-9.2-TECHNICAL-ADMINISTRATIVE-CAPABILITIES.md`
3. `src/content/tender-forms/FORM-9.3-ADMINISTRATIVE-STAFF-EXPERIENCE.md`
4. `src/content/tender-forms/FORM-9.4-PROFESSIONAL-STAFF-EXPERIENCE.md`
5. `src/content/tender-forms/FORM-9.5-SIMILAR-PROJECTS.md`
6. `src/content/tender-forms/FORM-9.6-FINANCIAL-CAPACITY-CRITERIA.md`

### Reference (read-only):
- `build-data/06 gdac-tender/response/offline/*.md` (8 files)
- Database: `TenderReviewComment` table (31 comments)

---

## Database Comments to Mark as RESOLVED

After implementation, mark these comments as RESOLVED:
- All 31 PENDING/ADDRESSED comments in `TenderReviewComment` table

SQL to run after completion:
```sql
UPDATE "TenderReviewComment"
SET status = 'RESOLVED'
WHERE status IN ('PENDING', 'ADDRESSED');
```

---

## Success Criteria

1. All capital values show $1,000 (not $100)
2. CoreTrustSeal shows "Certified" (not "to be obtained")
3. Pedro's name and experience updated throughout
4. All contact emails filled in (no placeholders)
5. AI/ML ready data and Tier 1 clients mentioned in 9.1
6. Saudization plan included in 9.2
7. All 31 database comments addressed and marked RESOLVED

---

## Next Steps

Use `/idea-mode` to start implementation with full audit trail.
