# Products & Services Form Questions

**Extracted from Database:** 2025-12-05
**Source:** VSS Platform Action Forms (Actions 1-3)

This document contains all questions from the Products & Services strategic planning forms, which are divided into three separate actions in the platform:

- **Action 1:** LithoSurfer (Three-Tier Product Strategy)
- **Action 2:** LithoData (Three-Type Data Strategy)
- **Action 3:** LithoBuild (Consulting & Development Strategy)

---

## Action 1: LithoSurfer - Three-Tier Product Strategy

### Section 1: Three-Tier Model Overview

**Q: LithoSurfer Three-Tier Overview** (Info)
> We propose adapting LithoSurfer to have three levels of tiered user access:
>
> **LithoSurfer FREE**
> - Purpose: Base offering for anyone to sign up and explore the platform
> - Access: All free LithoData (view and interact), restricted tools only
> - Restrictions: Cannot upload private data, no API access, no automated cleaning
> - Target Users: Individual explorers, students, hobbyists, evaluation users
> - Pricing: FREE
>
> **LithoSurfer PRO** (Per-Seat Licence)
> - Purpose: Professional users who need to upload and manage their own data
> - Access: All Free features PLUS upload limited private data, unlimited free data uploads
> - Features: More advanced tools, discounted LithoData pricing, API access, automated LithoClean
> - Private Data Limit: Quota-based (e.g., 10GB, 1000 samples, or 50 boreholes)
> - Target Users: Small exploration companies, consulting firms, researchers, individual professionals
> - Pricing: $1K-10K per seat annually
>
> **LithoSurfer ENTERPRISE** (Custom)
> - Purpose: Large organizations needing custom solutions and unlimited data
> - Access: All Pro features PLUS custom private data limits, custom platform skin/branding
> - Features: Dedicated cleaning & mining credits, greater LithoData discounts, white-label options, SLA guarantees
> - Target Users: Major mining companies, government agencies, large consulting firms
> - Pricing: Custom quotes ($25K+ annually)

**Q: Do you agree with this three-tier LithoSurfer model?** (Radio - Required)
- Yes - this structure makes sense
- No - needs significant changes
- Partially - agree with concept but needs refinement
- Unsure - needs more discussion

**Q: Please explain your concerns or suggestions** (Textarea - Conditional)
*Shows if answer is not "Yes"*

---

### Section 1.1: LithoSurfer Free

**Q: LithoSurfer Free - Quick Summary** (Info)
> - Purpose: Base offering for anyone to sign up and explore the platform
> - Access: All free LithoData (view and interact), restricted tools only
> - Restrictions: Cannot upload private data, no API access, no automated cleaning
> - Pricing: FREE

**Q: What tools, features, and data should Free users have access to?** (Selectable Tags - Required)

Available Options:
- Upload Private Data (limited)
- Upload Private Data (unlimited)
- Skins
- CSV Template Ingestion
- Share Data
- View Lithodata Free
- View Lithodata Commercial
- Paleo Reconstruction (one)
- Paleo Reconstruction (all)
- Grid Data
- Swath Profile
- Select Area
- Rock Type
- Analysis Type
- Elevation
- Basemaps
- Geophysics Mapping
- Contour Lines
- Field App
- DOI Minting
- LithoChem Dashboard
- Geochemistry
- Thermochron
- LithoClean Service
- LithoBuild Services
- Support / Training

---

### Section 1.2: LithoSurfer Pro

**Q: LithoSurfer Pro - Quick Summary** (Info)
> - Purpose: Per-seat licence for professional users who need to upload and manage their own data
> - Access: All Free features PLUS upload limited private data, unlimited free data uploads
> - Features: More advanced tools, discounted LithoData pricing, API access, automated LithoClean
> - Pricing: $1K-10K per seat annually

**Q: What should the LithoSurfer Pro annual per-seat price be?** (Dropdown - Required)
- $1,000 - $2,500
- $2,500 - $5,000
- $5,000 - $7,500
- $7,500 - $10,000
- $10,000+

**Q: What private data upload limit should Pro users have?** (Text - Required)

