"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Types
interface TrackerData {
  id: string;
  [key: string]: string | number | null;
}

// Deadline: 24 December 2025
const DEADLINE = new Date("2025-12-24T23:59:59+03:00"); // Saudi Arabia timezone UTC+3

// Status options
const STEP_STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started", color: "bg-gray-200 text-gray-700" },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-200 text-yellow-800" },
  { value: "blocked", label: "Blocked", color: "bg-red-200 text-red-800" },
  { value: "complete", label: "Complete", color: "bg-green-200 text-green-800" },
];

// All required steps organized by category - VERIFIED against actual RFQ #251140007625
const REQUIRED_STEPS = {
  "1. Eligibility & Registration": {
    description: "Critical first steps - foreign bidders MUST have Saudi registration to submit via Etimad",
    link: "https://portal.etimad.sa",
    steps: [
      { id: "step_app_structure", label: "Decide: Solo bid or Consortium?", help: "If consortium, need alliance agreement" },
      { id: "step_misa_register", label: "Register with Ministry of Investment (MISA)", help: "Required for foreign bidders - obtain investment license", link: "https://misa.gov.sa" },
      { id: "step_etimad_register", label: "Register on Etimad Platform", help: "Saudi government procurement portal - requires Saudi CR", link: "https://portal.etimad.sa" },
      { id: "step_etimad_verify", label: "Verify Etimad Account", help: "May take 3-5 business days to verify" },
      { id: "step_locate_rfq", label: "Locate RFQ #251140007625 on Etimad", help: "Confirm you can see and access the tender" },
    ],
  },
  "2. Required Certificates (Pass/Fail)": {
    description: "All certificates must be VALID (not expired) - missing any = automatic disqualification",
    link: null,
    steps: [
      { id: "step_commercial_reg", label: "Commercial Registration Certificate", help: "Valid certificate from Ministry of Commerce", required: true },
      { id: "step_zakat_cert", label: "Zakat and Income Certificate", help: "From GAZT (Zakat, Tax & Customs Authority)", required: true },
      { id: "step_vat_cert", label: "VAT Certificate", help: "Only required if your company is VAT registered", required: false },
      { id: "step_gosi_cert", label: "Social Insurance Certificate (GOSI)", help: "From General Organization for Social Insurance", required: true },
      { id: "step_chamber_cert", label: "Chamber of Commerce Certificate", help: "Valid membership certificate", required: true },
      { id: "step_investment_license", label: "Investment License (Foreign Bidders)", help: "From MISA - required for non-Saudi entities", required: false },
      { id: "step_saudization_cert", label: "Saudization Certificate (Taqat)", help: "Shows Nitaqat compliance from Ministry of HR", required: true },
    ],
  },
  "3. Quality & HSE Certificates (20% of Technical Score)": {
    description: "Quality Assurance = 10%, HSE = 10% of technical evaluation",
    link: null,
    steps: [
      { id: "step_quality_cert", label: "Quality Policy/Certificate", help: "ISO 9001 or equivalent quality management certification - 10% weight", required: true },
      { id: "step_hse_cert", label: "HSE Policy/Certificate", help: "Health, Safety & Environment certification - 10% weight", required: true },
    ],
  },
  "4. Financial Documents (40% of Total Score)": {
    description: "Financial ratios calculated from these statements determine 40% of your score",
    link: null,
    steps: [
      { id: "step_fin_year0", label: "Audited Financial Statements - Current Year", help: "Most recent fiscal year approved by auditor", required: true },
      { id: "step_fin_year1", label: "Audited Financial Statements - Year -1", help: "Previous fiscal year", required: true },
      { id: "step_fin_year2", label: "Audited Financial Statements - Year -2", help: "Two years prior", required: true },
      { id: "step_extract_data", label: "Extract Financial Data for Ratios", help: "Current Assets, Cash, Receivables, Current Liabilities (3 years each)" },
    ],
  },
  "5. Consortium Documents (If Applicable)": {
    description: "Only required if applying as an alliance/consortium",
    link: null,
    steps: [
      { id: "step_alliance_agreement", label: "Alliance Agreement", help: "Formal agreement between all consortium partners", required: false },
      { id: "step_partner_docs", label: "All Partners: Same Certificates Required", help: "Each partner needs their own valid certificates" },
    ],
  },
  "6. Complete Application Forms": {
    description: "All forms must be completed electronically (no handwriting) - download from Etimad",
    link: null,
    steps: [
      { id: "step_form_applicant", label: "Form: Applicant Information", help: "Company name, capital, CR, address, ownership structure, representative" },
      { id: "step_form_tech_admin", label: "Form: Technical & Administrative Capabilities", help: "Years experience, projects executed, performance scores, employee counts" },
      { id: "step_form_admin_staff", label: "Form: Administrative Staff Experience", help: "10 key administrative personnel with name, function, specialization, years" },
      { id: "step_form_prof_staff", label: "Form: Professional Staff Experience", help: "20 technical personnel - AI/ML, Data Science, Geoscience, GIS specialists" },
      { id: "step_form_project1", label: "Form: Similar Project #1", help: "Project from last 5 years with name, scope, client, value, dates, reference contact" },
      { id: "step_form_project2", label: "Form: Similar Project #2", help: "Another relevant project with full details and reference" },
      { id: "step_form_project3", label: "Form: Similar Project #3", help: "Third project reference with contact details" },
      { id: "step_form_financial", label: "Form: Financial Capacity Criteria", help: "Financial ratios and capacity declaration" },
    ],
  },
  "7. Quality Assurance Checks": {
    description: "Pre-submission verification - any issue here = disqualification risk",
    link: null,
    steps: [
      { id: "step_qa_seals", label: "All Documents Stamped with Company Seal", help: "Official company stamp on every document" },
      { id: "step_qa_expiry", label: "All Certificates Valid (Not Expired)", help: "Check expiry dates on all certificates" },
      { id: "step_qa_searchable", label: "All Documents in Searchable PDF Format", help: "NOT scanned images - must be text-searchable" },
      { id: "step_qa_electronic", label: "All Forms Filled Electronically", help: "No handwritten entries allowed" },
      { id: "step_qa_complete", label: "All Required Fields Completed", help: "No blank mandatory fields" },
      { id: "step_qa_consistent", label: "Information Consistent Across All Forms", help: "Same data everywhere - no contradictions" },
      { id: "step_qa_concise", label: "Only Requested Information Included", help: "No extra materials - concise with clear illustrations" },
    ],
  },
  "8. Submission via Etimad": {
    description: "MUST submit via Etimad platform before 24 December 2025 - no other method accepted",
    link: "https://portal.etimad.sa",
    steps: [
      { id: "step_compile_package", label: "Compile All Documents into Single Package", help: "Organize all documents as required by Etimad" },
      { id: "step_final_review", label: "Final Review of All Materials", help: "Last check before submission" },
      { id: "step_test_upload", label: "Test Upload Capability", help: "Verify you can upload files - check size limits" },
      { id: "step_submit", label: "Upload Complete Application Package", help: "Submit via Etimad before deadline" },
      { id: "step_verify_submit", label: "Verify Successful Submission", help: "Confirm upload completed successfully" },
      { id: "step_save_receipt", label: "Save Confirmation/Receipt", help: "Screenshot and save submission confirmation" },
    ],
  },
  "9. Post-Submission": {
    description: "After submission - monitor and respond to any queries",
    link: null,
    steps: [
      { id: "step_monitor_queries", label: "Monitor Etimad for Queries", help: "Check regularly for any clarification requests" },
      { id: "step_await_results", label: "Await Qualification Results", help: "Need 70% minimum score to proceed to RFP stage" },
    ],
  },
};

