// HSE Policy Template - ISO 45001:2018 + ISO 14001:2015 Aligned
// Tailored for IT/Software/Data Analytics companies (desk-based work)
// For GDAC-SA tender compliance

import { DocumentTemplate, DocumentSection } from './types';

// Section 1: Policy Statement
const policyStatementSection: DocumentSection = {
  key: 'policy_statement',
  title: '1. HSE Policy Statement',
  description: 'Management commitment and core HSE principles',
  order: 1,
  isoClause: '5.2',
  generatesOutput: true,
  guidance: `The policy statement is the foundation of your HSE management system. It should be:
- Signed by the CEO/Managing Director
- Appropriate to the nature and scale of HSE risks
- Include commitment to comply with legal requirements
- Include commitment to continual improvement
- Be communicated to all workers`,
  questions: [
    {
      id: 'org_name',
      question: 'Organization Name',
      type: 'text',
      defaultValue: 'Lithodat Pty Ltd',
      required: true,
      helpText: 'Legal name of your organization'
    },
    {
      id: 'org_description',
      question: 'Brief description of your organization\'s activities',
      type: 'textarea',
      rows: 3,
      placeholder: 'e.g., "Lithodat is a geoscience data analytics company providing software platforms and data services for the mining and exploration industry."',
      required: true,
      helpText: 'This will appear in the policy statement introduction'
    },
    {
      id: 'work_type',
      question: 'Primary work environment',
      type: 'checkbox',
      options: [
        'Office-based work',
        'Remote/home working',
        'Data center operations',
        'Client site visits',
        'Field work (occasional)',
        'Laboratory work'
      ],
      required: true,
      helpText: 'Select all that apply - this determines which hazards are relevant'
    },
    {
      id: 'commitment_safety',
      question: 'Management commitment to safety (customize or use default)',
      type: 'textarea',
      rows: 4,
      defaultValue: 'We are committed to providing a safe and healthy working environment for all employees, contractors, and visitors. We recognize that our people are our most valuable asset and their health, safety, and wellbeing is of paramount importance.',
      required: true
    },
    {
      id: 'commitment_environment',
      question: 'Management commitment to environment (customize or use default)',
      type: 'textarea',
      rows: 3,
      defaultValue: 'We are committed to minimizing our environmental footprint through sustainable practices, energy efficiency, responsible resource use, and proper waste management.',
      required: true
    },
    {
      id: 'key_principles',
      question: 'Select the key HSE principles for your policy',
      type: 'checkbox',
      options: [
        'Comply with all applicable health, safety, and environmental legislation',
        'Identify, assess, and control workplace hazards through systematic risk management',
        'Provide safe systems of work, adequate training, and appropriate resources',
        'Support employee physical and mental wellbeing',
        'Foster a culture of safety where all take responsibility',
        'Continuously improve HSE performance through regular review',
        'Maintain emergency preparedness and respond effectively to incidents',
        'Minimize environmental impact through sustainable practices'
      ],
      required: true,
      helpText: 'Select at least 5 principles to include in your policy'
    },
    {
      id: 'approver_name',
      question: 'Policy approver name and title',
      type: 'text',
      placeholder: 'e.g., Dr. Fabian Kohlmann, Chief Executive Officer',
      required: true
    },
    {
      id: 'effective_date',
      question: 'Policy effective date',
      type: 'date',
      required: true
    },
    {
      id: 'review_frequency',
      question: 'How often will this policy be reviewed?',
      type: 'radio',
      options: ['Annually', 'Every 2 years', 'Every 3 years'],
      required: true,
      helpText: 'Annual review is recommended for ISO compliance'
    }
  ]
};

