# Update Form Command (Non-Breaking Changes)

Update an existing form with non-breaking changes. Non-breaking changes include adding new optional questions, updating question text/help text, or modifying UI elements without affecting existing data.

## Usage

```bash
/update-form <form-name>
/update-form employee-review
/update-form hr-feedback --add-questions=/path/to/new-questions.md
/update-form goal-setting --version=minor
```

## What are Non-Breaking Changes?

**Non-breaking changes** DO NOT require data migration and existing form responses remain valid:

✅ **Allowed (Non-Breaking):**
- Add new optional questions
- Update question text (clarifications)
- Update help text, placeholder text
- Add new sections
- Reorder questions (cosmetic only)
- Add validation to optional fields
- Update UX patterns (step-by-step → multi-section)
- Fix typos or improve wording

❌ **Not Allowed (Breaking - use `/migrate-form` instead):**
- Remove questions
- Change question IDs
- Change question types (text → radio, etc.)
- Make optional questions required
- Remove/rename options from choice questions
- Change field types in database schema
- Add required questions

## Instructions for Claude

When the user runs `/update-form <form-name>`, follow these steps:

### Step 1: Validate Form Exists

```typescript
import { FormRegistryManager } from '../lib/form-registry'

const registryManager = new FormRegistryManager()
const form = await registryManager.getForm(formName)

if (!form) {
  throw new Error(`Form "${formName}" not found. Run /list-form to see available forms.`)
}

if (form.status === 'archived') {
  throw new Error(`Form "${formName}" is archived and cannot be updated. Consider creating a new form instead.`)
}
```

### Step 2: Ask User About Changes

Use the `AskUserQuestion` tool to gather update requirements:

**Question 1: What type of update?**
```typescript
{
  question: "What would you like to update?",
  header: "Update Type",
  multiSelect: true,
  options: [
    {
      label: "Add new questions",
      description: "Add new optional questions to the form"
    },
    {
      label: "Update question text",
      description: "Clarify or improve existing question wording"
    },
    {
      label: "Update help text",
      description: "Improve help text, placeholders, or descriptions"
    },
    {
      label: "Reorder questions",
      description: "Change the order of questions for better UX"
    },
    {
      label: "Update sections",
      description: "Add new sections or reorganize existing ones"
    },
    {
      label: "Change UX pattern",
      description: "Switch between step-by-step, single-page, multi-section"
    }
  ]
}
```

**Question 2: Questions source (if adding questions)**
```typescript
{
  question: "How would you like to provide the new questions?",
  header: "Questions Source",
  multiSelect: false,
  options: [
    {
      label: "From file",
      description: "Parse questions from markdown/CSV/text file"
    },
    {
      label: "Manual input",
      description: "I'll provide the questions directly"
    },
    {
      label: "No new questions",
      description: "I'm only updating existing questions"
    }
  ]
}
```

**Question 3: Version bump type**
```typescript
{
  question: "How should the version number be updated?",
  header: "Version Bump",
  multiSelect: false,
  options: [
    {
      label: "Minor (1.0.0 → 1.1.0)",
      description: "Small changes, new optional features (recommended)"
    },
    {
      label: "Patch (1.0.0 → 1.0.1)",
      description: "Bug fixes, typos, minor text changes"
    },
    {
      label: "Auto-detect",
      description: "Let Claude decide based on changes"
    }
  ]
}
```

### Step 3: Parse New Questions (if applicable)

If user wants to add questions from a file:

```typescript
import { parseQuestions } from '../lib/question-parser'

const questionsFile = '<path provided by user>'
const newQuestions = await parseQuestions(questionsFile, {
  autoGenerateIds: true,
  inferTypes: true,
  defaultRequired: false  // New questions should be optional
})

// Validate new questions
import { validateQuestions } from '../lib/validation'
const validation = validateQuestions(newQuestions)

if (!validation.valid) {
  throw new Error(`Question validation failed:\n${validation.errors.join('\n')}`)
}
```

### Step 4: Load Current Questions

Read the existing questions file:

