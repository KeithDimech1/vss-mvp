'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { lithosurferFeatures, featureCategories, LithoSurferFeature, TierName } from '@/lib/lithosurfer-features';

interface TierAssignments {
  [featureId: string]: TierName;
}

interface FeatureComments {
  [featureId: string]: {
    suggestion?: string;
    development?: string;
  };
}

// View modes
type ViewMode = 'matrix' | 'assign';

export default function LithoSurferPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [assignments, setAssignments] = useState<TierAssignments>({});
  const [comments, setComments] = useState<FeatureComments>({});
  const [viewMode, setViewMode] = useState<ViewMode>('matrix');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFutureFeatures, setShowFutureFeatures] = useState(true);
  const [expandedComments, setExpandedComments] = useState<Record<string, 'suggestion' | 'development' | null>>({});

  // Load existing assignments and comments from API
  const loadData = useCallback(async () => {
    try {
      const [assignmentsRes, commentsRes] = await Promise.all([
        fetch('/api/product-tiers/feature-assignments?productType=lithosurfer'),
        fetch('/api/product-tiers/feature-comments?productType=lithosurfer')
      ]);

      if (assignmentsRes.ok) {
        const data = await assignmentsRes.json();
        setAssignments(data.assignments || {});
      }

      if (commentsRes.ok) {
        const data = await commentsRes.json();
        setComments(data.comments || {});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const sessionRes = await fetch('/api/auth/session');
        if (!sessionRes.ok) {
          router.push('/login');
          return;
        }
        const sessionData = await sessionRes.json();
        if (!sessionData.user.isManager) {
          router.push('/dashboard');
          return;
        }
        await loadData();
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    };
    checkAccess();
  }, [router, loadData]);

  // Save all data
  const saveAll = async () => {
    setSaving(true);
    try {
      const [assignmentsRes, commentsRes] = await Promise.all([
        fetch('/api/product-tiers/feature-assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productType: 'lithosurfer', assignments }),
        }),
        fetch('/api/product-tiers/feature-comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productType: 'lithosurfer', comments }),
        })
      ]);

      if (assignmentsRes.ok && commentsRes.ok) {
        setLastSaved(new Date());
      } else {
        alert('Failed to save some data');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save');
    }
    setSaving(false);
  };

  // Toggle tier assignment
  const toggleTier = (featureId: string, tier: TierName) => {
    setAssignments(prev => {
      if (prev[featureId] === tier) {
        const newAssignments = { ...prev };
        delete newAssignments[featureId];
        return newAssignments;
      }
      return { ...prev, [featureId]: tier };
    });
  };

  // Update comment
  const updateComment = (featureId: string, type: 'suggestion' | 'development', value: string) => {
    setComments(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        [type]: value
      }
    }));
  };

  // Toggle comment expansion
  const toggleCommentExpand = (featureId: string, type: 'suggestion' | 'development') => {
    setExpandedComments(prev => ({
      ...prev,
      [featureId]: prev[featureId] === type ? null : type
    }));
  };

  // Check if feature is available in tier (cumulative)
  const isInTier = (featureId: string, tier: TierName): boolean => {
    const assignment = assignments[featureId];
    if (!assignment) return false;

    if (tier === 'enterprise') {
      return assignment === 'free' || assignment === 'pro' || assignment === 'enterprise';
    }
    if (tier === 'pro') {
      return assignment === 'free' || assignment === 'pro';
    }
    return assignment === 'free';
  };

  // Get the base tier where feature is assigned
  const getBaseTier = (featureId: string): TierName | null => {
    return assignments[featureId] || null;
  };

  // Filter features
  const getFilteredFeatures = (): LithoSurferFeature[] => {
    return lithosurferFeatures.filter(f => {
      if (!showFutureFeatures && f.available === 'future') return false;
      if (selectedCategory && f.category !== selectedCategory) return false;
      return true;
    });
  };

  // Group features by category
  const getFeaturesByCategory = (): Record<string, LithoSurferFeature[]> => {
    const filtered = getFilteredFeatures();
    return filtered.reduce((acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push(feature);
      return acc;
    }, {} as Record<string, LithoSurferFeature[]>);
  };

  // Stats
  const assignedCount = Object.keys(assignments).length;
  const totalCount = lithosurferFeatures.filter(f => showFutureFeatures || f.available !== 'future').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#C9A961]"></div>
      </div>
    );
  }

  const featuresByCategory = getFeaturesByCategory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#F5E6D3]/20 to-[#C9A961]/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C9A961] via-[#C9A961] to-[#1B4332] text-white shadow-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center gap-2 text-sm text-[#F5E6D3] mb-2">
            <Link href="/management" className="hover:text-white">Management</Link>
            <span>/</span>
            <Link href="/management/action/unified-utopia" className="hover:text-white">Unified Utopia</Link>
            <span>/</span>
            <span>LithoSurfer Features</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">LithoSurfer: Feature Comparison</h1>
              <p className="text-[#F5E6D3] mt-1">Define which features are available in each tier</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-[#F5E6D3]">
                {assignedCount} / {totalCount} features assigned
              </div>
              {lastSaved && (
                <div className="text-sm text-green-200">
                  Saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={saveAll}
                disabled={saving}
                className="px-6 py-2 bg-white text-[#1B4332] rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          <Link
            href="/management/action/unified-utopia/lithosurfer"
            className="px-4 py-2 bg-[#C9A961] text-white rounded-lg font-semibold"
          >
            LithoSurfer
          </Link>
          <Link
            href="/management/action/unified-utopia/lithodata"
            className="px-4 py-2 bg-white text-[#1B4332] rounded-lg font-semibold border border-gray-200 hover:bg-gray-50"
          >
            LithoData
          </Link>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showFutureFeatures}
                onChange={(e) => setShowFutureFeatures(e.target.checked)}
                className="rounded"
              />
              Show Future Features
            </label>
            <div className="h-6 w-px bg-gray-300" />
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-3 py-1.5 border rounded-lg text-sm"
            >
              <option value="">All Categories</option>
              {featureCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Click tier columns to assign features. Higher tiers include all lower tier features.
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 border-b px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800">Comparison Matrix</h2>
            <p className="text-sm text-gray-500">Auto-generated from tier assignments</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 w-[280px]">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-500 w-[100px]">FREE</th>
                  <th className="text-center px-4 py-3 font-semibold text-blue-600 w-[100px]">PRO</th>
                  <th className="text-center px-4 py-3 font-semibold text-purple-600 w-[100px]">ENTERPRISE</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 w-[180px]">
                    <div className="flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Comments
                    </div>
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-amber-600 w-[180px]">
                    <div className="flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Dev Required
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(featuresByCategory).map(([category, features]) => (
                  <>
                    {/* Category Header */}
                    <tr key={`cat-${category}`} className="bg-gray-100">
                      <td colSpan={6} className="px-4 py-2 font-semibold text-gray-700 text-sm">
                        {category}
                      </td>
                    </tr>
                    {/* Features */}
                    {features.map((feature) => {
                      const baseTier = getBaseTier(feature.id);
                      const expandedType = expandedComments[feature.id];
                      const hasComments = comments[feature.id]?.suggestion || comments[feature.id]?.development;

                      return (
                        <tr key={feature.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <div>
                                <div className="font-medium text-gray-900 text-sm">{feature.feature}</div>
                                {feature.description && (
                                  <div className="text-xs text-gray-500 mt-0.5">{feature.description}</div>
                                )}
                                {feature.available === 'future' && (
                                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded">
                                    Future
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* FREE Column */}
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => toggleTier(feature.id, 'free')}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                isInTier(feature.id, 'free')
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 text-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {isInTier(feature.id, 'free') ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="text-lg">-</span>
                              )}
                            </button>
                          </td>

                          {/* PRO Column */}
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => toggleTier(feature.id, 'pro')}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                isInTier(feature.id, 'pro')
                                  ? baseTier === 'pro'
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'bg-green-100 border-green-300 text-green-500'
                                  : 'border-gray-300 text-gray-300 hover:border-blue-400'
                              }`}
                            >
                              {isInTier(feature.id, 'pro') ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="text-lg">-</span>
                              )}
                            </button>
                          </td>

                          {/* ENTERPRISE Column */}
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => toggleTier(feature.id, 'enterprise')}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                isInTier(feature.id, 'enterprise')
                                  ? baseTier === 'enterprise'
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'bg-green-100 border-green-300 text-green-500'
                                  : 'border-gray-300 text-gray-300 hover:border-purple-400'
                              }`}
                            >
                              {isInTier(feature.id, 'enterprise') ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="text-lg">-</span>
                              )}
                            </button>
                          </td>

                          {/* Comments Column */}
                          <td className="px-2 py-3">
                            <div className="relative">
                              <button
                                onClick={() => toggleCommentExpand(feature.id, 'suggestion')}
                                className={`w-full px-2 py-1.5 text-xs rounded border transition-all flex items-center gap-1 ${
                                  comments[feature.id]?.suggestion
                                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                                }`}
                              >
                                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="truncate">
                                  {comments[feature.id]?.suggestion || 'Add comment'}
                                </span>
                              </button>
                              {expandedType === 'suggestion' && (
                                <div className="absolute z-10 top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border p-2">
                                  <textarea
                                    value={comments[feature.id]?.suggestion || ''}
                                    onChange={(e) => updateComment(feature.id, 'suggestion', e.target.value)}
                                    placeholder="Add suggestion or comment..."
                                    className="w-full h-20 text-xs border rounded p-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    autoFocus
                                  />
                                  <div className="flex justify-end mt-1">
                                    <button
                                      onClick={() => toggleCommentExpand(feature.id, 'suggestion')}
                                      className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                      Done
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Dev Required Column */}
                          <td className="px-2 py-3">
                            <div className="relative">
                              <button
                                onClick={() => toggleCommentExpand(feature.id, 'development')}
                                className={`w-full px-2 py-1.5 text-xs rounded border transition-all flex items-center gap-1 ${
                                  comments[feature.id]?.development
                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                                }`}
                              >
                                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="truncate">
                                  {comments[feature.id]?.development || 'Add dev note'}
                                </span>
                              </button>
                              {expandedType === 'development' && (
                                <div className="absolute z-10 top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border p-2">
                                  <textarea
                                    value={comments[feature.id]?.development || ''}
                                    onChange={(e) => updateComment(feature.id, 'development', e.target.value)}
                                    placeholder="Development requirements..."
                                    className="w-full h-20 text-xs border rounded p-2 resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    autoFocus
                                  />
                                  <div className="flex justify-end mt-1">
                                    <button
                                      onClick={() => toggleCommentExpand(feature.id, 'development')}
                                      className="text-xs px-2 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
                                    >
                                      Done
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Feature included (base tier)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Inherited from lower tier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-300">
                -
              </div>
              <span>Not included</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded">Future</span>
              <span>Planned feature</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-3">
            Click on tier buttons to assign features. Features assigned to FREE are automatically included in PRO and ENTERPRISE. Features assigned to PRO are included in ENTERPRISE.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link
            href="/management"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
          >
            Back to Management
          </Link>
          <button
            onClick={saveAll}
            disabled={saving}
            className="px-6 py-3 bg-[#C9A961] text-white rounded-lg font-semibold hover:bg-[#1B4332] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
