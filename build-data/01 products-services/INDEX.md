# 01 Products & Services

**App Routes:**
- `/management/action/lithosurfer` (Action 1)
- `/management/action/lithodata` (Action 2)
- `/management/action/lithobuild` (Action 3)

**Status:** RESTORED from database (2025-12-05)

---

## Overview

This section covers the three main product/service lines for Lithodat:

### LithoSurfer (Front-End / Customer Platform)
- Our software / Marketplace / Analysis tool
- Three-tier subscription model: FREE, PRO, ENTERPRISE
- Buy data packages
- Auto cleaning / Share data
- **Manager:** Wayne
- **Strategic Role:** Customer acquisition and multi-purpose platform

### LithoData (Back-End Data / Strategic Asset)
- Backend development / Schema/Postgres work
- Three-type model: FREE, COMMERCIAL (Premium + Exchange), PRIVATE
- LithoClean (cleaning) / LithoMine (extraction)
- API development
- **Manager:** Fabian
- **Tagline:** "DATA, DATA and DATA"

### LithoBuild (Contract Work / Bootstrap Revenue)
- Contract-by-contract only
- AGN, CSIRO, Amira projects
- Temporary (1-2 years) - sunset once data flywheel spins
- **Manager:** Moritz
- **Note:** "Oil rig infrastructure"

---

## Database Models

See `prisma/schema.prisma`:
- `ActionItem` - Strategic action tracking
- `ActionResponse` - Individual team responses
- `ActionConsensus` - Management consensus decisions
- `ProductTierConfig` - Editable tier data for LithoSurfer and LithoData

---

## Documentation Files (Restored 2025-12-05)

### `/documentation/`

| File | Description |
|------|-------------|
| `01-FORM-QUESTIONS.md` | Complete list of all form questions for Actions 1-3 |
| `02-INDIVIDUAL-RESPONSES.md` | Team member responses with summaries |
| `03-CONSENSUS-DATA.md` | Management consensus decisions and notes |
| `04-PRODUCT-TIER-CONFIG.md` | Current database tier configurations |
| `05-IMPLEMENTATION-REQUIREMENTS.md` | Development estimates and roadmap |

### Other Subfolders

- `learning/` - Market research, competitor analysis
- `assets/` - Product diagrams, screenshots
- `response/` - Strategy documents, decisions

---

## Response Summary

### LithoSurfer (Action 1)
- **Respondents:** 4 (Keith, Fabian, Moritz, Wayne)
- **Consensus Meeting:** 2025-11-12
- **Status:** Consensus in progress (not resolved)

### LithoData (Action 2)
- **Respondents:** 3 (Keith, Fabian, Wayne)
- **Consensus Meeting:** Not yet held
- **Status:** Responses collected

### LithoBuild (Action 3)
- **Respondents:** 3 (Keith, Fabian, Wayne)
- **Consensus Meeting:** Not yet held
- **Status:** Responses collected

---

## Pricing Summary (from Consensus/Config)

### LithoSurfer Tiers

| Tier | Price | Target |
|------|-------|--------|
| FREE | $0 | Students, hobbyists, researchers |
| PRO | $2,500 - $5,000/year | Professionals, small labs |
| ENTERPRISE | $10,000+/year (custom) | Large organizations |

### LithoData Tiers

| Tier | Price | Target |
|------|-------|--------|
| FREE | $0 | Researchers browsing |
| PREMIUM | $1,000 - $3,000/year | Active researchers |
| MARKETPLACE | 30% Commission | Data providers |

---

## Key Decisions (from Consensus)

### LithoSurfer FREE Features (Agreed)
- View Lithodata Free & Commercial
- Paleo Reconstruction (one & all)
- Grid Data, Swath Profile, Select Area
- Rock Type, Analysis Type, Elevation
- Basemaps, Field App
- Geochemistry, LithoChem Dashboard, Thermochron
- Contour Lines

### LithoSurfer PRO Additional Features (Agreed)
- Share Data
- Upload Private Data (unlimited)
- Support / Training
- DOI Minting

### LithoSurfer ENTERPRISE Additional Features (Agreed)
- Skins
- LithoClean Service
- CSV Template Ingestion
- LithoBuild Services

---

## Outstanding Items

- [ ] Finalize Pro pricing ($1,000-$10,000 range - team not aligned)
- [ ] Complete LithoData consensus meeting
- [ ] Complete LithoBuild consensus meeting
- [ ] Talk to Rahul re: operational implementation
- [ ] Define Pro licence switching mechanism
- [ ] Legal review for contracts
- [ ] Development assessment completion

---

## Quick Links

- Form Questions: [01-FORM-QUESTIONS.md](documentation/01-FORM-QUESTIONS.md)
- Team Responses: [02-INDIVIDUAL-RESPONSES.md](documentation/02-INDIVIDUAL-RESPONSES.md)
- Consensus: [03-CONSENSUS-DATA.md](documentation/03-CONSENSUS-DATA.md)
- Tier Config: [04-PRODUCT-TIER-CONFIG.md](documentation/04-PRODUCT-TIER-CONFIG.md)
- Implementation: [05-IMPLEMENTATION-REQUIREMENTS.md](documentation/05-IMPLEMENTATION-REQUIREMENTS.md)