// Section 2: Objectives and Targets
const objectivesSection: DocumentSection = {
  key: 'objectives_targets',
  title: '2. HSE Objectives and Targets',
  description: 'Measurable goals for HSE performance',
  order: 2,
  isoClause: '6.2',
  generatesOutput: true,
  guidance: `Objectives should be:
- Consistent with the HSE policy
- Measurable (if practicable)
- Take into account applicable requirements
- Be monitored and communicated`,
  questions: [
    {
      id: 'safety_objectives',
      question: 'Safety Objectives',
      type: 'checklist',
      checklistItems: [
        'Zero lost time injuries',
        'Zero serious incidents',
        '100% completion of mandatory safety training',
        'All reported hazards addressed within 5 business days',
        'All workstations ergonomically assessed'
      ],
      helpText: 'Select the safety objectives relevant to your organization'
    },
    {
      id: 'health_objectives',
      question: 'Health and Wellbeing Objectives',
      type: 'checklist',
      checklistItems: [
        'Provide ergonomic workstation assessments for all employees',
        'Offer mental health support resources',
        'Promote work-life balance through flexible working',
        'Regular breaks encouraged during screen work',
        'Annual eye tests offered for DSE users'
      ]
    },
    {
      id: 'environmental_objectives',
      question: 'Environmental Objectives',
      type: 'checklist',
      checklistItems: [
        'Reduce energy consumption year-on-year',
        'Minimize paper usage through digital workflows',
        'Proper disposal of electronic waste',
        'Use energy-efficient equipment',
        'Consider environmental impact in procurement decisions'
      ]
    },
    {
      id: 'custom_objectives',
      question: 'Additional custom objectives (optional)',
      type: 'textarea',
      rows: 3,
      placeholder: 'Add any organization-specific HSE objectives not covered above'
    },
    {
      id: 'kpi_tracking',
      question: 'How will you track HSE performance?',
      type: 'checkbox',
      options: [
        'Monthly management review of incidents',
        'Quarterly HSE metrics dashboard',
        'Annual HSE performance report',
        'Leading indicators (training completion, hazard reports)',
        'Lagging indicators (incidents, near-misses)'
      ],
      required: true
    }
  ]
};

// Section 3: Organizational Structure & Responsibilities
const responsibilitiesSection: DocumentSection = {
  key: 'responsibilities',
  title: '3. Organization & Responsibilities',
  description: 'HSE roles, responsibilities, and accountability',
  order: 3,
  isoClause: '5.3',
  generatesOutput: true,
  guidance: `Define clear roles and responsibilities for HSE:
- Top management accountability
- Line management responsibilities
- Employee responsibilities
- HSE coordination (if applicable)`,
  questions: [
    {
      id: 'top_management_role',
      question: 'Who has overall accountability for HSE? (Top Management)',
      type: 'text',
      placeholder: 'e.g., CEO / Managing Director',
      required: true
    },
    {
      id: 'top_management_responsibilities',
      question: 'Top Management HSE Responsibilities',
      type: 'checklist',
      checklistItems: [
        'Ensure the HSE policy is established and communicated',
        'Ensure HSE management system requirements are integrated into business processes',
        'Provide adequate resources for HSE',
        'Promote continual improvement',
        'Support other relevant management roles'
      ],
      required: true
    },
    {
      id: 'hse_coordinator',
      question: 'Is there a designated HSE coordinator/officer?',
      type: 'radio',
      options: ['Yes - dedicated role', 'Yes - part of another role', 'No - responsibilities distributed'],
      required: true
    },
    {
      id: 'hse_coordinator_name',
      question: 'HSE Coordinator name and role',
      type: 'text',
      placeholder: 'e.g., Keith Dimech, COO (HSE Coordinator)',
      conditionalOn: { questionId: 'hse_coordinator', value: ['Yes - dedicated role', 'Yes - part of another role'] }
    },
    {
      id: 'manager_responsibilities',
      question: 'Manager/Team Lead HSE Responsibilities',
      type: 'checklist',
      checklistItems: [
        'Ensure team members receive appropriate HSE training',
        'Conduct or arrange workstation assessments',
        'Address hazards and concerns raised by team members',
        'Lead by example in following HSE procedures',
        'Report incidents and near-misses promptly',
        'Support flexible working and work-life balance'
      ]
    },
    {
      id: 'employee_responsibilities',
      question: 'Employee HSE Responsibilities',
      type: 'checklist',
      checklistItems: [
        'Follow safe work practices and procedures',
        'Report hazards, incidents, and near-misses promptly',
        'Participate in HSE training',
        'Use equipment safely and as intended',
        'Take responsibility for own safety and that of others',
        'Maintain a tidy and safe workspace'
      ],
      required: true
    },
    {
      id: 'contractor_responsibilities',
      question: 'How do you manage contractor HSE?',
      type: 'radio',
      options: [
        'Contractors must agree to our HSE requirements',
        'Contractors must provide their own HSE documentation',
        'Not applicable - no contractors used',
        'Case-by-case assessment'
      ]
    }
  ]
};

