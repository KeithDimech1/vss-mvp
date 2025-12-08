---
title: "Using Smart split"
url: "https://help.dext.com/en/articles/416726-using-smart-split"
collection: "Costs & Sales"
source: "dext"
---

Use **Smart Split** to automatically divide transactions from specific suppliers or customers into predefined line items - no manual entry needed.

 

This is especially useful for receipts or invoices that need to be split into different cost categories. For example:

- Splitting goods into **materials** and **postage**

- Splitting utility bills into **tax payable** and **tax reclaimable**

With Smart Split, you can automate this process based on the supplier or customer.

**Important**: You need to be an Admin user to set up Smart split rules. 

 

# **Setting up Smart split rules**

To create a Smart Split rule for a supplier:

- Go to **Costs > Suppliers**

- Click the name of the supplier

- Select **Add a Smart Split Rule**

[](https://downloads.intercomcdn.eu/i/o/weauzzxo/72394616/ae934ce141a797225b9041aaed61/image.png?expires=1765161000&signature=f9e2cde65247a647516f32350b9854d63fbaaefd0e58d62848f71c917af7cd19&req=19dszFz8rTFk2hL085ZhoRNyFhTOmfMw8Wc5YADKkIHvOCWx7qp7%2F7DjIas6%0AxgSKOZ3LmYhyYeFl%0A)**Tip**: For customers, follow the same steps under **Sales > Customers**

This opens the Smart Split setup window, where you can choose between two types of rules:

 

## **Fixed amount rules**

- Specify an exact amount

- Assign a description and category

- A matching line item is created for every transaction

## **Percentage rules**

- Specify a percentage of the total

- A line item is created using that percentage, with a description and category

[](https://downloads.intercomcdn.eu/i/o/weauzzxo/72394875/6c0a2528a8a446c120f3e6cc88d9/image.png?expires=1765161000&signature=61435ac6e9a4932b35001de7c5fca6bf96c476de3707979f46a10e5625f3d94a&req=19dszFzyqzJk2hL085ZhoefKQUZgPBl1i1TTnSfbTqqE5091e3uIFF92a8cV%0Aq85QXT9HnSTN4EvJ%0A)**Tip**: You can use both fixed and percentage rules together. Fixed amount rules are applied first, then percentage rules.

 

# **Example Smart split**

Let’s say you want to split every transaction from a supplier like this:

- £200 to **Rent**

- £100 to **Phone**

- £150 to **Maintenance**

- Remaining amount (automatically calculated to reach 100%)

Smart Split will apply these rules to all current and future transactions from that supplier.

 

[](https://downloads.intercomcdn.eu/i/o/weauzzxo/72395019/e40747d13db6fb520067c45d7c11/image.png?expires=1765161000&signature=9ce1eef3dbfdd590f43c10a4a75b3e7211a8c01c5159c47de1f8876fe0e4ac56&req=19dszF36rT5k2hL085ZhodZQZLk3u1fY%2FX0yCROOlpIUyZXkef1Mi2nopmVn%0A82yMFyrb7OdJGSrh%0A)**Note:** If **Extract line items** is enabled for the supplier, you’ll need to turn it off before adding a Smart Split rule.

 

# **Smart Split rules FAQs**

### **Is there a limit to how many lines I can add?**

Yes - you can add up to **50 lines per supplier or customer**.

 

### **Why didn’t my Smart split rule apply?**

Smart Split only works if we can extract the **Total Amount** from the transaction. If the total is **£0**, the rule won’t apply because the split is based on that value.

 

### **Why did Smart split add an extra line?**

If the sum of the line items doesn’t exactly match the total amount, Smart Split adds a line to balance it out. This ensures the transaction stays valid. However, for totals of **£0**, applying Smart Split could create discrepancies, so it’s skipped.

Related Articles[Using Products and Services in Dext Prepare](https://help.dext.com/en/articles/105674-using-products-and-services-in-dext-prepare)[How to Use Smart Split](https://help.dext.com/en/articles/105942-how-to-use-smart-split)[Using Supplier and Customer rules](https://help.dext.com/en/articles/216125-using-supplier-and-customer-rules)[Rules and Automation in Dext](https://help.dext.com/en/articles/416713-rules-and-automation-in-dext)[Using Products and Services in Dext](https://help.dext.com/en/articles/416755-using-products-and-services-in-dext)