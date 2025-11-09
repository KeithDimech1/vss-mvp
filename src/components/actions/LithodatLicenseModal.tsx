'use client';

import React from 'react';

interface LithodatLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LithodatLicenseModal({ isOpen, onClose }: LithodatLicenseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#1B4332] to-[#0A6FCC] text-white px-8 py-6 rounded-t-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Lithodat License System</h2>
                <p className="text-[#F5E6D3]">How Free/Pro/Enterprise Maps to the License Schema</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-[#F5E6D3] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6 space-y-8">
            {/* Introduction */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-gray-700 leading-relaxed">
                The <strong>current license schema</strong> (from license.md) is a flexible technical system that can support
                the <strong>Free/Pro/Enterprise tiers</strong> without any schema changes. Here's how they work together.
              </p>
            </div>

            {/* What Matches Well */}
            <section>
              <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What Matches Well (No Changes Needed)
              </h3>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">Feature-Based Access Control</h4>
                  <p className="text-gray-700 mb-3">The schema uses <code className="bg-white px-2 py-1 rounded text-sm">Feature</code> and <code className="bg-white px-2 py-1 rounded text-sm">License2Feature</code> tables to grant granular permissions.</p>

                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="border border-green-300 px-3 py-2 text-left">Tier</th>
                        <th className="border border-green-300 px-3 py-2 text-left">Features Granted</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-green-200 px-3 py-2 font-semibold">Free</td>
                        <td className="border border-green-200 px-3 py-2">
                          View Free Data, View Tools (5-10 features)
                        </td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="border border-green-200 px-3 py-2 font-semibold">Pro</td>
                        <td className="border border-green-200 px-3 py-2">
                          All Free + Use Tools, Upload Data, API Access (30-40 features)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-green-200 px-3 py-2 font-semibold">Enterprise</td>
                        <td className="border border-green-200 px-3 py-2">
                          All Pro + Custom Branding, SSO, Custom Features (40+ features)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">Multi-Level Licensing</h4>
                  <p className="text-gray-700 mb-3">The schema supports licenses at three levels, perfect for enterprise scenarios:</p>

                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="border border-green-300 px-3 py-2 text-left">Level</th>
                        <th className="border border-green-300 px-3 py-2 text-left">Use Case</th>
                        <th className="border border-green-300 px-3 py-2 text-left">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-green-200 px-3 py-2 font-semibold">User</td>
                        <td className="border border-green-200 px-3 py-2">Individual subscriptions</td>
                        <td className="border border-green-200 px-3 py-2">Freelance geologist buys Pro</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="border border-green-200 px-3 py-2 font-semibold">Institution</td>
                        <td className="border border-green-200 px-3 py-2">Company-wide licenses</td>
                        <td className="border border-green-200 px-3 py-2">BHP purchases Enterprise for all staff</td>
                      </tr>
                      <tr>
                        <td className="border border-green-200 px-3 py-2 font-semibold">Community</td>
                        <td className="border border-green-200 px-3 py-2">Research groups</td>
                        <td className="border border-green-200 px-3 py-2">Thermochronology Network gets Pro access</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">License Duration & Auditing</h4>
                  <p className="text-gray-700">
                    Built-in support for <code className="bg-white px-2 py-1 rounded text-sm">validFrom</code> / <code className="bg-white px-2 py-1 rounded text-sm">validTo</code> dates
                    and <code className="bg-white px-2 py-1 rounded text-sm">lastEditedTimestamp</code> / <code className="bg-white px-2 py-1 rounded text-sm">lastEditedBy</code> audit trails.
                    Perfect for annual subscriptions and compliance tracking.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">Security & Validation</h4>
                  <p className="text-gray-700 mb-2">
                    The <code className="bg-white px-2 py-1 rounded text-sm">getLicensedFeatures()</code> service already exists to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Aggregate features from User + Institution + Community licenses</li>
                    <li>Remove duplicates automatically</li>
                    <li>Provide both REST API and Java interfaces</li>
                    <li>Enable frontend to show/hide UI elements</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* What Would Be Difficult */}
            <section>
              <h3 className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                What Would Be Difficult (Separate System Needed)
              </h3>

              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">Data Upload Quotas</h4>
                  <p className="text-gray-700 mb-3">
                    The license schema handles <strong>WHAT you can do</strong> (features), but NOT <strong>HOW MUCH you can do</strong> (quotas).
                  </p>

                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-amber-100">
                        <th className="border border-amber-300 px-3 py-2 text-left">Tier</th>
                        <th className="border border-amber-300 px-3 py-2 text-left">Quota Limits</th>
                        <th className="border border-amber-300 px-3 py-2 text-left">Tracking Needed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-amber-200 px-3 py-2 font-semibold">Free</td>
                        <td className="border border-amber-200 px-3 py-2">No uploads allowed</td>
                        <td className="border border-amber-200 px-3 py-2 text-green-600">✓ License handles this</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="border border-amber-200 px-3 py-2 font-semibold">Pro</td>
                        <td className="border border-amber-200 px-3 py-2">10GB, 1000 samples, 50 boreholes</td>
                        <td className="border border-amber-200 px-3 py-2 text-red-600">✗ Needs quota system</td>
                      </tr>
                      <tr>
                        <td className="border border-amber-200 px-3 py-2 font-semibold">Enterprise</td>
                        <td className="border border-amber-200 px-3 py-2">Custom/unlimited</td>
                        <td className="border border-amber-200 px-3 py-2 text-red-600">✗ Needs quota system</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-3 bg-white border-l-4 border-amber-500 p-3 rounded">
                    <p className="font-semibold text-gray-800 mb-1">Solution:</p>
                    <p className="text-gray-700 text-sm">
                      Add a separate quota tracking system (e.g., <code className="bg-gray-100 px-2 py-1 rounded">LicenseQuota</code> table or quota config in License table)
                      that monitors usage and enforces limits independently from feature permissions.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">Reconstruction Model Time Limits</h4>
                  <p className="text-gray-700 mb-2">
                    Pro users get "1 reconstruction model or time-based usage" - this requires:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                    <li>Usage tracking per tool</li>
                    <li>Time-based metering</li>
                    <li>Counter resets (monthly/annually)</li>
                  </ul>
                  <div className="bg-white border-l-4 border-amber-500 p-3 rounded">
                    <p className="font-semibold text-gray-800 mb-1">Solution:</p>
                    <p className="text-gray-700 text-sm">
                      Build a usage metering system separate from license permissions. License grants "Use Reconstruction Models" feature,
                      but separate system tracks and limits usage.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">LithoData Discount Rates</h4>
                  <p className="text-gray-700 mb-3">
                    Pro (10-20% discount) and Enterprise (30-40% discount) pricing requires integration with payment/pricing system.
                  </p>
                  <div className="bg-white border-l-4 border-amber-500 p-3 rounded">
                    <p className="font-semibold text-gray-800 mb-1">Solution:</p>
                    <p className="text-gray-700 text-sm">
                      Store discount rates in License metadata or separate pricing config. Checkout system queries user's license tier
                      and applies appropriate discount.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                  <h4 className="font-bold text-[#1B4332] mb-2">Build Hours & Billable Services</h4>
                  <p className="text-gray-700 mb-3">
                    Enterprise customers get "build hours for custom tools" and "billable hours for cleaning services" - not feature-based permissions.
                  </p>
                  <div className="bg-white border-l-4 border-amber-500 p-3 rounded">
                    <p className="font-semibold text-gray-800 mb-1">Solution:</p>
                    <p className="text-gray-700 text-sm">
                      Separate service hours tracking system. License identifies Enterprise tier, but project management system tracks hours consumed.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Implementation Summary */}
            <section className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-[#C9A961] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-[#1B4332] mb-4">Implementation Summary</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Use Current Schema For:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Feature access (View Tools, Use Tools, API Access)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Multi-level licensing (User/Institution/Community)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>License duration and expiration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Audit trails and compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Creating 3 license bundles (Free, Pro, Enterprise)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-amber-700 mb-2">Build Separate Systems For:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <span>Data upload quotas (GB, samples, boreholes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <span>Tool usage metering (reconstruction models)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <span>Discount pricing integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <span>Build/billable hours tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <span>Payment/subscription management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-xl border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-[#C9A961] text-white font-semibold rounded-lg hover:bg-[#0A6FCC] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
