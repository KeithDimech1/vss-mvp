'use client';

import { useState } from 'react';

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
}

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
}

export default function TaskList({ tasks, onTaskComplete }: TaskListProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

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
        <div className="space-y-2">
          {taskList.map((task) => (
            <div
              key={task.id}
              className={`border-l-4 rounded-lg p-4 bg-white shadow ${getCategoryColor(
                task.category
              )}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'COMPLETED'}
                  onChange={(e) => onTaskComplete(task.id, e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
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
                    {task.description && (
                      <button
                        onClick={() =>
                          setExpandedTask(expandedTask === task.id ? null : task.id)
                        }
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {expandedTask === task.id ? 'Hide Details ▲' : 'Details ▼'}
                      </button>
                    )}
                  </div>
                  {expandedTask === task.id && task.description && (
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap">
                      <strong>Instructions:</strong>
                      <br />
                      {task.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
        <div className="text-center py-12 text-gray-500">
          No tasks for this month
        </div>
      )}
    </div>
  );
}