// Section 4: Risk Assessment
const riskAssessmentSection: DocumentSection = {
  key: 'risk_assessment',
  title: '4. Risk Assessment',
  description: 'Identification and control of workplace hazards',
  order: 4,
  isoClause: '6.1.2',
  generatesOutput: true,
  guidance: `For IT/desk-based work, key hazards include:
- Ergonomic hazards (workstation setup, posture)
- Display Screen Equipment (DSE) risks
- Mental health and stress
- Electrical safety
- Fire safety
- Slips, trips, and falls`,
  questions: [
    {
      id: 'hazard_categories',
      question: 'Which hazard categories are relevant to your work?',
      type: 'checkbox',
      options: [
        { value: 'ergonomic', label: 'Ergonomic hazards', description: 'Workstation setup, posture, repetitive strain' },
        { value: 'dse', label: 'Display Screen Equipment (DSE)', description: 'Eye strain, screen glare, prolonged sitting' },
        { value: 'mental_health', label: 'Psychosocial hazards', description: 'Stress, workload, work-life balance' },
        { value: 'electrical', label: 'Electrical safety', description: 'Computers, equipment, cables' },
        { value: 'fire', label: 'Fire safety', description: 'Office fire risks, evacuation' },
        { value: 'slips_trips', label: 'Slips, trips, and falls', description: 'Office environment hazards' },
        { value: 'remote_work', label: 'Remote/home working', description: 'Home office setup, isolation' },
        { value: 'travel', label: 'Business travel', description: 'Travel risks, fatigue' },
        { value: 'manual_handling', label: 'Manual handling', description: 'Moving equipment, boxes' }
      ],
      required: true,
      helpText: 'Select all hazard categories relevant to your workplace'
    },
    {
      id: 'risk_assessment_approach',
      question: 'How will risk assessments be conducted?',
      type: 'checkbox',
      options: [
        'Workstation self-assessment by employees',
        'Manager-conducted assessments',
        'Professional ergonomic assessments (as needed)',
        'Annual workplace inspections',
        'Risk assessment for new activities/changes'
      ],
      required: true
    },
    {
      id: 'dse_assessment_frequency',
      question: 'How often should DSE/workstation assessments be conducted?',
      type: 'radio',
      options: [
        'On joining and when setup changes',
        'Annually',
        'Every 2 years',
        'On request only'
      ],
      conditionalOn: { questionId: 'hazard_categories', value: ['dse', 'ergonomic'] }
    },
    {
      id: 'mental_health_measures',
      question: 'Mental health and wellbeing measures',
      type: 'checkbox',
      options: [
        'Employee Assistance Program (EAP)',
        'Mental health first aiders',
        'Regular 1-on-1 check-ins',
        'Flexible working arrangements',
        'Workload monitoring',
        'Stress awareness training',
        'Clear escalation paths for concerns'
      ],
      conditionalOn: { questionId: 'hazard_categories', value: ['mental_health'] }
    },
    {
      id: 'risk_register_maintained',
      question: 'Will you maintain a risk register?',
      type: 'radio',
      options: ['Yes - formal risk register', 'Yes - simplified hazard log', 'No - documented in procedures only'],
      helpText: 'A risk register helps track identified hazards and control measures'
    },
    {
      id: 'control_hierarchy',
      question: 'Confirm you will apply the hierarchy of controls',
      type: 'info',
      helpText: `The hierarchy of controls (in order of effectiveness):
1. **Elimination** - Remove the hazard entirely
2. **Substitution** - Replace with something less hazardous
3. **Engineering controls** - Physical changes (e.g., ergonomic equipment)
4. **Administrative controls** - Procedures, training, signage
5. **PPE** - Personal protective equipment (last resort)`
    }
  ]
};

