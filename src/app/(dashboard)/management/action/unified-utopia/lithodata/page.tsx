'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Package {
  id: string;
  packageId: string;
  category: string;
  region: string;
  regionCode: string;
  records: number;
  priceAnnual: number | null;
  priceOneTime: number | null;
  priceNotes: string | null;
  isAvailable: boolean;
  isFree: boolean;
  lastEditedAt: string;
}

const categoryColors: Record<string, { bg: string; border: string; text: string; headerBg: string }> = {
  Thermochronology: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', headerBg: 'bg-blue-600' },
  Geochronology: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', headerBg: 'bg-purple-600' },
  Geochemistry: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', headerBg: 'bg-emerald-600' },
};

const regionOrder = ['GLOBAL', 'AFR', 'ANT', 'ARA', 'ASI', 'CAS', 'EUR', 'NAM', 'OCE', 'SAM'];

const regionNames: Record<string, string> = {
  GLOBAL: 'Global',
  AFR: 'Africa',
  ANT: 'Antarctica',
  ARA: 'Arabia',
  ASI: 'Asia',
  CAS: 'Central Asia',
  EUR: 'Europe',
  NAM: 'North America',
  OCE: 'Oceania',
  SAM: 'South America',
};

export default function LithoDataPricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [editedPackages, setEditedPackages] = useState<Record<string, Partial<Package>>>({});

  const fetchPackages = useCallback(async () => {
    try {
      const res = await fetch('/api/lithodata-packages');
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
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
        await fetchPackages();
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    };
    checkAccess();
  }, [router, fetchPackages]);

  const getPackageValue = (pkg: Package, field: keyof Package) => {
    if (editedPackages[pkg.packageId] && editedPackages[pkg.packageId][field] !== undefined) {
      return editedPackages[pkg.packageId][field];
    }
    return pkg[field];
  };

  const updatePackage = (packageId: string, field: keyof Package, value: string | number | boolean | null) => {
    setEditedPackages(prev => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        [field]: value,
      },
    }));
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const packagesToUpdate = Object.entries(editedPackages).map(([packageId, changes]) => ({
        packageId,
        ...changes,
      }));

      if (packagesToUpdate.length === 0) {
        setSaving(false);
        return;
      }

      const res = await fetch('/api/lithodata-packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages: packagesToUpdate }),
      });

      if (res.ok) {
        setLastSaved(new Date());
        setEditedPackages({});
        await fetchPackages();
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save');
    }
    setSaving(false);
  };

  const hasChanges = Object.keys(editedPackages).length > 0;

  // Group packages by category
  const packagesByCategory = packages.reduce((acc, pkg) => {
    if (!acc[pkg.category]) {
      acc[pkg.category] = [];
    }
    acc[pkg.category].push(pkg);
    return acc;
  }, {} as Record<string, Package[]>);

  // Sort packages within each category by region order
  Object.keys(packagesByCategory).forEach(category => {
    packagesByCategory[category].sort((a, b) =>
      regionOrder.indexOf(a.regionCode) - regionOrder.indexOf(b.regionCode)
    );
  });

  // Calculate totals
  const getTotalRecords = (category: string) => {
    return packagesByCategory[category]?.find(p => p.regionCode === 'GLOBAL')?.records || 0;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return '';
    return `$${price.toLocaleString()}`;
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
      <div className="bg-gradient-to-r from-[#1B4332] via-[#1B4332] to-[#C9A961] text-white shadow-lg">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center gap-2 text-sm text-[#F5E6D3] mb-2">
            <Link href="/management" className="hover:text-white">Management</Link>
            <span>/</span>
            <Link href="/management/action/unified-utopia" className="hover:text-white">Unified Utopia</Link>
            <span>/</span>
            <span>LithoData Pricing</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">LithoData: Regional Pricing</h1>
              <p className="text-[#F5E6D3] mt-1">Set prices for data packages by category and region</p>
            </div>
            <div className="flex items-center gap-4">
              {lastSaved && (
                <div className="text-sm text-green-200">
                  Saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={saveAll}
                disabled={saving || !hasChanges}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  hasChanges
                    ? 'bg-white text-[#1B4332] hover:bg-gray-100'
                    : 'bg-white/30 text-white/70 cursor-not-allowed'
                }`}
              >
                {saving ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          <Link
            href="/management/action/unified-utopia/lithosurfer"
            className="px-4 py-2 bg-white text-[#1B4332] rounded-lg font-semibold border border-gray-200 hover:bg-gray-50"
          >
            LithoSurfer
          </Link>
          <Link
            href="/management/action/unified-utopia/lithodata"
            className="px-4 py-2 bg-[#1B4332] text-white rounded-lg font-semibold"
          >
            LithoData
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['Thermochronology', 'Geochronology', 'Geochemistry'].map(category => {
            const colors = categoryColors[category];
            const totalRecords = getTotalRecords(category);
            const globalPkg = packagesByCategory[category]?.find(p => p.regionCode === 'GLOBAL');
            const annualPrice = globalPkg ? getPackageValue(globalPkg, 'priceAnnual') : null;

            return (
              <div key={category} className={`${colors.bg} ${colors.border} border rounded-xl p-4`}>
                <div className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>{category}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{formatNumber(totalRecords)} records</div>
                <div className="text-sm text-gray-500 mt-1">
                  Global: {annualPrice ? formatPrice(annualPrice as number) + '/yr' : 'Price not set'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Tables */}
        {['Thermochronology', 'Geochronology', 'Geochemistry'].map(category => {
          const colors = categoryColors[category];
          const categoryPackages = packagesByCategory[category] || [];

          return (
            <div key={category} className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
              {/* Category Header */}
              <div className={`${colors.headerBg} px-6 py-4`}>
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <p className="text-white/80 text-sm">
                  {formatNumber(getTotalRecords(category))} total records across all regions
                </p>
              </div>

              {/* Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600 text-sm w-[140px]">Region</th>
                      <th className="text-right px-4 py-3 font-medium text-gray-600 text-sm w-[100px]">Records</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-600 text-sm w-[140px]">Annual Price</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-600 text-sm w-[140px]">One-Time Price</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-600 text-sm w-[80px]">Free?</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 text-sm">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryPackages.map((pkg) => {
                      const isGlobal = pkg.regionCode === 'GLOBAL';
                      const isFree = getPackageValue(pkg, 'isFree') as boolean;

                      return (
                        <tr
                          key={pkg.packageId}
                          className={`border-b border-gray-100 hover:bg-gray-50/50 ${isGlobal ? 'bg-amber-50/50' : ''}`}
                        >
                          <td className="px-4 py-2">
                            <div className={`font-medium text-sm ${isGlobal ? 'text-amber-700' : 'text-gray-900'}`}>
                              {isGlobal ? '🌍 ' : ''}{regionNames[pkg.regionCode]}
                            </div>
                            <div className="text-xs text-gray-400">{pkg.regionCode}</div>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <span className="text-sm font-medium text-gray-700">{formatNumber(pkg.records)}</span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center justify-center">
                              <span className="text-gray-400 mr-1">$</span>
                              <input
                                type="number"
                                value={(getPackageValue(pkg, 'priceAnnual') as number) || ''}
                                onChange={(e) => updatePackage(pkg.packageId, 'priceAnnual', e.target.value ? parseFloat(e.target.value) : null)}
                                placeholder="0"
                                disabled={isFree}
                                className={`w-20 px-2 py-1 text-sm border rounded text-right ${
                                  isFree ? 'bg-gray-100 text-gray-400' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                              />
                              <span className="text-gray-400 ml-1 text-xs">/yr</span>
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center justify-center">
                              <span className="text-gray-400 mr-1">$</span>
                              <input
                                type="number"
                                value={(getPackageValue(pkg, 'priceOneTime') as number) || ''}
                                onChange={(e) => updatePackage(pkg.packageId, 'priceOneTime', e.target.value ? parseFloat(e.target.value) : null)}
                                placeholder="0"
                                disabled={isFree}
                                className={`w-20 px-2 py-1 text-sm border rounded text-right ${
                                  isFree ? 'bg-gray-100 text-gray-400' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => updatePackage(pkg.packageId, 'isFree', !isFree)}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all mx-auto ${
                                isFree
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-400'
                              }`}
                            >
                              {isFree && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={(getPackageValue(pkg, 'priceNotes') as string) || ''}
                              onChange={(e) => updatePackage(pkg.packageId, 'priceNotes', e.target.value || null)}
                              placeholder="Add notes..."
                              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Pricing Strategy Notes */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pricing Strategy Notes</h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Pricing Models</h4>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Annual:</strong> Subscription access for 12 months</li>
                <li><strong>One-Time:</strong> Perpetual access to current snapshot</li>
                <li><strong>Free:</strong> Included in free tier (public data)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Considerations</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Global packages include all regional data</li>
                <li>Regional packages are subsets - price accordingly</li>
                <li>Consider data density when pricing (records per region)</li>
              </ul>
            </div>
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
          <button
            onClick={saveAll}
            disabled={saving || !hasChanges}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              hasChanges
                ? 'bg-[#C9A961] text-white hover:bg-[#1B4332]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
