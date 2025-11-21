'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Helper function to parse markdown and render formatted sections
function parseMarkdownSections(markdown: string) {
  const lines = markdown.split('\n');
  const sections: { type: 'h2' | 'h3' | 'h4' | 'text'; content: string }[] = [];

  for (const line of lines) {
    if (line.startsWith('#### ')) {
      // H4 header
      sections.push({ type: 'h4', content: line.replace('#### ', '') });
    } else if (line.startsWith('### ')) {
      // H3 header
      sections.push({ type: 'h3', content: line.replace('### ', '') });
    } else if (line.startsWith('## ')) {
      // H2 header
      sections.push({ type: 'h2', content: line.replace('## ', '') });
    } else if (line.trim()) {
      // This is text content (not empty line)
      sections.push({ type: 'text', content: line });
    }
  }

  return sections;
}

interface User {
  id: string;
  username: string;
  fullName: string;
  isManager: boolean;
}

interface HRActionItem {
  id: string;
  description: string;
  employeeId: string;
  assignedToId: string | null;
  interviewNoteId: string | null;
  dueDate: string | null;
  status: string;
  priority: string;
  notes: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  employee: User;
  assignedTo: User | null;
  createdBy: User;
}

interface FeedbackSurvey {
  id: string;
  userId: string;
  timestamp: string;
  enjoyedPart: string | null;
  lessOfPart: string | null;
  autonomyRating: number | null;
  motivationRating: number | null;
  teamConnection: number | null;
  wideLithodatConnection: number | null;
  supportRating: number | null;
  proudAchievement: string | null;
  wishRecognised: string | null;
  toolsEffectiveness: number | null;
  collaborationEase: number | null;
  toolsUsed: string | null;
  aiUsageWorkflow: string | null;
  aiToolsToExplore: string | null;
  inefficiencies: string | null;
  toolsCreated: string | null;
  externalLearnings: string | null;
  careerPathClarity: number | null;
  skillDevelopmentSupport: number | null;
  skillToGrow: string | null;
  rolesInterested: string | null;
  growthSupport: string | null;
  greatYearVision: string | null;
  excitedProjects: string | null;
  smallGoals: string | null;
  additionalSharing: string | null;
  user: User;
}

interface GoalSetting {
  id: string;
  userId: string;
  timestamp: string;
  professionalGoal1Title: string | null;
  professionalGoal2Title: string | null;
  professionalGoal3Title: string | null;
  personalGoalTitle: string | null;
  checkInPreferences: string[];
  user: User;
}

interface InterviewNote {
  id: string;
  userId: string;
  interviewDate: string;
  notes: string;
  keyThemes: string[];
  actionItems: string[];
  interviewer: string | null;
  interviewType: string | null;
  user: User;
}

interface HRReviewData {
  feedbackSurveys: FeedbackSurvey[];
  goalSettings: GoalSetting[];
  interviewNotes: InterviewNote[];
  allUsers: User[];
  user?: User;
}

