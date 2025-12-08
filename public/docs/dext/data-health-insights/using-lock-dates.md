---
title: "Using Lock Dates"
url: "https://help.dext.com/en/articles/278973-using-lock-dates"
collection: "Data Health & Insights"
source: "dext"
---

# Lock Dates, or Closing Dates are a feature of Xero and QuickBooks Online respectively designed to help prevent changes to records in periods that have already been reported on or filed.

 

 

# What you need to know:

 

- In [Xero](#Xero) there are two lock dates Reporting Period & End of Year.

- In [Quickbooks Online](#quickbooks-online) there is just one – End of Year.

 

 

# Lock Dates in Xero

 

Dext combines knowledge of a client’s lock dates in Xero with account filing information from Companies House (where available) to help you keep Xero data stable. Below are the settings as they look inside Xero.

 

To set up Lock Dates in Dext navigate to a Data Health & Insights client, then click **Data Health** then **Lock date history. **

 

As you can see in the Xero screenshot below, there are two lock date concepts in Xero.

 

[*](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668703/e6ee870603420bcc890bc6e05b0e/55176_0ec493188c10f8c027490a6e29ceccb6.jpg?expires=1765161000&signature=1853b48b4eac3ca5512a47bf084ec87572e6dc77400198acd006860df8884000&req=1dxpw1D9rDRk2hL085ZhoWunHQMK6MiWUk%2B6xd32IAE%2BE2X1rVQ2y3zTC5C5%0AQb5BHNwAIViuukYX%0A) 

Xero do not give them specific names, but in Dext we define them as:

 

- **Reporting Period Lock Date** (the first one in Xero): this lock date usually tracks your monthly or quarterly reporting period. Records older than this lock date shouldn’t usually* be altered, but since the financial year may still be active then this may still happen – but only advisors should be able to alter.

- **End of Year Lock Date** (the second one in Xero): this is the date at which the last filed company’s accounts were made up to. No changes should be made to records beyond this date. The implications of changing this are usually more severe.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668710/d576a22634d585e44290e2a061f3/55176_47975d9e6c57dbd35d1d8ecdd4853d62.jpg?expires=1765161000&signature=7a32e3d79c990b2a5bd56f1a0c4962a1bb9473f9389b8929da3ab0e056562234&req=1dxpw1D9rTdk2hL085ZhofkWg68%2FPtIwM9BrRvM76fRzEvfCQw%2B5ycUOqrxS%0ABXoAjnMvYVoPOWTj%0A) 

There are some limitations to Xero’s handling of lock dates: anyone with access to a client’s settings in Xero can change the lock dates. There is nothing preventing users from changing the locked period to a date in the past, allowing them to change historical records, and there is no history of this change taking place. If this is problematic for you, Dext has your back…

 

- [Lock Date History](#lock-date-history)

- [End of Year Dates](#end-of-year-dates)

- [Reporting Periods](#reporting-periods)

- [Locked Records in Reporting](#locked-records-in-reporting)

 

 

# Lock Date History

 

Dext tracks changes to Xero’s lock dates. You can view the history of these changes under your clients account by going to **Data Health **and then** Lock date History. **

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668719/c01a3428a5687b2cde4402c56cd3/55176_22e021b3e119878f1daeb738d05fbe94.jpg?expires=1765161000&signature=b15b0dcf37b4a302446342e1ea7c20a86abba15cedeb56163b39df0c74259a25&req=1dxpw1D9rT5k2hL085ZhoZ%2B7K8QZGkQeQnSdTO7%2BBKSXuCQwfRTX6hUitWGK%0A8%2FRIJZCA4OF7N7dD%0A) 

Changes that have shifted the dates backwards are flagged so that you can quickly spot possible issues and dig deeper. Reporting Period backwards changes are flagged with a warning, End of Year backwards changes get an error flag.

 

 

# End of Year Dates

 

If a company registration number is provided in Xero, Dext queries Companies House to get accounts filing information. If the last-filed date in Companies House is more recent than the current End of Year lock date in Xero, Dext will raise a warning.

 

 

# Reporting Periods

 

By encouraging the active maintenance of monthly reporting period lock dates in Xero, your team can reduce the amount of data inconsistencies between Xero and third parties.

 

A typical reporting cycle might be that at the end of each month, the accounting team has two weeks to prepare and submit their end of month reports to a client. Once the reports are submitted the Reporting Period Lock Date would be brought forward in Xero to restrict changes from being made in the closed period.

 

In Dext, you can configure a team-wide **grace period** that indicates how long your team has to close off the month and update the lock dates in Xero.

 

To set a grace period go to **Practice Settings**, **Data Health** and then **Lock Dates. **

 

 

**Note**: The grace period is set at team level rather than client level as explained under Lock Date History settings above at the beginning of this article.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668727/7624c6a5c3cd6d7f3cab095cc8a4/55176_4066b6a5fd05ef3844fcc24beff56767.jpg?expires=1765161000&signature=d05f0367170d34dc6158e23b6e9a5d5a250ae7e4af9af36e7b87845f82b422c3&req=1dxpw1D9rjBk2hL085ZhoUHQ1kpVSOOiAwib9QagKmm8YRTp6RpwqGdYRxfC%0ANuZp1DceUnRM2zM%2B%0A) 

If a client’s Reporting Period Lock Date slips behind the grace period, Dext will show this as an alert on the Data Health Insights page.

 

 

# Locked Records in Reporting

 

The concept of records being in locked periods is carried throughout Dext. Custom Reports, and insights such as **All statements** in **Bank reconciliation** all show whether a particular record falls within a locked period. You can then choose to filter out or sort by this attribute.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668735/ed24c62eec5abf50ce5f3076e64f/55176_314731deb2b35475732cf91f04b8cc36.jpg?expires=1765161000&signature=af2f42cb5a2dfd697abf755eeef99bce7894c464ff7996a87d668634d52bea38&req=1dxpw1D9rzJk2hL085ZhoY%2BvqEhgukl7ouUdFHQWWQeZNWO%2FpBi327%2BCOtKp%0AEMAm3Yzs2VzMzJGd%0A) 

Learn more about [lock dates in Xero](https://central.xero.com/s/article/Set-up-and-work-with-lock-dates).

 

 

# For QuickBooks Online

 

QuickBooks Online only has one lock date option which is **End of Year Lock Date**.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59668743/37b002ef7724c832a4f820827bf5/55176_b1c49e8025332e485421539278ad3269.jpg?expires=1765161000&signature=2987edcfa54123cf5172b290e7ba5a878ffbf84c6dc3ec97513c9f828d2c99fb&req=1dxpw1D9qDRk2hL085ZhodI%2B1L4C%2BiWKFSqpGQYOMXDvu4l8bcmpHxqaIOwh%0As2sNAxR5Gk9l09sd%0A) 

Learn more about [lock dates in QuickBooks Online](https://quickbooks.intuit.com/learn-support/en-uk/help-article/close-books/close-books-quickbooks-online/L59LelyPM_GB_en_GB).

 

 

# Next Steps:

 

- Check that you lock date settings are up to date in your [Xero](https://central.xero.com/s/article/Set-up-and-work-with-lock-dates) or [QBO](https://quickbooks.intuit.com/learn-support/en-uk/help-article/close-books/close-books-quickbooks-online/L59LelyPM_GB_en_GB) File.

 

Related Articles[The document date cannot be before the end of year lock date, currently set at <date>](https://help.dext.com/en/articles/105721-the-document-date-cannot-be-before-the-end-of-year-lock-date-currently-set-at-date)[How to Use Xero Lock Dates in Dext Prepare](https://help.dext.com/en/articles/106059-how-to-use-xero-lock-dates-in-dext-prepare)[Steps to Get Started with Precision](https://help.dext.com/en/articles/106285-steps-to-get-started-with-precision)[Lock Dates](https://help.dext.com/en/articles/109033-lock-dates)[Getting Started with Dext Essentials + Data Health & Insights](https://help.dext.com/en/articles/273219-getting-started-with-dext-essentials-data-health-insights)