'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  initializeSearch,
  searchDocs,
  getAllArticles,
  getCategories,
  getCounts,
  getLastUpdated,
  type DocArticle,
  type SearchResult,
} from '@/lib/docs-search';

type SourceFilter = 'all' | 'dext' | 'xero';
type MainTab = 'search' | 'guide';

// Type definitions for tooltips
interface TooltipInfo {
  label: string;
  description: string;
}

const TYPE_OPTIONS: TooltipInfo[] = [
  { label: 'Receipt', description: 'A proof of payment for goods/services already purchased and paid for' },
  { label: 'Invoice', description: 'A bill requesting payment for goods/services (may not be paid yet)' },
  { label: 'Credit Note', description: 'A document reducing the amount owed, issued by a supplier' },
  { label: 'Statement', description: 'A summary of transactions over a period, not for individual coding' },
];

const CATEGORY_GUIDE = [
  { code: '493', name: 'Travel - National', gst: 'GST on Expenses', description: 'Domestic flights, hotels, taxis, Uber within Australia', deductible: true },
  { code: '494', name: 'Travel - International', gst: 'GST Free', description: 'Overseas flights, accommodation, transport abroad', deductible: true },
  { code: '414', name: 'Conferences & Trade Fairs', gst: 'GST on Expenses', description: 'Conference registration, booth fees, trade show expenses', deductible: true },
  { code: '420', name: 'Entertainment', gst: 'GST Free', description: 'Client meals, staff social events (NOT tax deductible for FBT)', deductible: false },
  { code: '453', name: 'Office Expenses', gst: 'GST on Expenses', description: 'Stationery, small equipment under $300, office supplies', deductible: true },
  { code: '485', name: 'Subscriptions', gst: 'GST on Expenses', description: 'Software subscriptions, online services, professional memberships', deductible: true },
  { code: '489', name: 'Telephone & Internet', gst: 'GST on Expenses', description: 'Phone bills, internet, mobile data', deductible: true },
  { code: '412', name: 'Accounting', gst: 'GST on Expenses', description: 'Accountant fees, bookkeeping services, tax preparation', deductible: true },
  { code: '413', name: 'Consulting', gst: 'GST on Expenses', description: 'External consultants, contractors, professional advice', deductible: true },
  { code: '430', name: 'Gifts', gst: 'GST on Expenses', description: 'Client gifts, staff gifts, promotional items', deductible: true },
  { code: '449', name: 'Motor Vehicle Expenses', gst: 'GST on Expenses', description: 'Fuel, car wash, parking, tolls', deductible: true },
  { code: '400', name: 'Advertising', gst: 'GST on Expenses', description: 'Online ads, marketing campaigns, promotional materials', deductible: true },
  { code: '429', name: 'General Expenses', gst: 'GST on Expenses', description: 'Miscellaneous expenses that don\'t fit other categories', deductible: true },
  { code: '442', name: 'Non-deductible Expense', gst: 'GST on Expenses', description: 'Personal expenses, fines, penalties - NOT tax deductible', deductible: false },
];

const PAYMENT_METHODS = [
  { name: 'American Express (Fabian)', reference: '', account: 'American Express Platinum Business', usage: 'Fabian\'s business card for travel and major expenses' },
  { name: 'CBA Debit Card (Fabian)', reference: '', account: 'CBA Business Account', usage: 'Fabian\'s debit card linked to main business account' },
  { name: 'American Express (Wayne)', reference: '1018', account: 'American Express Qantas Business', usage: 'Wayne\'s business card - last 4 digits 1018' },
  { name: 'CBA Debit Card (Wayne)', reference: '1754', account: 'CBA Business Account', usage: 'Wayne\'s debit card - last 4 digits 1754' },
  { name: 'CBA Bank Payment', reference: '', account: 'CBA Business Account', usage: 'Direct bank transfers and payments' },
  { name: 'American Express (Keith)', reference: '1042', account: 'American Express Platinum Business', usage: 'Keith\'s business card - last 4 digits 1042' },
];

