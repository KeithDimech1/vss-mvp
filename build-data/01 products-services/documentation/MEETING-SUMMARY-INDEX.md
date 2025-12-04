# Lithodat Product Strategy Meetings - Comprehensive Index

**Date Range:** November 7 - November 25, 2025
**Participants:** Keith Dimech, Fabian Kohlmann, Wayne Noble, Vinko Novak, Moritz Theile
**Status:** Strategic Planning Complete - Ready for Implementation
**Last Updated:** December 5, 2025

---

## Executive Summary

Over four strategic meetings, the Lithodat leadership team established a comprehensive product strategy across three business lines: LithoSurfer (software platform), LithoData (data marketplace), and LithoBuild (consulting/development services). Key outcomes include:

1. **Three-tier licensing model** for LithoSurfer (Free, Pro, Enterprise)
2. **Data marketplace framework** with quality controls and commission structures
3. **Build project classification system** (Categories 1-3) with risk assessment criteria
4. **Target launch date:** March 2025 for full commercial offering
5. **January 2025:** Conference showcase and marketing materials ready

---

## Meeting Chronology

### Meeting 1: Lithosurfer Insights (Nov 7, 2025)
**Focus:** Vision alignment and strategic direction

### Meeting 2: Product Meeting Part 1 (Nov 12, 2025)
**Focus:** LithoSurfer tier structure and features

### Meeting 3: Product Meeting Part 2 (Nov 17, 2025)
**Focus:** LithoData marketplace and commercial data

### Meeting 4: Product Meeting Part 3 (Nov 25, 2025)
**Focus:** LithoBuild strategy and project criteria

---

## I. STRATEGIC CONSENSUS DECISIONS

### 1. Company Vision (Reaffirmed)

> "International leading marketplace to buy and sell geological sample-based data"

**Key Agreement:** All business activities (LithoSurfer, LithoData, LithoBuild) must support this core vision. Build projects are "bootstrapping" mechanisms to fund the marketplace, not the end goal.

### 2. Three Business Lines Structure

| Business Line | Manager | Role | Revenue Model |
|--------------|---------|------|---------------|
| **LithoSurfer** | Wayne Noble | Customer platform & tools | Subscription (Free/Pro/Enterprise) |
| **LithoData** | Fabian Kohlmann | Data asset & marketplace | Subscription + Commission |
| **LithoBuild** | Moritz Theile | Contract work & consulting | Project-based (Fixed/T&M) |

### 3. Revenue Strategy

**Current State:** LithoBuild generates ~90% of income, funding other areas

**Target State:** Diversify to data subscriptions and Pro licenses

**Rationale:** Project business is "not scalable" and creates operational noise; license revenue simplifies operations

---

## II. LITHOSURFER DECISIONS

### Tier Structure (Consensus Reached)

#### FREE Tier
**Target:** Students, researchers, hobbyists

| Feature | Status |
|---------|--------|
| Access to AGN/EarthBank public data | Included |
| All toolbar tools (left side) | Included |
| Paleo Reconstruction (one & all) | Included |
| Grid Data, Swath Profile, Select Area | Included |
| Geochemistry, LithoChem Dashboard | Included |
| Thermochron tools | Included |
| Personal packages (private, non-shareable) | Included |
| Data export (own data only) | Included |
| Team collaboration | NOT Included |
| Advanced analytics on private data | NOT Included |
| Multiple projects | NOT Included |
| Support | NOT Included |

**Important Constraint:** Private data uploaded on Free tier remains private to creator only. Cannot be shared. Data may become public after 2-4 years (similar to EarthBank clause).

#### PRO Tier
**Target:** Junior/mid-tier exploration companies, professionals
**Price Range:** $2,500 - $5,000/year (per institution)

| Feature | Status |
|---------|--------|
| All FREE features | Included |
| Institutional data sharing | Included |
| Upload unlimited private data | Included |
| Team collaboration (same institution) | Included |
| Share data with any Lithu login holder | Included |
| Advanced analytics on private data | Included |
| Support package | Included |
| Onboarding workshop | Included |
| API documentation & dev support | Included |
| Service Level Agreement (SLA) | Included |
| DOI minting (credit-based) | Included |
| Specialized exports (Leapfrog, geochiffs, etc.) | Included |
| Geoserver for custom WMS layers | Included |
| Multiple siloed projects | NOT Included |
| Custom branding/portal | NOT Included |
| SSO | NOT Included |

