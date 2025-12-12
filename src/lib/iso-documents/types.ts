// ISO Document Builder Types
// Supports progressive development of HSE, Quality, and IMS documents

export type IsoDocumentType =
  | 'HSE_POLICY'           // ISO 45001 + ISO 14001 combined
  | 'QUALITY_POLICY'       // ISO 9001
  | 'ENVIRONMENTAL_POLICY' // ISO 14001 standalone
  | 'OHS_POLICY'           // ISO 45001 standalone
  | 'IMS_MANUAL';          // Integrated Management System

export type DocumentStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SUPERSEDED' | 'ARCHIVED';
export type SectionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'NEEDS_REVIEW' | 'APPROVED';

// Question types (reuse from actions but extend for document building)
export type QuestionType =
  | 'text'
  | 'textarea'
  | 'rich_text'      // For policy statements with formatting
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'number'
  | 'info'           // Informational display
  | 'signature'      // Digital signature field
  | 'risk_matrix'    // Risk assessment matrix
  | 'checklist'      // Simple checklist items
  | 'contact_list'   // Emergency contacts table
  | 'responsibility_matrix'; // RACI-style matrix

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface SectionQuestion {
  id: string;
  question: string;
  type: QuestionType;
  placeholder?: string;
  options?: QuestionOption[] | string[];
  helpText?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  defaultValue?: string;
  // For risk_matrix type
  riskCategories?: string[];
  // For checklist type
  checklistItems?: string[];
  // Conditional display
  conditionalOn?: {
    questionId: string;
    value: any;
  };
}

export interface DocumentSection {
  key: string;
  title: string;
  description: string;
  order: number;
  isoClause?: string; // e.g., "5.2" for ISO 45001 clause reference
  questions: SectionQuestion[];
  // Guidance text shown at top of section
  guidance?: string;
  // Whether this section generates text for the final document
  generatesOutput?: boolean;
  // Template for generating output text from responses
  outputTemplate?: string;
}

export interface DocumentTemplate {
  type: IsoDocumentType;
  title: string;
  description: string;
  isoStandards: string[]; // e.g., ['ISO 45001:2018', 'ISO 14001:2015']
  sections: DocumentSection[];
  // Metadata
  version: string;
  lastUpdated: string;
}

// Helper to get completion percentage
export function calculateCompletion(
  sections: DocumentSection[],
  responses: Record<string, Record<string, any>>
): number {
  let totalRequired = 0;
  let completedRequired = 0;

  sections.forEach(section => {
    section.questions.forEach(q => {
      if (q.required) {
        totalRequired++;
        const sectionResponses = responses[section.key] || {};
        if (sectionResponses[q.id] !== undefined && sectionResponses[q.id] !== '') {
          completedRequired++;
        }
      }
    });
  });

  return totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0;
}

// Helper to get section completion status
export function getSectionStatus(
  section: DocumentSection,
  responses: Record<string, any>
): SectionStatus {
  const requiredQuestions = section.questions.filter(q => q.required);

  if (requiredQuestions.length === 0) {
    return Object.keys(responses).length > 0 ? 'IN_PROGRESS' : 'NOT_STARTED';
  }

  const completedRequired = requiredQuestions.filter(q =>
    responses[q.id] !== undefined && responses[q.id] !== ''
  ).length;

  if (completedRequired === 0) return 'NOT_STARTED';
  if (completedRequired < requiredQuestions.length) return 'IN_PROGRESS';
  return 'NEEDS_REVIEW'; // All required fields complete, needs review
}
