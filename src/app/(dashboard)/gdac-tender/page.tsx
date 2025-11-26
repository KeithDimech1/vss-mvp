"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Types
interface TrackerData {
  id: string;
  // Step tracking - all steps stored as JSON strings in generic fields
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

// All required steps organized by category
const REQUIRED_STEPS = {
  "1. Saudi Entity & Registration": [
    { id: "step_saudi_entity", label: "Establish Saudi Entity or Partner", help: "Foreign companies cannot register on Etimad directly - need Saudi CR" },
    { id: "step_commercial_reg", label: "Obtain Commercial Registration (CR)", help: "From Ministry of Commerce - required for Etimad" },
    { id: "step_etimad_register", label: "Register on Etimad Platform", help: "portal.etimad.sa - requires Saudi CR" },
    { id: "step_etimad_verify", label: "Complete Etimad Verification", help: "May take 3-5 business days" },
    { id: "step_tender_access", label: "Access Tender on Etimad", help: "RFQ #251140007625 - verify you can see and download documents" },
  ],
  "2. Mandatory Certificates": [
    { id: "step_zakat_cert", label: "Zakat and Income Certificate", help: "From GAZT (Zakat, Tax & Customs Authority) - must be valid" },
    { id: "step_social_insurance", label: "Social Insurance Certificate (GOSI)", help: "From General Organization for Social Insurance" },
    { id: "step_chamber_commerce", label: "Chamber of Commerce Membership", help: "Active membership certificate" },
    { id: "step_saudization", label: "Saudization Certificate (Nitaqat/Taqat)", help: "From Ministry of Human Resources - shows compliance" },
    { id: "step_vat_cert", label: "VAT Registration Certificate", help: "From GAZT - if VAT registered" },
  ],
  "3. Technical Certificates": [
    { id: "step_iso_9001", label: "ISO 9001 Quality Management", help: "Quality Management System certification" },
    { id: "step_iso_27001", label: "ISO 27001 Information Security", help: "Information Security Management - important for data projects" },
    { id: "step_hse_cert", label: "HSE Certificate", help: "Health, Safety & Environment certification" },
  ],
  "4. Financial Documents": [
    { id: "step_fin_year0", label: "Audited Financial Statements - Year 2024", help: "Most recent fiscal year - audited by licensed auditor" },
    { id: "step_fin_year1", label: "Audited Financial Statements - Year 2023", help: "Previous fiscal year" },
    { id: "step_fin_year2", label: "Audited Financial Statements - Year 2022", help: "Two years prior" },
    { id: "step_bank_letter", label: "Bank Solvency Letter", help: "Letter from bank confirming financial standing" },
    { id: "step_calc_ratios", label: "Calculate Financial Ratios", help: "Cash ratio, current ratio, quick ratio - 40% of financial score" },
  ],
  "5. Technical Capability Evidence": [
    { id: "step_company_profile", label: "Company Profile Document", help: "Comprehensive company overview, history, capabilities" },
    { id: "step_org_chart", label: "Organization Chart", help: "Current organizational structure" },
    { id: "step_cv_admin", label: "CVs - Administrative Staff (10 people)", help: "Key administrative and management personnel" },
    { id: "step_cv_technical", label: "CVs - Technical Staff (20 people)", help: "AI/ML, Data Science, Geoscience, GIS specialists" },
    { id: "step_project1", label: "Similar Project Reference #1", help: "Completed project with client reference letter" },
    { id: "step_project2", label: "Similar Project Reference #2", help: "Completed project with client reference letter" },
    { id: "step_project3", label: "Similar Project Reference #3", help: "Completed project with client reference letter" },
  ],
  "6. Etimad Forms (Download & Complete)": [
    { id: "step_form_applicant", label: "Form: Applicant Information", help: "Download from Etimad, complete electronically" },
    { id: "step_form_tech_cap", label: "Form: Technical & Administrative Capabilities", help: "Demonstrates technical competency" },
    { id: "step_form_admin_staff", label: "Form: Administrative Staff Experience", help: "10 key personnel details" },
    { id: "step_form_prof_staff", label: "Form: Professional Staff Experience", help: "20 technical personnel details" },
    { id: "step_form_project1", label: "Form: Similar Project #1", help: "Project details matching tender requirements" },
    { id: "step_form_project2", label: "Form: Similar Project #2", help: "Project details matching tender requirements" },
    { id: "step_form_project3", label: "Form: Similar Project #3", help: "Project details matching tender requirements" },
    { id: "step_form_financial", label: "Form: Financial Capacity Criteria", help: "Financial ratios and capacity declaration" },
  ],
  "7. Consortium Documents (If Applicable)": [
    { id: "step_alliance_agreement", label: "Alliance/Consortium Agreement", help: "Legally binding agreement between partners" },
    { id: "step_partner_auth", label: "Partner Authorization Letters", help: "Each partner authorizes lead bidder" },
    { id: "step_partner_certs", label: "Partner Certificates & Documents", help: "All partners need same certificates as lead" },
  ],
  "8. Quality Assurance Checks": [
    { id: "step_qa_expiry", label: "QA: Verify No Expired Certificates", help: "All certs must be valid through tender period" },
    { id: "step_qa_sealed", label: "QA: All Documents Company-Sealed", help: "Official company stamp/seal on all docs" },
    { id: "step_qa_pdf", label: "QA: PDFs are Searchable", help: "Not scanned images - must be text-searchable" },
    { id: "step_qa_electronic", label: "QA: Forms Electronically Completed", help: "No handwritten entries" },
    { id: "step_qa_blanks", label: "QA: No Blank Required Fields", help: "All mandatory fields completed" },
    { id: "step_qa_consistent", label: "QA: Information Consistent", help: "Same info across all forms and documents" },
  ],
  "9. Internal Reviews": [
    { id: "step_review_technical", label: "Technical Review Complete", help: "Technical team signs off on capability claims" },
    { id: "step_review_legal", label: "Legal Review Complete", help: "Legal team reviews all commitments" },
    { id: "step_review_finance", label: "Finance Review Complete", help: "Finance confirms all financial data" },
    { id: "step_review_management", label: "Management Approval", help: "Final management sign-off to proceed" },
  ],
  "10. Submission Preparation": [
    { id: "step_compile_package", label: "Compile Final Document Package", help: "All documents in correct order per Etimad requirements" },
    { id: "step_test_upload", label: "Test Upload to Etimad", help: "Try uploading before deadline - verify file sizes work" },
    { id: "step_backup_files", label: "Backup All Files", help: "Save to SharePoint/Google Drive as backup" },
  ],
  "11. Final Submission": [
    { id: "step_submit_etimad", label: "Submit on Etimad Platform", help: "Final submission before 24 Dec 2025 deadline" },
    { id: "step_get_confirmation", label: "Obtain Confirmation Number", help: "Save Etimad confirmation/receipt number" },
    { id: "step_screenshot", label: "Screenshot Submission Confirmation", help: "Visual proof of successful submission" },
    { id: "step_notify_team", label: "Notify Team of Submission", help: "Inform all stakeholders submission complete" },
  ],
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

    Object.entries(REQUIRED_STEPS).forEach(([category, steps]) => {
      const categoryCompleted = steps.filter(step => tracker[step.id] === "complete").length;
      byCategory[category] = { completed: categoryCompleted, total: steps.length };
      totalCompleted += categoryCompleted;
      totalSteps += steps.length;
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
                RFQ #251140007625 | Saudi Geological Survey
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
            ].map((tab) => (
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
              </div>
            </div>

            {/* Category Progress */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Progress by Category</h2>
              <div className="space-y-3">
                {Object.entries(REQUIRED_STEPS).map(([category]) => {
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
                  <p className="text-sm text-gray-500">@etimadsa on X</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Required Steps Section */}
        {activeSection === "steps" && tracker && (
          <div className="space-y-4">
            {Object.entries(REQUIRED_STEPS).map(([category, steps]) => {
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
                    <div className="flex items-center gap-4">
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                    </div>
                    <div className="flex items-center gap-3">
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

                  {/* Steps List */}
                  {isExpanded && (
                    <div className="border-t">
                      {steps.map((step, idx) => (
                        <div
                          key={step.id}
                          className={`flex items-center justify-between px-6 py-3 ${idx !== steps.length - 1 ? 'border-b' : ''}`}
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
                              </span>
                            </div>
                            {step.help && (
                              <p className="text-xs text-gray-500 mt-1 ml-7">{step.help}</p>
                            )}
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
                19990 (local) | +966-11-515-2666 (intl) | ecare@etimad.sa
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
