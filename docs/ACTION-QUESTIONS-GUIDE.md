# Action Questions Guide

## Safe Question Modifications

Once users have submitted responses, you must be careful when modifying action questions to avoid data loss or inconsistencies.

### ✅ SAFE Changes (No Migration Needed)

These changes can be made directly without affecting existing data:

1. **Update Question Text**
   ```typescript
   question: 'Do you agree with this model?' // ← SAFE to change
   ```

2. **Update Help Text**
   ```typescript
   helpText: 'Additional context here' // ← SAFE to change
   ```

3. **Add Options to Radio/Checkbox/Dropdown**
   ```typescript
   options: [
     'Option 1',
     'Option 2',
     'Option 3 (NEW)' // ← SAFE to add
   ]
   ```

4. **Change Required Status** (with caution)
   ```typescript
   required: true // ← Can change from false → true if you handle validation properly
   ```

5. **Add New Questions**
   ```typescript
   {
     id: 'new_question_id', // ← SAFE to add new questions
     question: 'New question?',
     type: 'text'
   }
   ```

### ⚠️ REQUIRES MIGRATION

These changes require a migration script:

1. **Rename Question ID**
   ```typescript
   // ❌ DON'T just change this:
   id: 'old_id' → 'new_id'

   // ✅ DO: Use migration script first
   ```

2. **Change Question Type**
   ```typescript
   // ❌ Changing from 'text' to 'radio' breaks existing data
   type: 'text' → 'radio'
   ```

### 🚫 AVOID (Consider Alternatives)

1. **Remove Questions**
   - Instead: Hide with conditional logic or mark as optional
   - Why: Existing data becomes orphaned

2. **Change Option Values**
   - Instead: Add new options, keep old ones
   - Why: Existing responses won't match

## Migration Process

### When You Need to Rename Question IDs

**Step 1:** Copy the migration template
```bash
cp scripts/migrate-question-ids.template.ts scripts/migrate-lithosurfer-2025-01.ts
```

**Step 2:** Configure the mapping
```typescript
const ACTION_SLUG = 'lithosurfer';

const ID_MAPPINGS: Record<string, string> = {
  'old_question_1': 'lithosurfer_tier_agreement',
  'old_question_2': 'lithosurfer_tier_concerns',
};
```

**Step 3:** Run the migration (with database backup!)
```bash
# ALWAYS backup database first!
npx tsx scripts/migrate-lithosurfer-2025-01.ts
```

**Step 4:** Verify in Prisma Studio
```bash
npx prisma studio
# Check ActionResponse table - responses should have new IDs
```

**Step 5:** Update the question definitions
```typescript
// src/lib/actions/action1-lithosurfer.ts
{
  id: 'lithosurfer_tier_agreement', // ← Now safe to use new ID
  // ...
}
```

**Step 6:** Deploy
```bash
git add .
git commit -m "Rename question IDs after migration"
git push
```

## Validation & Warnings

The system now includes automatic validation:

1. **Server-side warnings**: Check Vercel logs for warnings like:
   ```
   [ACTION PAGE] Warning: Stored responses contain unrecognized question IDs
   ```

2. **Graceful degradation**: Unrecognized question IDs are filtered out automatically

3. **Data preservation**: Original responses remain in database for manual recovery if needed

## Best Practices

### Question ID Naming Convention

Use descriptive, prefixed IDs:
```typescript
// ✅ Good
id: 'lithosurfer_tier_agreement'
id: 'lithodata_storage_assessment'

// ❌ Bad
id: 'question1'
id: 'q1'
```

### Versioning Strategy

If you need major changes, consider creating a new version:
```typescript
// Instead of changing action1-lithosurfer.ts
// Create action1-lithosurfer-v2.ts with new questions
```

### Testing Checklist

Before deploying question changes:

- [ ] Verified no question IDs changed
- [ ] Added new questions marked as optional initially
- [ ] Tested with existing response data
- [ ] Checked server logs for warnings
- [ ] Reviewed changes with team

## Troubleshooting

### "Stored responses contain unrecognized question IDs"

This warning means:
1. Someone changed question IDs without migration
2. Old test data exists with different IDs

**Solution:**
- Run migration script to update IDs
- Or delete old test data (if safe to do so)

### Form appears empty despite having responses

**Cause:** Question IDs don't match between form and database

**Solution:** Check server logs, compare IDs, run migration if needed

### Can't submit form - 400 error

**Cause:** Unique constraint - response already exists

**Solution:** System should use PATCH not POST - check `responseExists` state
