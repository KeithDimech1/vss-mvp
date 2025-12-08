---
title: "Reviewing Multi-Coded Contacts"
url: "https://help.dext.com/en/articles/276849-reviewing-multi-coded-contacts"
collection: "Data Health & Insights"
source: "dext"
---

# Multi-Coded Contacts reviews all invoices and bank transaction line items that are assigned to multiple account and/or tax codes.

 

The majority of the time, these codes *should* be consistent for a given supplier or customer. Sometimes these records are assigned the wrong codes, or coding evolves over time.

 

We’ve crunched the numbers to find these potential mis-codings and you&#x27;ll see them presented in this insight, with helpful links directly to Xero & QuickBooks Online allowing you to amend these where needed.**​

 

- [Selecting the date filters](#Selecting-the-date-filters)

- [Narrowing The Scope](#Narrowing-the-scope)

- [Exclusions](#Exclusions)

- [Setting Exclusions](#Setting-Exclusions)

- [Understanding the Colour-Coding](#Understanding-the-Colour-Coding)

- [Dismissals](#Dismissals)

 

Xero provides a dedicated mechanism for re-coding, and their support documentation on this is [here](https://central.xero.com/s/article/Find-Recode-a-group-of-transaction-lines).

 

 

# Selecting the date filters

 

The Multi-Coded Contacts check allows you to specify two different date filters:

 

Active During**: This is the period where you want to find contacts to assess. Dext will find and evaluate contacts that have been active (i.e. they have transactions) during this time period. For example, this could be your reporting period of the previous month.

 

**Check Transactions Since**: Once Dext finds the active contacts to evaluate, this date refers to how far back in time Dext should look into each Contact&#x27;s transaction history to compare account and tax codes and surface any inconsistencies. For example, if you know that you changed your accounts structure at the start of the year, it doesn&#x27;t make sense to evaluate transaction history before the change, so set this date to be the 1st of January (or whenever you made the change).

 

[*](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668668/05850588eee6c13cdd7657d050b9/54973_3fdd2af4505733a4b0ca3522605f4a47.jpg?expires=1765161000&signature=2f1fc6784f4e3f39d51c79c02bfa80065dbcefb9f5ee06bf3b290f5076db926d&req=1dxpw1D8qj9k2hL085ZhoZHAH7Z1hgGyBmZMLhezHFpercUC%2BeZ1cn%2Fk4ic4%0Av0cv4uMXoD6w14fp%0A) 

 

# Narrowing the scope

 

The Multi-Coded Contacts check gives you access to targeted data cleanup process, with the ability to quickly filter out any suggestions that don&#x27;t make sense for your situation.

 

Filters can be accessed by going to the **filter icon** in the top right of the page. You can filter by:

 

**Direction:** choose to view suggestions related to **Revenue, Expense **or** All**.

 

**Code Type:** choose to view suggestions related to **Account** code anomalies, **Tax** code anomalies or** All**.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668677/0c733e8a74542d00760153ed6aa9/54973_8236d9ceb697dcb1fd740f4fcac50970.jpg?expires=1765161000&signature=f29df073892f6023a68e292528eeacb3cf6fd714ac8e2d61561a183ee99afa63&req=1dxpw1D8qzBk2hL085ZhoRMhWpnSbPqVai5GdQdbu7T8FVYlE1O8bOcD4MoC%0AuLgabBN0JmCboJne%0A) 

 

# Exclusions

 

Typically, transactions with a single contact will only have one associated account code, with a small number of exceptions. However, in some cases, a contact will always have multiple account codes against it, such as a sale to a contact that pays shipping as a separate transaction. Exclusions allow you to specify combinations of account codes that you feel should not be detected as errors for a given client.

 

Contacts that have the combination of account or tax codes included in the Exclusion list will no longer appear as detected Multi-Coded contacts. If a Contact has multiple codes on other transactions they will appear in the multi-coded contacts view, but only the transactions relating to combinations of codes outside the exclusion list will be displayed.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668686/02ddd0240239ffe048ebff9d941e/54973_a1a80772206eb0d89f0e9a8ea1422383.jpg?expires=1765161000&signature=2c7941b635129564835caf5ac16a4bd7250ad2e092ae7cc0d13fed9c1e52b1e1&req=1dxpw1D8pDFk2hL085ZhoTL%2BXiFjWDDm1TdMtLXw7vnd%2B0U5L8KbOdA9Ug%2Fs%0AZd%2FBq6kk0OkH%2Fmpp%0A) 

 

# Setting Exclusions

 

Using the ‘Exclusions’ button at the top of the multi-coded contacts screen, you&#x27;ll be shown a list of current excluded account or tax code combinations.

 

You can use this list to add, edit or remove a tax or account code combination from the exclusions list.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668696/a5de654064b8779ecab0fe90f277/54973_83a0e57190bfb9d8ed163f44bc63d865.jpg?expires=1765161000&signature=6756cc422a14c9cf9cccc4f9e64e12e57469422e2143467347c620de17de6a92&req=1dxpw1D8pTFk2hL085ZhoYDPAdQjW5PqFuaK%2F7xtO77UGnbmhSEPzCpWIMNt%0AVbhKaxU80MH1VCjW%0A) 

To add a combination to the exclusions list, click the ‘add’ button under the account or tax code category. From here you can search for and select the combination of codes you would like to exclude.

 

You must select two or more codes to exclude. This combination of codes will apply as an exclusion across all contacts for that client.

 

Combinations of account or tax codes can be added or removed from the exclusion list at any time from the Multi-Coded contacts tool.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668705/6e192e0c9ed70243196b58ac61c3/54973_00ff11784c81bb02065665eaef81924f.jpg?expires=1765161000&signature=a9da7b0c823d7e55abec4c662c64204653a8e219b0815e13de7da80b9c11f12c&req=1dxpw1D9rDJk2hL085ZhoR7q1MrcWSmx14p%2BlbH0UV42S6UaEgGH0ZoSU39R%0A748fzer1LG4Y6v56%0A) 

 

**Important:** Exclusions only apply at the Client level - any exclusions set for a client will not apply to other clients in the team.

 

 

# Understanding the Colour-Coding

 

Dext adds colour to the transaction rows to provide a clear indication as to which transactions fall into the "Active During" period and which ones are historical:**​

 

 

# Dismissals

 

If there is good reason for the different coding, then you can dismiss the multi-coded alert and it will not show again. Any dismissed alerts can be viewed by selecting dismissed* from the filter at the top of the screen, where you can then review and *undo* any accidental dismissals. Dismissed items do not contribute** to the [Health Score.](https://help.dext.com/en/s/article/using-the-client-health-score)

 

This dismissal applies to a few levels below the contact, taking into account both *direction* (Payable/Receivable) and whether they are *Tax Code* or *Account Code* differences.**​

 

For example, you can dismiss an alert for a contact with differences in receivable account codes, and we won&#x27;t raise any more alerts for additional receivable account codes placed against that contact, but you will still get an alert for that client if we detect multiple *payable* account code differences, or multiple receivable *tax codes*.

 

You can also *Dismiss All***. When you choose this option the following message will appear.

 

[*](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668712/e74f86066dca64d6f6d0cb86737c/54973_2ca699d27ccdfb32bf3d7abd6461df3a.jpg?expires=1765161000&signature=9d2de6bdef45277ac45a82eb6be351e2b4a42a1e2b3105efbfa1e8c72805c88c&req=1dxpw1D9rTVk2hL085ZhoXpVnycCpc7SXdKl9%2F%2FOh9q2YNUGfACKyyV%2FE396%0AFMnYtgDXK4U%2FP6jH%0A) 

Selecting &#x27;confirm&#x27; will action this **Dismiss All*** option. You can switch to the &#x27;dismissed&#x27; view to see dismissed contacts.

 

Related Articles[Multi Coded Contacts](https://help.dext.com/en/articles/106191-multi-coded-contacts)[Contact Defaults](https://help.dext.com/en/articles/106194-contact-defaults)[Reviewing Duplicate Transactions](https://help.dext.com/en/articles/276847-reviewing-duplicate-transactions)[Reviewing Duplicate Contacts](https://help.dext.com/en/articles/276848-reviewing-duplicate-contacts)[Using Contact Defaults](https://help.dext.com/en/articles/276850-using-contact-defaults)