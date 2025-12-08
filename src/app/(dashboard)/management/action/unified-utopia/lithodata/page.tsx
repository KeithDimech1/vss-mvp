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

// Data type breakdowns by region
// Thermochronology: FT, HE, VITRINITE, Ar-Ar, TH
// Geochronology: U-Pb
// Geochemistry: GC, ISO

interface DataTypeBreakdown {
  [dataType: string]: number;
}

interface RegionalBreakdown {
  [regionCode: string]: DataTypeBreakdown;
}

// Thermochronology data types by region
const thermoBreakdowns: RegionalBreakdown = {
  GLOBAL: { FT: 67870, HE: 15208, VITRINITE: 22192, 'Ar-Ar': 874, TH: 6581 },
  AFR: { FT: 5521, HE: 1278, VITRINITE: 1, 'Ar-Ar': 23, TH: 64 },
  ANT: { FT: 758, HE: 122, VITRINITE: 0, 'Ar-Ar': 435, TH: 2 },
  ARA: { FT: 1670, HE: 270, VITRINITE: 0, 'Ar-Ar': 0, TH: 12 },
  ASI: { FT: 12405, HE: 4645, VITRINITE: 0, 'Ar-Ar': 10, TH: 32 },
  CAS: { FT: 2228, HE: 550, VITRINITE: 0, 'Ar-Ar': 2, TH: 18 },
  EUR: { FT: 11937, HE: 639, VITRINITE: 502, 'Ar-Ar': 286, TH: 26 },
  NAM: { FT: 11752, HE: 3599, VITRINITE: 21245, 'Ar-Ar': 0, TH: 130 },
  OCE: { FT: 11394, HE: 554, VITRINITE: 444, 'Ar-Ar': 0, TH: 248 },
  SAM: { FT: 9837, HE: 3356, VITRINITE: 0, 'Ar-Ar': 0, TH: 734 },
};

// Geochronology data types by region (only U-Pb)
const geochronBreakdowns: RegionalBreakdown = {
  GLOBAL: { 'U-Pb': 20067 },
  AFR: { 'U-Pb': 297 },
  ANT: { 'U-Pb': 27 },
  ARA: { 'U-Pb': 8 },
  ASI: { 'U-Pb': 852 },
  CAS: { 'U-Pb': 34 },
  EUR: { 'U-Pb': 100 },
  NAM: { 'U-Pb': 11068 },
  OCE: { 'U-Pb': 7384 },
  SAM: { 'U-Pb': 241 },
};

// Geochemistry data types by region
const geochemBreakdowns: RegionalBreakdown = {
  GLOBAL: { GC: 292612, ISO: 32656 },
  AFR: { GC: 1200, ISO: 164 },
  ANT: { GC: 900, ISO: 119 },
  ARA: { GC: 60000, ISO: 8960 },
  ASI: { GC: 650, ISO: 123 },
  CAS: { GC: 1500, ISO: 231 },
  EUR: { GC: 180, ISO: 25 },
  NAM: { GC: 92000, ISO: 13677 },
  OCE: { GC: 132000, ISO: 9614 },
  SAM: { GC: 280, ISO: 39 },
};

const categoryBreakdowns: Record<string, RegionalBreakdown> = {
  Thermochronology: thermoBreakdowns,
  Geochronology: geochronBreakdowns,
  Geochemistry: geochemBreakdowns,
};

