'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  fullName: string;
  isManager: boolean;
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
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No interview notes available for this filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((interview) => (
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

          {/* Interview Notes */}
          <div className="prose max-w-none">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                {interview.notes}
              </pre>
            </div>
          </div>
        </div>
      ))}
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
