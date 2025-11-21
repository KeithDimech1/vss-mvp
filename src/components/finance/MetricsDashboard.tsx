'use client';

import { useState } from 'react';

interface MetricsDashboardProps {
  metrics: any;
  readinessScore: number;
  onUpdate: (metrics: any) => void;
}

export default function MetricsDashboard({ metrics, readinessScore, onUpdate }: MetricsDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    dextPublished: metrics?.dextPublished ?? 0,
    dextTotal: metrics?.dextTotal ?? 0,
    unreconciledLines: metrics?.unreconciledLines ?? 0,
    unreconciledOld: metrics?.unreconciledOld ?? 0,
    billsPaid: metrics?.billsPaid ?? 0,
    billsDueThisWeek: metrics?.billsDueThisWeek ?? 0,
    payrollCompleted: metrics?.payrollCompleted ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 81) return 'text-green-600';
    if (score >= 51) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 81) return 'bg-green-500';
    if (score >= 51) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-8">
      {/* Readiness Score */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            🎯 Month-End Readiness Score
          </h2>
          <span className={`text-3xl font-bold ${getScoreColor(readinessScore)}`}>
            {readinessScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${getScoreBackground(readinessScore)}`}
            style={{ width: `${readinessScore}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {readinessScore >= 81 && '✅ Ready for month-end close'}
          {readinessScore >= 51 && readinessScore < 81 && '⚠️ On track - keep going'}
          {readinessScore < 51 && '🔴 Critical - needs immediate attention'}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Dext Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600 mb-2">Dext</div>
          <div className="text-2xl font-bold mb-1">
            {metrics?.dextPublished ?? 0}/{metrics?.dextTotal ?? 0}
          </div>
          <div className="text-sm text-gray-500">Published</div>
        </div>

        {/* Bank Reconciliation Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600 mb-2">Bank Recon</div>
          <div className="text-2xl font-bold mb-1">
            {metrics?.unreconciledLines ?? 0}
          </div>
          <div className="text-sm text-gray-500">
            Unreconciled ({metrics?.unreconciledOld ?? 0} old)
          </div>
        </div>

        {/* Bills Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600 mb-2">Bills</div>
          <div className="text-2xl font-bold mb-1">
            {metrics?.billsPaid ?? 0}/{metrics?.billsDueThisWeek ?? 0}
          </div>
          <div className="text-sm text-gray-500">Paid this week</div>
        </div>

        {/* Payroll Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm font-medium text-gray-600 mb-2">Payroll</div>
          <div className="text-2xl font-bold mb-1">
            {metrics?.payrollCompleted ? '✅' : '⏳'}
          </div>
          <div className="text-sm text-gray-500">
            {metrics?.payrollCompleted ? 'Completed' : 'Pending'}
          </div>
        </div>
      </div>

      {/* Update Metrics Button/Form */}
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Metrics
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Update Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dext Published
              </label>
              <input
                type="number"
                value={formData.dextPublished}
                onChange={(e) =>
                  setFormData({ ...formData, dextPublished: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dext Total
              </label>
              <input
                type="number"
                value={formData.dextTotal}
                onChange={(e) =>
                  setFormData({ ...formData, dextTotal: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unreconciled Lines
              </label>
              <input
                type="number"
                value={formData.unreconciledLines}
                onChange={(e) =>
                  setFormData({ ...formData, unreconciledLines: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unreconciled Old (&gt;5 days)
              </label>
              <input
                type="number"
                value={formData.unreconciledOld}
                onChange={(e) =>
                  setFormData({ ...formData, unreconciledOld: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bills Paid
              </label>
              <input
                type="number"
                value={formData.billsPaid}
                onChange={(e) =>
                  setFormData({ ...formData, billsPaid: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bills Due This Week
              </label>
              <input
                type="number"
                value={formData.billsDueThisWeek}
                onChange={(e) =>
                  setFormData({ ...formData, billsDueThisWeek: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.payrollCompleted}
                  onChange={(e) =>
                    setFormData({ ...formData, payrollCompleted: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Payroll Completed
                </span>
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
