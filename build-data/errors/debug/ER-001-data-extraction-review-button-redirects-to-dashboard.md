# Data Extraction Review button redirects to dashboard Debug Log

**Issue Reported:** Navigation link redirects to dashboard instead of data extraction page
**Date:** 2025-11-11
**Status:** 🟡 Active
**Priority:** P1 (High)
**Context:** User clicked "Data Extraction Review" in sidebar, was redirected back to dashboard

---

## Error Description

When clicking the "Data Extraction Review" link in the sidebar (which should navigate to `/data-extraction/process`), the page loads briefly but immediately redirects back to `/dashboard`.

## Server Logs

```
GET /data-extraction/process 200 in 10ms (compile: 1123µs, proxy.ts: 1249µs, render: 8ms)
GET /dashboard 200 in 20ms (compile: 4ms, proxy.ts: 3ms, render: 13ms)
```

**Pattern:** Page successfully loads (200 status) but then redirects to dashboard immediately after.

---

## Root Cause Analysis

**Authorization Logic Mismatch:**

The data extraction pages have authorization checks that only allow users with usernames `'juan'`, `'keith'`, or `'fabian'` (lowercase).

**File:** `src/app/(dashboard)/data-extraction/process/page.tsx:42-44`
```typescript
// Only Juan, Keith, and Fabian can access this page
const allowedUsers = ['juan', 'keith', 'fabian'];
if (!allowedUsers.includes(username)) {
  redirect('/dashboard');
}
```

**However, the user is likely logging in with a different username format:**

Looking at the server logs:
```
[LOGIN] Received username: keith@clair.au
[LOGIN] User not found: keith@clair.au
...
[LOGIN] Received username: keith
[LOGIN] User found, verifying password
```

The user is logging in as `keith`, which should work. But there may be:
1. **Case sensitivity issue** - Username stored as `Keith` (capitalized) in database
2. **Email format** - User trying to login with `keith@clair.au` instead of `keith`

---

## Files Involved

**Need to examine:**
1. `src/app/(dashboard)/data-extraction/process/page.tsx:42-44` - Authorization check
2. `src/app/(dashboard)/data-extraction/questions/page.tsx` - Same auth logic
3. `src/app/(dashboard)/data-extraction/research/page.tsx` - Same auth logic
4. `src/app/(dashboard)/layout.tsx:77` - Sidebar visibility check
5. Database: Check actual username values for keith, juan, fabian

---

## Hypotheses to Test

1. **Theory: Username case mismatch**
   - Database has `Keith` (capitalized) but code checks for `keith` (lowercase)
   - **Test:** Query database to check actual username
   - **Result:** Need to verify

2. **Theory: User not in allowed list**
   - Logged in as different user
   - **Test:** Check session data
   - **Result:** Logs show successful login as `keith`

---

## Solution Options

### Option 1: Make username check case-insensitive (RECOMMENDED)

**Approach:**
```typescript
// Instead of:
if (!allowedUsers.includes(username)) {

// Use:
if (!allowedUsers.includes(username.toLowerCase())) {
```

**Pros:**
- ✅ Handles case variations (Keith, keith, KEITH)
- ✅ Simple one-line fix
- ✅ Consistent with login behavior

**Cons:**
- ❌ Assumes usernames should be case-insensitive

### Option 2: Update database usernames to lowercase

**Approach:**
- Update all usernames in database to lowercase
- Ensure consistency across all records

**Pros:**
- ✅ Fixes root cause
- ✅ Prevents future issues

**Cons:**
- ❌ Requires database migration
- ❌ May affect other parts of system

### Option 3: Check sidebar authorization logic

**Approach:**
- Ensure `canAccessDataExtraction` check in layout.tsx matches page authorization

**Files to check:**
```typescript
// layout.tsx:77
const canAccessDataExtraction = ['juan', 'keith', 'fabian'].includes(session?.username || '');
```

**Pros:**
- ✅ Ensures consistency

**Cons:**
- ❌ Still has same case sensitivity issue

---

## Recommended Fix

**Implement Option 1 + Option 3:**

1. Make all username checks case-insensitive in:
   - `src/app/(dashboard)/data-extraction/process/page.tsx:42`
   - `src/app/(dashboard)/data-extraction/questions/page.tsx` (similar line)
   - `src/app/(dashboard)/data-extraction/research/page.tsx` (similar line)
   - `src/app/(dashboard)/layout.tsx:77`

2. Apply to all 4 locations:
```typescript
const allowedUsers = ['juan', 'keith', 'fabian'];
if (!allowedUsers.includes(username.toLowerCase())) {
  redirect('/dashboard');
}
```

---

## Affected Files

1. `src/app/(dashboard)/data-extraction/process/page.tsx:42`
2. `src/app/(dashboard)/data-extraction/questions/page.tsx` (similar location)
3. `src/app/(dashboard)/data-extraction/research/page.tsx` (similar location)
4. `src/app/(dashboard)/layout.tsx:77`

