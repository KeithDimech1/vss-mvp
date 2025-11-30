# 02 HR Review

**App Route:** `/hr-review`
**Status:** REBUILDING - Original content deleted accidentally

## Overview

HR Review Dashboard 2025 - Employee feedback, goals, and interview notes.

## Features

### Feedback Survey
- Work Engagement (autonomy, motivation, team connection, support ratings)
- Achievement & Recognition
- Tools & AI Usage
- Career Development
- Vision & Goals

### Goal Setting
- Professional Goals (up to 3)
- Personal Goal (non-work related)
- Check-in Preferences

### Interview Notes
- Structured interview content with markdown parsing
- Key themes extraction
- Action items tracking
- Transcript/Recording links

### Action Items
- Status: PENDING, IN_PROGRESS, COMPLETED, CANCELLED
- Priority: LOW, MEDIUM, HIGH, URGENT
- Employee/Manager assignment
- Due date tracking

### Payrise Calculator
- Full-time employee salary management
- Equal distribution / Performance-based / 5% across board options
- Budget allocation mode
- Annual increase calculations

## Database Models

See `prisma/schema.prisma`:
- `HRFeedbackSurvey` - Employee feedback survey responses
- `HRGoalSetting` - Annual goal setting
- `HRInterviewNote` - Interview notes with markdown content
- `HRActionItem` - Follow-up actions
- `UserManager` - Manager-employee relationships

## Subfolders

- `documentation/` - HR processes, policies
- `learning/` - Interview templates, best practices
- `assets/` - CSV imports, survey templates
- `response/` - Interview transcripts, feedback reports

## TODO

- [ ] Rebuild interview note templates
- [ ] Add CSV data sources (Employee_Feedback_Survey_2025.csv)
- [ ] Document HR workflows
