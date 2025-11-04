# Troubleshooting Guide

## Issue: Action Responses Not Displaying After Save

**Date:** November 4, 2025
**Status:** ✅ Resolved

### Problem Description

Users were able to save action responses to the database, but when refreshing the page or navigating back to the action form, their previously saved responses were not appearing in the form fields. The form would display as empty even though the data existed in the database.

### Symptoms

1. **Database had the data** - Prisma queries confirmed responses were saved with all fields populated
2. **Form showed empty** - All input fields appeared blank on page load
3. **Browser console showed empty object** - Client component received `initialResponses: {}`
4. **Question IDs matched** - All frontend question IDs matched database keys correctly
5. **No visible errors** - No errors in browser console or server logs

### Root Cause

The issue was caused by **Next.js deployment caching** combined with a lack of explicit error handling around the Prisma database query. The server component was likely failing to fetch data from the database silently, or cached responses were being served.

Key contributing factors:
1. **Missing error handling** - Database query in `page.tsx` had no try/catch block
2. **Silent failures** - Errors in server components don't always surface to the client
3. **Deployment cache** - Next.js was potentially serving cached page snapshots
4. **Cache directives not working** - Despite `dynamic = 'force-dynamic'` and `revalidate = 0`

### Solution

The fix required **three changes**:

#### 1. Add POST→PATCH Fallback Logic (`ActionFormWrapper.tsx`)

**File:** `src/components/actions/ActionFormWrapper.tsx`
**Lines:** 44-95, 108-181

Added automatic retry logic to handle the case where the frontend thinks a response doesn't exist but the database has one (unique constraint violation):

```typescript
const autoSave = useCallback(async () => {
  if (!hasUnsavedChanges) return;
  setIsSaving(true);
  setSaveError(null);

  try {
    const method = responseExists ? 'PATCH' : 'POST';
    let response = await fetch(`/api/actions/${actionId}/responses`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responses, completed: false }),
    });

    // If POST failed due to unique constraint, try PATCH instead
    if (!response.ok && method === 'POST') {
      const errorData = await response.json();
      if (errorData.error?.includes('already exists') || response.status === 400) {
        console.log('[AutoSave] Response exists, retrying with PATCH...');
        response = await fetch(`/api/actions/${actionId}/responses`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responses, completed: false }),
        });
      }
    }

    if (!response.ok) throw new Error('Failed to save responses');
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
    setResponseExists(true);
  } catch (error) {
    console.error('Auto-save error:', error);
    setSaveError('Failed to auto-save. Your changes may not be saved.');
  } finally {
    setIsSaving(false);
  }
}, [responses, hasUnsavedChanges, actionId, responseExists]);
```

**Why this helps:** Ensures saves always succeed even if `responseExists` state is out of sync with database.

#### 2. Add Comprehensive Error Handling (`page.tsx`)

**File:** `src/app/(dashboard)/management/action/[slug]/page.tsx`
**Lines:** 49-78

Wrapped the Prisma query in a try/catch block to catch silent failures:

```typescript
let existingResponse = null;
try {
  existingResponse = await prisma.actionResponse.findUnique({
    where: {
      actionItemId_userId: {
        actionItemId: actionItem.id,
        userId: user.id
      }
    },
    select: {
      responses: true,
      completed: true,
      submittedAt: true,
      updatedAt: true
    }
  });

  console.log('[ACTION PAGE] Query successful');
  console.log('[ACTION PAGE] Found existing response:', !!existingResponse);
  console.log('[ACTION PAGE] Response data:', existingResponse?.responses);
} catch (error: any) {
  console.error('[ACTION PAGE] Error fetching existing response:', error);
  console.error('[ACTION PAGE] Error details:', {
    message: error.message,
    code: error.code,
    meta: error.meta
  });
}
```

**Why this helps:** Makes database query failures visible in logs instead of silently failing.

#### 3. Force Rebuild to Clear Cache

Deployed with `vercel --prod --force` to clear any cached page snapshots.

**Why this helps:** Ensures fresh server-side rendering without stale cached data.

### Verification

After implementing the fixes, the browser console showed successful data loading:

```javascript
[ActionFormWrapper] Received initialResponses: {
  lithosurfer_pro_price: '$7,500 - $10,000',
  lithosurfer_pro_tools: 'Most of our common tools are available...',
  lithosurfer_free_tools: 'Anyone can access the surfer Free...',
  // ... 7 more fields
}
[ActionFormWrapper] Number of initial responses: 10
[ActionFormWrapper] State initialized. Responses: { /* all data */ }
[ActionFormWrapper] ResponseExists: true
```

### Prevention

To prevent this issue in the future:

1. **Always wrap database queries in try/catch** - Especially in server components
2. **Add explicit logging** - Log query success/failure for debugging
3. **Handle edge cases** - Account for state being out of sync with database
4. **Test after deployment** - Always verify data persistence after deploying
5. **Monitor logs** - Check server logs for silent failures

### Related Files

- `src/components/actions/ActionFormWrapper.tsx` - Client component, form handling
- `src/app/(dashboard)/management/action/[slug]/page.tsx` - Server component, data fetching
- `src/app/api/actions/[actionId]/responses/route.ts` - API endpoints for CRUD operations
- `src/lib/prisma.ts` - Prisma client configuration
- `prisma/schema.prisma` - Database schema with `ActionResponse` model

### Database Schema Reference

```prisma
model ActionResponse {
  id              String     @id @default(cuid())
  actionItemId    String
  actionItem      ActionItem @relation(fields: [actionItemId], references: [id], onDelete: Cascade)
  userId          String
  user            User       @relation(fields: [userId], references: [id])
  responses       Json       // Stores all question-answer pairs
  completed       Boolean    @default(false)
  submittedAt     DateTime?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  @@unique([actionItemId, userId]) // One response per user per action
}
```

The `@@unique([actionItemId, userId])` constraint is critical - it ensures only one response per user per action, which is why the POST→PATCH fallback logic is necessary.

### Key Takeaways

1. **Next.js caching is aggressive** - Even with `dynamic = 'force-dynamic'`, caching can cause issues
2. **Server component errors are silent** - Always add explicit error handling and logging
3. **Database constraints matter** - The unique constraint required special handling in the client
4. **State can drift from database** - Client state (`responseExists`) may not match database reality

### Debug Tools Created

Created a debug endpoint for future troubleshooting:

**Endpoint:** `GET /api/debug/action-responses?actionSlug=lithosurfer`
**File:** `src/app/api/debug/action-responses/route.ts`

This endpoint returns detailed information about what the server fetches from the database, useful for diagnosing similar issues in the future.

---

**Fixed in commits:**
- `Fix: Auto-retry PATCH when POST fails due to existing response` (127d743)
- `Debug: Add logging to track response loading` (f363fe8)
- `Debug: Add comprehensive error handling and detailed logging` (d7e5b9b)
