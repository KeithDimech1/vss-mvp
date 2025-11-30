"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AIInfographic from "@/components/tender/AIInfographic";

// Types
interface ReviewComment {
  id: string;
  formId: string;
  sectionId: string;
  comment: string;
  status: "PENDING" | "ADDRESSED" | "RESOLVED" | "WONT_FIX";
  reviewerId: string;
  reviewer: {
    id: string;
    fullName: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface TenderPlaceholder {
  id: string;
  formId: string;
  placeholderId: string;
  originalText: string;
  currentValue: string;
}

interface ParsedPersonnelProfile {
  id: string;        // e.g., "B.2.1", "B.2.2"
  name: string;      // e.g., "Dr. Fabian Kohlmann"
  title: string;     // e.g., "Chief Geoscientist / Technical Lead"
  content: string;   // Content after the profile header
}

interface ParsedSubsection {
  id: string;        // e.g., "A.1", "B.2"
  title: string;     // e.g., "Basic Company Information"
  content: string;   // Content after the subsection header
  profiles?: ParsedPersonnelProfile[]; // Personnel profiles for B.2 Key Technical Personnel
}

interface ParsedSection {
  id: string;        // e.g., "section-A"
  letter: string;    // e.g., "A", "B", "C"
  title: string;     // e.g., "Section A: Company Identification"
  subsections: ParsedSubsection[];
}

interface TenderForm {
  id: string;
  title: string;
  filename: string;
}

// Form definitions
const TENDER_FORMS: TenderForm[] = [
  { id: "FORM-9.1", title: "Form 9.1 - Applicant Information", filename: "FORM-9.1-APPLICANT-INFORMATION.md" },
  { id: "FORM-9.2", title: "Form 9.2 - Technical and Administrative Capabilities", filename: "FORM-9.2-TECHNICAL-ADMINISTRATIVE-CAPABILITIES.md" },
  { id: "FORM-9.3", title: "Form 9.3 - Administrative Staff Experience", filename: "FORM-9.3-ADMINISTRATIVE-STAFF-EXPERIENCE.md" },
  { id: "FORM-9.4", title: "Form 9.4 - Professional Staff Experience", filename: "FORM-9.4-PROFESSIONAL-STAFF-EXPERIENCE.md" },
  { id: "FORM-9.5", title: "Form 9.5 - Similar Projects", filename: "FORM-9.5-SIMILAR-PROJECTS.md" },
  { id: "FORM-9.6", title: "Form 9.6 - Financial Capacity Criteria", filename: "FORM-9.6-FINANCIAL-CAPACITY-CRITERIA.md" },
];

// Status styling
const STATUS_STYLES = {
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  ADDRESSED: { bg: "bg-blue-100", text: "text-blue-800", label: "Addressed" },
  RESOLVED: { bg: "bg-green-100", text: "text-green-800", label: "Resolved" },
  WONT_FIX: { bg: "bg-gray-100", text: "text-gray-800", label: "Won't Fix" },
};

// Placeholder patterns to detect
const PLACEHOLDER_PATTERNS = [
  /\[PLACEHOLDER[^\]]*\]/gi,
  /\[NEEDS INFO[^\]]*\]/gi,
  /\[TO REQUEST[^\]]*\]/gi,
  /\[TO VERIFY[^\]]*\]/gi,
  /\[TO PREPARE[^\]]*\]/gi,
  /\[TO BE SIGNED[^\]]*\]/gi,
  /\[TO BE COMPLETED[^\]]*\]/gi,
  /\[TO BE AFFIXED[^\]]*\]/gi,
  /\[CONFIRM[^\]]*\]/gi,
  /\[OPTIONAL[^\]]*\]/gi,
];

