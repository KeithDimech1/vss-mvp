---
title: "Using Control Accounts"
url: "https://help.dext.com/en/articles/276844-using-control-accounts"
collection: "Data Health & Insights"
source: "dext"
---

# Control account checks are created based on the account codes selected for each check.

 

They are a visual representation of your PAYE, Net Wages, Pension liability status and update on Directors Loan account balance.

 

To view and reconcile the control account checks, in the client&#x27;s account go to **Data Health** then **Control Accounts**.

 

 

Important: Ensure that you select the relevant account codes to be included in each check by clicking the Settings cog next to the relevant check.

 

- [**PAYE Status**](#paye-status)

- [**Net Wages Status**](#net-wages-status)

- [**Pensions Status**](#pensions-status)

- [**Payroll Alerts Explained**](#payroll-alerts-explained)

- [**Directors Loan Account**](#directors-loan-accounts)

- [**How to Build a Custom Report Using the Practice Insight**](#how-to-build-custom-report-dla)

 

 

# PAYE Status

 

This check balances manual journals against detected payments with PAYE account codes to ensure a correct PAYE status at a point in time. For Xero integrations, by default, the check calculates the PAYE control account balance based on account codes found under the reporting code ***LIA.CUR.TAX.OTH*.**

 

Expanding the check shows the detailed grid of PAYE transaction history for the last 6 months.

 

 

**Remember**: You can change the account codes used by clicking the small cog next to the card title, where Dext will suggest a number of account codes for easy setup.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668621/43ed54923dc4538ee54cf537ca3b/54959_a4d0c070b10db1da701a4f12be1f9636.jpg?expires=1765161000&signature=f569c6c54b6a1e52996c86f64a37d945d5122e81eb45d3baa4b4016c7d5e8143&req=1dxpw1D8rjZk2hL085ZhoS0A7mj8Lc99Rx8YfHw9HPI58g0hqNCOlFcPQ8ov%0AQQzUqIjU6KQbI3s2%0A) 

 

# Net Wages Status

 

This check balances manual journals against detected payments with Net Wages account codes, to ensure that it reconciles to 0 or the balance is as expected.

 

 

**Note**: The balance may reflect your current liability if you are reviewing this check before the liability has been paid to HMRC. If this is the case then this account would be correct. If you are looking for a 0 balance you may need to adjust the **Reporting Date** at the top of the page to when you expect the liability to have been paid (ie 15th of the month).

 

Expanding the check shows a chart of money in and money out, and the detailed grid of Net Wages transaction history for the last 6 months.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668633/c0a2c6f1ada3806e98935dca8414/54959_898335379d0575716170f2f50cb8a6eb.jpg?expires=1765161000&signature=79c936b44f609ee787cc2b101f79b7b1051b7d0b273a150bdebe15fbdff5c9ae&req=1dxpw1D8rzRk2hL085ZhoW5naztekAPPsMQKQ3extO0b3xwxFWhce4RvMp4m%0A5GAGILhPmdkYwApq%0A) 

 

# Pensions Status

 

This check balances manual journals against detected payments with Pensions account codes, to ensure that it reconciles to 0 or the balance is as expected.

 

Expanding the card shows a chart of money in and out of the control account, and the detailed grid of Pensions transaction history for the last 6 months.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668644/7bca769dfb98af9511232453caa6/54959_8e3a7fb5a2e3ff959aba3167956ca900.jpg?expires=1765161000&signature=205e92ffe874ba5a6dcaf7d10c49391840632f4f73aadabe6ab4065373f4751c&req=1dxpw1D8qDNk2hL085ZhoX%2ByXIf3%2BIq3UTnbpUQb5qUUMaDOiKU1SbeDD%2BDS%0A16G3%2FnqMH76EyRdc%0A) 

 

# Payroll Alerts Explained

 

- **Green** = All is well: if the Control Account balance is 0 and there is a Manual or GL Payroll Journal present in the last complete month

- **Green** = All is well: the Control Account balance is equal to the amount posted in the Manual or GL Payroll Journal(s) in the last complete month, and (if relevant) the snapshot date is well in advance of the HMRC Deadline

- **Yellow** = Warning: Contol Account and Journals balance, but a payment due date is approaching

- **Red** = No Manual or GL Payroll Journal found in the last complete month

- **Red** = No payment detected, and a payment deadline is past due

- **Red** = Control Account balance is non-zero and does not reconcile with balance of Manual or GL Payroll journals

 

 

**Note**: if no journals are posted or payments detected the reconciliation status will show as &#x27;no&#x27;.

 

 

# Directors Loan Account

 

A Directors Loan is allowable in a UK business only up to £10,000; once the loan is over £10,000 the business is liable to high tax charges. This represents a significant pay point for the SME, and therefore a key area for accountants to advise. Accountants should therefore keep an eye on the DLA throughout the year. To help you with this, Dext creates an alert when a DLA exceeds the £10,000 mark.

 

As per the other control accounts, Dext will show a graph of the history of the control account as well as the journals and payments detected in the previous month.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668656/e31c00d5ca49b5958f863812668a/54959_bb83866d76f9ba01ad1ad534fd345b51.jpg?expires=1765161000&signature=2f413e3864b19db7a4c3a6a001700338f117dbb0100386f2b83285d840ebcc07&req=1dxpw1D8qTFk2hL085Zhoe40lVeJ8myXvDSafmVIOg9t5Y43JC7PEbyriLCA%0ABvrY%2BtPHXIbCAv1S%0A) 

The alert level relates to the extent to which the DLA is overdrawn:

 

- If the DLA is overdrawn over the limit of £10,000, Dext will show a **RED** alert.

- If the DLA is overdrawn below £10,000, Dext will show an **AMBER** warning.

- If the DLA is not overdrawn, with a positive balance, Dext will show a **GREEN** check.

 

 

**Note**: To monitor multiple DLA accounts, you can select multiple account codes for this check, and each will appear as a separate card within the check with its own graph.

 

 

# How to build a Custom Report using Practice Insight for DLA Account Review

 

Clearing the Insight

 

- On the practice level, go to **Insights** then **Practice**.

- Clear the insight by unticking all the columns selected on the right hand side of the board under Columns.

 

 

**TIP**: check that all the boxes are checked then in the column list you can deselect **ALL** by removing the tick in the checkbox next to the search bar. Sometimes there are a couple that are unticked by default.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668665/f0a911955b671133e42e9e8424ae/54959_7cbe58199de1c2f59e1a13348a9d92a9.jpg?expires=1765161000&signature=a5fa58587f827df7210d11ec2585e9097a19c822bb7bf86b853223c0c6e6689f&req=1dxpw1D8qjJk2hL085ZhoY4XdIU8lu71ckV3QEPJgn3fMJiTK%2Fvr7Woa1GKU%0A%2F2Tb%2BSuf7TW156ua%0A) 

- Once you have cleared the insight you can start to select the accounts you want to create a report showing DLA accounts.

 

Building the Custom Insight

 

Select the following from the Columns tab:

 

Under **General** tick;

 

- Client Name

- Health Score

- Year End

 

Under **Insights**;

 

- Directors Loan Accounts

- Dividends Detected

- Net Assets

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668674/185380ea7b54a12c8bc624588538/54959_1696db4238064b63c3d3276b136cdad2.jpg?expires=1765161000&signature=454fab15302abd9b4706c7c90c2deea44f7d2dc9bf8759afc209d33a07cf0302&req=1dxpw1D8qzNk2hL085ZhoVI7Pn2V%2BwCzrPWHh0WTh0scSDFZcKgy3UhDmfUW%0AU4UfKSqGKO6OGNOV%0A) 