```typescript
const questionsFilePath = path.join(
  process.cwd(),
  form.files.questions
)

// Read current questions file
const currentQuestionsContent = await fs.readFile(questionsFilePath, 'utf8')

// Parse to extract current questions array
// (This will vary based on file format - look for the questions array export)
```

### Step 5: Validate Non-Breaking Changes

Verify all changes are non-breaking:

```typescript
interface UpdateValidation {
  valid: boolean
  errors: string[]
  warnings: string[]
  changes: {
    questionsAdded: number
    questionsModified: number
    questionsRemoved: number
    breakingChanges: string[]
  }
}

function validateNonBreaking(
  currentQuestions: Question[],
  updates: UpdateConfig
): UpdateValidation {
  const errors: string[] = []
  const warnings: string[] = []
  const breakingChanges: string[] = []

  // Check for removed questions
  if (updates.questionsRemoved && updates.questionsRemoved.length > 0) {
    breakingChanges.push('Removing questions is a breaking change')
    errors.push('Cannot remove questions with /update-form. Use /migrate-form instead.')
  }

  // Check for question ID changes
  const currentIds = currentQuestions.map(q => q.id)
  const newIds = updates.newQuestions?.map(q => q.id) || []
  const changedIds = currentIds.filter(id => !newIds.includes(id) && updates.modifiedQuestions?.some(q => q.oldId === id))

  if (changedIds.length > 0) {
    breakingChanges.push('Changing question IDs is a breaking change')
    errors.push('Cannot change question IDs with /update-form. Use /migrate-form instead.')
  }

  // Check for type changes
  updates.modifiedQuestions?.forEach(mod => {
    const current = currentQuestions.find(q => q.id === mod.id)
    if (current && mod.type && current.type !== mod.type) {
      breakingChanges.push(`Question ${mod.id}: type change (${current.type} → ${mod.type})`)
      errors.push(`Cannot change question type for ${mod.id}. Use /migrate-form instead.`)
    }
  })

  // Check for new required questions
  updates.newQuestions?.forEach(q => {
    if (q.required) {
      warnings.push(`New question "${q.id}" is marked as required. This may cause validation errors for existing responses.`)
      warnings.push('Consider making it optional or using /migrate-form to handle data migration.')
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    changes: {
      questionsAdded: updates.newQuestions?.length || 0,
      questionsModified: updates.modifiedQuestions?.length || 0,
      questionsRemoved: updates.questionsRemoved?.length || 0,
      breakingChanges
    }
  }
}
```

If validation fails with breaking changes:
```
❌ Update Failed: Breaking Changes Detected

The following changes are BREAKING and cannot be applied with /update-form:
  • Removing questions is a breaking change
  • Cannot change question IDs (affects existing responses)
  • Question type changes require data migration

Use /migrate-form instead to handle these changes safely:
  /migrate-form employee-review
```

### Step 6: Apply Updates with Checkpoint

Use the Checkpoint system for atomic updates:

```typescript
import { Checkpoint } from '../lib/file-operations'

const checkpoint = new Checkpoint()

try {
  // 1. Update questions file
  if (updates.newQuestions || updates.modifiedQuestions) {
    const updatedQuestionsContent = generateQuestionsFile(
      currentQuestions,
      updates.newQuestions,
      updates.modifiedQuestions
    )

    await checkpoint.writeFile(
      questionsFilePath,
      updatedQuestionsContent,
      'Update questions definition'
    )
  }

  // 2. Update page component (if UX pattern changed)
  if (updates.uxPatternChange) {
    const pageFilePath = path.join(process.cwd(), form.files.page)
    // Regenerate page component with new UX pattern
    // (Use Handlebars template with updated pattern)
    await checkpoint.writeFile(
      pageFilePath,
      updatedPageContent,
      'Update page component for new UX pattern'
    )
  }

  // 3. Update tests (if questions added)
  if (updates.newQuestions && updates.newQuestions.length > 0) {
    const testFilePath = path.join(process.cwd(), form.files.tests)
    // Regenerate tests to include new questions
    await checkpoint.writeFile(
      testFilePath,
      updatedTestContent,
      'Update tests for new questions'
    )
  }

  // 4. Update documentation
  const docFilePath = path.join(process.cwd(), form.files.documentation)
  await checkpoint.writeFile(
    docFilePath,
    updatedDocContent,
    'Update documentation'
  )

  // 5. Commit all changes
  await checkpoint.commit()

} catch (error) {
  // Rollback on error
  await checkpoint.rollback()
  throw error
}
```

