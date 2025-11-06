// Utopia Vision Assessment Questions
// 8 core questions for management team to build consensus on unified vision

export interface UtopiaQuestion {
  id: string;
  question: string;
  helpText?: string;
  type: 'radio' | 'checkbox' | 'textarea';
  options?: string[];
  maxSelections?: number; // for checkbox type
}

export const utopiaQuestions: UtopiaQuestion[] = [
  {
    id: 'q1',
    question: 'What is your ideal Lithodat in 10 years? (Headcount & Revenue)',
    helpText: 'Select the scale that best represents your vision',
    type: 'radio',
    options: [
      '12-20 people, $5-10M revenue (lean, highly efficient)',
      '30-50 people, $10-25M revenue (focused growth)',
      '50-100 people, $25-50M revenue (substantial scale)',
      '100-200 people, $50-250M revenue (large enterprise)',
      '200+ people, $250M+ revenue (major international player)',
    ],
  },
  {
    id: 'q2',
    question: 'What is your vision for Lithodat\'s long-term ownership?',
    helpText: 'How do you see the company\'s future structure?',
    type: 'radio',
    options: [
      'Build to sell - Exit within 10 years',
      'Build to IPO - Go public eventually',
      'Build to last - Stay private indefinitely',
      'Hybrid - Partial exit options for founders',
      'Unsure - Need more discussion',
    ],
  },
  {
    id: 'q3',
    question: 'What critical business capabilities are we missing today? (Select up to 5)',
    helpText: 'Choose the most important gaps preventing us from achieving utopia',
    type: 'checkbox',
    maxSelections: 5,
    options: [
      'Scalable data ingestion infrastructure (automated pipelines)',
      'Marketing and customer acquisition capability',
      'Sales team and processes',
      'Financial systems and controls',
      'Product management capability',
      'Advanced AI/ML development team',
      'Enterprise security and compliance',
      'Customer success and support team',
      'Data marketplace platform',
      'International operations capability',
    ],
  },
  {
    id: 'q4',
    question: 'What are the PRIMARY obstacles preventing us from achieving utopia? (Select up to 3)',
    helpText: 'Identify the biggest blockers',
    type: 'checkbox',
    maxSelections: 3,
    options: [
      'Insufficient capital/funding',
      'Team size - Not enough people',
      'Team skills - Missing key expertise',
      'Data acquisition speed - Too slow to get data at scale',
      'Customer acquisition - Don\'t know how to get customers',
      'Brand awareness - Industry doesn\'t know us',
      'Internal alignment - Leadership not aligned on vision',
      'Technology limitations - Platform not ready to scale',
      'LithoBuild consuming resources - Stuck in services mode',
    ],
  },
  {
    id: 'q5',
    question: 'When should LithoBuild be sunset?',
    helpText: 'Consider revenue replacement and strategic focus',
    type: 'radio',
    options: [
      '6 months - Stop immediately',
      '12 months - Complete current contracts only',
      '18 months - Strategic wind-down',
      '24 months - Full 2-year transition',
      'Conditional - When LithoSurfer/LithoData hit $1M ARR',
      'Conditional - When LithoSurfer/LithoData hit $2M ARR',
      'Never - Keep as ongoing revenue source',
    ],
  },
  {
    id: 'q6',
    question: 'What MUST we achieve in Year 1 (FY26)? (Select top 5 priorities)',
    helpText: 'Choose the most critical milestones for next 12 months',
    type: 'checkbox',
    maxSelections: 5,
    options: [
      'Launch LithoSurfer subscription model',
      'Acquire 10+ paying customers',
      'Acquire 25+ paying customers',
      'Build 3+ lab integrations',
      'Reach $500K ARR',
      'Reach $1M ARR',
      'Hire 5+ key team members',
      'Complete LithoBuild transition plan',
      'Raise external funding',
      'Launch data marketplace MVP',
      'Reach 1 billion data points in platform',
    ],
  },
  {
    id: 'q7',
    question: 'What framework should we use to track progress toward utopia?',
    helpText: 'Choose the primary system for measuring and managing progress',
    type: 'radio',
    options: [
      'Jira - Continue with Jira projects and boards',
      'OKRs - Objectives and Key Results (quarterly framework)',
      'KPIs - Key Performance Indicators dashboard',
      'Combination - Multiple tools for different purposes',
      'Custom - Build our own tracking system',
    ],
  },
  {
    id: 'q8',
    question: 'How will we KNOW we\'ve achieved utopia? What\'s the ultimate success indicator?',
    helpText: 'Describe in a few sentences what success looks like',
    type: 'textarea',
    options: [], // no options for textarea
  },
];

export type UtopiaResponses = {
  q1?: string;
  q1_comment?: string;
  q2?: string;
  q2_comment?: string;
  q3?: string[];
  q3_comment?: string;
  q4?: string[];
  q4_comment?: string;
  q5?: string;
  q5_comment?: string;
  q6?: string[];
  q6_comment?: string;
  q7?: string;
  q7_comment?: string;
  q8?: string; // this is the textarea itself
};