---

## Next Steps

**To investigate:**
- [x] Identify root cause (authorization mismatch)
- [x] Locate all files with authorization checks
- [x] Determine best solution approach
- [ ] Implement fix (case-insensitive username check)
- [ ] Test with all three users (juan, keith, fabian)
- [ ] Verify sidebar link and page access work correctly

**Commands to use:**
- `/debug-mode` - Start systematic debugging session
- `/resolve ERROR-001` - Mark as resolved and archive immediately

---

**Use `/debug-mode` to start a systematic debugging session with full audit trail.**

<!-- Debug sessions will be appended below this line -->

---

## Session 1 - Implementation

**Date:** 2025-11-11
**Goal:** Implement case-insensitive username check across all data extraction pages

### Changes Made

#### Change #1: Fix authorization in process page

**File:** `src/app/(dashboard)/data-extraction/process/page.tsx`
**Lines:** 42
**Type:** Bug fix

**Before:**
```typescript
// Only Juan, Keith, and Fabian can access this page
const allowedUsers = ['juan', 'keith', 'fabian'];
if (!allowedUsers.includes(username)) {
  redirect('/dashboard');
}
```

**After:**
```typescript
// Only Juan, Keith, and Fabian can access this page
const allowedUsers = ['juan', 'keith', 'fabian'];
if (!allowedUsers.includes(username.toLowerCase())) {
  redirect('/dashboard');
}
```

**Reason:** Username might be stored with capital letters in database (Keith, Juan, Fabian), causing authorization check to fail even for authorized users.

#### Change #2: Fix authorization in questions page

**File:** `src/app/(dashboard)/data-extraction/questions/page.tsx`
**Lines:** 43
**Type:** Bug fix

**Before:**
```typescript
if (!allowedUsers.includes(username)) {
  redirect('/dashboard');
}
```

**After:**
```typescript
if (!allowedUsers.includes(username.toLowerCase())) {
  redirect('/dashboard');
}
```

**Reason:** Same case-sensitivity issue as process page.

#### Change #3: Fix authorization in research page

**File:** `src/app/(dashboard)/data-extraction/research/page.tsx`
**Lines:** 37
**Type:** Bug fix

**Before:**
```typescript
if (!allowedUsers.includes(dbUser.username)) {
  redirect('/dashboard');
}
```

**After:**
```typescript
if (!allowedUsers.includes(dbUser.username.toLowerCase())) {
  redirect('/dashboard');
}
```

**Reason:** Same case-sensitivity issue. Note this page uses `dbUser.username` instead of `username` variable.

#### Change #4: Fix sidebar visibility check

**File:** `src/app/(dashboard)/layout.tsx`
**Lines:** 77
**Type:** Bug fix

**Before:**
```typescript
const canAccessDataExtraction = ['juan', 'keith', 'fabian'].includes(session?.username || '');
```

**After:**
```typescript
const canAccessDataExtraction = ['juan', 'keith', 'fabian'].includes((session?.username || '').toLowerCase());
```

**Reason:** Ensure sidebar link visibility check uses same case-insensitive logic as page authorization.

---

### Manual Tests Requested

🧪 **Test #1: Click Data Extraction Review button**

**Steps:**
1. Login as Keith (or Juan/Fabian)
2. Look for "Data Extraction Review" link in sidebar (should be visible)
3. Click the "Data Extraction Review" link
4. Observe what happens

**Expected:**
- Page should navigate to `/data-extraction/process`
- Should see the Process Visualization page with 8-step flowchart
- Should NOT redirect back to dashboard

**Actual:** [Awaiting test results]

**Result:** [ ] Pass / [ ] Fail

---

🧪 **Test #2: Navigate between all three data extraction pages**

**Steps:**
1. From Process page, click "Next: Questions" at bottom
2. Should reach `/data-extraction/questions`
3. Click "Next: Research Hub"
4. Should reach `/data-extraction/research`
5. Navigate back through pages

**Expected:**
- All three pages load without redirecting to dashboard
- Navigation works smoothly

**Actual:** [Awaiting test results]

**Result:** [ ] Pass / [ ] Fail

---

### Summary of Changes

**Files Modified:** 4
1. ✅ `src/app/(dashboard)/data-extraction/process/page.tsx:43`
2. ✅ `src/app/(dashboard)/data-extraction/questions/page.tsx:43`
3. ✅ `src/app/(dashboard)/data-extraction/research/page.tsx:37`
4. ✅ `src/app/(dashboard)/layout.tsx:77`

**Change Type:** Case-insensitive username comparison
**Lines Changed:** 4 (one per file)
**Net Change:** +4 characters (`.toLowerCase()` added 4 times)

---
