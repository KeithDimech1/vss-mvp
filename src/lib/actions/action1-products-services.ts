import { ActionMetadata, ActionQuestion } from './types';

export const action1Questions: ActionQuestion[] = [
  // Section 1: Product Portfolio
  {
    id: 'product_portfolio',
    section: 'Product Portfolio Definition',
    question: 'What products/services do we currently offer?',
    type: 'checkbox',
    options: [
      'LithoSurfer (standalone software)',
      'LithoSurfer Max (subscription model)',
      'LithoBuild (contract work)',
      'LithoData packages (curated datasets)',
      'API access',
      'Lab data integration services',
      'Custom development/consulting',
      'Other'
    ],
    helpText: 'Select all products/services that we currently offer or plan to offer',
    required: true
  },
  {
    id: 'product_other',
    question: 'If you selected "Other", please specify',
    type: 'text',
    conditionalOn: {
      questionId: 'product_portfolio',
      value: 'Other'
    }
  },

  // Section 2: LithoSurfer Pricing
  {
    id: 'lithosurfer_base_price',
    section: 'LithoSurfer Pricing Model',
    question: 'What should the base LithoSurfer subscription price be?',
    type: 'currency',
    placeholder: '5000',
    helpText: 'Annual subscription price in USD',
    required: true
  },
  {
    id: 'lithosurfer_target_segment',
    question: 'Who is the primary target customer segment for LithoSurfer?',
    type: 'checkbox',
    options: [
      'Exploration companies',
      'Environmental consulting firms',
      'Laboratory services',
      'Academic/Research institutions',
      'Mining companies',
      'Government agencies'
    ],
    helpText: 'Select all that apply'
  },
  {
    id: 'lithosurfer_pricing_tiers',
    question: 'Should LithoSurfer have pricing tiers?',
    type: 'radio',
    options: ['Yes - multiple tiers', 'No - single price', 'Unsure - needs discussion'],
    required: true
  },
  {
    id: 'lithosurfer_tiers_description',
    question: 'Describe the proposed pricing tiers (features, pricing, target users)',
    type: 'textarea',
    rows: 4,
    placeholder: 'e.g., Basic ($3K/yr) - individual users, Standard ($5K/yr) - small teams, Enterprise ($15K/yr) - unlimited users + support',
    conditionalOn: {
      questionId: 'lithosurfer_pricing_tiers',
      value: 'Yes - multiple tiers'
    }
  },

  // Section 3: LithoSurfer Max
  {
    id: 'lithosurfer_max_features',
    section: 'LithoSurfer Max (Premium Features)',
    question: 'What additional features would justify a premium "Max" subscription?',
    type: 'textarea',
    rows: 4,
    placeholder: 'e.g., AI-powered analysis, priority support, advanced data export, API access, etc.',
    helpText: 'List features that would differentiate Max from standard LithoSurfer'
  },
  {
    id: 'lithosurfer_max_price',
    question: 'Estimated LithoSurfer Max price point (annual)',
    type: 'currency',
    placeholder: '10000',
    helpText: 'Annual subscription in USD'
  },

  // Section 4: LithoData Pricing
  {
    id: 'lithodata_pricing_model',
    section: 'LithoData Pricing',
    question: 'What pricing model should we use for LithoData packages?',
    type: 'radio',
    options: [
      'Per dataset (one-time purchase)',
      'Subscription access (all data)',
      'Hybrid (some free, some paid)',
      'Freemium (basic free, premium paid)',
      'Other/Unsure'
    ],
    required: true
  },
  {
    id: 'lithodata_price_range_min',
    question: 'Minimum price per dataset',
    type: 'currency',
    placeholder: '500',
    helpText: 'For smaller/simpler datasets'
  },
  {
    id: 'lithodata_price_range_max',
    question: 'Maximum price per dataset',
    type: 'currency',
    placeholder: '50000',
    helpText: 'For comprehensive/complex datasets'
  },
  {
    id: 'lithodata_subscription_model',
    question: 'If subscription model, describe the approach',
    type: 'textarea',
    rows: 3,
    placeholder: 'e.g., $2K/month for unlimited access, tiered by data types, regional pricing, etc.',
    conditionalOn: {
      questionId: 'lithodata_pricing_model',
      value: 'Subscription access (all data)'
    }
  },

  // Section 5: LithoBuild Pricing
  {
    id: 'lithobuild_hourly_min',
    section: 'LithoBuild Contract Pricing',
    question: 'Minimum hourly rate for contract work',
    type: 'currency',
    placeholder: '150',
    helpText: 'Per developer hour (USD)'
  },
  {
    id: 'lithobuild_hourly_max',
    question: 'Maximum hourly rate for contract work',
    type: 'currency',
    placeholder: '300',
    helpText: 'For senior/specialized developers (USD)'
  },
  {
    id: 'lithobuild_project_pricing',
    question: 'Project-based pricing approach',
    type: 'textarea',
    rows: 3,
    placeholder: 'e.g., Fixed price for well-defined projects, T&M for research/exploration work, retainer models, etc.',
    helpText: 'How should we price full projects vs hourly work?'
  },
  {
    id: 'lithobuild_sunset_date',
    question: 'When should LithoBuild sunset? (Target date)',
    type: 'date',
    helpText: 'From VSM meeting: Temporary (1-2 years) until data flywheel spins'
  },

  // Section 6: Market Positioning
  {
    id: 'competitive_comparison',
    section: 'Market Positioning',
    question: 'How do we compare to competitors?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Strengths, weaknesses, unique value proposition vs. competitors',
    helpText: 'Consider pricing, features, data volume, user experience, etc.'
  },
  {
    id: 'value_proposition_lithosurfer',
    question: 'LithoSurfer value proposition (why choose us?)',
    type: 'textarea',
    rows: 3,
    placeholder: 'Unique benefits, key differentiators, target customer pain points we solve'
  },
  {
    id: 'value_proposition_lithodata',
    question: 'LithoData value proposition (why buy our data?)',
    type: 'textarea',
    rows: 3,
    placeholder: 'Data quality, coverage, freshness, integration capabilities, etc.'
  },

  // Section 7: Revenue Projections
  {
    id: 'revenue_lithosurfer_year1',
    section: 'Revenue Projections',
    question: 'Expected LithoSurfer revenue - Year 1',
    type: 'currency',
    placeholder: '100000',
    helpText: 'Total revenue from LithoSurfer subscriptions (USD)'
  },
  {
    id: 'revenue_lithosurfer_year2',
    question: 'Expected LithoSurfer revenue - Year 2',
    type: 'currency',
    placeholder: '250000'
  },
  {
    id: 'revenue_lithosurfer_year5',
    question: 'Expected LithoSurfer revenue - Year 5',
    type: 'currency',
    placeholder: '1000000'
  },
  {
    id: 'revenue_lithodata_year1',
    question: 'Expected LithoData revenue - Year 1',
    type: 'currency',
    placeholder: '50000'
  },
  {
    id: 'revenue_lithodata_year2',
    question: 'Expected LithoData revenue - Year 2',
    type: 'currency',
    placeholder: '150000'
  },
  {
    id: 'revenue_lithodata_year5',
    question: 'Expected LithoData revenue - Year 5',
    type: 'currency',
    placeholder: '2000000'
  },
  {
    id: 'revenue_lithobuild_year1',
    question: 'Expected LithoBuild revenue - Year 1',
    type: 'currency',
    placeholder: '500000',
    helpText: 'Contract work revenue (will decrease over time)'
  },
  {
    id: 'revenue_lithobuild_year2',
    question: 'Expected LithoBuild revenue - Year 2',
    type: 'currency',
    placeholder: '300000',
    helpText: 'Should be decreasing as we transition away'
  },

  // Section 8: Bundles & Packages
  {
    id: 'bundle_strategy',
    section: 'Package Deals & Bundles',
    question: 'Should we offer bundled pricing (LithoSurfer + Data + Services)?',
    type: 'radio',
    options: ['Yes - bundles are important', 'No - keep separate', 'Maybe - explore options', 'Unsure'],
    required: true
  },
  {
    id: 'bundle_examples',
    question: 'Describe potential bundle offerings',
    type: 'textarea',
    rows: 4,
    placeholder: 'e.g., "Explorer Pack" - LithoSurfer + 10 datasets ($8K/yr), "Enterprise Bundle" - Max + unlimited data + priority support ($25K/yr)',
    conditionalOn: {
      questionId: 'bundle_strategy',
      value: 'Yes - bundles are important'
    }
  },

  // Section 9: Additional Notes
  {
    id: 'pricing_concerns',
    section: 'Additional Considerations',
    question: 'Any concerns or considerations about the proposed pricing?',
    type: 'textarea',
    rows: 3,
    placeholder: 'Market sensitivity, competitor reactions, customer feedback, risks, etc.'
  },
  {
    id: 'pricing_flexibility',
    question: 'How much pricing flexibility should we allow (discounts, custom deals)?',
    type: 'textarea',
    rows: 3,
    placeholder: 'Early adopter discounts, volume discounts, academic pricing, etc.'
  },
  {
    id: 'additional_notes',
    question: 'Any additional thoughts or suggestions?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Other ideas, concerns, opportunities not covered above'
  }
];

export const action1Metadata: ActionMetadata = {
  actionNumber: 1,
  actionSlug: 'products-services',
  title: 'Products, Services & Pricing',
  description: 'Define product portfolio and pricing framework before adding to utopia.',
  priority: 'IMMEDIATE',
  owner: 'Keith (Management Team)',
  questions: action1Questions
};