// Section 5: Operational Controls & Procedures
const operationalControlsSection: DocumentSection = {
  key: 'operational_controls',
  title: '5. Operational Controls & Procedures',
  description: 'Documented procedures for managing HSE risks',
  order: 5,
  isoClause: '8.1',
  generatesOutput: true,
  guidance: `Document the key procedures you have in place to control HSE risks.
These don't need to be complex for office/IT environments - proportionate to the risks.`,
  questions: [
    {
      id: 'documented_procedures',
      question: 'Which procedures will you document?',
      type: 'checkbox',
      options: [
        'Workstation setup and assessment',
        'Display Screen Equipment (DSE) guidelines',
        'Remote/home working guidelines',
        'Incident reporting procedure',
        'Emergency evacuation procedure',
        'First aid procedure',
        'New employee HSE induction',
        'Visitor management',
        'Electrical equipment checks',
        'Fire safety (testing, drills)',
        'Lone working (if applicable)',
        'Business travel safety'
      ],
      required: true,
      helpText: 'Select all procedures relevant to your operations'
    },
    {
      id: 'induction_includes',
      question: 'What does your HSE induction cover?',
      type: 'checkbox',
      options: [
        'HSE policy overview',
        'Emergency procedures and exits',
        'First aid facilities and contacts',
        'Workstation setup guidance',
        'Incident reporting',
        'Key hazards and controls',
        'Remote working guidelines',
        'Mental health resources'
      ],
      required: true
    },
    {
      id: 'change_management',
      question: 'How do you manage HSE implications of changes?',
      type: 'radio',
      options: [
        'Formal change management process',
        'Risk assessment for significant changes',
        'Manager discretion',
        'Not formalized'
      ],
      helpText: 'e.g., new equipment, office moves, new work activities'
    },
    {
      id: 'contractor_management',
      question: 'How do you manage contractors/visitors?',
      type: 'textarea',
      rows: 2,
      placeholder: 'e.g., Sign-in procedures, safety briefing, supervision requirements',
      required: false
    }
  ]
};

// Section 6: Emergency Preparedness
const emergencySection: DocumentSection = {
  key: 'emergency_preparedness',
  title: '6. Emergency Preparedness & Response',
  description: 'Emergency procedures and response planning',
  order: 6,
  isoClause: '8.2',
  generatesOutput: true,
  guidance: `Plan for potential emergencies appropriate to your workplace:
- Fire
- Medical emergencies
- Severe weather (if relevant)
- IT/data emergencies (if HSE-relevant)`,
  questions: [
    {
      id: 'emergency_types',
      question: 'Which emergency types are relevant?',
      type: 'checkbox',
      options: [
        'Fire',
        'Medical emergency',
        'Security incident',
        'Natural disaster (earthquake, flood)',
        'Power outage',
        'Building evacuation',
        'Remote worker emergency'
      ],
      required: true
    },
    {
      id: 'fire_procedures',
      question: 'Fire emergency procedures in place',
      type: 'checklist',
      checklistItems: [
        'Evacuation routes posted',
        'Assembly point designated',
        'Fire extinguishers maintained',
        'Fire alarm system (if applicable)',
        'Fire wardens appointed',
        'Regular fire drills (at least annual)',
        'Remote workers have home fire safety guidance'
      ],
      conditionalOn: { questionId: 'emergency_types', value: ['Fire'] }
    },
    {
      id: 'first_aid',
      question: 'First aid arrangements',
      type: 'checkbox',
      options: [
        'First aid kit(s) maintained',
        'Trained first aiders',
        'First aid information displayed',
        'AED (defibrillator) available',
        'Emergency services contact displayed',
        'Remote workers have first aid guidance'
      ],
      required: true
    },
    {
      id: 'emergency_contacts',
      question: 'Key emergency contacts',
      type: 'contact_list',
      helpText: 'List key emergency contacts (will be formatted as a table)'
    },
    {
      id: 'drill_frequency',
      question: 'How often are emergency drills conducted?',
      type: 'radio',
      options: ['Annually', 'Every 6 months', 'Quarterly', 'Not applicable (remote only)'],
      required: true
    }
  ]
};

