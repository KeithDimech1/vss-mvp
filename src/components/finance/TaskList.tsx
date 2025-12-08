'use client';

import { useState, useCallback } from 'react';

interface SubItem {
  id: string;
  name: string;
  completed: boolean;
  audConversion?: string;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  category: string;
  priority: string;
  dueDate: string;
  status: string;
  assignedTo: {
    fullName: string;
  } | null;
  comments: any[];
  userNotes: string | null;
  userCompletedDate: string | null;
  subItems: SubItem[] | null;
}

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
  onTaskUpdate: (taskId: string, data: { userNotes?: string; userCompletedDate?: string; subItems?: SubItem[] }) => void;
  onInitializeTasks?: () => void;
  initializing?: boolean;
}

export default function TaskList({ tasks, onTaskComplete, onTaskUpdate, onInitializeTasks, initializing }: TaskListProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});
  const [editingDates, setEditingDates] = useState<{ [key: string]: string }>({});
  const [savingTask, setSavingTask] = useState<string | null>(null);

  // Debounced save for notes
  const handleNotesChange = useCallback((taskId: string, value: string) => {
    setEditingNotes(prev => ({ ...prev, [taskId]: value }));
  }, []);

  const handleDateChange = useCallback((taskId: string, value: string) => {
    setEditingDates(prev => ({ ...prev, [taskId]: value }));
  }, []);

  const handleSaveNotes = async (taskId: string) => {
    setSavingTask(taskId);
    await onTaskUpdate(taskId, {
      userNotes: editingNotes[taskId],
      userCompletedDate: editingDates[taskId]
    });
    setSavingTask(null);
  };

  const handleSubItemToggle = async (taskId: string, subItemId: string, task: Task) => {
    if (!task.subItems) return;
    const updatedSubItems = task.subItems.map(item =>
      item.id === subItemId ? { ...item, completed: !item.completed } : item
    );
    await onTaskUpdate(taskId, { subItems: updatedSubItems });
  };

  const handleSubItemAudChange = (taskId: string, subItemId: string, audValue: string, task: Task) => {
    if (!task.subItems) return;
    const updatedSubItems = task.subItems.map(item =>
      item.id === subItemId ? { ...item, audConversion: audValue } : item
    );
    onTaskUpdate(taskId, { subItems: updatedSubItems });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'CRITICAL':
        return '🚨';
      case 'DAILY':
        return '📅';
      case 'WEEKLY':
        return '📊';
      case 'MONTH_END':
        return '🏁';
      default:
        return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CRITICAL':
        return 'border-red-500 bg-red-50';
      case 'DAILY':
        return 'border-blue-500 bg-blue-50';
      case 'WEEKLY':
        return 'border-yellow-500 bg-yellow-50';
      case 'MONTH_END':
        return 'border-purple-500 bg-purple-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600';
      case 'IN_PROGRESS':
        return 'text-blue-600';
      case 'OVERDUE':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const groupedTasks = {
    CRITICAL: tasks.filter((t) => t.category === 'CRITICAL'),
    DAILY: tasks.filter((t) => t.category === 'DAILY'),
    WEEKLY: tasks.filter((t) => t.category === 'WEEKLY'),
    MONTH_END: tasks.filter((t) => t.category === 'MONTH_END'),
    CUSTOM: tasks.filter((t) => t.category === 'CUSTOM'),
  };

  const renderTaskGroup = (category: string, taskList: Task[]) => {
    if (taskList.length === 0) return null;

    return (
      <div key={category} className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          {getCategoryIcon(category)} {category.replace('_', ' ')} ({taskList.length})
        </h3>
        <div className="space-y-3">
          {taskList.map((task) => {
            const isExpanded = expandedTask === task.id;
            const currentNotes = editingNotes[task.id] ?? task.userNotes ?? '';
            const currentDate = editingDates[task.id] ?? (task.userCompletedDate ? task.userCompletedDate.split('T')[0] : '');

            return (
              <div
                key={task.id}
                className={`border-l-4 rounded-lg bg-white shadow ${getCategoryColor(
                  task.category
                )}`}
              >
                {/* Task Header */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === 'COMPLETED'}
                      onChange={(e) => onTaskComplete(task.id, e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={`font-medium ${
                              task.status === 'COMPLETED'
                                ? 'line-through text-gray-500'
                                : 'text-gray-900'
                            }`}
                          >
                            {task.title}
                          </h4>
                          <div className="text-sm text-gray-600 mt-1">
                            Due: {formatDate(task.dueDate)} | Status:{' '}
                            <span className={getStatusColor(task.status)}>
                              {task.status}
                            </span>
                          </div>
                          {task.assignedTo && (
                            <div className="text-sm text-gray-500 mt-1">
                              Assigned to: {task.assignedTo.fullName}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            setExpandedTask(isExpanded ? null : task.id)
                          }
                          className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap ml-2"
                        >
                          {isExpanded ? 'Collapse ▲' : 'Expand ▼'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Section */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                    {/* Instructions */}
                    {task.description && (
                      <div className="text-sm">
                        <strong className="text-gray-700">Instructions:</strong>
                        <p className="mt-1 text-gray-600 whitespace-pre-wrap">{task.description}</p>
                      </div>
                    )}

                    {/* Sub-items (for WISE payments etc) */}
                    {task.subItems && task.subItems.length > 0 && (
                      <div className="text-sm">
                        <strong className="text-gray-700 block mb-2">Checklist Items:</strong>
                        <div className="space-y-2 ml-4">
                          {task.subItems.map((subItem) => (
                            <div key={subItem.id} className="flex items-center gap-3 p-2 bg-white rounded border">
                              <input
                                type="checkbox"
                                checked={subItem.completed}
                                onChange={() => handleSubItemToggle(task.id, subItem.id, task)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                              />
                              <span className={subItem.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                                {subItem.name}
                              </span>
                              {subItem.audConversion !== undefined && (
                                <div className="flex items-center gap-1 ml-auto">
                                  <span className="text-gray-500 text-xs">AUD:</span>
                                  <input
                                    type="text"
                                    value={subItem.audConversion || ''}
                                    onChange={(e) => handleSubItemAudChange(task.id, subItem.id, e.target.value, task)}
                                    placeholder="0.00"
                                    className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Date Completed */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Completed
                        </label>
                        <input
                          type="date"
                          value={currentDate}
                          onChange={(e) => handleDateChange(task.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Comments/Notes Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes / Comments
                      </label>
                      <textarea
                        value={currentNotes}
                        onChange={(e) => handleNotesChange(task.id, e.target.value)}
                        placeholder="Add any notes or comments about this task..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSaveNotes(task.id)}
                        disabled={savingTask === task.id}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                      >
                        {savingTask === task.id ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Tasks</h2>
      {Object.entries(groupedTasks).map(([category, taskList]) =>
        renderTaskGroup(category, taskList)
      )}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No tasks for this month</p>
          {onInitializeTasks && (
            <button
              onClick={onInitializeTasks}
              disabled={initializing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {initializing ? 'Creating Tasks...' : 'Initialize Monthly Tasks'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
