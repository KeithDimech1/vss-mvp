'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { lithosurferFeatures, featureCategories, LithoSurferFeature, TierName } from '@/lib/lithosurfer-features';

interface TierAssignments {
  [featureId: string]: TierName;
}

const tierConfig = {
  free: {
    name: 'FREE',
    color: 'bg-gray-100 border-gray-300',
    headerBg: 'bg-gray-500',
    badge: 'bg-gray-500',
    dropZone: 'border-gray-400 bg-gray-50',
    dropZoneActive: 'border-gray-600 bg-gray-100',
  },
  pro: {
    name: 'PRO',
    color: 'bg-blue-100 border-blue-300',
    headerBg: 'bg-blue-600',
    badge: 'bg-blue-600',
    dropZone: 'border-blue-400 bg-blue-50',
    dropZoneActive: 'border-blue-600 bg-blue-100',
  },
  enterprise: {
    name: 'ENTERPRISE',
    color: 'bg-purple-100 border-purple-300',
    headerBg: 'bg-purple-600',
    badge: 'bg-purple-600',
    dropZone: 'border-purple-400 bg-purple-50',
    dropZoneActive: 'border-purple-600 bg-purple-100',
  },
};

export default function LithoSurferDragDropPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [assignments, setAssignments] = useState<TierAssignments>({});
  const [draggedFeature, setDraggedFeature] = useState<string | null>(null);
  const [dragOverTier, setDragOverTier] = useState<TierName | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFutureFeatures, setShowFutureFeatures] = useState(true);

  // Load existing assignments from API
  const loadAssignments = useCallback(async () => {
    try {
      const res = await fetch('/api/product-tiers/feature-assignments?productType=lithosurfer');
      if (res.ok) {
        const data = await res.json();
        setAssignments(data.assignments || {});
      }
    } catch (error) {
      console.error('Error loading assignments:', error);
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
        await loadAssignments();
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    };
    checkAccess();
  }, [router, loadAssignments]);

  // Save assignments to API
  const saveAssignments = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/product-tiers/feature-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: 'lithosurfer',
          assignments,
        }),
      });
      if (res.ok) {
        setLastSaved(new Date());
      } else {
        alert('Failed to save assignments');
      }
    } catch (error) {
      console.error('Error saving assignments:', error);
      alert('Failed to save assignments');
    }
    setSaving(false);
  };

  // Drag handlers
  const handleDragStart = (featureId: string) => {
    setDraggedFeature(featureId);
  };

  const handleDragEnd = () => {
    setDraggedFeature(null);
    setDragOverTier(null);
  };

  const handleDragOver = (e: React.DragEvent, tier: TierName) => {
    e.preventDefault();
    setDragOverTier(tier);
  };

  const handleDragLeave = () => {
    setDragOverTier(null);
  };

  const handleDrop = (e: React.DragEvent, tier: TierName) => {
    e.preventDefault();
    if (draggedFeature) {
      setAssignments(prev => ({
        ...prev,
        [draggedFeature]: tier,
      }));
    }
    setDraggedFeature(null);
    setDragOverTier(null);
  };

  // Click to assign
  const assignToTier = (featureId: string, tier: TierName) => {
    setAssignments(prev => ({
      ...prev,
      [featureId]: tier,
    }));
  };

  // Remove from tier
  const removeFromTier = (featureId: string) => {
    setAssignments(prev => {
      const newAssignments = { ...prev };
      delete newAssignments[featureId];
      return newAssignments;
    });
  };

  // Get features for a tier
  const getFeaturesForTier = (tier: TierName): LithoSurferFeature[] => {
    return lithosurferFeatures.filter(f => {
      if (!showFutureFeatures && f.available === 'future') return false;
      return assignments[f.id] === tier;
    });
  };

  // Get unassigned features
  const getUnassignedFeatures = (): LithoSurferFeature[] => {
    return lithosurferFeatures.filter(f => {
      if (!showFutureFeatures && f.available === 'future') return false;
      if (selectedCategory && f.category !== selectedCategory) return false;
      return !assignments[f.id];
    });
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
              <h1 className="text-3xl font-bold">LithoSurfer: Feature Assignment</h1>
              <p className="text-[#F5E6D3] mt-1">Drag features to assign them to FREE, PRO, or ENTERPRISE tiers</p>
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
                onClick={saveAssignments}
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
            Tip: Drag features from the pool to a tier column, or click the tier buttons
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Unassigned Features Pool */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-4 py-3">
              <h2 className="text-lg font-bold text-white">Unassigned Features</h2>
              <p className="text-gray-300 text-sm">{getUnassignedFeatures().length} features</p>
            </div>
            <div className="p-4 max-h-[calc(100vh-320px)] overflow-y-auto">
              <div className="space-y-2">
                {getUnassignedFeatures().map(feature => (
                  <div
                    key={feature.id}
                    draggable
                    onDragStart={() => handleDragStart(feature.id)}
                    onDragEnd={handleDragEnd}
                    className={`p-3 rounded-lg border-2 border-gray-200 bg-white cursor-move hover:shadow-md transition-all ${
                      draggedFeature === feature.id ? 'opacity-50 scale-95' : ''
                    } ${feature.available === 'future' ? 'border-dashed border-amber-300 bg-amber-50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">{feature.feature}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{feature.category}</div>
                        {feature.description && (
                          <div className="text-xs text-gray-400 mt-1 line-clamp-2">{feature.description}</div>
                        )}
                        {feature.available === 'future' && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-200 text-amber-800 text-xs rounded">
                            Future
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <button
                        onClick={() => assignToTier(feature.id, 'free')}
                        className="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                      >
                        Free
                      </button>
                      <button
                        onClick={() => assignToTier(feature.id, 'pro')}
                        className="flex-1 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                      >
                        Pro
                      </button>
                      <button
                        onClick={() => assignToTier(feature.id, 'enterprise')}
                        className="flex-1 px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-colors"
                      >
                        Ent
                      </button>
                    </div>
                  </div>
                ))}
                {getUnassignedFeatures().length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    All features have been assigned!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tier Columns */}
          {(['free', 'pro', 'enterprise'] as const).map(tier => {
            const config = tierConfig[tier];
            const features = getFeaturesForTier(tier);
            const isDropTarget = dragOverTier === tier;

            return (
              <div
                key={tier}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                onDragOver={(e) => handleDragOver(e, tier)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, tier)}
              >
                <div className={`${config.headerBg} px-4 py-3`}>
                  <h2 className="text-lg font-bold text-white">{config.name}</h2>
                  <p className="text-white/70 text-sm">{features.length} features</p>
                </div>
                <div
                  className={`p-4 max-h-[calc(100vh-320px)] overflow-y-auto border-4 transition-colors ${
                    isDropTarget ? config.dropZoneActive + ' border-dashed' : 'border-transparent'
                  }`}
                >
                  {isDropTarget && draggedFeature && (
                    <div className="mb-2 p-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-center text-gray-500 text-sm">
                      Drop here to add to {config.name}
                    </div>
                  )}
                  <div className="space-y-2">
                    {features.map(feature => (
                      <div
                        key={feature.id}
                        draggable
                        onDragStart={() => handleDragStart(feature.id)}
                        onDragEnd={handleDragEnd}
                        className={`p-3 rounded-lg border ${config.color} cursor-move hover:shadow-md transition-all ${
                          draggedFeature === feature.id ? 'opacity-50 scale-95' : ''
                        } ${feature.available === 'future' ? 'border-dashed' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm">{feature.feature}</div>
                            <div className="text-xs text-gray-500">{feature.category}</div>
                            {feature.available === 'future' && (
                              <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-200 text-amber-800 text-xs rounded">
                                Future
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromTier(feature.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove from tier"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    {features.length === 0 && !isDropTarget && (
                      <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                        Drag features here
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Legend</h3>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200 border border-gray-300"></div>
              <span>FREE tier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-200 border border-blue-300"></div>
              <span>PRO tier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-200 border border-purple-300"></div>
              <span>ENTERPRISE tier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-dashed border-amber-300 bg-amber-50"></div>
              <span>Future feature</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Note: Features in higher tiers automatically include all features from lower tiers (Enterprise includes Pro + Free, Pro includes Free)
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link
            href="/management/action/unified-utopia"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
          >
            Back to Unified Utopia
          </Link>
          <button
            onClick={saveAssignments}
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
