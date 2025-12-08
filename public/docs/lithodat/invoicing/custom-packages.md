# Custom Package Invoicing

**Last Updated:** 2025-12-08

---

## Overview

When customers need a bespoke data package that doesn't fit standard regional offerings, use the custom package codes (001-XX-XX).

---

## When to Use Custom Packages

1. **Mixed regions for same data type** - Customer wants Asia + Europe only
2. **Mixed data types** - Customer wants FT + U-Pb only
3. **Non-standard bundles** - Combination not covered by standard codes
4. **Enterprise deals** - Large custom arrangements

---

## Custom Package Codes

| Code | Name | Use Case |
|------|------|----------|
| 001-XX-00 | Custom Data Package | General bespoke package |
| 001-XX-01 | Custom Bundle Small | Up to 3 data types |
| 001-XX-02 | Custom Bundle Medium | 4-6 data types |
| 001-XX-03 | Custom Bundle Large | 7+ data types |
| 001-XX-10 | Enterprise Data License | Full access (all types, all regions) |

---

## Pricing Custom Packages

### Option A: Sum of Parts

Add up the individual regional prices:

```
Customer wants: FT Asia + FT Oceania + U-Pb Oceania

001-01-04  FT Asia        $21,960
001-01-08  FT Oceania     $20,160
001-04-08  U-Pb Oceania   $15,000
           --------------------------
           Total          $57,120

Round to: $57,000 or $55,000 (small discount)
```

### Option B: Proportional Pricing

Calculate based on % of global data:

```
Customer wants: FT Asia + FT Oceania

Records requested:
- FT Asia: 12,405 (18.3% of FT)
- FT Oceania: 11,394 (16.8% of FT)
- Total: 23,799 (35.1% of FT)

If FT Global = $100,000:
Custom price = $100,000 × 35.1% × 1.1 (10% admin fee)
             = $38,610
Round to: $38,500 or $40,000
```

### Option C: Value-Based

For strategic customers, price based on:
- Customer's budget
- Competitive alternatives
- Strategic value of relationship

**Requires COO/CEO approval**

---

## Invoice Format for Custom Packages

### Simple Custom Package

```
Item:        001-XX-00
Description: Custom Data Package - Annual Subscription
             Includes:
             - Fission Track: Asia, Oceania regions
             - Uranium-Lead: Oceania region
             Period: 1 Jan 2025 - 31 Dec 2025
Qty:         1
Unit Price:  $55,000
```

### Itemized Custom Package

For transparency, list components:

```
Item:        001-XX-02
Description: Custom Bundle Medium - Annual Subscription

             Components:
             - 001-01-04 FT Asia (12,405 records)
             - 001-01-08 FT Oceania (11,394 records)
             - 001-04-08 U-Pb Oceania (7,384 records)
             - 001-07-08 GC Oceania (141,614 records)

             Total records: 172,797
             Period: 1 Jan 2025 - 31 Dec 2025

Qty:         1
Unit Price:  $85,000
```

---

## Documentation Requirements

For every custom package, document:

1. **What's included** - List all data types and regions
2. **Record counts** - Total records in package
3. **Pricing rationale** - How price was calculated
4. **Approval** - Who approved (if non-standard)
5. **Customer contact** - Who negotiated the deal

### Storage Location

Save documentation to:
- `build-data/03 finance/quotes/[customer-name]-[date].md`
- Attach to Xero invoice as PDF

---

## Quote Template

```markdown
# Custom Data Package Quote

**Customer:** [Name]
**Date:** [Date]
**Valid Until:** [Date + 30 days]
**Quote Ref:** Q-2025-XXX

## Package Contents

| Data Type | Region | Records | List Price |
|-----------|--------|---------|------------|
| FT | Asia | 12,405 | $21,960 |
| FT | Oceania | 11,394 | $20,160 |
| U-Pb | Oceania | 7,384 | $15,000 |
| **Total** | | **31,183** | **$57,120** |

## Pricing

| Item | Amount |
|------|--------|
| Component total | $57,120 |
| Bundle discount (5%) | -$2,856 |
| **Package price** | **$54,264** |
| Rounded | **$54,000/year** |

## Terms

- Annual subscription, paid upfront
- Renewable at same rate for 3 years
- Access via LithoSurfer platform
- Data export included

## To Accept

Reply to this email confirming acceptance, or sign below:

Signature: _________________ Date: _________
```

---

## Approval Matrix

| Package Value | Approval Required |
|--------------|-------------------|
| < $25,000 | Sales team |
| $25,000 - $50,000 | COO |
| $50,000 - $100,000 | COO + CEO review |
| > $100,000 | CEO + Board notification |

---

## Related Documents

- [Product & Service Codes](../product-service-codes.json)
- [Regional Pricing Formula](../pricing/regional-pricing.md)
- [Bundle Discounts](../pricing/bundle-discounts.md)
- [Creating an Invoice](./create-invoice.md)
