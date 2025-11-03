'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Utopia vision data with full details
const utopiaVisions = {
  moritz: {
    name: "Moritz",
    title: "The Focused Leader",
    platform: "International marketplace for geological sample-based data",
    philosophy: '"Do few things, but those very good"',
    team: "12 core + scalable workforce",
    revenue: ">$25M",
    quote: "On LithoBuild: 'Just a pain in the ass really'",
    details: {
      customerBase: "Labs, Exploration and Mining companies",
      culture: "Small group of hand-in-hand working developers with focus and excellence",
      assets: "Platform enabling market, Commercial data packages",
      turnover: "> $25 million",
      size: "12 people (without scalable working force for data)",
      philosophy: "Strong agreement across team that data on mass = world leader position",
      onLithoBuild: "Only reason we're doing it is to get bootstrapped, to have cash flow. Takes a lot of time and energy. Not sustainable. Creates ongoing maintenance burden.",
      progressAssessment: "We are progressing toward data goal, but slowing down due to legacy project maintenance",
      historicalSuccess: "Lithodat has excelled at finding projects that both generate revenue and bring us forward on our way to get to the platform",
      coreVision: "Lean core team focused on doing few things exceptionally well with international marketplace platform"
    }
  },
  fabian: {
    name: "Fabian",
    title: "Google of Geosciences",
    culture: "International, open, fair, innovative",
    growth: [
      "2yr: >$5M, 20-30 people",
      "5yr: >$25M, 50-100 people",
      "10yr: >$250M, 300-800 people"
    ],
    quote: '"The oil is the data"',
    details: {
      culture: "International mindset, Open and fair environment, 'No-asshole policy!', Innovative culture, Always in the forefront of tech, latest tools, AI",
      employees: "Different offices for different products/teams, Subject Matter Experts (SME) per topic/product/data type/theme, Product owners as part of SME teams, Management layer",
      assets: "Platform and tools, DATA, DATA and DATA (emphasis on data as primary asset), IP (patents?), trademarks, copyright, Real estate/offices",
      oilRigMetaphor: "The oil is the data. LithoBuild = Building the infrastructure/rigs to drill for oil. Labs connected to machines with direct links to data sources.",
      ultimateVision: "Once infrastructure is built and 'producing oil' (data flowing automatically), no longer need LithoBuild. Each client project should build another 'plug' or 'rig' to the data collection ecosystem.",
      aiSafety: "The only way we will be AI safe is because we have these labs connected. Direct connection to source data provides competitive moat.",
      strategicFocus: "Infrastructure first, then data flows automatically. Build the pipes and connections to data sources. SME model allows deep expertise while scaling.",
      scale: "200+ employee company with multiple offices for different products"
    }
  },
  wayne: {
    name: "Wayne",
    title: "Autonomous Teams",
    scale: "1M users, ~100 employees",
    culture: '"No d***heads policy"',
    goal: '"Make myself obsolete"',
    exit: "$250M turnover, sell & retire",
    quote: "Pride: Creating livelihoods",
    details: {
      perfectPlatform: "AI-powered, completely bespoke platform that can be created/customized almost instantly using AI with rapid development capabilities",
      customerBaseRevenue: "Potential of 1 million users to create sustainable base. Leverage microtransactions model (inspired by mobile gaming). Mix of high-paying enterprise customers (BHP, Petra) alongside mass market.",
      dataTypes: "Core geological data, Isotopes for soil science, Tools for data interpretation across domains, Open up to global consumers",
      culture: "Maintain 'no d***heads policy', 2-3 development teams of 4-5 people each plus support functions, Comfort zone: ~100 employees",
      culturalRisk: "Concerned that 200+ people means 'you don't know them all'. Divisions forming, people not talking to each other.",
      ultimateCultureGoal: "Make myself obsolete - Directors explain vision once, Teams are autonomous and know what to do, Direct peer communication (e.g., Kimberly asks Juan directly, not through Wayne), No micromanagement",
      exitVision: "Company grows to $250 million turnover employing 100-200 people. Company is self-sustaining and profitable. Employees are happy and well-compensated. Ultimate goal: Sell company for significant sum and retire.",
      pride: "There's 17 people plus their families. There may be 50 people on this planet that get to eat and drive cars and go to school and do all those things because we exist."
    }
  },
  vinko: {
    name: "Vinko",
    title: "Knowledge Gap",
    concept: "Clients have limited data, we provide vastly more",
    success: '"The place to go for data"',
    planning: "Quarterly OKRs",
    quote: '"So much data we reach unknown knowledge"',
    details: {
      coreConcept: "Clients have limited data and knowledge when starting projects. Lithodat platform provides access to vastly more data than clients possess individually.",
      theUtopia: "Put so much data into the platform that we can reach some level of knowledge that we are not aware right now what it can do, what insights it can provide. Everybody doing real life projects would say: 'If you want to do something with the data, you have to go to this platform because they know everything.'",
      successMetric: "The place to go if you want to work with data. Universal recognition as THE platform for geological/geochemical data work. Data volume creates emergent insights not possible with smaller datasets.",
      keyChallenge: "How to get as much data inside the platform in good quality? Current process (academic report after academic report) is insufficient. Need tools, processes, and systems to accelerate data ingestion dramatically.",
      strategicApproach: "About the 'fabric' - all parts working together to create one big whole. Integration and interconnection of data sources. Quality control essential to maintain value.",
      planningPhilosophy: "Long-term vision/purpose should be stable. Tactical planning should be quarterly-based due to fast-changing world. Suggested OKRs (Objectives and Key Results) framework used by Google."
    }
  },
  keith: {
    name: "Keith",
    title: "Network Effects",
    shortTerm: "LithoSurfer as customer acquisition",
    opportunity: "30-40 companies × $5K/yr = $150K",
    insight: '"Private data is the important data"',
    quote: "Network effect: More data → more customers",
    details: {
      problemSolved: "A big problem in the industry whether it's mining or environmental data or anyone who collects data is they don't have a way to quickly standardize it and make it findable.",
      opportunity: "LithoSurfer already works and has all core functionality. Just needs 'a few extra things to change'. Every exploration company in the country could use it for private data.",
      revenueModel: "$5,000/year × 30 companies = $150,000 recurring revenue. Small subscription price point. Low friction for customers. Voluntary data contribution.",
      multiPurposePlatform: "Data hosting (private, secure), Data viewing interface, Data purchasing marketplace, Communication & transactions hub, Data ingestion tools, Data display & analysis, M&A tool for mergers and acquisitions, Data marketplace for selling",
      strategicValue: "Trojan Horse for data collection - customers upload private data voluntarily. Lab integration pathway for accessing lab customers who just log in and put their data in.",
      privateDataAdvantage: "The important data is the private data. And the best way to get that is by selling people a tool where they voluntarily give it to us in bulk.",
      scaleVision: "Not about one-off API deals. Platform approach scales exponentially. More data attracts more customers (network effect). More private data we can get in there, the more customers we'll be able to attract.",
      customerExpansion: "Start: Exploration companies, Expand: Environmental data companies, Include: Any organization collecting geological/geochemical data, Leverage: Lab customers (Lab West's 30 clients as example)"
    }
  }
};