**Saving the Custom Insight**

 

Once the columns have been selected

 

- Go to **Save** in the top right of the page.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668684/6a463e90f9ec7be13ab1a3ccd8c9/54959_75bf989543e440c90ea84f4c8afd6950.jpg?expires=1765161000&signature=7b31a85ad6c72aa149a8eb739cbb6d37749e811d2b3ab6ee8ee14502b7b5e653&req=1dxpw1D8pDNk2hL085ZhoZlcaqBueUM9T1zg2Ob5%2FchsBRHfXrznvGTrTlBR%0Aq0B9kMDWoZmk70nM%0A) 

- Name the insight (for example, “Overdrawn Directors Loan Account Check”)

- Set the toggle to yes if you’d like to share with your team - this will allow others in Dext to view your report. And when ready, click **Save**.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668693/2d7bdeacc9bfb4420ff7e4cd38f2/54959_b87118c02d98feb3e3418efe7d7930cc.jpg?expires=1765161000&signature=d805f7939da416ef89e8e7e2ed1771a255315b7c015e2869a04f3d05118fe691&req=1dxpw1D8pTRk2hL085Zhoav%2BHMM9WndQYlYaGNnHalEGxUgNjfO%2FM%2BSUripC%0AJDsuqCDTsRd2w5TX%0A) 

 

# Next Steps:

 

Include these checks inside a [Workflow Templates](https://help.dext.com/en/s/article/using-workflow-templates) as part of your standardised processes.

 

Related Articles[Insights Dashboard](https://help.dext.com/en/articles/106248-insights-dashboard)[Control Accounts](https://help.dext.com/en/articles/108732-control-accounts)[Workflow Checks](https://help.dext.com/en/articles/109620-workflow-checks)[Using Workflow Checks](https://help.dext.com/en/articles/272705-using-workflow-checks)[The Data Health Insight](https://help.dext.com/en/articles/273813-the-data-health-insight)