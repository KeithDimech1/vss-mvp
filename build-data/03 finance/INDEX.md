# 03 Finance

**App Route:** `/finance`
**Status:** REBUILDING - Original content deleted accidentally

## Overview

Lithodat Finance Dashboard - Task tracking, metrics, and calendar views.

## Features

### Metrics Dashboard
- Dext published/total counts
- Unreconciled lines tracking
- Bills paid/due this week
- Payroll completion status
- Readiness score calculation

### Task Management
- Categories: CRITICAL, DAILY, WEEKLY, MONTH_END, CUSTOM
- Priorities: HIGH, MEDIUM, LOW
- Statuses: PENDING, IN_PROGRESS, COMPLETED, SNOOZED, OVERDUE
- Recurring rules support
- Task comments

### Calendar View
- Monthly navigation
- Task visualization by date
- Due date tracking

### Month End Summary
- Total spend tracking
- Spend by category (JSON)
- Variances tracking
- Cash balance
- Upcoming expenses

## Database Models

See `prisma/schema.prisma`:
- `FinanceTask` - Task tracking with categories and priorities
- `FinanceComment` - Task comments
- `FinanceMetric` - Daily/monthly metrics
- `MonthEndSummary` - Monthly financial summaries

## Components

- `src/components/finance/MetricsDashboard.tsx`
- `src/components/finance/TaskList.tsx`
- `src/components/finance/CalendarView.tsx`

## Subfolders

- `documentation/` - Finance procedures, Dext workflows
- `learning/` - Accounting best practices
- `assets/` - Templates, reports
- `response/` - Month-end reports, reconciliation notes

## TODO

- [ ] Rebuild task templates (recurring rules)
- [ ] Document Dext integration workflow
- [ ] Add month-end checklist
