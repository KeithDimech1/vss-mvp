import { ActionMetadata, ActionQuestion } from './types';

export const action1Questions: ActionQuestion[] = [
  // ============================================================================
  // PART 1: LITHOSURFER - THREE-TIER ACCESS MODEL
  // ============================================================================

  {
    id: 'lithosurfer_overview',
    section: '1. LithoSurfer: Three-Tier Model',
    question: 'LithoSurfer Three-Tier Overview',
    type: 'info',
    helpText: `We propose adapting LithoSurfer to have three levels of tiered user access:

**LithoSurfer FREE**
• Purpose: Base offering for anyone to sign up and explore the platform
• Access: All free LithoData (view and interact), restricted tools only
• Restrictions: Cannot upload private data, no API access, no automated cleaning
• Target Users: Individual explorers, students, hobbyists, evaluation users
• Pricing: FREE

**LithoSurfer PRO** (Per-Seat License)
• Purpose: Professional users who need to upload and manage their own data
• Access: All Free features PLUS upload limited private data, unlimited free data uploads
• Features: More advanced tools, discounted LithoData pricing, API access, automated LithoClean
• Private Data Limit: Quota-based (e.g., 10GB, 1000 samples, or 50 boreholes)
• Target Users: Small exploration companies, consulting firms, researchers, individual professionals
• Pricing: $1K-10K per seat annually

**LithoSurfer ENTERPRISE** (Custom)
• Purpose: Large organizations needing custom solutions and unlimited data
• Access: All Pro features PLUS custom private data limits, custom platform skin/branding
• Features: Dedicated cleaning & mining credits, greater LithoData discounts, white-label options, SLA guarantees
• Target Users: Major mining companies, government agencies, large consulting firms
• Pricing: Custom quotes ($25K+ annually)`
  },
  {
    id: 'lithosurfer_tier_agreement',
    question: 'Do you agree with this three-tier LithoSurfer model?',
    type: 'radio',
    options: [
      'Yes - this structure makes sense',
      'No - needs significant changes',
      'Partially - agree with concept but needs refinement',
      'Unsure - needs more discussion'
    ],
    helpText: 'This is the foundational question for our product strategy',
    required: true
  },
  {
    id: 'lithosurfer_tier_concerns',
    question: 'Please explain your concerns or suggestions',
    type: 'textarea',
    rows: 3,
    placeholder: 'What concerns do you have? What alternative approaches would you suggest?',
    conditionalOn: {
      questionId: 'lithosurfer_tier_agreement',
      value: ['No - needs significant changes', 'Partially - agree with concept but needs refinement', 'Unsure - needs more discussion']
    }
  },

  // LithoSurfer Tier Details
  {
    id: 'lithosurfer_free_info',
    section: '1.1 LithoSurfer Free',
    question: 'LithoSurfer Free - Quick Summary',
    type: 'info',
    helpText: `**Purpose:** Base offering for anyone to sign up and explore the platform
**Access:** All free LithoData (view and interact), restricted tools only
**Restrictions:** Cannot upload private data, no API access, no automated cleaning
**Pricing:** FREE`
  },
  {
    id: 'lithosurfer_free_tools',
    question: 'What tools, features, and data should Free users have access to?',
    type: 'textarea',
    rows: 4,
    placeholder: 'List available tools (e.g., basic map viewer, simple filtering), data sources (Earthbank, AGN), and any restrictions',
    required: true
  },

  {
    id: 'lithosurfer_pro_info',
    section: '1.2 LithoSurfer Pro',
    question: 'LithoSurfer Pro - Quick Summary',
    type: 'info',
    helpText: `**Purpose:** Per-seat license for professional users who need to upload and manage their own data
**Access:** All Free features PLUS upload limited private data, unlimited free data uploads
**Features:** More advanced tools, discounted LithoData pricing, API access, automated LithoClean
**Pricing:** $1K-10K per seat annually`
  },
  {
    id: 'lithosurfer_pro_price',
    question: 'What should the LithoSurfer Pro annual per-seat price be?',
    type: 'dropdown',
    options: ['$1,000 - $2,500', '$2,500 - $5,000', '$5,000 - $7,500', '$7,500 - $10,000', '$10,000+'],
    helpText: 'Annual per-seat license pricing',
    required: true
  },
  {
    id: 'lithosurfer_pro_data_limit',
    question: 'What private data upload limit should Pro users have?',
    type: 'text',
    placeholder: 'e.g., 10GB, 1000 samples, 50 boreholes, etc.',
    required: true
  },
  {
    id: 'lithosurfer_pro_tools',
    question: 'What tools and features should Pro users have (beyond Free)?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Swath profile, graphical analysis, lithochem, API limits, LithoData discounts, LithoClean services, etc.',
    required: true
  },

  {
    id: 'lithosurfer_enterprise_info',
    section: '1.3 LithoSurfer Enterprise',
    question: 'LithoSurfer Enterprise - Quick Summary',
    type: 'info',
    helpText: `**Purpose:** Custom pricing for large organizations needing custom solutions and unlimited data
**Access:** All Pro features PLUS custom private data limits, custom platform skin/branding
**Features:** Dedicated cleaning & mining credits, greater LithoData discounts, white-label options, SLA guarantees
**Pricing:** Custom quotes ($25K+ annually)`
  },
  {
    id: 'lithosurfer_enterprise_price',
    question: 'What should the base Enterprise annual price start at?',
    type: 'dropdown',
    options: ['$25,000 - $50,000', '$50,000 - $100,000', '$100,000 - $250,000', '$250,000+', 'Custom quotes only'],
    helpText: 'Base price before customization (seats, data, features)',
    required: true
  },
  {
    id: 'lithosurfer_enterprise_features',
    question: 'What enterprise-specific features and benefits should be included?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Lithoplates, dedicated manual LithoClean credits, LithoMine credits, unlimited private data, custom branding, SSO, dedicated infrastructure, SLAs, white-label, etc.',
    required: true
  },

  // Implementation Assessment
  {
    id: 'lithosurfer_implementation',
    section: '1.4 Implementation Requirements',
    question: 'What development work is required to implement this three-tier model?',
    type: 'implementation_table',
    helpText: 'List each major change required and estimated time. Add multiple rows for different work items.',
    placeholder: 'e.g., Frontend: UI permission gates, tier-based feature displays',
    options: ['1-2 weeks', '2-4 weeks', '1-3 months', '3+ months'], // Time dropdown options
    required: true
  },

  // ============================================================================
  // PART 2: LITHODATA - THREE-TYPE DATA MODEL
  // ============================================================================

  {
    id: 'lithodata_overview',
    section: '2. LithoData: Three-Type Model',
    question: 'LithoData Three-Type Overview',
    type: 'info',
    helpText: `We propose organizing all data into three categories:

**LithoData FREE**
• Purpose: Open-source, publicly available geological data
• Sources: Earthbank, AGN, geological surveys, user-contributed open data
• Organization: Grouped by data type (geochemistry, mineralogy) and region
• Access: FREE for all LithoSurfer users (Free, Pro, Enterprise)
• Quality: Validated and cleaned to meet minimum standards

**LithoData PREMIUM** (LithoData's Commercial Data)
• Purpose: LithoData's proprietary commercial data repository
• Organization: Sold by DATA TYPE and REGION (granular access)
• Sales Structure: Users purchase specific types (geochemistry, mineralogy) for specific regions
• Pricing: Variable based on data type, region, and volume
• Discounts: Pro users (10-20% off), Enterprise users (30-40% off)

**LithoData COMMERCIAL** (Third-Party Data Packages)
• Purpose: Allow other users/companies to sell their data through our platform
• Organization: PACKAGE-based (not restricted to type or region)
• Upload Model: Data owners upload packages that may contain multiple data types from any region
• Pricing: Package owners set their own price
• Revenue Model: LithoData takes 30% commission on sales

**LithoData PRIVATE**
• Purpose: Customer's proprietary data uploaded and managed on platform
• Who Can Upload: Pro users (quota-limited), Enterprise users (custom limits)
• Processing: Automated cleaning via LithoClean, manual cleaning available for fee
• Visibility: Private by default, owner can share, publish as Free, or sell as Commercial
• Display: Always shown by data type and region, even if uploaded as packages`
  },
  {
    id: 'lithodata_structure_agreement',
    question: 'Do you agree with this three-type LithoData structure?',
    type: 'radio',
    options: [
      'Yes - this structure makes sense',
      'No - needs significant changes',
      'Partially - agree with concept but needs refinement',
      'Unsure - needs more discussion'
    ],
    helpText: 'This defines how we organize, price, and deliver all geological data',
    required: true
  },
  {
    id: 'lithodata_structure_concerns',
    question: 'Please explain your concerns or suggestions',
    type: 'textarea',
    rows: 3,
    placeholder: 'What concerns do you have? What alternative approaches would you suggest?',
    conditionalOn: {
      questionId: 'lithodata_structure_agreement',
      value: ['No - needs significant changes', 'Partially - agree with concept but needs refinement', 'Unsure - needs more discussion']
    }
  },

  // LithoData Type Details
  {
    id: 'lithodata_free_sources',
    section: '2.1 LithoData Free',
    question: 'What free data sources should we prioritize and what quality standards should we apply?',
    type: 'textarea',
    rows: 4,
    placeholder: 'List organizations, datasets, partnerships to pursue, and validation/cleaning requirements',
    required: true
  },

  {
    id: 'lithodata_premium_info',
    section: '2.2 LithoData Premium (Our Data)',
    question: 'LithoData Premium - Quick Summary',
    type: 'info',
    helpText: `**Purpose:** LithoData's proprietary commercial data repository
**Organization:** Sold by data type and region (granular access)
**Pricing:** Variable based on data type, region, and volume
**Example:** User purchases "Gold Geochemistry" for "Western Australia"`
  },
  {
    id: 'lithodata_premium_agreement',
    question: 'Do you agree with selling LithoData Premium by data type and region?',
    type: 'radio',
    options: [
      'Yes - this makes sense',
      'No - different approach needed',
      'Partially - needs refinement',
      'Unsure - needs discussion'
    ],
    required: true
  },
  {
    id: 'lithodata_premium_concerns',
    question: 'Please explain your concerns or suggestions',
    type: 'textarea',
    rows: 3,
    placeholder: 'What concerns do you have about this pricing/organization model?',
    conditionalOn: {
      questionId: 'lithodata_premium_agreement',
      value: ['No - different approach needed', 'Partially - needs refinement', 'Unsure - needs discussion']
    }
  },
  {
    id: 'lithodata_premium_inventory',
    question: 'List all the DataTypes we have',
    type: 'textarea',
    rows: 5,
    helpText: 'Please list all the data types available in your inventory (e.g., Geochemistry, Isotopes, Geochronology, etc.)',
    placeholder: 'e.g., Geochemistry, Isotopes, Geochronology, Thermochronology, Vitrinite Reflectance, Mineral Deposits',
    required: false
  },
  {
    id: 'lithodata_premium_pricing',
    question: 'How should LithoData Premium be priced?',
    type: 'textarea',
    rows: 5,
    placeholder: 'e.g., Geochemistry, Australia, $25,000 per year',
    required: true
  },

  {
    id: 'lithodata_commercial_info',
    section: '2.3 LithoData Commercial (Third-Party Packages)',
    question: 'LithoData Commercial - Quick Summary',
    type: 'info',
    helpText: `**Purpose:** Allow other users/companies to sell their data through our platform
**Organization:** Package-based (not restricted by type or region)
**Upload:** Data owners upload packages containing any data types from any regions
**Pricing:** Package owners set their own price
**Commission:** LithoData takes 30% of sale price`
  },
  {
    id: 'lithodata_commercial_agreement',
    question: 'Do you agree with allowing third-party data sales through our platform with 30% commission?',
    type: 'radio',
    options: [
      'Yes - this makes sense',
      'No - different approach needed',
      'Partially - needs refinement',
      'Unsure - needs discussion'
    ],
    required: true
  },
  {
    id: 'lithodata_commercial_concerns',
    question: 'Please explain your concerns or suggestions',
    type: 'textarea',
    rows: 3,
    placeholder: 'What concerns do you have about third-party data sales or the commission model?',
    conditionalOn: {
      questionId: 'lithodata_commercial_agreement',
      value: ['No - different approach needed', 'Partially - needs refinement', 'Unsure - needs discussion']
    }
  },
  {
    id: 'lithodata_commercial_implementation',
    question: 'What would be required to implement third-party data package uploads and sales?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Technical requirements: seller dashboard, package upload UI, pricing controls, payment processing, commission tracking, quality review process, etc.',
    required: true
  },

  {
    id: 'lithodata_private_formats',
    section: '2.4 LithoData Private',
    question: 'What upload formats and automated cleaning services should we support?',
    type: 'textarea',
    rows: 4,
    placeholder: 'File formats (CSV, Excel, LAS, shapefiles), automated validation, geocoding, formatting, etc.',
    required: true
  },
  {
    id: 'lithodata_private_manual_cleaning',
    question: 'How should manual LithoClean services be priced?',
    type: 'dropdown',
    options: ['Per hour', 'Per data point/record', 'Per customer/project', 'Per dataset', 'Combination of pricing models', 'Other'],
    required: true
  },
  {
    id: 'lithodata_private_manual_cleaning_explanation',
    question: 'Explain your pricing model choice',
    type: 'textarea',
    rows: 3,
    placeholder: 'Provide details on rates, structure, and rationale (e.g., "$200-300/hour for complex datasets", "Tiered per-record pricing based on volume", etc.)',
    required: true
  },
  {
    id: 'lithodata_private_security_upgrades',
    question: 'What security upgrades would we need to implement private data storage?',
    type: 'textarea',
    rows: 3,
    placeholder: 'e.g., End-to-end encryption, access controls, audit logs, compliance certifications (SOC2, ISO27001), etc.',
    required: true
  },
  {
    id: 'lithodata_private_contractual_updates',
    question: 'What contractual updates would be required?',
    type: 'textarea',
    rows: 3,
    placeholder: 'e.g., Data ownership agreements, privacy policies, SLAs, liability clauses, NDA requirements, etc.',
    required: true
  },
  {
    id: 'lithodata_private_technology_upgrades',
    question: 'What technology upgrades would be needed?',
    type: 'textarea',
    rows: 3,
    placeholder: 'e.g., Database isolation, backup systems, user authentication, API security, infrastructure scaling, etc.',
    required: true
  },
  {
    id: 'lithodata_private_ux_upgrades',
    question: 'What UX/interface upgrades would be required?',
    type: 'textarea',
    rows: 3,
    placeholder: 'e.g., Private workspace UI, upload interfaces, data management dashboard, access control settings, etc.',
    required: true
  },

  // Implementation Assessment
  {
    id: 'lithodata_implementation',
    section: '2.5 Implementation Requirements',
    question: 'What development work is required to implement this data model?',
    type: 'implementation_table',
    helpText: 'List each major change required and estimated time. Add multiple rows for different work items.',
    placeholder: 'e.g., Database: Schema changes for data types and permissions',
    options: ['1-2 weeks', '2-4 weeks', '1-3 months', '3+ months'],
    required: true
  },

  // ============================================================================
  // PART 3: LITHOBUILD - CONSULTING & DEVELOPMENT
  // ============================================================================

  {
    id: 'lithobuild_overview',
    section: '3. LithoBuild: Consulting & Development',
    question: 'LithoBuild Overview',
    type: 'info',
    helpText: `LithoBuild is our consulting and custom development service line:

**Nature:**
• Project-based work (NOT a product)
• Only operational when we have paying customers
• Examples: CSIRO isotopes.au, AGN development work

**Current Status:**
• Adrian contract: $175,000 every 3 months ($700K/year)
• This revenue currently funds LithoSurfer and LithoData development
• All AGN work is considered a Build project

**Strategic Role:**
• Provides cash flow to fund product development
• NOT the long-term focus of the business
• Should sunset as LithoSurfer and LithoData revenue grows

**Key Questions:**
• How do we price Build projects in the future?
• How does Build revenue fund Surfer and Data development?
• What % of company capacity should Build consume?
• What's the sunset timeline and strategy?`
  },
  {
    id: 'lithobuild_pricing_rates',
    question: 'How should LithoBuild projects be priced? (Include hourly rates by role)',
    type: 'textarea',
    rows: 5,
    placeholder: `Example:
• Junior Developer: $150-200/hr
• Senior Developer: $200-300/hr
• Solution Architect: $300-400/hr
• Project-based pricing, retainer models, minimum engagement terms, etc.`,
    required: true
  },
  {
    id: 'lithobuild_funding_model',
    question: 'How should LithoBuild revenue fund LithoSurfer and LithoData development?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Allocation percentages, dedicated dev time, cross-project resource sharing, etc.',
    required: true
  },
  {
    id: 'lithobuild_capacity_limits',
    question: 'What % of company capacity should LithoBuild consume?',
    type: 'dropdown',
    options: ['10-25% (minimal)', '25-50% (moderate)', '50-75% (significant)', '75%+ (majority)'],
    helpText: 'This should decline over time as products grow',
    required: true
  },
  {
    id: 'lithobuild_project_criteria',
    question: 'What criteria should we use for accepting future Build projects?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Strategic value, minimum revenue threshold, alignment with core business, customer profile, etc.',
    required: true
  },
  {
    id: 'lithobuild_future_strategy',
    question: 'Where can LithoBuild services provide value in the future? What types of build projects should we pursue, or should we shut it down entirely?',
    type: 'textarea',
    rows: 5,
    placeholder: 'Consider: strategic build projects we should focus on, types of work that align with our core business, potential jobs to contract out, or reasons to sunset the service entirely.',
    required: true
  },
  {
    id: 'lithobuild_contracting_opportunities',
    question: 'Are there specific build projects we should contract out to partners?',
    type: 'textarea',
    rows: 3,
    placeholder: 'e.g., Specialized development work, infrastructure projects, services better handled by external teams, etc.',
    required: false
  },

  // ============================================================================
  // PART 4: CROSS-PRODUCT INTEGRATION & STRATEGY
  // ============================================================================

  {
    id: 'integration_model',
    section: '4. Integration & Overall Strategy',
    question: 'How should LithoSurfer tiers and LithoData types integrate?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Access permissions, purchase flows, data visibility, discounting structures, bundling opportunities, etc.',
    required: true
  },
  {
    id: 'revenue_projections',
    question: 'Revenue projections for Years 1 & 2 by product line',
    type: 'textarea',
    rows: 6,
    placeholder: `Year 1:
• LithoSurfer Free: $0
• LithoSurfer Pro: $50K
• LithoSurfer Enterprise: $100K
• LithoData Commercial: $30K
• LithoBuild: $700K

Year 2:
[same format]`,
    required: true
  },
  {
    id: 'implementation_priority',
    question: 'What should the implementation priority and phasing be?',
    type: 'textarea',
    rows: 5,
    placeholder: 'Which tiers/features to build first, MVP scope, phased rollout plan, milestones, etc.',
    required: true
  },
  {
    id: 'market_validation',
    question: 'How should we validate this model with customers before building?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Customer interviews, pricing surveys, beta program, early access, pilot customers, etc.',
    required: true
  },

  // Additional Considerations
  {
    id: 'additional_notes',
    section: '5. Additional Considerations',
    question: 'Any additional thoughts, concerns, or suggestions?',
    type: 'textarea',
    rows: 5,
    placeholder: 'Competitive threats, risks, opportunities, questions not covered above, alternative approaches, etc.'
  }
];

export const action1Metadata: ActionMetadata = {
  actionNumber: 1,
  actionSlug: 'products-services',
  title: 'Three-Tier Product Strategy: LithoSurfer, LithoData & LithoBuild',
  description: 'Strategic discussion to define our three-tier model: LithoSurfer (Free/Pro/Enterprise), LithoData (Free/Commercial/Private), and LithoBuild (consulting). Determine pricing, features, implementation requirements, and timelines for each tier.',
  priority: 'IMMEDIATE',
  owner: 'Keith (Management Team)',
  questions: action1Questions
};