export default function BookkeepingHelpPage() {
  const [mainTab, setMainTab] = useState<MainTab>('guide');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allArticles, setAllArticles] = useState<DocArticle[]>([]);
  const [counts, setCounts] = useState({ total: 0, dext: 0, xero: 0 });
  const [categories, setCategories] = useState<{ dext: string[]; xero: string[] }>({ dext: [], xero: [] });
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('cost-inbox');

  // Initialize search on mount
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const index = await initializeSearch();
      if (index) {
        setIsInitialized(true);
        setCounts(getCounts());
        setCategories({
          dext: getCategories('dext'),
          xero: getCategories('xero'),
        });
        setLastUpdated(getLastUpdated());
        setAllArticles(getAllArticles());
      }
      setIsLoading(false);
    }
    init();
  }, []);

  // Perform search when query or filters change
  const performSearch = useCallback(() => {
    if (!isInitialized) return;

    if (searchQuery.trim().length >= 2) {
      const searchResults = searchDocs(searchQuery, {
        source: sourceFilter,
        category: categoryFilter || undefined,
        limit: 50,
      });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery, sourceFilter, categoryFilter, isInitialized]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Get articles to display (search results or all articles)
  const displayArticles = searchQuery.trim().length >= 2
    ? results.map(r => r.item)
    : allArticles.filter(a => {
        if (sourceFilter !== 'all' && a.source !== sourceFilter) return false;
        if (categoryFilter && a.category !== categoryFilter) return false;
        return true;
      });

  // Get current categories based on source filter
  const currentCategories = sourceFilter === 'dext'
    ? categories.dext
    : sourceFilter === 'xero'
      ? categories.xero
      : [...categories.dext, ...categories.xero];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Bookkeeping Help Centre</h1>
          <p className="text-blue-100">
            Lithodat&apos;s guide to Dext and Xero
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-1 border-b border-gray-200 bg-white rounded-t-lg mt-4">
          <button
            onClick={() => setMainTab('guide')}
            className={`px-6 py-3 font-medium transition-colors ${
              mainTab === 'guide'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            Lithodat Guide
          </button>
          <button
            onClick={() => setMainTab('search')}
            className={`px-6 py-3 font-medium transition-colors ${
              mainTab === 'search'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            Search Dext/Xero Docs ({counts.total})
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {mainTab === 'guide' ? (
          /* Lithodat Guide Content */
          <div className="space-y-4">
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Cost Processing Guide for Lithodat</h2>
              <p className="text-gray-600 mb-4">
                This guide explains how to process costs in Dext and push them to Xero correctly.
                Every item in the Cost Inbox must be reviewed and coded before month-end.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">Key Rule: No items should remain in &quot;To Review&quot; status at month-end</p>
              </div>
            </div>

            {/* Section 1: Cost Inbox */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('cost-inbox')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                  <span className="font-semibold text-gray-900">Cost Inbox Overview</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'cost-inbox' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'cost-inbox' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    The Cost Inbox shows all receipts and invoices that have been submitted to Dext.
                    Your goal is to ensure every item has been reviewed - no orange &quot;To Review&quot; badges should remain.
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <Image
                      src="/images/dext-guide/cost-inbox.png"
                      alt="Dext Cost Inbox"
                      width={800}
                      height={400}
                      className="rounded border border-gray-300"
                    />
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800">
                      <strong>Action Required:</strong> Click on any item with &quot;To Review&quot; badge to open the item details page and complete the coding.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Supplier */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('supplier')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                  <span className="font-semibold text-gray-900">Supplier</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'supplier' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'supplier' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    Always select an existing supplier from the list. <strong>Do not create duplicates</strong> - for example, don&apos;t create &quot;CBA&quot; if &quot;Commonwealth Bank&quot; already exists.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-800 font-medium">Common Mistakes to Avoid:</p>
                    <ul className="list-disc list-inside text-red-700 mt-2 space-y-1">
                      <li>Creating &quot;Qantas Airways&quot; when &quot;Qantas&quot; exists</li>
                      <li>Creating &quot;CBA&quot; when &quot;Commonwealth Bank&quot; exists</li>
                      <li>Creating supplier with typos or abbreviations</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">Adding a New Supplier:</p>
                    <p className="text-green-700 mt-2">
                      If a supplier genuinely doesn&apos;t exist, add them through Xero (not Dext):
                    </p>
                    <ol className="list-decimal list-inside text-green-700 mt-2 space-y-1">
                      <li>Go to <a href="https://go.xero.com/Contacts/Search" target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:text-green-800">Xero Contacts</a></li>
                      <li>Click &quot;Add Contact&quot;</li>
                      <li>Enter the full business name (check ABN lookup if unsure)</li>
                      <li>Reload Dext to sync the new supplier</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Type */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('type')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                  <span className="font-semibold text-gray-900">Type (Receipt vs Invoice)</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'type' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'type' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    Most items will be <strong>Receipts</strong> (already paid). Select Invoice only if we haven&apos;t paid yet.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TYPE_OPTIONS.map((type) => (
                      <div key={type.label} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="font-semibold text-gray-900">{type.label}</p>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Category */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('category')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                  <span className="font-semibold text-gray-900">Category (Chart of Accounts)</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'category' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'category' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    Choose the correct expense category. This affects tax reporting and BAS.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-3 py-2 text-left font-semibold">Code</th>
                          <th className="px-3 py-2 text-left font-semibold">Category</th>
                          <th className="px-3 py-2 text-left font-semibold">GST</th>
                          <th className="px-3 py-2 text-left font-semibold">When to Use</th>
                          <th className="px-3 py-2 text-center font-semibold">Tax Deductible</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {CATEGORY_GUIDE.map((cat) => (
                          <tr key={cat.code} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-mono text-gray-600">{cat.code}</td>
                            <td className="px-3 py-2 font-medium text-gray-900">{cat.name}</td>
                            <td className="px-3 py-2 text-gray-600">{cat.gst}</td>
                            <td className="px-3 py-2 text-gray-600">{cat.description}</td>
                            <td className="px-3 py-2 text-center">
                              {cat.deductible ? (
                                <span className="text-green-600">✓</span>
                              ) : (
                                <span className="text-red-600">✗</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800">
                      <strong>Note:</strong> Entertainment (420) is GST Free and generally NOT tax deductible due to FBT rules.
                      Non-deductible Expense (442) should be used for personal expenses or items that cannot be claimed.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 5: Travel Tracking */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('travel')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">5</span>
                  <span className="font-semibold text-gray-900">Travel Tracking Categories</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'travel' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'travel' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    Travel expenses related to conferences or events should be tagged with a tracking category.
                    <strong> Not all expenses need a travel category</strong> - only those related to specific business trips or events.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 font-medium">Travel Code Format:</p>
                    <p className="font-mono text-blue-900 mt-2 text-lg">YYYY-MM-[EVENT NAME]</p>
                    <p className="text-blue-700 mt-2">Examples:</p>
                    <ul className="list-disc list-inside text-blue-700 mt-1 space-y-1">
                      <li><span className="font-mono">2025-03-AEGC2025PERTH</span> - AEGC Conference Perth March 2025</li>
                      <li><span className="font-mono">2025-06-EMC2025GOLDCOAST</span> - EMC Conference Gold Coast June 2025</li>
                      <li><span className="font-mono">2025-09-SEG2025BRISBANE</span> - SEG Conference Brisbane Sept 2025</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-medium">Adding a New Travel Category in Xero:</p>
                    <ol className="list-decimal list-inside text-green-700 mt-2 space-y-1">
                      <li>Go to <a href="https://go.xero.com/Settings/TrackingCategories" target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:text-green-800">Xero Tracking Categories</a></li>
                      <li>Click on the &quot;Travel&quot; category</li>
                      <li>Click &quot;Add another option&quot;</li>
                      <li>Enter the travel code (e.g., &quot;AEGC 2025 Perth&quot;)</li>
                      <li>Save and reload Dext to sync</li>
                    </ol>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700">
                      <strong>Current Active Travel Categories:</strong>
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>• AEGC 2025 Perth</li>
                      <li>• EMC 2025 Amira Global Gold Coast</li>
                      <li>• IAMG 2025 Zhuhai China</li>
                      <li>• Nordic Geological Winter Meeting 2026 Turku</li>
                      <li>• SEG 2025 Brisbane</li>
                      <li>• Tang3o 2025 Canberra</li>
                      <li>• Thermo 2025 Kanazawa Japan</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Section 6: Description */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('description')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">6</span>
                  <span className="font-semibold text-gray-900">Description</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'description' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'description' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    The description is <strong>critical</strong> - it should explain what was purchased and why.
                    Get as much information as possible from the receipt or the email submission.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-medium">Good Description Example:</p>
                    <p className="font-mono text-green-900 mt-2 bg-white p-3 rounded border border-green-300">
                      Roses Chocolates for Christmas presents for Nora and Kimberly.
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-800 font-medium">Bad Description Examples:</p>
                    <ul className="list-disc list-inside text-red-700 mt-2 space-y-1">
                      <li>&quot;Purchase&quot; - too vague</li>
                      <li>&quot;Food&quot; - doesn&apos;t explain purpose</li>
                      <li>Empty description</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 font-medium">Check the Email Tab:</p>
                    <p className="text-blue-700 mt-2">
                      Click on the &quot;Email&quot; tab in Dext to see what information Fabian or Wayne included when they submitted the receipt.
                      This often contains context about the purchase.
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800">
                      <strong>If no description provided:</strong> You can either reject the item back to the submitter or email them asking for clarification.
                      Don&apos;t process items without understanding what they&apos;re for.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 7: Amount - Split into Australian and Overseas */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('amount')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">7</span>
                  <span className="font-semibold text-gray-900">Amount & Currency</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'amount' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'amount' && (
                <div className="p-6 border-t space-y-6">
                  {/* Australian Transactions */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                      <span className="text-xl">🇦🇺</span> Australian Transactions (AUD)
                    </h4>
                    <div className="mt-3 space-y-2 text-green-700">
                      <p>• The amount must match the receipt exactly</p>
                      <p>• GST will be automatically calculated (most business expenses include 10% GST)</p>
                      <p>• Check that the GST rate is correct based on the category</p>
                      <p>• If the receipt shows &quot;GST Included&quot;, use &quot;GST on Expenses&quot;</p>
                    </div>
                  </div>

                  {/* Overseas Transactions */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                      <span className="text-xl">🌏</span> Overseas Transactions (Foreign Currency)
                    </h4>
                    <div className="mt-3 space-y-2 text-purple-700">
                      <p><strong>Important:</strong> Overseas transactions do NOT have GST - use &quot;GST Free Expenses&quot;</p>
                      <div className="bg-white rounded p-3 mt-2 border border-purple-200">
                        <p className="font-medium">Steps for foreign currency receipts:</p>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Select the correct currency (e.g., USD, EUR, JPY)</li>
                          <li>Enter the amount shown on the receipt in that currency</li>
                          <li>Dext will auto-convert to AUD - <strong>but this may not match the bank</strong></li>
                          <li>Find the actual bank transaction for this date</li>
                          <li>Update the AUD amount to match what the bank actually charged</li>
                        </ol>
                      </div>
                    </div>
                    <div className="mt-3 bg-amber-100 border border-amber-300 rounded p-3">
                      <p className="text-amber-800 text-sm">
                        <strong>Why?</strong> Banks use their own exchange rate which differs from Dext&apos;s rate.
                        The bank statement amount is what actually left our account, so that&apos;s what we need to record for accurate reconciliation.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 8: Payment Method */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('payment')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">8</span>
                  <span className="font-semibold text-gray-900">Payment Method (Paid Status)</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'payment' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'payment' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    For receipts, click <strong>&quot;Yes&quot;</strong> to mark as paid, then select the correct payment method.
                    This is essential for bank reconciliation.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-3 py-2 text-left font-semibold">Payment Method</th>
                          <th className="px-3 py-2 text-left font-semibold">Reference</th>
                          <th className="px-3 py-2 text-left font-semibold">Bank Account</th>
                          <th className="px-3 py-2 text-left font-semibold">When to Use</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {PAYMENT_METHODS.map((pm) => (
                          <tr key={pm.name} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium text-gray-900">{pm.name}</td>
                            <td className="px-3 py-2 font-mono text-gray-600">{pm.reference || '-'}</td>
                            <td className="px-3 py-2 text-gray-600">{pm.account}</td>
                            <td className="px-3 py-2 text-gray-600">{pm.usage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                      <strong>Tip:</strong> Check the last 4 digits on the receipt to match with the correct card.
                      If paid by bank transfer, use &quot;CBA Bank Payment&quot;.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 9: Line Items */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('line-items')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">9</span>
                  <span className="font-semibold text-gray-900">Line Items (For Large Expenses)</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'line-items' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'line-items' && (
                <div className="p-6 border-t">
                  <p className="text-gray-600 mb-4">
                    Line item breakdown is <strong>optional for small expenses under $500</strong>, but <strong>required for all costs over $500</strong>.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">Under $500</p>
                      <p className="text-green-700 mt-2">
                        Single line item is fine. Just ensure the description is clear.
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-800 font-medium">Over $500</p>
                      <p className="text-amber-700 mt-2">
                        Break down into individual line items. This helps with:
                      </p>
                      <ul className="list-disc list-inside text-amber-700 mt-1">
                        <li>Accurate categorization</li>
                        <li>Asset tracking</li>
                        <li>Tax reporting</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700">
                      <strong>Example:</strong> A $2,000 conference registration might include:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mt-2">
                      <li>$1,500 - Conference Registration (414 Conferences)</li>
                      <li>$300 - Workshop Fee (414 Conferences)</li>
                      <li>$200 - Conference Dinner (420 Entertainment)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Reference Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Quick Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Before Publishing:</p>
                  <ul className="space-y-1 text-blue-100">
                    <li>☐ Supplier selected (not a duplicate)</li>
                    <li>☐ Type set (Receipt or Invoice)</li>
                    <li>☐ Category matches expense type</li>
                    <li>☐ Travel tracking added (if applicable)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Also Check:</p>
                  <ul className="space-y-1 text-blue-100">
                    <li>☐ Description is clear and complete</li>
                    <li>☐ Amount matches receipt exactly</li>
                    <li>☐ Correct payment method selected</li>
                    <li>☐ Line items for expenses &gt;$500</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Search Docs Content */
          <>
            {!isInitialized ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">Documentation Not Available</h2>
                <p className="text-yellow-700 mb-4">
                  The documentation index hasn&apos;t been built yet. Run the scrapers to download documentation.
                </p>
                <div className="bg-gray-800 text-green-400 rounded p-4 text-left font-mono text-sm">
                  <p># Run these commands to build the docs:</p>
                  <p className="mt-2">npx ts-node scripts/scrape-dext-docs.ts</p>
                  <p>npx ts-node scripts/scrape-xero-docs.ts</p>
                  <p>npx ts-node scripts/build-docs-index.ts</p>
                </div>
              </div>
            ) : (
              <>
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  {/* Search Input */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search documentation... (e.g., 'bank reconciliation', 'invoice coding')"
                      className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-4">
                    {/* Source Filter */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setSourceFilter('all'); setCategoryFilter(''); }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          sourceFilter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All ({counts.total})
                      </button>
                      <button
                        onClick={() => { setSourceFilter('dext'); setCategoryFilter(''); }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          sourceFilter === 'dext'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Dext ({counts.dext})
                      </button>
                      <button
                        onClick={() => { setSourceFilter('xero'); setCategoryFilter(''); }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          sourceFilter === 'xero'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Xero ({counts.xero})
                      </button>
                    </div>

                    {/* Category Filter */}
                    {currentCategories.length > 0 && (
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Categories</option>
                        {currentCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {lastUpdated && (
                    <p className="text-xs text-gray-400 mt-3">
                      Last updated: {new Date(lastUpdated).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Results */}
                <div className="space-y-4">
                  {displayArticles.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <svg
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500">
                        {searchQuery.trim().length >= 2
                          ? 'No articles found matching your search'
                          : 'Start typing to search documentation'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-500 mb-2">
                        {searchQuery.trim().length >= 2
                          ? `Found ${displayArticles.length} results`
                          : `Showing ${displayArticles.length} articles`}
                      </div>
                      {displayArticles.map((article) => (
                        <a
                          key={article.id}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border-l-4 border-transparent hover:border-blue-500"
                        >
                          <div className="flex items-start gap-3">
                            {/* Source Badge */}
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                article.source === 'dext'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {article.source === 'dext' ? 'Dext' : 'Xero'}
                            </span>

                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {article.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="bg-gray-100 px-2 py-0.5 rounded">
                                  {article.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  Opens in new tab
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
