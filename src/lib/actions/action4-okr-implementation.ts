import { ActionMetadata } from './types';

export const okrImplementationMetadata: ActionMetadata = {
  actionNumber: 4,
  actionSlug: 'okr-implementation',
  title: 'Implementation Plan (OKRs)',
  description: 'Define OKR framework, timeline, and execution strategy',
  priority: 'IMMEDIATE',
  owner: 'Management Team',
  questions: [
    {
      id: 'q1',
      question: 'Which OKR framework should we adopt?',
      type: 'radio',
      helpText: 'Select the OKR methodology that best fits Lithodat\'s culture and goals',
      required: true,
      options: [
        {
          value: 'google',
          label: 'Google Model (70% success target, stretch goals encouraged, radical transparency)'
        },
        {
          value: 'netflix',
          label: 'Netflix Model (RICE prioritization, semester boundaries Q2/Q3 and Q4/Q1)'
        },
        {
          value: 'hybrid',
          label: 'Hybrid (Combine elements from multiple frameworks)'
        },
        {
          value: 'custom',
          label: 'Custom Lithodat approach (Design our own based on team needs)'
        },
      ]
    },
    {
      id: 'q1_comment',
      question: 'Additional thoughts on OKR framework choice',
      type: 'textarea',
      rows: 3,
      required: false
    },
    {
      id: 'q2',
      question: 'What time horizons should we plan across?',
      type: 'radio',
      helpText: 'How should we structure our planning cycles?',
      required: true,
      options: [
        {
          value: 'quarterly-only',
          label: 'Quarterly OKRs only (fast iteration, maximum flexibility)'
        },
        {
          value: 'annual-quarterly',
          label: 'Annual OKRs + Quarterly OKRs (aligned to yearly vision)'
        },
        {
          value: 'multi-horizon',
          label: 'Multi-horizon: 5-year vision → Annual → Quarterly → Monthly milestones'
        },
        {
          value: 'semester',
          label: 'Semester model (Q2/Q3 and Q4/Q1 cycles like Netflix)'
        },
      ]
    },
    {
      id: 'q2_comment',
      question: 'Additional thoughts on planning time horizons',
      type: 'textarea',
      rows: 3,
      required: false
    },
    {
      id: 'q3',
      question: 'How should we prioritize initiatives and OKRs?',
      type: 'radio',
      helpText: 'What prioritization methodology will we use?',
      required: true,
      options: [
        {
          value: 'rice',
          label: 'RICE Framework (Reach × Impact × Confidence / Effort - Netflix model)'
        },
        {
          value: 'value-effort',
          label: 'Simple Value vs Effort matrix (2×2 grid)'
        },
        {
          value: 'leadership',
          label: 'Leadership decision (Management team prioritizes based on judgment)'
        },
        {
          value: 'democratic',
          label: 'Democratic voting (Team votes on priorities)'
        },
      ]
    },
    {
      id: 'q3_comment',
      question: 'Additional thoughts on prioritization approach',
      type: 'textarea',
      rows: 3,
      required: false
    },
    {
      id: 'q4',
      question: 'What OKR success rate should we target?',
      type: 'radio',
      helpText: 'This determines how aggressive our goals should be',
      required: true,
      options: [
        {
          value: '70-percent',
          label: '70% success rate (Google standard - encourages stretch goals, some failure expected)'
        },
        {
          value: '85-percent',
          label: '85% success rate (Balanced - challenging but achievable goals)'
        },
        {
          value: '95-percent',
          label: '95% success rate (Conservative - focus on reliable delivery)'
        },
        {
          value: 'mixed',
          label: 'Mixed targets (Different rates for different OKR types)'
        },
      ]
    },
    {
      id: 'q4_comment',
      question: 'Additional thoughts on success rate targets',
      type: 'textarea',
      rows: 3,
      required: false
    },
    {
      id: 'q5',
      question: 'How transparent should OKRs be across the organization?',
      type: 'radio',
      helpText: 'Who can see which OKRs?',
      required: true,
      options: [
        {
          value: 'radical',
          label: 'Radical transparency (Everyone sees all OKRs - Google/Netflix model)'
        },
        {
          value: 'department',
          label: 'Department-level (Teams see their department OKRs + company-level OKRs)'
        },
        {
          value: 'management',
          label: 'Management only (Only leadership sees full OKR landscape)'
        },
        {
          value: 'tiered',
          label: 'Tiered access (Different visibility levels for different roles)'
        },
      ]
    },
    {
      id: 'q5_comment',
      question: 'Additional thoughts on OKR transparency',
      type: 'textarea',
      rows: 3,
      required: false
    },
    {
      id: 'q6',
      question: 'What review cadence should we establish?',
      type: 'radio',
      helpText: 'How often should we formally review OKR progress?',
      required: true,
      options: [
        {
          value: 'weekly',
          label: 'Weekly check-ins (Rapid feedback, maximum agility)'
        },
        {
          value: 'bi-weekly',
          label: 'Bi-weekly reviews (15-day cycles - Max Clean proven model)'
        },
        {
          value: 'monthly',
          label: 'Monthly reviews (Balance between oversight and autonomy)'
        },
        {
          value: 'quarterly',
          label: 'Quarterly only (Minimal overhead, maximum autonomy)'
        },
      ]
    },
    {
      id: 'q6_comment',
      question: 'Additional thoughts on review cadence',
      type: 'textarea',
      rows: 3,
      required: false
    },
    {
      id: 'q7',
      question: 'How should OKRs integrate with existing tools (Jira, etc.)?',
      type: 'radio',
      helpText: 'Connection between strategic OKRs and operational work',
      required: true,
      options: [
        {
          value: 'full-integration',
          label: 'Full integration (Every Jira epic/story linked to an OKR, automated sync)'
        },
        {
          value: 'manual-links',
          label: 'Manual links (Teams reference OKRs in Jira but no automated sync)'
        },
        {
          value: 'okr-only',
          label: 'OKR platform only (Track OKRs separately, Jira for operational tasks)'
        },
        {
          value: 'parallel',
          label: 'Parallel systems (OKRs for strategy, Jira for execution, minimal connection)'
        },
      ]
    },
    {
      id: 'q7_comment',
      question: 'Additional thoughts on tool integration',
      type: 'textarea',
      rows: 3,
      required: false
    },
    {
      id: 'q8',
      question: 'What should be our first quarter (Q1 2026) focus?',
      type: 'radio',
      helpText: 'Initial OKR implementation strategy',
      required: true,
      options: [
        {
          value: 'pilot',
          label: 'Pilot with management only (Leadership sets OKRs, refine before rolling out)'
        },
        {
          value: 'company-only',
          label: 'Company-level OKRs only (Top-level goals, no cascading yet)'
        },
        {
          value: 'full-cascade',
          label: 'Full cascade (Company → Department → Individual OKRs from day one)'
        },
        {
          value: 'one-department',
          label: 'One department pilot (Test with LithoSurfer/Data/Build, then expand)'
        },
      ]
    },
    {
      id: 'q8_comment',
      question: 'Additional thoughts on Q1 implementation approach',
      type: 'textarea',
      rows: 3,
      required: false
    },
  ]
};
