import { ActionMetadata, ActionQuestion } from './types';

export const action3Questions: ActionQuestion[] = [
  // Overview
  {
    id: 'lithobuild_overview',
    section: '3. LithoBuild: Consulting & Development Overview',
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

  // Pricing
  {
    id: 'lithobuild_pricing_rates',
    section: '3.1 Pricing Strategy',
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

  // Funding Model
  {
    id: 'lithobuild_funding_model',
    section: '3.2 Resource Allocation',
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

  // Project Selection
  {
    id: 'lithobuild_project_criteria',
    section: '3.3 Project Selection Criteria',
    question: 'What criteria should we use for accepting future Build projects?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Strategic value, minimum revenue threshold, alignment with core business, customer profile, etc.',
    required: true
  },

  // Future Strategy
  {
    id: 'lithobuild_future_strategy',
    section: '3.4 Future Strategy',
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

  // Additional Considerations
  {
    id: 'lithobuild_additional_notes',
    section: '3.5 Additional Considerations',
    question: 'Any additional thoughts, concerns, or suggestions for LithoBuild?',
    type: 'textarea',
    rows: 5,
    placeholder: 'Contract management, team capacity, transition risks, client relationships, etc.'
  }
];

export const action3Metadata: ActionMetadata = {
  actionNumber: 3,
  actionSlug: 'lithobuild',
  title: 'LithoBuild: Consulting & Development Strategy',
  description: 'Define the consulting and development service strategy including pricing, resource allocation, project selection criteria, and sunset timeline.',
  priority: 'IMMEDIATE',
  owner: 'Keith (Management Team)',
  questions: action3Questions
};