**Q: What tools and features should Pro users have (beyond Free)?** (Selectable Tags - Required)
*Same options as Free, with automatic inheritance from Free tier selections*

---

### Section 1.3: LithoSurfer Enterprise

**Q: LithoSurfer Enterprise - Quick Summary** (Info)
> - Purpose: Custom pricing for large organizations needing custom solutions and unlimited data
> - Access: All Pro features PLUS custom private data limits, custom platform skin/branding
> - Features: Dedicated cleaning & mining credits, greater LithoData discounts, white-label options, SLA guarantees
> - Pricing: Custom quotes ($25K+ annually)

**Q: What should the base Enterprise annual price start at?** (Dropdown - Required)
- $25,000 - $50,000
- $50,000 - $100,000
- $100,000 - $250,000
- $250,000+
- Custom quotes only

**Q: What enterprise-specific features and benefits should be included?** (Selectable Tags - Required)
*Inherits from Free and Pro tiers*

---

### Section 1.4: Implementation Requirements

**Q: What about this plan does not match our "sellables"?** (Textarea - Required)
*Review the Sellables document*

**Q: What are additional tools that could be built to enhance the three tier model?** (Textarea - Required)

**Q: What UX changes are needed to suit Lithosurfer Model?** (Textarea - Required)

**Q: What is our MVP before we can sign up our first customer?** (Textarea - Required)

**Q: What development work is required to implement this three-tier model?** (Implementation Table - Required)
*Columns: Change Description, Time Estimate*
*Time options: 1-2 weeks, 2-4 weeks, 1-3 months, 3+ months*

---

### Section 1.5: Additional Considerations

**Q: Any additional thoughts, concerns, or suggestions for LithoSurfer?** (Textarea - Optional)

---

## Action 2: LithoData - Three-Type Data Strategy

### Section 2: Three-Type Model Overview

