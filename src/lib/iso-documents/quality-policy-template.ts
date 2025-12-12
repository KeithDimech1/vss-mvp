// ISO 9001:2015 Quality Management System Policy Template
// Tailored for IT, Software, and Data Analytics Organizations

import { DocumentTemplate } from './types';

export const qualityPolicyTemplate: DocumentTemplate = {
  type: 'QUALITY_POLICY',
  title: 'Quality Management System Policy & Procedures',
  description: 'ISO 9001:2015 aligned Quality Management System documentation for IT and data analytics organizations. Covers quality policy, objectives, processes, and continuous improvement.',
  isoStandards: ['ISO 9001:2015'],
  version: '1.0.0',
  lastUpdated: '2025-12-09',
  sections: [
    // Section 1: Quality Policy Statement (ISO 9001 Clause 5.2)
    {
      key: 'quality_policy_statement',
      title: 'Quality Policy Statement',
      description: 'Define top management commitment to quality and customer satisfaction. This statement will appear on the cover page of your QMS documentation.',
      order: 1,
      isoClause: '5.2',
      guidance: 'The Quality Policy must be appropriate to the organization\'s purpose and context, provide a framework for quality objectives, include commitment to satisfy requirements, and include commitment to continual improvement.',
      generatesOutput: true,
      questions: [
        {
          id: 'org_name',
          question: 'Organization Name',
          type: 'text',
          placeholder: 'Lithodat Pty Ltd',
          required: true,
          helpText: 'Legal name of the organization'
        },
        {
          id: 'org_description',
          question: 'Brief Organization Description',
          type: 'textarea',
          placeholder: 'A geoscience data analytics company specializing in geological database management, data integration, and AI-powered analysis tools...',
          required: true,
          helpText: 'Describe your organization\'s core business in 2-3 sentences',
          rows: 3
        },
        {
          id: 'quality_commitment',
          question: 'Quality Commitment Statement',
          type: 'textarea',
          placeholder: 'We are committed to delivering exceptional quality in all our products and services, meeting or exceeding customer expectations through continuous improvement and adherence to international standards...',
          required: true,
          helpText: 'A statement of top management\'s commitment to quality (2-4 sentences)',
          rows: 4
        },
        {
          id: 'quality_principles',
          question: 'Core Quality Principles',
          type: 'checkbox',
          options: [
            'Customer Focus - Understanding and meeting customer needs',
            'Leadership - Establishing unity of purpose and direction',
            'Engagement of People - Competent, empowered, and engaged people',
            'Process Approach - Managing activities as interrelated processes',
            'Improvement - Ongoing focus on improvement',
            'Evidence-based Decision Making - Decisions based on data analysis',
            'Relationship Management - Managing relationships with interested parties'
          ],
          required: true,
          helpText: 'Select the ISO 9001 quality management principles your organization commits to (recommend selecting all 7)'
        },
        {
          id: 'ceo_name',
          question: 'CEO/Managing Director Name',
          type: 'text',
          placeholder: 'Fabian Kohlmann',
          required: true,
          helpText: 'Name of the person who will sign the Quality Policy'
        },
        {
          id: 'ceo_title',
          question: 'CEO/Managing Director Title',
          type: 'text',
          placeholder: 'Chief Executive Officer',
          required: true
        },
        {
          id: 'effective_date',
          question: 'Policy Effective Date',
          type: 'date',
          required: true,
          helpText: 'Date from which this policy becomes effective'
        },
        {
          id: 'review_date',
          question: 'Next Review Date',
          type: 'date',
          required: true,
          helpText: 'Policies should be reviewed at least annually'
        }
      ]
    },

    // Section 2: Quality Objectives (ISO 9001 Clause 6.2)
    {
      key: 'quality_objectives',
      title: 'Quality Objectives & Targets',
      description: 'Define measurable quality objectives that align with the quality policy and are relevant to product/service conformity and customer satisfaction.',
      order: 2,
      isoClause: '6.2',
      guidance: 'Quality objectives must be: consistent with the quality policy, measurable, take into account applicable requirements, relevant to conformity of products/services, monitored, communicated, and updated as appropriate.',
      questions: [
        {
          id: 'obj_customer_satisfaction',
          question: 'Customer Satisfaction Objective',
          type: 'textarea',
          placeholder: 'Achieve and maintain customer satisfaction rating of 90% or higher as measured through quarterly surveys and feedback mechanisms...',
          required: true,
          helpText: 'Define a measurable objective for customer satisfaction',
          rows: 3
        },
        {
          id: 'obj_customer_target',
          question: 'Customer Satisfaction Target',
          type: 'text',
          placeholder: '90% satisfaction rating',
          required: true
        },
        {
          id: 'obj_delivery',
          question: 'On-Time Delivery Objective',
          type: 'textarea',
          placeholder: 'Deliver projects and services within agreed timelines, achieving 95% on-time delivery rate...',
          required: true,
          helpText: 'Define a measurable objective for delivery performance',
          rows: 3
        },
        {
          id: 'obj_delivery_target',
          question: 'On-Time Delivery Target',
          type: 'text',
          placeholder: '95% on-time delivery',
          required: true
        },
        {
          id: 'obj_defect_rate',
          question: 'Defect/Error Rate Objective',
          type: 'textarea',
          placeholder: 'Maintain software defect rate below 2 critical bugs per release, with zero data integrity issues in delivered datasets...',
          required: true,
          helpText: 'Define a measurable objective for product/service quality',
          rows: 3
        },
        {
          id: 'obj_defect_target',
          question: 'Defect Rate Target',
          type: 'text',
          placeholder: '<2 critical bugs per release, 0 data integrity issues',
          required: true
        },
        {
          id: 'obj_improvement',
          question: 'Continuous Improvement Objective',
          type: 'textarea',
          placeholder: 'Implement at least 4 process improvements per year based on lessons learned and customer feedback...',
          required: true,
          helpText: 'Define a measurable objective for continuous improvement',
          rows: 3
        },
        {
          id: 'obj_improvement_target',
          question: 'Improvement Target',
          type: 'text',
          placeholder: '4+ process improvements annually',
          required: true
        },
        {
          id: 'obj_competence',
          question: 'Staff Competence Objective',
          type: 'textarea',
          placeholder: 'Ensure 100% of technical staff complete required training and maintain relevant certifications...',
          required: false,
          helpText: 'Optional: Define objectives related to staff competence',
          rows: 3
        },
        {
          id: 'measurement_frequency',
          question: 'How often will objectives be measured?',
          type: 'radio',
          options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
          required: true
        }
      ]
    },

    // Section 3: Context of the Organization (ISO 9001 Clause 4)
    {
      key: 'organization_context',
      title: 'Context of the Organization',
      description: 'Define the internal and external factors relevant to your organization\'s purpose and strategic direction, and the needs of interested parties.',
      order: 3,
      isoClause: '4.1, 4.2',
      guidance: 'Understanding context helps ensure the QMS is appropriate and can achieve intended results. Consider: external issues (market, regulatory, technology), internal issues (culture, capabilities), and interested parties (customers, suppliers, regulators).',
      questions: [
        {
          id: 'external_issues',
          question: 'External Issues Affecting Quality',
          type: 'checkbox',
          options: [
            'Market competition and customer expectations',
            'Regulatory requirements (data protection, industry standards)',
            'Technology changes and digital transformation',
            'Economic conditions affecting client budgets',
            'International operations and cultural factors',
            'Environmental and sustainability considerations',
            'Supply chain dependencies'
          ],
          required: true,
          helpText: 'Select external factors that influence your quality management'
        },
        {
          id: 'external_issues_detail',
          question: 'Describe Key External Factors',
          type: 'textarea',
          placeholder: 'Operating in the geoscience sector with clients in mining, oil & gas, and government. Subject to data protection regulations (GDPR, Australian Privacy Act). Technology landscape rapidly evolving with AI/ML capabilities...',
          required: true,
          rows: 4
        },
        {
          id: 'internal_issues',
          question: 'Internal Issues Affecting Quality',
          type: 'checkbox',
          options: [
            'Organizational culture and values',
            'Staff skills and competencies',
            'Technology infrastructure',
            'Financial resources',
            'Knowledge management',
            'Process maturity',
            'Remote/distributed workforce'
          ],
          required: true,
          helpText: 'Select internal factors that influence your quality management'
        },
        {
          id: 'internal_issues_detail',
          question: 'Describe Key Internal Factors',
          type: 'textarea',
          placeholder: 'Small but highly skilled team with deep geoscience expertise. Remote-first culture with team members across multiple countries. Strong technical capabilities but growing need for documented processes...',
          required: true,
          rows: 4
        },
        {
          id: 'interested_parties',
          question: 'Key Interested Parties',
          type: 'checkbox',
          options: [
            'Customers (direct clients)',
            'End users of products/services',
            'Employees and contractors',
            'Shareholders/owners',
            'Suppliers and partners',
            'Regulatory bodies',
            'Industry associations',
            'Local communities'
          ],
          required: true,
          helpText: 'Select parties with interests in your quality performance'
        },
        {
          id: 'customer_requirements',
          question: 'Key Customer Requirements',
          type: 'textarea',
          placeholder: 'Data accuracy and integrity, timely delivery, responsive support, clear documentation, data security and confidentiality...',
          required: true,
          helpText: 'What do your customers expect from your products/services?',
          rows: 3
        },
        {
          id: 'qms_scope',
          question: 'QMS Scope Statement',
          type: 'textarea',
          placeholder: 'The Quality Management System applies to the design, development, and delivery of geoscience data management solutions, including database design, data integration, quality assurance, and analytical services...',
          required: true,
          helpText: 'Define the boundaries and applicability of your QMS',
          rows: 4
        }
      ]
    },

    // Section 4: Leadership & Responsibilities (ISO 9001 Clause 5)
    {
      key: 'leadership_responsibilities',
      title: 'Leadership & Responsibilities',
      description: 'Define quality management roles, responsibilities, and authorities within the organization.',
      order: 4,
      isoClause: '5.1, 5.3',
      guidance: 'Top management must demonstrate leadership and commitment to the QMS. Roles, responsibilities, and authorities must be assigned and communicated.',
      questions: [
        {
          id: 'top_management_commitment',
          question: 'Top Management Responsibilities',
          type: 'checkbox',
          options: [
            'Establishing and communicating quality policy and objectives',
            'Ensuring QMS requirements are integrated into business processes',
            'Promoting process approach and risk-based thinking',
            'Ensuring resources are available for the QMS',
            'Communicating importance of effective quality management',
            'Ensuring QMS achieves its intended results',
            'Engaging, directing, and supporting persons contributing to QMS',
            'Promoting continual improvement',
            'Supporting other relevant management roles'
          ],
          required: true,
          helpText: 'Select responsibilities that top management commits to'
        },
        {
          id: 'quality_manager',
          question: 'Quality Manager/Representative Name',
          type: 'text',
          placeholder: 'Keith Dimech',
          required: true,
          helpText: 'Person responsible for QMS oversight'
        },
        {
          id: 'quality_manager_title',
          question: 'Quality Manager Title',
          type: 'text',
          placeholder: 'Chief Operating Officer',
          required: true
        },
        {
          id: 'quality_manager_responsibilities',
          question: 'Quality Manager Responsibilities',
          type: 'checkbox',
          options: [
            'Ensuring QMS conforms to ISO 9001 requirements',
            'Reporting on QMS performance to top management',
            'Promoting customer focus throughout the organization',
            'Managing internal audits',
            'Coordinating management reviews',
            'Maintaining QMS documentation',
            'Tracking corrective actions',
            'Managing supplier quality'
          ],
          required: true
        },
        {
          id: 'department_quality_roles',
          question: 'Department Quality Responsibilities',
          type: 'textarea',
          placeholder: 'Development Team: Code reviews, testing, documentation\nData Team: Data validation, quality checks, accuracy verification\nProject Management: Client communication, delivery tracking, issue resolution\nAll Staff: Following procedures, reporting issues, suggesting improvements...',
          required: true,
          helpText: 'Describe quality responsibilities by department or role',
          rows: 6
        },
        {
          id: 'communication_methods',
          question: 'Quality Communication Methods',
          type: 'checkbox',
          options: [
            'Team meetings (weekly/monthly)',
            'Quality dashboards',
            'Email updates',
            'Slack/Teams channels',
            'All-hands meetings',
            'Training sessions',
            'Notice boards/intranet',
            'Project retrospectives'
          ],
          required: true,
          helpText: 'How quality information is communicated within the organization'
        }
      ]
    },

    // Section 5: Risk-Based Thinking (ISO 9001 Clause 6.1)
    {
      key: 'risk_management',
      title: 'Risk-Based Thinking',
      description: 'Identify and address risks and opportunities that could affect QMS outcomes, product/service conformity, and customer satisfaction.',
      order: 5,
      isoClause: '6.1',
      guidance: 'Risk-based thinking enables proactive prevention. Consider risks to: meeting customer requirements, product/service quality, process effectiveness, and QMS performance.',
      questions: [
        {
          id: 'risk_categories',
          question: 'Quality Risk Categories',
          type: 'checkbox',
          options: [
            'Data Quality Risks - accuracy, completeness, integrity',
            'Technical Risks - software bugs, system failures, security',
            'Resource Risks - staff availability, skills gaps, turnover',
            'Supplier Risks - third-party service quality, availability',
            'Project Risks - scope creep, timeline delays, budget overruns',
            'Compliance Risks - regulatory changes, certification requirements',
            'Customer Risks - changing requirements, communication gaps',
            'Knowledge Risks - undocumented processes, single points of failure'
          ],
          required: true,
          helpText: 'Select categories of risks relevant to your quality management'
        },
        {
          id: 'key_risks',
          question: 'Top Quality Risks',
          type: 'textarea',
          placeholder: '1. Data integrity errors in delivered datasets - could damage client trust and project outcomes\n2. Key person dependency - critical knowledge held by few individuals\n3. Scope creep affecting delivery quality - pressure to add features without adequate time\n4. Third-party API/service failures - dependency on external data sources...',
          required: true,
          helpText: 'List your top 3-5 quality risks with brief descriptions',
          rows: 6
        },
        {
          id: 'risk_assessment_method',
          question: 'Risk Assessment Approach',
          type: 'radio',
          options: [
            'Likelihood x Impact matrix (Low/Medium/High)',
            'FMEA (Failure Mode and Effects Analysis)',
            'Quantitative risk scoring (1-5 scales)',
            'Simple risk register with categorization'
          ],
          required: true,
          helpText: 'How will risks be assessed and prioritized?'
        },
        {
          id: 'risk_mitigation_example',
          question: 'Risk Mitigation Examples',
          type: 'textarea',
          placeholder: 'Data integrity: Implement automated validation checks, peer review process, and checksums\nKey person dependency: Document processes, cross-train team members, maintain knowledge base\nScope creep: Clear change management process, documented requirements, client sign-off...',
          required: true,
          helpText: 'Describe mitigation strategies for your key risks',
          rows: 6
        },
        {
          id: 'opportunities',
          question: 'Quality Improvement Opportunities',
          type: 'textarea',
          placeholder: 'Automation of quality checks to improve consistency\nAI-assisted data validation to catch errors earlier\nClient feedback integration for continuous improvement\nProcess standardization to reduce variation...',
          required: false,
          helpText: 'Identify opportunities to enhance quality outcomes',
          rows: 4
        },
        {
          id: 'risk_review_frequency',
          question: 'Risk Review Frequency',
          type: 'radio',
          options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'Per project'],
          required: true
        }
      ]
    },

    // Section 6: Operational Planning & Control (ISO 9001 Clause 8)
    {
      key: 'operational_control',
      title: 'Operational Planning & Control',
      description: 'Define processes for planning, implementing, and controlling operations to meet requirements for products and services.',
      order: 6,
      isoClause: '8.1',
      guidance: 'Operational control ensures products and services meet requirements. This includes: determining requirements, establishing criteria for processes, implementing controls, and maintaining documented information.',
      questions: [
        {
          id: 'core_processes',
          question: 'Core Business Processes',
          type: 'checkbox',
          options: [
            'Sales and customer acquisition',
            'Requirements gathering and scoping',
            'Project planning and scheduling',
            'Software/product development',
            'Data processing and analysis',
            'Quality assurance and testing',
            'Delivery and deployment',
            'Customer support and maintenance',
            'Billing and invoicing'
          ],
          required: true,
          helpText: 'Select your organization\'s core processes'
        },
        {
          id: 'process_documentation',
          question: 'Process Documentation Status',
          type: 'radio',
          options: [
            'Fully documented with SOPs',
            'Partially documented - key processes only',
            'Informally documented (wikis, notes)',
            'Mostly undocumented - needs development'
          ],
          required: true
        },
        {
          id: 'key_procedures',
          question: 'Key Quality Procedures',
          type: 'textarea',
          placeholder: '1. Data Validation Procedure - steps for verifying data accuracy and completeness\n2. Code Review Process - peer review requirements for all code changes\n3. Project Handover Checklist - ensuring complete delivery to clients\n4. Issue Escalation Procedure - when and how to escalate problems...',
          required: true,
          helpText: 'List your key quality-related procedures',
          rows: 6
        },
        {
          id: 'quality_criteria',
          question: 'Quality Acceptance Criteria',
          type: 'textarea',
          placeholder: 'Data deliverables: 99.9% accuracy, complete metadata, validated against schema\nSoftware releases: All tests passing, code reviewed, documentation updated\nProject completion: Client sign-off, documentation delivered, knowledge transferred...',
          required: true,
          helpText: 'Define criteria for accepting work as complete',
          rows: 5
        },
        {
          id: 'change_control',
          question: 'Change Control Process',
          type: 'textarea',
          placeholder: 'All changes to requirements, scope, or deliverables must be: documented in change request, reviewed for impact, approved by project manager and client, communicated to affected parties...',
          required: true,
          helpText: 'How are changes to requirements/scope managed?',
          rows: 4
        },
        {
          id: 'tools_systems',
          question: 'Quality Tools & Systems',
          type: 'checkbox',
          options: [
            'Version control (Git/GitHub)',
            'Issue tracking (Jira, Linear, etc.)',
            'CI/CD pipeline with automated tests',
            'Code review tools',
            'Documentation systems (Confluence, Notion)',
            'Project management tools',
            'Customer feedback systems',
            'Quality dashboards/metrics'
          ],
          required: true,
          helpText: 'Select tools used to support quality management'
        }
      ]
    },

    // Section 7: Competence & Training (ISO 9001 Clause 7.2)
    {
      key: 'competence_training',
      title: 'Competence & Training',
      description: 'Ensure personnel have the necessary competence to perform work affecting quality, and provide training where needed.',
      order: 7,
      isoClause: '7.2',
      guidance: 'Competence requirements must be determined, training provided where needed, and evidence of competence retained. Consider: education, training, skills, and experience.',
      questions: [
        {
          id: 'competence_areas',
          question: 'Key Competence Areas',
          type: 'checkbox',
          options: [
            'Technical/domain expertise (geology, data science, etc.)',
            'Software development skills',
            'Data management and quality',
            'Project management',
            'Customer communication',
            'Quality management principles',
            'Tool and system proficiency',
            'Industry regulations and standards'
          ],
          required: true,
          helpText: 'Select competence areas critical for quality'
        },
        {
          id: 'role_competencies',
          question: 'Role-Based Competency Requirements',
          type: 'textarea',
          placeholder: 'Data Scientist: Python/R proficiency, statistical analysis, domain knowledge\nGeologist: Relevant degree, industry experience, data interpretation skills\nDeveloper: Programming languages, testing practices, code review experience\nProject Manager: PM methodology, communication skills, client management...',
          required: true,
          helpText: 'Define competency requirements by role',
          rows: 6
        },
        {
          id: 'training_approach',
          question: 'Training Approach',
          type: 'checkbox',
          options: [
            'On-the-job training and mentoring',
            'Internal training sessions',
            'External courses and certifications',
            'Conference attendance',
            'Online learning platforms',
            'Documentation and self-study',
            'Pair programming/shadowing',
            'Knowledge sharing sessions'
          ],
          required: true,
          helpText: 'How is training provided to staff?'
        },
        {
          id: 'required_training',
          question: 'Required Training for Quality',
          type: 'textarea',
          placeholder: 'All staff: QMS awareness, data handling procedures\nTechnical staff: Code review process, testing requirements\nProject leads: Quality planning, client communication\nNew joiners: Company processes, tools orientation...',
          required: true,
          helpText: 'What training is mandatory for quality purposes?',
          rows: 5
        },
        {
          id: 'competence_records',
          question: 'Competence Records Maintained',
          type: 'checkbox',
          options: [
            'CVs/resumes',
            'Educational certificates',
            'Professional certifications',
            'Training completion records',
            'Performance reviews',
            'Skills assessments',
            'Project experience records'
          ],
          required: true,
          helpText: 'What evidence of competence is retained?'
        },
        {
          id: 'training_effectiveness',
          question: 'Training Effectiveness Evaluation',
          type: 'radio',
          options: [
            'Post-training assessments/tests',
            'On-the-job performance observation',
            'Manager feedback',
            'Self-assessment',
            'Combination of methods'
          ],
          required: true
        }
      ]
    },

    // Section 8: Customer Focus (ISO 9001 Clause 5.1.2, 8.2)
    {
      key: 'customer_focus',
      title: 'Customer Focus & Requirements',
      description: 'Ensure customer requirements are determined, understood, and consistently met to enhance customer satisfaction.',
      order: 8,
      isoClause: '5.1.2, 8.2',
      guidance: 'Customer focus is a core quality principle. Requirements must be clearly determined, communicated internally, and consistently met. Customer satisfaction must be monitored.',
      questions: [
        {
          id: 'requirements_determination',
          question: 'How are Customer Requirements Determined?',
          type: 'checkbox',
          options: [
            'Initial consultation/discovery meetings',
            'Written proposals and scopes of work',
            'Requirements documents',
            'User stories/use cases',
            'Prototypes and mockups',
            'Contracts and agreements',
            'Ongoing communication during projects'
          ],
          required: true,
          helpText: 'Methods used to understand customer needs'
        },
        {
          id: 'requirements_documentation',
          question: 'Requirements Documentation',
          type: 'textarea',
          placeholder: 'Customer requirements are documented in: project proposals (initial scope), requirements specifications (detailed needs), change requests (scope changes), meeting notes (clarifications)...',
          required: true,
          helpText: 'How are customer requirements documented and tracked?',
          rows: 4
        },
        {
          id: 'requirements_review',
          question: 'Requirements Review Process',
          type: 'textarea',
          placeholder: 'Before project commencement: requirements are reviewed with the client for completeness, feasibility is assessed by technical team, any gaps or ambiguities are clarified, client provides written sign-off...',
          required: true,
          helpText: 'How are requirements reviewed before work begins?',
          rows: 4
        },
        {
          id: 'customer_communication',
          question: 'Customer Communication Methods',
          type: 'checkbox',
          options: [
            'Regular project status meetings',
            'Email updates',
            'Project management portal access',
            'Milestone reviews and demos',
            'Issue/bug tracking visibility',
            'Formal progress reports',
            'Ad-hoc calls/messages'
          ],
          required: true
        },
        {
          id: 'satisfaction_measurement',
          question: 'Customer Satisfaction Measurement',
          type: 'checkbox',
          options: [
            'Post-project surveys',
            'Regular satisfaction surveys',
            'NPS (Net Promoter Score)',
            'Client interviews/calls',
            'Renewal/repeat business rates',
            'Referrals tracking',
            'Complaint monitoring',
            'Online reviews/testimonials'
          ],
          required: true,
          helpText: 'How is customer satisfaction measured?'
        },
        {
          id: 'complaint_handling',
          question: 'Customer Complaint Process',
          type: 'textarea',
          placeholder: 'Complaints are logged in issue tracker, acknowledged within 24 hours, assigned to responsible person, root cause investigated, resolution provided and verified with customer, lessons learned documented...',
          required: true,
          helpText: 'How are customer complaints handled?',
          rows: 4
        }
      ]
    },

    // Section 9: Monitoring, Measurement & Analysis (ISO 9001 Clause 9)
    {
      key: 'monitoring_measurement',
      title: 'Monitoring, Measurement & Analysis',
      description: 'Define what needs to be monitored and measured, methods for analysis, and when results shall be evaluated.',
      order: 9,
      isoClause: '9.1',
      guidance: 'Monitoring and measurement provide evidence that products/services conform to requirements. This includes: customer satisfaction, process performance, product conformity, and QMS effectiveness.',
      questions: [
        {
          id: 'quality_metrics',
          question: 'Quality Metrics Tracked',
          type: 'checkbox',
          options: [
            'Customer satisfaction scores',
            'On-time delivery rate',
            'Defect/error rates',
            'First-time-right rate',
            'Rework/revision rates',
            'Customer complaints',
            'Project budget variance',
            'Process cycle times',
            'Audit findings',
            'Training completion rates'
          ],
          required: true,
          helpText: 'Select quality metrics your organization tracks'
        },
        {
          id: 'metrics_detail',
          question: 'Key Metrics Definitions',
          type: 'textarea',
          placeholder: 'On-time delivery: % of projects delivered by agreed deadline\nDefect rate: Number of critical/major issues found post-delivery per project\nCustomer satisfaction: Average score from post-project surveys (1-5 scale)\nFirst-time-right: % of deliverables accepted without revision...',
          required: true,
          helpText: 'Define how key metrics are calculated',
          rows: 6
        },
        {
          id: 'measurement_methods',
          question: 'Measurement Methods',
          type: 'textarea',
          placeholder: 'Automated tracking via project management tools, manual logging of issues and complaints, periodic surveys to customers, code quality metrics from CI/CD pipeline...',
          required: true,
          helpText: 'How are quality metrics collected?',
          rows: 4
        },
        {
          id: 'analysis_frequency',
          question: 'Performance Analysis Frequency',
          type: 'radio',
          options: ['Weekly', 'Monthly', 'Quarterly', 'Per project completion'],
          required: true
        },
        {
          id: 'analysis_responsibility',
          question: 'Who Analyzes Quality Data?',
          type: 'text',
          placeholder: 'Quality Manager / COO',
          required: true
        },
        {
          id: 'reporting_format',
          question: 'Quality Reporting',
          type: 'textarea',
          placeholder: 'Monthly quality dashboard shared with management team, quarterly quality report presented at management review, project-level quality metrics included in project close-out reports...',
          required: true,
          helpText: 'How is quality performance reported?',
          rows: 4
        },
        {
          id: 'trend_analysis',
          question: 'Trend Analysis Performed?',
          type: 'radio',
          options: ['Yes - formal trend analysis', 'Yes - informal review', 'No - not currently', 'Planned for implementation'],
          required: true
        }
      ]
    },

    // Section 10: Internal Audit (ISO 9001 Clause 9.2)
    {
      key: 'internal_audit',
      title: 'Internal Audit',
      description: 'Plan and conduct internal audits to verify QMS conformity and effectiveness.',
      order: 10,
      isoClause: '9.2',
      guidance: 'Internal audits provide objective evidence of QMS conformity and effectiveness. Audits must be planned, conducted by competent auditors, and findings addressed.',
      questions: [
        {
          id: 'audit_frequency',
          question: 'Internal Audit Frequency',
          type: 'radio',
          options: [
            'Annually - full QMS audit',
            'Semi-annually - rotating focus areas',
            'Quarterly - key processes only',
            'As needed based on risk'
          ],
          required: true
        },
        {
          id: 'audit_scope',
          question: 'Audit Scope',
          type: 'checkbox',
          options: [
            'Quality policy and objectives',
            'Customer requirements conformity',
            'Process effectiveness',
            'Document control',
            'Competence and training',
            'Risk management',
            'Nonconformity handling',
            'Continuous improvement',
            'Management review'
          ],
          required: true,
          helpText: 'Areas covered by internal audits'
        },
        {
          id: 'auditor_competence',
          question: 'Internal Auditor Requirements',
          type: 'checkbox',
          options: [
            'Understanding of ISO 9001 requirements',
            'Internal auditor training completed',
            'Independence from area being audited',
            'Knowledge of audit techniques',
            'Understanding of organization processes'
          ],
          required: true
        },
        {
          id: 'audit_process',
          question: 'Audit Process',
          type: 'textarea',
          placeholder: '1. Annual audit schedule prepared and approved\n2. Audit notification sent to auditees\n3. Audit conducted using checklist\n4. Findings documented and categorized\n5. Audit report issued\n6. Corrective actions assigned and tracked\n7. Follow-up verification performed...',
          required: true,
          helpText: 'Describe the internal audit process',
          rows: 6
        },
        {
          id: 'finding_categories',
          question: 'Audit Finding Categories',
          type: 'checkbox',
          options: [
            'Major nonconformity - significant system failure',
            'Minor nonconformity - isolated issue',
            'Observation - potential for improvement',
            'Opportunity for improvement'
          ],
          required: true
        },
        {
          id: 'audit_records',
          question: 'Audit Records Retained',
          type: 'checkbox',
          options: [
            'Audit schedule/program',
            'Audit plans',
            'Audit checklists',
            'Audit reports',
            'Corrective action records',
            'Verification of effectiveness'
          ],
          required: true
        }
      ]
    },

    // Section 11: Management Review (ISO 9001 Clause 9.3)
    {
      key: 'management_review',
      title: 'Management Review',
      description: 'Define the process for top management review of the QMS to ensure its continuing suitability, adequacy, and effectiveness.',
      order: 11,
      isoClause: '9.3',
      guidance: 'Management review ensures the QMS remains aligned with strategic direction. Reviews must consider: audit results, customer feedback, process performance, nonconformities, improvement opportunities, and resource needs.',
      questions: [
        {
          id: 'review_frequency',
          question: 'Management Review Frequency',
          type: 'radio',
          options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
          required: true
        },
        {
          id: 'review_participants',
          question: 'Management Review Participants',
          type: 'textarea',
          placeholder: 'CEO, COO, Technical Director, Quality Manager, Department Heads...',
          required: true,
          helpText: 'Who participates in management reviews?',
          rows: 2
        },
        {
          id: 'review_inputs',
          question: 'Management Review Inputs',
          type: 'checkbox',
          options: [
            'Status of actions from previous reviews',
            'Changes in external/internal issues',
            'QMS performance and effectiveness',
            'Resource adequacy',
            'Risk and opportunity actions effectiveness',
            'Improvement opportunities',
            'Customer feedback and satisfaction',
            'Audit results',
            'Nonconformity and corrective action status',
            'Supplier performance',
            'Quality objectives achievement'
          ],
          required: true,
          helpText: 'Topics that must be covered in management review'
        },
        {
          id: 'review_outputs',
          question: 'Management Review Outputs',
          type: 'checkbox',
          options: [
            'Improvement opportunities',
            'QMS changes needed',
            'Resource needs',
            'Updated quality objectives',
            'Action items with responsibilities',
            'Policy updates if required'
          ],
          required: true,
          helpText: 'Decisions and actions from management review'
        },
        {
          id: 'review_records',
          question: 'Management Review Documentation',
          type: 'textarea',
          placeholder: 'Meeting minutes documenting discussions and decisions, action items tracked in project management system, presentation slides retained, updated quality objectives published...',
          required: true,
          helpText: 'How are management review records maintained?',
          rows: 3
        }
      ]
    },

    // Section 12: Nonconformity & Corrective Action (ISO 9001 Clause 10.2)
    {
      key: 'nonconformity_corrective_action',
      title: 'Nonconformity & Corrective Action',
      description: 'Define processes for handling nonconformities and taking corrective action to prevent recurrence.',
      order: 12,
      isoClause: '10.2',
      guidance: 'When nonconformities occur (including complaints), organizations must: react, evaluate need for action, implement action, review effectiveness, and update risks/opportunities if needed.',
      questions: [
        {
          id: 'nonconformity_types',
          question: 'Types of Nonconformities Tracked',
          type: 'checkbox',
          options: [
            'Product/service defects',
            'Customer complaints',
            'Process failures',
            'Audit findings',
            'Supplier issues',
            'Documentation errors',
            'Missed deadlines',
            'Requirement gaps'
          ],
          required: true
        },
        {
          id: 'nonconformity_process',
          question: 'Nonconformity Handling Process',
          type: 'textarea',
          placeholder: '1. Identify and document the nonconformity\n2. Take immediate action to control/correct\n3. Evaluate impact and determine if correction is sufficient\n4. If recurring or significant, initiate root cause analysis\n5. Implement corrective action\n6. Verify effectiveness\n7. Update risk assessment if needed...',
          required: true,
          helpText: 'Describe the process for handling nonconformities',
          rows: 7
        },
        {
          id: 'root_cause_methods',
          question: 'Root Cause Analysis Methods',
          type: 'checkbox',
          options: [
            '5 Whys analysis',
            'Fishbone/Ishikawa diagram',
            'Pareto analysis',
            'Fault tree analysis',
            'Team brainstorming',
            'Process mapping review'
          ],
          required: true,
          helpText: 'Methods used to identify root causes'
        },
        {
          id: 'corrective_action_tracking',
          question: 'Corrective Action Tracking',
          type: 'textarea',
          placeholder: 'Corrective actions are logged in issue tracking system (Jira/Linear), assigned owner and due date, progress monitored in weekly team meetings, effectiveness verified before closure...',
          required: true,
          helpText: 'How are corrective actions tracked and closed?',
          rows: 4
        },
        {
          id: 'effectiveness_verification',
          question: 'Effectiveness Verification',
          type: 'radio',
          options: [
            'Review at next occurrence opportunity',
            'Follow-up audit of affected area',
            'Performance metric monitoring',
            'Manager sign-off on closure',
            'Combination of methods'
          ],
          required: true,
          helpText: 'How is corrective action effectiveness verified?'
        },
        {
          id: 'lessons_learned',
          question: 'Lessons Learned Process',
          type: 'textarea',
          placeholder: 'Significant nonconformities and corrective actions are reviewed in team meetings, lessons learned documented and shared, process improvements identified, training updated if needed...',
          required: false,
          helpText: 'How are lessons learned captured and shared?',
          rows: 3
        }
      ]
    },

    // Section 13: Continual Improvement (ISO 9001 Clause 10.3)
    {
      key: 'continual_improvement',
      title: 'Continual Improvement',
      description: 'Define how the organization continually improves the suitability, adequacy, and effectiveness of the QMS.',
      order: 13,
      isoClause: '10.3',
      guidance: 'Continual improvement is a core principle. Consider: analysis results, management review outputs, audit findings, corrective actions, and innovation opportunities.',
      questions: [
        {
          id: 'improvement_sources',
          question: 'Sources of Improvement Ideas',
          type: 'checkbox',
          options: [
            'Customer feedback and complaints',
            'Internal audit findings',
            'Management review outputs',
            'Staff suggestions',
            'Performance metrics analysis',
            'Process observations',
            'Industry best practices',
            'Technology advances',
            'Corrective action reviews',
            'Project retrospectives'
          ],
          required: true
        },
        {
          id: 'improvement_process',
          question: 'Improvement Process',
          type: 'textarea',
          placeholder: '1. Ideas collected via suggestion system, retrospectives, or analysis\n2. Ideas evaluated for impact, effort, and alignment with objectives\n3. Approved improvements planned and resourced\n4. Implementation tracked as projects\n5. Results measured and documented\n6. Successful improvements standardized...',
          required: true,
          helpText: 'Describe the process for managing improvements',
          rows: 6
        },
        {
          id: 'improvement_tracking',
          question: 'Improvement Tracking Method',
          type: 'radio',
          options: [
            'Dedicated improvement register/log',
            'Project management system',
            'Quality management software',
            'Spreadsheet tracking',
            'Integrated with issue tracking'
          ],
          required: true
        },
        {
          id: 'improvement_review',
          question: 'Improvement Review Frequency',
          type: 'radio',
          options: ['Weekly', 'Monthly', 'Quarterly', 'At management review'],
          required: true
        },
        {
          id: 'improvement_recognition',
          question: 'How are Improvement Contributions Recognized?',
          type: 'textarea',
          placeholder: 'Recognition in team meetings, mention in company updates, annual awards for significant improvements, contribution noted in performance reviews...',
          required: false,
          helpText: 'How does the organization encourage and recognize improvement efforts?',
          rows: 3
        },
        {
          id: 'annual_improvement_target',
          question: 'Annual Improvement Target',
          type: 'text',
          placeholder: '4+ implemented improvements per year',
          required: false,
          helpText: 'Optional: Set a target for number of improvements implemented'
        }
      ]
    },

    // Section 14: Document Control (ISO 9001 Clause 7.5)
    {
      key: 'document_control',
      title: 'Document Control & Records',
      description: 'Define controls for documented information required by the QMS and for retaining evidence of conformity.',
      order: 14,
      isoClause: '7.5',
      guidance: 'Documented information must be controlled to ensure: availability and suitability for use, adequate protection, and proper distribution, access, retrieval, storage, and disposition.',
      questions: [
        {
          id: 'qms_documents',
          question: 'QMS Documents Maintained',
          type: 'checkbox',
          options: [
            'Quality Policy',
            'Quality Manual',
            'Quality Objectives',
            'Process procedures/SOPs',
            'Work instructions',
            'Forms and templates',
            'External documents (standards, regulations)'
          ],
          required: true,
          helpText: 'Types of documents in the QMS'
        },
        {
          id: 'quality_records',
          question: 'Quality Records Retained',
          type: 'checkbox',
          options: [
            'Management review minutes',
            'Internal audit reports',
            'Corrective action records',
            'Training records',
            'Customer feedback/surveys',
            'Project deliverables',
            'Test/inspection records',
            'Supplier evaluations',
            'Calibration records (if applicable)',
            'Nonconformity reports'
          ],
          required: true,
          helpText: 'Types of records retained as evidence'
        },
        {
          id: 'document_storage',
          question: 'Document Storage Location',
          type: 'textarea',
          placeholder: 'QMS documents: SharePoint/Confluence/Notion (specify location)\nProject records: Project folders in cloud storage\nTraining records: HR system\nAudit records: Quality folder...',
          required: true,
          helpText: 'Where are QMS documents and records stored?',
          rows: 4
        },
        {
          id: 'document_control_method',
          question: 'Document Control Method',
          type: 'checkbox',
          options: [
            'Version numbering',
            'Approval signatures/sign-off',
            'Revision history tracking',
            'Access controls',
            'Review dates',
            'Document owner assignment',
            'Change tracking'
          ],
          required: true,
          helpText: 'How are documents controlled?'
        },
        {
          id: 'review_cycle',
          question: 'Document Review Cycle',
          type: 'radio',
          options: ['Annually', 'Every 2 years', 'Every 3 years', 'As needed/triggered by changes'],
          required: true
        },
        {
          id: 'retention_period',
          question: 'Record Retention Period',
          type: 'text',
          placeholder: '7 years (or as required by contract/regulation)',
          required: true,
          helpText: 'How long are quality records retained?'
        },
        {
          id: 'backup_procedure',
          question: 'Backup and Protection',
          type: 'textarea',
          placeholder: 'Cloud storage with automatic backup, access restricted to authorized personnel, regular backup verification, disaster recovery plan in place...',
          required: true,
          helpText: 'How are documents and records protected?',
          rows: 3
        }
      ]
    }
  ]
};