const dataTypeColors: Record<string, string> = {
  FT: 'bg-blue-100 text-blue-700',
  HE: 'bg-cyan-100 text-cyan-700',
  VITRINITE: 'bg-teal-100 text-teal-700',
  'Ar-Ar': 'bg-indigo-100 text-indigo-700',
  TH: 'bg-violet-100 text-violet-700',
  'U-Pb': 'bg-purple-100 text-purple-700',
  GC: 'bg-emerald-100 text-emerald-700',
  ISO: 'bg-green-100 text-green-700',
};

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
  const [showBreakdown, setShowBreakdown] = useState<Record<string, boolean>>({
    Thermochronology: false,
    Geochronology: false,
    Geochemistry: false,
  });
  const [autoCalculate, setAutoCalculate] = useState<Record<string, boolean>>({
    Thermochronology: true,
    Geochronology: true,
    Geochemistry: true,
  });

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

  const toggleBreakdown = (category: string) => {
    setShowBreakdown(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Calculate regional prices based on Global price
  // Formula: Regional = Global × (Regional Records / Total Records) × 1.2
  const calculateRegionalPrices = (category: string, globalPrice: number, priceField: 'priceAnnual' | 'priceOneTime') => {
    const categoryPkgs = packagesByCategory[category] || [];
    const globalPkg = categoryPkgs.find(p => p.regionCode === 'GLOBAL');
    if (!globalPkg) return;

    const totalRecords = globalPkg.records;
    const regionalPremium = 1.2; // 20% more expensive than proportional

    categoryPkgs.forEach(pkg => {
      if (pkg.regionCode !== 'GLOBAL') {
        const proportion = pkg.records / totalRecords;
        const calculatedPrice = Math.round(globalPrice * proportion * regionalPremium);
        updatePackage(pkg.packageId, priceField, calculatedPrice);
      }
    });
  };

  // Handle Global price change with auto-calculation
  const handleGlobalPriceChange = (packageId: string, category: string, priceField: 'priceAnnual' | 'priceOneTime', value: string) => {
    const numValue = value ? parseFloat(value) : null;
    updatePackage(packageId, priceField, numValue);

    // Auto-calculate regional prices if enabled and we have a value
    if (autoCalculate[category] && numValue && numValue > 0) {
      // Use setTimeout to ensure the state update happens first
      setTimeout(() => {
        calculateRegionalPrices(category, numValue, priceField);
      }, 0);
    }
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

  // Get data types for a category
  const getDataTypes = (category: string): string[] => {
    const breakdown = categoryBreakdowns[category];
    if (!breakdown || !breakdown.GLOBAL) return [];
    return Object.keys(breakdown.GLOBAL);
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
            const dataTypes = getDataTypes(category);
            const breakdown = categoryBreakdowns[category]?.GLOBAL || {};

            return (
              <div key={category} className={`${colors.bg} ${colors.border} border rounded-xl p-4`}>
                <div className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>{category}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{formatNumber(totalRecords)} records</div>
                <div className="text-sm text-gray-500 mt-1">
                  Global: {annualPrice ? formatPrice(annualPrice as number) + '/yr' : 'Price not set'}
                </div>
                {dataTypes.length > 1 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dataTypes.map(dt => (
                      <span key={dt} className={`text-xs px-1.5 py-0.5 rounded ${dataTypeColors[dt] || 'bg-gray-100 text-gray-600'}`}>
                        {dt}: {formatNumber(breakdown[dt] || 0)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pricing Tables */}
        {['Thermochronology', 'Geochronology', 'Geochemistry'].map(category => {
          const colors = categoryColors[category];
          const categoryPackages = packagesByCategory[category] || [];
          const isBreakdownVisible = showBreakdown[category];
          const dataTypes = getDataTypes(category);
          const hasMultipleTypes = dataTypes.length > 1;

          return (
            <div key={category} className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
              {/* Category Header */}
              <div className={`${colors.headerBg} px-6 py-4 flex items-center justify-between`}>
                <div>
                  <h2 className="text-xl font-bold text-white">{category}</h2>
                  <p className="text-white/80 text-sm">
                    {formatNumber(getTotalRecords(category))} total records across all regions
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoCalculate[category]}
                      onChange={(e) => setAutoCalculate(prev => ({ ...prev, [category]: e.target.checked }))}
                      className="rounded border-white/30"
                    />
                    Auto-calc regions
                  </label>
                  {hasMultipleTypes && (
                    <button
                      onClick={() => toggleBreakdown(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                        isBreakdownVisible
                          ? 'bg-white text-gray-800'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <svg className={`w-4 h-4 transition-transform ${isBreakdownVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {isBreakdownVisible ? 'Show Totals' : 'Show Breakdown'}
                    </button>
                  )}
                </div>
              </div>

              {/* Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600 text-sm w-[140px]">Region</th>
                      {isBreakdownVisible && hasMultipleTypes ? (
                        dataTypes.map(dt => (
                          <th key={dt} className="text-right px-3 py-3 font-medium text-gray-600 text-sm w-[80px]">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${dataTypeColors[dt] || 'bg-gray-100'}`}>
                              {dt}
                            </span>
                          </th>
                        ))
                      ) : (
                        <th className="text-right px-4 py-3 font-medium text-gray-600 text-sm w-[100px]">Records</th>
                      )}
                      <th className="text-center px-4 py-3 font-medium text-gray-600 text-sm w-[140px]">Annual Price</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-600 text-sm w-[80px]">Free?</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 text-sm">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryPackages.map((pkg) => {
                      const isGlobal = pkg.regionCode === 'GLOBAL';
                      const isFree = getPackageValue(pkg, 'isFree') as boolean;
                      const breakdown = categoryBreakdowns[category]?.[pkg.regionCode] || {};

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
                          {isBreakdownVisible && hasMultipleTypes ? (
                            dataTypes.map(dt => (
                              <td key={dt} className="px-3 py-2 text-right">
                                <span className="text-sm font-medium text-gray-700">
                                  {breakdown[dt] !== undefined ? formatNumber(breakdown[dt]) : '-'}
                                </span>
                              </td>
                            ))
                          ) : (
                            <td className="px-4 py-2 text-right">
                              <span className="text-sm font-medium text-gray-700">{formatNumber(pkg.records)}</span>
                            </td>
                          )}
                          <td className="px-4 py-2">
                            <div className="flex items-center justify-center">
                              <span className="text-gray-400 mr-1">$</span>
                              <input
                                type="number"
                                value={(getPackageValue(pkg, 'priceAnnual') as number) || ''}
                                onChange={(e) => isGlobal
                                  ? handleGlobalPriceChange(pkg.packageId, category, 'priceAnnual', e.target.value)
                                  : updatePackage(pkg.packageId, 'priceAnnual', e.target.value ? parseFloat(e.target.value) : null)
                                }
                                placeholder="0"
                                disabled={isFree || (!isGlobal && autoCalculate[category])}
                                className={`w-20 px-2 py-1 text-sm border rounded text-right ${
                                  isFree || (!isGlobal && autoCalculate[category])
                                    ? 'bg-gray-100 text-gray-400'
                                    : isGlobal
                                      ? 'focus:ring-2 focus:ring-amber-500 focus:border-amber-500 border-amber-300'
                                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                              />
                              <span className="text-gray-400 ml-1 text-xs">/yr</span>
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
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Pricing Models</h4>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Annual:</strong> Subscription access for 12 months</li>
                <li><strong>Free:</strong> Included in free tier (public data)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Auto-Calculate Formula</h4>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Regional Price =</strong></li>
                <li className="pl-4">Global × (Region Records / Total) × 1.2</li>
                <li className="text-xs text-gray-400 mt-2">Regional packages have a 20% premium over the proportional Global rate</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Data Type Breakdown</h4>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Thermochronology:</strong> FT, HE, Vitrinite, Ar-Ar, TH</li>
                <li><strong>Geochronology:</strong> U-Pb</li>
                <li><strong>Geochemistry:</strong> GC, ISO</li>
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
