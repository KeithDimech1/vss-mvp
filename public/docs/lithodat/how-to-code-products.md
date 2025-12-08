# How to Code Products & Services

**Last Updated:** 2025-12-08

This guide explains the Lithodat product coding system and how to create new codes.

---

## Naming Convention

All product codes follow the format: **`XXX-YY-ZZ`**

```
XXX  = Product Line (001-006)
YY   = Category/SubProduct
ZZ   = Item/Region
```

---

## Product Lines (XXX)

| Code | Product Line | Description |
|------|--------------|-------------|
| **001** | LithoData | Data subscriptions |
| **002** | LithoSurfer | Platform subscriptions |
| **003** | LithoBuild | Custom development |
| **004** | LithoClean | Data cleaning services |
| **005** | LithoMine | Mining solutions |
| **006** | Consulting | Professional services |

---

## LithoData Categories (001-YY-ZZ)

### Data Types (YY)

| Code | Data Type | Category |
|------|-----------|----------|
| 01 | FT | Fission Track (Thermochronology) |
| 02 | HE | Helium U-Th/He (Thermochronology) |
| 03 | VR | Vitrinite Reflectance (Thermochronology) |
| 04 | U-Pb | Uranium-Lead (Geochronology) |
| 05 | Ar-Ar | Argon-Argon (Geochronology) |
| 06 | TH | Thorium (Geochronology) |
| 07 | GC | Geochemistry |
| 08 | ISO | Isotope |
| **XX** | Custom | Bespoke packages |

### Regions (ZZ)

| Code | Region |
|------|--------|
| 00 | Global (All Regions) |
| 01 | Africa (AFR) |
| 02 | Antarctica (ANT) |
| 03 | Arabia (ARA) |
| 04 | Asia (ASI) |
| 05 | Central Asia (CAS) |
| 06 | Europe (EUR) |
| 07 | North America (NAM) |
| 08 | Oceania (OCE) |
| 09 | South America (SAM) |
| 10 | Unclassified (UNC) |

### Examples

- `001-01-00` = FT Global (Fission Track, All Regions)
- `001-04-08` = U-Pb Oceania (Uranium-Lead, Oceania only)
- `001-XX-00` = Custom Data Package (bespoke mix)

---

## LithoSurfer Categories (002-YY-ZZ)

### Tiers (YY)

| Code | Tier |
|------|------|
| 01 | FREE |
| 02 | PRO |
| 03 | ENTERPRISE |
| 10 | Add-Ons |

### Billing (ZZ for tiers)

| Code | Billing |
|------|---------|
| 00 | Monthly |
| 01 | Annual |
| 02 | Academic |
| 03 | Site License |

### Examples

- `002-02-01` = LithoSurfer PRO Annual
- `002-03-02` = LithoSurfer ENTERPRISE Multi-Seat
- `002-10-04` = Priority Support Add-on

---

## LithoBuild Categories (003-YY-ZZ)

### Project Types (YY)

| Code | Type |
|------|------|
| 01 | Data Integration |
| 02 | Platform Customization |
| 03 | Enterprise Projects |
| 10 | Hourly/Retainer |

### Examples

- `003-01-02` = API Integration
- `003-02-00` = Custom Visualization
- `003-10-00` = Development Hour

---

## LithoClean Categories (004-YY-ZZ)

### Service Types (YY)

| Code | Type |
|------|------|
| 01 | Cleaning Services |
| 02 | QA & Validation |

### Size Tiers (ZZ for cleaning)

| Code | Size |
|------|------|
| 00 | Audit only |
| 01 | Small (up to 1,000 records) |
| 02 | Medium (1,001-10,000 records) |
| 03 | Large (10,001-50,000 records) |
| 04 | Enterprise (50,000+ records) |

---

## LithoMine Categories (005-YY-ZZ)

*Placeholder - to be expanded*

| Code | Type |
|------|------|
| 01 | Exploration Data |
| 02 | Mining Tools |

---

## Consulting Categories (006-YY-ZZ)

### Service Types (YY)

| Code | Type |
|------|------|
| 01 | Training & Onboarding |
| 02 | Academic Support |
| 03 | General Consulting |
| 10 | Support Plans |

### Examples

- `006-01-00` = Onboarding Workshop (half day)
- `006-03-00` = Consulting Hour
- `006-10-02` = Dedicated Account Manager

---

## Creating a New Product Code

### Step 1: Identify the Product Line

Which product family does this belong to?
- Data subscription → 001
- Platform subscription → 002
- Custom development → 003
- Data cleaning → 004
- Mining solution → 005
- Consulting/service → 006

### Step 2: Identify the Category

Look at existing categories within that product line. If none fit, consider:
- Using XX for custom/bespoke items
- Creating a new category (consult with team)

### Step 3: Identify the Item/Variant

- For LithoData: Use region codes (00-10)
- For subscriptions: Use billing period (00=monthly, 01=annual)
- For services: Use size/tier codes

### Step 4: Create in Xero

1. Go to **Products and Services** in Xero
2. Click **Add product/service**
3. Enter:
   - **Code**: The XXX-YY-ZZ code
   - **Name**: Short descriptive name
   - **Description**: Full description
   - **Track inventory**: No (for services)
   - **Purchase**: No (unless we buy this)
   - **Sell**: Yes

### Step 5: Update Documentation

Add the new code to:
- `public/docs/lithodat/product-service-codes.json`
- This guide (if a new category)

---

## Custom Package Rules

For bespoke customer packages that don't fit standard codes:

1. Use code `001-XX-00` for the main package line item
2. Add detailed description explaining what's included
3. Consider using `001-XX-01/02/03` for size variants:
   - XX-01 = Small (up to 3 data types)
   - XX-02 = Medium (4-6 data types)
   - XX-03 = Large (7+ data types)

### Quote Format

When quoting a custom package, list the constituent parts:
```
001-XX-00 - Custom Data Package
  Includes:
  - FT Global (001-01-00)
  - U-Pb Oceania (001-04-08)
  - GC Asia (001-07-04)
```

---

## Deprecating Codes

When a product is discontinued:
1. Do NOT delete from Xero (needed for historical invoices)
2. Add "(DISCONTINUED)" to the name
3. Mark as not for sale if possible
4. Update documentation

---

## Questions?

Contact Keith or Kristy for clarification on product coding.
