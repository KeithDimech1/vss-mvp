"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Types
interface TrackerData {
  id: string;
  applicationStructure: string | null;
  consortiumPartners: string | null;
  saudiEntityStatus: string | null;
  etimadRegistration: string | null;
  goNoGoDecision: string | null;
  goNoGoRationale: string | null;
  commercialRegCert: string | null;
  zakatCert: string | null;
  vatCert: string | null;
  socialInsuranceCert: string | null;
  chamberCommerceCert: string | null;
  investmentLicense: string | null;
  saudizationCert: string | null;
  qualityCert: string | null;
  hseCert: string | null;
  allianceAgreement: string | null;
  financialYear0: string | null;
  financialYear1: string | null;
  financialYear2: string | null;
  cashRatio: number | null;
  currentRatio: number | null;
  quickRatio: number | null;
  applicantInfoForm: string | null;
  techCapabilitiesForm: string | null;
  adminStaffForm: string | null;
  professionalStaffForm: string | null;
  project1Form: string | null;
  project2Form: string | null;
  project3Form: string | null;
  financialCapacityForm: string | null;
  certsValidCheck: string | null;
  docsSealedCheck: string | null;
  pdfsSearchableCheck: string | null;
  formsElectronicCheck: string | null;
  noBlankFieldsCheck: string | null;
  consistencyCheck: string | null;
  managementReview: string | null;
  legalReview: string | null;
  financeReview: string | null;
  packageCompiled: string | null;
  etimadTestUpload: string | null;
  submissionStatus: string | null;
  submissionReference: string | null;
  submissionDateTime: string | null;
  screenshotSaved: string | null;
  sgsContactNotes: string | null;
  etimadContactNotes: string | null;
  internalNotes: string | null;
  lessonsLearned: string | null;
  updatedAt: string;
}

// Deadline: 24 December 2025
const DEADLINE = new Date("2025-12-24T23:59:59+03:00"); // Saudi Arabia timezone UTC+3

// Status options
const DOCUMENT_STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started", color: "bg-gray-200 text-gray-700" },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-200 text-yellow-800" },
  { value: "obtained", label: "Obtained", color: "bg-blue-200 text-blue-800" },
  { value: "uploaded", label: "Uploaded", color: "bg-green-200 text-green-800" },
];

const FORM_STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started", color: "bg-gray-200 text-gray-700" },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-200 text-yellow-800" },
  { value: "complete", label: "Complete", color: "bg-blue-200 text-blue-800" },
  { value: "reviewed", label: "Reviewed", color: "bg-purple-200 text-purple-800" },
  { value: "sealed", label: "Sealed", color: "bg-green-200 text-green-800" },
];

const QA_STATUS_OPTIONS = [
  { value: "not_checked", label: "Not Checked", color: "bg-gray-200 text-gray-700" },
  { value: "issues_found", label: "Issues Found", color: "bg-red-200 text-red-800" },
  { value: "complete", label: "Complete", color: "bg-green-200 text-green-800" },
];

const REVIEW_STATUS_OPTIONS = [
  { value: "not_scheduled", label: "Not Scheduled", color: "bg-gray-200 text-gray-700" },
  { value: "scheduled", label: "Scheduled", color: "bg-yellow-200 text-yellow-800" },
  { value: "in_progress", label: "In Progress", color: "bg-blue-200 text-blue-800" },
  { value: "approved", label: "Approved", color: "bg-green-200 text-green-800" },
];