export default function HRReviewDashboard() {
  const [data, setData] = useState<HRReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('all');
  const [selectedManagerId, setSelectedManagerId] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<'feedback' | 'goals' | 'interviews' | 'actions' | 'payrise'>('feedback');
  const [allActionItems, setAllActionItems] = useState<HRActionItem[]>([]);
  const [managers, setManagers] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
    fetchAllActionItems();
    fetchManagers();
  }, [selectedUserId, selectedManagerId]);

  async function fetchManagers() {
    try {
      const response = await fetch('/api/hr-review');
      if (response.ok) {
        const jsonData = await response.json();
        setManagers(jsonData.allUsers?.filter((u: User) => u.isManager) || []);
      }
    } catch (err) {
      console.error('Error fetching managers:', err);
    }
  }

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (selectedUserId !== 'all') {
        params.append('userId', selectedUserId);
      }
      if (selectedManagerId !== 'all') {
        params.append('managerId', selectedManagerId);
      }

      const url = params.toString()
        ? `/api/hr-review?${params.toString()}`
        : '/api/hr-review';

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Manager access required to view HR reviews');
        }
        throw new Error('Failed to fetch HR review data');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAllActionItems() {
    try {
      const params = new URLSearchParams();
      if (selectedUserId !== 'all') {
        params.append('employeeId', selectedUserId);
      }
      if (selectedManagerId !== 'all') {
        params.append('managerId', selectedManagerId);
      }

      const url = params.toString()
        ? `/api/hr-action-items?${params.toString()}`
        : '/api/hr-action-items';

      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        setAllActionItems(result.actionItems || []);
      }
    } catch (error) {
      console.error('Error fetching action items:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline mt-2 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No data available</p>
      </div>
    );
  }

  const filteredFeedback = selectedUserId === 'all'
    ? data.feedbackSurveys
    : data.feedbackSurveys.filter(f => f.userId === selectedUserId);

  const filteredGoals = selectedUserId === 'all'
    ? data.goalSettings
    : data.goalSettings.filter(g => g.userId === selectedUserId);

  const filteredInterviews = selectedUserId === 'all'
    ? data.interviewNotes
    : data.interviewNotes.filter(i => i.userId === selectedUserId);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HR Review Dashboard 2025</h1>
            <p className="text-gray-600 mt-1">
              Employee feedback, goals, and interview notes
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manager Filter */}
            <div>
              <label htmlFor="manager-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Manager
              </label>
              <select
                id="manager-filter"
                value={selectedManagerId}
                onChange={(e) => {
                  setSelectedManagerId(e.target.value);
                  setSelectedUserId('all'); // Reset employee filter when manager changes
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Managers</option>
                {managers.map(manager => (
                  <option key={manager.id} value={manager.id}>
                    {manager.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee Filter */}
            <div>
              <label htmlFor="employee-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Employee
              </label>
              <select
                id="employee-filter"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Employees ({data.allUsers.length})</option>
                <optgroup label="Management">
                  {data.allUsers.filter(u => u.isManager).map(user => (
                    <option key={user.id} value={user.id}>
                      {user.fullName} (@{user.username})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Team Members">
                  {data.allUsers.filter(u => !u.isManager).map(user => (
                    <option key={user.id} value={user.id}>
                      {user.fullName} (@{user.username})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('feedback')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSection === 'feedback'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📋 Feedback Survey ({filteredFeedback.length})
        </button>
        <button
          onClick={() => setActiveSection('goals')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSection === 'goals'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🎯 Goal Setting ({filteredGoals.length})
        </button>
        <button
          onClick={() => setActiveSection('interviews')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSection === 'interviews'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💬 Interview Notes ({filteredInterviews.length})
        </button>
        <button
          onClick={() => setActiveSection('actions')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSection === 'actions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ✅ Action Items ({allActionItems.length})
        </button>
        <button
          onClick={() => setActiveSection('payrise')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSection === 'payrise'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💰 Payrise Calculator
        </button>
      </div>

      {/* Section Content */}
      {activeSection === 'feedback' && (
        <FeedbackSection data={filteredFeedback} />
      )}

      {activeSection === 'goals' && (
        <GoalsSection data={filteredGoals} />
      )}

      {activeSection === 'interviews' && (
        <InterviewsSection data={filteredInterviews} />
      )}

      {activeSection === 'actions' && (
        <ActionItemsSection
          data={allActionItems}
          onRefresh={fetchAllActionItems}
        />
      )}

      {activeSection === 'payrise' && (
        <PayriseCalculatorSection />
      )}
    </div>
  );
}

// Feedback Survey Section Component
function FeedbackSection({ data }: { data: FeedbackSurvey[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No feedback survey responses available for this filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((feedback) => (
        <div key={feedback.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Employee Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{feedback.user.fullName}</h3>
              <p className="text-sm text-gray-600">@{feedback.user.username} {feedback.user.isManager && '• Manager'}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(feedback.timestamp).toLocaleDateString()}
            </span>
          </div>

          {/* Work Engagement */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Work Engagement</h4>
            <div className="space-y-4">
              <MetricDisplay label="Autonomy" value={feedback.autonomyRating} />
              <MetricDisplay label="Motivation" value={feedback.motivationRating} />
              <MetricDisplay label="Team Connection" value={feedback.teamConnection} />
              <MetricDisplay label="Support" value={feedback.supportRating} />
              {feedback.enjoyedPart && (
                <TextResponse label="Enjoyed Part" text={feedback.enjoyedPart} />
              )}
              {feedback.lessOfPart && (
                <TextResponse label="Less Of" text={feedback.lessOfPart} />
              )}
            </div>
          </div>

          {/* Achievement & Recognition */}
          {(feedback.proudAchievement || feedback.wishRecognised) && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Achievement & Recognition</h4>
              <div className="space-y-4">
                {feedback.proudAchievement && (
                  <TextResponse label="Proud Achievement" text={feedback.proudAchievement} />
                )}
                {feedback.wishRecognised && (
                  <TextResponse label="Wish Recognised" text={feedback.wishRecognised} />
                )}
              </div>
            </div>
          )}

          {/* Tools & AI */}
          {(feedback.toolsUsed || feedback.aiUsageWorkflow) && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Tools & AI Usage</h4>
              <div className="space-y-4">
                <MetricDisplay label="Tools Effectiveness" value={feedback.toolsEffectiveness} />
                <MetricDisplay label="Collaboration Ease" value={feedback.collaborationEase} />
                {feedback.toolsUsed && (
                  <TextResponse label="Tools Used" text={feedback.toolsUsed} />
                )}
                {feedback.aiUsageWorkflow && (
                  <TextResponse label="AI Workflow" text={feedback.aiUsageWorkflow} />
                )}
              </div>
            </div>
          )}

          {/* Career Development */}
          {(feedback.skillToGrow || feedback.rolesInterested) && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Career Development</h4>
              <div className="space-y-4">
                <MetricDisplay label="Career Path Clarity" value={feedback.careerPathClarity} />
                <MetricDisplay label="Skill Development Support" value={feedback.skillDevelopmentSupport} />
                {feedback.skillToGrow && (
                  <TextResponse label="Skill to Grow" text={feedback.skillToGrow} />
                )}
                {feedback.rolesInterested && (
                  <TextResponse label="Roles Interested" text={feedback.rolesInterested} />
                )}
              </div>
            </div>
          )}

          {/* Vision & Goals */}
          {(feedback.greatYearVision || feedback.excitedProjects) && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Vision & Goals</h4>
              <div className="space-y-4">
                {feedback.greatYearVision && (
                  <TextResponse label="Great Year Vision" text={feedback.greatYearVision} />
                )}
                {feedback.excitedProjects && (
                  <TextResponse label="Excited Projects" text={feedback.excitedProjects} />
                )}
                {feedback.smallGoals && (
                  <TextResponse label="Small Goals" text={feedback.smallGoals} />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Goals Section Component
function GoalsSection({ data }: { data: GoalSetting[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No goal setting responses available for this filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((goal) => (
        <div key={goal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Employee Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{goal.user.fullName}</h3>
              <p className="text-sm text-gray-600">@{goal.user.username} {goal.user.isManager && '• Manager'}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(goal.timestamp).toLocaleDateString()}
            </span>
          </div>

          {/* Professional Goals */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Professional Goals</h4>
            <div className="space-y-3">
              {goal.professionalGoal1Title && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-medium text-blue-900">Goal 1</p>
                  <p className="text-gray-700">{goal.professionalGoal1Title}</p>
                </div>
              )}
              {goal.professionalGoal2Title && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-medium text-blue-900">Goal 2</p>
                  <p className="text-gray-700">{goal.professionalGoal2Title}</p>
                </div>
              )}
              {goal.professionalGoal3Title && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-medium text-blue-900">Goal 3</p>
                  <p className="text-gray-700">{goal.professionalGoal3Title}</p>
                </div>
              )}
            </div>
          </div>

          {/* Personal Goal */}
          {goal.personalGoalTitle && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Personal Goal</h4>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-gray-700">{goal.personalGoalTitle}</p>
              </div>
            </div>
          )}

          {/* Check-in Preferences */}
          {goal.checkInPreferences && goal.checkInPreferences.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Check-in Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {goal.checkInPreferences.map((pref, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Interviews Section Component
function InterviewsSection({ data }: { data: InterviewNote[] }) {
  // Helper to parse interview header metadata
  function parseInterviewHeader(notes: string) {
    const lines = notes.split('\n');
    const header: {
      title?: string;
      date?: string;
      participants?: string[];
      records?: { transcript?: string; recording?: string };
      remainingNotes: string;
    } = {
      participants: [],
      remainingNotes: '',
    };

    let inHeader = true;
    let inParticipants = false;
    let headerEndIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for title (# Title)
      if (line.startsWith('# ')) {
        header.title = line.replace('# ', '');
        continue;
      }

      // Check for date
      if (line.startsWith('**Date:**')) {
        header.date = line.replace('**Date:**', '').trim();
        continue;
      }

      // Check for participants section
      if (line.startsWith('**Participants:**')) {
        inParticipants = true;
        continue;
      }

      // Check for records
      if (line.startsWith('**Records:**')) {
        inParticipants = false;
        // Extract links if present
        const transcriptMatch = line.match(/\[Transcript\]\(([^)]+)\)/);
        const recordingMatch = line.match(/\[Recording\]\(([^)]+)\)/);
        header.records = {
          transcript: transcriptMatch ? transcriptMatch[1] : undefined,
          recording: recordingMatch ? recordingMatch[1] : undefined,
        };

        // Skip the Records line and check if next line is "---" (horizontal rule)
        let nextIndex = i + 1;
        if (nextIndex < lines.length) {
          const nextLine = lines[nextIndex].trim();
          if (nextLine === '---' || nextLine === '***' || nextLine === '___') {
            nextIndex++; // Skip the horizontal rule too
          }
          // Also skip any empty lines after the separator
          while (nextIndex < lines.length && !lines[nextIndex].trim()) {
            nextIndex++;
          }
        }

        headerEndIndex = nextIndex;
        inHeader = false;
        break;
      }

      // Collect participant names
      if (inParticipants && line.startsWith('-')) {
        header.participants?.push(line.replace('-', '').trim());
      }

      // If we hit a ## header or empty content, header section is over
      if (line.startsWith('## ') || (!line && i > 5)) {
        inHeader = false;
        headerEndIndex = i;
        break;
      }
    }

    // Get remaining notes (everything after header)
    header.remainingNotes = lines.slice(headerEndIndex).join('\n').trim();

    return header;
  }

  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No interview notes available for this filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((interview) => {
        const header = parseInterviewHeader(interview.notes);
        const sections = parseMarkdownSections(header.remainingNotes);

        return (
          <div key={interview.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Interview Header Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    {header.title || `${interview.user.fullName} Interview`}
                  </h3>
                  <div className="flex items-center gap-4 text-blue-100">
                    <span className="flex items-center gap-1">
                      📅 {header.date || new Date(interview.interviewDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    {interview.interviewType && (
                      <span className="px-2 py-1 bg-blue-500 bg-opacity-50 rounded text-xs">
                        {interview.interviewType}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Participants */}
              {header.participants && header.participants.length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-500">
                  <p className="text-xs uppercase tracking-wide text-blue-200 mb-2">Participants</p>
                  <div className="flex flex-wrap gap-2">
                    {header.participants.map((participant, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-800"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Records Links */}
              {header.records && (header.records.transcript || header.records.recording) && (
                <div className="mt-3 flex gap-3">
                  {header.records.transcript && header.records.transcript !== '#' && (
                    <a
                      href={header.records.transcript}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-100 hover:text-white underline"
                    >
                      📄 Transcript
                    </a>
                  )}
                  {header.records.recording && header.records.recording !== '#' && (
                    <a
                      href={header.records.recording}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-100 hover:text-white underline"
                    >
                      🎥 Recording
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Interview Notes Content */}
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                {sections.map((section, idx) => (
                  <div key={idx}>
                    {section.type === 'h2' ? (
                      <h2 className="text-xl font-bold text-blue-900 mt-6 mb-3 pb-2 border-b-2 border-blue-300 first:mt-0">
                        {section.content}
                      </h2>
                    ) : section.type === 'h3' ? (
                      <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-2 pb-1 border-b border-blue-200">
                        {section.content}
                      </h3>
                    ) : section.type === 'h4' ? (
                      <h4 className="text-base font-medium text-blue-700 mt-3 mb-1">
                        {section.content}
                      </h4>
                    ) : (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Action Items Section Component
function ActionItemsSection({ data, onRefresh }: { data: HRActionItem[]; onRefresh: () => void }) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allManagers, setAllManagers] = useState<User[]>([]);
  const [newAction, setNewAction] = useState({
    description: '',
    employeeId: '',
    assignedToId: '',
    dueDate: '',
    priority: 'MEDIUM',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('/api/hr-review');
      if (response.ok) {
        const hrData = await response.json();
        setAllUsers(hrData.allUsers || []);
        setAllManagers(hrData.allUsers?.filter((u: User) => u.isManager) || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function handleCreateAction() {
    if (!newAction.description.trim() || !newAction.employeeId) {
      alert('Please enter a description and select an employee');
      return;
    }

    try {
      const response = await fetch('/api/hr-action-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: newAction.description,
          employeeId: newAction.employeeId,
          assignedToId: newAction.assignedToId || null,
          dueDate: newAction.dueDate || null,
          priority: newAction.priority,
        }),
      });

      if (response.ok) {
        // Reset form
        setNewAction({
          description: '',
          employeeId: '',
          assignedToId: '',
          dueDate: '',
          priority: 'MEDIUM',
        });
        setShowAddForm(false);
        onRefresh();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating action item:', error);
      alert('Failed to create action item');
    }
  }

  const hasActions = data.length > 0;

  // Filter action items
  const filteredData = data.filter((action) => {
    if (filterStatus !== 'all' && action.status !== filterStatus) return false;
    if (filterPriority !== 'all' && action.priority !== filterPriority) return false;
    return true;
  });

  // Group by status
  const groupedByStatus = {
    PENDING: filteredData.filter(a => a.status === 'PENDING'),
    IN_PROGRESS: filteredData.filter(a => a.status === 'IN_PROGRESS'),
    COMPLETED: filteredData.filter(a => a.status === 'COMPLETED'),
    CANCELLED: filteredData.filter(a => a.status === 'CANCELLED'),
  };

  async function handleUpdateAction(actionId: string, updates: any) {
    try {
      // Handle delete
      if (updates.delete) {
        if (!confirm('Are you sure you want to delete this action item?')) {
          return;
        }

        const response = await fetch(`/api/hr-action-items/${actionId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onRefresh();
        } else {
          alert('Failed to delete action item');
        }
        return;
      }

      // Handle update
      const response = await fetch(`/api/hr-action-items/${actionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error updating action:', error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Manage Action Items</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          {showAddForm ? 'Cancel' : '+ Add Action Item'}
        </button>
      </div>

      {/* Add Action Form */}
      {showAddForm && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Create New Action Item</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={newAction.description}
                onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
                placeholder="What needs to be done?"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee (By) *</label>
                <select
                  value={newAction.employeeId}
                  onChange={(e) => setNewAction({ ...newAction, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select employee...</option>
                  {allUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To (For)</label>
                <select
                  value={newAction.assignedToId}
                  onChange={(e) => setNewAction({ ...newAction, assignedToId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Unassigned</option>
                  {allManagers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newAction.priority}
                  onChange={(e) => setNewAction({ ...newAction, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleCreateAction}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Create Action Item
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      {hasActions && (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                Showing {filteredData.length} of {data.length} actions
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Actions Message */}
      {!hasActions && !showAddForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">No action items found.</p>
          <p className="text-sm text-gray-500">Click "+ Add Action Item" to create one.</p>
        </div>
      )}

      {/* Action Items by Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending */}
        {groupedByStatus.PENDING.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
              Pending ({groupedByStatus.PENDING.length})
            </h3>
            <div className="space-y-3">
              {groupedByStatus.PENDING.map((action) => (
                <ActionItemCard key={action.id} action={action} onUpdate={handleUpdateAction} />
              ))}
            </div>
          </div>
        )}

        {/* In Progress */}
        {groupedByStatus.IN_PROGRESS.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              In Progress ({groupedByStatus.IN_PROGRESS.length})
            </h3>
            <div className="space-y-3">
              {groupedByStatus.IN_PROGRESS.map((action) => (
                <ActionItemCard key={action.id} action={action} onUpdate={handleUpdateAction} />
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {groupedByStatus.COMPLETED.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              Completed ({groupedByStatus.COMPLETED.length})
            </h3>
            <div className="space-y-3">
              {groupedByStatus.COMPLETED.map((action) => (
                <ActionItemCard key={action.id} action={action} onUpdate={handleUpdateAction} />
              ))}
            </div>
          </div>
        )}

        {/* Cancelled */}
        {groupedByStatus.CANCELLED.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
              Cancelled ({groupedByStatus.CANCELLED.length})
            </h3>
            <div className="space-y-3">
              {groupedByStatus.CANCELLED.map((action) => (
                <ActionItemCard key={action.id} action={action} onUpdate={handleUpdateAction} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Action Item Card Component
function ActionItemCard({ action, onUpdate }: { action: HRActionItem; onUpdate: (id: string, updates: any) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [allManagers, setAllManagers] = useState<User[]>([]);
  const [editData, setEditData] = useState({
    assignedToId: action.assignedToId || '',
    dueDate: action.dueDate ? new Date(action.dueDate).toISOString().split('T')[0] : '',
    priority: action.priority,
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  async function fetchManagers() {
    try {
      const response = await fetch('/api/hr-review');
      if (response.ok) {
        const hrData = await response.json();
        const managers = hrData.allUsers?.filter((u: User) => u.isManager) || [];
        setAllManagers(managers);
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  }

  function handleSave() {
    onUpdate(action.id, {
      assignedToId: editData.assignedToId || null,
      dueDate: editData.dueDate || null,
      priority: editData.priority,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditData({
      assignedToId: action.assignedToId || '',
      dueDate: action.dueDate ? new Date(action.dueDate).toISOString().split('T')[0] : '',
      priority: action.priority,
    });
    setIsEditing(false);
  }

  return (
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <select
              value={action.status}
              onChange={(e) => onUpdate(action.id, { status: e.target.value })}
              className={`text-xs px-2 py-1 rounded font-medium border ${
                action.status === 'COMPLETED'
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : action.status === 'IN_PROGRESS'
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : action.status === 'CANCELLED'
                  ? 'bg-gray-100 text-gray-800 border-gray-300'
                  : 'bg-yellow-100 text-yellow-800 border-yellow-300'
              }`}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            {!isEditing ? (
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                action.priority === 'URGENT'
                  ? 'bg-red-100 text-red-800'
                  : action.priority === 'HIGH'
                  ? 'bg-orange-100 text-orange-800'
                  : action.priority === 'MEDIUM'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {action.priority}
              </span>
            ) : (
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                className="text-xs px-2 py-1 rounded font-medium border border-gray-300"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            )}
          </div>
          <p className="text-sm text-gray-900 mb-2">{action.description}</p>

          {!isEditing ? (
            <div className="flex flex-col gap-1 text-xs text-gray-600">
              <div className="flex items-center gap-4">
                {action.assignedTo && (
                  <span>👤 For: {action.assignedTo.fullName}</span>
                )}
                <span>✋ By: {action.employee.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                {action.dueDate && (
                  <span>📅 Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                )}
                {action.completedAt && (
                  <span>✅ Done: {new Date(action.completedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2 mt-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Assigned To (For)</label>
                  <select
                    value={editData.assignedToId}
                    onChange={(e) => setEditData({ ...editData, assignedToId: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  >
                    <option value="">Unassigned</option>
                    {allManagers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-1 ml-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 text-xs font-medium"
              title="Edit action item"
            >
              ✏️
            </button>
          )}
          <button
            onClick={() => onUpdate(action.id, { delete: true })}
            className="text-red-600 hover:text-red-800 text-xs font-medium"
            title="Delete action item"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function MetricDisplay({ label, value }: { label: string; value: number | null }) {
  if (value === null) return null;

  const percentage = (value / 10) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-blue-600">{value}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function TextResponse({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <p className="text-gray-900 text-sm bg-gray-50 p-3 rounded border border-gray-200">
        {text}
      </p>
    </div>
  );
}

// Payrise Calculator Section Component
interface EmployeeSalary {
  name: string;
  currentMonthlySalary: number;
}

interface PayriseData {
  [name: string]: {
    dollarAmount: number;
    percentage: number;
  };
}

function PayriseCalculatorSection() {
  const fullTimeEmployees: EmployeeSalary[] = [
    { name: "Tarun Sengar", currentMonthlySalary: 3353.27 },
    { name: "Nirali Dudharejiya", currentMonthlySalary: 3046.09 },
    { name: "Xinyan Zhang", currentMonthlySalary: 5390.56 },
    { name: "Lujia Yang (Nora)", currentMonthlySalary: 4679.91 },
    { name: "Juan Bac", currentMonthlySalary: 3056.30 },
    { name: "Kristy Kohlmann", currentMonthlySalary: 1491.67 },
    { name: "Aida Cristina Ibarra Sarabia", currentMonthlySalary: 1700.72 },
    { name: "Perla Luque", currentMonthlySalary: 1309.97 },
    { name: "Benjamin Dib", currentMonthlySalary: 800.00 },
    { name: "Alejandra Bedoya Mejia", currentMonthlySalary: 380.86 },
  ];

  const [mode, setMode] = useState<'individual' | 'budget'>('individual');
  const [payriseData, setPayriseData] = useState<PayriseData>({});
  const [totalBudget, setTotalBudget] = useState<number>(0);

  useEffect(() => {
    // Initialize payrise data
    const initialData: PayriseData = {};
    fullTimeEmployees.forEach(emp => {
      initialData[emp.name] = {
        dollarAmount: 0,
        percentage: 0
      };
    });
    setPayriseData(initialData);
  }, []);

  const updatePayriseAmount = (empName: string, amount: number) => {
    const emp = fullTimeEmployees.find(e => e.name === empName);
    const percentage = emp ? (amount / emp.currentMonthlySalary * 100) : 0;

    setPayriseData(prev => ({
      ...prev,
      [empName]: {
        dollarAmount: amount,
        percentage: percentage
      }
    }));
  };

  const updatePayrisePercent = (empName: string, percent: number) => {
    const emp = fullTimeEmployees.find(e => e.name === empName);
    const dollarAmount = emp ? (emp.currentMonthlySalary * percent / 100) : 0;

    setPayriseData(prev => ({
      ...prev,
      [empName]: {
        dollarAmount: dollarAmount,
        percentage: percent
      }
    }));
  };

  const applyEqualPayrise = () => {
    if (mode === 'budget' && totalBudget > 0) {
      const monthlyBudget = totalBudget / 12;
      const equalAmount = monthlyBudget / fullTimeEmployees.length;

      const newData: PayriseData = {};
      fullTimeEmployees.forEach(emp => {
        const percentage = (equalAmount / emp.currentMonthlySalary * 100);
        newData[emp.name] = {
          dollarAmount: equalAmount,
          percentage: percentage
        };
      });
      setPayriseData(newData);
    } else {
      const newData: PayriseData = {};
      fullTimeEmployees.forEach(emp => {
        const percentage = (100 / emp.currentMonthlySalary * 100);
        newData[emp.name] = {
          dollarAmount: 100,
          percentage: percentage
        };
      });
      setPayriseData(newData);
    }
  };

  const applyPerformancePayrise = () => {
    if (mode === 'budget' && totalBudget > 0) {
      const monthlyBudget = totalBudget / 12;
      const totalCurrentSalary = fullTimeEmployees.reduce((sum, emp) => sum + emp.currentMonthlySalary, 0);

      const newData: PayriseData = {};
      fullTimeEmployees.forEach(emp => {
        const proportion = emp.currentMonthlySalary / totalCurrentSalary;
        const dollarAmount = monthlyBudget * proportion;
        const percentage = (dollarAmount / emp.currentMonthlySalary * 100);

        newData[emp.name] = {
          dollarAmount: dollarAmount,
          percentage: percentage
        };
      });
      setPayriseData(newData);
    } else {
      const newData: PayriseData = {};
      fullTimeEmployees.forEach(emp => {
        const percentage = emp.currentMonthlySalary > 3000 ? 10 : 5;
        const dollarAmount = emp.currentMonthlySalary * percentage / 100;

        newData[emp.name] = {
          dollarAmount: dollarAmount,
          percentage: percentage
        };
      });
      setPayriseData(newData);
    }
  };

  const apply5PercentAll = () => {
    const newData: PayriseData = {};
    fullTimeEmployees.forEach(emp => {
      const dollarAmount = emp.currentMonthlySalary * 0.05;
      newData[emp.name] = {
        dollarAmount: dollarAmount,
        percentage: 5
      };
    });
    setPayriseData(newData);
  };

  const clearAllPayrises = () => {
    const newData: PayriseData = {};
    fullTimeEmployees.forEach(emp => {
      newData[emp.name] = {
        dollarAmount: 0,
        percentage: 0
      };
    });
    setPayriseData(newData);
  };

  const currentPayroll = fullTimeEmployees.reduce((sum, emp) => sum + emp.currentMonthlySalary, 0);
  const totalIncrease = Object.values(payriseData).reduce((sum, data) => sum + (data.dollarAmount || 0), 0);
  const newPayroll = currentPayroll + totalIncrease;
  const annualIncrease = totalIncrease * 12;
  const budgetRemaining = totalBudget - annualIncrease;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">💰 Payrise Calculator - Full-Time Employees</h2>
        <p className="text-green-50 mt-1">Plan salary increases for your team</p>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode('individual')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            mode === 'individual'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Individual Payrises
        </button>
        <button
          onClick={() => setMode('budget')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            mode === 'budget'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Budget Allocation
        </button>
      </div>

      {/* Budget Input (only in budget mode) */}
      {mode === 'budget' && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Annual Budget ($):
          </label>
          <input
            type="number"
            value={totalBudget || ''}
            onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 20000"
          />
        </div>
      )}

      {/* Budget Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Current Payroll</div>
          <div className="text-xl font-bold text-gray-900">
            ${(currentPayroll * 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-xs text-green-700 mb-1">Total Increase</div>
          <div className="text-xl font-bold text-green-600">
            +${annualIncrease.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr
          </div>
        </div>
        {mode === 'budget' && (
          <div className={`p-4 rounded-lg border ${budgetRemaining >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-xs mb-1 ${budgetRemaining >= 0 ? 'text-blue-700' : 'text-red-700'}`}>Budget Remaining</div>
            <div className={`text-xl font-bold ${budgetRemaining >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              ${budgetRemaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        )}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-xs text-purple-700 mb-1">New Payroll</div>
          <div className="text-xl font-bold text-purple-600">
            ${(newPayroll * 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={applyEqualPayrise}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
        >
          📊 Equal Distribution
        </button>
        <button
          onClick={applyPerformancePayrise}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium text-sm"
        >
          ⭐ Performance-Based
        </button>
        <button
          onClick={apply5PercentAll}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
        >
          📈 5% Across the Board
        </button>
        <button
          onClick={clearAllPayrises}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm"
        >
          🗑️ Clear All
        </button>
      </div>

      {/* Employee Payrise Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Employee</th>
              <th className="px-4 py-3 text-right font-semibold">Current Monthly</th>
              <th className="px-4 py-3 text-right font-semibold">Annual Salary</th>
              <th className="px-4 py-3 text-right font-semibold">Payrise ($)</th>
              <th className="px-4 py-3 text-right font-semibold">Payrise (%)</th>
              <th className="px-4 py-3 text-right font-semibold">New Monthly</th>
              <th className="px-4 py-3 text-right font-semibold">New Annual</th>
              <th className="px-4 py-3 text-right font-semibold">Annual Increase</th>
            </tr>
          </thead>
          <tbody>
            {fullTimeEmployees.map((emp, index) => {
              const currentAnnual = emp.currentMonthlySalary * 12;
              const payriseAmount = payriseData[emp.name]?.dollarAmount || 0;
              const payrisePercent = payriseData[emp.name]?.percentage || 0;
              const newMonthly = emp.currentMonthlySalary + payriseAmount;
              const newAnnual = newMonthly * 12;
              const annualIncreaseForEmp = payriseAmount * 12;

              return (
                <tr key={emp.name} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">{emp.name}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    ${emp.currentMonthlySalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    ${currentAnnual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={payriseAmount || ''}
                      onChange={(e) => updatePayriseAmount(emp.name, parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={payrisePercent ? payrisePercent.toFixed(2) : ''}
                      onChange={(e) => updatePayrisePercent(emp.name, parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">
                    ${newMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">
                    ${newAnnual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">
                    +${annualIncreaseForEmp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