// Parse markdown content into sections and subsections
function parseMarkdownSections(content: string): { sections: ParsedSection[], aiSection: string | null } {
  const sections: ParsedSection[] = [];
  const lines = content.split('\n');
  let currentSection: ParsedSection | null = null;
  let currentSubsection: ParsedSubsection | null = null;
  let currentProfile: ParsedPersonnelProfile | null = null;
  let profileCounter = 0;
  let aiSectionContent: string[] = [];
  let inAISection = false;

  // Main sections to exclude from review (## level)
  const excludedSections = [
    'Attachments Required',
    'Data Sources',
    'Completion Checklist',
    'Action Items',
    'Notes for Etimad',
    'Form Overview',
    'Summary Comparison',
    'Relevance to GDAC',
    'Declaration',
    'Project Selection Rationale',
  ];

  // Subsections to exclude from content (### level)
  const excludedSubsections = [
    'Certificate Compliance Matrix',
    'Australian Regulatory Compliance',
    'Comments',  // Exclude internal comment sections
    'Contract Milestones',  // Exclude milestone tables (they're in project content)
    'Development Milestones',
  ];

  for (const line of lines) {
    // Check for AI section start
    if (line.match(/^## AI and Advanced Analytics/i)) {
      inAISection = true;
      aiSectionContent.push(line);
      continue;
    }

    // If we're in AI section, capture content until next ## header
    if (inAISection) {
      if (line.match(/^## [^A]/) || line.match(/^---$/)) {
        inAISection = false;
      } else {
        aiSectionContent.push(line);
        continue;
      }
    }

    // Match section headers:
    // - ## Section A: Company Identification (Forms 9.1-9.4)
    // - # PROJECT 1: LithoSurfer (Form 9.5 - note single #)
    const sectionMatch = line.match(/^##? ?(Section ([A-Z]):\s*(.+)|PROJECT (\d+):\s*(.+))/i);

    if (sectionMatch) {
      // Save previous profile to previous subsection
      if (currentProfile && currentSubsection) {
        if (!currentSubsection.profiles) currentSubsection.profiles = [];
        currentSubsection.profiles.push(currentProfile);
        currentProfile = null;
      }

      // Save previous subsection to previous section
      if (currentSubsection && currentSection) {
        currentSection.subsections.push(currentSubsection);
        currentSubsection = null;
      }

      // Save previous section
      if (currentSection && currentSection.subsections.length > 0) {
        sections.push(currentSection);
      }

      const fullTitle = sectionMatch[1].trim();
      const sectionLetter = sectionMatch[2] || sectionMatch[4] || '';

      // Check if this section should be excluded
      const isExcluded = excludedSections.some(excluded =>
        fullTitle.toLowerCase().includes(excluded.toLowerCase())
      );

      if (isExcluded) {
        currentSection = null;
        currentSubsection = null;
        currentProfile = null;
      } else {
        currentSection = {
          id: `section-${sectionLetter}`,
          letter: sectionLetter,
          title: fullTitle,
          subsections: [],
        };
      }
      profileCounter = 0;
      continue;
    }

    // Match subsection headers:
    // - ### A.1 Basic Company Information (Forms 9.1-9.4)
    // - ## 1.1 Project Identification (Form 9.5 - note ## and numeric prefix)
    const subsectionMatch = line.match(/^###? ?([A-Z0-9]\.\d+)\s+(.+)/);

    if (subsectionMatch && currentSection) {
      // Save previous profile to previous subsection
      if (currentProfile && currentSubsection) {
        if (!currentSubsection.profiles) currentSubsection.profiles = [];
        currentSubsection.profiles.push(currentProfile);
        currentProfile = null;
      }

      // Save previous subsection
      if (currentSubsection) {
        currentSection.subsections.push(currentSubsection);
      }

      const subsectionId = subsectionMatch[1].trim();  // e.g., "A.1"
      const subsectionTitle = subsectionMatch[2].trim(); // e.g., "Basic Company Information"

      // Check if this subsection should be excluded
      const isExcluded = excludedSubsections.some(excluded =>
        subsectionTitle.toLowerCase().includes(excluded.toLowerCase())
      );

      if (isExcluded) {
        currentSubsection = null;
        currentProfile = null;
      } else {
        currentSubsection = {
          id: subsectionId,
          title: subsectionTitle,
          content: '',
          profiles: [],
        };
        // Reset profile counter for B.2 Key Technical Personnel Profiles
        if (subsectionId === 'B.2' && subsectionTitle.toLowerCase().includes('personnel')) {
          profileCounter = 0;
        }
      }
      continue;
    }

    // Match Form 9.5 named subsections (### Detailed Project Description, ### Key Achievements, etc.)
    // These are within PROJECT sections and should be reviewable
    const namedSubsectionMatch = line.match(/^### (.+)/);

    if (namedSubsectionMatch && currentSection && currentSection.letter.match(/^\d+$/)) {
      // We're in a PROJECT section (numeric letter like "1", "2", "3", "4")
      const subsectionTitle = namedSubsectionMatch[1].trim();

      // Check if this subsection should be excluded
      const isExcluded = excludedSubsections.some(excluded =>
        subsectionTitle.toLowerCase().includes(excluded.toLowerCase())
      );

      if (!isExcluded) {
        // Save previous subsection
        if (currentSubsection) {
          currentSection.subsections.push(currentSubsection);
        }

        // Create a new subsection - use clean title for ID
        const subsectionId = `${currentSection.letter}-${subsectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20)}`;

        currentSubsection = {
          id: subsectionId,
          title: subsectionTitle,
          content: '',
          profiles: [],
        };
      }
      continue;
    }

    // Match #### Personnel Profile headers (e.g., "#### Dr. Fabian Kohlmann - Chief Geoscientist")
    // Only within B.2 Key Technical Personnel Profiles subsection (Form 9.4)
    // This must come BEFORE the generic #### match to avoid conflicts
    const profileMatch = line.match(/^#### (.+?) - (.+)/);

    if (profileMatch && currentSubsection && currentSubsection.id === 'B.2' && !currentSection?.letter.match(/^\d+$/)) {
      // Save previous profile
      if (currentProfile) {
        if (!currentSubsection.profiles) currentSubsection.profiles = [];
        currentSubsection.profiles.push(currentProfile);
      }

      profileCounter++;
      const personName = profileMatch[1].trim();  // e.g., "Dr. Fabian Kohlmann"
      const personTitle = profileMatch[2].trim(); // e.g., "Chief Geoscientist / Technical Lead"

      currentProfile = {
        id: `B.2.${profileCounter}`,
        name: personName,
        title: personTitle,
        content: '',
      };
      continue;
    }

    // Match Form 9.5 #### sub-subsections (#### Project Objectives, #### Key Achievements, etc.)
    // This comes AFTER profile matching to avoid conflicts with Form 9.4
    const subSubsectionMatch = line.match(/^#### (.+)/);

    if (subSubsectionMatch && currentSection && currentSection.letter.match(/^\d+$/) && currentSubsection) {
      const subTitle = subSubsectionMatch[1].trim();

      // Check if this should be excluded
      const isExcluded = excludedSubsections.some(excluded =>
        subTitle.toLowerCase().includes(excluded.toLowerCase())
      );

      if (!isExcluded) {
        // Save current subsection and create new one for this #### header
        currentSection.subsections.push(currentSubsection);

        const subsectionId = `${currentSection.letter}-${subTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20)}`;

        currentSubsection = {
          id: subsectionId,
          title: subTitle,
          content: '',
          profiles: [],
        };
      }
      continue;
    }

    // Add content to current profile if we're in B.2, otherwise to subsection
    if (currentProfile) {
      currentProfile.content += line + '\n';
    } else if (currentSubsection) {
      currentSubsection.content += line + '\n';
    }
  }

  // Don't forget the last profile, subsection and section
  if (currentProfile && currentSubsection) {
    if (!currentSubsection.profiles) currentSubsection.profiles = [];
    currentSubsection.profiles.push(currentProfile);
  }
  if (currentSubsection && currentSection) {
    currentSection.subsections.push(currentSubsection);
  }
  if (currentSection && currentSection.subsections.length > 0) {
    sections.push(currentSection);
  }

  return {
    sections,
    aiSection: aiSectionContent.length > 0 ? aiSectionContent.join('\n') : null
  };
}

// Generate a unique placeholder ID from the original text
function generatePlaceholderId(originalText: string, context: string): string {
  const cleanText = originalText
    .replace(/[\[\]]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 30);
  const contextClean = context
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 20);
  return `${contextClean}-${cleanText}`;
}

// Detect if text contains placeholders
function hasPlaceholder(text: string): boolean {
  return PLACEHOLDER_PATTERNS.some(pattern => pattern.test(text));
}

// Extract all placeholders from text
function extractPlaceholders(text: string, context: string): { id: string; original: string; start: number; end: number }[] {
  const placeholders: { id: string; original: string; start: number; end: number }[] = [];

  for (const pattern of PLACEHOLDER_PATTERNS) {
    const regex = new RegExp(pattern.source, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      placeholders.push({
        id: generatePlaceholderId(match[0], context),
        original: match[0],
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }

  return placeholders;
}

// Simple markdown to HTML converter for tables and basic formatting
function renderMarkdown(content: string, placeholders: Map<string, TenderPlaceholder>, onEditPlaceholder: (id: string, original: string) => void, context: string): string {
  // Escape HTML first
  let html = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Replace placeholders with editable spans
  for (const pattern of PLACEHOLDER_PATTERNS) {
    html = html.replace(new RegExp(pattern.source, 'gi'), (match) => {
      const placeholderId = generatePlaceholderId(match, context);
      const placeholder = placeholders.get(placeholderId);
      const displayValue = placeholder?.currentValue || match;
      const isModified = placeholder && placeholder.currentValue !== placeholder.originalText;

      return `<span class="inline-block px-2 py-0.5 rounded cursor-pointer transition-colors ${
        isModified
          ? 'bg-green-100 border border-green-300 text-green-800 hover:bg-green-200'
          : 'bg-blue-100 border border-blue-300 text-blue-800 hover:bg-blue-200'
      }" data-placeholder-id="${placeholderId}" data-original="${match.replace(/"/g, '&quot;')}" title="Click to edit">${displayValue}</span>`;
    });
  }

  // Convert markdown tables
  const tableRegex = /\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, header, body) => {
    const headerCells = header.split('|').filter((c: string) => c.trim());
    const bodyRows = body.trim().split('\n');

    let table = '<table class="min-w-full text-sm border-collapse border border-gray-300 my-2">';
    table += '<thead class="bg-gray-100"><tr>';
    headerCells.forEach((cell: string) => {
      table += `<th class="border border-gray-300 px-2 py-1 text-left font-medium">${cell.trim()}</th>`;
    });
    table += '</tr></thead><tbody>';

    bodyRows.forEach((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim() !== '');
      if (cells.length > 0) {
        table += '<tr>';
        cells.forEach((cell: string) => {
          table += `<td class="border border-gray-300 px-2 py-1">${cell.trim()}</td>`;
        });
        table += '</tr>';
      }
    });

    table += '</tbody></table>';
    return table;
  });

  // Bold text
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic text
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');

  // Images (must come before links since both use similar syntax)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto my-4 rounded-lg border border-gray-200" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>');

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-3 italic text-gray-600 my-2">$1</blockquote>');

  // List items
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>');

  // Paragraphs (double newlines)
  html = html.replace(/\n\n/g, '</p><p class="my-2">');

  // Single newlines to <br> within paragraphs
  html = html.replace(/\n/g, '<br>');

  return `<p class="my-2">${html}</p>`;
}

export default function TenderReviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<TenderForm>(TENDER_FORMS[0]);
  const [formContent, setFormContent] = useState<string>("");
  const [parsedSections, setParsedSections] = useState<ParsedSection[]>([]);
  const [aiSectionContent, setAiSectionContent] = useState<string | null>(null);
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [placeholders, setPlaceholders] = useState<Map<string, TenderPlaceholder>>(new Map());
  const [saving, setSaving] = useState(false);
  const [editingSubsection, setEditingSubsection] = useState<string | null>(null); // e.g., "A.1"
  const [editingComment, setEditingComment] = useState<string>("");
  const [editingPlaceholder, setEditingPlaceholder] = useState<{ id: string; original: string } | null>(null);
  const [placeholderValue, setPlaceholderValue] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<{ id: string; fullName: string } | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedToolbars, setExpandedToolbars] = useState<Set<string>>(new Set()); // Section letters with open toolbars
  const [expandedProfiles, setExpandedProfiles] = useState<Set<string>>(new Set()); // Profile IDs like "B.2.1"
  const [showAISection, setShowAISection] = useState(false);

  // Fetch current user session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    };
    fetchSession();
  }, [router]);

  // Fetch form content
  const fetchFormContent = useCallback(async (form: TenderForm) => {
    try {
      const response = await fetch(`/api/tender-review/content?filename=${form.filename}`);
      if (response.ok) {
        const data = await response.json();
        const content = data.content || "";
        setFormContent(content);
        const { sections, aiSection } = parseMarkdownSections(content);
        setParsedSections(sections);
        setAiSectionContent(aiSection);
        // Expand first section by default
        if (sections.length > 0) {
          setExpandedSections(new Set([sections[0].id]));
        }
      } else {
        setFormContent("");
        setParsedSections([]);
        setAiSectionContent(null);
      }
    } catch {
      setFormContent("");
      setParsedSections([]);
      setAiSectionContent(null);
    }
  }, []);

  // Fetch comments for the selected form
  const fetchComments = useCallback(async (formId: string) => {
    try {
      const response = await fetch(`/api/tender-review?formId=${formId}`);
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Fetch placeholders for the selected form
  const fetchPlaceholders = useCallback(async (formId: string) => {
    try {
      const response = await fetch(`/api/tender-review/placeholders?formId=${formId}`);
      if (response.ok) {
        const data = await response.json();
        const placeholderMap = new Map<string, TenderPlaceholder>();
        (data.placeholders || []).forEach((p: TenderPlaceholder) => {
          placeholderMap.set(p.placeholderId, p);
        });
        setPlaceholders(placeholderMap);
      }
    } catch (err) {
      console.error("Error fetching placeholders:", err);
    }
  }, []);

  // Load form content and comments when form changes
  useEffect(() => {
    setLoading(true);
    fetchFormContent(selectedForm);
    fetchComments(selectedForm.id);
    fetchPlaceholders(selectedForm.id);
  }, [selectedForm, fetchFormContent, fetchComments, fetchPlaceholders]);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  // Toggle comments toolbar for a section
  const toggleToolbar = (sectionLetter: string) => {
    setExpandedToolbars(prev => {
      const next = new Set(prev);
      if (next.has(sectionLetter)) {
        next.delete(sectionLetter);
      } else {
        next.add(sectionLetter);
      }
      return next;
    });
  };

  // Toggle profile expansion
  const toggleProfile = (profileId: string) => {
    setExpandedProfiles(prev => {
      const next = new Set(prev);
      if (next.has(profileId)) {
        next.delete(profileId);
      } else {
        next.add(profileId);
      }
      return next;
    });
  };

  // Save a comment for a subsection
  const saveComment = async (subsectionId: string, comment: string) => {
    if (!comment.trim()) return;

    setSaving(true);
    try {
      const response = await fetch("/api/tender-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: selectedForm.id,
          sectionId: subsectionId, // Using subsection ID like "A.1"
          comment: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment");
      }

      const data = await response.json();

      setComments(prev => {
        const existing = prev.findIndex(
          c => c.sectionId === subsectionId && c.reviewerId === currentUser?.id
        );
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = data.comment;
          return updated;
        }
        return [...prev, data.comment];
      });

      setEditingSubsection(null);
      setEditingComment("");
    } catch (err) {
      console.error("Error saving comment:", err);
      setError("Failed to save comment");
    } finally {
      setSaving(false);
    }
  };

  // Save a placeholder value
  const savePlaceholder = async (placeholderId: string, originalText: string, newValue: string) => {
    setSaving(true);
    try {
      const response = await fetch("/api/tender-review/placeholders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: selectedForm.id,
          placeholderId,
          originalText,
          currentValue: newValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save placeholder");
      }

      const data = await response.json();
      setPlaceholders(prev => {
        const next = new Map(prev);
        next.set(placeholderId, data.placeholder);
        return next;
      });

      setEditingPlaceholder(null);
      setPlaceholderValue("");
    } catch (err) {
      console.error("Error saving placeholder:", err);
      setError("Failed to save placeholder");
    } finally {
      setSaving(false);
    }
  };

  // Update comment status
  const updateCommentStatus = async (commentId: string, status: string) => {
    try {
      const response = await fetch("/api/tender-review", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      setComments(prev => prev.map(c => c.id === commentId ? data.comment : c));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete a comment
  const deleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(`/api/tender-review?id=${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // Get comments for a specific subsection
  const getSubsectionComments = (subsectionId: string): ReviewComment[] => {
    return comments.filter(c => c.sectionId === subsectionId);
  };

  // Get all comments for a section (all its subsections)
  const getSectionComments = (sectionLetter: string): ReviewComment[] => {
    return comments.filter(c => c.sectionId.startsWith(sectionLetter + ".") || c.sectionId.startsWith(sectionLetter + "-"));
  };

  // Get my comment for a subsection
  const getMyComment = (subsectionId: string): ReviewComment | undefined => {
    return comments.find(c => c.sectionId === subsectionId && c.reviewerId === currentUser?.id);
  };

  // Check if a subsection has any comments
  const subsectionHasComments = (subsectionId: string): boolean => {
    return comments.some(c => c.sectionId === subsectionId);
  };

  // Calculate comment stats
  const getCommentStats = () => {
    return {
      total: comments.length,
      pending: comments.filter(c => c.status === "PENDING").length,
      addressed: comments.filter(c => c.status === "ADDRESSED").length,
      resolved: comments.filter(c => c.status === "RESOLVED").length,
    };
  };

  // Handle placeholder click
  const handlePlaceholderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.dataset.placeholderId) {
      const placeholderId = target.dataset.placeholderId;
      const original = target.dataset.original || "";
      const placeholder = placeholders.get(placeholderId);
      setEditingPlaceholder({ id: placeholderId, original });
      setPlaceholderValue(placeholder?.currentValue || original);
    }
  };

  const stats = getCommentStats();

  if (loading && !formContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tender review...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GDAC Tender Review</h1>
              <p className="text-sm text-gray-500">
                Review tender responses and leave feedback for each section
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Total:</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{stats.total}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-yellow-700">Pending:</span>
                <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-800">{stats.pending}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-green-700">Resolved:</span>
                <span className="bg-green-100 px-2 py-1 rounded text-green-800">{stats.resolved}</span>
              </div>
            </div>
          </div>

          {/* Form Selector */}
          <div className="mt-4 flex flex-wrap gap-2">
            {TENDER_FORMS.map((form) => (
              <button
                key={form.id}
                onClick={() => setSelectedForm(form)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedForm.id === form.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {form.id.replace("FORM-", "")}
                {comments.filter(c => c.formId === form.id).length > 0 && (
                  <span className="ml-1.5 bg-white/20 px-1.5 rounded-full text-xs">
                    {comments.filter(c => c.formId === form.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="max-w-full mx-auto px-4 py-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
            {error}
            <button onClick={() => setError(null)} className="ml-2 underline">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Placeholder Edit Modal */}
      {editingPlaceholder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Edit Placeholder</h3>
            <p className="text-sm text-gray-500 mb-4">
              Original: <code className="bg-gray-100 px-1 rounded">{editingPlaceholder.original}</code>
            </p>
            <input
              type="text"
              value={placeholderValue}
              onChange={(e) => setPlaceholderValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the actual value..."
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingPlaceholder(null);
                  setPlaceholderValue("");
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => savePlaceholder(editingPlaceholder.id, editingPlaceholder.original, placeholderValue)}
                disabled={saving}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Split Layout */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Left Panel - Form Content */}
        <div className="w-1/2 border-r bg-white overflow-y-auto" onClick={handlePlaceholderClick}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedForm.title}
            </h2>

            {/* Placeholder Legend */}
            <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-600 font-medium">Legend:</span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block px-2 py-0.5 bg-blue-100 border border-blue-300 text-blue-800 rounded text-xs">Placeholder</span>
                  <span className="text-slate-500">= Needs info</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block px-2 py-0.5 bg-green-100 border border-green-300 text-green-800 rounded text-xs">Filled</span>
                  <span className="text-slate-500">= Updated</span>
                </span>
              </div>
            </div>

            {parsedSections.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No content available for this form.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {parsedSections.map((section) => {
                  const sectionComments = getSectionComments(section.letter);
                  const hasComments = sectionComments.length > 0;
                  const isExpanded = expandedSections.has(section.id);
                  const isToolbarOpen = expandedToolbars.has(section.letter);

                  return (
                    <div
                      key={section.id}
                      className={`border rounded-lg overflow-hidden transition-colors ${
                        hasComments
                          ? "border-blue-300 bg-blue-50/30"
                          : "border-gray-200"
                      }`}
                    >
                      {/* Section Header with Comments Toolbar Toggle */}
                      <div
                        className={`flex items-center justify-between px-4 py-3 bg-gray-50 ${
                          isExpanded ? "border-b" : ""
                        }`}
                      >
                        <div
                          className="flex items-center gap-3 cursor-pointer flex-1"
                          onClick={() => toggleSection(section.id)}
                        >
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                          {hasComments && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {sectionComments.length} comment{sectionComments.length > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        {/* Comments Toolbar Toggle Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleToolbar(section.letter);
                          }}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                            isToolbarOpen
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:bg-blue-100"
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          Comments
                        </button>
                      </div>

                      {/* Section Comments Toolbar - Shows all comments for this section's subsections */}
                      {isToolbarOpen && (
                        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-blue-800">
                              Section {section.letter} Comments ({sectionComments.length})
                            </h4>
                          </div>
                          {sectionComments.length === 0 ? (
                            <p className="text-sm text-blue-600">No comments yet. Click the comment button on any subsection below.</p>
                          ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {sectionComments.map((c) => (
                                <div key={c.id} className="bg-white rounded p-2 text-sm border border-blue-100">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-blue-700">{c.sectionId}</span>
                                      <span className="text-gray-600">- {c.reviewer.fullName}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[c.status].bg} ${STATUS_STYLES[c.status].text}`}>
                                      {STATUS_STYLES[c.status].label}
                                    </span>
                                  </div>
                                  <p className="text-gray-700">{c.comment}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Section Content - Subsections */}
                      {isExpanded && (
                        <div className="px-4 py-3 bg-white space-y-4">
                          {section.subsections.map((subsection) => {
                            const myComment = getMyComment(subsection.id);
                            const hasSubsectionComments = subsectionHasComments(subsection.id);
                            const hasProfiles = subsection.profiles && subsection.profiles.length > 0;

                            return (
                              <div key={subsection.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                {/* Subsection Header with Comment Button */}
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-900">
                                    {subsection.title}
                                    {hasProfiles && (
                                      <span className="ml-2 text-xs font-normal text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                                        {subsection.profiles!.length} profiles
                                      </span>
                                    )}
                                  </h4>
                                  {!hasProfiles && (
                                    <button
                                      onClick={() => {
                                        setEditingSubsection(subsection.id);
                                        setEditingComment(myComment?.comment || "");
                                      }}
                                      className={`px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
                                        hasSubsectionComments
                                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                          : "text-gray-500 hover:bg-gray-100"
                                      }`}
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                      </svg>
                                      {myComment ? "Edit" : "Comment"}
                                    </button>
                                  )}
                                </div>

                                {/* Subsection Content (if no profiles) */}
                                {!hasProfiles && (
                                  <div
                                    className="prose prose-sm max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: renderMarkdown(subsection.content, placeholders, () => {}, subsection.id) }}
                                  />
                                )}

                                {/* Personnel Profiles (for B.2) */}
                                {hasProfiles && (
                                  <div className="space-y-2 mt-3">
                                    {subsection.profiles!.map((profile) => {
                                      const profileComment = getMyComment(profile.id);
                                      const hasProfileComments = subsectionHasComments(profile.id);
                                      const isProfileExpanded = expandedProfiles.has(profile.id);

                                      return (
                                        <div
                                          key={profile.id}
                                          className={`border rounded-lg overflow-hidden ${
                                            hasProfileComments
                                              ? "border-purple-300 bg-purple-50/30"
                                              : "border-gray-200"
                                          }`}
                                        >
                                          {/* Profile Header */}
                                          <div
                                            className="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                            onClick={() => toggleProfile(profile.id)}
                                          >
                                            <div className="flex items-center gap-2">
                                              <svg
                                                className={`w-4 h-4 text-gray-400 transition-transform ${isProfileExpanded ? "rotate-90" : ""}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                              </svg>
                                              <span className="text-xs font-mono text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">
                                                {profile.id}
                                              </span>
                                              <span className="font-medium text-gray-900 text-sm">
                                                {profile.name}
                                              </span>
                                              <span className="text-xs text-gray-500">
                                                - {profile.title}
                                              </span>
                                              {hasProfileComments && (
                                                <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                                                  has comments
                                                </span>
                                              )}
                                            </div>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingSubsection(profile.id);
                                                setEditingComment(profileComment?.comment || "");
                                              }}
                                              className={`px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
                                                hasProfileComments
                                                  ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                                  : "text-gray-500 hover:bg-gray-200"
                                              }`}
                                            >
                                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                              </svg>
                                              {profileComment ? "Edit" : "Comment"}
                                            </button>
                                          </div>

                                          {/* Profile Content (expanded) */}
                                          {isProfileExpanded && (
                                            <div className="px-4 py-3 bg-white">
                                              <div
                                                className="prose prose-sm max-w-none text-gray-700"
                                                dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.content, placeholders, () => {}, profile.id) }}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* AI Section - Standalone Infographic */}
                {selectedForm.id === "FORM-9.5" && (
                  <div className="border-2 border-indigo-300 rounded-lg overflow-hidden bg-indigo-50/30">
                    <div
                      className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 cursor-pointer"
                      onClick={() => setShowAISection(!showAISection)}
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className={`w-5 h-5 text-indigo-600 transition-transform ${showAISection ? "rotate-90" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <h3 className="font-semibold text-indigo-800">AI and Advanced Analytics Capabilities</h3>
                        <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">
                          Infographic
                        </span>
                      </div>
                    </div>

                    {showAISection && (
                      <div className="p-4 bg-white">
                        <AIInfographic />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Comment Editor & All Comments */}
        <div className="w-1/2 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Comments
              {editingSubsection && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  - {editingSubsection}
                </span>
              )}
            </h2>

            {/* Comment Editor */}
            {editingSubsection && (
              <div className="bg-white rounded-lg border p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {getMyComment(editingSubsection) ? `Edit Your Comment for ${editingSubsection}` : `Add Comment for ${editingSubsection}`}
                </h3>
                <textarea
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                  placeholder="Enter your feedback for this subsection..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => {
                      setEditingSubsection(null);
                      setEditingComment("");
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveComment(editingSubsection, editingComment)}
                    disabled={saving || !editingComment.trim()}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Comment"}
                  </button>
                </div>
              </div>
            )}

            {/* All Comments for Current Form */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p>No comments yet for this form.</p>
                  <p className="text-sm">Expand a section and click the comment button on any subsection.</p>
                </div>
              ) : (
                comments.map((comment) => {
                  const isMyComment = comment.reviewerId === currentUser?.id;
                  // Find the subsection or profile title
                  let subsectionTitle = comment.sectionId;
                  let isProfile = false;
                  for (const section of parsedSections) {
                    // Check subsections
                    const sub = section.subsections.find(s => s.id === comment.sectionId);
                    if (sub) {
                      subsectionTitle = sub.title;
                      break;
                    }
                    // Check profiles within B.2
                    for (const subsection of section.subsections) {
                      if (subsection.profiles) {
                        const profile = subsection.profiles.find(p => p.id === comment.sectionId);
                        if (profile) {
                          subsectionTitle = `${profile.id} ${profile.name} - ${profile.title}`;
                          isProfile = true;
                          break;
                        }
                      }
                    }
                    if (isProfile) break;
                  }

                  return (
                    <div key={comment.id} className="bg-white rounded-lg border p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {comment.reviewer.fullName}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={comment.status}
                            onChange={(e) => updateCommentStatus(comment.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-full border-0 ${STATUS_STYLES[comment.status].bg} ${STATUS_STYLES[comment.status].text}`}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="ADDRESSED">Addressed</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="WONT_FIX">Won&apos;t Fix</option>
                          </select>
                          {isMyComment && (
                            <button
                              onClick={() => deleteComment(comment.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Delete comment"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className={`text-xs font-medium mb-2 ${isProfile ? "text-purple-600" : "text-blue-600"}`}>
                        {subsectionTitle}
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {comment.comment}
                      </p>
                      {isMyComment && (
                        <button
                          onClick={() => {
                            setEditingSubsection(comment.sectionId);
                            setEditingComment(comment.comment);
                          }}
                          className="text-xs text-blue-600 hover:underline mt-2"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