// Section 7: Training and Competence
const trainingSection: DocumentSection = {
  key: 'training_competence',
  title: '7. Training and Competence',
  description: 'HSE training requirements and records',
  order: 7,
  isoClause: '7.2',
  generatesOutput: true,
  guidance: `Ensure workers are competent to perform their work safely.
Training should be appropriate to the risks they face.`,
  questions: [
    {
      id: 'mandatory_training',
      question: 'Which HSE training is mandatory for all employees?',
      type: 'checkbox',
      options: [
        'HSE induction (on joining)',
        'Fire safety awareness',
        'DSE/workstation setup',
        'Emergency procedures',
        'Incident reporting',
        'Mental health awareness',
        'Remote working safety'
      ],
      required: true
    },
    {
      id: 'role_specific_training',
      question: 'Role-specific training requirements',
      type: 'checkbox',
      options: [
        'First aid training (first aiders)',
        'Fire warden training',
        'Manager HSE responsibilities',
        'Ergonomic assessment training',
        'Mental health first aid'
      ]
    },
    {
      id: 'training_records',
      question: 'How are training records maintained?',
      type: 'radio',
      options: [
        'HR system/database',
        'Spreadsheet/document',
        'Learning Management System (LMS)',
        'Manager records'
      ],
      required: true
    },
    {
      id: 'training_review',
      question: 'How often is training reviewed/refreshed?',
      type: 'radio',
      options: [
        'Annually',
        'Every 2 years',
        'When procedures change',
        'On request'
      ]
    }
  ]
};

// Section 8: Environmental Management
const environmentalSection: DocumentSection = {
  key: 'environmental_management',
  title: '8. Environmental Management',
  description: 'Environmental aspects and controls',
  order: 8,
  isoClause: 'ISO 14001 6.1.2',
  generatesOutput: true,
  guidance: `For IT/software companies, environmental aspects typically include:
- Energy consumption (computers, servers, HVAC)
- Waste (electronic waste, paper)
- Procurement choices`,
  questions: [
    {
      id: 'environmental_aspects',
      question: 'Which environmental aspects are relevant?',
      type: 'checkbox',
      options: [
        { value: 'energy', label: 'Energy consumption', description: 'Office, data centers, remote work' },
        { value: 'ewaste', label: 'Electronic waste', description: 'Computers, equipment disposal' },
        { value: 'paper', label: 'Paper usage', description: 'Printing, documentation' },
        { value: 'water', label: 'Water usage', description: 'Office facilities' },
        { value: 'travel', label: 'Business travel emissions', description: 'Flights, car travel' },
        { value: 'procurement', label: 'Sustainable procurement', description: 'Equipment, supplies' },
        { value: 'cloud', label: 'Cloud computing', description: 'Data center environmental impact' }
      ],
      required: true
    },
    {
      id: 'energy_measures',
      question: 'Energy efficiency measures',
      type: 'checkbox',
      options: [
        'Energy-efficient equipment (Energy Star, etc.)',
        'Power management settings on computers',
        'LED lighting',
        'HVAC efficiency measures',
        'Renewable energy use or carbon offsets',
        'Cloud provider sustainability criteria'
      ],
      conditionalOn: { questionId: 'environmental_aspects', value: ['energy'] }
    },
    {
      id: 'waste_management',
      question: 'Waste management measures',
      type: 'checkbox',
      options: [
        'Electronic waste recycling program',
        'Certified e-waste disposal',
        'Paper recycling',
        'General waste reduction',
        'Printer/toner recycling'
      ]
    },
    {
      id: 'environmental_monitoring',
      question: 'How do you monitor environmental performance?',
      type: 'checkbox',
      options: [
        'Energy usage tracking',
        'Waste quantities tracked',
        'Carbon footprint estimation',
        'Annual environmental review',
        'Supplier environmental assessments'
      ]
    }
  ]
};