export default function GdacTenderPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [tracker, setTracker] = useState<TrackerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  // Fetch tracker data
  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (authStatus === "authenticated") {
      fetchTracker();
    }
  }, [authStatus, router]);

  const fetchTracker = async () => {
    try {
      const response = await fetch("/api/gdac-tender");
      if (!response.ok) {
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
    if (!tracker) return { overall: 0, sections: {} };

    const sections: Record<string, { completed: number; total: number }> = {
      strategy: { completed: 0, total: 5 },
      legalDocs: { completed: 0, total: 10 },
      financialDocs: { completed: 0, total: 6 },
      forms: { completed: 0, total: 8 },
      qa: { completed: 0, total: 9 },
      submission: { completed: 0, total: 5 },
    };

    // Strategy
    if (tracker.applicationStructure) sections.strategy.completed++;
    if (tracker.saudiEntityStatus) sections.strategy.completed++;
    if (tracker.etimadRegistration) sections.strategy.completed++;
    if (tracker.goNoGoDecision) sections.strategy.completed++;
    if (tracker.goNoGoRationale) sections.strategy.completed++;

    // Legal Documents
    const legalFields = [
      "commercialRegCert", "zakatCert", "vatCert", "socialInsuranceCert",
      "chamberCommerceCert", "investmentLicense", "saudizationCert",
      "qualityCert", "hseCert", "allianceAgreement"
    ];
    legalFields.forEach((field) => {
      if (tracker[field as keyof TrackerData] === "uploaded") sections.legalDocs.completed++;
    });

    // Financial
    if (tracker.financialYear0 === "uploaded") sections.financialDocs.completed++;
    if (tracker.financialYear1 === "uploaded") sections.financialDocs.completed++;
    if (tracker.financialYear2 === "uploaded") sections.financialDocs.completed++;
    if (tracker.cashRatio) sections.financialDocs.completed++;
    if (tracker.currentRatio) sections.financialDocs.completed++;
    if (tracker.quickRatio) sections.financialDocs.completed++;

    // Forms
    const formFields = [
      "applicantInfoForm", "techCapabilitiesForm", "adminStaffForm",
      "professionalStaffForm", "project1Form", "project2Form",
      "project3Form", "financialCapacityForm"
    ];
    formFields.forEach((field) => {
      const val = tracker[field as keyof TrackerData];
      if (val === "sealed" || val === "reviewed") sections.forms.completed++;
    });

    // QA
    const qaFields = [
      "certsValidCheck", "docsSealedCheck", "pdfsSearchableCheck",
      "formsElectronicCheck", "noBlankFieldsCheck", "consistencyCheck",
      "managementReview", "legalReview", "financeReview"
    ];
    qaFields.forEach((field) => {
      const val = tracker[field as keyof TrackerData];
      if (val === "complete" || val === "approved") sections.qa.completed++;
    });

    // Submission
    if (tracker.packageCompiled === "complete") sections.submission.completed++;
    if (tracker.etimadTestUpload === "successful") sections.submission.completed++;
    if (tracker.submissionStatus === "confirmed") sections.submission.completed += 2;
    if (tracker.screenshotSaved === "saved") sections.submission.completed++;

    const totalCompleted = Object.values(sections).reduce((a, b) => a + b.completed, 0);
    const totalItems = Object.values(sections).reduce((a, b) => a + b.total, 0);

    return {
      overall: Math.round((totalCompleted / totalItems) * 100),
      sections,
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

  // Current phase
  const getCurrentPhase = () => {
    const now = new Date();
    const startDate = new Date("2025-11-26");
    const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceStart < 7) return { week: 1, name: "Strategy & Registration" };
    if (daysSinceStart < 14) return { week: 2, name: "Document Collection" };
    if (daysSinceStart < 21) return { week: 3, name: "Form Completion" };
    return { week: 4, name: "QA & Submission" };
  };

  const phase = getCurrentPhase();

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

          {/* Phase & Progress */}
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <span className="text-blue-800 font-medium">
                Week {phase.week}: {phase.name}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
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
              { id: "strategy", label: "Strategy" },
              { id: "legal", label: "Legal Docs" },
              { id: "financial", label: "Financial" },
              { id: "forms", label: "Forms" },
              { id: "qa", label: "QA" },
              { id: "submission", label: "Submission" },
              { id: "notes", label: "Notes" },
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

            {/* Section Progress */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Section Progress</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { key: "strategy", label: "Strategy", icon: "1" },
                  { key: "legalDocs", label: "Legal Docs", icon: "2" },
                  { key: "financialDocs", label: "Financial", icon: "3" },
                  { key: "forms", label: "Forms", icon: "4" },
                  { key: "qa", label: "QA", icon: "5" },
                  { key: "submission", label: "Submission", icon: "6" },
                ].map((section) => {
                  const sectionProgress = progress.sections[section.key as keyof typeof progress.sections];
                  const pct = sectionProgress
                    ? Math.round((sectionProgress.completed / sectionProgress.total) * 100)
                    : 0;
                  return (
                    <div
                      key={section.key}
                      className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setActiveSection(
                          section.key === "legalDocs" ? "legal" :
                          section.key === "financialDocs" ? "financial" : section.key
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                          {section.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{section.label}</div>
                          <div className="text-xs text-gray-500">
                            {sectionProgress?.completed || 0}/{sectionProgress?.total || 0}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-blue-600">{pct}%</div>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2 transition-all"
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

        {/* Strategy Section */}
        {activeSection === "strategy" && tracker && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-6">Strategic Decisions (Week 1)</h2>
            <div className="space-y-6">
              {/* Application Structure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Structure *
                </label>
                <div className="flex gap-4">
                  {[
                    { value: "solo", label: "Solo Bid (single entity)" },
                    { value: "consortium", label: "Consortium/Alliance" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                        tracker.applicationStructure === opt.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="applicationStructure"
                        value={opt.value}
                        checked={tracker.applicationStructure === opt.value}
                        onChange={(e) => updateField("applicationStructure", e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consortium Partners (conditional) */}
              {tracker.applicationStructure === "consortium" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consortium Partners
                  </label>
                  <textarea
                    value={tracker.consortiumPartners || ""}
                    onChange={(e) => updateField("consortiumPartners", e.target.value)}
                    placeholder="One partner per line with role description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Saudi Entity Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saudi Entity Status *
                </label>
                <select
                  value={tracker.saudiEntityStatus || ""}
                  onChange={(e) => updateField("saudiEntityStatus", e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="existing_cr">Existing Saudi entity (CR registered)</option>
                  <option value="need_entity">Need to establish Saudi entity</option>
                  <option value="have_partner">Have Saudi partner/JV</option>
                  <option value="need_partner">Need to find Saudi partner</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Foreign companies cannot register on Etimad directly
                </p>
              </div>

              {/* Etimad Registration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etimad Platform Registration *
                </label>
                <select
                  value={tracker.etimadRegistration || ""}
                  onChange={(e) => updateField("etimadRegistration", e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="registered">Already registered and verified</option>
                  <option value="in_progress">Registration in progress</option>
                  <option value="not_started">Not yet started</option>
                  <option value="need_partner">Need Saudi partner for registration</option>
                </select>
              </div>

              {/* Go/No-Go Decision */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Go/No-Go Decision *
                </label>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { value: "go", label: "GO - Proceeding", color: "border-green-500 bg-green-50" },
                    { value: "no_go", label: "NO-GO - Not proceeding", color: "border-red-500 bg-red-50" },
                    { value: "conditional", label: "CONDITIONAL", color: "border-yellow-500 bg-yellow-50" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                        tracker.goNoGoDecision === opt.value ? opt.color : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="goNoGoDecision"
                        value={opt.value}
                        checked={tracker.goNoGoDecision === opt.value}
                        onChange={(e) => updateField("goNoGoDecision", e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rationale */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Go/No-Go Rationale *
                </label>
                <textarea
                  value={tracker.goNoGoRationale || ""}
                  onChange={(e) => updateField("goNoGoRationale", e.target.value)}
                  placeholder="Document capability assessment, financial capacity, strategic fit..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Legal Documents Section */}
        {activeSection === "legal" && tracker && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-6">Legal Documents (Week 2)</h2>
            <div className="space-y-4">
              {[
                { field: "commercialRegCert", label: "Commercial Registration Certificate", required: true },
                { field: "zakatCert", label: "Zakat and Income Certificate", required: true },
                { field: "vatCert", label: "VAT Certificate", required: false, help: "Required only if VAT registered" },
                { field: "socialInsuranceCert", label: "Social Insurance Certificate", required: true },
                { field: "chamberCommerceCert", label: "Chamber of Commerce Certificate", required: true },
                { field: "investmentLicense", label: "Investment License (Foreign Bidders)", required: false, help: "From Ministry of Investment (MISA)" },
                { field: "saudizationCert", label: "Saudization Certificate (Taqat)", required: true },
                { field: "qualityCert", label: "Quality Certificate (ISO 9001)", required: true },
                { field: "hseCert", label: "HSE Certificate", required: true },
                { field: "allianceAgreement", label: "Alliance Agreement", required: false, conditional: tracker.applicationStructure === "consortium" },
              ].filter(doc => !doc.conditional || doc.conditional).map((doc) => (
                <div key={doc.field} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <span className="font-medium text-sm">
                      {doc.label} {doc.required && <span className="text-red-500">*</span>}
                    </span>
                    {doc.help && <p className="text-xs text-gray-500">{doc.help}</p>}
                  </div>
                  <select
                    value={tracker[doc.field as keyof TrackerData] as string || "not_started"}
                    onChange={(e) => updateField(doc.field, e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      DOCUMENT_STATUS_OPTIONS.find(
                        (o) => o.value === (tracker[doc.field as keyof TrackerData] || "not_started")
                      )?.color || "bg-gray-200"
                    }`}
                  >
                    {DOCUMENT_STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Documents Section */}
        {activeSection === "financial" && tracker && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Financial Documents (Week 2)</h2>
              <div className="space-y-4">
                {[
                  { field: "financialYear0", label: "Financial Statements Year 0 (Current)" },
                  { field: "financialYear1", label: "Financial Statements Year -1" },
                  { field: "financialYear2", label: "Financial Statements Year -2" },
                ].map((doc) => (
                  <div key={doc.field} className="flex items-center justify-between py-3 border-b last:border-0">
                    <span className="font-medium text-sm">{doc.label} <span className="text-red-500">*</span></span>
                    <select
                      value={tracker[doc.field as keyof TrackerData] as string || "not_started"}
                      onChange={(e) => updateField(doc.field, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        DOCUMENT_STATUS_OPTIONS.find(
                          (o) => o.value === (tracker[doc.field as keyof TrackerData] || "not_started")
                        )?.color || "bg-gray-200"
                      }`}
                    >
                      {DOCUMENT_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Financial Ratios</h2>
              <p className="text-sm text-gray-500 mb-4">
                These ratios contribute to 40% of the financial score
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cash Ratio (40% weight)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={tracker.cashRatio || ""}
                    onChange={(e) => updateField("cashRatio", e.target.value ? parseFloat(e.target.value) : null)}
                    placeholder="Cash / Current Liabilities"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Higher is better</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Ratio (30% weight)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={tracker.currentRatio || ""}
                    onChange={(e) => updateField("currentRatio", e.target.value ? parseFloat(e.target.value) : null)}
                    placeholder="Current Assets / Current Liabilities"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Above 1.5 is good</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Ratio (30% weight)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={tracker.quickRatio || ""}
                    onChange={(e) => updateField("quickRatio", e.target.value ? parseFloat(e.target.value) : null)}
                    placeholder="(Cash + Receivables) / Current Liabilities"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Shows short-term liquidity</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Forms Section */}
        {activeSection === "forms" && tracker && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-6">Application Forms (Week 3)</h2>
            <div className="space-y-4">
              {[
                { field: "applicantInfoForm", label: "Applicant Information Form" },
                { field: "techCapabilitiesForm", label: "Technical & Administrative Capabilities Form" },
                { field: "adminStaffForm", label: "Administrative Staff Experience Form (10 people)" },
                { field: "professionalStaffForm", label: "Professional Staff Experience Form (20 people)", help: "AI/ML, Data Science, Geoscience, GIS specialists" },
                { field: "project1Form", label: "Similar Projects Form - Project 1" },
                { field: "project2Form", label: "Similar Projects Form - Project 2" },
                { field: "project3Form", label: "Similar Projects Form - Project 3" },
                { field: "financialCapacityForm", label: "Financial Capacity Criteria Form" },
              ].map((doc) => (
                <div key={doc.field} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <span className="font-medium text-sm">{doc.label} <span className="text-red-500">*</span></span>
                    {doc.help && <p className="text-xs text-gray-500">{doc.help}</p>}
                  </div>
                  <select
                    value={tracker[doc.field as keyof TrackerData] as string || "not_started"}
                    onChange={(e) => updateField(doc.field, e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      FORM_STATUS_OPTIONS.find(
                        (o) => o.value === (tracker[doc.field as keyof TrackerData] || "not_started")
                      )?.color || "bg-gray-200"
                    }`}
                  >
                    {FORM_STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QA Section */}
        {activeSection === "qa" && tracker && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Document Quality Checks (Week 4)</h2>
              <div className="space-y-4">
                {[
                  { field: "certsValidCheck", label: "All Certificates Valid (Not Expired)" },
                  { field: "docsSealedCheck", label: "All Documents Company-Sealed" },
                  { field: "pdfsSearchableCheck", label: "All PDFs Searchable Format" },
                  { field: "formsElectronicCheck", label: "All Forms Electronically Completed" },
                  { field: "noBlankFieldsCheck", label: "No Blank Required Fields" },
                  { field: "consistencyCheck", label: "Information Consistent Across Forms" },
                ].map((doc) => (
                  <div key={doc.field} className="flex items-center justify-between py-3 border-b last:border-0">
                    <span className="font-medium text-sm">{doc.label} <span className="text-red-500">*</span></span>
                    <select
                      value={tracker[doc.field as keyof TrackerData] as string || "not_checked"}
                      onChange={(e) => updateField(doc.field, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        QA_STATUS_OPTIONS.find(
                          (o) => o.value === (tracker[doc.field as keyof TrackerData] || "not_checked")
                        )?.color || "bg-gray-200"
                      }`}
                    >
                      {QA_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Internal Reviews</h2>
              <div className="space-y-4">
                {[
                  { field: "managementReview", label: "Management Review" },
                  { field: "legalReview", label: "Legal Review" },
                  { field: "financeReview", label: "Finance Review" },
                ].map((doc) => (
                  <div key={doc.field} className="flex items-center justify-between py-3 border-b last:border-0">
                    <span className="font-medium text-sm">{doc.label} <span className="text-red-500">*</span></span>
                    <select
                      value={tracker[doc.field as keyof TrackerData] as string || "not_scheduled"}
                      onChange={(e) => updateField(doc.field, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        REVIEW_STATUS_OPTIONS.find(
                          (o) => o.value === (tracker[doc.field as keyof TrackerData] || "not_scheduled")
                        )?.color || "bg-gray-200"
                      }`}
                    >
                      {REVIEW_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submission Section */}
        {activeSection === "submission" && tracker && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Submission Status (Week 4)</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="font-medium text-sm">Final Document Package Compiled <span className="text-red-500">*</span></span>
                  <select
                    value={tracker.packageCompiled || "not_started"}
                    onChange={(e) => updateField("packageCompiled", e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-200"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="font-medium text-sm">Etimad Test Upload <span className="text-red-500">*</span></span>
                  <select
                    value={tracker.etimadTestUpload || "not_tested"}
                    onChange={(e) => updateField("etimadTestUpload", e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-200"
                  >
                    <option value="not_tested">Not Tested</option>
                    <option value="failed">Test Failed - Troubleshooting</option>
                    <option value="successful">Test Successful</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="font-medium text-sm">Final Submission Status <span className="text-red-500">*</span></span>
                  <select
                    value={tracker.submissionStatus || "not_submitted"}
                    onChange={(e) => updateField("submissionStatus", e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      tracker.submissionStatus === "confirmed"
                        ? "bg-green-200 text-green-800"
                        : tracker.submissionStatus === "failed"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200"
                    }`}
                  >
                    <option value="not_submitted">Not Submitted</option>
                    <option value="in_progress">Submission In Progress</option>
                    <option value="awaiting">Submitted - Awaiting Confirmation</option>
                    <option value="confirmed">Submitted - Confirmed</option>
                    <option value="failed">Submission Failed - Retry Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etimad Confirmation Reference
                  </label>
                  <input
                    type="text"
                    value={tracker.submissionReference || ""}
                    onChange={(e) => updateField("submissionReference", e.target.value)}
                    placeholder="ETM-XXXX-XXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actual Submission Date/Time
                  </label>
                  <input
                    type="datetime-local"
                    value={tracker.submissionDateTime ? new Date(tracker.submissionDateTime).toISOString().slice(0, 16) : ""}
                    onChange={(e) => updateField("submissionDateTime", e.target.value ? new Date(e.target.value).toISOString() : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="font-medium text-sm">Submission Screenshot Saved</span>
                  <select
                    value={tracker.screenshotSaved || "not_done"}
                    onChange={(e) => updateField("screenshotSaved", e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-200"
                  >
                    <option value="not_done">Not Done</option>
                    <option value="saved">Saved to SharePoint/Drive</option>
                  </select>
                </div>
              </div>
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
                value={tracker.sgsContactNotes || ""}
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
                value={tracker.etimadContactNotes || ""}
                onChange={(e) => updateField("etimadContactNotes", e.target.value)}
                placeholder="Record any communications with Etimad support..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Internal Notes & Issues</h2>
              <textarea
                value={tracker.internalNotes || ""}
                onChange={(e) => updateField("internalNotes", e.target.value)}
                placeholder="Document any issues, blockers, or important notes for team coordination..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Lessons Learned</h2>
              <textarea
                value={tracker.lessonsLearned || ""}
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
