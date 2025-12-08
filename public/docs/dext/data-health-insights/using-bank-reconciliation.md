---
title: "Using Bank Reconciliation"
url: "https://help.dext.com/en/articles/276845-using-bank-reconciliation"
collection: "Data Health & Insights"
source: "dext"
---

# Dext uses a combination of Xero&#x27;s Bank Statement Report data, bank transactions and payments to provide an interactive view across all of an organisation&#x27;s bank accounts.

 

 

Bank Reconciliation is available for Xero clients only. Please see [Unreconciled Transactions](https://help.dext.com/en/s/article/using-unreconciled-transactions) which is available for QuickBooks Online.

 

The format loosely follows Xero&#x27;s Bank Reconciliation Report, distinguishing between outstanding payments, receipts and unreconciled bank statement lines.

 

- [**Bank Account Summary**](#Bank-Account-Summary)

- [**Bank Accounts**](#Bank-Accounts)

- [**Foreign Currency Bank Accounts**](#Foreign-Currency-Bank-Accounts)

- [**All Bank Statements**](#All-Bank-Statements)

 

 

# Bank Account Summary

 

[*](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668639/24759024fbb9fe0b5d014f2d20af/54961_75f41c426fc152359baddea3c21b8cf6.jpg?expires=1765161000&signature=469f84f2fbd1e03491ba8d1662c3aaa08f146dc4f7b1c3060e375d9e9a745b2d&req=1dxpw1D8rz5k2hL085ZhoSj0zxl0u0Vc%2BIjcrHAVzG3puqz9d5BzT%2BQZJB%2Fn%0AR8SlNayi9mmKB%2FTj%0A) 

# Reconciliation Status

 

This is the total number of unreconciled transactions, outstanding payments and outstanding receipts across all bank accounts. Below the summary boxes is also a card for the full Unreconciled Impact* - this card will display the difference between the *Statement Balance* and the *Xero Balance* (you can click on the card for the detail).

 

A quick explanation of how unreconciled transactions is calculated:

 

- When we first build a Xero Clients data we retrieve All Bank Statement Data.

- The way we work out if a Bank Statement line is unreconciled or not is &#x27;using&#x27; a field in this Bank Statement data that states is reconciled &#x27;Yes/No&#x27;

- When we subsequently do sync&#x27;s of a client we *ONLY* retrieve 12 months of data from the date the sync happens, this is to optimise our sync process.

- **Limitation** : If Bank Statement data OLDER than 12 months is changed, we don&#x27;t reflect the change, and therefore need to do a rebuild of the client. If you know you have made changes to transactions older than 12 months please contact our support team. Doing a rebuild is the only way to include older changes as it is treated effectively as a first import. We are exploring ways to correct this in future and will update when we can.

 

# Net Assets

 

The Net Assets figure is a calculated balance of all transactions with the **Account Class** of *ASSET* minus all transactions with the **Account Class** of *LIABILITY*, up the reporting date. This figure is also available as a metric on the [Practice Dashboard](https://help.dext.com/en/s/article/the-practice-insight). Xero Account Classes are shown below:

 

# Cash Position

 

The Cash Position figure is a consolidated statement balance of all bank accounts, on the reporting date set. This figure is also available as a metric on the [Practice Dashboard](https://help.dext.com/en/s/article/the-practice-insight).

 

 

**TIP:** Foreign bank account balances are converted to the base currency to produce this number - use as a guideline only, where this is a factor.

 

# No. of Manual Feeds

 

Dext detects which Bank Accounts are updated with Manual Feeds. The number of manual feeds is displayed in the summary, and those Bank Accounts will also have a small *broken* chain indicator next to their names in the cards below indicating there is no bank feed detected.

 

Bank accounts detected to have a working bank feed will have a small pink *linked* chain indicator next to their names. (You can hover over the indicator for more information.)

 

 

# Bank Accounts

 

Each Bank Account is contained within a card.

 

[*](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668649/242b3beb9f93f6b913f156f100ef/54961_2f9fff02043e4017661543b7852d87c8.jpg?expires=1765161000&signature=f0cf338dd75a9492c382160d81f5d689c005acf30112d7cdba5b24713a27c757&req=1dxpw1D8qD5k2hL085ZhoR9BLIYRlLDOCnIl1VWj5Hr0OU2jTsp0eX97Bs92%0ACl4OY8LNk0wbYstc%0A) 

Expanding this card displays three unreconciled categories; Outstanding Payments*, *Outstanding Receipts* and *Unreconciled Statement Lines*.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668659/2af73eff10c9a319ee2329c11d2e/54961_23f15da6818bcc5a722a1bb581e518b2.jpg?expires=1765161000&signature=ef41d1302a723f0badb62011e854e9062f791cf210bc0439a6ad81c444d8eb51&req=1dxpw1D8qT5k2hL085ZhoakNfLlVWNJ0Ke0%2F%2BXooNzgfFk6q1iamQUIaXqDg%0An8h%2BjV%2FzBP6kQFVJ%0A) 

Expanding one of these categories allows you to see transaction-level detail in a flexible grid view. From each record, you can click straight into Xero to start the reconciliation process. The grid allows you to quickly order by the oldest records (useful if you are approaching month-end), and also see/filter/group the records that are in a "locked" period.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668669/a61b2901b29a66f36c9f709a3aad/54961_7e5e76a0f11701dcb696530b8a789684.jpg?expires=1765161000&signature=e8a03032a35be23415d3b6d519d80e81c04a68c41066fec9fd819cef75b440a7&req=1dxpw1D8qj5k2hL085ZhobrybkrFFF77z0zK7EO0fLXuu5zIMuMttzX9NB77%0A3t4MeEyhA2ZhuBw%2F%0A) 

 

# Foreign Currency Bank Accounts

 

Dext detects when a bank account is in a different currency to the base currency of the organisation, and displays accordingly. There&#x27;s a toggle that allows you to view the reconciliation totals for a bank account in either the native currency of the bank account or the base currency of the organisation.

 

 

**Note:** Dext does not have access to Xero&#x27;s exchange rates, so the base currency calculated balances for a foreign currency may not always totally match up to the report in Xero - use as a guideline only.

 

More about exchange rates in Xero can be found in their [support documentation](https://central.xero.com/s/article/View-exchange-rate-or-conversion-rate).

 

 

# All Bank Statements

 

For Xero clients you can view all bank account activity, bank transactions in the **All Statements** button at the top of the insight to work in a full sandbox-style grid with all bank statement records, including reconciled and unreconciled transactions.

 

 

**Tip: ** This is a great feature to use if you are searching for a transaction across all bank accounts which is not possible in Xero.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668679/3261d5b8fb42954f8d3984241494/54961_e01efbae9e81a68ef3f591548567b77e.jpg?expires=1765161000&signature=6ef5bbcd7b71fe83ccb656f161d8875876b03477aca8e5541ba102be841b1263&req=1dxpw1D8qz5k2hL085ZhoaopSLjHYmAeLuHqVJRhhE%2FIOQrT5BzfBieSfEv1%0A4UUST42GjQfMbr1L%0A) 

As this is a grid, like all our reporting dashboards, you can group and filter the data. For example, if you want view the data by bank account drag and drop the **Bank Account** column to the **grouping area**. Then use the drop down arrows on the side of each bank account to view all transactions in that account.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668694/4f72625fad9a663a2b72ab0e8aae/54961_97c9d82ba66ed435422a8c1ab4f9f4a6.jpg?expires=1765161000&signature=a8a037c8afd64779d0315213a79769ebc11a9f5c31d0765645fe1c4bb6a1711e&req=1dxpw1D8pTNk2hL085ZhoV%2FSPP%2FDvtujOL1WuVOfS6SZIiBoymqwCjFA3nWm%0ARuSdufp3pb9cWAXY%0A) 

Next, you could drag **Reconciled** column up next to **Bank Account** in the grouping area to view transactions for each bank account as **Yes** or **No** and view the list of transactions under each of those segments.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668702/d47590ad04f720e8f0c157ac1219/54961_5c75fc118678d18124785dcc8b28f0ed.jpg?expires=1765161000&signature=c5cdde49368d8afe7651d0f36acc882026241d5d9be3fa0fe33e10e15a39238c&req=1dxpw1D9rDVk2hL085ZhoY6HdeJCwxUogSktqj1gdbF9bGQ9ewwOM7nS%2FB%2B9%0AcLIFZOB65Lvq3Y%2FL%0A) 

Xero guidance on bank reconciliation can be found [here](https://central.xero.com/s/article/Bank-reconciliation-in-Xero).

 

 

# Next Steps:

 

If you have QBO clients review our help article on how to manage the [Unreconciled Transactions](https://help.dext.com/en/s/article/using-unreconciled-transactions) for these clients.

 

Related Articles[Unreconciled transactions (QBO Only)](https://help.dext.com/en/articles/106148-unreconciled-transactions-qbo-only)[Bank Reconciliation](https://help.dext.com/en/articles/106183-bank-reconciliation)[Using Workflow Checks](https://help.dext.com/en/articles/272705-using-workflow-checks)[Using Unreconciled Transactions (QBO Only)](https://help.dext.com/en/articles/276846-using-unreconciled-transactions-qbo-only)