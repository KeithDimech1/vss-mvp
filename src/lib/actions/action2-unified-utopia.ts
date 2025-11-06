import { ActionMetadata } from './types';

export const unifiedUtopiaMetadata: ActionMetadata = {
  actionNumber: 2,
  actionSlug: 'unified-utopia',
  title: 'Define Unified Utopia',
  description: 'Resolve clashes and create coherent 2yr/5yr/10yr roadmap',
  priority: 'IMMEDIATE',
  owner: 'Management Team',
  questions: [
    {
      id: 'q1',
      question: 'What is your ideal Lithodat in 10 years? (Headcount & Revenue)',
      type: 'radio',
      helpText: 'Select the scale that best represents your vision',
      required: true,
      options: [
        {
          value: '12-20 people, $5-10M revenue (lean, highly efficient)',
          label: '12-20 people, $5-10M revenue (lean, highly efficient)'
        },
        {
          value: '30-50 people, $10-25M revenue (focused growth)',
          label: '30-50 people, $10-25M revenue (focused growth)'
        },
        {
          value: '50-100 people, $25-50M revenue (substantial scale)',
          label: '50-100 people, $25-50M revenue (substantial scale)'
        },
        {
          value: '100-200 people, $50-250M revenue (large enterprise)',
          label: '100-200 people, $50-250M revenue (large enterprise)'
        },
        {
          value: '200+ people, $250M+ revenue (major international player)',
          label: '200+ people, $250M+ revenue (major international player)'
        }
      ]
    },
    {
      id: 'q1_comment',
      question: 'Additional comments on scale and revenue',
      type: 'textarea',
      placeholder: 'Add any additional context or explanation...',
      rows: 3,
      required: false
    },
    {
      id: 'q2',
      question: 'What is your vision for Lithodat\'s long-term ownership?',
      type: 'radio',
      helpText: 'How do you see the company\'s future structure?',
      required: true,
      options: [
        {
          value: 'Build to sell - Exit within 10 years',
          label: 'Build to sell - Exit within 10 years'
        },
        {
          value: 'Build to IPO - Go public eventually',
          label: 'Build to IPO - Go public eventually'
        },
        {
          value: 'Build to last - Stay private indefinitely',
          label: 'Build to last - Stay private indefinitely'
        },
        {
          value: 'Hybrid - Partial exit options for founders',
          label: 'Hybrid - Partial exit options for founders'
        },
        {
          value: 'Unsure - Need more discussion',
          label: 'Unsure - Need more discussion'
        }
      ]
    },
    {
      id: 'q2_comment',
      question: 'Additional comments on ownership vision',
      type: 'textarea',
      placeholder: 'Add any additional context or explanation...',
      rows: 3,
      required: false
    },
    {
      id: 'q3',
      question: 'What critical business capabilities are we missing today? (Select up to 5)',
      type: 'checkbox',
      helpText: 'Choose the most important gaps preventing us from achieving utopia',
      required: true,
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
        'International operations capability'
      ]
    },
    {
      id: 'q3_comment',
      question: 'Additional comments on missing capabilities',
      type: 'textarea',
      placeholder: 'Add any additional context or explanation...',
      rows: 3,
      required: false
    },
    {
      id: 'q4',
      question: 'What are the PRIMARY obstacles preventing us from achieving utopia? (Select up to 3)',
      type: 'checkbox',
      helpText: 'Identify the biggest blockers',
      required: true,
      options: [
        'Insufficient capital/funding',
        'Team size - Not enough people',
        'Team skills - Missing key expertise',
        'Data acquisition speed - Too slow to get data at scale',
        'Customer acquisition - Don\'t know how to get customers',
        'Brand awareness - Industry doesn\'t know us',
        'Internal alignment - Leadership not aligned on vision',
        'Technology limitations - Platform not ready to scale',
        'LithoBuild consuming resources - Stuck in services mode'
      ]
    },
    {
      id: 'q4_comment',
      question: 'Additional comments on obstacles',
      type: 'textarea',
      placeholder: 'Add any additional context or explanation...',
      rows: 3,
      required: false
    },
    {
      id: 'q5',
      question: 'When should LithoBuild be sunset?',
      type: 'radio',
      helpText: 'Consider revenue replacement and strategic focus',
      required: true,
      options: [
        {
          value: '6 months - Stop immediately',
          label: '6 months - Stop immediately'
        },
        {
          value: '12 months - Complete current contracts only',
          label: '12 months - Complete current contracts only'
        },
        {
          value: '18 months - Strategic wind-down',
          label: '18 months - Strategic wind-down'
        },
        {
          value: '24 months - Full 2-year transition',
          label: '24 months - Full 2-year transition'
        },
        {
          value: 'Conditional - When LithoSurfer/LithoData hit $1M ARR',
          label: 'Conditional - When LithoSurfer/LithoData hit $1M ARR'
        },
        {
          value: 'Conditional - When LithoSurfer/LithoData hit $2M ARR',
          label: 'Conditional - When LithoSurfer/LithoData hit $2M ARR'
        },
        {
          value: 'Never - Keep as ongoing revenue source',
          label: 'Never - Keep as ongoing revenue source'
        }
      ]
    },
    {
      id: 'q5_comment',
      question: 'Additional comments on LithoBuild sunset',
      type: 'textarea',
      placeholder: 'Add any additional context or explanation...',
      rows: 3,
      required: false
    },
    {
      id: 'q6',
      question: 'What MUST we achieve in Year 1 (FY26)? (Select top 5 priorities)',
      type: 'checkbox',
      helpText: 'Choose the most critical milestones for next 12 months',
      required: true,
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
        'Reach 1 billion data points in platform'
      ]
    },
    {
      id: 'q6_comment',
      question: 'Additional comments on Year 1 priorities',
      type: 'textarea',
      placeholder: 'Add any additional context or explanation...',
      rows: 3,
      required: false
    },
    {
      id: 'q7',
      question: 'What framework should we use to track progress toward utopia?',
      type: 'radio',
      helpText: 'Choose the primary system for measuring and managing progress',
      required: true,
      options: [
        {
          value: 'Jira - Continue with Jira projects and boards',
          label: 'Jira - Continue with Jira projects and boards'
        },
        {
          value: 'OKRs - Objectives and Key Results (quarterly framework)',
          label: 'OKRs - Objectives and Key Results (quarterly framework)'
        },
        {
          value: 'KPIs - Key Performance Indicators dashboard',
          label: 'KPIs - Key Performance Indicators dashboard'
        },
        {
          value: 'Combination - Multiple tools for different purposes',
          label: 'Combination - Multiple tools for different purposes'
        },
        {
          value: 'Custom - Build our own tracking system',
          label: 'Custom - Build our own tracking system'
        }
      ]
    },
    {
      id: 'q7_comment',
      question: 'Additional comments on tracking framework',
      type: 'textarea',
      placeholder: 'Add any additional context or explanation...',
      rows: 3,
      required: false
    },
    {
      id: 'q8',
      question: 'How will we KNOW we\'ve achieved utopia? What\'s the ultimate success indicator?',
      type: 'textarea',
      helpText: 'Describe in a few sentences what success looks like',
      placeholder: 'Describe your vision...',
      rows: 6,
      required: true
    }
  ]
};