export default function GdacTenderPage() {
  const router = useRouter();
  const [tracker, setTracker] = useState<TrackerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(Object.keys(REQUIRED_STEPS)));

  // Calculate countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = DEADLINE.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch tracker data on mount
  useEffect(() => {
    fetchTracker();
  }, []);

  const fetchTracker = async () => {
    try {
      const response = await fetch("/api/gdac-tender");
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        if (response.status === 403) {
          setError("Access denied. Manager role required.");
          return;
        }
        throw new Error("Failed to fetch tracker");
      }
      const data = await response.json();
      setTracker(data.tracker);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tracker");
    } finally {
      setLoading(false);
    }
  };

  const updateField = useCallback(
    async (field: string, value: string | number | null) => {
      if (!tracker) return;

      setSaving(true);
      try {
        const response = await fetch("/api/gdac-tender", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: tracker.id, [field]: value }),
        });

        if (!response.ok) throw new Error("Failed to update");

        const data = await response.json();
        setTracker(data.tracker);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      } finally {
        setSaving(false);
      }
    },
    [tracker]
  );

  // Calculate progress
  const calculateProgress = () => {
    if (!tracker) return { overall: 0, byCategory: {} as Record<string, { completed: number; total: number }> };

    const byCategory: Record<string, { completed: number; total: number }> = {};
    let totalCompleted = 0;
    let totalSteps = 0;

    Object.entries(REQUIRED_STEPS).forEach(([category, data]) => {
      const categoryCompleted = data.steps.filter(step => tracker[step.id] === "complete").length;
      byCategory[category] = { completed: categoryCompleted, total: data.steps.length };
      totalCompleted += categoryCompleted;
      totalSteps += data.steps.length;
    });

    return {
      overall: totalSteps > 0 ? Math.round((totalCompleted / totalSteps) * 100) : 0,
      byCategory,
    };
  };

  const progress = calculateProgress();

  // Countdown color
  const getCountdownColor = () => {
    if (countdown.days < 1) return "bg-red-600 animate-pulse";
    if (countdown.days < 7) return "bg-red-500";
    if (countdown.days < 14) return "bg-yellow-500";
    return "bg-green-500";
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tracker...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg">Error</h2>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GDAC-SA Tender Tracker</h1>
              <p className="text-sm text-gray-500">
                RFQ #251140007625 | Saudi Geological Survey | Min 70% to qualify
              </p>
            </div>

            {/* Countdown Timer */}
            <div className={`${getCountdownColor()} text-white px-6 py-3 rounded-lg`}>
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide opacity-80">Deadline: 24 Dec 2025</div>
                <div className="text-2xl font-bold">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Overall Progress:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 rounded-full h-3 transition-all duration-500"
                    style={{ width: `${progress.overall}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">{progress.overall}%</span>
              </div>
            </div>
            {saving && (
              <span className="text-sm text-blue-600 animate-pulse">Saving...</span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-1 overflow-x-auto py-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "steps", label: "Required Steps" },
              { id: "notes", label: "Notes & Contacts" },
              { id: "review", label: "Review Responses", href: "/gdac-tender/review" },
            ].map((tab) => (
              'href' in tab && tab.href ? (
                <a
                  key={tab.id}
                  href={tab.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  {tab.label}
                </a>
              ) : (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              )
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-6">
            {/* Tender Info */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Tender Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Reference:</span>
                  <span className="ml-2 font-medium">RFQ #251140007625</span>
                </div>
                <div>
                  <span className="text-gray-500">Client:</span>
                  <span className="ml-2 font-medium">Saudi Geological Survey (SGS)</span>
                </div>
                <div>
                  <span className="text-gray-500">Project:</span>
                  <span className="ml-2 font-medium">GDAC-SA Advanced Analytics Platform</span>
                </div>
                <div>
                  <span className="text-gray-500">Submission:</span>
                  <span className="ml-2 font-medium">Etimad Platform Only</span>
                </div>
                <div>
                  <span className="text-gray-500">Minimum Score:</span>
                  <span className="ml-2 font-medium">70% to qualify for RFP stage</span>
                </div>
                <div>
                  <span className="text-gray-500">Technical Contact:</span>
                  <span className="ml-2 font-medium">TI-RGP@sgs.gov.sa</span>
                </div>
              </div>
            </div>

            {/* Scoring Breakdown */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Evaluation Criteria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Technical/Administrative (60%)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Previous Experience</span><span className="font-medium">40%</span></div>
                    <div className="flex justify-between"><span>Existing Obligations</span><span className="font-medium">20%</span></div>
                    <div className="flex justify-between"><span>Human Resources</span><span className="font-medium">20%</span></div>
                    <div className="flex justify-between"><span>Quality Assurance</span><span className="font-medium">10%</span></div>
                    <div className="flex justify-between"><span>HSE</span><span className="font-medium">10%</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Financial (40%)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Cash Ratio</span><span className="font-medium">40%</span></div>
                    <div className="flex justify-between"><span>Current Ratio</span><span className="font-medium">30%</span></div>
                    <div className="flex justify-between"><span>Quick Ratio</span><span className="font-medium">30%</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Progress */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Progress by Category</h2>
              <div className="space-y-3">
                {Object.entries(REQUIRED_STEPS).map(([category, data]) => {
                  const catProgress = progress.byCategory[category] || { completed: 0, total: 0 };
                  const pct = catProgress.total > 0 ? Math.round((catProgress.completed / catProgress.total) * 100) : 0;
                  return (
                    <div
                      key={category}
                      className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      onClick={() => setActiveSection("steps")}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{category}</span>
                        <span className="text-sm text-gray-500">
                          {catProgress.completed}/{catProgress.total} ({pct}%)
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className={`rounded-full h-2 transition-all ${pct === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Contacts */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Key Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">SGS Technical</h3>
                  <p className="text-sm text-gray-600 mt-1">Dr. Wadee Kashghari</p>
                  <p className="text-sm text-blue-600">TI-RGP@sgs.gov.sa</p>
                  <p className="text-sm text-gray-500">+966-2 6195000 ext. 5222</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">Etimad Support (24/7)</h3>
                  <p className="text-sm text-gray-600 mt-1">Phone: 19990 (local) | +966-11-515-2666</p>
                  <p className="text-sm text-blue-600">ecare@etimad.sa</p>
                  <a href="https://portal.etimad.sa" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">portal.etimad.sa</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Required Steps Section */}
        {activeSection === "steps" && tracker && (
          <div className="space-y-4">
            {Object.entries(REQUIRED_STEPS).map(([category, data]) => {
              const catProgress = progress.byCategory[category] || { completed: 0, total: 0 };
              const pct = catProgress.total > 0 ? Math.round((catProgress.completed / catProgress.total) * 100) : 0;
              const isExpanded = expandedCategories.has(category);

              return (
                <div key={category} className="bg-white rounded-lg border overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div className="text-left min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                        <p className="text-sm text-gray-500 truncate">{data.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <span className={`text-sm font-medium ${pct === 100 ? 'text-green-600' : 'text-gray-500'}`}>
                        {catProgress.completed}/{catProgress.total}
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`rounded-full h-2 transition-all ${pct === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  </button>

                  {/* Category Description & Link */}
                  {isExpanded && data.link && (
                    <div className="px-6 py-2 bg-blue-50 border-t border-b">
                      <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {data.link}
                      </a>
                    </div>
                  )}

                  {/* Steps List */}
                  {isExpanded && (
                    <div className="border-t">
                      {data.steps.map((step, idx) => (
                        <div
                          key={step.id}
                          className={`flex items-center justify-between px-6 py-3 ${idx !== data.steps.length - 1 ? 'border-b' : ''}`}
                        >
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2">
                              {tracker[step.id] === "complete" ? (
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : tracker[step.id] === "blocked" ? (
                                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              ) : tracker[step.id] === "in_progress" ? (
                                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                              )}
                              <span className={`font-medium text-sm ${tracker[step.id] === "complete" ? 'text-green-700' : 'text-gray-700'}`}>
                                {step.label}
                                {'required' in step && step.required === false && (
                                  <span className="ml-2 text-xs text-gray-400">(if applicable)</span>
                                )}
                              </span>
                            </div>
                            <div className="ml-7 mt-1 flex items-center gap-2">
                              {step.help && (
                                <p className="text-xs text-gray-500">{step.help}</p>
                              )}
                              {'link' in step && step.link && (
                                <a
                                  href={step.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  Link
                                </a>
                              )}
                            </div>
                          </div>
                          <select
                            value={(tracker[step.id] as string) || "not_started"}
                            onChange={(e) => updateField(step.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium min-w-[120px] ${
                              STEP_STATUS_OPTIONS.find(o => o.value === (tracker[step.id] || "not_started"))?.color || "bg-gray-200"
                            }`}
                          >
                            {STEP_STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Disqualification Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Automatic Disqualification If:
              </h3>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
                <li>Missing required documents</li>
                <li>Expired certificates</li>
                <li>Incomplete forms</li>
                <li>Late submission (after 24/12/2025)</li>
                <li>Incorrect or inconsistent information</li>
                <li>Non-searchable PDF documents</li>
                <li>Submission not via Etimad platform</li>
              </ul>
            </div>
          </div>
        )}

        {/* Notes Section */}
        {activeSection === "notes" && tracker && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">SGS Technical Contact Notes</h2>
              <p className="text-sm text-gray-500 mb-3">
                Dr. Wadee Kashghari - TI-RGP@sgs.gov.sa - +966-2 6195000 ext. 5222
              </p>
              <textarea
                value={(tracker.sgsContactNotes as string) || ""}
                onChange={(e) => updateField("sgsContactNotes", e.target.value)}
                placeholder="Record any communications with SGS..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Etimad Support Contact Notes</h2>
              <p className="text-sm text-gray-500 mb-3">
                19990 (local) | +966-11-515-2666 (intl) | ecare@etimad.sa | <a href="https://portal.etimad.sa" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">portal.etimad.sa</a>
              </p>
              <textarea
                value={(tracker.etimadContactNotes as string) || ""}
                onChange={(e) => updateField("etimadContactNotes", e.target.value)}
                placeholder="Record any communications with Etimad support..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Internal Notes & Issues</h2>
              <textarea
                value={(tracker.internalNotes as string) || ""}
                onChange={(e) => updateField("internalNotes", e.target.value)}
                placeholder="Document any issues, blockers, or important notes for team coordination..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Lessons Learned</h2>
              <textarea
                value={(tracker.lessonsLearned as string) || ""}
                onChange={(e) => updateField("lessonsLearned", e.target.value)}
                placeholder="Document lessons learned for future tenders (complete after submission)..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
