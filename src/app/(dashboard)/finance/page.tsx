'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

// Contractor list for WISE payments with Xero tracking codes
const WISE_CONTRACTORS = [
  { id: 'juan', name: 'Juan Baca Naavarro', currency: 'MXN', role: 'Data Extraction', trackingCode: '01 - MXN - Juan Baca Naavarro' },
  { id: 'aida', name: 'Aida Christina Ibarra Sarabia', currency: 'MXN', role: 'Data Extraction', trackingCode: '02 - MXN - Aida Christina Ibarra Sarabia' },
  { id: 'perla', name: 'Perla Fernanda Luque Rodriguez', currency: 'MXN', role: 'Data Extraction', trackingCode: '03 - MXN - Perla Fernanda Luque Rodriguez' },
  { id: 'vinko', name: 'Vinko Novak (Scenaryo GmbH)', currency: 'EUR', role: 'Strategy', trackingCode: '04 - GER - Vinko Novak (Scenaryo GmbH)' },
  { id: 'moritz', name: 'Moritz Theile (MTheile Softwareentwicklung)', currency: 'EUR', role: 'Operations Director', trackingCode: '05 - GER - Moritz Thielle (MTheile Softwareentwicklung)' },
  { id: 'tarun', name: 'Sengar Tarun Yatendrasiingh', currency: 'INR', role: 'Development', trackingCode: '06 - IND - Sengar Tarun Yatendrasiingh' },
  { id: 'nirali', name: 'Nirali Dudharejiya', currency: 'INR', role: 'Development', trackingCode: '07 - IND - Nirali Dudharejiya' },
  { id: 'wayne', name: 'Wayne Noble (Noble Foundry)', currency: 'GBP', role: 'Technical Director', trackingCode: '08 - UK - Wayne Noble - Noble Foundry' },
  { id: 'keith', name: 'Keith Dimech (Clair Associates)', currency: 'AUD', role: 'COO', trackingCode: '09 - AUS - Keith Dimech - Clair Associates' },
];

// Month-end close checklist items
const MONTH_END_CHECKLIST = [
  { id: 'receive-invoices', label: 'All staff have submitted their monthly invoices' },
  { id: 'dext-wise', label: 'All staff payroll costs entered in Dext and scheduled in Wise' },
  { id: 'dext-coded', label: 'All Dext items coded and published to Xero' },
  { id: 'xero-100', label: 'Bank reconciliation at 100% (0 items remaining)' },
  { id: 'bills-paid', label: 'All bills due this month have been paid' },
  { id: 'finance-meeting', label: 'Monthly finance review meeting completed (Fabian, Keith, Moritz, Wayne)' },
];

interface TaskDef {
  id: string;
  title: string;
  category: 'critical' | 'weekly' | 'monthEnd';
  dueDay: number;
  instructions: string;
  links?: { label: string; url: string; color: 'green' | 'purple' | 'blue' }[];
  hasWiseSubItems?: boolean;
  hasMonthEndChecklist?: boolean;
  helpSection?: string;
}

