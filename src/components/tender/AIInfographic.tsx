"use client";

export default function AIInfographic() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold tracking-wide">
            HOW LITHODAT PROJECTS ENABLE AI APPLICATIONS
          </h3>
        </div>
      </div>

      {/* Source Projects Row */}
      <div className="flex justify-center gap-4 mb-6">
        {/* EarthBank */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 w-48 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-emerald-700 font-bold text-lg mb-2">EarthBank</div>
          <div className="space-y-1 text-sm text-emerald-600">
            <div className="font-semibold">350K samples</div>
            <div>SKOS vocab</div>
            <div>50K+ terms</div>
          </div>
        </div>

        {/* Isotopes.au */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 w-48 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-blue-700 font-bold text-lg mb-2">Isotopes.au</div>
          <div className="space-y-1 text-sm text-blue-600">
            <div className="font-semibold">6 agencies</div>
            <div>harmonized</div>
            <div>97% match</div>
          </div>
        </div>

        {/* LithoSpace */}
        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 w-48 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-purple-700 font-bold text-lg mb-2">LithoSpace</div>
          <div className="space-y-1 text-sm text-purple-600">
            <div className="font-semibold">25+ missions</div>
            <div>unified</div>
            <div>&lt;1% error</div>
          </div>
        </div>
      </div>

      {/* Converging Arrows */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-gray-400 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-8 h-8 text-gray-400 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Central Node - Clean Data */}
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-4 rounded-xl shadow-lg text-center">
          <div className="font-bold text-lg">CLEAN, STANDARDIZED DATA READY</div>
          <div className="font-medium">FOR AI/ML APPLICATIONS</div>
        </div>
      </div>

      {/* Diverging Arrows */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-gray-400 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-8 h-8 text-gray-400 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* AI Applications Row */}
      <div className="flex justify-center gap-4">
        {/* Classification */}
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 w-48 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-rose-700 font-bold mb-2">Classification</div>
          <div className="text-sm text-rose-600">
            <div>(rock types,</div>
            <div>lithology)</div>
          </div>
        </div>

        {/* Prospectivity Mapping */}
        <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-4 w-48 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-teal-700 font-bold mb-2">Prospectivity</div>
          <div className="text-sm text-teal-600">
            <div>Mapping</div>
            <div>(ML targeting)</div>
          </div>
        </div>

        {/* Pattern Recognition */}
        <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4 w-48 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-indigo-700 font-bold mb-2">Pattern</div>
          <div className="text-sm text-indigo-600">
            <div>Recognition</div>
            <div>(anomalies)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
