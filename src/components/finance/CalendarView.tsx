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
}

interface CalendarViewProps {
  tasks: Task[];
  currentMonth: Date;
  onTaskComplete: (taskId: string, completed: boolean) => void;
}

export default function CalendarView({ tasks, currentMonth, onTaskComplete }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get calendar data for the current month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null); // Empty cells before first day
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get tasks for a specific day
  const getTasksForDay = (day: number) => {
    const targetDate = new Date(year, month, day);
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year
      );
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CRITICAL':
        return 'bg-red-500';
      case 'DAILY':
        return 'bg-blue-500';
      case 'WEEKLY':
        return 'bg-yellow-500';
      case 'MONTH_END':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedDayTasks = selectedDate ? getTasksForDay(selectedDate.getDate()) : [];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Grid */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-700 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dayTasks = getTasksForDay(day);
            const isSelected = selectedDate?.getDate() === day;
            const completedTasks = dayTasks.filter((t) => t.status === 'COMPLETED').length;
            const totalTasks = dayTasks.length;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(new Date(year, month, day))}
                className={`aspect-square border rounded-lg p-2 text-left hover:bg-gray-50 transition-colors ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{day}</div>
                {totalTasks > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">
                      {completedTasks}/{totalTasks}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {dayTasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className={`w-2 h-2 rounded-full ${getCategoryColor(
                            task.category
                          )}`}
                          title={task.title}
                        />
                      ))}
                      {dayTasks.length > 3 && (
                        <span className="text-xs text-gray-500">+{dayTasks.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDate && selectedDayTasks.length > 0 && (
        <div className="border-t p-6">
          <h3 className="text-lg font-semibold mb-4">
            Tasks for {selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </h3>
          <div className="space-y-2">
            {selectedDayTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={task.status === 'COMPLETED'}
                  onChange={(e) => onTaskComplete(task.id, e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div
                    className={`font-medium ${
                      task.status === 'COMPLETED' ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {task.category} | {task.priority} Priority
                  </div>
                  {task.description && (
                    <div className="text-sm text-gray-500 mt-2 whitespace-pre-wrap">
                      {task.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="border-t p-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Category Legend:</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Daily</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Weekly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Month-End</span>
          </div>
        </div>
      </div>
    </div>
  );
}
