# Bundle Discounts & LithoSurfer Credits

**Last Updated:** 2025-12-08
**Status:** DRAFT - Pending management approval

---

## Overview

Customers who purchase LithoData subscriptions receive credits toward LithoSurfer subscriptions. This document outlines the discount structure.

---

## Tiered Discount Structure

### LithoData Spend → LithoSurfer Credits

| Annual LithoData Spend | LithoSurfer Credit | Max Discount |
|-----------------------|-------------------|--------------|
| $5,000 - $14,999 | $500 | 10% of data spend |
| $15,000 - $29,999 | $1,500 | 10% of data spend |
| $30,000 - $49,999 | $3,500 | 12% of data spend |
| $50,000 - $99,999 | $7,500 | 15% of data spend |
| $100,000+ | $15,000 | 15% of data spend |

### Example

Customer purchases $50,000/year in LithoData:
- Receives **$7,500 credit** toward LithoSurfer
- Could get LithoSurfer ENTERPRISE ($12,000/yr) for $4,500/yr
- **Cannot exceed 15% discount** ($7,500 max)

---

## Anti-Cannibalization Rules

**Problem:** We don't want data discounts to devalue platform subscriptions.

### Cap Rules

1. **Maximum discount = 25% of LithoSurfer list price**
   - Even with large data spend, LithoSurfer discount cannot exceed 25%
   - Ensures platform maintains perceived value

2. **Discount cannot exceed 15% of data spend**
   - Prevents small data purchases unlocking huge platform discounts

3. **Credits are annual, not cumulative**
   - Credits reset each year
   - Cannot bank unused credits

### Example: Large Data Customer

Customer: BHP with $180,000/year LithoData subscription

| Item | Calculation | Result |
|------|-------------|--------|
| Base credit (tier) | $100k+ tier | $15,000 |
| 15% of spend cap | $180k × 15% | $27,000 |
| 25% of LithoSurfer cap | $12k × 25% | $3,000 |
| **Final credit** | Min of all caps | **$3,000** |

Even though they qualify for $15k credit, they only get $3k off LithoSurfer (25% cap).

---

## What Credits Cover

### Eligible Items
- LithoSurfer PRO subscription
- LithoSurfer ENTERPRISE subscription
- Additional user seats
- Priority support add-ons

### Not Eligible
- LithoBuild custom development
- LithoClean services
- Consulting hours
- One-time setup fees

---

## Quoting Bundle Deals

When quoting a bundled deal:

1. Calculate total LithoData spend
2. Determine credit tier
3. Apply all caps
4. Show as line item discount on quote

### Quote Format

```
LithoData Packages
  001-01-00  FT Global           $50,000/yr
  001-04-00  U-Pb Global         $30,000/yr
  Subtotal                       $80,000/yr

LithoSurfer
  002-03-01  ENT Annual          $12,000/yr
  Bundle Credit ($80k data)      -$3,000
  Subtotal                        $9,000/yr

Total Annual                     $89,000/yr
```

---

## Special Cases

### Academic Institutions
- Different discount structure (see Academic Pricing policy)
- Cannot combine academic discount with bundle credits

### Multi-Year Deals
- Credits based on first year spend
- Locked in for contract duration
- Renewal resets to current pricing

### Consortium/Group Purchases
- Combined spend counts toward tier
- Credits split proportionally
- Requires group agreement

---

## Approval Requirements

| Discount Level | Approval |
|---------------|----------|
| Standard tiers | Auto-approved |
| >15% total discount | COO approval |
| >25% total discount | CEO approval |
| Custom terms | Board approval |

---

## Related Documents

- [Regional Pricing Formula](./regional-pricing.md)
- [Custom Package Invoicing](../invoicing/custom-packages.md)
- [Product & Service Codes](../product-service-codes.json)
