'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Data type definitions with their records by region
interface DataTypeInfo {
  id: string;
  name: string;
  fullName: string;
  category: string;
  color: string;
  bgColor: string;
  records: Record<string, number>;
}

const regionOrder = ['GLOBAL', 'AFR', 'ANT', 'ARA', 'ASI', 'CAS', 'EUR', 'NAM', 'OCE', 'SAM', 'UNC'];

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
  UNC: 'Unclassified',
};

// All data types with their regional record counts from CSV
const dataTypes: DataTypeInfo[] = [
  // Thermochronology
  {
    id: 'FT',
    name: 'FT',
    fullName: 'Fission Track',
    category: 'Thermochronology',
    color: 'text-blue-700',
    bgColor: 'bg-blue-500',
    records: { GLOBAL: 67870, AFR: 5521, ANT: 758, ARA: 1670, ASI: 12405, CAS: 2228, EUR: 11937, NAM: 11752, OCE: 11394, SAM: 9837, UNC: 368 },
  },
  {
    id: 'HE',
    name: 'HE',
    fullName: 'Helium (U-Th/He)',
    category: 'Thermochronology',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-500',
    records: { GLOBAL: 15208, AFR: 1278, ANT: 122, ARA: 270, ASI: 4645, CAS: 550, EUR: 639, NAM: 3599, OCE: 554, SAM: 3356, UNC: 195 },
  },
  {
    id: 'VR',
    name: 'VR',
    fullName: 'Vitrinite Reflectance',
    category: 'Thermochronology',
    color: 'text-teal-700',
    bgColor: 'bg-teal-500',
    records: { GLOBAL: 22192, AFR: 1, ANT: 0, ARA: 0, ASI: 0, CAS: 0, EUR: 502, NAM: 21245, OCE: 444, SAM: 0, UNC: 0 },
  },
  // Geochronology
  {
    id: 'U-Pb',
    name: 'U-Pb',
    fullName: 'Uranium-Lead',
    category: 'Geochronology',
    color: 'text-purple-700',
    bgColor: 'bg-purple-500',
    records: { GLOBAL: 20067, AFR: 297, ANT: 27, ARA: 8, ASI: 852, CAS: 34, EUR: 100, NAM: 11068, OCE: 7384, SAM: 241, UNC: 55 },
  },
  {
    id: 'Ar-Ar',
    name: 'Ar-Ar',
    fullName: 'Argon-Argon',
    category: 'Geochronology',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-500',
    records: { GLOBAL: 874, AFR: 23, ANT: 435, ARA: 0, ASI: 10, CAS: 2, EUR: 286, NAM: 0, OCE: 0, SAM: 0, UNC: 118 },
  },
  {
    id: 'TH',
    name: 'TH',
    fullName: 'Thorium',
    category: 'Geochronology',
    color: 'text-violet-700',
    bgColor: 'bg-violet-500',
    records: { GLOBAL: 6581, AFR: 64, ANT: 2, ARA: 12, ASI: 32, CAS: 18, EUR: 26, NAM: 130, OCE: 248, SAM: 734, UNC: 5315 },
  },
  // Geochemistry
  {
    id: 'GC',
    name: 'GC',
    fullName: 'Geochemistry',
    category: 'Geochemistry',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-500',
    records: { GLOBAL: 292612, AFR: 1354, ANT: 1019, ARA: 68960, ASI: 773, CAS: 1731, EUR: 205, NAM: 73131, OCE: 141614, SAM: 319, UNC: 3506 },
  },
  {
    id: 'ISO',
    name: 'ISO',
    fullName: 'Isotope',
    category: 'Geochemistry',
    color: 'text-green-700',
    bgColor: 'bg-green-500',
    records: { GLOBAL: 32656, AFR: 10, ANT: 0, ARA: 0, ASI: 0, CAS: 0, EUR: 0, NAM: 32546, OCE: 0, SAM: 0, UNC: 100 },
  },
];