**License Model:** Per-institution, all users in institution share data. Multiple users require multiple license seats.

#### ENTERPRISE Tier
**Target:** Major mining companies (BHP, Rio Tinto, Anglo-American)
**Price:** $10,000+/year (custom contracts)

| Feature | Status |
|---------|--------|
| All PRO features | Included |
| Multiple siloed projects/departments | Included |
| Multi-institution/community support | Included |
| Custom branded portal (own URL) | Included |
| LithoClean data cleaning services | Included |
| CSV template ingestion | Included |
| Single Sign-On (SSO) | Included |
| Adapters to existing systems (Acquire, Geobank) | Optional Add-on |
| Dedicated customer relationship manager | Included |

**Key Differentiator:** Ability to have completely separate projects (mines, JVs) that cannot share data without explicit permission.

### Technical Implementation Notes

1. **License switching:** Pro license assigned to institution instantly upgrades all users
2. **Timed licenses:** Technically possible (date field exists)
3. **Lapsed licenses:** Revert to Free, data remains but advanced features disabled
4. **SSO:** Investigating Keycloak (OAuth 2.0); Tyrone and Nuralia assigned

### Outstanding PRO/Enterprise Decisions

- [ ] Final pricing determination ($1,000-$10,000 range not aligned)
- [ ] Define exact "advanced analytics" features
- [ ] Consultant access to Pro packages (external team members)
- [ ] Automation of license purchase (Stripe integration - future)

---

## III. LITHODATA DECISIONS

### Data Type Classification

| Type | Description | Visibility |
|------|-------------|------------|
| **Free/Public** | EarthBank/AGN data | Everyone |
| **Proprietary** | Lithodat's commercial data | Subscribers only |
| **Marketplace** | Third-party data for sale | Purchasers |
| **Private** | Customer's uploaded data | Creator + team |
| **Institutional** | Shared within organization | Organization members |

### Commercial Data Model

#### Lithodat Subscriptions (Proprietary Data)
- Sold by **region** and **data type**
- Annual subscription model preferred
- Pricing per contract (global option is ideal sale)
- Data continues growing (new data released strategically)

**Retention Strategy:** Strategic "breadcrumb" data releases, not all at once. Bigger drops before contract renewal.

#### Marketplace (Third-Party Data)
- Package-based sales (cannot select individual points)
- Options: Subscription OR one-off purchase
- One-off significantly more expensive to encourage subscription
- **Commission Structure:** Higher commission if Lithodat performs data cleaning

### Quality Control Requirements

**Seller Verification:**
- Rigorous approval process for sellers AND packages
- Verified institutions/companies only
- Require proof of authenticity (lab reports, published papers)

**Data Standards:**
- All marketplace data must have IGSN
- QC workflow required before any data goes public
- Five-star rating system (needs automation)
- Optional: LithoClean service (quoted per project)

### Security & Legal Requirements

**Critical for Enterprise:**
- ISO certification consideration
- Comprehensive legal agreements for data liability
- Hacking/breach clauses
- Audit trails for public/private data switches
- Data provided "as is" - no responsibility for third-party claims

**Warning:** Hosting multi-million dollar datasets makes system a "honeypot" - security hardening required.

### Data Gallery