const TASKS: TaskDef[] = [
  // CRITICAL - Start of Month (Days 1-4)
  {
    id: 'review-last-month',
    title: 'Review last month\'s close status',
    category: 'critical',
    dueDay: 2,
    instructions: 'Check that the previous month was properly closed. All bank accounts should show 0 items to reconcile for the previous month. Review the BAS summary if applicable.',
    links: [
      { label: 'Xero Bank Reconciliation', url: 'https://go.xero.com/Bank/BankAccounts.aspx', color: 'purple' },
    ],
  },
  {
    id: 'run-wise',
    title: 'Run Wise Payments (FABIAN)',
    category: 'critical',
    dueDay: 4,
    instructions: 'FABIAN: Review all unpaid bills in Xero for contractors. Process payments through Wise for each contractor. Forward Wise "Transfer sent" confirmation emails to Kristy for processing in Dext.',
    links: [
      { label: 'Xero Bills (Unpaid)', url: 'https://go.xero.com/AccountsPayable/Search.aspx', color: 'purple' },
      { label: 'Wise Dashboard', url: 'https://wise.com/balances/', color: 'green' },
    ],
    hasWiseSubItems: true,
  },
  {
    id: 'wise-to-dext',
    title: 'Process WISE receipts in Dext and match with bills (KRISTY)',
    category: 'critical',
    dueDay: 4,
    instructions: 'KRISTY: Receive Wise "Transfer sent" emails from Fabian. Forward each to Dext (receipts@dext.cc). In Dext, match each receipt with the corresponding unpaid bill. Update the AUD amount to match the Wise receipt exactly (e.g., 3,314.03 AUD for a 1,865.92 EUR payment). Ensure the correct PAYROLL tracking code is selected. Mark as PAID with payment method "CBA Bank Payment".',
    links: [
      { label: 'Dext Cost Inbox', url: 'https://app.dext.com/delta/costs', color: 'green' },
      { label: 'Xero Tracking Categories', url: 'https://go.xero.com/Setup/Tracking.aspx', color: 'purple' },
    ],
    helpSection: 'cost-inbox',
  },
  {
    id: 'book-finance-meeting',
    title: 'Book Monthly Finance Review meeting',
    category: 'critical',
    dueDay: 4,
    instructions: 'Schedule the monthly finance review meeting with Fabian and Keith. This meeting reviews P&L, cash flow, and upcoming expenses. Usually held in the first week of each month.',
  },
  {
    id: 'check-stp',
    title: 'Check STP (Single Touch Payroll)',
    category: 'critical',
    dueDay: 4,
    instructions: 'Verify that Single Touch Payroll has been lodged correctly with the ATO. Check the STP report in Xero to ensure all employee payments are reported.',
    links: [
      { label: 'Xero Payroll Reports', url: 'https://go.xero.com/Payroll/Reports', color: 'purple' },
    ],
  },
  {
    id: 'run-payroll',
    title: 'Run payroll in Xero',
    category: 'critical',
    dueDay: 4,
    instructions: 'Process payroll for Australian employees (Fabian, Keith, Kristy). Check leave balances, super contributions, and PAYG withholding amounts before approving.',
    links: [
      { label: 'Xero Payroll', url: 'https://go.xero.com/Payroll/PayRuns', color: 'purple' },
    ],
  },
  {
    id: 'review-invoices-wise',
    title: 'Review contractor invoices and schedule in WISE',
    category: 'critical',
    dueDay: 4,
    instructions: 'Review all contractor invoices received. Verify amounts match agreements. Schedule payments in Wise for the correct currency. Record the expected AUD conversion.',
    links: [
      { label: 'Xero Bills', url: 'https://go.xero.com/AccountsPayable/Search.aspx', color: 'purple' },
      { label: 'Wise Dashboard', url: 'https://wise.com/balances/', color: 'green' },
    ],
  },

  // WEEKLY Tasks
  {
    id: 'close-dext-items',
    title: 'Close all Dext items (clear inbox)',
    category: 'weekly',
    dueDay: 2,
    instructions: 'Process all items in the Dext Cost Inbox. Each item should be coded with: correct supplier, category, payment method, and description. No items should remain in "To Review" status.',
    links: [
      { label: 'Dext Cost Inbox', url: 'https://app.dext.com/delta/costs', color: 'green' },
      { label: 'Bookkeeping Guide', url: '/bookkeeping-help', color: 'blue' },
    ],
    helpSection: 'cost-inbox',
  },
  {
    id: 'xero-reconcile',
    title: 'Xero reconciliation of all outstanding items',
    category: 'weekly',
    dueDay: 2,
    instructions: 'Match all bank transactions in Xero. Green items = auto-matched from Dext, just click OK. For unmatched items, use Find & Match or create a new transaction. Goal: 0 items to reconcile.',
    links: [
      { label: 'Xero Bank Reconciliation', url: 'https://go.xero.com/Bank/BankAccounts.aspx', color: 'purple' },
      { label: 'Bookkeeping Guide', url: '/bookkeeping-help', color: 'blue' },
    ],
    helpSection: 'xero-reconcile',
  },
  {
    id: 'pay-bills-weekly',
    title: 'Review and pay all bills due this week',
    category: 'weekly',
    dueDay: 8,
    instructions: 'Check the Bills Due report in Xero. Pay any bills that are due within the next 7 days. Mark bills as paid in Xero after payment is made.',
    links: [
      { label: 'Xero Bills', url: 'https://go.xero.com/AccountsPayable/Search.aspx', color: 'purple' },
    ],
  },
  {
    id: 'submit-receipts',
    title: 'Submit any outstanding receipts to DEXT',
    category: 'weekly',
    dueDay: 8,
    instructions: 'Remind team members to submit any receipts they haven\'t sent yet. Check credit card statements for transactions that don\'t have matching receipts in Dext.',
    links: [
      { label: 'Dext Cost Inbox', url: 'https://app.dext.com/delta/costs', color: 'green' },
    ],
  },
  {
    id: 'lodge-invoices',
    title: 'Lodge all incoming invoices into Xero',
    category: 'weekly',
    dueDay: 8,
    instructions: 'Enter any invoices received that haven\'t been processed through Dext. Set the correct due date, supplier, and category. Attach the invoice PDF.',
    links: [
      { label: 'Xero Bills', url: 'https://go.xero.com/AccountsPayable/Search.aspx', color: 'purple' },
    ],
  },

  // MONTH-END Tasks
  {
    id: 'staff-invoices',
    title: 'Ensure all staff have submitted their monthly invoices',
    category: 'monthEnd',
    dueDay: 25,
    instructions: 'Send reminder email to all contractors to submit their invoices by end of month. Check that all expected invoices have been received from: Wayne, Moritz, Tarun/Nirali, Juan, Perla, Aida Cristina, and Vinko.',
  },
  {
    id: 'code-invoices-dext',
    title: 'Code all contractor invoices in Dext as unpaid bills (KRISTY)',
    category: 'monthEnd',
    dueDay: 28,
    instructions: 'KRISTY: Forward all contractor invoices to Dext (receipts@dext.cc). Code each invoice with: (1) Correct supplier name, (2) Category: 413 - Consulting, (3) Type: INVOICE (not receipt), (4) PAYROLL tracking code for the contractor (e.g., "01 - MXN - Juan Baca Naavarro"). Do NOT mark as paid - leave payment method blank. This publishes the bill to Xero where Fabian can see it for payment.',
    links: [
      { label: 'Dext Cost Inbox', url: 'https://app.dext.com/delta/costs', color: 'green' },
      { label: 'Xero Tracking Categories', url: 'https://go.xero.com/Setup/Tracking.aspx', color: 'purple' },
      { label: 'Bookkeeping Guide', url: '/bookkeeping-help', color: 'blue' },
    ],
  },
  {
    id: 'pay-bills-monthend',
    title: 'Pay all bills due this month',
    category: 'monthEnd',
    dueDay: -1,
    instructions: 'Review all outstanding bills and ensure everything due this month has been paid or scheduled. Check the Aged Payables report.',
    links: [
      { label: 'Xero Bills', url: 'https://go.xero.com/AccountsPayable/Search.aspx', color: 'purple' },
    ],
  },
  {
    id: 'dext-coded',
    title: 'Month-end: All Dext items coded and published',
    category: 'monthEnd',
    dueDay: -1,
    instructions: 'Final check that all Dext items have been processed. The inbox should be at 0 items. All items should be published to Xero with correct coding.',
    links: [
      { label: 'Dext Cost Inbox', url: 'https://app.dext.com/delta/costs', color: 'green' },
    ],
  },
  {
    id: 'bank-recon',
    title: 'Month-end: Bank reconciliation 100%',
    category: 'monthEnd',
    dueDay: -1,
    instructions: 'All bank accounts should show 0 items to reconcile for the month being closed. If any items remain, investigate and resolve before closing.',
    links: [
      { label: 'Xero Bank Reconciliation', url: 'https://go.xero.com/Bank/BankAccounts.aspx', color: 'purple' },
    ],
  },
  {
    id: 'month-close',
    title: 'Month-end: Complete close checklist',
    category: 'monthEnd',
    dueDay: -1,
    instructions: 'Work through the month-end close checklist. All items must be completed before the month can be considered closed.',
    hasMonthEndChecklist: true,
  },
];

