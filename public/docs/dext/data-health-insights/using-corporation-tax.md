---
title: "Using Corporation Tax"
url: "https://help.dext.com/en/articles/339557-using-corporation-tax"
collection: "Data Health & Insights"
source: "dext"
---

**The Corporation Tax check gives an estimate of the corporation tax accrued by a company for the current and previous financial years, based on UK tax rates and using the financial year-end dates in the Xero settings.**

 

 

**Note:** This feature is available for Xero clients only.

 

 

# What you need to know:

 

- This calculation is purely a guide for the user and a reminder to ensure any provision has been correctly reflected within the general ledger for reporting purposes. The calculation does not cover all possible adjustments from the accounting profit.

- The calculation reflects the changes to rates from 1st April 2023 including any marginal relief adjustment. The calculation does not consider any impact of associated companies.

 

 

To run the Corporation Tax check click on your client, in the client account go to **Data Health** in the sidebar, then **Corporation Tax**.

 

[*](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668695/9d2ad559731e23ec6b9fd7a370ba/54987_3a8fbf8966574c1404698a46939db08c.jpg?expires=1765161000&signature=135cc78c27035f130b4d9c9ad97eddcf5b83ee6c494ed11b5b498cddf52e0531&req=1dxpw1D8pTJk2hL085ZhoVoMtEIA4sQ68JcFpeeW5gg3mhbBKG7%2FuNheZTnZ%0AWwDJoY1mI2irUgyy%0A) 

In terms of how the different elements are calculated, Dext starts your team off with some defaults based on the chart of account&#x27;s [Account Type ](https://central.xero.com/s/article/Components-of-an-account-in-your-chart-of-accounts-AU?userregion=true) and the [Reporting Codes ](https://central.xero.com/s/article/Report-codes-for-practices-using-report-templates) provided by Xero.

 

- [**Client-specific configuration**](#Client-specific-configuration)

- [**Capital Allowances**](#Capital-Allowances)

 

 

# Client specific configuration

 

Reporting Codes are applied to all Accounts, and can be customised in Xero by your team. They&#x27;re a great way of achieving reporting consistency across clients that have different chart of account configurations. But you only have visibility of Reporting Codes if you&#x27;re a Xero Partner, and sometimes it is not feasible to configure these for every client you work with.

 

Dext allows you to override the default corporation tax calculation for a client. By clicking on the **cog** beside an element of the corporation tax view you will see what is currently being used for that section of the calculation.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668704/40701d97a580b69a85ec919d9362/54987_0402e75ded876d9564f7ca3e64c654b4.jpg?expires=1765161000&signature=0e2583412e465e3a6cb8f88b6cd95a0a4f325ced7701bbb60304d45c66a9c76d&req=1dxpw1D9rDNk2hL085ZhoRnIwltCZRJvcoN4u29qFpBjc9pY%2BGafUP%2BhcTmq%0A24ZrPpWLDPwEd5vI%0A) 

Clicking an account code will include it in the list that will be excluded and allows you to specify individual account codes to either include or exclude, depending on the section. If you wish to remove a code from the exclusion list click the delete button next to the account code.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668717/23e4684a3947fed23a5019aad55d/54987_a217e4e9699a60ab282e0c3090806eb7.jpg?expires=1765161000&signature=19429c7b6afa3d46c9064bde1cf6ae572260b3bdfac677cf39d3ff75f94e5f64&req=1dxpw1D9rTBk2hL085ZhoXnnHHzerLwxLrTAl14C024gcLtA%2BvnlTFQgOi6Y%0AErc8iGtkyuHK5h7g%0A) 

Specifying account codes means that the default calculation will no longer be used for this client, and Dext will instead use the account codes provided. Upon clicking Save*, the corporation tax will be recalculated for current and previous years based on the new configuration.

 

You can remove account codes from the calculation at any time, and removing all of them will result in the calculation reverting back to using the Dext defaults.

 

 

# Capital Allowances

 

The Capital Allowances section of the Corporation Tax check uses the Fixed Assets register in Xero to look for registered assets purchased during the date period. It specifically looks for:

 

- Fixed Assets with a status of "Registered" (i.e. Draft won&#x27;t count)

- Fixed Assets with a purchase date that falls within the start and end dates you&#x27;ve set at the top of the Corporation Tax view

 

 

**Important:** Please note the calculation assumes AIA and therefore 100% deduction. It does ***NOT*** consider any assets whereby capital allowance may not apply. An example may be the acquisition of a property whereby capital allowances are not available.

 

We&#x27;re working on offering more flexibility to this calculation so that you can exclude/include items.

 

Related Articles[How to Publish Tax Rates to Xero](https://help.dext.com/en/articles/106058-how-to-publish-tax-rates-to-xero)[Corporation Tax](https://help.dext.com/en/articles/109615-corporation-tax)[Using Workflow Checks](https://help.dext.com/en/articles/272705-using-workflow-checks)[Using Fixed Assets Reconciliation](https://help.dext.com/en/articles/276843-using-fixed-assets-reconciliation)[Publishing Tax Rates to Xero](https://help.dext.com/en/articles/339546-publishing-tax-rates-to-xero)