### Step 7: Update Form Registry

Update the registry with new version and change log:

```typescript
// Increment version
const currentVersion = form.version
const newVersion = incrementVersion(currentVersion, versionBumpType)

// Add change log entry
await registryManager.addChangeLog(formName, {
  version: newVersion,
  date: new Date().toISOString(),
  type: 'updated',
  description: generateChangeDescription(updates),
  breaking: false,
  questionsAdded: updates.newQuestions?.length || 0,
  questionsRemoved: 0,
  questionsModified: updates.modifiedQuestions?.length || 0
})

// Update question count
await registryManager.updateForm(formName, {
  questionCount: currentQuestions.length + (updates.newQuestions?.length || 0),
  version: newVersion
})
```

### Step 8: Show Success Summary

```
✅ Form Updated Successfully

Form:               employee-review
Old Version:        1.0.0
New Version:        1.1.0

Changes Applied:
  ✅ Added 3 new questions
  ✅ Updated 2 question descriptions
  ✅ Updated documentation

Files Modified:
  • src/lib/forms/employee-review-questions.ts
  • tests/e2e/employee-review.spec.ts
  • build-data/01 employee-review/documentation/employee-review-overview.md

No database migration required (non-breaking changes only).

Next Steps:
  1. Test the updated form: Visit /(dashboard)/employee-review
  2. Run tests: npm test tests/e2e/employee-review.spec.ts
  3. Review changes: git diff
  4. Commit changes: git add . && git commit -m "Update employee-review form to v1.1.0"
```

## Version Bumping Rules

Use semantic versioning (MAJOR.MINOR.PATCH):

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Add optional questions | Minor | 1.0.0 → 1.1.0 |
| Update text/help text | Patch | 1.0.0 → 1.0.1 |
| Fix typos | Patch | 1.0.0 → 1.0.1 |
| Add sections | Minor | 1.0.0 → 1.1.0 |
| Change UX pattern | Minor | 1.0.0 → 1.1.0 |
| Reorder questions | Patch | 1.0.0 → 1.0.1 |

Breaking changes require Major version bump and `/migrate-form` command.

## Error Scenarios

| Error | Message | Action |
|-------|---------|--------|
| Form not found | "Form 'xyz' not found. Run /list-form to see available forms." | Show available forms |
| Form archived | "Form 'xyz' is archived and cannot be updated." | Suggest creating new form |
| Breaking changes detected | "Breaking changes detected. Use /migrate-form instead." | Show breaking changes list |
| Invalid version format | "Current version 'xyz' is not valid semantic version." | Show expected format |
| File not found | "Questions file not found: path/to/file" | Show expected file location |
| Duplicate question IDs | "Duplicate question ID 'abc' detected." | Show conflicting questions |

## Success Criteria

✅ User can add new optional questions without breaking existing data
✅ User can update question text and help text safely
✅ User can reorganize form UX without data migration
✅ Version history is tracked in registry
✅ All changes are atomic (rollback on error)
✅ Tests are updated automatically
✅ Documentation is updated automatically

## Example Workflows

### Add New Questions from File

```bash
/update-form employee-review
# Select: "Add new questions" → "From file"
# Provide: /tmp/new-questions.md
# Version: "Minor"
```

### Update Question Text

```bash
/update-form hr-feedback
# Select: "Update question text"
# Claude will ask which questions to update
# Make changes interactively
# Version: "Patch"
```

### Change UX Pattern

```bash
/update-form goal-setting
# Select: "Change UX pattern"
# Choose: step-by-step → multi-section
# Version: "Minor"
```

---

**Note:** For breaking changes (remove questions, change types, etc.), use `/migrate-form` instead.
