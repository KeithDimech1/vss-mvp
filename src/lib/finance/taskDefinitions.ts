// Finance Task Definitions for Kristy's Monthly Checklist
// These tasks are generated for each month based on this configuration

import { TaskCategory, TaskPriority } from '@prisma/client';

export interface SubItem {
  id: string;
  label: string;
  completed: boolean;
  audConversion?: string; // For WISE payments - AUD conversion rate
  notes?: string;
}

export interface TaskDefinition {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  // Day of month (1-31), negative numbers count from end (-1 = last day)
  dueDay: number;
  recurringRule?: string;
  subItems?: SubItem[];
}

// CRITICAL tasks - must be completed by specific days
export const criticalTasks: TaskDefinition[] = [
  {
    id: 'stp-payroll',
    title: 'Check STP (Single Touch Payroll)',
    description: 'After processing payroll, verify STP report has been filed to ATO',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    id: 'run-payroll',
    title: 'Run payroll in Xero',
    description: `1. Open Xero → Payroll
2. Select current pay period
3. Review staff hours/salaries
4. Click "Process Payroll"
5. File STP (next task)`,
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    id: 'review-invoices-wise',
    title: 'Review Invoices for staff payments and put into WISE',
    description: `Review contractor invoices and prepare WISE payments.
NOTE: Record AUD conversion from WISE for each payment.`,
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
    subItems: [
      { id: 'wayne', label: 'Wayne', completed: false, audConversion: '' },
      { id: 'moritz', label: 'Moritz', completed: false, audConversion: '' },
      { id: 'tarun-nirali', label: 'Tarun/Nirali', completed: false, audConversion: '' },
      { id: 'juan', label: 'Juan', completed: false, audConversion: '' },
      { id: 'perla', label: 'Perla', completed: false, audConversion: '' },
      { id: 'aida-cristina', label: 'Aida Cristina', completed: false, audConversion: '' },
      { id: 'vinko-scenaryo', label: 'Vinko (Scenaryo GmbH)', completed: false, audConversion: '' },
    ],
  },
  {
    id: 'run-wise-payments',
    title: 'Run Wise Payments',
    description: 'Process all prepared contractor payments in WISE',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    id: 'wise-to-dext',
    title: 'Send WISE email receipts to DEXT',
    description: 'Forward all WISE payment confirmation emails to DEXT for processing',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    id: 'review-last-month',
    title: "Review last month's close status",
    description: 'Check for any overdue items from previous month and set up current month calendar',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 2,
    recurringRule: 'MONTHLY_DAY_2',
  },
  {
    id: 'close-dext-items',
    title: 'Close All Dext items open',
    description: 'Review and close all pending Dext items from previous month',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 2,
    recurringRule: 'MONTHLY_DAY_2',
  },
  {
    id: 'xero-reconciliation',
    title: 'Xero reconciliation of all outstanding items (weekly)',
    description: `Check daily, reconcile 2-3x/week:
1. Open Xero → Accounting → Bank Accounts
2. Match payments to bills
3. Use "Spend Money" for non-bill transactions
4. Use "Transfer" for inter-account movements
5. For multi-currency (Wise): Check FX rates

NOTE: Will need to update all AUD costs from WISE receipts`,
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 2,
    recurringRule: 'WEEKLY',
  },
];

// WEEKLY tasks
export const weeklyTasks: TaskDefinition[] = [
  {
    id: 'pay-bills-weekly',
    title: 'Review and pay all bills due this week',
    description: 'Sort bills by due date in Xero and process payments',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 8, // First Friday-ish
    recurringRule: 'WEEKLY_FRIDAY',
  },
  {
    id: 'submit-receipts',
    title: 'Submit any outstanding receipts to DEXT',
    description: 'Gather and submit all outstanding receipts to DEXT inbox',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 8,
    recurringRule: 'WEEKLY_FRIDAY',
  },
  {
    id: 'lodge-invoices',
    title: 'Lodge all incoming invoices into Xero - with due date',
    description: 'Enter all received invoices into Xero with correct due dates',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 8,
    recurringRule: 'WEEKLY_FRIDAY',
  },
];

// MONTH-END tasks
export const monthEndTasks: TaskDefinition[] = [
  {
    id: 'ensure-invoices-submitted',
    title: 'Ensure all staff have submitted their monthly invoices',
    description: 'Contact any staff who have not yet submitted their monthly invoices',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1, // Last day of month
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    id: 'pay-bills-monthend',
    title: 'Pay all bills due this week',
    description: 'Process all outstanding bills before month close',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    id: 'monthend-dext',
    title: 'Month-end close: All dext items coded and published',
    description: 'Code and publish all remaining Dext items. Target: 0 unpublished items',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    id: 'monthend-reconciliation',
    title: 'Month-end close: Bank reconciliation 100%',
    description: 'All bank feed lines reconciled. Target: 0 lines older than 5 days',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    id: 'monthend-bills-coded',
    title: 'Month-end close: All bills coded and approved',
    description: 'Review all Draft and Awaiting Approval bills in Xero. Move approved bills to Awaiting Payment.',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
];

// All task definitions combined
export const allTaskDefinitions: TaskDefinition[] = [
  ...criticalTasks,
  ...weeklyTasks,
  ...monthEndTasks,
];

// Helper function to calculate due date for a given month
export function calculateDueDate(year: number, month: number, dueDay: number): Date {
  if (dueDay < 0) {
    // Negative days count from end of month
    const lastDay = new Date(year, month + 1, 0).getDate();
    return new Date(year, month, lastDay + dueDay + 1);
  }
  return new Date(year, month, dueDay);
}

// Generate tasks for a specific month
export function generateTasksForMonth(year: number, month: number) {
  return allTaskDefinitions.map((def) => ({
    ...def,
    dueDate: calculateDueDate(year, month, def.dueDay),
  }));
}
