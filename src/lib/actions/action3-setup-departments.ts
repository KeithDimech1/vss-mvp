import { ActionMetadata } from './types';

export const setupDepartmentsMetadata: ActionMetadata = {
  actionNumber: 3,
  actionSlug: 'setup-departments',
  title: 'Setup Three Departments',
  description: 'Formalize LithoSurfer, LithoBuild, LithoData systems',
  priority: 'IMMEDIATE',
  owner: 'Management Team',
  questions: [
    {
      id: 'q1',
      question: 'How should we organize the three departments?',
      type: 'radio',
      helpText: 'Select the organizational model that best fits Lithodat',
      required: true,
      options: [
        {
          value: 'Fully independent - Each department operates autonomously with own P&L',
          label: 'Fully independent - Each department operates autonomously with own P&L'
        },
        {
          value: 'Semi-autonomous - Departments have autonomy but share resources/budget',
          label: 'Semi-autonomous - Departments have autonomy but share resources/budget'
        },
        {
          value: 'Integrated teams - Shared resources, strong coordination, unified budget',
          label: 'Integrated teams - Shared resources, strong coordination, unified budget'
        },
        {
          value: 'Matrix model - Staff belong to departments but work across teams',
          label: 'Matrix model - Staff belong to departments but work across teams'
        },
        {
          value: 'Hybrid - Mix of approaches depending on function',
          label: 'Hybrid - Mix of approaches depending on function'
        }
      ]
    },
    {
      id: 'q1_comment',
      question: 'Additional comments on organizational model',
      type: 'textarea',
      placeholder: 'Explain your reasoning or suggest specific hybrid arrangements...',
      rows: 3,
      required: false
    },
    {
      id: 'q2',
      question: 'Who should lead each department?',
      type: 'textarea',
      helpText: 'Suggest leadership for LithoSurfer, LithoData, and LithoBuild',
      placeholder: 'Example:\nLithoSurfer: Wayne (Product & Platform)\nLithoData: Fabian (Data & Infrastructure)\nLithoBuild: Moritz (Delivery & Engineering)\n\nProvide your recommendations...',
      rows: 6,
      required: true
    },
    {
      id: 'q2_comment',
      question: 'Additional comments on department leadership',
      type: 'textarea',
      placeholder: 'Explain leadership structure, reporting lines, decision authority...',
      rows: 3,
      required: false
    },
    {
      id: 'q3',
      question: 'What level of autonomy should each department have? (Select all that apply)',
      type: 'checkbox',
      helpText: 'Choose which decisions departments can make independently',
      required: true,
      options: [
        'Hiring and team composition',
        'Budget allocation within approved total',
        'Technology stack and tooling choices',
        'Customer engagement and pricing (for their products)',
        'Roadmap and feature prioritization',
        'Process and workflow design',
        'Partnership and vendor selection',
        'Marketing and go-to-market strategy',
        'Performance metrics and KPIs',
        'Work schedules and team organization'
      ]
    },
    {
      id: 'q3_comment',
      question: 'Additional comments on autonomy',
      type: 'textarea',
      placeholder: 'Explain limits, coordination requirements, or special cases...',
      rows: 3,
      required: false
    },
    {
      id: 'q4',
      question: 'How should resources (budget, headcount, tools) be allocated across departments?',
      type: 'radio',
      helpText: 'Choose the allocation approach',
      required: true,
      options: [
        {
          value: 'Revenue-based - Allocate based on current revenue contribution',
          label: 'Revenue-based - Allocate based on current revenue contribution'
        },
        {
          value: 'Strategic priority - Allocate based on strategic importance to utopia vision',
          label: 'Strategic priority - Allocate based on strategic importance to utopia vision'
        },
        {
          value: 'Equal split - Each department gets 1/3 of resources',
          label: 'Equal split - Each department gets 1/3 of resources'
        },
        {
          value: 'Dynamic - Adjust quarterly based on performance and needs',
          label: 'Dynamic - Adjust quarterly based on performance and needs'
        },
        {
          value: 'Weighted mix - Combination approach (e.g., 50% strategic, 30% revenue, 20% equal)',
          label: 'Weighted mix - Combination approach (e.g., 50% strategic, 30% revenue, 20% equal)'
        }
      ]
    },
    {
      id: 'q4_comment',
      question: 'Additional comments on resource allocation',
      type: 'textarea',
      placeholder: 'Explain specific allocation percentages, transition plans, or special considerations...',
      rows: 3,
      required: false
    },
    {
      id: 'q5',
      question: 'How should departments coordinate and collaborate? (Select up to 5)',
      type: 'checkbox',
      helpText: 'Choose the most important coordination mechanisms',
      required: true,
      options: [
        'Weekly cross-department leadership sync',
        'Monthly all-hands with all department members',
        'Shared Slack channels for real-time communication',
        'Joint planning sessions (quarterly OKRs)',
        'Formal handoff processes (e.g., LithoBuild → LithoData)',
        'Shared documentation and knowledge base',
        'Cross-functional project teams',
        'Rotating liaisons between departments',
        'Unified customer success team',
        'Common tooling and platforms (Jira, GitHub, etc.)'
      ]
    },
    {
      id: 'q5_comment',
      question: 'Additional comments on coordination',
      type: 'textarea',
      placeholder: 'Describe specific processes, meeting structures, or collaboration tools...',
      rows: 3,
      required: false
    },
    {
      id: 'q6',
      question: 'What are the key success metrics for each department?',
      type: 'textarea',
      helpText: 'Define how we measure success for each department',
      placeholder: 'Example:\n\nLithoSurfer:\n- Monthly Active Users (MAU)\n- Subscription ARR\n- Customer satisfaction (NPS)\n\nLithoData:\n- Data points ingested per month\n- Lab integrations completed\n- Data quality score\n\nLithoBuild:\n- Project completion rate\n- Customer satisfaction\n- Revenue (declining over time)\n\nProvide your metrics...',
      rows: 10,
      required: true
    },
    {
      id: 'q6_comment',
      question: 'Additional comments on success metrics',
      type: 'textarea',
      placeholder: 'Explain measurement cadence, targets, or dependencies...',
      rows: 3,
      required: false
    },
    {
      id: 'q7',
      question: 'What shared services or functions should exist outside the three departments? (Select all that apply)',
      type: 'checkbox',
      helpText: 'Identify central/shared functions',
      required: true,
      options: [
        'Finance and accounting',
        'HR and recruitment',
        'Legal and compliance',
        'IT infrastructure and security',
        'Marketing and brand',
        'Sales and business development',
        'Customer support',
        'Data governance and standards',
        'Product management (cross-department)',
        'Nothing - all functions within departments'
      ]
    },
    {
      id: 'q7_comment',
      question: 'Additional comments on shared services',
      type: 'textarea',
      placeholder: 'Explain how shared services are structured, funded, or governed...',
      rows: 3,
      required: false
    },
    {
      id: 'q8',
      question: 'How will we handle the transition to this new department structure?',
      type: 'textarea',
      helpText: 'Describe the transition plan in detail',
      placeholder: 'Consider:\n- Timeline (immediate vs phased)\n- Communication plan to team\n- Current team member assignments\n- Hiring needs for each department\n- Budget/resource reallocation\n- Success criteria for transition\n- Risks and mitigation\n\nProvide your transition plan...',
      rows: 10,
      required: true
    }
  ]
};
