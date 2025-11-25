'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Feature {
  category: string;
  feature: string;
  note?: string;
  upgradePath?: string;
  comment?: string;
}

interface TierConfig {
  id: string;
  productType: string;
  tierName: string;
  price: string | null;
  priceNote: string | null;
  target: string | null;
  source: string | null;
  featuresIn: Feature[];
  featuresOut: Feature[];
  restrictions: string | null;
  keyDifferentiator: string | null;
  lastEditedAt: string;
}

const tierOrder = ['free', 'pro', 'enterprise'];
const tierColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  free: { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-500' },
  pro: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', badge: 'bg-blue-500' },
  enterprise: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700', badge: 'bg-purple-500' },
};

const tierDisplayNames: Record<string, string> = {
  free: 'FREE',
  pro: 'PRO',
  enterprise: 'ENTERPRISE',
};

export default function LithoSurferSummaryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tiers, setTiers] = useState<TierConfig[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TierConfig | null>(null);

  const fetchTiers = useCallback(async () => {
    try {
      const res = await fetch('/api/product-tiers?productType=lithosurfer');
      if (res.ok) {
        const data = await res.json();
        // Sort tiers by tierOrder
        data.sort((a: TierConfig, b: TierConfig) =>
          tierOrder.indexOf(a.tierName) - tierOrder.indexOf(b.tierName)
        );
        setTiers(data);
      }
    } catch (error) {
      console.error('Error fetching tiers:', error);
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
        await fetchTiers();
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    };
    checkAccess();
  }, [router, fetchTiers]);

  const startEditing = (tier: TierConfig) => {
    setEditingTier(tier.id);
    setEditForm({ ...tier });
  };

  const cancelEditing = () => {
    setEditingTier(null);
    setEditForm(null);
  };

  const saveTier = async () => {
    if (!editForm) return;
    setSaving(true);
    try {
      const res = await fetch('/api/product-tiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        await fetchTiers();
        setEditingTier(null);
        setEditForm(null);
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving tier:', error);
      alert('Failed to save changes');
    }
    setSaving(false);
  };

  const updateFeatureIn = (index: number, field: keyof Feature, value: string) => {
    if (!editForm) return;
    const newFeatures = [...editForm.featuresIn];
    newFeatures[index] = { ...newFeatures[index], [field]: value || undefined };
    setEditForm({ ...editForm, featuresIn: newFeatures });
  };

  const updateFeatureOut = (index: number, field: keyof Feature, value: string) => {
    if (!editForm) return;
    const newFeatures = [...editForm.featuresOut];
    newFeatures[index] = { ...newFeatures[index], [field]: value || undefined };
    setEditForm({ ...editForm, featuresOut: newFeatures });
  };

  const addFeatureIn = () => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      featuresIn: [...editForm.featuresIn, { category: '', feature: '' }],
    });
  };

  const addFeatureOut = () => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      featuresOut: [...editForm.featuresOut, { category: '', feature: '', upgradePath: '' }],
    });
  };

  const removeFeatureIn = (index: number) => {
    if (!editForm) return;
    const newFeatures = editForm.featuresIn.filter((_, i) => i !== index);
    setEditForm({ ...editForm, featuresIn: newFeatures });
  };

  const removeFeatureOut = (index: number) => {
    if (!editForm) return;
    const newFeatures = editForm.featuresOut.filter((_, i) => i !== index);
    setEditForm({ ...editForm, featuresOut: newFeatures });
  };

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
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-[#F5E6D3] mb-2">
            <Link href="/management" className="hover:text-white">Management</Link>
            <span>/</span>
            <Link href="/management/action/unified-utopia" className="hover:text-white">Unified Utopia</Link>
            <span>/</span>
            <span>LithoSurfer</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">LithoSurfer: What's In & What's Out</h1>
              <p className="text-[#F5E6D3] mt-2">Three-Tier Product Strategy Summary</p>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                editMode
                  ? 'bg-white text-[#1B4332] hover:bg-gray-100'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {editMode ? 'Exit Edit Mode' : 'Enable Editing'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
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

        {editMode && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Edit Mode Active:</strong> Click on any tier card to edit its details. Changes are saved when you click "Save Changes".
            </p>
          </div>
        )}

        {/* Tier Cards */}
        {tiers.map((tier) => {
          const colors = tierColors[tier.tierName] || tierColors.free;
          const isEditing = editingTier === tier.id;
          const displayTier = isEditing && editForm ? editForm : tier;

          return (
            <div key={tier.id} className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
              {/* Tier Header */}
              <div className={`${colors.bg} px-6 py-4 border-b ${colors.border}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-[#1B4332]">{tierDisplayNames[tier.tierName]}</span>
                          <input
                            type="text"
                            value={editForm?.price || ''}
                            onChange={(e) => setEditForm({ ...editForm!, price: e.target.value })}
                            className="px-3 py-1 border rounded text-lg font-bold"
                            placeholder="Price (e.g., $0, $5,000/year)"
                          />
                        </div>
                        <input
                          type="text"
                          value={editForm?.target || ''}
                          onChange={(e) => setEditForm({ ...editForm!, target: e.target.value })}
                          className="w-full px-3 py-1 border rounded text-sm"
                          placeholder="Target audience"
                        />
                        <input
                          type="text"
                          value={editForm?.priceNote || ''}
                          onChange={(e) => setEditForm({ ...editForm!, priceNote: e.target.value })}
                          className="w-full px-3 py-1 border rounded text-sm"
                          placeholder="Price note (optional)"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-[#1B4332]">
                          {tierDisplayNames[tier.tierName]} ({tier.price || 'Price TBD'})
                        </h2>
                        <p className="text-gray-600">{tier.target || 'Target audience not set'}</p>
                      </>
                    )}
                  </div>
                  {tier.priceNote && !isEditing && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                      {tier.priceNote}
                    </span>
                  )}
                  {editMode && !isEditing && (
                    <button
                      onClick={() => startEditing(tier)}
                      className="px-4 py-2 bg-[#C9A961] text-white rounded-lg hover:bg-[#1B4332] transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* What's IN */}
                <div className="p-6 border-r border-gray-200">
                  <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">+</span>
                    What's IN
                  </h3>
                  <div className="space-y-3">
                    {displayTier.featuresIn.map((feat, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-3">
                        {isEditing ? (
                          <div className="space-y-2">
                            <div className="flex gap-2 items-start">
                              <input
                                type="text"
                                value={feat.category}
                                onChange={(e) => updateFeatureIn(idx, 'category', e.target.value)}
                                className="w-32 px-2 py-1 border rounded text-sm"
                                placeholder="Category"
                              />
                              <input
                                type="text"
                                value={feat.feature}
                                onChange={(e) => updateFeatureIn(idx, 'feature', e.target.value)}
                                className="flex-1 px-2 py-1 border rounded text-sm"
                                placeholder="Feature"
                              />
                              <input
                                type="text"
                                value={feat.note || ''}
                                onChange={(e) => updateFeatureIn(idx, 'note', e.target.value)}
                                className="w-20 px-2 py-1 border rounded text-sm"
                                placeholder="Note"
                              />
                              <button
                                onClick={() => removeFeatureIn(idx)}
                                className="text-red-500 hover:text-red-700 px-2"
                              >
                                ×
                              </button>
                            </div>
                            <textarea
                              value={feat.comment || ''}
                              onChange={(e) => updateFeatureIn(idx, 'comment', e.target.value)}
                              className="w-full px-2 py-1 border rounded text-sm"
                              placeholder="Add comments..."
                              rows={2}
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="flex">
                              <span className="w-32 font-medium text-gray-700">{feat.category}</span>
                              <span className="flex-1 text-gray-600">
                                {feat.feature}
                                {feat.note && <span className="text-gray-400 ml-1">({feat.note})</span>}
                              </span>
                            </div>
                            {feat.comment && (
                              <div className="mt-1 ml-32 text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                <span className="font-medium">Comments:</span> {feat.comment}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <button
                      onClick={addFeatureIn}
                      className="mt-2 text-sm text-green-600 hover:text-green-800"
                    >
                      + Add Feature
                    </button>
                  )}
                </div>

                {/* What's OUT */}
                <div className="p-6 bg-red-50/30">
                  <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">-</span>
                    What's OUT
                  </h3>
                  <div className="space-y-3">
                    {displayTier.featuresOut.map((feat, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-3">
                        {isEditing ? (
                          <div className="space-y-2">
                            <div className="flex gap-2 items-start">
                              <input
                                type="text"
                                value={feat.category}
                                onChange={(e) => updateFeatureOut(idx, 'category', e.target.value)}
                                className="w-32 px-2 py-1 border rounded text-sm"
                                placeholder="Category"
                              />
                              <input
                                type="text"
                                value={feat.feature}
                                onChange={(e) => updateFeatureOut(idx, 'feature', e.target.value)}
                                className="flex-1 px-2 py-1 border rounded text-sm"
                                placeholder="Feature"
                              />
                              <input
                                type="text"
                                value={feat.upgradePath || ''}
                                onChange={(e) => updateFeatureOut(idx, 'upgradePath', e.target.value)}
                                className="w-24 px-2 py-1 border rounded text-sm"
                                placeholder="Upgrade"
                              />
                              <button
                                onClick={() => removeFeatureOut(idx)}
                                className="text-red-500 hover:text-red-700 px-2"
                              >
                                ×
                              </button>
                            </div>
                            <textarea
                              value={feat.comment || ''}
                              onChange={(e) => updateFeatureOut(idx, 'comment', e.target.value)}
                              className="w-full px-2 py-1 border rounded text-sm"
                              placeholder="Add comments..."
                              rows={2}
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="flex">
                              <span className="w-32 font-medium text-gray-700">{feat.category}</span>
                              <span className="flex-1 text-gray-600">{feat.feature}</span>
                              {feat.upgradePath && (
                                <span className={`text-xs ${feat.upgradePath === 'Enterprise' ? 'text-purple-600' : 'text-blue-600'}`}>
                                  {feat.upgradePath}
                                </span>
                              )}
                            </div>
                            {feat.comment && (
                              <div className="mt-1 ml-32 text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                <span className="font-medium">Comments:</span> {feat.comment}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <button
                      onClick={addFeatureOut}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      + Add Feature
                    </button>
                  )}
                </div>
              </div>

              {/* Restrictions */}
              <div className="px-6 py-3 bg-amber-50 border-t text-sm text-amber-800">
                {isEditing ? (
                  <div className="space-y-2">
                    <div>
                      <label className="font-semibold">Restrictions:</label>
                      <input
                        type="text"
                        value={editForm?.restrictions || ''}
                        onChange={(e) => setEditForm({ ...editForm!, restrictions: e.target.value })}
                        className="w-full px-3 py-1 border rounded mt-1"
                        placeholder="Key restrictions or limitations"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Key Differentiator:</label>
                      <input
                        type="text"
                        value={editForm?.keyDifferentiator || ''}
                        onChange={(e) => setEditForm({ ...editForm!, keyDifferentiator: e.target.value })}
                        className="w-full px-3 py-1 border rounded mt-1"
                        placeholder="What makes this tier unique"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {tier.restrictions && (
                      <p><strong>Restrictions:</strong> {tier.restrictions}</p>
                    )}
                    {tier.keyDifferentiator && (
                      <p className="mt-1"><strong>Key Differentiator:</strong> {tier.keyDifferentiator}</p>
                    )}
                  </>
                )}
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="px-6 py-4 bg-gray-50 border-t flex gap-3">
                  <button
                    onClick={saveTier}
                    disabled={saving}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Comparison Matrix */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-2xl font-bold text-[#1B4332]">Comparison Matrix</h2>
            <p className="text-sm text-gray-500">Auto-generated from tier features above</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier.id} className={`px-4 py-3 text-center font-semibold ${tierColors[tier.tierName]?.text || 'text-gray-700'}`}>
                      {tierDisplayNames[tier.tierName]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Generate rows from all unique features */}
                {(() => {
                  const allFeatures = new Set<string>();
                  tiers.forEach((tier) => {
                    tier.featuresIn.forEach((f) => allFeatures.add(f.feature));
                    tier.featuresOut.forEach((f) => allFeatures.add(f.feature));
                  });

                  return Array.from(allFeatures).slice(0, 20).map((feature, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-2 text-gray-700">{feature}</td>
                      {tiers.map((tier) => {
                        const inFeature = tier.featuresIn.find((f) => f.feature === feature);
                        const outFeature = tier.featuresOut.find((f) => f.feature === feature);
                        return (
                          <td key={tier.id} className="px-4 py-2 text-center">
                            {inFeature ? (
                              <span className="text-green-600">
                                {inFeature.note || 'Yes'}
                              </span>
                            ) : outFeature ? (
                              <span className="text-gray-400">No</span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ));
                })()}
                {/* Price row */}
                <tr className="border-t-2 font-semibold">
                  <td className="px-4 py-2 text-gray-700">Price/year</td>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-4 py-2 text-center">
                      {tier.price || 'TBD'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/management/action/unified-utopia"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
          >
            Back to Unified Utopia
          </Link>
          <Link
            href="/management/action/unified-utopia/lithodata"
            className="px-6 py-3 bg-[#C9A961] text-white rounded-lg font-semibold hover:bg-[#1B4332]"
          >
            View LithoData Summary
          </Link>
        </div>
      </div>
    </div>
  );
}
