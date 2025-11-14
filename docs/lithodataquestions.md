## 2. LithoData: Three-Type Model Overview
We propose organizing all data into three tiers:
LithoData FREE
•
Purpose: Open-source, publicly available geological data
•
Sources: Earthbank, AGN, geological surveys, user-contributed open data
•
Organization: Grouped by data type (geochemistry, mineralogy) and region
•
Access: FREE for all LithoSurfer users (Free, Pro, Enterprise)
•
Quality: Validated and cleaned to meet minimum standards
LithoData COMMERCIAL
(Two Business Models)
This tier includes paid commercial data with two distinct models:
Model 1: Premium
(LithoData's Commercial Data)
•
Purpose: LithoData's proprietary commercial data repository
•
Organization: Sold by DATA TYPE and REGION (granular access)
•
Sales Structure: Users purchase specific types (geochemistry, mineralogy) for specific regions
•
Pricing: Variable based on data type, region, and volume
•
Discounts: Pro users (10-20% off), Enterprise users (30-40% off)
Model 2: Exchange
(Third-Party Data Marketplace)
•
Purpose: Allow other users/companies to sell their data through our platform
•
Organization: PACKAGE-based (not restricted to type or region)
•
Upload Model: Data owners upload packages that may contain multiple data types from any region
•
Pricing: Package owners set their own price (different cost per package)
•
Revenue Model: LithoData takes 30% commission on sales
LithoData PRIVATE
•
Purpose: Customer's proprietary data uploaded and managed on platform
•
Who Can Upload: Pro users (quota-limited), Enterprise users (custom limits)
•
Processing: Automated cleaning via LithoClean, manual cleaning available for fee
•
Visibility: Private by default, owner can share, publish as Free, or sell as Commercial
•
Display: Always shown by data type and region, even if uploaded as packages
Do you agree with this three-type LithoData structure?*
This defines how we organize, price, and deliver all geological data

Yes - this structure makes sense

No - needs significant changes

Partially - agree with concept but needs refinement

Unsure - needs more discussion
## 2.1 LithoData Free
What free data sources should we prioritize and what quality standards should we apply?*
I think we should be focusing on government datasets - whatever we can get our hands on. large bulk data - the benefit of this is we can get more data points in, plus we can show the geosurverys what we can do. We will need to check permissions etc - but seems like the best way to get more data in that is public - quickly.
2.2 LithoData Commercial - Model 1: Premium
Purpose:
LithoData's proprietary commercial data repository
Organization:
Sold by data type and region (granular access)
Pricing:
Variable based on data type, region, and volume
Example:
User purchases "Gold Geochemistry" for "Western Australia"
Note:
This is one of two business models within the Commercial tier
Do you agree with selling LithoData Premium by data type and region?*

Yes - this makes sense

No - different approach needed

Partially - needs refinement

Unsure - needs discussion
List all the DataTypes we have
Please list all the data types available in your inventory (e.g., Geochemistry, Isotopes, Geochronology, etc.)
Geochemistry, Isotopes, Geochronology, Thermochronolgy, Vitrinite, Mineral Deposits
How should LithoData Premium be priced?*
I think we should have set prices for Region and DataType, if we wanted to be even more complicated we could go down to subregion (i.e Western Australia vs Queensland, in the Australian Region) but this is probably not worth it for MVP.
## 2.3 LithoData Commercial - Model 2: Exchange
Purpose:
Allow other users/companies to sell their data through our platform
Organization:
Package-based (not restricted by type or region)
Upload:
Data owners upload packages containing any data types from any regions
Pricing:
Package owners set their own price (different cost per package)
Commission:
LithoData takes 30% of sale price
Note:
This is the second business model within the Commercial tier
Do you agree with allowing third-party data sales through our platform with 30% commission?*

Yes - this makes sense

No - different approach needed

Partially - needs refinement

Unsure - needs discussion
What would be required to implement third-party data package uploads and sales?*
30% i pulled out of my bum - but it could be a case by case basis - if we have a desire to have thier data we can make a seperate agreement. It definetly should be done by package though. We could even pay them for it in the future and make it part of our LithoData Premium, or have a rental model if we think there is value.
2.4 LithoData Private
What upload formats and automated cleaning services should we support?*
We should have as many ingestions features from existing software and all big national and international lab output files - accessible via LithoSurfer Pro. This will make the ingestion quite simple. for more complex data we will need to undertake a manual process. Massive Question - how much do we care about the QAQC of private data??
How should manual LithoClean services be priced?*

Combination of pricing models
Explain your pricing model choice*
I think simply we need to know the data quality before we can price? but in the end we have a per day rate for LithoClean
What security upgrades would we need to implement private data storage?*
Need vinko or moritz to figure this out - most major companies must have SSO for security.
What contractual updates would be required?*
Would need secure contracts between both parties - we cant be blamed for them making data public - perhaps there is no way to make data public without discussing with us.
What technology upgrades would be needed?*
We would need to consider if we are allowed to backup private data into our backups? We will need to i guess.
What UX/interface upgrades would be required?*
I think UX changes such as who has access (maybe different departments with BHP cant see each others data). I think that we will need to have private data as packages so can restrict there. Private data needs to have a differnt UX to the current public data method. 
2.5 Implementation Requirements
What development work is required to implement this data model?*
List each major change required and estimated time. Add multiple rows for different work items.
Changes Required
Estimated Time
Adding security such as SSO

1-3 months

Improving or upgrading ingestion pipelines

3+ months

New private data interface

1-3 months

Do we need any database changes? back end RLS or Policies??

2-4 weeks

LithoData Exchange - rebuild schema? UX changes? Financial impacts? 

3+ months

Add More
2.6 Additional Considerations
Any additional thoughts, concerns, or suggestions for LithoData?
I want clarification on the Commercial side of the system - i see Commerical: Exchange as the biggest hurdle and furtherst away from our MVP
