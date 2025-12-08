---
title: "Using Prepayments for Xero and QuickBooks Online"
url: "https://help.dext.com/en/articles/386537-using-prepayments-for-xero-and-quickbooks-online"
collection: "Accounting Softwares"
source: "dext"
---

**Important**: This feature is currently only available for accounts connected with Xero and QuickBooks Online.

Account for costs that are paid upfront but relate to a future period with prepayments. These expenses could include annual insurance, software licenses, or subscriptions that are invoiced and paid in advance.

 

Without proper treatment, these expenses distort monthly reporting, concentrating the full cost in one period instead of spreading it over the duration of the service. The prepayments feature provides a way to reallocate and then unwind these expenses over time through journal automation.

 

# **How to use Prepayments**

   1. Select a **Default prepayment category** by going to **Business settings **>**                     **

**    Connections **>** Manage** next to **Xero/QuickBooks Online **>** Settings**.

 

[](https://downloads.intercomcdn.eu/i/o/weauzzxo/68283710/a37242eb913a8b6572c2a98ad4bc/Screenshot+2025-10-07+at+17_42_07.png?expires=1765161000&signature=b5af8a74c65178ee128c1afed13a4415f8cba3d673561020074f76b717128105&req=1t1tzVv9rTdk2hL085ZhobAT2EMT%2FhKhcgmG%2BScJe8Lz8SjiWxbEbIV%2F7aq7%0AqY9cXJjRQ%2Fezqt5Y%0A) 

   2. In the Costs inbox, open the relevant item. On the [Item details page](https://help.dext.com/en/articles/105676-the-item-details-page), scroll down 

   and set the **Prepaid Expense toggle **to** Yes**.

 

   3. Select a **Prepayment recognition method**. This is mandatory.

 

   4. Select a **Payment start **and **end date** for the prepaid expense. This is mandatory. 

 

[](https://downloads.intercomcdn.eu/i/o/weauzzxo/74189534/52a906b3ba6dd104f703af64c861/Screenshot+2025-11-11+at+15_51_15.png?expires=1765161000&signature=69426e339e7c41e399f227231a5e527971fae269968a89e61b72038c41150df9&req=19FuzVH%2FrzNk2hL085ZhoZDcOwgMBJrxAR06UtFz%2BCBLWJNnI1n3ZnN7QSat%0AmM6gf8lKVH7doFa2%0A) 

When all other item details are complete, the item can then be published to Xero/QuickBooks Online.

 

# **Selecting a Prepayment recognition method**

When setting up a prepayment in Dext, you can choose how the cost is recognised over time by selecting a **Prepayment recognition method** - either **by months** or **by days** - along with the start and end date for the recognition period.

 

## **1. “By months” recognition**

### **How it works:**

The prepayment is **divided** **equally across the number of months in the period**, regardless of the number of days in each month (simplified, even allocation).

 

### **Example:**

- £1,200 insurance paid for **12 months (Jan-Dec)**.

- Dext will recognise and **record a £100 journal per month **in Xero/QuickBooks Online, **regardless** of whether **the month has 28, 30, or 31 days**.

 

## **2. “By days” recognition**

### **How it works:**

The total prepayment amount is **divided by the exact number of days in the coverage period**. Dext then recognises the expense daily and rolls the totals up into the correct month-end.

 

### **Example:**

- £1,200 insurance covers **1 Feb – 31 Jan next year (365 days)**.

- **Each day,** £3.29 is recognised (£1,200 ÷ 365).

- February records £92.12 (28 × 3.29), March £101.90 (31 × 3.29), etc.

This flexibility ensures that your expense recognition aligns precisely with the service period, resulting in clearer, more accurate financial reporting. 

 

# **What happens once the item is published?**

The flow remains consistent with the usual publishing process, but with extra logic layered on top:**​

## 1. Initial Reallocation on Invoice Date**

When the prepayment is published to Xero/QuickBooks Online, Dext creates a **manual journal** that:

- **Debits** the "Prepayments" account

- **Credits** the expense category originally assigned (e.g., "Insurance")

This removes the full amount from the expense account and shifts it to a balance sheet prepayment account.**​

## 2. Monthly Recognition Journals**

Dext then generates a **series of manual journals**, one for each month of the coverage period:

- Dext **posts a series of manual journals, one per month** of the coverage period

- Each journal **credits the "Prepayments" account**

- Each journal **debits the original expense category**

Because Xero and QuickBooks Online don’t provide an API for creating **repeating journals**, these entries are all posted individually at once. This means the full journal schedule is created upfront based on the document&#x27;s date range.

 

# **Tracking Prepayments** 

Maintain visibility on prepayment activity with the **Prepayments tracker**. See more information in this [article](https://help.dext.com/en/articles/394688-tracking-prepayments).

 

Related Articles[Using VAT Return Checks](https://help.dext.com/en/articles/276852-using-vat-return-checks)