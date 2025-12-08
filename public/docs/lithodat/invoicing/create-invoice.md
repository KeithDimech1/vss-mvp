# Creating an Invoice in Xero

**Last Updated:** 2025-12-08

---

## Prerequisites

- Access to Xero
- Customer exists in Xero Contacts
- Product codes set up (see [Product & Service Codes](../product-service-codes.json))

---

## Step-by-Step Process

### 1. Start New Invoice

1. Go to **Business → Invoices**
2. Click **New Invoice**
3. Select customer from dropdown (or create new contact)

### 2. Add Line Items

For each product/service:

1. Click **Add Item**
2. In the **Item** field, type the product code (e.g., `001-01-00`)
3. Select from autocomplete
4. Verify **Description** is correct
5. Enter **Quantity** (usually 1 for subscriptions)
6. Enter **Unit Price**
7. Set **Account** (typically 4000 - Sales)
8. Set **Tax Rate** (GST for AU, No GST for international)

### 3. Common Line Items

#### LithoData Subscription
```
Item:        001-01-00
Description: Fission Track - All Regions (Annual Subscription)
Qty:         1
Unit Price:  [as quoted]
Account:     4000 - Sales
Tax:         GST (AU) / No GST (International)
```

#### LithoSurfer Subscription
```
Item:        002-03-01
Description: LithoSurfer ENTERPRISE - Annual Subscription
Qty:         1
Unit Price:  [as quoted]
Account:     4000 - Sales
Tax:         GST (AU) / No GST (International)
```

#### Bundle Discount
```
Item:        DISCOUNT
Description: Bundle discount (LithoData + LithoSurfer)
Qty:         1
Unit Price:  -[discount amount]
Account:     4000 - Sales
Tax:         GST (AU) / No GST (International)
```

### 4. Set Invoice Details

- **Invoice Date**: Today or contract start date
- **Due Date**: Per payment terms (Net 30 standard)
- **Invoice Number**: Auto-generated
- **Reference**: Customer PO number (if provided)

### 5. Add Notes (if applicable)

In the **Notes** field:
- Subscription period (e.g., "1 Jan 2025 - 31 Dec 2025")
- Any special terms
- Contact for queries

### 6. Review and Send

1. Click **Preview** to check formatting
2. Verify totals and tax
3. Click **Approve** to finalize
4. Click **Email** to send to customer

---

## Invoice Templates

### Standard Data Subscription

```
INVOICE

To: [Customer Name]

Items:
1. [001-XX-XX] Data Package - Annual Subscription
   Description: [Data types and regions included]
   Period: [Start Date] - [End Date]
   Amount: $XX,XXX

Subtotal: $XX,XXX
GST (10%): $X,XXX (AU only)
Total: $XX,XXX

Payment Due: [Due Date]
```

### Combined Data + Platform

```
INVOICE

To: [Customer Name]

Items:
1. [001-XX-XX] LithoData Package
   [Description]
   Amount: $XX,XXX

2. [002-XX-XX] LithoSurfer Subscription
   [Description]
   Amount: $X,XXX

3. Bundle Discount
   Data spend credit applied
   Amount: -$X,XXX

Subtotal: $XX,XXX
GST (10%): $X,XXX
Total: $XX,XXX
```

---

## Tax Rules

### Australian Customers
- Apply 10% GST to all items
- ABN must be on invoice

### International Customers
- No GST (export exempt)
- Include customer's tax ID if provided

### Academic/Non-Profit
- Same tax rules apply
- Note any special pricing in description

---

## Common Issues

### Product Code Not Found
- Check code is in Xero Products & Services
- Verify spelling (case-sensitive)
- May need to add new product code

### Wrong Tax Applied
- Check customer's country in Contact
- Override tax rate if needed
- Document reason in notes

### Discount Exceeds Limits
- Review bundle discount caps
- Get approval if over limits
- Document approval in notes

---

## Related Documents

- [Product & Service Codes](../product-service-codes.json)
- [Custom Package Invoicing](./custom-packages.md)
- [Regional Pricing Formula](../pricing/regional-pricing.md)