// Section 9: Monitoring and Measurement
const monitoringSection: DocumentSection = {
  key: 'monitoring_measurement',
  title: '9. Monitoring, Measurement & Improvement',
  description: 'HSE performance monitoring and continual improvement',
  order: 9,
  isoClause: '9.1',
  generatesOutput: true,
  guidance: `Monitor HSE performance to ensure the system is effective and continually improving.`,
  questions: [
    {
      id: 'leading_indicators',
      question: 'Leading indicators to track',
      type: 'checkbox',
      options: [
        'Training completion rates',
        'Hazard reports submitted',
        'Workstation assessments completed',
        'Safety observations/walkthroughs',
        'Procedure compliance checks',
        'Emergency drill participation'
      ],
      helpText: 'Leading indicators predict future performance'
    },
    {
      id: 'lagging_indicators',
      question: 'Lagging indicators to track',
      type: 'checkbox',
      options: [
        'Recordable incidents',
        'Lost time injuries',
        'Near-miss reports',
        'First aid cases',
        'Sickness absence rates',
        'Environmental incidents'
      ],
      helpText: 'Lagging indicators measure past events'
    },
    {
      id: 'incident_investigation',
      question: 'How are incidents investigated?',
      type: 'radio',
      options: [
        'Formal investigation procedure with root cause analysis',
        'Manager investigation and report',
        'Simple incident report form',
        'Case-by-case basis'
      ],
      required: true
    },
    {
      id: 'management_review',
      question: 'Management review frequency',
      type: 'radio',
      options: ['Monthly', 'Quarterly', 'Annually', 'As needed'],
      required: true,
      helpText: 'How often does management review HSE performance?'
    },
    {
      id: 'corrective_actions',
      question: 'How are corrective actions managed?',
      type: 'radio',
      options: [
        'Formal corrective action process with tracking',
        'Action items in management review',
        'Informal follow-up',
        'Case-by-case'
      ]
    },
    {
      id: 'audit_program',
      question: 'Do you conduct internal HSE audits?',
      type: 'radio',
      options: [
        'Yes - annual audit program',
        'Yes - periodic spot checks',
        'No - rely on management review',
        'Plan to implement'
      ]
    }
  ]
};

// Section 10: Document Control
const documentControlSection: DocumentSection = {
  key: 'document_control',
  title: '10. Document Control & Records',
  description: 'HSE documentation and record keeping',
  order: 10,
  isoClause: '7.5',
  generatesOutput: true,
  guidance: `Maintain documented information required for the HSE management system.
Records demonstrate compliance and support improvement.`,
  questions: [
    {
      id: 'controlled_documents',
      question: 'Which HSE documents are controlled?',
      type: 'checkbox',
      options: [
        'HSE Policy',
        'Procedures and work instructions',
        'Risk assessments',
        'Training records',
        'Incident records',
        'Emergency plans',
        'Meeting minutes',
        'Audit reports'
      ],
      required: true
    },
    {
      id: 'document_location',
      question: 'Where are HSE documents stored?',
      type: 'radio',
      options: [
        'Shared drive/cloud storage',
        'Document management system',
        'Company intranet',
        'Physical files',
        'Multiple locations'
      ],
      required: true
    },
    {
      id: 'retention_period',
      question: 'How long are HSE records retained?',
      type: 'radio',
      options: [
        '3 years',
        '5 years',
        '7 years',
        'Permanently',
        'Varies by record type'
      ],
      helpText: 'Consider legal requirements in your jurisdiction'
    },
    {
      id: 'version_control',
      question: 'How is document version control managed?',
      type: 'radio',
      options: [
        'Version numbering system',
        'Date-based versioning',
        'Document management system automatic',
        'Not formally controlled'
      ]
    }
  ]
};

// Complete HSE Policy Template
export const hsePolicyTemplate: DocumentTemplate = {
  type: 'HSE_POLICY',
  title: 'HSE Policy & Procedures',
  description: 'Health, Safety, and Environment Policy aligned with ISO 45001:2018 and ISO 14001:2015. Tailored for IT, software, and data analytics organizations.',
  isoStandards: ['ISO 45001:2018', 'ISO 14001:2015'],
  version: '1.0.0',
  lastUpdated: '2025-12-09',
  sections: [
    policyStatementSection,
    objectivesSection,
    responsibilitiesSection,
    riskAssessmentSection,
    operationalControlsSection,
    emergencySection,
    trainingSection,
    environmentalSection,
    monitoringSection,
    documentControlSection
  ]
};

export default hsePolicyTemplate;
