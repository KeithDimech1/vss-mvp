"use client";

export default function AIInfographic() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white p-8 rounded-xl border border-slate-200 shadow-sm">
      {/* Main Title */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold tracking-wide">
            HOW LITHODAT PROJECTS ENABLE AI APPLICATIONS
          </h2>
        </div>
      </div>

      {/* Source Projects Row */}
      <div className="flex justify-center gap-6 mb-4">
        {/* EarthBank */}
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-5 w-52 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="text-emerald-700 font-bold text-xl mb-3">EarthBank</div>
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-emerald-800 text-lg">350K samples</div>
            <div className="text-emerald-600">SKOS vocab</div>
            <div className="text-emerald-600 font-medium">50K+ terms</div>
          </div>
        </div>

        {/* Isotopes.au */}
        <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-5 w-52 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="text-blue-700 font-bold text-xl mb-3">Isotopes.au</div>
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-blue-800 text-lg">6 agencies</div>
            <div className="text-blue-600">harmonized</div>
            <div className="text-blue-600 font-medium">97% match</div>
          </div>
        </div>

        {/* LithoSpace */}
        <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-5 w-52 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="text-purple-700 font-bold text-xl mb-3">LithoSpace</div>
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-purple-800 text-lg">25+ missions</div>
            <div className="text-purple-600">unified</div>
            <div className="text-purple-600 font-medium">&lt;1% error</div>
          </div>
        </div>
      </div>

      {/* Converging Lines */}
      <div className="flex justify-center mb-4">
        <svg width="500" height="50" viewBox="0 0 500 50" className="overflow-visible">
          {/* Left line */}
          <line x1="100" y1="0" x2="250" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
          {/* Center line */}
          <line x1="250" y1="0" x2="250" y2="45" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
          {/* Right line */}
          <line x1="400" y1="0" x2="250" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Central Node - Clean Data */}
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 text-white px-10 py-5 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="font-bold text-xl">CLEAN, STANDARDIZED DATA READY</div>
          <div className="font-semibold text-lg mt-1">FOR AI/ML APPLICATIONS</div>
        </div>
      </div>

      {/* Diverging Lines */}
      <div className="flex justify-center mb-4">
        <svg width="500" height="50" viewBox="0 0 500 50" className="overflow-visible">
          {/* Left line */}
          <line x1="250" y1="5" x2="100" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          {/* Center line */}
          <line x1="250" y1="5" x2="250" y2="45" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrowhead2)" />
          {/* Right line */}
          <line x1="250" y1="5" x2="400" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <defs>
            <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* AI Applications Row */}
      <div className="flex justify-center gap-6 mb-8">
        {/* Classification */}
        <div className="bg-rose-50 border-2 border-rose-400 rounded-xl p-5 w-52 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="text-rose-700 font-bold text-lg mb-2">Classification</div>
          <div className="text-sm text-rose-600">
            <div>(rock types,</div>
            <div>lithology)</div>
          </div>
        </div>

        {/* Prospectivity Mapping */}
        <div className="bg-teal-50 border-2 border-teal-400 rounded-xl p-5 w-52 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="text-teal-700 font-bold text-lg mb-2">Prospectivity</div>
          <div className="text-sm text-teal-600">
            <div>Mapping</div>
            <div>(ML targeting)</div>
          </div>
        </div>

        {/* Pattern Recognition */}
        <div className="bg-indigo-50 border-2 border-indigo-400 rounded-xl p-5 w-52 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="text-indigo-700 font-bold text-lg mb-2">Pattern</div>
          <div className="text-sm text-indigo-600">
            <div>Recognition</div>
            <div>(anomalies)</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-slate-200 my-8"></div>

      {/* AI-Ready Features Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">AI-Ready Features Demonstrated in Each Project</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">Project</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">AI-Enabling Feature</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">Technical Implementation</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">GDAC-SA Application</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-emerald-700">EarthBank</td>
                <td className="border border-slate-300 px-3 py-2">Standardized vocabularies</td>
                <td className="border border-slate-300 px-3 py-2">50,000+ SKOS terms for minerals, rock types, methods</td>
                <td className="border border-slate-300 px-3 py-2">ML models can classify samples consistently</td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-emerald-700">EarthBank</td>
                <td className="border border-slate-300 px-3 py-2">Complete metadata</td>
                <td className="border border-slate-300 px-3 py-2">Mandatory fields for location, date, method, analyst</td>
                <td className="border border-slate-300 px-3 py-2">Feature vectors with no missing values</td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-emerald-700">EarthBank</td>
                <td className="border border-slate-300 px-3 py-2">Spatial indexing</td>
                <td className="border border-slate-300 px-3 py-2">PostGIS-enabled coordinate storage</td>
                <td className="border border-slate-300 px-3 py-2">Geospatial AI and prospectivity mapping</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-blue-700">Isotopes.au</td>
                <td className="border border-slate-300 px-3 py-2">Multi-source harmonization</td>
                <td className="border border-slate-300 px-3 py-2">97% field mapping accuracy across 6 agencies</td>
                <td className="border border-slate-300 px-3 py-2">Unified training data from heterogeneous sources</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-blue-700">Isotopes.au</td>
                <td className="border border-slate-300 px-3 py-2">Automated validation</td>
                <td className="border border-slate-300 px-3 py-2">Schema validation at ingestion</td>
                <td className="border border-slate-300 px-3 py-2">Data quality scoring for ML confidence</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-blue-700">Isotopes.au</td>
                <td className="border border-slate-300 px-3 py-2">Ontology framework</td>
                <td className="border border-slate-300 px-3 py-2">250+ field mappings with hierarchies</td>
                <td className="border border-slate-300 px-3 py-2">Semantic understanding for NLP applications</td>
              </tr>
              <tr className="bg-purple-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-purple-700">LithoSpace</td>
                <td className="border border-slate-300 px-3 py-2">Cross-mission integration</td>
                <td className="border border-slate-300 px-3 py-2">Unified schema for 25+ missions</td>
                <td className="border border-slate-300 px-3 py-2">Pattern recognition across diverse datasets</td>
              </tr>
              <tr className="bg-purple-50/50">
                <td className="border border-slate-300 px-3 py-2 font-medium text-purple-700">LithoSpace</td>
                <td className="border border-slate-300 px-3 py-2">Reference alignment</td>
                <td className="border border-slate-300 px-3 py-2">&lt;1% deviation from published values</td>
                <td className="border border-slate-300 px-3 py-2">High-quality training data with provenance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Team Integration Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">AI Team Integration with Reference Projects</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">Team Member</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">AI Expertise</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">Application to Reference Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Dr. Behnam Sadeghi</td>
                <td className="border border-slate-300 px-3 py-2">PyImpetus (feature selection)</td>
                <td className="border border-slate-300 px-3 py-2">Can identify significant geochemical variables from EarthBank&apos;s 350K samples</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-medium">Dr. Behnam Sadeghi</td>
                <td className="border border-slate-300 px-3 py-2">PyMiner (prospectivity mapping)</td>
                <td className="border border-slate-300 px-3 py-2">Can apply mineral targeting ML to clean EarthBank data</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Dr. Fabian Kohlmann</td>
                <td className="border border-slate-300 px-3 py-2">Domain schema design</td>
                <td className="border border-slate-300 px-3 py-2">Designed vocabularies that enable consistent ML classification</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-medium">Wayne Noble</td>
                <td className="border border-slate-300 px-3 py-2">Scalable architecture</td>
                <td className="border border-slate-300 px-3 py-2">Built infrastructure that can handle AI workloads at scale</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Keith Dimech</td>
                <td className="border border-slate-300 px-3 py-2">Quality systems</td>
                <td className="border border-slate-300 px-3 py-2">Ensures data meets audit standards required for trusted AI models</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Applications Enabled Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">AI Applications Enabled for GDAC-SA</h3>
        <p className="text-sm text-slate-600 text-center mb-4">Based on demonstrated capabilities from reference projects:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">AI Application</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">Data Requirement</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">Lithodat Capability (Proven)</th>
                <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">GDAC-SA Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Lithology Classification</td>
                <td className="border border-slate-300 px-3 py-2">Clean labeled samples</td>
                <td className="border border-slate-300 px-3 py-2">EarthBank: 350K classified samples</td>
                <td className="border border-slate-300 px-3 py-2">Automated rock type identification</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-medium">Mineral Prospectivity</td>
                <td className="border border-slate-300 px-3 py-2">Georeferenced geochemistry</td>
                <td className="border border-slate-300 px-3 py-2">EarthBank: PostGIS spatial data</td>
                <td className="border border-slate-300 px-3 py-2">ML-based exploration targeting</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Anomaly Detection</td>
                <td className="border border-slate-300 px-3 py-2">Consistent measurements</td>
                <td className="border border-slate-300 px-3 py-2">Isotopes.au: Harmonized multi-agency data</td>
                <td className="border border-slate-300 px-3 py-2">Identify unusual geochemical patterns</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-medium">Element Prediction</td>
                <td className="border border-slate-300 px-3 py-2">Complete analytical suites</td>
                <td className="border border-slate-300 px-3 py-2">EarthBank: Major + trace elements</td>
                <td className="border border-slate-300 px-3 py-2">Estimate missing elements from partial data</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Data Quality Scoring</td>
                <td className="border border-slate-300 px-3 py-2">Validation rules</td>
                <td className="border border-slate-300 px-3 py-2">Isotopes.au: Schema validation</td>
                <td className="border border-slate-300 px-3 py-2">Automatic quality assessment</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-medium">Pattern Recognition</td>
                <td className="border border-slate-300 px-3 py-2">Cross-dataset queries</td>
                <td className="border border-slate-300 px-3 py-2">LithoSpace: Multi-mission comparison</td>
                <td className="border border-slate-300 px-3 py-2">Discover relationships across large datasets</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quantified Metrics Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Quantified AI-Ready Metrics from Reference Projects</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">4+ years</div>
            <div className="text-xs text-blue-600 mt-1">Production platform experience</div>
            <div className="text-xs text-slate-500 mt-1">(EarthBank since 2021)</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-700">350,000+</div>
            <div className="text-xs text-emerald-600 mt-1">Total samples available</div>
            <div className="text-xs text-slate-500 mt-1">(EarthBank)</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">50,000+</div>
            <div className="text-xs text-purple-600 mt-1">Standardized vocabulary terms</div>
            <div className="text-xs text-slate-500 mt-1">Consistent labeling for ML</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-700">97%</div>
            <div className="text-xs text-amber-600 mt-1">Field mapping accuracy</div>
            <div className="text-xs text-slate-500 mt-1">(Isotopes.au)</div>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-rose-700">&lt;1%</div>
            <div className="text-xs text-rose-600 mt-1">Data deviation from reference</div>
            <div className="text-xs text-slate-500 mt-1">(LithoSpace)</div>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-teal-700">6 + 25</div>
            <div className="text-xs text-teal-600 mt-1">Data sources integrated</div>
            <div className="text-xs text-slate-500 mt-1">Agencies + missions</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-indigo-700">50+ years</div>
            <div className="text-xs text-indigo-600 mt-1">Geochemistry data span</div>
            <div className="text-xs text-slate-500 mt-1">(1967-2025)</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-700">250+</div>
            <div className="text-xs text-cyan-600 mt-1">Field mappings with hierarchies</div>
            <div className="text-xs text-slate-500 mt-1">Ontology framework</div>
          </div>
        </div>
      </div>

      {/* Key Message */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-xl text-center shadow-lg">
        <p className="text-lg font-medium">
          <strong>Key Message:</strong> Lithodat&apos;s reference projects prove our ability to create the clean,
          standardized data foundation that makes AI/ML applications reliable and valuable for GDAC-SA.
        </p>
      </div>
    </div>
  );
}
