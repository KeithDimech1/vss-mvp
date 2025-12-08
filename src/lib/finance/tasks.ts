// Finance Task Definitions
// These are the recurring tasks for each month

export interface SubItem {
  id: string;
  name: string;
  completed: boolean;
  audConversion?: string;
}

export interface TaskTemplate {
  title: string;
  description: string | null;
  category: 'CRITICAL' | 'DAILY' | 'WEEKLY' | 'MONTH_END' | 'CUSTOM';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDay: number; // Day of month (1-28, or special: -1 for last day, -2 for second-to-last)
  recurringRule: string;
  subItems?: SubItem[];
}

// WISE payment contractors - these need AUD conversion tracking
export const WISE_CONTRACTORS: SubItem[] = [
  { id: 'wayne', name: 'Wayne', completed: false, audConversion: '' },
  { id: 'moritz', name: 'Moritz', completed: false, audConversion: '' },
  { id: 'tarun-nirali', name: 'Tarun/Nirali', completed: false, audConversion: '' },
  { id: 'juan', name: 'Juan', completed: false, audConversion: '' },
  { id: 'perla', name: 'Perla', completed: false, audConversion: '' },
  { id: 'aida', name: 'Aida Cristina', completed: false, audConversion: '' },
  { id: 'vinko', name: 'Vinko (Scenaryo GmbH)', completed: false, audConversion: '' },
];

// Task templates for each month
export const MONTHLY_TASK_TEMPLATES: TaskTemplate[] = [
  // CRITICAL Tasks (Day 4)
  {
    title: 'Check STP (Single Touch Payroll)',
    description: 'Verify Single Touch Payroll submission is complete and accurate.',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    title: 'Run payroll in Xero',
    description: 'Process monthly payroll in Xero for all employees.',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    title: 'Review Invoices for staff payments and put into WISE',
    description: 'Review all contractor invoices and prepare WISE payments.\n\nNote: Record AUD conversion from WISE receipts for each contractor.',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
    subItems: WISE_CONTRACTORS.map(c => ({ ...c })), // Clone to avoid mutations
  },
  {
    title: 'Run Wise Payments',
    description: 'Execute all WISE payments to international contractors.',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    title: 'Send WISE email receipts to DEXT',
    description: 'Forward all WISE payment receipts to DEXT for processing.',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },
  {
    title: 'Review last month\'s close status',
    description: 'Check that previous month was properly closed and all items reconciled.',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 2,
    recurringRule: 'MONTHLY_DAY_2',
  },
  {
    title: 'Book in Monthly Finance Review meeting (Fabian and Keith)',
    description: 'Schedule the monthly finance review meeting with Fabian and Keith.',
    category: 'CRITICAL',
    priority: 'HIGH',
    dueDay: 4,
    recurringRule: 'MONTHLY_DAY_4',
  },

  // DAILY/WEEKLY Tasks
  {
    title: 'Close All Dext items open',
    description: 'Review and close all open items in DEXT.',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 2,
    recurringRule: 'WEEKLY',
  },
  {
    title: 'Xero reconciliation of all outstanding items',
    description: 'Reconcile all outstanding bank transactions in Xero.\n\nNote: Will need to update all AUD costs from WISE receipts.',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 2,
    recurringRule: 'WEEKLY',
  },
  {
    title: 'Review and pay all bills due this week',
    description: 'Check upcoming bills and process payments for those due.',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 8,
    recurringRule: 'WEEKLY_FRIDAY',
  },
  {
    title: 'Submit any outstanding receipts to DEXT',
    description: 'Ensure all company receipts have been submitted to DEXT.',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 8,
    recurringRule: 'WEEKLY_FRIDAY',
  },
  {
    title: 'Lodge all incoming invoices into Xero - with due date',
    description: 'Enter all received invoices into Xero with correct due dates.',
    category: 'WEEKLY',
    priority: 'MEDIUM',
    dueDay: 8,
    recurringRule: 'WEEKLY_FRIDAY',
  },

  // MONTH_END Tasks
  {
    title: 'Ensure all staff have submitted their monthly invoices',
    description: 'Follow up with any staff who haven\'t submitted invoices.',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1, // Last day of month
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    title: 'Pay all bills due this week',
    description: 'Process all outstanding bill payments before month end.',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    title: 'Month-end close: All dext items coded and published',
    description: 'Ensure all DEXT items are properly coded and published.',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    title: 'Month-end close: Bank reconciliation 100%',
    description: 'Complete bank reconciliation - all items must be matched.',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
  {
    title: 'Month-end close: All bills coded and approved',
    description: 'Verify all bills are properly coded and approved in the system.',
    category: 'MONTH_END',
    priority: 'HIGH',
    dueDay: -1,
    recurringRule: 'MONTHLY_LAST_DAY',
  },
];

/**
 * Calculate the actual due date for a task given a target month
 * @param year - The year (e.g., 2025)
 * @param month - The month (1-12)
 * @param dueDay - The day (1-28, or -1 for last day, -2 for second-to-last)
 */
export function calculateDueDate(year: number, month: number, dueDay: number): Date {
  if (dueDay > 0) {
    // Specific day of the month
    return new Date(year, month - 1, dueDay);
  } else {
    // Negative values mean days from end of month
    // -1 = last day, -2 = second to last, etc.
    const lastDay = new Date(year, month, 0).getDate();
    return new Date(year, month - 1, lastDay + dueDay + 1);
  }
}

/**
 * Generate task data for a specific month
 * @param year - The year (e.g., 2025)
 * @param month - The month (1-12)
 * @param assignedToId - User ID to assign tasks to
 * @param createdById - User ID who created the tasks
 */
export function generateTasksForMonth(
  year: number,
  month: number,
  assignedToId: string,
  createdById: string
) {
  return MONTHLY_TASK_TEMPLATES.map((template) => ({
    title: template.title,
    description: template.description,
    category: template.category,
    priority: template.priority,
    dueDate: calculateDueDate(year, month, template.dueDay),
    recurringRule: template.recurringRule,
    assignedToId,
    createdById,
    status: 'PENDING' as const,
    subItems: template.subItems ? template.subItems.map(s => ({ ...s })) : null,
  }));
}
