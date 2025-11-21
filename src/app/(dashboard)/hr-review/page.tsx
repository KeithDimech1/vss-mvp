'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Helper function to parse markdown and render formatted sections
function parseMarkdownSections(markdown: string) {
  const lines = markdown.split('\n');
  const sections: { type: 'header' | 'text'; content: string }[] = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      // This is a header
      sections.push({ type: 'header', content: line.replace('## ', '') });
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
  const [activeSection, setActiveSection] = useState<'feedback' | 'goals' | 'interviews'>('feedback');

  useEffect(() => {
    fetchData();
  }, [selectedUserId]);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const url = selectedUserId === 'all'
        ? '/api/hr-review'
        : `/api/hr-review?userId=${selectedUserId}`;

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

        {/* Employee Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <label htmlFor="employee-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Employee
          </label>
          <select
            id="employee-filter"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
  const [actionItems, setActionItems] = useState<Record<string, HRActionItem[]>>({});
  const [showAddActionForm, setShowAddActionForm] = useState<string | null>(null);
  const [allManagers, setAllManagers] = useState<User[]>([]);
  const [newAction, setNewAction] = useState({
    description: '',
    assignedToId: '',
    dueDate: '',
    priority: 'MEDIUM',
  });

  // Fetch managers and action items for interviews
  useEffect(() => {
    fetchManagers();
    if (data.length > 0) {
      data.forEach((interview) => {
        fetchActionItems(interview.id);
      });
    }
  }, [data]);

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

  async function fetchActionItems(interviewNoteId: string) {
    try {
      const response = await fetch(`/api/hr-action-items?interviewNoteId=${interviewNoteId}`);
      if (response.ok) {
        const data = await response.json();
        setActionItems((prev) => ({
          ...prev,
          [interviewNoteId]: data.actionItems || [],
        }));
      }
    } catch (error) {
      console.error('Error fetching action items:', error);
    }
  }

  async function handleCreateAction(interview: InterviewNote) {
    if (!newAction.description.trim()) {
      alert('Please enter an action description');
      return;
    }

    try {
      const response = await fetch('/api/hr-action-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: newAction.description,
          employeeId: interview.userId,
          assignedToId: newAction.assignedToId || null,
          dueDate: newAction.dueDate || null,
          priority: newAction.priority,
          interviewNoteId: interview.id,
        }),
      });

      if (response.ok) {
        // Reset form
        setNewAction({
          description: '',
          assignedToId: '',
          dueDate: '',
          priority: 'MEDIUM',
        });
        setShowAddActionForm(null);

        // Refresh action items
        await fetchActionItems(interview.id);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating action item:', error);
      alert('Failed to create action item');
    }
  }

  async function handleUpdateActionStatus(actionId: string, newStatus: string, interviewNoteId: string) {
    try {
      const response = await fetch(`/api/hr-action-items/${actionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh action items
        await fetchActionItems(interviewNoteId);
      }
    } catch (error) {
      console.error('Error updating action item:', error);
    }
  }

  // Parse action items from interview notes
  function parseActionItemsFromNotes(notes: string): string[] {
    const actionItems: string[] = [];
    const lines = notes.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Look for patterns like:
      // - **Name:** Will/Should/Must do something
      // - **Name:** To do something
      // - - **Name:** Will do something
      const patterns = [
        /^-?\s*\*\*([^*]+):\*\*\s+(.+)/,  // Matches: - **Keith Dimech:** Will send...
        /^\*\*([^*]+):\*\*\s+(.+)/,       // Matches: **Keith Dimech:** Will send...
      ];

      for (const pattern of patterns) {
        const match = trimmedLine.match(pattern);
        if (match) {
          const actionText = match[2].trim();
          // Only include if it looks like an action (starts with action words)
          if (/^(will|should|must|to|needs? to|going to)/i.test(actionText)) {
            actionItems.push(actionText);
          }
          break;
        }
      }
    }

    return actionItems;
  }

  async function handleImportActionsFromNotes(interview: InterviewNote) {
    const parsedActions = parseActionItemsFromNotes(interview.notes);

    if (parsedActions.length === 0) {
      alert('No action items found in the interview notes. Action items should be formatted like:\n\n**Name:** Will do something\n- **Name:** Should complete task');
      return;
    }

    const confirmMessage = `Found ${parsedActions.length} action item(s) in the notes:\n\n${parsedActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\nImport these as action items?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      // Create all action items
      let successCount = 0;
      for (const description of parsedActions) {
        const response = await fetch('/api/hr-action-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description,
            employeeId: interview.userId,
            interviewNoteId: interview.id,
            priority: 'MEDIUM',
            status: 'PENDING',
          }),
        });

        if (response.ok) {
          successCount++;
        }
      }

      if (successCount > 0) {
        alert(`Successfully imported ${successCount} action item(s)!`);
        // Refresh action items
        await fetchActionItems(interview.id);
      }
    } catch (error) {
      console.error('Error importing action items:', error);
      alert('Failed to import action items');
    }
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
        const sections = parseMarkdownSections(interview.notes);
        const interviewActions = actionItems[interview.id] || [];

        return (
          <div key={interview.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Employee Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{interview.user.fullName}</h3>
                <p className="text-sm text-gray-600">@{interview.user.username} {interview.user.isManager && '• Manager'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(interview.interviewDate).toLocaleDateString()}
                </p>
                {interview.interviewType && (
                  <p className="text-xs text-gray-400">{interview.interviewType}</p>
                )}
              </div>
            </div>

            {/* Interview Notes with Formatted Sections */}
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                {sections.map((section, idx) => (
                  <div key={idx}>
                    {section.type === 'header' ? (
                      <h4 className="text-lg font-bold text-blue-900 mt-4 mb-2 pb-2 border-b-2 border-blue-200">
                        {section.content}
                      </h4>
                    ) : (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items Section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Action Items ({interviewActions.length})</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleImportActionsFromNotes(interview)}
                    className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    title="Import action items from interview notes"
                  >
                    📥 Import from Notes
                  </button>
                  <button
                    onClick={() => setShowAddActionForm(showAddActionForm === interview.id ? null : interview.id)}
                    className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {showAddActionForm === interview.id ? 'Cancel' : '+ Add Action'}
                  </button>
                </div>
              </div>

              {/* Add Action Form */}
              {showAddActionForm === interview.id && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newAction.description}
                        onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        rows={3}
                        placeholder="What needs to be done?"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
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
                      onClick={() => handleCreateAction(interview)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create Action Item
                    </button>
                  </div>
                </div>
              )}

              {/* Action Items List */}
              {interviewActions.length > 0 ? (
                <div className="space-y-2">
                  {interviewActions.map((action) => (
                    <div
                      key={action.id}
                      className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <select
                              value={action.status}
                              onChange={(e) => handleUpdateActionStatus(action.id, e.target.value, interview.id)}
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
                          </div>
                          <p className="text-sm text-gray-900 mb-1">{action.description}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            {action.assignedTo && (
                              <span>👤 {action.assignedTo.fullName}</span>
                            )}
                            {action.dueDate && (
                              <span>📅 {new Date(action.dueDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No action items yet</p>
              )}
            </div>
          </div>
        );
      })}
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
