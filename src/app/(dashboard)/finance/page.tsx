'use client';

import { useEffect, useState } from 'react';
import MetricsDashboard from '@/components/finance/MetricsDashboard';
import TaskList from '@/components/finance/TaskList';
import CalendarView from '@/components/finance/CalendarView';

export default function FinancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [readinessScore, setReadinessScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'calendar' | 'list'>('list');

  const monthString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-01`;

  // Fetch tasks and metrics
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch tasks
        const tasksResponse = await fetch(`/api/finance/tasks?month=${monthString}`);
        const tasksData = await tasksResponse.json();
        setTasks(tasksData.tasks || []);

        // Fetch metrics
        const metricsResponse = await fetch(`/api/finance/metrics?month=${monthString}`);
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData.metric);
        setReadinessScore(metricsData.readinessScore || 0);
      } catch (error) {
        console.error('Error fetching finance data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [monthString]);

  const handleTaskComplete = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/finance/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: completed ? 'COMPLETED' : 'PENDING',
          completedById: completed ? 'current-user-id' : null, // TODO: Get from session
        }),
      });

      if (response.ok) {
        const { task } = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((t: any) => (t.id === taskId ? task : t))
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleMetricsUpdate = async (newMetrics: any) => {
    try {
      const response = await fetch('/api/finance/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: monthString,
          ...newMetrics,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMetrics(data.metric);
        setReadinessScore(data.readinessScore);
      }
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading finance dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Lithodat Finance Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            ← Prev
          </button>
          <span className="text-lg font-semibold">
            {currentMonth.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <MetricsDashboard
        metrics={metrics}
        readinessScore={readinessScore}
        onUpdate={handleMetricsUpdate}
      />

      {/* View Toggle */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded ${
            view === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          📋 Task List
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded ${
            view === 'calendar'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          📅 Calendar
        </button>
      </div>

      {/* Main Content */}
      {view === 'list' ? (
        <TaskList tasks={tasks} onTaskComplete={handleTaskComplete} />
      ) : (
        <CalendarView tasks={tasks} currentMonth={currentMonth} onTaskComplete={handleTaskComplete} />
      )}
    </div>
  );
}