interface TaskState {
  completed: boolean;
  completedDate: string;
  notes: string;
  wiseSubItems?: { [key: string]: { completed: boolean; audAmount: string } };
  monthEndChecklist?: { [key: string]: boolean };
}

interface ChecklistData {
  [taskId: string]: TaskState;
}

export default function FinancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checklistData, setChecklistData] = useState<ChecklistData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const monthString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-01`;

  // Fetch checklist data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/finance/checklist?month=${monthString}`);
        const result = await response.json();
        setChecklistData(result.data || {});
      } catch (error) {
        console.error('Error fetching checklist:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [monthString]);

  // Save checklist data
  const saveData = useCallback(async (newData: ChecklistData) => {
    setSaving(true);
    try {
      await fetch('/api/finance/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month: monthString, data: newData }),
      });
    } catch (error) {
      console.error('Error saving checklist:', error);
    } finally {
      setSaving(false);
    }
  }, [monthString]);

  // Update a task
  const updateTask = (taskId: string, updates: Partial<TaskState>) => {
    const existingTask = checklistData[taskId] || { completed: false, completedDate: '', notes: '' };
    const newData = {
      ...checklistData,
      [taskId]: {
        ...existingTask,
        ...updates,
      },
    };
    setChecklistData(newData);
    saveData(newData);
  };

  // Update a WISE sub-item
  const updateWiseSubItem = (taskId: string, contractorId: string, updates: { completed?: boolean; audAmount?: string }) => {
    const currentTask = checklistData[taskId] || { completed: false, completedDate: '', notes: '', wiseSubItems: {} };
    const currentSubItems = currentTask.wiseSubItems || {};
    const currentSubItem = currentSubItems[contractorId] || { completed: false, audAmount: '' };

    const newData = {
      ...checklistData,
      [taskId]: {
        ...currentTask,
        wiseSubItems: {
          ...currentSubItems,
          [contractorId]: { ...currentSubItem, ...updates },
        },
      },
    };
    setChecklistData(newData);
    saveData(newData);
  };

  // Update a month-end checklist item
  const updateMonthEndChecklistItem = (taskId: string, itemId: string, completed: boolean) => {
    const currentTask = checklistData[taskId] || { completed: false, completedDate: '', notes: '', monthEndChecklist: {} };
    const currentChecklist = currentTask.monthEndChecklist || {};

    const newData = {
      ...checklistData,
      [taskId]: {
        ...currentTask,
        monthEndChecklist: {
          ...currentChecklist,
          [itemId]: completed,
        },
      },
    };
    setChecklistData(newData);
    saveData(newData);
  };

  // Get month-end checklist completion count
  const getMonthEndChecklistStats = (taskId: string) => {
    const state = getTaskState(taskId);
    const checklist = state.monthEndChecklist || {};
    const completedCount = MONTH_END_CHECKLIST.filter(item => checklist[item.id]).length;
    return { completed: completedCount, total: MONTH_END_CHECKLIST.length };
  };

  const toggleExpanded = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  };

  const getTaskState = (taskId: string): TaskState => {
    return checklistData[taskId] || { completed: false, completedDate: '', notes: '' };
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'critical': return 'CRITICAL - Start of Month (Days 1-4)';
      case 'weekly': return 'WEEKLY Tasks';
      case 'monthEnd': return 'MONTH-END Close';
      default: return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'critical': return '🚨';
      case 'weekly': return '📊';
      case 'monthEnd': return '🏁';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'weekly': return 'border-amber-500 bg-amber-50';
      case 'monthEnd': return 'border-purple-500 bg-purple-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getLinkColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'purple': return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      case 'blue': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  // Calculate completion stats
  const completedCount = TASKS.filter(t => getTaskState(t.id).completed).length;
  const totalCount = TASKS.length;
  const completionPercent = Math.round((completedCount / totalCount) * 100);

  // Calculate category stats
  const getCategoryStats = (category: string) => {
    const tasks = TASKS.filter(t => t.category === category);
    const completed = tasks.filter(t => getTaskState(t.id).completed).length;
    return { completed, total: tasks.length };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading finance checklist...</p>
        </div>
      </div>
    );
  }

  // Group tasks by category
  const groupedTasks = {
    critical: TASKS.filter(t => t.category === 'critical'),
    weekly: TASKS.filter(t => t.category === 'weekly'),
    monthEnd: TASKS.filter(t => t.category === 'monthEnd'),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">Lithodat Finance Checklist</h1>
              <p className="text-blue-100 mt-1">Monthly bookkeeping tasks for Kristy</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateMonth('prev')}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                ← Prev
              </button>
              <span className="text-lg font-semibold min-w-[160px] text-center bg-white/10 px-4 py-2 rounded-lg">
                {currentMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => navigateMonth('next')}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span className="text-sm font-medium">{completedCount}/{totalCount} tasks ({completionPercent}%)</span>
            {saving && <span className="text-sm text-blue-200">Saving...</span>}
          </div>
        </div>
      </div>

      {/* Quick Links Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-500">Quick Links:</span>
            <a href="https://app.dext.com/delta/costs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Dext Inbox
            </a>
            <a href="https://go.xero.com/Bank/BankAccounts.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Xero Reconcile
            </a>
            <a href="https://wise.com/balances/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Wise
            </a>
            <Link href="/bookkeeping-help" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Help Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Category Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {(['critical', 'weekly', 'monthEnd'] as const).map((category) => {
            const stats = getCategoryStats(category);
            const percent = Math.round((stats.completed / stats.total) * 100);
            return (
              <div key={category} className={`rounded-lg p-4 border-l-4 ${getCategoryColor(category)}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span className="font-semibold text-gray-900">
                    {category === 'critical' ? 'Critical' : category === 'weekly' ? 'Weekly' : 'Month-End'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        category === 'critical' ? 'bg-red-500' : category === 'weekly' ? 'bg-amber-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{stats.completed}/{stats.total}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Task Lists by Category */}
        {Object.entries(groupedTasks).map(([category, tasks]) => (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>{getCategoryIcon(category)}</span>
              {getCategoryLabel(category)}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({getCategoryStats(category).completed}/{getCategoryStats(category).total} complete)
              </span>
            </h2>
            <div className="space-y-3">
              {tasks.map((task) => {
                const state = getTaskState(task.id);
                const isExpanded = expandedTasks.has(task.id);

                return (
                  <div
                    key={task.id}
                    className={`border-l-4 rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md ${getCategoryColor(task.category)}`}
                  >
                    {/* Task Header */}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={state.completed}
                          onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
                          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className={`font-medium ${state.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                              {task.title}
                            </span>
                            <button
                              onClick={() => toggleExpanded(task.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap font-medium"
                            >
                              {isExpanded ? '▲ Collapse' : '▼ Expand'}
                            </button>
                          </div>
                          <div className="text-sm text-gray-500 mt-1 flex items-center gap-3 flex-wrap">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                              Due: Day {task.dueDay === -1 ? 'Last' : task.dueDay}
                            </span>
                            {task.hasMonthEndChecklist && (
                              <span className="text-purple-600 font-medium text-xs bg-purple-100 px-2 py-0.5 rounded">
                                Checklist: {getMonthEndChecklistStats(task.id).completed}/{getMonthEndChecklistStats(task.id).total}
                              </span>
                            )}
                            {state.completed && state.completedDate && (
                              <span className="text-green-600 text-xs">
                                ✓ Completed {state.completedDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Section */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                        {/* Instructions */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-2">Instructions:</p>
                          <p className="text-sm text-gray-600">{task.instructions}</p>
                        </div>

                        {/* Quick Links */}
                        {task.links && task.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {task.links.map((link, index) => (
                              link.url.startsWith('/') ? (
                                <Link
                                  key={index}
                                  href={link.url}
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${getLinkColor(link.color)}`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                  {link.label}
                                </Link>
                              ) : (
                                <a
                                  key={index}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${getLinkColor(link.color)}`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  {link.label}
                                </a>
                              )
                            ))}
                          </div>
                        )}

                        {/* WISE Sub-items */}
                        {task.hasWiseSubItems && (
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Contractor Payments (record AUD conversion from Wise receipt)
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                              Ensure correct PAYROLL tracking code is used when coding in Dext
                            </p>
                            <div className="space-y-2">
                              {WISE_CONTRACTORS.map((contractor) => {
                                const subItem = state.wiseSubItems?.[contractor.id] || { completed: false, audAmount: '' };
                                return (
                                  <div key={contractor.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={subItem.completed}
                                        onChange={(e) => updateWiseSubItem(task.id, contractor.id, { completed: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <span className={`font-medium ${subItem.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                          {contractor.name}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2">({contractor.currency})</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <span className="text-gray-500 text-sm">AUD:</span>
                                        <input
                                          type="text"
                                          value={subItem.audAmount}
                                          onChange={(e) => updateWiseSubItem(task.id, contractor.id, { audAmount: e.target.value })}
                                          placeholder="0.00"
                                          className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </div>
                                    </div>
                                    <div className="mt-1 ml-7">
                                      <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-mono">
                                        {contractor.trackingCode}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Month-End Close Checklist */}
                        {task.hasMonthEndChecklist && (
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="text-sm font-medium text-purple-700 mb-3">
                              Month-End Close Checklist ({getMonthEndChecklistStats(task.id).completed}/{getMonthEndChecklistStats(task.id).total})
                            </p>
                            <div className="space-y-2">
                              {MONTH_END_CHECKLIST.map((item) => {
                                const isItemCompleted = state.monthEndChecklist?.[item.id] || false;
                                return (
                                  <div key={item.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                    <input
                                      type="checkbox"
                                      checked={isItemCompleted}
                                      onChange={(e) => updateMonthEndChecklistItem(task.id, item.id, e.target.checked)}
                                      className="w-4 h-4 text-purple-600 border-gray-300 rounded cursor-pointer"
                                    />
                                    <span className={`flex-1 text-sm ${isItemCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                      {item.label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Date Completed & Notes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date Completed
                            </label>
                            <input
                              type="date"
                              value={state.completedDate}
                              onChange={(e) => updateTask(task.id, { completedDate: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Notes / Comments
                            </label>
                            <textarea
                              value={state.notes}
                              onChange={(e) => updateTask(task.id, { notes: e.target.value })}
                              placeholder="Add any notes..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer Help Link */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Need help with Dext or Xero?</h3>
              <p className="text-sm text-gray-600 mt-1">Check the Bookkeeping Help Guide for step-by-step instructions on coding expenses, reconciliation, and more.</p>
            </div>
            <Link
              href="/bookkeeping-help"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Open Help Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
