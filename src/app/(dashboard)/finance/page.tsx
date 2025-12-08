'use client';

import { useEffect, useState, useCallback } from 'react';

// Static task definitions based on Kristy's monthly checklist
const WISE_CONTRACTORS = [
  { id: 'wayne', name: 'Wayne' },
  { id: 'moritz', name: 'Moritz' },
  { id: 'tarun', name: 'Tarun/Nirali' },
  { id: 'juan', name: 'Juan' },
  { id: 'perla', name: 'Perla' },
  { id: 'aida', name: 'Aida Cristina' },
  { id: 'vinko', name: 'Vinko (Scenaryo GmbH)' },
];

// Month-end close checklist items
const MONTH_END_CHECKLIST = [
  { id: 'receive-invoices', label: 'Receive all staff payroll invoices' },
  { id: 'dext-wise', label: 'Put all staff payroll costs into Dext and into Wise' },
  { id: 'xero-100', label: '100% receipts and transactions removed in Xero' },
  { id: 'dext-coded', label: 'Dext pushed to Xero and properly coded' },
  { id: 'finance-meeting', label: 'Monthly finance meeting setup between Fabian, Keith, Moritz and Wayne' },
];

interface TaskDef {
  id: string;
  title: string;
  category: 'critical' | 'weekly' | 'monthEnd';
  dueDay: number; // Day of month
  hasWiseSubItems?: boolean;
  hasMonthEndChecklist?: boolean;
}

const TASKS: TaskDef[] = [
  // CRITICAL - Start of Month
  { id: 'check-stp', title: 'Check STP (Single Touch Payroll)', category: 'critical', dueDay: 4 },
  { id: 'run-payroll', title: 'Run payroll in Xero', category: 'critical', dueDay: 4 },
  { id: 'review-invoices-wise', title: 'Review Invoices for staff payments and put into WISE', category: 'critical', dueDay: 4, hasWiseSubItems: true },
  { id: 'run-wise', title: 'Run Wise Payments', category: 'critical', dueDay: 4 },
  { id: 'wise-to-dext', title: 'Send WISE email receipts to DEXT', category: 'critical', dueDay: 4 },

  // WEEKLY
  { id: 'pay-bills-weekly', title: 'Review and pay all bills due this week', category: 'weekly', dueDay: 8 },
  { id: 'submit-receipts', title: 'Submit any outstanding receipts to DEXT', category: 'weekly', dueDay: 8 },
  { id: 'lodge-invoices', title: 'Lodge all incoming invoices into Xero - with due date', category: 'weekly', dueDay: 8 },

  // MONTH-END
  { id: 'staff-invoices', title: 'Send email to all staff ensuring invoices on final day of every month (working day)', category: 'monthEnd', dueDay: 25 },
  { id: 'pay-bills-monthend', title: 'Pay all bills due this week', category: 'monthEnd', dueDay: -1 },
  { id: 'dext-coded', title: 'Month-end close: All Dext items coded and published', category: 'monthEnd', dueDay: -1 },
  { id: 'bank-recon', title: 'Month-end close: Bank reconciliation 100%', category: 'monthEnd', dueDay: -1 },
  { id: 'month-close', title: 'Month-end close: Complete all close requirements', category: 'monthEnd', dueDay: -1, hasMonthEndChecklist: true },
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
    const newData = {
      ...checklistData,
      [taskId]: {
        completed: false,
        completedDate: '',
        notes: '',
        ...checklistData[taskId],
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
      case 'critical': return 'CRITICAL - Start of Month';
      case 'weekly': return 'WEEKLY';
      case 'monthEnd': return 'MONTH-END';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'weekly': return 'border-yellow-500 bg-yellow-50';
      case 'monthEnd': return 'border-purple-500 bg-purple-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  // Calculate completion stats
  const completedCount = TASKS.filter(t => getTaskState(t.id).completed).length;
  const totalCount = TASKS.length;
  const completionPercent = Math.round((completedCount / totalCount) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading finance checklist...</div>
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lithodat Finance Checklist
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Prev
            </button>
            <span className="text-lg font-semibold min-w-[150px] text-center">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{completedCount}/{totalCount} complete</span>
          </div>
          {saving && <span className="text-sm text-blue-600">Saving...</span>}
        </div>
      </div>

      {/* Task Lists by Category */}
      {Object.entries(groupedTasks).map(([category, tasks]) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            {getCategoryLabel(category)} ({tasks.filter(t => getTaskState(t.id).completed).length}/{tasks.length})
          </h2>
          <div className="space-y-3">
            {tasks.map((task) => {
              const state = getTaskState(task.id);
              const isExpanded = expandedTasks.has(task.id);

              return (
                <div
                  key={task.id}
                  className={`border-l-4 rounded-lg bg-white shadow ${getCategoryColor(task.category)}`}
                >
                  {/* Task Header */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={state.completed}
                        onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
                        className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className={`font-medium ${state.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </span>
                          <button
                            onClick={() => toggleExpanded(task.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap"
                          >
                            {isExpanded ? 'Collapse' : 'Expand'}
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center gap-3">
                          <span>Due: Day {task.dueDay === -1 ? 'Last' : task.dueDay}</span>
                          {task.hasMonthEndChecklist && (
                            <span className="text-purple-600 font-medium">
                              Checklist: {getMonthEndChecklistStats(task.id).completed}/{getMonthEndChecklistStats(task.id).total}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Section */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                      {/* WISE Sub-items */}
                      {task.hasWiseSubItems && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contractor Payments (AUD Conversion from WISE)
                          </label>
                          <div className="space-y-2 ml-4">
                            {WISE_CONTRACTORS.map((contractor) => {
                              const subItem = state.wiseSubItems?.[contractor.id] || { completed: false, audAmount: '' };
                              return (
                                <div key={contractor.id} className="flex items-center gap-3 p-2 bg-white rounded border">
                                  <input
                                    type="checkbox"
                                    checked={subItem.completed}
                                    onChange={(e) => updateWiseSubItem(task.id, contractor.id, { completed: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                  />
                                  <span className={`flex-1 ${subItem.completed ? 'line-through text-gray-500' : ''}`}>
                                    {contractor.name}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-500 text-sm">AUD:</span>
                                    <input
                                      type="text"
                                      value={subItem.audAmount}
                                      onChange={(e) => updateWiseSubItem(task.id, contractor.id, { audAmount: e.target.value })}
                                      placeholder="0.00"
                                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Month-End Close Checklist */}
                      {task.hasMonthEndChecklist && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Month-End Close Checklist ({getMonthEndChecklistStats(task.id).completed}/{getMonthEndChecklistStats(task.id).total})
                          </label>
                          <div className="space-y-2 ml-4">
                            {MONTH_END_CHECKLIST.map((item) => {
                              const isItemCompleted = state.monthEndChecklist?.[item.id] || false;
                              return (
                                <div key={item.id} className="flex items-center gap-3 p-2 bg-white rounded border">
                                  <input
                                    type="checkbox"
                                    checked={isItemCompleted}
                                    onChange={(e) => updateMonthEndChecklistItem(task.id, item.id, e.target.checked)}
                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                                  />
                                  <span className={`flex-1 ${isItemCompleted ? 'line-through text-gray-500' : ''}`}>
                                    {item.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Date Completed */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Completed
                        </label>
                        <input
                          type="date"
                          value={state.completedDate}
                          onChange={(e) => updateTask(task.id, { completedDate: e.target.value })}
                          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes / Comments
                        </label>
                        <textarea
                          value={state.notes}
                          onChange={(e) => updateTask(task.id, { notes: e.target.value })}
                          placeholder="Add any notes..."
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
