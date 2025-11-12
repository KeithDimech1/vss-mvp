// Question types for action forms
export type QuestionType =
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'number'
  | 'currency'
  | 'info' // Informational display (no input required)
  | 'implementation_table' // Dynamic table with changes and time columns
  | 'data_inventory_matrix' // Matrix for data inventory (rows=datatypes, cols=regions)
  | 'ranking' // Drag-and-drop ranking of options (top N)
  | 'rating' // Rating scale (1-5 stars or numbers)
  | 'selectable_tags'; // Clickable tags/chips that populate the consensus decision

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface ActionQuestion {
  id: string;
  section?: string;
  question: string;
  type: QuestionType;
  placeholder?: string;
  options?: QuestionOption[] | string[];
  helpText?: string;
  required?: boolean;
  rows?: number; // For textarea
  min?: number; // For number/currency
  max?: number;
  maxSelections?: number; // For checkbox - limit number of selections
  maxLength?: number; // For text/textarea - character limit
  rankingLimit?: number; // For ranking - number of items to rank
  ratingScale?: number; // For rating - max value (e.g., 5 for 1-5 scale)
  conditionalOn?: {
    questionId: string;
    value: any;
  };
  inheritSelectionsFrom?: string[]; // For selectable_tags - inherit selections from these question IDs (cascade)
}

export interface ActionMetadata {
  actionNumber: number;
  actionSlug: string;
  title: string;
  description: string;
  priority: 'IMMEDIATE' | 'SHORT-TERM';
  owner: string;
  questions: ActionQuestion[];
}
