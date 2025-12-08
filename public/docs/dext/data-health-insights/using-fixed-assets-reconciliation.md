---
title: "Using Fixed Assets Reconciliation"
url: "https://help.dext.com/en/articles/276843-using-fixed-assets-reconciliation"
collection: "Data Health & Insights"
source: "dext"
---

# Dext Data Health & Insights connects with the Fixed Assets register in Xero and compares it with the general accounting ledger to highlight where records may be out of sync.

 

 

**Important:** Fixed Assets is available for Xero clients only.

 

This article relates to the enhanced Dext experience. You can access the article for the legacy Dext experience [here](https://help.dext.com/en/s/article/fixed-assets).

 

- [**Fixed Asset Accounts**](#Fixed-Asset-Accounts)

- [**Draft Assets**](#Draft-Assets)

- [**Fixed Asset Account Reconciliation**](#Fixed-Asset-Account-Reconciliation)

- [**Depreciation Account Reconciliation**](#Depreciation-Account-Reconciliation)

- [**Depreciation Run**](#Depreciation-Run)

 

 

# Fixed Asset Accounts

 

Go to a Xero **Client Overview** page then **Data Health** > **Cleanup** > **Fixed assets**.

 

Dext looks at general ledger Accounts that have an Account Type of *FIXED*, and then looks for mapped Asset Types in the Fixed Asset register. Accounts need to be selected as the Fixed Asset Account, Depreciation Expense Account or Accumulated Depreciation Account of at least one Asset Type to be considered "mapped".

 

[*](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668615/c144b1c6affa78bcf003057c012a/54956_23ce5d4c0d336c01b2bc79cff0983b2f.jpg?expires=1765161000&signature=168323ad0bd92e5e71f18dd52bd7b1a3adbbf861209a28025fa40624a49b81c2&req=1dxpw1D8rTJk2hL085ZhoVnHOphQvFSI%2BlxeVTtYlkNs3tG5ZRvkoAWc5C2q%0AGCcdBvNfPbi1e3wd%0A) 

Dext then checks the balance of any unmapped Accounts - if any are non-zero then this should be considered a genuine issue that needs immediate attention.

 

 

# Draft Assets

 

Dext searches the fixed asset register for draft assets and lists them here for convenience. This section is a good place to start if the asset types are not reconciling in the section above.
​

 

 

# Fixed Asset Account Reconciliation

 

This section cycles through all of the accounts in Xero&#x27;s general ledger that are specified as the Fixed Asset Account* in the Fixed Assets register. It compares their balance with the combined totals of the *Purchase Price* of all assets associated with it, up to the Reporting Date, and highlights any that don&#x27;t match. You can expand each Asset type to compare transaction history of the Account with the Asset activity.
​

 

 

# Depreciation Account Reconciliation

 

Similar in logic to the Fixed Asset Account Reconciliation, this section cycles through all of the accounts in Xero&#x27;s general ledger that are specified as the *Accumulated Depreciation Account* in the Fixed Assets register. It compares their balance with the combined totals of the "Depreciation Value" of all assets associated with it, up to the Reporting Date, and highlights any that don&#x27;t match. The Depreciation Value is a calculation of the difference between the *Purchase Price* and *Accounting Book Value* of an asset.
​

 

 

# Depreciation Run

 

This simple check compares the Reporting Period specified at the top of the insight with the "Last Depreciation Date" in the Fixed Asset Register, and shows an error if they don&#x27;t match.

 

Related Articles[Get started setting up Workflow Templates](https://help.dext.com/en/articles/106292-get-started-setting-up-workflow-templates)[Fixed Assets](https://help.dext.com/en/articles/109616-fixed-assets)[Workflow Checks](https://help.dext.com/en/articles/109620-workflow-checks)[Using Workflow Checks](https://help.dext.com/en/articles/272705-using-workflow-checks)[Using Bank Reconciliation](https://help.dext.com/en/articles/276845-using-bank-reconciliation)