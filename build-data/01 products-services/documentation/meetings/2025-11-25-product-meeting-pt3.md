# Lithodat Product Meeting - Part 3

**Date:** November 25, 2025
**Duration:** 2 hours
**Attendees:** Keith Dimech, Fabian Kohlmann, Wayne Noble, Vinko Novak, Moritz Theile

---

## Meeting Purpose

Define LithoBuild strategy including project categories, pricing models, assessment criteria, and future development priorities. Also finalize LithoSurfer tier feature boundaries.

---

## Summary

The team established a comprehensive framework for evaluating and pricing LithoBuild projects, including three project categories and multiple assessment criteria. Discussion covered contract types (fixed vs. T&M), IP considerations, data model roadmap, and SSO implementation. Key tensions emerged around environmental business expansion. Meeting concluded with plans for comparison matrices and January conference preparation.

---

## Key Discussion Points

### 1. LithoSurfer Tier Recap
- **Free:** Public/private data upload, personal packages, basic visualizations, single project, search, data export (own data only)
- **Pro:** All Free features + institutional data sharing, advanced analytics on private data, support, team collaboration
- **Enterprise:** All Pro features + multiple siloed projects, custom branding, SSO

### 2. LithoBuild Project Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Category 1** | Outside IT system, standalone, no platform dependency | Extraction tools, environmental projects |
| **Category 2** | On top of LithoSurfer, may add data models | Gallery, Ammyra-like projects |
| **Category 3** | Requires platform changes | Structural changes, API mods, new modules |

### 3. Contract Types

| Type | When to Use | Risk Bearer |
|------|-------------|-------------|
| **Fixed Price** | Standardized systems, clear deliverables | Company |
| **Time & Material** | Custom needs, unclear scope, trusted relationships | Customer |

**Pricing Guidance:**
- Day rate: ~€2,000 for mixed calculation
- Industry standard: 4.5x employee salary
- Senior staff: Higher rate, less time
- Junior staff: Lower rate, full-time involvement

### 4. Project Assessment Criteria

**Must Evaluate:**
1. **IP Risk** - Does client demand IP ownership? (Massive markup if yes)
2. **Data Access** - Does it bring new data? Enable "double dipping"?
3. **New Tools** - Can tools be resold?
4. **Resources** - Distraction risk from core activities?
5. **Ethics** - Alignment with company values?

**Ideal Projects:**
- Deliver same thing to every client with minimal customization
- Bring in data that becomes public
- Build data pipelines
- Enable "double dipping"
- Retain IP with Lithodat

### 5. Red Lines (Do Not Cross)

- No IP transfer for platform-embedded components
- No controversial projects (reputation risk)
- No consulting without providing value
- No unethical/illegal activities
- No projects like "Russian missile silos"

### 6. Revenue & Funding Strategy

**Current State:** LithoBuild = 90% of income, funding other areas

**Target State:** Diversify to subscriptions and licenses

**Decision:** Track profitability on projects (e.g., Ammyra) to inform reinvestment decisions

**Subscription Target:** 4 x $250k subscriptions + AGN = $1.7M annual

### 7. Client Retention Strategies

- Strategic "breadcrumb" data releases (not all at once)
- Bigger drops before contract renewal
- Integrate into client workflows (API connections make switching difficult)
- Offer free custom services (API integration) as reward for subscription
- Constant updates and tool improvements

### 8. Data Models Roadmap

| Model | Status | Priority |
|-------|--------|----------|
| Lu-Hf (Lutium-Hafnium) | Modeled, awaiting implementation | High |
| Rb-Sr (Rubidium-Strontium) | Modeled, awaiting implementation | High |
| Borehole | Needs prioritization (push during Perth visit) | Critical |
| Structural | Contingent on Anglo-American/Earthbite grant | Medium |
| Normal Isotope (Oxygen) | Interest from Rio Tinto | Medium |
| Heavy Mineral | Separate module suggestion | Future |
| Mineralogical | Interest from Rio Tinto (Brent supporting) | Medium |

### 9. SSO Implementation

- **Technology:** Keycloak (open-source, OAuth 2.0)
- **Team:** Tyrone and Nuralia investigating, Vinko to lead
- **Features:** Integrates company auth systems, inherent 2FA
- **Approach:** Start with Google-type integration, address specific clients when secured
- **Note:** Social accounts already set up but deactivated

### 10. Environmental Track Disagreement

**Wayne Noble:** Advocates for environmental/contamination data as growth opportunity
- Company equipped to service this group
- Could be a self-sustaining business with grant funding

**Moritz Theile:** Strongly cautions against
- Would be starting whole new business when current one unfinished
- Not "resource neutral" - takes from core activities
- Goes against past practices

**Status:** No consensus reached; opportunity-dependent

### 11. Category 2 Partnerships

**Value:** External companies building on platform embeds it in new workflows
- External party mistakes don't reflect on Lithodat
- External party pays licenses for data and features
- AI development becoming accessible - external parties can build using API
- Actively pursue and potentially get paid to help partners build

### 12. Data Quality Focus

- Key focus for selling data
- Five-star rating system needs automation
- Review step needed: person signs off on checking sample
- Reference external quality tools/papers for third-party validation
- Consider Barry Cone paper on data quality ranking

---

## Decisions Made

1. **Project Categories:** Three-tier classification system adopted
2. **IP Policy:** Lithodat retains IP for all platform-related work
3. **Assessment Framework:** Five criteria for evaluating build projects
4. **SSO Technology:** Keycloak selected for implementation
5. **Data Models:** Lu-Hf and Rb-Sr ready for implementation; borehole priority
6. **Comparison Matrix:** Keith to create Excel for team review

---

## Action Items

| Action | Owner | Due |
|--------|-------|-----|
| Get current version into production | Wayne Noble | End of week |
| Case study white paper (Sam Boon view of LithoSurfer) | Wayne Noble | Consider |
| Build comparison matrix for LithoSurfer/LithoData | Keith Dimech | TBD |
| Send meeting invite to Keith | Fabian Kohlmann | Tomorrow |
| Build tables in Excel for team comments | Keith Dimech | TBD |
| Comments on visualization requirements | Wayne Noble | TBD |
| Time estimate for Lu-Hf model | Moritz Theile | Next meeting |

---

## Lithodat Europe Clarification

- Legally separate contractor (must be treated as such)
- Functions as "build agent" / quasi-department
- Bills to different Lithodat departments when working for them
- Factored into general budget and spending

---

## License Lapse Handling

| License | When Lapsed |
|---------|-------------|
| **Pro** | Revert to Free after waiting period, data remains, advanced features disabled |
| **Enterprise** | Contract clause applies, possible data download and system shut-off until payment |

---

## Marketing Terminology Discussion

**Challenge:** Data type names (Rubidium-Strontium) complex for non-experts

**Options:**
1. Blanket terms ("thermochronology data")
2. Module names ("mineralization" including multiple data types)
3. Training and explanations
4. Case study white papers
5. Manuals with in-depth explanations

---

## Key Quotes

> "Project business is not a good way of doing business - it creates a lot of noise, is not scalable, and should be avoided long-term" - Moritz Theile

> "The goal is to integrate our services into clients' permanent workflows because this makes it difficult for them to leave" - Fabian Kohlmann

> "If subscription revenue were the main income, we wouldn't need all the current staff" - Wayne Noble

> "AI development is becoming accessible - external parties can spin up functionalities based on our platform using the API" - Moritz Theile

---

## Announcements

- **SAM won three-year DECRA scholarship** - Full funding, project money, hiring budget
- Yana (Brian's partner) also received DECRA scholarship
