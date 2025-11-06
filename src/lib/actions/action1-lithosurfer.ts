import { ActionMetadata, ActionQuestion } from './types';

/**
 * IMPORTANT: Once users have submitted responses, DO NOT change question IDs!
 *
 * If you need to modify questions:
 * - Changing question text, helpText, options: SAFE ✅
 * - Adding new questions: SAFE ✅
 * - Removing questions: Mark as optional or hide with conditional logic ⚠️
 * - Changing question IDs: NEVER! Use migration script 🚫
 *
 * To rename a question ID, you MUST:
 * 1. Create a database migration script to update existing responses
 * 2. Update the question ID here
 * 3. Deploy migration before deploying new code
 */
export const action1Questions: ActionQuestion[] = [
  // Overview
  {
    id: 'lithosurfer_overview',
    section: '1. LithoSurfer: Three-Tier Model Overview',
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
    section: '1. LithoSurfer: Three-Tier Model Overview',
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
    section: '1. LithoSurfer: Three-Tier Model Overview',
    question: 'Please explain your concerns or suggestions',
    type: 'textarea',
    rows: 3,
    placeholder: 'What concerns do you have? What alternative approaches would you suggest?',
    conditionalOn: {
      questionId: 'lithosurfer_tier_agreement',
      value: ['No - needs significant changes', 'Partially - agree with concept but needs refinement', 'Unsure - needs more discussion']
    }
  },

  // LithoSurfer FREE
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
    section: '1.1 LithoSurfer Free',
    question: 'What tools, features, and data should Free users have access to?',
    type: 'textarea',
    rows: 4,
    placeholder: 'List available tools (e.g., basic map viewer, simple filtering), data sources (Earthbank, AGN), and any restrictions',
    required: true
  },

  // LithoSurfer PRO
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
    section: '1.2 LithoSurfer Pro',
    question: 'What should the LithoSurfer Pro annual per-seat price be?',
    type: 'dropdown',
    options: ['$1,000 - $2,500', '$2,500 - $5,000', '$5,000 - $7,500', '$7,500 - $10,000', '$10,000+'],
    helpText: 'Annual per-seat license pricing',
    required: true
  },
  {
    id: 'lithosurfer_pro_data_limit',
    section: '1.2 LithoSurfer Pro',
    question: 'What private data upload limit should Pro users have?',
    type: 'text',
    placeholder: 'e.g., 10GB, 1000 samples, 50 boreholes, etc.',
    required: true
  },
  {
    id: 'lithosurfer_pro_tools',
    section: '1.2 LithoSurfer Pro',
    question: 'What tools and features should Pro users have (beyond Free)?',
    type: 'textarea',
    rows: 4,
    placeholder: 'Swath profile, graphical analysis, lithochem, API limits, LithoData discounts, LithoClean services, etc.',
    required: true
  },

  // LithoSurfer ENTERPRISE
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
    section: '1.3 LithoSurfer Enterprise',
    question: 'What should the base Enterprise annual price start at?',
    type: 'dropdown',
    options: ['$25,000 - $50,000', '$50,000 - $100,000', '$100,000 - $250,000', '$250,000+', 'Custom quotes only'],
    helpText: 'Base price before customization (seats, data, features)',
    required: true
  },
  {
    id: 'lithosurfer_enterprise_features',
    section: '1.3 LithoSurfer Enterprise',
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
    options: ['1-2 weeks', '2-4 weeks', '1-3 months', '3+ months'],
    required: true
  },

  // Additional Considerations
  {
    id: 'lithosurfer_additional_notes',
    section: '1.5 Additional Considerations',
    question: 'Any additional thoughts, concerns, or suggestions for LithoSurfer?',
    type: 'textarea',
    rows: 5,
    placeholder: 'Competitive threats, risks, opportunities, questions not covered above, alternative approaches, etc.'
  }
];

export const action1Metadata: ActionMetadata = {
  actionNumber: 1,
  actionSlug: 'lithosurfer',
  title: 'LithoSurfer: Three-Tier Product Strategy',
  description: 'Define the three-tier access model for LithoSurfer (Free, Pro, Enterprise) including features, pricing, and implementation requirements.',
  priority: 'IMMEDIATE',
  owner: 'Keith (Management Team)',
  questions: action1Questions
};
