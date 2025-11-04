import { ActionMetadata, ActionQuestion } from './types';

export const action2Questions: ActionQuestion[] = [
  // Overview
  {
    id: 'lithodata_overview',
    section: '2. LithoData: Three-Type Model Overview',
    question: 'LithoData Three-Type Overview',
    type: 'info',
    helpText: `We propose organizing all data into three tiers:

**LithoData FREE**
• Purpose: Open-source, publicly available geological data
• Sources: Earthbank, AGN, geological surveys, user-contributed open data
• Organization: Grouped by data type (geochemistry, mineralogy) and region
• Access: FREE for all LithoSurfer users (Free, Pro, Enterprise)
• Quality: Validated and cleaned to meet minimum standards

**LithoData COMMERCIAL** (Two Business Models)
This tier includes paid commercial data with two distinct models:

**Model 1: Premium** (LithoData's Commercial Data)
  • Purpose: LithoData's proprietary commercial data repository
  • Organization: Sold by DATA TYPE and REGION (granular access)
  • Sales Structure: Users purchase specific types (geochemistry, mineralogy) for specific regions
  • Pricing: Variable based on data type, region, and volume
  • Discounts: Pro users (10-20% off), Enterprise users (30-40% off)

**Model 2: Exchange** (Third-Party Data Marketplace)
  • Purpose: Allow other users/companies to sell their data through our platform
  • Organization: PACKAGE-based (not restricted to type or region)
  • Upload Model: Data owners upload packages that may contain multiple data types from any region
  • Pricing: Package owners set their own price (different cost per package)
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

  // LithoData FREE
  {
    id: 'lithodata_free_sources',
    section: '2.1 LithoData Free',
    question: 'What free data sources should we prioritize and what quality standards should we apply?',
    type: 'textarea',
    rows: 4,
    placeholder: 'List organizations, datasets, partnerships to pursue, and validation/cleaning requirements',
    required: true
  },

  // LithoData COMMERCIAL - Model 1: Premium
  {
    id: 'lithodata_premium_info',
    section: '2.2 LithoData Commercial - Model 1: Premium',
    question: 'Commercial Model 1: Premium (LithoData\'s Data)',
    type: 'info',
    helpText: `**Purpose:** LithoData's proprietary commercial data repository
**Organization:** Sold by data type and region (granular access)
**Pricing:** Variable based on data type, region, and volume
**Example:** User purchases "Gold Geochemistry" for "Western Australia"
**Note:** This is one of two business models within the Commercial tier`
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

  // LithoData COMMERCIAL - Model 2: Exchange
  {
    id: 'lithodata_commercial_info',
    section: '2.3 LithoData Commercial - Model 2: Exchange',
    question: 'Commercial Model 2: Exchange (Third-Party Marketplace)',
    type: 'info',
    helpText: `**Purpose:** Allow other users/companies to sell their data through our platform
**Organization:** Package-based (not restricted by type or region)
**Upload:** Data owners upload packages containing any data types from any regions
**Pricing:** Package owners set their own price (different cost per package)
**Commission:** LithoData takes 30% of sale price
**Note:** This is the second business model within the Commercial tier`
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

  // LithoData PRIVATE
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

  // Additional Considerations
  {
    id: 'lithodata_additional_notes',
    section: '2.6 Additional Considerations',
    question: 'Any additional thoughts, concerns, or suggestions for LithoData?',
    type: 'textarea',
    rows: 5,
    placeholder: 'Marketplace features, data quality concerns, partnership opportunities, pricing strategies, etc.'
  }
];

export const action2Metadata: ActionMetadata = {
  actionNumber: 2,
  actionSlug: 'lithodata',
  title: 'LithoData: Three-Type Data Strategy',
  description: 'Define the three-type data model (Free, Premium, Commercial, Private) including data inventory, pricing, marketplace features, and implementation requirements.',
  priority: 'IMMEDIATE',
  owner: 'Keith (Management Team)',
  questions: action2Questions
};
