import { ActionMetadata } from './types';

export const unifiedUtopiaMetadata: ActionMetadata = {
  actionNumber: 2,
  actionSlug: 'unified-utopia',
  title: 'Unified Utopia Vision',
  description: 'Build consensus on Lithodat\'s unified utopia vision across management team',
  priority: 'IMMEDIATE',
  owner: 'Management Team',
  questions: [
    // ==========================================
    // SECTION 1: Vision & Scale (Questions 1-5)
    // ==========================================
    {
      id: 'q1_headcount',
      section: 'Vision & Scale',
      question: 'In your ideal vision of Lithodat in 10 years, how many employees would we have?',
      type: 'radio',
      helpText: 'Select the team size that best represents your vision',
      required: true,
      options: [
        { value: '12-20', label: '12-20 people (small, highly efficient core team)' },
        { value: '30-50', label: '30-50 people (medium-sized focused team)' },
        { value: '50-100', label: '50-100 people (large team, multiple departments)' },
        { value: '100-200', label: '100-200 people (very large, know most people)' },
        { value: '200+', label: '200+ people (enterprise scale, multiple offices)' }
      ]
    },
    {
      id: 'q1_why',
      section: 'Vision & Scale',
      question: 'Briefly explain why this size is ideal:',
      type: 'textarea',
      placeholder: 'Optional explanation...',
      rows: 3,
      maxLength: 200,
      required: false
    },
    {
      id: 'q2_revenue',
      section: 'Vision & Scale',
      question: 'In your ideal vision of Lithodat in 10 years, what annual revenue would we generate?',
      type: 'radio',
      required: true,
      options: [
        { value: '$5-10M', label: '$5-10 million' },
        { value: '$10-25M', label: '$10-25 million' },
        { value: '$25-50M', label: '$25-50 million' },
        { value: '$50-100M', label: '$50-100 million' },
        { value: '$100-250M', label: '$100-250 million' },
        { value: '$250M+', label: '$250 million+' }
      ]
    },
    {
      id: 'q2_sources',
      section: 'Vision & Scale',
      question: 'What would be the primary revenue sources? (Select all that apply)',
      type: 'checkbox',
      helpText: 'Choose all revenue sources that would contribute significantly',
      required: true,
      options: [
        'LithoSurfer subscriptions (Free/Pro/Enterprise tiers)',
        'LithoData commercial data packages',
        'API access and integrations',
        'Marketplace transactions (data buying/selling)',
        'Enterprise contracts and custom solutions',
        'Other'
      ]
    },
    {
      id: 'q4_exit',
      section: 'Vision & Scale',
      question: 'What is your vision for Lithodat\'s long-term ownership structure?',
      type: 'radio',
      required: true,
      options: [
        { value: 'build-to-sell', label: 'Build to sell - Exit within 10 years to strategic buyer or PE' },
        { value: 'build-to-ipo', label: 'Build to IPO - Go public within 10-15 years' },
        { value: 'build-to-last', label: 'Build to last - Remain privately owned indefinitely' },
        { value: 'hybrid', label: 'Hybrid - Partial exit options for founders who want out' },
        { value: 'unsure', label: 'Unsure - Need more discussion' }
      ]
    },
    {
      id: 'q4_timeframe',
      section: 'Vision & Scale',
      question: 'What timeframe for exit?',
      type: 'radio',
      required: false,
      conditionalOn: {
        questionId: 'q4_exit',
        value: 'build-to-sell'
      },
      options: [
        { value: '3-5', label: '3-5 years' },
        { value: '5-7', label: '5-7 years' },
        { value: '7-10', label: '7-10 years' },
        { value: '10+', label: '10+ years' }
      ]
    },
    {
      id: 'q5_differentiator',
      section: 'Vision & Scale',
      question: 'In your utopia vision, what makes Lithodat the world leader? (Rank top 3)',
      type: 'ranking',
      helpText: 'Drag to reorder your top 3 choices',
      required: true,
      rankingLimit: 3,
      options: [
        'Data volume - We have the most geological/geochemical data',
        'Data quality - Our data is the cleanest and most reliable',
        'Platform technology - Our software is the best in class',
        'Network effects - Everyone uses us because everyone uses us',
        'Infrastructure - Direct connections to labs, machines, sources',
        'AI/ML capabilities - Best insights and analysis tools',
        'Customer experience - Easiest to use, best support',
        'Marketplace liquidity - Best place to buy/sell data'
      ]
    },

    // ==========================================
    // SECTION 2: Business Capabilities & Priorities (Questions 6-10)
    // ==========================================
    {
      id: 'q6_capabilities',
      section: 'Business Capabilities & Priorities',
      question: 'What key business capabilities do we lack today that are essential for achieving utopia?',
      type: 'checkbox',
      helpText: 'Select all that apply',
      required: true,
      options: [
        'Scalable data ingestion infrastructure (automated pipelines)',
        'Enterprise-grade security and compliance',
        'Marketing and customer acquisition capability',
        'Sales team and processes',
        'Financial systems and controls',
        'HR systems and processes',
        'Product management capability',
        'Advanced AI/ML development team',
        'International operations capability',
        'Legal and IP management',
        'Customer success and support team',
        'Data marketplace platform',
        'API management and developer tools',
        'Other'
      ]
    },
    {
      id: 'q7_lithosurfer',
      section: 'Business Capabilities & Priorities',
      question: 'For LithoSurfer (customer-facing platform), rank these priorities (1=highest)',
      type: 'ranking',
      helpText: 'Drag to reorder all items by priority',
      required: true,
      options: [
        'Launch subscription model (Free/Pro/Enterprise tiers)',
        'Build data marketplace functionality (buy/sell data)',
        'Enhance visualization and analysis tools',
        'AI and ML as a customer facing tool'
      ]
    },
    {
      id: 'q7_other',
      section: 'Business Capabilities & Priorities',
      question: 'What else should LithoSurfer prioritize?',
      type: 'textarea',
      placeholder: 'Optional additional priorities...',
      rows: 3,
      maxLength: 200,
      required: false
    },
    {
      id: 'q8_lithodata',
      section: 'Business Capabilities & Priorities',
      question: 'For LithoData (backend/data systems), rank these priorities (1=highest)',
      type: 'ranking',
      helpText: 'Drag to reorder all items by priority',
      required: true,
      options: [
        'Build lab integrations and direct data connections',
        'Accelerate manual data entry/cleaning (more team, better tools)',
        'Develop automated data extraction from PDFs/reports',
        'Create commercial data packages for sale',
        'Improve API for third-party integrations',
        'Develop new data models for geological data'
      ]
    },
    {
      id: 'q8_other',
      section: 'Business Capabilities & Priorities',
      question: 'What else should LithoData prioritize?',
      type: 'textarea',
      placeholder: 'Optional additional priorities...',
      rows: 3,
      maxLength: 200,
      required: false
    },
    {
      id: 'q10_new_capabilities',
      section: 'Business Capabilities & Priorities',
      question: 'What capabilities or products should Lithodat prioritise? (Select up to 3)',
      type: 'checkbox',
      helpText: 'Choose your top 3 priorities',
      required: true,
      maxSelections: 3,
      options: [
        'LithoAI - Standalone AI/ML analysis products',
        'LithoSpace - Expand space/planetary data offering',
        'DERTdat - Environmental/soil data vertical',
        'LithoExchange - Marketplace for commercial data',
        'None - Focus on LithoSurfer and LithoData only',
        'Other'
      ]
    },

    // ==========================================
    // SECTION 3: Obstacles & Resources (Questions 11-15)
    // ==========================================
    {
      id: 'q11_obstacles',
      section: 'Obstacles & Resources',
      question: 'What are the biggest obstacles preventing us from achieving utopia? (Select all that apply)',
      type: 'checkbox',
      required: true,
      options: [
        'Insufficient capital/funding',
        'Team size - Not enough people',
        'Team skills - Missing key expertise',
        'Technology limitations - Platform not ready',
        'Data acquisition speed - Too slow to get data at scale',
        'Customer acquisition - Don\'t know how to get customers',
        'Brand awareness - Industry doesn\'t know us',
        'Competition - Others doing it better/faster',
        'Regulatory/legal barriers',
        'Internal alignment - Leadership not aligned on vision',
        'Process/systems - Poor internal operations',
        'Market readiness - Customers not ready for our solution',
        'Other'
      ]
    },
    {
      id: 'q11_biggest',
      section: 'Obstacles & Resources',
      question: 'Describe the #1 biggest obstacle in detail:',
      type: 'textarea',
      placeholder: 'Explain the primary challenge...',
      rows: 4,
      maxLength: 400,
      required: true
    },
    {
      id: 'q12_team',
      section: 'Obstacles & Resources',
      question: 'Can we achieve utopia with our current team size and skills?',
      type: 'radio',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Current team is sufficient, just needs better focus/direction' },
        { value: 'mostly', label: 'Mostly - Need 1-3 key hires in critical roles' },
        { value: 'partially', label: 'Partially - Need 5-10 additional strategic hires' },
        { value: 'no-10+', label: 'No - Need significant expansion (10+ people)' },
        { value: 'no-restructure', label: 'No - Need complete restructure and 2-3x headcount' }
      ]
    },
    {
      id: 'q12_hires',
      section: 'Obstacles & Resources',
      question: 'What are the top 3 roles/skills we need to hire?',
      type: 'textarea',
      placeholder: 'Example: 1. Head of Sales, 2. Senior AI/ML Engineer, 3. Product Manager',
      rows: 3,
      maxLength: 300,
      required: false
    },
    {
      id: 'q13_infrastructure',
      section: 'Obstacles & Resources',
      question: 'Are our current technical systems ready to scale to utopia? (Rate each: 1=Not ready, 5=Ready to scale)',
      type: 'rating',
      helpText: 'Rate each system separately',
      required: true,
      ratingScale: 5,
      options: [
        'Cloud infrastructure (AWS, servers, databases)',
        'Data pipelines and ingestion systems',
        'LithoSurfer platform code and architecture',
        'API and integration capabilities',
        'Security and compliance systems',
        'Development tools and processes'
      ]
    },
    {
      id: 'q13_investment',
      section: 'Obstacles & Resources',
      question: 'What\'s the #1 technical investment needed?',
      type: 'textarea',
      placeholder: 'Describe the top technical priority...',
      rows: 3,
      maxLength: 200,
      required: false
    },
    {
      id: 'q14_funding',
      section: 'Obstacles & Resources',
      question: 'What funding/capital do we need to achieve utopia?',
      type: 'radio',
      required: true,
      options: [
        { value: 'none', label: 'None - Organic growth from current revenue' },
        { value: '500k-1m', label: '$500K - $1M - Small raise for key hires/tools' },
        { value: '1m-3m', label: '$1M - $3M - Moderate raise for growth acceleration' },
        { value: '3m-10m', label: '$3M - $10M - Significant Series A type raise' },
        { value: '10m+', label: '$10M+ - Major capital raise for aggressive expansion' },
        { value: 'unsure', label: 'Unsure - Need financial modeling to determine' }
      ]
    },
    {
      id: 'q14_sources',
      section: 'Obstacles & Resources',
      question: 'How should we fund growth? (Select all that apply)',
      type: 'checkbox',
      required: true,
      options: [
        'Bootstrap from LithoBuild revenue',
        'Bootstrap from LithoSurfer subscriptions',
        'Debt financing (loans, credit lines)',
        'Venture capital',
        'Grants (R&D, innovation, government)',
        'Strategic partnerships',
        'Other'
      ]
    },
    {
      id: 'q15_partnerships',
      section: 'Obstacles & Resources',
      question: 'What partnerships or agreements could assist to achieving utopia? (Select all that apply)',
      type: 'checkbox',
      required: true,
      options: [
        'Lab integrations - Direct data connections to major labs',
        'Mining company partnerships - Data sharing agreements',
        'Government agreements - Geoscience agencies (GA, USGS, etc.)',
        'University partnerships - Academic data and research',
        'Technology partnerships - Platform integrations (ESRI, etc.)',
        'Industry associations - Mining councils, trade groups',
        'Reseller agreements - Channel partners',
        'Data provider agreements - Acquire existing databases',
        'None needed - Can achieve organically',
        'Other'
      ]
    },
    {
      id: 'q15_targets',
      section: 'Obstacles & Resources',
      question: 'Name top 3 specific partners/organizations to target:',
      type: 'textarea',
      placeholder: 'List 3 specific organizations...',
      rows: 3,
      maxLength: 300,
      required: false
    },

    // ==========================================
    // SECTION 4: Timeline & Milestones (Questions 16-20)
    // ==========================================
    {
      id: 'q16_timeframe',
      section: 'Timeline & Milestones',
      question: 'How long will it take to achieve your utopia vision?',
      type: 'radio',
      required: true,
      options: [
        { value: '3', label: '3 years' },
        { value: '5', label: '5 years' },
        { value: '7', label: '7 years' },
        { value: '10', label: '10 years' },
        { value: '10-15', label: '10-15 years' },
        { value: '15+', label: '15+ years' }
      ]
    },
    {
      id: 'q17_year1',
      section: 'Timeline & Milestones',
      question: 'What MUST we achieve in the next 12 months (FY26)? (Select top 5 priorities)',
      type: 'checkbox',
      helpText: 'Choose your top 5 critical milestones',
      required: true,
      maxSelections: 5,
      options: [
        'Launch LithoSurfer subscription model (Pro and Enterprise)',
        'Acquire first 10 paying customers',
        'Acquire first 25 paying customers',
        'Build 3+ lab integrations',
        'Reach $500K ARR (outside LithoBuild)',
        'Reach $1M ARR (outside LithoBuild)',
        'Raise external funding',
        'Launch data marketplace MVP',
        'Land $2m in Build projects',
        'Other'
      ]
    },
    {
      id: 'q17_critical',
      section: 'Timeline & Milestones',
      question: 'What is the ONE most critical Year 1 milestone?',
      type: 'textarea',
      placeholder: 'Describe the single most important achievement for Year 1...',
      rows: 3,
      maxLength: 200,
      required: true
    },
    {
      id: 'q18_year2',
      section: 'Timeline & Milestones',
      question: 'What MUST we achieve in Year 2 (FY27)? (Select top 5 priorities)',
      type: 'checkbox',
      helpText: 'Choose your top 5 critical milestones',
      required: true,
      maxSelections: 5,
      options: [
        'Reach 50-100 paying customers',
        'Reach $2M ARR',
        'Reach $5M ARR',
        'Complete LithoBuild sunset',
        'Build 10+ lab integrations',
        'Launch commercial data packages',
        'Hire 10+ team members',
        'Open international office',
        'Reach 5 billion data points',
        'Launch AI/ML analysis tools',
        'Achieve profitability',
        'Establish market leader position in Australia',
        'Other'
      ]
    },
    {
      id: 'q18_critical',
      section: 'Timeline & Milestones',
      question: 'What is the ONE most critical Year 2 milestone?',
      type: 'textarea',
      placeholder: 'Describe the single most important achievement for Year 2...',
      rows: 3,
      maxLength: 200,
      required: true
    },
    {
      id: 'q20_critical_path',
      section: 'Timeline & Milestones',
      question: 'What must happen BEFORE other things can happen? Describe your critical path:',
      type: 'textarea',
      helpText: 'Example: "We must sunset LithoBuild BEFORE we can focus fully on LithoSurfer. We must reach $1M ARR BEFORE we can hire a sales team."',
      placeholder: 'Describe the dependencies and critical path...',
      rows: 5,
      maxLength: 500,
      required: true
    },

    // ==========================================
    // SECTION 5: Tracking & Measurement (Questions 21-25)
    // ==========================================
    {
      id: 'q21_tracking_tool',
      section: 'Tracking & Measurement',
      question: 'What tool should we use to track progress toward utopia?',
      type: 'radio',
      required: true,
      options: [
        { value: 'jira', label: 'Jira - Continue using Jira projects' },
        { value: 'okr', label: 'OKRs - Objectives and Key Results framework (quarterly)' },
        { value: 'kpi', label: 'KPIs - Key Performance Indicators dashboard' },
        { value: 'custom', label: 'Custom dashboard - Build our own tracking system' },
        { value: 'combination', label: 'Combination - Use multiple tools for different purposes' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'q21_combination',
      section: 'Tracking & Measurement',
      question: 'Which tools for what purposes?',
      type: 'textarea',
      placeholder: 'Describe your combination approach...',
      rows: 3,
      maxLength: 300,
      required: false,
      conditionalOn: {
        questionId: 'q21_tracking_tool',
        value: 'combination'
      }
    },
    {
      id: 'q22_cadence',
      section: 'Tracking & Measurement',
      question: 'How often should we review progress toward utopia? (Select all that apply)',
      type: 'checkbox',
      required: true,
      options: [
        'Weekly - Operations reviews',
        'Bi-weekly - Sprint reviews',
        'Monthly - Department reviews',
        'Quarterly - Strategic reviews and OKR setting',
        'Semi-annually - 6-month major milestones',
        'Annually - Yearly strategic planning'
      ]
    },
    {
      id: 'q23_department_metrics',
      section: 'Tracking & Measurement',
      question: 'Should each department (LithoSurfer, LithoData, LithoBuild) have its own metrics/OKRs?',
      type: 'radio',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Each department sets and tracks own metrics' },
        { value: 'partially', label: 'Partially - Some shared, some department-specific' },
        { value: 'no', label: 'No - Company-level metrics only' },
        { value: 'unsure', label: 'Unsure - Need to discuss' }
      ]
    },
    {
      id: 'q23_what',
      section: 'Tracking & Measurement',
      question: 'What should each department measure?',
      type: 'textarea',
      helpText: 'Example: LithoSurfer = Active users, ARR, churn. LithoData = Data points added, lab integrations, data quality score.',
      placeholder: 'Describe department metrics...',
      rows: 4,
      maxLength: 400,
      required: false,
      conditionalOn: {
        questionId: 'q23_department_metrics',
        value: 'yes'
      }
    },
    {
      id: 'q24_metrics',
      section: 'Tracking & Measurement',
      question: 'What are the top 5 metrics we should track company-wide? (Rank in order of importance)',
      type: 'ranking',
      helpText: 'Drag to reorder your top 5 choices',
      required: true,
      rankingLimit: 5,
      options: [
        'Annual Recurring Revenue (ARR)',
        'Number of paying customers',
        'Data points in platform',
        'Monthly Active Users (MAU)',
        'Customer acquisition cost (CAC)',
        'Customer lifetime value (LTV)',
        'Gross margin / profitability',
        'Data ingestion rate (GB/month)',
        'Team headcount',
        'Employee satisfaction/retention',
        'Market share',
        'Platform uptime/reliability',
        'Other'
      ]
    },
    {
      id: 'q25_litmus_test',
      section: 'Tracking & Measurement',
      question: 'How will we KNOW we\'ve achieved utopia? What\'s the ultimate success indicator?',
      type: 'textarea',
      helpText: 'Be specific. Example: "When every exploration company in Australia uses LithoSurfer" or "When we have 10 billion data points and $50M revenue"',
      placeholder: 'Describe your ultimate success indicator...',
      rows: 5,
      maxLength: 500,
      required: true
    }
  ]
};
