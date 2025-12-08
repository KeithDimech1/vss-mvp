# Regional Pricing Formula

**Last Updated:** 2025-12-08

---

## Overview

LithoData offers both Global and Regional packages for each data type. This document explains how regional prices are calculated.

---

## Pricing Principle

**Global packages are ~20% cheaper than the sum of all regional packages.**

This incentivizes customers to purchase Global when they need multiple regions, while still allowing regional pricing for focused use cases.

---

## Formula

```
Regional Price = Global Price × (Regional Records / Total Records) × 1.2
```

### Components:
- **Global Price**: The base price for all regions combined
- **Regional Records**: Number of records in that specific region
- **Total Records**: Total records globally for that data type
- **1.2**: 20% premium for regional packages

### Example: Fission Track (FT)

If FT Global is priced at **$100,000/year**:

| Region | Records | % of Total | Calculation | Price |
|--------|---------|------------|-------------|-------|
| Global | 67,870 | 100% | Base price | $100,000 |
| Africa | 5,521 | 8.1% | $100k × 0.081 × 1.2 | $9,720 |
| Asia | 12,405 | 18.3% | $100k × 0.183 × 1.2 | $21,960 |
| Oceania | 11,394 | 16.8% | $100k × 0.168 × 1.2 | $20,160 |

### Sum of All Regionals

If a customer bought ALL regional packages instead of Global:
- Total would be approximately **$120,000** (20% more than Global)

---

## Rationale

1. **Fair value**: Regional price reflects the proportion of data received
2. **Premium justified**: More granular access = higher admin/setup costs
3. **Global incentive**: Customers needing multiple regions save by going Global
4. **Flexibility**: Customers needing only one region don't overpay

---

## Rounding Rules

- Round to nearest **$100** for prices under $10,000
- Round to nearest **$1,000** for prices $10,000+
- Minimum regional price: **$500/year**

---

## Exceptions

### Very Small Regions

If a region has less than 1% of total records, consider:
- Bundling with a nearby region
- Setting a minimum price floor
- Offering as part of a custom package only

### Academic Pricing

Academic customers receive:
- 50% discount on regional packages
- 40% discount on Global packages

---

## Updating Prices

When updating Global prices:
1. Update the Global price in the pricing tool
2. Enable "Auto-calc regional"
3. Regional prices will recalculate automatically
4. Review and adjust any exceptions
5. Update quotes and contracts as needed

---

## Related Documents

- [Product & Service Codes](../product-service-codes.json)
- [Bundle Discounts](./bundle-discounts.md)
- [Custom Package Invoicing](../invoicing/custom-packages.md)
