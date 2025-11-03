/**
 * VSM System 1 Assessment Questions
 *
 * System 1 represents the operational units that directly produce
 * the organization's outputs. These are the "doing" units.
 *
 * For Lithodat, this includes: LithoSurfer, LithoBuild, LithoData
 */

export interface Question {
  id: string
  question: string
  type: 'textarea' | 'radio' | 'checkbox' | 'text'
  placeholder?: string
  options?: string[]
  helpText?: string
}

export const system1Questions: Question[] = [
  {
    id: 'q1_operational_units',
    question: 'What are your distinct operational units?',
    type: 'textarea',
    placeholder: 'List and briefly describe each operational unit (e.g., LithoSurfer, LithoBuild, LithoData)...',
    helpText: 'System 1 units are the operational parts that directly produce outputs. Think of distinct products, services, or operational divisions.'
  },
  {
    id: 'q2_unit_independence',
    question: 'Can each operational unit function independently?',
    type: 'radio',
    options: ['Yes, all units are fully autonomous', 'Mostly, with some dependencies', 'Partially independent', 'No, units are highly interdependent'],
    helpText: 'Independent units can make their own operational decisions and deliver value on their own.'
  },
  {
    id: 'q3_outputs_customers',
    question: 'Does each unit have clearly defined outputs and customers?',
    type: 'textarea',
    placeholder: 'For each unit, describe: What does it produce? Who are its customers (internal or external)?',
    helpText: 'Clear outputs and customers indicate a well-defined operational unit.'
  },
  {
    id: 'q4_resources_control',
    question: 'Do operational units have control over their own resources?',
    type: 'radio',
    options: ['Yes, full control', 'Mostly, with some shared resources', 'Limited control', 'No, resources are centrally managed'],
    helpText: 'Resources include people, budget, tools, and decision-making authority.'
  },
  {
    id: 'q5_performance_measurement',
    question: 'How do you currently measure each unit\'s performance?',
    type: 'textarea',
    placeholder: 'Describe the metrics or KPIs used for each operational unit...',
    helpText: 'Good metrics align with the unit\'s purpose and outputs.'
  },
  {
    id: 'q6_coordination',
    question: 'How well do operational units coordinate with each other?',
    type: 'radio',
    options: ['Excellent coordination', 'Good, but could improve', 'Fair, some gaps', 'Poor, significant issues', 'Units rarely need to coordinate'],
    helpText: 'Coordination between System 1 units is crucial for organizational effectiveness.'
  },
  {
    id: 'q7_operational_challenges',
    question: 'What are the biggest operational challenges facing each unit?',
    type: 'textarea',
    placeholder: 'List specific challenges or pain points for each operational unit...',
    helpText: 'Identifying challenges helps prioritize improvements.'
  },
  {
    id: 'q8_autonomy_vs_standardization',
    question: 'How do you balance unit autonomy with organizational standardization?',
    type: 'textarea',
    placeholder: 'Describe how you manage the tension between allowing units freedom and maintaining consistency...',
    helpText: 'Viable systems need both autonomy (for adaptation) and standardization (for efficiency).'
  },
  {
    id: 'q9_capacity_utilization',
    question: 'Are your operational units operating at capacity?',
    type: 'radio',
    options: ['Overcapacity (too much work)', 'At optimal capacity', 'Undercapacity (could handle more)', 'Mixed - varies by unit', 'Not sure'],
    helpText: 'Understanding capacity helps with resource planning and growth decisions.'
  },
  {
    id: 'q10_unit_viability',
    question: 'Are all operational units viable long-term? Should any be restructured, merged, or sunset?',
    type: 'textarea',
    placeholder: 'Reflect on the long-term viability of each unit and any structural changes needed...',
    helpText: 'This question helps identify strategic adjustments to the operational structure.'
  }
]

/**
 * Get total number of questions
 */
export const getTotalQuestions = () => system1Questions.length

/**
 * Get question by index (0-based)
 */
export const getQuestionByIndex = (index: number): Question | null => {
  if (index < 0 || index >= system1Questions.length) {
    return null
  }
  return system1Questions[index]
}

/**
 * Get question by ID
 */
export const getQuestionById = (id: string): Question | null => {
  return system1Questions.find(q => q.id === id) || null
}

/**
 * Validate that all required questions have responses
 */
export const validateResponses = (responses: Record<string, string>): boolean => {
  // Check that all question IDs have non-empty responses
  return system1Questions.every(q => {
    const response = responses[q.id]
    return response && response.trim().length > 0
  })
}