// Package in cart
interface SelectedPackage {
  dataTypeId: string;
  regionCode: string;
  isGlobal: boolean;
}

// Pricing state per data type per region
interface PricingState {
  [key: string]: {
    priceAnnual: number | null;
    isFree: boolean;
    notes: string;
  };
}

export default function LithoDataPricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [pricing, setPricing] = useState<PricingState>({});
  const [selectedPackages, setSelectedPackages] = useState<SelectedPackage[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [autoCalculate, setAutoCalculate] = useState(true);

  // Initialize pricing state
  useEffect(() => {
    const initialPricing: PricingState = {};
    dataTypes.forEach(dt => {
      regionOrder.forEach(region => {
        const key = `${dt.id}-${region}`;
        initialPricing[key] = {
          priceAnnual: null,
          isFree: false,
          notes: '',
        };
      });
    });
    setPricing(initialPricing);
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
        setLoading(false);
      } catch {
        router.push('/login');
      }
    };
    checkAccess();
  }, [router]);

  const formatNumber = (num: number) => num.toLocaleString();
  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return '-';
    return `$${price.toLocaleString()}`;
  };

  const getPricingKey = (dataTypeId: string, regionCode: string) => `${dataTypeId}-${regionCode}`;

  const updatePricing = (dataTypeId: string, regionCode: string, field: string, value: number | boolean | string | null) => {
    const key = getPricingKey(dataTypeId, regionCode);
    setPricing(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  // Calculate regional price based on global
  const calculateRegionalPrice = (dataType: DataTypeInfo, globalPrice: number, regionCode: string): number => {
    const globalRecords = dataType.records.GLOBAL;
    const regionalRecords = dataType.records[regionCode] || 0;
    if (globalRecords === 0 || regionalRecords === 0) return 0;
    // Regional = Global × (Region Records / Total) × 1.2 (20% premium)
    return Math.round(globalPrice * (regionalRecords / globalRecords) * 1.2);
  };

  // Handle global price change with auto-calculation
  const handleGlobalPriceChange = (dataType: DataTypeInfo, value: string) => {
    const numValue = value ? parseFloat(value) : null;
    updatePricing(dataType.id, 'GLOBAL', 'priceAnnual', numValue);

    if (autoCalculate && numValue && numValue > 0) {
      regionOrder.forEach(region => {
        if (region !== 'GLOBAL') {
          const calculatedPrice = calculateRegionalPrice(dataType, numValue, region);
          updatePricing(dataType.id, region, 'priceAnnual', calculatedPrice);
        }
      });
    }
  };

  // Package builder functions
  const addToPackage = (dataTypeId: string, regionCode: string) => {
    const isGlobal = regionCode === 'GLOBAL';
    // If adding global, remove all regional selections for this data type
    if (isGlobal) {
      setSelectedPackages(prev => [
        ...prev.filter(p => p.dataTypeId !== dataTypeId),
        { dataTypeId, regionCode, isGlobal: true },
      ]);
    } else {
      // If adding regional, remove global selection for this data type
      setSelectedPackages(prev => {
        const filtered = prev.filter(p => !(p.dataTypeId === dataTypeId && p.isGlobal));
        // Check if already selected
        const exists = filtered.some(p => p.dataTypeId === dataTypeId && p.regionCode === regionCode);
        if (exists) return filtered;
        return [...filtered, { dataTypeId, regionCode, isGlobal: false }];
      });
    }
  };

  const removeFromPackage = (dataTypeId: string, regionCode: string) => {
    setSelectedPackages(prev => prev.filter(p => !(p.dataTypeId === dataTypeId && p.regionCode === regionCode)));
  };

  const isSelected = (dataTypeId: string, regionCode: string) => {
    return selectedPackages.some(p => p.dataTypeId === dataTypeId && p.regionCode === regionCode);
  };

  const isGlobalSelected = (dataTypeId: string) => {
    return selectedPackages.some(p => p.dataTypeId === dataTypeId && p.isGlobal);
  };

  // Calculate total package price
  const calculatePackageTotal = () => {
    let total = 0;
    let totalRecords = 0;
    selectedPackages.forEach(pkg => {
      const key = getPricingKey(pkg.dataTypeId, pkg.regionCode);
      const price = pricing[key]?.priceAnnual || 0;
      const dataType = dataTypes.find(dt => dt.id === pkg.dataTypeId);
      const records = dataType?.records[pkg.regionCode] || 0;
      total += price;
      totalRecords += records;
    });
    return { total, totalRecords };
  };

  const clearPackage = () => {
    setSelectedPackages([]);
    setCustomerName('');
  };

  // Group data types by category
  const dataTypesByCategory = dataTypes.reduce((acc, dt) => {
    if (!acc[dt.category]) acc[dt.category] = [];
    acc[dt.category].push(dt);
    return acc;
  }, {} as Record<string, DataTypeInfo[]>);

  const categoryColors: Record<string, { header: string; light: string }> = {
    Thermochronology: { header: 'bg-blue-600', light: 'bg-blue-50' },
    Geochronology: { header: 'bg-purple-600', light: 'bg-purple-50' },
    Geochemistry: { header: 'bg-emerald-600', light: 'bg-emerald-50' },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#C9A961]"></div>
      </div>
    );
  }

  const { total: packageTotal, totalRecords: packageRecords } = calculatePackageTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#F5E6D3]/20 to-[#C9A961]/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#1B4332] to-[#C9A961] text-white shadow-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center gap-2 text-sm text-[#F5E6D3] mb-2">
            <Link href="/management" className="hover:text-white">Management</Link>
            <span>/</span>
            <Link href="/management/action/unified-utopia" className="hover:text-white">Unified Utopia</Link>
            <span>/</span>
            <span>LithoData Pricing</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">LithoData: Data Type Pricing</h1>
              <p className="text-[#F5E6D3] mt-1">Set prices per data type and region, build custom packages</p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoCalculate}
                  onChange={(e) => setAutoCalculate(e.target.checked)}
                  className="rounded border-white/30"
                />
                Auto-calc regional (20% premium)
              </label>
              {lastSaved && (
                <div className="text-sm text-green-200">
                  Saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
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
        <div className="grid grid-cols-8 gap-3 mb-6">
          {dataTypes.map(dt => (
            <div key={dt.id} className={`${dt.bgColor} rounded-lg p-3 text-white shadow-md`}>
              <div className="text-xs font-medium opacity-80">{dt.category}</div>
              <div className="text-lg font-bold">{dt.name}</div>
              <div className="text-sm opacity-90">{formatNumber(dt.records.GLOBAL)}</div>
              <div className="text-xs opacity-70">{dt.fullName}</div>
            </div>
          ))}
        </div>

        {/* Pricing Tables by Category */}
        {Object.entries(dataTypesByCategory).map(([category, types]) => (
          <div key={category} className="mb-8">
            <div className={`${categoryColors[category]?.header || 'bg-gray-600'} rounded-t-xl px-6 py-3`}>
              <h2 className="text-xl font-bold text-white">{category}</h2>
              <p className="text-white/70 text-sm">
                {types.length} data type{types.length > 1 ? 's' : ''} • {formatNumber(types.reduce((sum, dt) => sum + dt.records.GLOBAL, 0))} total records
              </p>
            </div>

            {/* One table per data type */}
            {types.map(dataType => (
              <div key={dataType.id} className="bg-white border-x border-b border-gray-200 last:rounded-b-xl overflow-hidden">
                <div className={`${categoryColors[category]?.light || 'bg-gray-50'} px-6 py-3 border-b border-gray-200 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className={`${dataType.bgColor} text-white px-3 py-1 rounded-lg font-bold text-sm`}>
                      {dataType.name}
                    </span>
                    <span className="font-medium text-gray-700">{dataType.fullName}</span>
                    <span className="text-gray-500 text-sm">• {formatNumber(dataType.records.GLOBAL)} records</span>
                  </div>
                  <button
                    onClick={() => addToPackage(dataType.id, 'GLOBAL')}
                    disabled={isGlobalSelected(dataType.id)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      isGlobalSelected(dataType.id)
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-[#1B4332] text-white hover:bg-[#C9A961]'
                    }`}
                  >
                    {isGlobalSelected(dataType.id) ? '✓ Global Added' : '+ Add Global'}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left px-4 py-2 font-medium text-gray-600 text-sm w-[140px]">Region</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600 text-sm w-[100px]">Records</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600 text-sm w-[80px]">%</th>
                        <th className="text-center px-4 py-2 font-medium text-gray-600 text-sm w-[140px]">Annual Price</th>
                        <th className="text-center px-4 py-2 font-medium text-gray-600 text-sm w-[80px]">Free?</th>
                        <th className="text-center px-4 py-2 font-medium text-gray-600 text-sm w-[100px]">Package</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionOrder.map(regionCode => {
                        const records = dataType.records[regionCode] || 0;
                        const percentage = dataType.records.GLOBAL > 0
                          ? ((records / dataType.records.GLOBAL) * 100).toFixed(1)
                          : '0';
                        const isGlobal = regionCode === 'GLOBAL';
                        const key = getPricingKey(dataType.id, regionCode);
                        const isFree = pricing[key]?.isFree || false;
                        const priceValue = pricing[key]?.priceAnnual;
                        const isInPackage = isSelected(dataType.id, regionCode) || (isGlobalSelected(dataType.id) && !isGlobal);

                        if (records === 0 && !isGlobal) return null;

                        return (
                          <tr
                            key={regionCode}
                            className={`border-b border-gray-100 hover:bg-gray-50/50 ${isGlobal ? 'bg-amber-50/50' : ''} ${isInPackage ? 'bg-green-50' : ''}`}
                          >
                            <td className="px-4 py-2">
                              <div className={`font-medium text-sm ${isGlobal ? 'text-amber-700' : 'text-gray-900'}`}>
                                {isGlobal ? '🌍 ' : ''}{regionNames[regionCode]}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-right">
                              <span className="text-sm font-medium text-gray-700">{formatNumber(records)}</span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              <span className="text-sm text-gray-500">{percentage}%</span>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex items-center justify-center">
                                <span className="text-gray-400 mr-1">$</span>
                                <input
                                  type="number"
                                  value={priceValue || ''}
                                  onChange={(e) => isGlobal
                                    ? handleGlobalPriceChange(dataType, e.target.value)
                                    : updatePricing(dataType.id, regionCode, 'priceAnnual', e.target.value ? parseFloat(e.target.value) : null)
                                  }
                                  placeholder="0"
                                  disabled={isFree || (!isGlobal && autoCalculate)}
                                  className={`w-24 px-2 py-1 text-sm border rounded text-right ${
                                    isFree || (!isGlobal && autoCalculate)
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
                                onClick={() => updatePricing(dataType.id, regionCode, 'isFree', !isFree)}
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
                            <td className="px-4 py-2 text-center">
                              {isGlobalSelected(dataType.id) && !isGlobal ? (
                                <span className="text-xs text-green-600">via Global</span>
                              ) : (
                                <button
                                  onClick={() => isInPackage
                                    ? removeFromPackage(dataType.id, regionCode)
                                    : addToPackage(dataType.id, regionCode)
                                  }
                                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    isInPackage
                                      ? 'bg-green-500 text-white hover:bg-red-500'
                                      : 'bg-gray-200 text-gray-600 hover:bg-[#1B4332] hover:text-white'
                                  }`}
                                >
                                  {isInPackage ? '✓ Remove' : '+ Add'}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Package Builder / Quote Calculator */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky bottom-4">
          <div className="bg-gradient-to-r from-[#1B4332] to-[#C9A961] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Package Builder</h2>
                <p className="text-white/70 text-sm">Build custom data packages for customers</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-white/70">Selected Packages</div>
                  <div className="text-2xl font-bold text-white">{selectedPackages.length}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/70">Total Records</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(packageRecords)}</div>
                </div>
                <div className="text-right border-l border-white/30 pl-4">
                  <div className="text-sm text-white/70">Package Total</div>
                  <div className="text-2xl font-bold text-[#C9A961]">{formatPrice(packageTotal)}/yr</div>
                </div>
              </div>
            </div>
          </div>

          {selectedPackages.length > 0 ? (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer Name (optional)"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-[#1B4332]"
                />
                <button
                  onClick={clearPackage}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Kanban-style package display */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(dataTypesByCategory).map(([category, types]) => {
                  const categoryPackages = selectedPackages.filter(p =>
                    types.some(t => t.id === p.dataTypeId)
                  );
                  if (categoryPackages.length === 0) return null;

                  return (
                    <div key={category} className={`${categoryColors[category]?.light} rounded-lg p-4`}>
                      <h3 className="font-bold text-gray-800 mb-3">{category}</h3>
                      <div className="space-y-2">
                        {categoryPackages.map(pkg => {
                          const dataType = dataTypes.find(dt => dt.id === pkg.dataTypeId)!;
                          const key = getPricingKey(pkg.dataTypeId, pkg.regionCode);
                          const price = pricing[key]?.priceAnnual || 0;
                          const records = dataType.records[pkg.regionCode] || 0;

                          return (
                            <div
                              key={`${pkg.dataTypeId}-${pkg.regionCode}`}
                              className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <span className={`${dataType.bgColor} text-white px-2 py-0.5 rounded text-xs font-bold`}>
                                  {dataType.name}
                                </span>
                                <div>
                                  <div className="text-sm font-medium text-gray-800">
                                    {pkg.isGlobal ? '🌍 Global' : regionNames[pkg.regionCode]}
                                  </div>
                                  <div className="text-xs text-gray-500">{formatNumber(records)} records</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#1B4332]">{formatPrice(price)}</span>
                                <button
                                  onClick={() => removeFromPackage(pkg.dataTypeId, pkg.regionCode)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quote Summary */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">Quote Summary {customerName && `for ${customerName}`}</h4>
                    <p className="text-sm text-gray-500">
                      {selectedPackages.length} package{selectedPackages.length !== 1 ? 's' : ''} • {formatNumber(packageRecords)} total records
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Annual Subscription</div>
                    <div className="text-3xl font-bold text-[#1B4332]">{formatPrice(packageTotal)}<span className="text-lg text-gray-500">/yr</span></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-2">📦</div>
              <p>Click &quot;+ Add&quot; on any region row to build a custom package</p>
              <p className="text-sm mt-1">Or click &quot;+ Add Global&quot; to include all regions for a data type</p>
            </div>
          )}
        </div>

        {/* Pricing Notes */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pricing Strategy</h3>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Global vs Regional</h4>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Global:</strong> Set base price, includes all regions</li>
                <li><strong>Regional:</strong> Auto-calculated at 20% premium over proportional</li>
                <li><strong>Savings:</strong> Global is ~20% cheaper than sum of regionals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Regional Price Formula</h4>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Regional =</strong> Global × (Region % of Total) × 1.2</li>
                <li className="text-xs text-gray-400 mt-2">Example: $100k Global, Asia 10% → $12k</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Package Builder</h4>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Mix & Match:</strong> Combine any data types + regions</li>
                <li><strong>Global Override:</strong> Selecting Global replaces regionals</li>
                <li><strong>Quote:</strong> Total calculated automatically</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/management/action/unified-utopia"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 inline-block"
          >
            Back to Unified Utopia
          </Link>
        </div>
      </div>
    </div>
  );
}
