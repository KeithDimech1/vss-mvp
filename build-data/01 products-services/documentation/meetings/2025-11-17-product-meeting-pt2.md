# Lithodat Product Meeting - Part 2

**Date:** November 17, 2025
**Duration:** 2 hours
**Attendees:** Keith Dimech, Fabian Kohlmann, Wayne Noble, Vinko Novak, Moritz Theile

---

## Meeting Purpose

Define the data marketplace strategy including commercial data sales, quality controls, security requirements, and the distinction between data types (private, commercial, proprietary).

---

## Summary

The team aligned on the data marketplace concept with extended discussions on terminology, data visibility for different license tiers, and the necessity of strong security and legal protections for hosting sensitive private data. Key outcomes include defining the marketplace model, establishing quality control requirements, and setting a March 2025 launch target.

---

## Key Discussion Points

### 1. Data Marketplace Concept
- Users log into LithoSurfer, view available data, purchase packages via subscription
- Marketplace handles both Lithodat's proprietary data and third-party commercial data
- Data Gallery separate from LithoSurfer but connected via SSO

### 2. Data Type Definitions

| Term | Definition |
|------|------------|
| **Private** | Visible only to creator and added team members |
| **Institutional** | Private within an organization (e.g., Anglo-American) |
| **Proprietary** | Lithodat's commercial data sold via subscription |
| **Commercial/Marketplace** | Third-party data sold on platform |
| **Public** | Available to everyone (EarthBank data) |

**Terminology Decision:** Stick to three external terms: Private, Commercial, Public

### 3. Data Visibility by License

| License | Private Data Behavior |
|---------|----------------------|
| **Free** | Can create private packages, cannot share, may become public after 2-4 years |
| **Pro** | Can switch packages to institutional visibility, share with any Lithu login |
| **Enterprise** | Multi-department siloing, controlled sharing |

### 4. Proprietary Data Sales (Lithodat's Data)
- Sold by **region** and **data type**
- Annual subscription model (global option is ideal)
- Continue handling through contracts and direct sales for MVP
- Not package-based like marketplace

### 5. Marketplace (Third-Party Data)
- Package-based sales (must buy entire packages, not individual points)
- Options: Subscription OR one-off purchase
- One-off significantly more expensive to encourage subscription
- **Commission:** Higher if Lithodat performs data cleaning

### 6. Quality Control Requirements

**Seller Verification:**
- Rigorous approval process for sellers AND packages
- Verified institutions/companies only
- Require proof: lab reports, published papers

**Data Standards:**
- All marketplace data must have IGSN
- QC workflow before data goes public
- Five-star rating system (needs automation)
- LithoClean service available (quoted per project)

**LithoClean Process:**
1. Fixed-price analysis workshop for rough overview
2. Proposal of cleaning progress
3. Quote for actual work

### 7. Security Requirements

**Critical Concerns:**
- Big company datasets make platform a "honeypot"
- Current system not prepared for that security risk
- Massive legal risk for Lithodat

**Requirements:**
- Single Sign-On (SSO)
- ISO certification consideration
- Comprehensive legal agreements
- Hacking/breach clauses
- Audit trails for public/private switches

### 8. Download Risk Management
- Users can subscribe, download all data, cancel
- Inherent problem with downloadable data
- **Mitigation:** Legal agreements, continued platform value (7 data types in one spot), strategic data releases

### 9. Retention Strategy
- Strategic "breadcrumb" data releases
- Don't release all data in first 6 months
- Bigger drops before contract renewal
- Notifications for new data (email + in-product)

### 10. Gallery Implementation
- Accessible without login (view available data)
- Login required for purchases
- Quote generation triggers manual process
- Automation (Stripe) after ~100 quotes
- SSO essential for seamless LithoSurfer switching

### 11. Pricing Controls
- Lithodat has final say on marketplace pricing
- Won't approve prices that undercut subscription services
- Clear commission percentage communicated to sellers
- Minimum prices required to prevent data devaluation

---

## Decisions Made

1. **Launch Target:** March 2025 for full commercial offering
2. **January Milestone:** Marketing materials and website ready (can talk about offerings even if not live)
3. **Data Terminology:** Private, Commercial, Public for external communications
4. **Marketplace Model:** Package-based with subscription or one-off options
5. **Quality Control:** Mandatory verification for all sellers and packages
6. **Legal Priority:** Security clauses must be first action item

---

## Action Items

| Action | Owner | Due |
|--------|-------|-----|
| Brainstorm better term than "premium" for subscription data | Keith Dimech | TBD |
| Draft legal clause for hacking/security | Keith Dimech | Talk to lawyers |
| Workshop on data handling terminology differences | Keith + Moritz | TBD |
| Add indication in LithoSurfer directing users to catalog | Wayne Noble | TBD |
| Review meeting transcripts, update platform, summarize topics | Keith Dimech | TBD |
| Update Terms & Conditions | Group | Before launch |

---

## Timeline

| Date | Milestone |
|------|-----------|
| January 2025 | Marketing materials ready, website updated, test concepts |
| January 2025 | Wayne can speak about Pro/Enterprise (even if not online) |
| March 2025 | Full launch - contracts finalized, everything turned on |

---

## Open Questions

1. What happens when new data appears for subscribers? (Need notification system)
2. How to handle sellers wanting one-off sales vs subscriptions?
3. Perpetual access vs subscription-only access for one-off purchases?
4. Troll risk: someone making all public data accessible through free interface?

---

## Key Quotes

> "A big company putting a multi-million-dollar dataset on the platform would make it a honeypot" - Moritz Theile

> "The continued value of the platform lies in its ability to display seven data types in one spot" - Keith Dimech

> "The leverage we have is ensuring the data pipelines are running and providing high-quality new data first" - Moritz Theile
