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

interface FeatureMetadata {
  [featureId: string]: {
    description?: string;
    deleted?: boolean;
    phase2?: boolean;
  };
}

export default function LithoSurferPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [assignments, setAssignments] = useState<TierAssignments>({});
  const [comments, setComments] = useState<FeatureComments>({});
  const [metadata, setMetadata] = useState<FeatureMetadata>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFutureFeatures, setShowFutureFeatures] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showCommentsPanel, setShowCommentsPanel] = useState(true);
  const [editingDescription, setEditingDescription] = useState<string | null>(null);

  // Load existing assignments, comments, and metadata from API
  const loadData = useCallback(async () => {
    try {
      const [assignmentsRes, commentsRes, metadataRes] = await Promise.all([
        fetch('/api/product-tiers/feature-assignments?productType=lithosurfer'),
        fetch('/api/product-tiers/feature-comments?productType=lithosurfer'),
        fetch('/api/product-tiers/feature-metadata?productType=lithosurfer')
      ]);

      if (assignmentsRes.ok) {
        const data = await assignmentsRes.json();
        setAssignments(data.assignments || {});
      }

      if (commentsRes.ok) {
        const data = await commentsRes.json();
        setComments(data.comments || {});
      }

      if (metadataRes.ok) {
        const data = await metadataRes.json();
        setMetadata(data.metadata || {});
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
      const [assignmentsRes, commentsRes, metadataRes] = await Promise.all([
        fetch('/api/product-tiers/feature-assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productType: 'lithosurfer', assignments }),
        }),
        fetch('/api/product-tiers/feature-comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productType: 'lithosurfer', comments }),
        }),
        fetch('/api/product-tiers/feature-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productType: 'lithosurfer', metadata }),
        })
      ]);

      if (assignmentsRes.ok && commentsRes.ok && metadataRes.ok) {
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

  // Update feature description
  const updateDescription = (featureId: string, description: string) => {
    setMetadata(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        description
      }
    }));
  };

  // Toggle deleted status
  const toggleDeleted = (featureId: string) => {
    setMetadata(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        deleted: !prev[featureId]?.deleted,
        phase2: false // Clear phase2 when deleting
      }
    }));
  };

  // Toggle phase2 status
  const togglePhase2 = (featureId: string) => {
    setMetadata(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        phase2: !prev[featureId]?.phase2,
        deleted: false // Clear deleted when marking phase2
      }
    }));
  };

  // Get feature description (custom or default)
  const getDescription = (feature: LithoSurferFeature): string => {
    return metadata[feature.id]?.description || feature.description;
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

  // Sort features by tier and status: Free first, then Pro, then Enterprise, then Phase2, then Deleted
  const getFeaturesSortedByTier = (): LithoSurferFeature[] => {
    const filtered = getFilteredFeatures();

    return [...filtered].sort((a, b) => {
      // Check deleted status
      const aDeleted = metadata[a.id]?.deleted || false;
      const bDeleted = metadata[b.id]?.deleted || false;

      // Check phase2 status
      const aPhase2 = metadata[a.id]?.phase2 || false;
      const bPhase2 = metadata[b.id]?.phase2 || false;

      // Deleted items always go to bottom
      if (aDeleted && !bDeleted) return 1;
      if (!aDeleted && bDeleted) return -1;

      // Both deleted, maintain tier order within deleted
      if (aDeleted && bDeleted) {
        const tierA = assignments[a.id] || 'unassigned';
        const tierB = assignments[b.id] || 'unassigned';
        const tierOrder: Record<TierName | 'unassigned', number> = {
          'free': 0,
          'pro': 1,
          'enterprise': 2,
          'unassigned': 3
        };
        return tierOrder[tierA] - tierOrder[tierB];
      }

      // Phase2 items go after enterprise but before deleted
      if (aPhase2 && !bPhase2) return 1;
      if (!aPhase2 && bPhase2) return -1;

      // Both phase2, maintain tier order within phase2
      if (aPhase2 && bPhase2) {
        const tierA = assignments[a.id] || 'unassigned';
        const tierB = assignments[b.id] || 'unassigned';
        const tierOrder: Record<TierName | 'unassigned', number> = {
          'free': 0,
          'pro': 1,
          'enterprise': 2,
          'unassigned': 3
        };
        return tierOrder[tierA] - tierOrder[tierB];
      }

      // Normal tier sorting
      const tierA = assignments[a.id] || 'unassigned';
      const tierB = assignments[b.id] || 'unassigned';
      const tierOrder: Record<TierName | 'unassigned', number> = {
        'free': 0,
        'pro': 1,
        'enterprise': 2,
        'unassigned': 3
      };
      return tierOrder[tierA] - tierOrder[tierB];
    });
  };

  // Get all features with comments
  const getFeaturesWithComments = (): { feature: LithoSurferFeature; suggestion?: string; development?: string }[] => {
    return lithosurferFeatures
      .filter(f => comments[f.id]?.suggestion || comments[f.id]?.development)
      .map(f => ({
        feature: f,
        suggestion: comments[f.id]?.suggestion,
        development: comments[f.id]?.development
      }));
  };

  // Stats
  const assignedCount = Object.keys(assignments).length;
  const totalCount = lithosurferFeatures.filter(f => showFutureFeatures || f.available !== 'future').length;
  const commentsCount = getFeaturesWithComments().length;

  // Get selected feature details
  const selectedFeatureData = selectedFeature ? lithosurferFeatures.find(f => f.id === selectedFeature) : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#C9A961]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C9A961] via-[#C9A961] to-[#1B4332] text-white shadow-lg flex-shrink-0">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-[#F5E6D3] mb-2">
            <Link href="/management" className="hover:text-white">Management</Link>
            <span>/</span>
            <Link href="/management/action/unified-utopia" className="hover:text-white">Unified Utopia</Link>
            <span>/</span>
            <span>LithoSurfer Features</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">LithoSurfer: Feature Comparison</h1>
              <p className="text-[#F5E6D3] text-sm mt-1">Define which features are available in each tier</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-[#F5E6D3]">
                {assignedCount} / {totalCount} assigned
              </div>
              {lastSaved && (
                <div className="text-sm text-green-200">
                  Saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={saveAll}
                disabled={saving}
                className="px-4 py-2 bg-white text-[#1B4332] rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 text-sm"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white border-b flex-shrink-0">
        <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex gap-3">
            <Link
              href="/management/action/unified-utopia/lithosurfer"
              className="px-3 py-1.5 bg-[#C9A961] text-white rounded-lg font-medium text-sm"
            >
              LithoSurfer
            </Link>
            <Link
              href="/management/action/unified-utopia/lithodata"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200"
            >
              LithoData
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showFutureFeatures}
                onChange={(e) => setShowFutureFeatures(e.target.checked)}
                className="rounded"
              />
              Show Future
            </label>
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
            <button
              onClick={() => setShowCommentsPanel(!showCommentsPanel)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                showCommentsPanel
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Comments ({commentsCount})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Feature Matrix */}
        <div className={`${showCommentsPanel ? 'w-2/3' : 'w-full'} overflow-y-auto border-r bg-white`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600 text-sm">Feature</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-500 text-sm w-[80px]">FREE</th>
                  <th className="text-center px-3 py-3 font-medium text-blue-600 text-sm w-[80px]">PRO</th>
                  <th className="text-center px-3 py-3 font-medium text-purple-600 text-sm w-[80px]">ENTERPRISE</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-500 text-sm w-[100px]">Comments</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-500 text-sm w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFeaturesSortedByTier().map((feature) => {
                  const baseTier = getBaseTier(feature.id);
                  const hasComment = comments[feature.id]?.suggestion || comments[feature.id]?.development;
                  const isSelected = selectedFeature === feature.id;
                  const isDeleted = metadata[feature.id]?.deleted || false;
                  const isPhase2 = metadata[feature.id]?.phase2 || false;
                  const description = getDescription(feature);
                  const isEditingDesc = editingDescription === feature.id;

                  return (
                    <tr
                      key={feature.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-50' : ''
                      } ${isDeleted ? 'opacity-40 bg-gray-100' : ''}`}
                      onClick={() => setSelectedFeature(feature.id)}
                    >
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className={`text-sm ${isDeleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                              {feature.feature}
                            </div>
                            {isEditingDesc ? (
                              <input
                                type="text"
                                value={description}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateDescription(feature.id, e.target.value);
                                }}
                                onBlur={() => setEditingDescription(null)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') setEditingDescription(null);
                                  if (e.key === 'Escape') setEditingDescription(null);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                                className="w-full text-xs border rounded px-2 py-1 mt-1"
                                placeholder="Add description..."
                              />
                            ) : (
                              <div
                                className={`text-xs ${isDeleted ? 'text-gray-300' : 'text-gray-400'} ${!description && !isDeleted ? 'italic' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingDescription(feature.id);
                                }}
                              >
                                {description || 'Click to add description...'}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {isPhase2 && (
                              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
                                Phase 2
                              </span>
                            )}
                            {isDeleted && (
                              <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 font-medium">
                                Deleted
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* FREE Column */}
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleTier(feature.id, 'free'); }}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all mx-auto ${
                            isInTier(feature.id, 'free')
                              ? 'bg-emerald-400 border-emerald-400 text-white'
                              : 'border-gray-200 text-gray-300 hover:border-gray-300'
                          }`}
                        >
                          {isInTier(feature.id, 'free') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-xs">-</span>
                          )}
                        </button>
                      </td>

                      {/* PRO Column */}
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleTier(feature.id, 'pro'); }}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all mx-auto ${
                            isInTier(feature.id, 'pro')
                              ? baseTier === 'pro'
                                ? 'bg-emerald-400 border-emerald-400 text-white'
                                : 'bg-emerald-100 border-emerald-200 text-emerald-500'
                              : 'border-gray-200 text-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {isInTier(feature.id, 'pro') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-xs">-</span>
                          )}
                        </button>
                      </td>

                      {/* ENTERPRISE Column */}
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleTier(feature.id, 'enterprise'); }}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all mx-auto ${
                            isInTier(feature.id, 'enterprise')
                              ? baseTier === 'enterprise'
                                ? 'bg-emerald-400 border-emerald-400 text-white'
                                : 'bg-emerald-100 border-emerald-200 text-emerald-500'
                              : 'border-gray-200 text-gray-300 hover:border-purple-300'
                          }`}
                        >
                          {isInTier(feature.id, 'enterprise') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-xs">-</span>
                          )}
                        </button>
                      </td>

                      {/* Comments Indicator */}
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFeature(feature.id);
                            setShowCommentsPanel(true);
                          }}
                          className={`px-2 py-1 text-xs rounded flex items-center gap-1 mx-auto ${
                            hasComment
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          {hasComment ? (
                            <span>{(comments[feature.id]?.suggestion ? 1 : 0) + (comments[feature.id]?.development ? 1 : 0)}</span>
                          ) : (
                            <span>Add</span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePhase2(feature.id);
                            }}
                            className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                              isPhase2
                                ? 'bg-amber-500 text-white hover:bg-amber-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700'
                            }`}
                            title="Mark as Phase 2"
                          >
                            P2
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDeleted(feature.id);
                            }}
                            className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                              isDeleted
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700'
                            }`}
                            title={isDeleted ? "Restore" : "Delete"}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {isDeleted ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              )}
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600">Base tier</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600">Inherited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-300 text-xs">
                  -
                </div>
                <span className="text-gray-600">Not included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Comments */}
        {showCommentsPanel && (
          <div className="w-1/3 bg-gray-50 overflow-y-auto flex flex-col">
            <div className="p-4 border-b bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
                <button
                  onClick={() => setShowCommentsPanel(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Selected Feature Comment Editor */}
            {selectedFeatureData && (
              <div className="p-4 border-b bg-white">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      getBaseTier(selectedFeatureData.id) === 'free' ? 'bg-gray-100 text-gray-700' :
                      getBaseTier(selectedFeatureData.id) === 'pro' ? 'bg-blue-100 text-blue-700' :
                      getBaseTier(selectedFeatureData.id) === 'enterprise' ? 'bg-purple-100 text-purple-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {getBaseTier(selectedFeatureData.id)?.toUpperCase() || 'UNASSIGNED'}
                    </span>
                    <span className="text-xs text-gray-400">{selectedFeatureData.category}</span>
                  </div>
                  <h3 className="font-medium text-gray-900">{selectedFeatureData.feature}</h3>
                  {selectedFeatureData.description && (
                    <p className="text-sm text-gray-500 mt-1">{selectedFeatureData.description}</p>
                  )}
                </div>

                {/* Suggestion Comment */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Comment / Suggestion
                  </label>
                  <textarea
                    value={comments[selectedFeatureData.id]?.suggestion || ''}
                    onChange={(e) => updateComment(selectedFeatureData.id, 'suggestion', e.target.value)}
                    placeholder="Add a comment or suggestion about this feature..."
                    className="w-full h-20 text-sm border rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Development Comment */}
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Dev Required
                  </label>
                  <textarea
                    value={comments[selectedFeatureData.id]?.development || ''}
                    onChange={(e) => updateComment(selectedFeatureData.id, 'development', e.target.value)}
                    placeholder="Development requirements or notes..."
                    className="w-full h-20 text-sm border rounded-lg p-2 resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {!selectedFeatureData && (
              <div className="p-4 border-b bg-white">
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <p className="text-sm">Click on a feature row to add comments</p>
                </div>
              </div>
            )}

            {/* All Comments List */}
            <div className="flex-1 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">All Comments ({commentsCount})</h3>

              {commentsCount === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm">No comments yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getFeaturesWithComments().map(({ feature, suggestion, development }) => (
                    <div
                      key={feature.id}
                      className={`bg-white rounded-lg border p-3 cursor-pointer hover:shadow-sm transition-shadow ${
                        selectedFeature === feature.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedFeature(feature.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          getBaseTier(feature.id) === 'free' ? 'bg-gray-100 text-gray-600' :
                          getBaseTier(feature.id) === 'pro' ? 'bg-blue-100 text-blue-600' :
                          getBaseTier(feature.id) === 'enterprise' ? 'bg-purple-100 text-purple-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {getBaseTier(feature.id)?.toUpperCase() || 'N/A'}
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate">{feature.feature}</span>
                      </div>

                      {suggestion && (
                        <div className="mb-2">
                          <div className="flex items-center gap-1 text-xs text-blue-600 mb-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Comment
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{suggestion}</p>
                        </div>
                      )}

                      {development && (
                        <div>
                          <div className="flex items-center gap-1 text-xs text-amber-600 mb-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Dev Required
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">{development}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