// System 1s data
const systemOnes = {
  lithoSurfer: {
    name: "LithoSurfer",
    subtitle: "Front-End / Customer Platform",
    color: "blue",
    features: [
      "Our software",
      "Marketplace",
      "Analysis tool",
      "Subscription",
      "Buy data packages",
      "Auto cleaning",
      "Share data"
    ],
    details: {
      description: "Standalone software product that can be sold independently. Currently central to business operations.",
      currentStatus: "Central to operations with all core functionality working",
      futurePotential: "Subscription model potential (LithoSurfer Max), broader user base, 1M users",
      strategicRole: "Customer acquisition tool and multi-purpose platform for data hosting, viewing, purchasing, and marketplace transactions",
      viability: "Can be sold as standalone product without other systems",
      manager: "Wayne",
      keyCharacteristics: [
        "A viable system on its own",
        "Has its own customers/stakeholders",
        "Produces measurable outputs",
        "Has autonomy for day-to-day delivery",
        "Has own management and scheduling",
        "Be removable as separate entity"
      ]
    }
  },
  lithoBuild: {
    name: "LithoBuild",
    subtitle: "Contract Work / Bootstrap Revenue",
    color: "amber",
    features: [
      "Contract-by-contract only",
      "Only for paychecks",
      "AGN, CSIRO, Amira",
      "Temporary (1-2 years)",
      '"Oil rig infrastructure"'
    ],
    note: "Sunset once data flywheel spins",
    details: {
      description: "Software development capacity and expertise for custom development, tool creation, and consulting services",
      currentRole: "Historically primary revenue generator. Capital generation for next 1-2 years",
      strategicPosition: "Not just for revenue - strategic infrastructure development. Each client project should build another 'plug' or 'rig' to data sources.",
      temporaryNature: "Once infrastructure is built and 'producing oil' (data flowing automatically), no longer need LithoBuild",
      challenges: "Takes a lot of time and energy. Not sustainable. Not self-selling. Creates ongoing maintenance burden.",
      historicalSuccess: "Lithodat has excelled at finding projects that both generate revenue and bring us forward toward the platform",
      manager: "Moritz",
      timeline: "1-2 years temporary status until data flywheel spins up"
    }
  },
  lithoData: {
    name: "LithoData",
    subtitle: "Back-End Data / Strategic Asset",
    color: "indigo",
    features: [
      "Backend development",
      "Schema/Postgres work",
      "LithoClean (cleaning)",
      "LithoMine (extraction)",
      "API development"
    ],
    tagline: '"DATA, DATA and DATA"',
    details: {
      description: "Data collection, cleaning, management and curation. The core strategic asset.",
      subSystems: {
        lithoClean: "Data cleaning processes ensuring high-quality, standardized data",
        lithoMine: "Data mining and extraction capabilities from multiple sources"
      },
      products: "Curated geological/geochemical datasets",
      futurePotential: "Core business differentiation. The 'oil' that powers everything.",
      strategicImportance: "Universal agreement: DATA is our core asset. World-leader ambition requires data on mass.",
      dataVolume: "Need to dramatically accelerate beyond current 'academic report after academic report' approach",
      qualityFocus: "Quality control essential to maintain value while scaling volume",
      manager: "Fabian",
      ultimateGoal: "So much data in platform that we reach unknown knowledge and become 'the place to go' for geological data"
    }
  }
};