- Separate portal from LithoSurfer
- Accessible without login (view what's available)
- Login required for purchases
- SSO between LithoSurfer and Gallery essential
- Quote generation first, automation (Stripe) after ~100 quotes

### Pricing Controls

- Lithodat has final say on marketplace pricing
- No approval for prices that undercut subscription services
- Clear commission percentage communicated to sellers

---

## IV. LITHOBUILD DECISIONS

### Project Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Category 1** | Outside IT system, standalone | Extraction tools, environmental projects |
| **Category 2** | On top of LithoSurfer | Gallery, Ammyra-like projects, new data models |
| **Category 3** | Platform changes | Structural changes, API modifications, new modules |

### Contract Types

| Type | When to Use | Risk |
|------|-------------|------|
| **Fixed Price** | Standardized systems, clear deliverables | Company bears all risk |
| **Time & Material** | Custom needs, unclear scope | Customer bears risk |

**Recommendation:** Fixed price for known deliverables with clear variation clauses; T&M for trusted relationships.

### Project Assessment Criteria

**Must Evaluate:**
1. **IP Risk** - Does client demand IP ownership? Massive markup if yes.
2. **Data Access** - Does it bring in new data? Enable "double dipping"?
3. **New Tools** - Can tools be resold to other clients?
4. **Resources** - Distraction risk from core activities?
5. **Ethics** - Alignment with company values?

**Red Lines:**
- No IP transfer for platform-embedded components
- No controversial projects (reputation risk)
- No consulting without providing value
- No unethical/illegal activities

### Ideal Project Characteristics

- Delivers same thing to every client with minimal customization
- Brings in data that becomes public
- Builds data pipelines
- Enables "double dipping"
- Retains IP with Lithodat

### Strategic Opportunities Identified

1. **Lab Connections** - Direct data pipelines from lab machines
2. **Government Portals** - Integration with geology portals (easy Category 2)
3. **Data Models** - New schemas for additional data types
4. **Category 2 Partnerships** - External companies building on platform

### Data Models Roadmap

| Model | Status | Priority |
|-------|--------|----------|
| Lu-Hf (Lutium-Hafnium) | Modeled, awaiting implementation | High |
| Rb-Sr (Rubidium-Strontium) | Modeled, awaiting implementation | High |
| Borehole | Needs prioritization | Critical |
| Structural | Contingent on Anglo-American grant | Medium |
| Normal Isotope (Oxygen) | Interest from Rio Tinto | Medium |
| Heavy Mineral | Wayne's suggestion for separate module | Future |
| Environmental | Requires new business (Category 1) | Deferred |

### Pricing Guidelines

- **Day Rate:** ~$2,000 for mixed calculation
- **Industry Standard:** 4.5x employee salary (often overpays)
- **Senior Staff:** Higher rate, less time
- **Junior Staff:** Lower rate, full-time involvement

---

## V. DISAGREEMENTS & TENSIONS

### Vision vs. Opportunity
**Moritz Theile:** Focus exclusively on marketplace completion; concerned about exhaustion from project business
**Wayne/Fabian:** Must take strategic opportunities to remain viable while pushing for marketplace

**Resolution:** Accept current project business as necessary bootstrapping; track profitability to inform decisions

### Environmental Track
**Wayne Noble:** Advocates for environmental/contamination data as growth opportunity
**Moritz Theile:** Strongly cautions against starting new business when current one unfinished

**Status:** No consensus; opportunity-dependent

### Scaling Developers
**Consensus:** Current developer count sufficient; don't scale. AI will replace many developers. Managing people and code structure creates problems.

---

## VI. ACTION ITEMS & NEXT STEPS

### Immediate (By End of Week / Early December)

| Action | Owner | Status |
|--------|-------|--------|
| Feature list (free vs. paid) with descriptions | Wayne Noble | Pending |
| Comparison matrix for LithoSurfer/LithoData tiers | Keith Dimech | Pending |
| Tables in Excel for team comments | Keith Dimech | Pending |
| Current version to production | Wayne Noble | Pending |
| Time estimate for Lu-Hf model | Moritz Theile | Pending |

### By End of Year (December 2025)

| Action | Owner | Status |
|--------|-------|--------|
| Branding copy for 2-page catalog | Keith Dimech | Pending |
| Website rebrand concepts & text | Keith Dimech | Pending |
| Identify test users (from Lab West clients) | Keith Dimech | Pending |
| Customer scenarios for UX design | Wayne Noble | Pending |
| SSO investigation | Tyrone/Nuralia (Vinko lead) | In Progress |
| Full LithoSurfer training for all staff | Fabian Kohlmann | Pending |

### January 2025

| Action | Target |
|--------|--------|
| Conference showcase (Jan 15) | Wayne Noble to present |
| Website ready | Spanish/EU versions considered |
| Marketing materials complete | Ready for distribution |
| Test users engaged | Free 3-6 month trials |

### March 2025

| Action | Target |
|--------|--------|
| Commercial launch | Pro/Enterprise available for purchase |
| Contracts finalized | Legal review complete |
| Gallery operational | Quote generation working |

### Ongoing / Future

| Action | Owner | Notes |
|--------|-------|-------|
| T&Cs update | Group | Required for data hosting |
| Legal clause for security/hacking | Keith Dimech | Talk to lawyers |
| Litho Build strategic timeline | Group | For tools development |
| Data quality tools | Team | Validation, display, third-party |
| Customer map | Keith Dimech | Based on gathered customer data |

---

## VII. KEY METRICS TO TRACK

### Revenue Targets
- 4 x $250k data subscriptions = $1M
- AGN continuation
- Target total: $1.7M annual from subscriptions
- Reduces dependency on build projects

### Customer Acquisition
- January target: Conference interest generation
- February target: 15 exploration companies engaged
- Trial users: 5-6 initial customers (opens doors to majors)

### Platform Metrics
- New data points ingested
- Subscription renewals
- Pro/Enterprise license conversions

---

## VIII. ORGANIZATIONAL NOTES

### Terminology

| Internal Term | Industry Term | Use For |
|--------------|---------------|---------|
| Institution | Organization | Companies |
| Community | Parent Company/Group | Multi-institution contracts |
| Package | Project | Data groupings |
| Private Data | Institutional Data | Customer-uploaded data |
| Premium Data | Proprietary/Subscription Data | Lithodat's commercial data |

### Team Concerns

**Moritz Theile:**
- Operating at 10% energy, heading toward burnout
- May need to step back from director role
- Critical for architectural governance

**Resolution:** Support offered; role transition discussions to continue

### Lithodat Europe
- Legally separate contractor
- Functions as "build agent" / quasi-department
- Bills to different departments when working for them

---

## IX. DOCUMENT REFERENCES

### Meeting Source Files
- `Lithosurfer Insights - 2025_11_07.txt`
- `Lithodat Product Meeting - 2025_11_12.txt`
- `Lithodat Product Meeting Pt2 - 2025_11_17.txt`
- `Lithodat Product Meeting Pt3 - 2025_11_25.txt`

### Related Documentation
- `01-FORM-QUESTIONS.md` - VSS Platform form questions
- `02-INDIVIDUAL-RESPONSES.md` - Team responses
- `03-CONSENSUS-DATA.md` - Management decisions
- `04-PRODUCT-TIER-CONFIG.md` - Database tier configs
- `05-IMPLEMENTATION-REQUIREMENTS.md` - Development roadmap

---

## X. WHAT TO DO NEXT

### For Keith (COO)
1. Build comparison matrix (LithoSurfer + LithoData tiers) in Excel
2. Write branding copy for 2-page catalog
3. Identify 5-6 test users from Lab West network
4. Engage lawyers for security/hacking legal clauses
5. Create customer map from gathered data
6. Review transcripts and update VSS platform

### For Wayne (Technical Director)
1. Provide feature list with actual names and descriptions
2. Get current version into production
3. Create customer scenarios for UX design
4. Prepare conference presentation for January 15
5. Add indication in LithoSurfer directing users to catalog

### For Fabian (CEO)
1. Schedule full LithoSurfer training for all staff
2. Push borehole model during Perth visit
3. Send meeting invite to Keith
4. Continue polishing conference talk

### For Moritz (Operations Director)
1. Provide time estimate for Lu-Hf model implementation
2. Continue SSO investigation with Tyrone/Nuralia
3. Review data handling terminology workshop with Keith

### For Vinko (Strategy/Planning)
1. Lead SSO implementation effort
2. Session with Moritz on Lithodat capabilities
3. Provide input on license switching mechanisms

### For Everyone
1. Review Excel comparison matrices and add comments
2. Identify visualization requirements for Pro tier
3. Update T&Cs for new commercial model
4. Prepare for March commercial launch

---

*This document consolidates four strategic meetings into actionable decisions and next steps. Review and update as implementation progresses.*
