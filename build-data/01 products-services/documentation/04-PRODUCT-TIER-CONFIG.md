# Product Tier Configuration - Database Extract

**Extracted from Database:** 2025-12-05
**Source Table:** ProductTierConfig

This document contains the current product tier configurations stored in the database for LithoSurfer and LithoData products.

---

## LithoSurfer Tiers

### LithoSurfer FREE

| Field | Value |
|-------|-------|
| **Price** | $0 |
| **Price Note** | - |
| **Target** | Students, hobbyists, researchers exploring platform |
| **Restrictions** | Single project only. Cannot publish to public. Basic graphs only. |
| **Key Differentiator** | Free forever entry point for exploration |

#### Features Included

| Category | Feature | Note |
|----------|---------|------|
| Data Access | Public data access | Read-only |
| Data Access | Private data upload | |
| Data Access | Personal packages (private) | |
| Visuals | Basic graphs and visualizations | |
| Core | Single project workspace | |
| Core | Basic search functionality | |
| Community | Community forum access | |

#### Features Excluded (Upgrade Required)

| Feature | Category | Upgrade Path |
|---------|----------|--------------|
| Data export | Export | Pro |
| Advanced analytics | Analysis | Pro |
| Team collaboration | Collaboration | Enterprise |
| Priority support | Support | Enterprise |
| Multiple projects | Projects | Pro |

---

### LithoSurfer PRO

| Field | Value |
|-------|-------|
| **Price** | $2,500 - $5,000/year |
| **Price Note** | Pricing under debate - needs final decision |
| **Target** | Professional researchers, small labs, consultants |
| **Restrictions** | Limited collaboration features |
| **Key Differentiator** | Professional tools for serious researchers |

#### Features Included

| Category | Feature | Note |
|----------|---------|------|
| Data Access | All Free tier features | |
| Data Access | Private data upload | |
| Export | Full data export (CSV, Excel) | |
| Analysis | Advanced analytics & reporting | |
| Projects | Multiple projects (3-5) | |
| API | API access (limited) | |
| Integrations | Third-party integrations | |
| Support | Email support | |

#### Features Excluded (Upgrade Required)

| Feature | Category | Upgrade Path |
|---------|----------|--------------|
| Team workspaces | Collaboration | Enterprise |
| Admin controls | Admin | Enterprise |
| Unlimited projects | Projects | Enterprise |
| Priority support (SLA) | Support | Enterprise |
| Custom training | Training | Enterprise |

---

### LithoSurfer ENTERPRISE

| Field | Value |
|-------|-------|
| **Price** | $10,000+/year |
| **Price Note** | Custom pricing based on team size and needs |
| **Target** | Large organizations, universities, mining companies |
| **Restrictions** | - |
| **Key Differentiator** | Full organizational solution with dedicated support |

#### Features Included

| Category | Feature | Note |
|----------|---------|------|
| Data Access | All Pro tier features | |
| Data Access | Private data upload | |
| Collaboration | Team workspaces | |
| Admin | Admin controls & user management | |
| Integration | Full API access | |
| Projects | Unlimited projects | |
| Support | Dedicated account manager | |
| Support | Priority support (SLA) | |
| Training | Custom training & onboarding | |
| Security | SSO/SAML integration | |
| Security | Custom data retention policies | |

---

## LithoData Tiers

### LithoData FREE

| Field | Value |
|-------|-------|
| **Price** | $0 |
| **Price Note** | - |
| **Target** | Researchers browsing/discovering data |
| **Source** | Public domain and openly shared datasets |
| **Restrictions** | Preview only, no full downloads |
| **Key Differentiator** | Discover and explore available datasets |

#### Features Included

| Category | Feature | Note |
|----------|---------|------|
| Data Access | Browse public datasets | |
| Data Access | Private data upload | |
| Search | Basic search and filtering | |
| Preview | Dataset previews | |
| Community | Community discussions | |

#### Features Excluded (Upgrade Required)

| Feature | Category | Upgrade Path |
|---------|----------|--------------|
| Full dataset downloads | Download | Premium |
| Export to analysis tools | Export | Premium |
| List data for sale | Sell | Marketplace |
| Usage analytics | Analytics | Premium |

---

### LithoData PREMIUM

| Field | Value |
|-------|-------|
| **Price** | $1,000 - $3,000/year |
| **Price Note** | Based on download volume and features |
| **Target** | Active researchers needing data access |
| **Source** | Curated academic and institutional datasets |
| **Restrictions** | Cannot sell data. Download limits may apply. |
| **Key Differentiator** | Full access to download and use datasets |

#### Features Included

| Category | Feature | Note |
|----------|---------|------|
| Data Access | All Free tier features | |
| Data Access | Private data upload | |
| Download | Full dataset downloads | |
| Export | Export to CSV, Excel, analysis tools | |
| Analytics | Download history & tracking | |
| Support | Priority support | |
| Features | Saved searches & alerts | |

#### Features Excluded (Upgrade Required)

| Feature | Category | Upgrade Path |
|---------|----------|--------------|
| List data for sale | Sell | Marketplace |
| Revenue from data sales | Revenue | Marketplace |
| Premium marketplace datasets | Premium Access | Marketplace |

---

### LithoData MARKETPLACE

| Field | Value |
|-------|-------|
| **Price** | 30% Commission |
| **Price Note** | Lithodat takes 30% of each sale |
| **Target** | Data providers, labs, consultants with valuable data |
| **Source** | Proprietary datasets from sellers |
| **Restrictions** | Must meet data quality standards. Subject to review. |
| **Key Differentiator** | Monetize your geoscience data |

#### Features Included

| Category | Feature | Note |
|----------|---------|------|
| Data Access | All Premium tier features | |
| Data Access | Private data upload | |
| Sell | List datasets for sale | |
| Revenue | 70% revenue share on sales | |
| Tools | Seller dashboard & analytics | |
| Tools | Pricing control | |
| Tools | License management | |
| Support | Seller support & promotion | |

#### Features Excluded

*None - This is the top tier for LithoData*

---

## Pricing Summary Table

| Product | Tier | Price | Target Customer |
|---------|------|-------|-----------------|
| LithoSurfer | Free | $0 | Students, hobbyists |
| LithoSurfer | Pro | $2,500 - $5,000/year | Professionals, small labs |
| LithoSurfer | Enterprise | $10,000+/year | Large organizations |
| LithoData | Free | $0 | Researchers browsing |
| LithoData | Premium | $1,000 - $3,000/year | Active researchers |
| LithoData | Marketplace | 30% Commission | Data providers |

---

## Configuration Metadata

| Configuration | Created | Last Updated |
|--------------|---------|--------------|
| lithosurfer-free | 2025-11-25 08:31:59 | 2025-11-25 08:31:59 |
| lithosurfer-pro | 2025-11-25 08:32:00 | 2025-11-25 08:32:00 |
| lithosurfer-enterprise | 2025-11-25 08:32:00 | 2025-11-25 08:32:00 |
| lithodata-free | 2025-11-25 08:32:00 | 2025-11-25 08:32:00 |
| lithodata-premium | 2025-11-25 08:32:00 | 2025-11-25 08:32:00 |
| lithodata-marketplace | 2025-11-25 08:32:00 | 2025-11-25 08:32:00 |