export default function ManagementDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'visions' | 'systems' | 'diagnosis' | 'actions' | 'timeline'>('visions');
  const [selectedVision, setSelectedVision] = useState<string | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  useEffect(() => {
    // Verify authentication and authorization
    const checkAccess = async () => {
      try {
        const sessionRes = await fetch('/api/auth/session');
        if (!sessionRes.ok) {
          console.log('[MANAGEMENT] Session not OK, redirecting to login');
          router.push('/login');
          return;
        }

        const sessionData = await sessionRes.json();
        console.log('[MANAGEMENT] Session data received:', sessionData);
        console.log('[MANAGEMENT] isManager value:', sessionData.user.isManager, 'type:', typeof sessionData.user.isManager);

        // Check if user is a manager (from database field)
        if (!sessionData.user.isManager) {
          console.log('[MANAGEMENT] Access denied - user is not a manager:', sessionData.user.username);
          router.push('/dashboard');
          return;
        }

        console.log('[MANAGEMENT] Access granted - user is a manager:', sessionData.user.username);
        setLoading(false);
      } catch (error) {
        console.error('[MANAGEMENT] Error checking access:', error);
        router.push('/login');
      }
    };

    checkAccess();
  }, []); // Empty dependency array - only check once on mount

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#0D8BFF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0D8BFF] via-[#0D8BFF] to-[#2C3E7C] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-4 backdrop-blur-sm">
                Management Access Only
              </div>
              <h1 className="text-5xl font-bold mb-3 tracking-tight">Lithodat VSM Meeting</h1>
              <p className="text-blue-100 text-xl font-light">Strategic Overview & Action Dashboard</p>
            </div>
            <div className="text-right text-sm text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold">October 29, 2024</div>
              <div className="text-blue-200">1h 55min workshop</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Key Insight Card */}
        <div className="bg-white rounded-xl shadow-xl p-10 mb-10 border-l-4 border-[#0D8BFF] hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-[#2C3E7C] mb-4">🎯 Key Insight: We Are Aligned</h2>
          <blockquote className="text-xl font-semibold text-gray-700 italic mb-4">
            "DATA, DATA and DATA" - Our unanimous strategic asset
          </blockquote>
          <p className="text-gray-600">
            The leadership team shares a unified vision: <strong>Become the world's leading platform for geological/geochemical data.</strong>
            While we have different views on scale and timeline, our fundamental direction is crystal clear.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveSection('visions')}
                className={`border-b-2 ${
                  activeSection === 'visions'
                    ? 'border-[#00A5E3] text-[#00A5E3]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } py-4 px-1 text-sm font-medium transition-colors`}
              >
                Utopia Alignment
              </button>
              <button
                onClick={() => setActiveSection('systems')}
                className={`border-b-2 ${
                  activeSection === 'systems'
                    ? 'border-[#00A5E3] text-[#00A5E3]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } py-4 px-1 text-sm font-medium transition-colors`}
              >
                Our System 1s
              </button>
              <button
                onClick={() => setActiveSection('diagnosis')}
                className={`border-b-2 ${
                  activeSection === 'diagnosis'
                    ? 'border-[#00A5E3] text-[#00A5E3]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } py-4 px-1 text-sm font-medium transition-colors`}
              >
                Diagnosing the System
              </button>
              <button
                onClick={() => setActiveSection('actions')}
                className={`border-b-2 ${
                  activeSection === 'actions'
                    ? 'border-[#00A5E3] text-[#00A5E3]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } py-4 px-1 text-sm font-medium transition-colors`}
              >
                Action Dashboard
              </button>
              <button
                onClick={() => setActiveSection('timeline')}
                className={`border-b-2 ${
                  activeSection === 'timeline'
                    ? 'border-[#00A5E3] text-[#00A5E3]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } py-4 px-1 text-sm font-medium transition-colors`}
              >
                Implementation Timeline
              </button>
            </nav>
          </div>
        </div>

        {/* Utopia Visions & Alignment Section */}
        {activeSection === 'visions' && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E7C] mb-8">🔮 Utopia Alignment: Our Shared Vision</h2>

            {/* Vision Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {Object.entries(utopiaVisions).map(([key, vision]: [string, any]) => (
                <div
                  key={key}
                  onClick={() => setSelectedVision(key)}
                  className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#0D8BFF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-[#2C3E7C] mb-3">{vision.name}: {vision.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Platform:</strong> {vision.platform || vision.concept || vision.shortTerm}</p>
                    <p><strong>Philosophy:</strong> {vision.philosophy || vision.insight}</p>
                    <p><strong>Key Metric:</strong> {vision.revenue || vision.success || vision.opportunity}</p>
                    {vision.culture && <p><strong>Culture:</strong> {vision.culture}</p>}
                    {vision.scale && <p><strong>Scale:</strong> {vision.scale}</p>}
                    <p className="text-xs italic pt-2 border-t text-[#0D8BFF]">{vision.quote}</p>
                    <button className="mt-3 text-xs font-semibold text-[#0D8BFF] hover:text-[#2C3E7C] flex items-center gap-1">
                      Click to expand <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Alignment Grid */}
            <div className="grid gap-6 lg:grid-cols-2 mt-12">
              {/* Agreements */}
              <div className="bg-green-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-800 mb-4">🟢 Absolute Agreements</h3>
                <ul className="space-y-2 text-sm text-green-900">
                  <li>✅ Data is our core asset</li>
                  <li>✅ World-leader ambition</li>
                  <li>✅ LithoBuild is temporary (1-2 years)</li>
                  <li>✅ Quality + Volume both matter</li>
                  <li>✅ Network effects strategy</li>
                  <li>✅ No-asshole policy</li>
                  <li>✅ Autonomy &gt; Hierarchy</li>
                  <li>✅ AI/ML-ready data is future</li>
                </ul>
              </div>

              {/* Clashes */}
              <div className="bg-red-50 rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-800 mb-4">🔴 Clear Clashes & Tensions</h3>
                <div className="space-y-3 text-sm text-red-900">
                  <div>
                    <strong>Scale:</strong> Wayne (100) vs Fabian (300-800) vs Moritz (12 core)
                  </div>
                  <div>
                    <strong>Exit:</strong> Wayne (10yr sell) vs Others (build forever)
                  </div>
                  <div>
                    <strong>Timeline:</strong> Keith (1-2yr tactical) vs Fabian (10yr strategic)
                  </div>
                  <div>
                    <strong>Speed:</strong> Moritz ("few things very good") vs Others (move fast)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-red-200">
                  <strong className="text-amber-800">🟡 Questions to Resolve:</strong>
                  <ul className="mt-2 space-y-1 text-xs text-red-800">
                    <li>❓ Agreed 2yr/5yr/10yr targets?</li>
                    <li>❓ Sell or build forever?</li>
                    <li>❓ Optimal team size?</li>
                    <li>❓ When does LithoBuild sunset?</li>
                    <li>❓ Balance growth vs quality?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Our System 1s Section */}
        {activeSection === 'systems' && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E7C] mb-4">🏗️ Our System 1s: Operating Units</h2>
            <p className="text-gray-600 mb-8">
              These are our three primary viable systems - each capable of operating independently while contributing to our unified vision.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {/* LithoSurfer */}
              <div
                onClick={() => setSelectedSystem('lithoSurfer')}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#0D8BFF] hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-bold text-[#2C3E7C] mb-3">{systemOnes.lithoSurfer.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{systemOnes.lithoSurfer.subtitle}</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {systemOnes.lithoSurfer.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <button className="mt-3 text-xs font-semibold text-[#0D8BFF] hover:text-[#2C3E7C] flex items-center gap-1">
                  Click to expand <span>→</span>
                </button>
              </div>

              {/* LithoBuild */}
              <div
                onClick={() => setSelectedSystem('lithoBuild')}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-bold text-[#2C3E7C] mb-3">{systemOnes.lithoBuild.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{systemOnes.lithoBuild.subtitle}</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {systemOnes.lithoBuild.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs italic text-amber-700">{systemOnes.lithoBuild.note}</p>
                <button className="mt-2 text-xs font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1">
                  Click to expand <span>→</span>
                </button>
              </div>

              {/* LithoData */}
              <div
                onClick={() => setSelectedSystem('lithoData')}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#2C3E7C] hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-bold text-[#2C3E7C] mb-3">{systemOnes.lithoData.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{systemOnes.lithoData.subtitle}</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {systemOnes.lithoData.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs font-bold text-[#2C3E7C]">{systemOnes.lithoData.tagline}</p>
                <button className="mt-2 text-xs font-semibold text-[#2C3E7C] hover:text-[#0D8BFF] flex items-center gap-1">
                  Click to expand <span>→</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Diagnosing the System Section */}
        {activeSection === 'diagnosis' && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E7C] mb-4">📊 Diagnosing the System</h2>
            <p className="text-gray-600 mb-8">
              Analysis of our five VSM systems: Operations (System 1), Coordination (System 2), Optimization (System 3), Intelligence (System 4), and Policy (System 5).
            </p>

            <div className="space-y-4">
              {/* System 2 */}
              <div className="bg-yellow-50 rounded-lg shadow p-6 border-l-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">System 2: Coordination ⚠️</h3>
                <p className="text-sm text-yellow-800 mb-3">Working but needs refinement</p>
                <ul className="text-sm text-yellow-900 space-y-1 mb-3">
                  <li>• No universal "utopia" Jira for cross-system coordination</li>
                  <li>• LithoClean/LithoMine prioritization uncoordinated with other systems</li>
                  <li>• Need cross-system communication channels</li>
                  <li>• Staff sometimes ask wrong person for information (going up-then-across vs. horizontal)</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-100 rounded">
                  <strong className="text-xs font-semibold text-yellow-900">Current Tools:</strong>
                  <p className="text-xs text-yellow-800 mt-1">Daily scrums, Signal groups, Director meetings (Monday), Jira (multiple projects), Workbench, Email</p>
                </div>
              </div>

              {/* System 3 */}
              <div className="bg-red-50 rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-red-900 mb-2">System 3: Optimization 🔴</h3>
                <p className="text-sm text-red-800 mb-3">Critical gaps for scaling</p>
                <ul className="text-sm text-red-900 space-y-1 mb-3">
                  <li>• No financial dashboard (cash flow, runway, burn rate)</li>
                  <li>• No real-time operational dashboards (LithoClean/LithoMine progress)</li>
                  <li>• Limited visibility into performance metrics</li>
                  <li>• Ad-hoc resource allocation and prioritization</li>
                  <li>• Security: Vinko hired, Essential 8s in progress ✓</li>
                </ul>
                <div className="mt-3 p-3 bg-red-100 rounded">
                  <strong className="text-xs font-semibold text-red-900">Key Challenge:</strong>
                  <p className="text-xs text-red-800 mt-1">Current informal processes work for 3 directors + small team, but won't scale to 20+ staff without structure</p>
                </div>
              </div>

              {/* System 4 */}
              <div className="bg-red-50 rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-red-900 mb-2">System 4: Intelligence 🔴</h3>
                <p className="text-sm text-red-800 mb-3">Major blind spots in market awareness</p>
                <ul className="text-sm text-red-900 space-y-1 mb-3">
                  <li>• Who are our future customers? Unclear systematic understanding</li>
                  <li>• What software do they currently use? Not documented</li>
                  <li>• Who are our competitors? Need better competitive intelligence</li>
                  <li>• No dedicated marketing role, weak social media presence</li>
                  <li>• All intelligence comes through Fabian (single point of failure)</li>
                </ul>
                <div className="mt-3 p-3 bg-red-100 rounded">
                  <strong className="text-xs font-semibold text-red-900">Current Sources:</strong>
                  <p className="text-xs text-red-800 mt-1">Conferences, direct client communication, industry seminars, Google/web search. Primarily through Fabian's network.</p>
                </div>
              </div>

              {/* System 5 */}
              <div className="bg-yellow-50 rounded-lg shadow p-6 border-l-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">System 5: Policy & Purpose ⚠️</h3>
                <p className="text-sm text-yellow-800 mb-3">Needs clarity and communication</p>
                <ul className="text-sm text-yellow-900 space-y-1 mb-3">
                  <li>• Utopia vision needs formal documentation and cascade to team</li>
                  <li>• Career paths unclear (technical vs management tracks)</li>
                  <li>• Need to resolve scale/exit tensions among leadership</li>
                  <li>• Employees, customers, and industry need to know our vision</li>
                  <li>• Branding decisions needed: Are we settling on these names?</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-100 rounded">
                  <strong className="text-xs font-semibold text-yellow-900">Key Principle:</strong>
                  <p className="text-xs text-yellow-800 mt-1">"The purpose of a system is what it does" - not what it claims to do, but what its actual outputs demonstrate.</p>
                </div>
              </div>

              {/* VSM Framework Overview */}
              <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-500 mt-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Viable Systems Model Framework</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-blue-800">Core Principles:</strong>
                    <ul className="text-blue-900 space-y-1 mt-2">
                      <li>• <strong>Viability:</strong> Can survive both today and in the future</li>
                      <li>• <strong>Recursion:</strong> Systems within systems (fractal structure)</li>
                      <li>• <strong>Variety:</strong> Measure of system complexity</li>
                      <li>• <strong>Requisite Variety:</strong> Control must match complexity</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-800">Three Rules:</strong>
                    <ul className="text-blue-900 space-y-1 mt-2 text-xs">
                      <li>1. Managerial, operational and environmental varieties will balance - design with minimal damage to people and cost</li>
                      <li>2. Communication channels must be fast and wide enough to handle the information produced</li>
                      <li>3. Messages undergo 'transduction' - ensure clarity and requisite context</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Action Dashboard Section */}
        {activeSection === 'actions' && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E7C] mb-8">🚀 Action Dashboard</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Action 1: Products & Services Strategy (consolidated) */}
              <a href="/management/action/products-services" className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#0D8BFF] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#2C3E7C]">🎯 Action 1</h3>
                  <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded">IMMEDIATE</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Products & Services Strategy</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Define strategies for all three product lines: LithoSurfer (Three-Tier Product), LithoData (Three-Type Data Model), and LithoBuild (Consulting & Development).
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">🌊 LithoSurfer</span>
                  <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">📊 LithoData</span>
                  <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">🏗️ LithoBuild</span>
                </div>
                <div className="text-xs text-gray-500">Owner: Keith (Management Team)</div>
              </a>

              {/* Action 2 */}
              <a href="/management/action/unified-utopia" className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#0D8BFF] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#2C3E7C]">🎯 Action 2</h3>
                  <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded">IMMEDIATE</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Define Unified Utopia</h4>
                <p className="text-sm text-gray-600 mb-3">Resolve clashes and create coherent 2yr/5yr/10yr roadmap.</p>
                <div className="text-xs text-gray-500">Owner: Management Team</div>
              </a>

              {/* Action 3 */}
              <a href="/management/action/setup-departments" className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#0D8BFF] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#2C3E7C]">🏢 Action 3</h3>
                  <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded">IMMEDIATE</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Setup Three Departments</h4>
                <p className="text-sm text-gray-600 mb-3">Formalize LithoSurfer, LithoBuild, LithoData systems.</p>
                <div className="text-xs text-gray-500">Owner: Management Team</div>
              </a>

              {/* Action 4 */}
              <a href="/management/action/okrs" className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#2C3E7C]">📋 Action 4</h3>
                  <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">SHORT-TERM</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Implementation Plan (OKRs)</h4>
                <p className="text-sm text-gray-600 mb-3">Create actionable roadmap with quarterly OKRs.</p>
                <div className="text-xs text-gray-500">Owner: Keith & Vinko</div>
              </a>

              {/* Action 5 */}
              <a href="/management/action/intelligence" className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#2C3E7C]">🔍 Action 5</h3>
                  <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">SHORT-TERM</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Build System 4 Intelligence</h4>
                <p className="text-sm text-gray-600 mb-3">Address blind spots in market intelligence and CRM.</p>
                <div className="text-xs text-gray-500">Owner: Management Team</div>
              </a>

              {/* Action 6 */}
              <a href="/management/action/career-paths" className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#2C3E7C]">👥 Action 6</h3>
                  <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">SHORT-TERM</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Career Paths & Org Design</h4>
                <p className="text-sm text-gray-600 mb-3">Create progression paths for scaling to 20+ staff.</p>
                <div className="text-xs text-gray-500">Owner: Management Team</div>
              </a>

              {/* Action 7 */}
              <a href="/management/action/realtime-intelligence" className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#0D8BFF] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#2C3E7C]">📊 Action 7</h3>
                  <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded">IMMEDIATE</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Lithodat Realtime Intelligence System</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Build proper attenuators for System 1 → System 3 communication. Real-time visibility of operational performance enables effective management decisions.
                </p>
                <div className="text-xs text-gray-700 mb-2 space-y-1">
                  <div className="flex items-start gap-1">
                    <span className="text-[#0D8BFF]">•</span>
                    <span>Finance tracker & cash flow visibility</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-[#0D8BFF]">•</span>
                    <span>HR management & team capacity tool</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-[#0D8BFF]">•</span>
                    <span>LithoClean/LithoMine progress dashboards</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-[#0D8BFF]">•</span>
                    <span>LithoBuild program manager (online, auto-updated)</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-[#0D8BFF]">•</span>
                    <span className="italic">Additional needs identified during implementation</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">Owner: Management Team + Tech Leads</div>
              </a>
            </div>
          </section>
        )}

        {/* Implementation Timeline Section */}
        {activeSection === 'timeline' && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold text-[#2C3E7C]">📅 Implementation Timeline</h2>
                <p className="text-gray-600 mt-2">
                  Estimated Gantt chart for action implementation - <span className="italic font-semibold text-amber-600">This is a working estimate and can be updated</span>
                </p>
              </div>
              <div className="text-right text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-amber-800 font-semibold">Status: Draft</p>
                <p className="text-amber-700 text-xs mt-1">Last updated: Nov 3, 2025</p>
              </div>
            </div>

            {/* Timeline Legend */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-[#2C3E7C] mb-4">Timeline Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Immediate Priority (Weeks 1-2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700">Short-term (Months 1-3)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">Medium-term (Months 3-6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm text-gray-700">Long-term (Months 6-12)</span>
                </div>
              </div>
            </div>

            {/* Gantt Chart */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header with months */}
              <div className="bg-gradient-to-r from-[#0D8BFF] to-[#2C3E7C] text-white p-4">
                <div className="grid grid-cols-13 gap-2">
                  <div className="col-span-1 text-xs font-semibold">Actions</div>
                  <div className="col-span-12 grid grid-cols-12 gap-1 text-center text-xs">
                    <div>Nov</div>
                    <div>Dec</div>
                    <div>Jan</div>
                    <div>Feb</div>
                    <div>Mar</div>
                    <div>Apr</div>
                    <div>May</div>
                    <div>Jun</div>
                    <div>Jul</div>
                    <div>Aug</div>
                    <div>Sep</div>
                    <div>Oct</div>
                  </div>
                </div>
              </div>

              {/* Action 1: Products & Services */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Action 1</div>
                    <div className="text-xs text-gray-600">Products & Services</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    <div className="col-span-1 bg-red-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      W1-2
                    </div>
                    {[...Array(11)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action 2: Unified Utopia */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Action 2</div>
                    <div className="text-xs text-gray-600">Unified Utopia</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    <div className="col-span-1 bg-red-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      W1-2
                    </div>
                    {[...Array(11)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action 3: Three Departments */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Action 3</div>
                    <div className="text-xs text-gray-600">Three Departments</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    <div className="col-span-1 bg-red-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      W1-2
                    </div>
                    {[...Array(11)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action 7: Realtime Intelligence System */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Action 7</div>
                    <div className="text-xs text-gray-600">Realtime Intelligence</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    <div className="col-span-1 bg-red-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      W1-2
                    </div>
                    {[...Array(11)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action 4: OKRs */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Action 4</div>
                    <div className="text-xs text-gray-600">Implementation (OKRs)</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    <div className="h-8"></div>
                    <div className="col-span-3 bg-blue-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      M1-3
                    </div>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action 5: System 4 Intelligence */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Action 5</div>
                    <div className="text-xs text-gray-600">System 4 Intelligence</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    <div className="h-8"></div>
                    <div className="col-span-3 bg-blue-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      M1-3
                    </div>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action 6: Career Paths */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Action 6</div>
                    <div className="text-xs text-gray-600">Career Paths & Org Design</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    <div className="h-8"></div>
                    <div className="col-span-3 bg-blue-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      M1-3
                    </div>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Execute OKRs */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Execute</div>
                    <div className="text-xs text-gray-600">OKRs & Iteration</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                    <div className="col-span-3 bg-green-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      M3-6
                    </div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scale Organization */}
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-13 gap-2 items-center">
                  <div className="col-span-1">
                    <div className="text-sm font-semibold text-[#2C3E7C]">Scale</div>
                    <div className="text-xs text-gray-600">20+ Staff Structure</div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8"></div>
                    ))}
                    <div className="col-span-6 bg-purple-500 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      M6-12
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Milestones */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#2C3E7C] mb-6">🎯 Key Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                  <div className="flex-shrink-0 w-24 text-sm font-semibold text-red-700">Week 2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Foundation Complete</h4>
                    <p className="text-sm text-gray-700">LithoSurfer, LithoData, and LithoBuild strategies defined (Actions 1-3), Utopia documented (Action 4), Three departments established (Action 5), Realtime Intelligence System operational (Action 9)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-700">Month 3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Systems Operational</h4>
                    <p className="text-sm text-gray-700">OKR framework implemented, System 4 intelligence gathering active, Career paths defined and communicated</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0 w-24 text-sm font-semibold text-green-700">Month 6</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Optimization Phase</h4>
                    <p className="text-sm text-gray-700">First OKR cycle complete, Systems refined based on learnings, Ready for organizational scaling</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700">Month 12</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Scale Achievement</h4>
                    <p className="text-sm text-gray-700">Successfully scaled to 20+ staff, New organizational structure proven, VSM systems functioning autonomously</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dependencies & Notes */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4">⚠️ Dependencies & Assumptions</h3>
              <div className="space-y-3 text-sm text-amber-900">
                <div className="flex items-start gap-2">
                  <span className="font-semibold mt-0.5">•</span>
                  <p><strong>Action 6 (OKRs)</strong> depends on completion of Actions 1-5 to establish clear goals and structure</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold mt-0.5">•</span>
                  <p><strong>Actions 7 & 8</strong> can run in parallel with Action 6 as they address different organizational needs</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold mt-0.5">•</span>
                  <p><strong>Execute Phase</strong> assumes foundational actions are completed and begins OKR-driven development cycles</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold mt-0.5">•</span>
                  <p><strong>Scaling Phase</strong> depends on proven systems and processes from previous phases</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold mt-0.5">•</span>
                  <p><strong>Timeline assumes</strong> full management team commitment and no major external disruptions</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-amber-300">
                <p className="text-xs italic text-amber-800">
                  This timeline is a working estimate and should be reviewed and updated monthly during management meetings. Actual progress may vary based on resource availability, external factors, and emerging priorities.
                </p>
              </div>
            </div>

            {/* Review Schedule */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">📋 Review & Update Schedule</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Weekly Reviews</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Director meetings - immediate action progress</li>
                    <li>• Blockers and dependencies discussion</li>
                    <li>• Resource allocation adjustments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Monthly Reviews</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Full management team - timeline assessment</li>
                    <li>• Milestone achievement review</li>
                    <li>• Timeline adjustments and re-estimation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Quarterly Reviews</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• OKR cycle completion assessment</li>
                    <li>• Strategic alignment check</li>
                    <li>• Long-term timeline refinement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Update Protocol</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Document all timeline changes with rationale</li>
                    <li>• Communicate updates to full team</li>
                    <li>• Track variance from original estimates</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Progress Timeline */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#2E3192] mb-4">📈 Progress Timeline</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-32 text-sm font-semibold text-gray-700">Immediate</div>
                <div className="flex-1 text-sm text-gray-600">Actions 1-5, 9 (Next 2 weeks)</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 text-sm font-semibold text-gray-700">Short-term</div>
                <div className="flex-1 text-sm text-gray-600">Actions 6, 7, 8 (1-3 months)</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 text-sm font-semibold text-gray-700">Medium-term</div>
                <div className="flex-1 text-sm text-gray-600">Execute OKRs, iterate on systems (3-6 months)</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 text-sm font-semibold text-gray-700">Long-term</div>
                <div className="flex-1 text-sm text-gray-600">Scale to 20+ staff with new structure (6-12 months)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Quotes */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#2E3192] to-[#00A5E3] rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">💬 Key Quotes</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <blockquote className="text-sm italic border-l-2 border-white pl-4">
                "So much data in the platform that we can reach some level of knowledge that we are not aware right now what it can do"
                <footer className="text-xs mt-2 opacity-80">— Vinko Novak</footer>
              </blockquote>
              <blockquote className="text-sm italic border-l-2 border-white pl-4">
                "The oil is the data. LithoBuild is building the infrastructure/rigs to drill for oil."
                <footer className="text-xs mt-2 opacity-80">— Fabian Kohlmann</footer>
              </blockquote>
              <blockquote className="text-sm italic border-l-2 border-white pl-4">
                "Make myself obsolete because then you're more useful."
                <footer className="text-xs mt-2 opacity-80">— Wayne Noble</footer>
              </blockquote>
              <blockquote className="text-sm italic border-l-2 border-white pl-4">
                "Do few things, but those very good."
                <footer className="text-xs mt-2 opacity-80">— Moritz Theile</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pb-8">
          <p>Last Updated: November 3, 2025</p>
          <p className="mt-2">Next Review: After completing Actions 1-5 and 9</p>
          <p className="mt-4 text-xs">Accessible to: Keith Dimech, Fabian Kohlmann, Wayne Noble, Moritz Theile, Vinko Novak</p>
        </footer>
      </div>

      {/* Vision Detail Modal */}
      {selectedVision && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedVision(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#0D8BFF] to-[#2C3E7C] text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {utopiaVisions[selectedVision as keyof typeof utopiaVisions].name}: {utopiaVisions[selectedVision as keyof typeof utopiaVisions].title}
                  </h2>
                  <p className="text-blue-100 italic">
                    {utopiaVisions[selectedVision as keyof typeof utopiaVisions].quote}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVision(null)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {Object.entries(utopiaVisions[selectedVision as keyof typeof utopiaVisions].details).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-[#2C3E7C] mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  {Array.isArray(value) ? (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {value.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">{value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-xl border-t border-gray-200">
              <button
                onClick={() => setSelectedVision(null)}
                className="w-full px-6 py-3 bg-[#0D8BFF] text-white rounded-lg hover:bg-[#2C3E7C] transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Detail Modal */}
      {selectedSystem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSystem(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 bg-gradient-to-r ${
              selectedSystem === 'lithoSurfer' ? 'from-[#0D8BFF] to-[#2C3E7C]' :
              selectedSystem === 'lithoBuild' ? 'from-amber-500 to-amber-600' :
              'from-[#2C3E7C] to-indigo-900'
            } text-white p-6 rounded-t-xl`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {systemOnes[selectedSystem as keyof typeof systemOnes].name}
                  </h2>
                  <p className="text-blue-100">
                    {systemOnes[selectedSystem as keyof typeof systemOnes].subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSystem(null)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {Object.entries(systemOnes[selectedSystem as keyof typeof systemOnes].details).map(([key, value]) => {
                if (key === 'subSystems' && typeof value === 'object') {
                  return (
                    <div key={key} className="border-b border-gray-200 pb-4">
                      <h3 className="font-semibold text-[#2C3E7C] mb-2">Sub-Systems</h3>
                      {Object.entries(value as Record<string, string>).map(([subKey, subValue]) => (
                        <div key={subKey} className="ml-4 mb-2">
                          <strong className="text-gray-800 capitalize">{subKey}:</strong>
                          <p className="text-gray-700">{subValue}</p>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={key} className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-[#2C3E7C] mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    {Array.isArray(value) ? (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {value.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">{value as string}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-xl border-t border-gray-200">
              <button
                onClick={() => setSelectedSystem(null)}
                className={`w-full px-6 py-3 text-white rounded-lg transition-colors font-medium ${
                  selectedSystem === 'lithoSurfer' ? 'bg-[#0D8BFF] hover:bg-[#2C3E7C]' :
                  selectedSystem === 'lithoBuild' ? 'bg-amber-500 hover:bg-amber-600' :
                  'bg-[#2C3E7C] hover:bg-indigo-900'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