**Q: LithoData Three-Type Overview** (Info)
> We propose organizing all data into three tiers:
>
> **LithoData FREE**
> - Purpose: Open-source, publicly available geological data
> - Sources: Earthbank, AGN, geological surveys, user-contributed open data
> - Organization: Grouped by data type (geochemistry, mineralogy) and region
> - Access: FREE for all LithoSurfer users
> - Quality: Validated and cleaned to meet minimum standards
>
> **LithoData COMMERCIAL** (Two Business Models)
>
> *Model 1: Premium (LithoData's Commercial Data)*
> - Purpose: LithoData's proprietary commercial data repository
> - Organization: Sold by DATA TYPE and REGION (granular access)
> - Sales Structure: Users purchase specific types for specific regions
> - Pricing: Variable based on data type, region, and volume
> - Discounts: Pro users (10-20% off), Enterprise users (30-40% off)
>
> *Model 2: Exchange (Third-Party Data Marketplace)*
> - Purpose: Allow other users/companies to sell their data through our platform
> - Organization: PACKAGE-based (not restricted to type or region)
> - Upload Model: Data owners upload packages with multiple data types from any region
> - Pricing: Package owners set their own price
> - Revenue Model: LithoData takes 30% commission on sales
>
> **LithoData PRIVATE**
> - Purpose: Customer's proprietary data uploaded and managed on platform
> - Who Can Upload: Pro users (quota-limited), Enterprise users (custom limits)
> - Processing: Automated cleaning via LithoClean, manual cleaning available for fee
> - Visibility: Private by default, owner can share, publish as Free, or sell as Commercial
> - Display: Always shown by data type and region

**Q: Do you agree with this three-type LithoData structure?** (Radio - Required)
- Yes - this structure makes sense
- No - needs significant changes
- Partially - agree with concept but needs refinement
- Unsure - needs more discussion

**Q: Please explain your concerns or suggestions** (Textarea - Conditional)

---

### Section 2.1: LithoData Free

**Q: What free data sources should we prioritize and what quality standards should we apply?** (Textarea - Required)

---

### Section 2.2: LithoData Commercial - Model 1: Premium

**Q: Commercial Model 1: Premium** (Info)
> - Purpose: LithoData's proprietary commercial data repository
> - Organization: Sold by data type and region (granular access)
> - Pricing: Variable based on data type, region, and volume
> - Example: User purchases "Gold Geochemistry" for "Western Australia"

**Q: Do you agree with selling LithoData Premium by data type and region?** (Radio - Required)
- Yes - this makes sense
- No - different approach needed
- Partially - needs refinement
- Unsure - needs discussion

**Q: Please explain your concerns or suggestions** (Textarea - Conditional)

**Q: List all the DataTypes we have** (Textarea - Optional)

**Q: How should LithoData Premium be priced?** (Textarea - Required)

---

### Section 2.3: LithoData Commercial - Model 2: Exchange

**Q: Commercial Model 2: Exchange** (Info)
> - Purpose: Allow other users/companies to sell their data through our platform
> - Organization: Package-based (not restricted by type or region)
> - Upload: Data owners upload packages containing any data types from any regions
> - Pricing: Package owners set their own price
> - Commission: LithoData takes 30% of sale price

**Q: Do you agree with allowing third-party data sales through our platform with 30% commission?** (Radio - Required)
- Yes - this makes sense
- No - different approach needed
- Partially - needs refinement
- Unsure - needs discussion

**Q: Please explain your concerns or suggestions** (Textarea - Conditional)

**Q: What would be required to implement third-party data package uploads and sales?** (Textarea - Required)

---

### Section 2.4: LithoData Private

**Q: What upload formats and automated cleaning services should we support?** (Textarea - Required)

**Q: How should manual LithoClean services be priced?** (Dropdown - Required)
- Per hour
- Per data point/record
- Per customer/project
- Per dataset
- Combination of pricing models
- Other

**Q: Explain your pricing model choice** (Textarea - Required)

**Q: What security upgrades would we need to implement private data storage?** (Textarea - Required)

**Q: What contractual updates would be required?** (Textarea - Required)

**Q: What technology upgrades would be needed?** (Textarea - Required)

**Q: What UX/interface upgrades would be required?** (Textarea - Required)

---

### Section 2.5: Implementation Requirements

**Q: What development work is required to implement this data model?** (Implementation Table - Required)

---

### Section 2.6: Additional Considerations

**Q: Any additional thoughts, concerns, or suggestions for LithoData?** (Textarea - Optional)

---

## Action 3: LithoBuild - Consulting & Development Strategy

### Section 3: Overview

**Q: LithoBuild Overview** (Info)
> LithoBuild is our consulting and custom development service line:
>
> **Nature:**
> - Project-based work (NOT a product)
> - Only operational when we have paying customers
> - Examples: CSIRO isotopes.au, AGN development work
>
> **Current Status:**
> - Adrian contract: $175,000 every 3 months ($700K/year)
> - This revenue currently funds LithoSurfer and LithoData development
> - All AGN work is considered a Build project
>
> **Strategic Role:**
> - Provides cash flow to fund product development
> - NOT the long-term focus of the business
> - Should sunset as LithoSurfer and LithoData revenue grows
>
> **Key Questions:**
> - How do we price Build projects in the future?
> - How does Build revenue fund Surfer and Data development?
> - What % of company capacity should Build consume?
> - What's the sunset timeline and strategy?

---

### Section 3.1: Pricing Strategy

**Q: How should LithoBuild projects be priced?** (Textarea - Required)
*Include hourly rates by role*

---

### Section 3.2: Resource Allocation

**Q: How should LithoBuild revenue fund LithoSurfer and LithoData development?** (Textarea - Required)

**Q: What % of company capacity should LithoBuild consume?** (Dropdown - Required)
- 10-25% (minimal)
- 25-50% (moderate)
- 50-75% (significant)
- 75%+ (majority)

---

### Section 3.3: Project Selection Criteria

**Q: What criteria should we use for accepting future Build projects?** (Textarea - Required)

---

### Section 3.4: Future Strategy

**Q: Where can LithoBuild services provide value in the future?** (Textarea - Required)

**Q: Are there specific build projects we should contract out to partners?** (Textarea - Optional)

---

### Section 3.5: Additional Considerations

**Q: Any additional thoughts, concerns, or suggestions for LithoBuild?** (Textarea - Optional)
