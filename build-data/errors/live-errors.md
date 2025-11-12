# Live Errors Log

**Purpose:** This is a living document that tracks current/active errors and warnings affecting development.

**How It Works:**
- Errors are added to this log when discovered (blocking or non-blocking)
- Each error gets a unique ID (ERROR-XXX) for tracking
- When errors are FIXED, they are removed from this document
- Git commit history preserves the full timeline of issues and resolutions
- Use `git log -p live-errors.md` to see historical errors and fixes

**When to Add Entries:**
- Development server errors/warnings
- Build failures or warnings
- Runtime errors in production
- Configuration issues
- Dependency conflicts
- Known bugs awaiting fixes

**Status Definitions:**
- 🔴 **Critical:** Blocking development or production
- 🟡 **Active:** Issue present but not blocking
- 🔵 **Investigating:** Root cause not yet identified
- ✅ **Fixed:** Resolved (entry removed, tracked in git history)

**Priority Levels:**
- **P0 (Critical):** Must fix immediately
- **P1 (High):** Fix this sprint
- **P2 (Medium):** Fix next sprint or when convenient
- **P3 (Low):** Document only, fix when time permits

---

## Table of Contents

| ID | Error | Status | Priority | Date Added |
|----|-------|--------|----------|------------|
| [ERROR-001](#error-001-data-extraction-review-button-redirects-to-dashboard) | Data Extraction Review button redirects to dashboard | 🟡 Active | P1 (High) | 2025-11-11 |
---

<!-- Errors are added below this line -->

## ERROR-001: Data Extraction Review button redirects to dashboard

**Date Reported:** 2025-11-11
**Status:** 🟡 Active
**Priority:** P1 (High)
**Impact:** [To be determined - update after research]

### Error Message

```
[Claude will fill this in during research]
```

### When It Appears

[Claude will document reproduction steps]

### Root Cause

[Claude will analyze and document root cause]

### Solution Options

[Claude will provide multiple solution options with pros/cons]

### Files Involved

[Claude will list affected files with line numbers]

### Current Status

**Decision:** Under investigation
**Last Updated:** 2025-11-11

**See:** [`ER-001-data-extraction-review-button-redirects-to-dashboard.md`](./debug/ER-001-data-extraction-review-button-redirects-to-dashboard.md) for detailed analysis

---

