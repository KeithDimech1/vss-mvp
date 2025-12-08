# WISE Contractor Payments

**Last Updated:** 2025-12-08

---

## Overview

Lithodat uses WISE (formerly TransferWise) for international contractor payments. This document covers the process from invoice receipt to payment completion.

---

## Contractor List

| Name | Location | Currency | Payment Day |
|------|----------|----------|-------------|
| Wayne | Germany | EUR | 4th |
| Moritz | Germany | EUR | 4th |
| Tarun/Nirali | India | INR/USD | 4th |
| Juan | Colombia | USD | 4th |
| Perla | Mexico | USD | 4th |
| Aida Cristina | Colombia | USD | 4th |
| Vinko (Scenaryo GmbH) | Germany | EUR | 4th |

---

## Payment Process

### Step 1: Collect Invoices (Day 1-3)

1. Check email for contractor invoices
2. Verify invoice details:
   - Correct billing period
   - Correct amount
   - Bank details match records
3. Save invoices to `build-data/03 finance/invoices/[month]/`

### Step 2: Calculate AUD Amounts

1. Log into WISE
2. Note today's exchange rate
3. Calculate AUD equivalent for each invoice:

```
AUD Amount = Foreign Amount × WISE Rate
```

Record in spreadsheet:

| Contractor | Invoice Currency | Invoice Amount | WISE Rate | AUD Amount |
|------------|-----------------|----------------|-----------|------------|
| Wayne | EUR | €X,XXX | 0.XX | $X,XXX |
| Moritz | EUR | €X,XXX | 0.XX | $X,XXX |
| ... | | | | |

### Step 3: Enter into WISE (Day 4)

For each payment:

1. Click **Send Money**
2. Select recipient (or add new)
3. Enter amount in their currency
4. Select **Bank Transfer**
5. Review fees and rate
6. Add to batch (don't send yet)

### Step 4: Review Batch

Before sending:
- [ ] All payments entered
- [ ] Amounts match invoices
- [ ] Recipients correct
- [ ] Total AUD within budget

### Step 5: Process Batch

1. Click **Send All**
2. Authenticate (2FA)
3. Confirm each payment
4. Note transaction references

### Step 6: Record in Dext

For each WISE payment:

1. WISE sends email receipt
2. Forward receipt to Dext email
3. In Dext, code as:
   - **Supplier**: [Contractor name]
   - **Category**: Contractor Wages / Professional Services
   - **Amount**: AUD amount
   - **Tax**: No GST (international)

### Step 7: Publish to Xero

1. Review all WISE items in Dext
2. Verify coding is correct
3. Click **Publish to Xero**
4. Verify appears in Xero

---

## Adding a New Contractor

### In WISE

1. Go to **Recipients**
2. Click **Add Recipient**
3. Enter:
   - Name (as on bank account)
   - Country
   - Currency
   - Bank details (IBAN/SWIFT or local)
4. Save recipient

### In Dext

1. Go to **Suppliers**
2. Click **Add Supplier**
3. Enter contractor name
4. Set default category (Contractor Wages)
5. Save

### In Xero

1. Go to **Contacts → Suppliers**
2. Click **New Contact**
3. Enter contractor details
4. Add bank details (for reference)
5. Set default account code

---

## Troubleshooting

### Payment Rejected

1. Check bank details are correct
2. Contact contractor for updated details
3. Cancel failed transfer in WISE
4. Re-enter with correct details

### Exchange Rate Dispute

If contractor queries the rate:
1. Show WISE receipt with rate used
2. Explain WISE mid-market rate
3. If significant difference, consider goodwill adjustment

### Missing Invoice

If invoice not received by day 3:
1. Email contractor reminder
2. CC Keith on follow-up
3. If still missing by day 4, pay based on contract rate
4. Reconcile when invoice arrives

---

## Monthly Summary

After all payments processed, create summary:

```markdown
# WISE Payments Summary - [Month Year]

| Contractor | Currency | Amount | AUD | Status |
|------------|----------|--------|-----|--------|
| Wayne | EUR | €X,XXX | $X,XXX | Paid |
| Moritz | EUR | €X,XXX | $X,XXX | Paid |
| ... | | | | |
| **Total** | | | **$XX,XXX** | |

Exchange rates used: [Date]
- EUR/AUD: X.XXXX
- USD/AUD: X.XXXX
- INR/AUD: X.XXXX

All payments processed on: [Date]
Dext receipts published: [Date]
```

Save to: `build-data/03 finance/wise-summaries/[YYYY-MM].md`

---

## Related Documents

- [Month-End Close Checklist](./close-checklist.md)
- [Creating an Invoice](../invoicing/create-invoice.md)
