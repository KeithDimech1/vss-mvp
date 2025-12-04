# Lithodat Product Meeting - Part 1

**Date:** November 12, 2025
**Duration:** 2 hours
**Attendees:** Keith Dimech, Fabian Kohlmann, Wayne Noble, Vinko Novak, Moritz Theile

---

## Meeting Purpose

Define the three-tiered commercial structure for LithoSurfer (Free, Pro, Enterprise), assess implementation feasibility, and determine feature differentiation between tiers.

---

## Summary

The team established general agreement on a three-tier subscription model for LithoSurfer. Discussion focused on operational details for license management, feature differentiation between tiers, data sharing capabilities, and the pathway from Free to Pro conversion. Key outcomes include feature definitions for each tier, enterprise service offerings, and timeline targeting January conference showcase.

---

## Key Discussion Points

### 1. Proposed Commercial Structure
- **LithoSurfer** (software): Free, Pro, Enterprise tiers
- **LithoData** (data): To be discussed in next meeting
- **LithoBuild** (services): To be discussed in future meeting

### 2. Free Tier Definition
- Current features remain: AGN data access, all toolbar tools
- Excludes advanced features (chemistry dashboards behind paywall)
- Private packages only visible to creator
- Cannot share data or create teams
- No support included

### 3. Pro Tier Definition
**Features:**
- Support package and onboarding workshop
- API documentation and development support
- Service Level Agreement (SLA)
- Upload private data (unlimited)
- Team collaboration within institution
- DOI minting (credit-based system)
- Geoserver for custom WMS layers
- Specialized exports

**License Model:**
- Per-institution subscription
- All users in institution share data
- Multiple seats require multiple licenses

### 4. Enterprise Tier Definition
**Features:**
- Custom branded portal (own URL/CNAME)
- Data cleaning services (LithoClean)
- CSV template ingestion
- Single Sign-On (SSO)
- Multi-department/multi-institution support
- Dedicated customer relationship manager
- Adapters to existing systems (Acquire, Geobank) - optional add-on

**Key Differentiator:** Data separation for different departments/projects within large organizations

### 5. Data Distribution Levels
Five distribution states identified:
1. Private (creator only)
2. Public (everyone)
3. Community (group of institutions)
4. Institution (all institutional users)
5. Commercial (paid access)

### 6. Organizational Terminology
- **Institution:** Suitable for both universities and companies
- **Community:** Group of institutions under single contract
- **Recommendation:** Use "organization" for industry sales

### 7. SSO Implementation
- Required for enterprise sales (e.g., John Holland won't purchase without it)
- Can be turned on/off at user or instance level
- Launch Enterprise without SSO, add when customer pays for setup

### 8. Sample Planning Tool (Future Feature)
- Users could plan exploration in-app, creating samples assigned data upon lab results
- Core functionality exists, UX refinement needed
- Entire project requiring substantial development
- Not MVP - future consideration

---

## Decisions Made

1. **Tier Structure Approved:** Free, Pro, Enterprise model accepted
2. **Free Features:** Keep current features, restrict sharing and advanced analytics
3. **Pro Value Prop:** Private data upload, team collaboration, support
4. **Enterprise Value Prop:** Multi-department separation, custom branding, SSO
5. **MVP Focus:** UX changes primary development work needed
6. **Target Date:** January 15 conference showcase

---

## Action Items

| Action | Owner | Due |
|--------|-------|-----|
| Send table of features behind licenses with names and descriptions | Wayne Noble | TBD |
| Session with Moritz to explain Lithodat capabilities | Vinko Novak | TBD |
| Full front-end LithoSurfer training for all staff | Fabian Kohlmann | TBD |
| Add automation for license upgrade via Stripe | Wayne Noble | Future |
| Customer scenarios for UX design | Wayne Noble | TBD |
| List of UX changes needed | Keith Dimech | End of year |
| Branding copy for 2-page catalog | Keith Dimech | End of year |
| Website copy and UX feedback from geology friends | Keith Dimech | Before launch |
| Review LithoData topics and draft questions | Moritz Theile | Before next meeting |

---

## Pricing Discussion

| Tier | Proposed Range | Notes |
|------|---------------|-------|
| Free | $0 | No changes to current |
| Pro | $2,500 - $5,000/year | Per institution |
| Enterprise | $10,000+/year | Custom contracts, volume discounts at 11+ users |

---

## Technical Notes

- Cannot currently limit data upload amounts technically (enforce via T&Cs)
- DOI minting is expense - consider credit-based or add-on system
- User preferences currently browser-based (can be removed for Free tier)
- Duplicate data import not currently detected

---

## Next Meeting Agenda

Focus on commercial data (LithoData):
- LithoData Free
- LithoData Exchange (marketplace)
- LithoData Private (institutional data)
- Data collection methods
- Subscription pricing by data type/region
- Marketplace implementation
- Commission structure
- Data quality verification

---

## Key Quotes

> "The free version should be a locked, restricted version of Pro, with everything available but many features locked" - Keith Dimech

> "We're very close to being able to secure a signature for a Pro license" - Moritz Theile

> "The key differentiator is offering PhD geologists to look at and clean the data" - Keith Dimech
