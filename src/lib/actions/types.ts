// Question types for action forms
export type QuestionType =
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'number'
  | 'currency';

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
  conditionalOn?: {
    questionId: string;
    value: any;
  };
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
