# Migrate Form Command (Breaking Changes)

Migrate an existing form with breaking changes while preserving existing data. Breaking changes include removing questions, changing question types, renaming fields, or making optional questions required.

## Usage

```bash
/migrate-form <form-name>
/migrate-form employee-review
/migrate-form hr-feedback --backup
/migrate-form goal-setting --dry-run
```

## What are Breaking Changes?

**Breaking changes** require data migration because existing form responses become invalid or incompatible:

✅ **Requires Migration (Breaking):**
- Remove questions
- Change question IDs
- Change question types (text → radio, dropdown → checkbox, etc.)
- Make optional questions required
- Remove options from choice questions
- Rename options (affects stored values)
- Change field types in database schema
- Add required questions

❌ **Does Not Require Migration (use `/update-form` instead):**
- Add new optional questions
- Update question text/help text
- Add sections
- Reorder questions
- Change UX patterns

## Data Preservation Strategy

When migrating, `/migrate-form` preserves existing data using these strategies:

| Change Type | Preservation Strategy |
|-------------|----------------------|
| Remove question | Keep data in JSON but exclude from UI |
| Change question ID | Copy data from old ID to new ID |
| Change type (text → radio) | Validate old values against new options, flag invalid |
| Make required | Set default value for existing empty responses |
| Remove option | Flag responses with removed option, require re-submission |
| Add required question | Set default value or mark response as incomplete |

## Instructions for Claude

When the user runs `/migrate-form <form-name>`, follow these steps:

### Step 1: Validate Form and Check for Existing Responses

```typescript
import { FormRegistryManager } from '../lib/form-registry'
import { PrismaClient } from '@prisma/client'

const registryManager = new FormRegistryManager()
const form = await registryManager.getForm(formName)

if (!form) {
  throw new Error(`Form "${formName}" not found. Run /list-form to see available forms.`)
}

if (form.status === 'archived') {
  throw new Error(`Form "${formName}" is archived. Consider creating a new form instead.`)
}

// Check for existing responses
const prisma = new PrismaClient()
const modelName = toPascalCase(formName)  // e.g., EmployeeReview

// Count existing responses
const responseCount = await prisma[modelName].count()

if (responseCount > 0) {
  console.log(`⚠️ Warning: ${responseCount} existing responses will be migrated.`)
}
```

### Step 2: Ask User About Migration Changes

Use the `AskUserQuestion` tool to gather migration requirements:

**Question 1: What breaking changes?**
```typescript
{
  question: "What breaking changes do you need to make?",
  header: "Breaking Changes",
  multiSelect: true,
  options: [
    {
      label: "Remove questions",
      description: "Delete questions from the form (data will be archived)"
    },
    {
      label: "Change question types",
      description: "Convert question types (text→radio, etc.)"
    },
    {
      label: "Change question IDs",
      description: "Rename question IDs (data will be migrated)"
    },
    {
      label: "Make questions required",
      description: "Make optional questions required (need defaults)"
    },
    {
      label: "Add required questions",
      description: "Add new required questions (need defaults)"
    },
    {
      label: "Remove/modify options",
      description: "Change options for choice questions"
    }
  ]
}
```

**Question 2: Data preservation approach**
```typescript
{
  question: "How should existing response data be handled?",
  header: "Data Strategy",
  multiSelect: false,
  options: [
    {
      label: "Migrate automatically",
      description: "Apply transformations to preserve data where possible"
    },
    {
      label: "Mark for review",
      description: "Flag affected responses for manual review"
    },
    {
      label: "Archive and start fresh",
      description: "Archive old responses, start with clean slate"
    },
    {
      label: "Dry-run first",
      description: "Show what would happen without making changes"
    }
  ]
}
```

**Question 3: Backup confirmation**
```typescript
{
  question: "Create database backup before migration?",
  header: "Backup",
  multiSelect: false,
  options: [
    {
      label: "Yes, create backup",
      description: "Export all responses to JSON before migration (recommended)"
    },
    {
      label: "Skip backup",
      description: "I have my own backup or this is a test environment"
    }
  ]
}
```

### Step 3: Analyze Current Form and Responses

Load current form definition and sample responses:

```typescript
import { validateMigrationSafety } from '../lib/validation'

// Load current questions
const questionsFilePath = path.join(process.cwd(), form.files.questions)
const currentQuestions = await loadQuestionsFromFile(questionsFilePath)

// Sample existing responses (up to 100)
const sampleResponses = await prisma[modelName].findMany({
  take: 100,
  select: {
    id: true,
    responses: true,
    completed: true,
    createdAt: true
  }
})

// Validate migration safety
const safetyCheck = validateMigrationSafety({
  currentQuestions,
  proposedChanges: migrationConfig,
  existingResponses: sampleResponses
})

if (!safetyCheck.valid) {
  console.error('❌ Migration Safety Check Failed:')
  safetyCheck.errors.forEach(err => console.error(`  • ${err}`))
  throw new Error('Migration cannot proceed safely')
}

if (safetyCheck.warnings.length > 0) {
  console.warn('⚠️ Migration Warnings:')
  safetyCheck.warnings.forEach(warn => console.warn(`  • ${warn}`))
}
```

### Step 4: Create Backup (if requested)

```typescript
if (createBackup) {
  const backupPath = path.join(
    process.cwd(),
    'build-data',
    form.files.documentation.split('/')[0],  // Get folder name
    'archive',
    `${formName}-backup-${new Date().toISOString().split('T')[0]}.json`
  )

  // Export all responses to JSON
  const allResponses = await prisma[modelName].findMany()

  const backup = {
    formName,
    formVersion: form.version,
    backupDate: new Date().toISOString(),
    responseCount: allResponses.length,
    schema: currentQuestions,
    responses: allResponses
  }

  await fs.mkdir(path.dirname(backupPath), { recursive: true })
  await fs.writeFile(backupPath, JSON.stringify(backup, null, 2))

  console.log(`✅ Backup created: ${backupPath}`)
  console.log(`   ${allResponses.length} responses backed up`)
}
```

### Step 5: Generate Migration Plan

Create a detailed migration plan showing exactly what will change:

```typescript
interface MigrationPlan {
  schemaChanges: {
    fieldsAdded: string[]
    fieldsRemoved: string[]
    fieldsModified: { field: string, from: string, to: string }[]
  }
  questionChanges: {
    questionsAdded: Question[]
    questionsRemoved: Question[]
    questionsModified: { question: Question, changes: string[] }[]
    questionsRenamed: { oldId: string, newId: string }[]
  }
  dataTransformations: {
    questionId: string
    transformation: string
    affectedResponses: number
    riskLevel: 'low' | 'medium' | 'high'
  }[]
  estimatedDuration: string  // "~5 minutes"
  affectedResponses: number
  requiresManualReview: boolean
}

const plan = generateMigrationPlan(
  currentQuestions,
  migrationConfig,
  sampleResponses
)

// Display migration plan
console.log(`
📋 Migration Plan for "${formName}"
${'='.repeat(60)}

Schema Changes:
${plan.schemaChanges.fieldsAdded.length > 0 ? `  ✅ Adding ${plan.schemaChanges.fieldsAdded.length} fields` : ''}
${plan.schemaChanges.fieldsRemoved.length > 0 ? `  ❌ Removing ${plan.schemaChanges.fieldsRemoved.length} fields` : ''}
${plan.schemaChanges.fieldsModified.length > 0 ? `  ✏️  Modifying ${plan.schemaChanges.fieldsModified.length} fields` : ''}

Question Changes:
${plan.questionChanges.questionsAdded.length > 0 ? `  ➕ Adding ${plan.questionChanges.questionsAdded.length} questions` : ''}
${plan.questionChanges.questionsRemoved.length > 0 ? `  ➖ Removing ${plan.questionChanges.questionsRemoved.length} questions` : ''}
${plan.questionChanges.questionsModified.length > 0 ? `  ✏️  Modifying ${plan.questionChanges.questionsModified.length} questions` : ''}
${plan.questionChanges.questionsRenamed.length > 0 ? `  🔄 Renaming ${plan.questionChanges.questionsRenamed.length} questions` : ''}

Data Transformations:
${plan.dataTransformations.map(t =>
  `  • ${t.questionId}: ${t.transformation} (${t.affectedResponses} responses, ${t.riskLevel} risk)`
).join('\n')}

Impact:
  Affected Responses: ${plan.affectedResponses}
  Estimated Duration: ${plan.estimatedDuration}
  Manual Review Required: ${plan.requiresManualReview ? 'Yes ⚠️' : 'No ✅'}

Version Change: ${form.version} → ${incrementVersion(form.version, 'major')}
`)
```

### Step 6: Confirm Migration

Ask user to confirm before proceeding:

```typescript
{
  question: "Proceed with this migration?",
  header: "Confirm Migration",
  multiSelect: false,
  options: [
    {
      label: "Yes, proceed",
      description: "Apply all changes and migrate data"
    },
    {
      label: "Dry-run only",
      description: "Show changes without applying them"
    },
    {
      label: "Cancel",
      description: "Abort migration"
    }
  ]
}
```

### Step 7: Execute Migration with Checkpoint

Use Checkpoint system for atomic migration:

```typescript
import { Checkpoint } from '../lib/file-operations'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const checkpoint = new Checkpoint()

try {
  // 1. Update questions file
  const newQuestionsContent = generateQuestionsFile(migrationConfig)
  await checkpoint.writeFile(
    questionsFilePath,
    newQuestionsContent,
    'Migrate questions definition'
  )

  // 2. Update Prisma schema (if schema changes)
  if (plan.schemaChanges.fieldsAdded.length > 0 || plan.schemaChanges.fieldsModified.length > 0) {
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
    const updatedSchema = generateSchemaChanges(plan.schemaChanges)
    await checkpoint.appendToFile(
      schemaPath,
      updatedSchema,
      'Update schema for migration'
    )
  }

  // 3. Create Prisma migration
  const migrationName = `migrate_${formName}_v${incrementVersion(form.version, 'major').replace(/\./g, '_')}`

  console.log('Creating database migration...')
  const { stdout: migrationOutput } = await execAsync(
    `npx prisma migrate dev --name ${migrationName}`,
    { cwd: process.cwd() }
  )
  console.log(migrationOutput)

  // 4. Run data transformations
  console.log('Applying data transformations...')

  for (const transformation of plan.dataTransformations) {
    const { questionId, transformation: transformFn, affectedResponses } = transformation

    console.log(`  Transforming "${questionId}" (${affectedResponses} responses)...`)

    // Apply transformation based on type
    await applyDataTransformation(prisma, modelName, transformation)
  }

  // 5. Update page component
  const pageContent = regeneratePageComponent(migrationConfig, form)
  await checkpoint.writeFile(
    path.join(process.cwd(), form.files.page),
    pageContent,
    'Regenerate page component'
  )

  // 6. Update tests
  const testContent = regenerateTestSuite(migrationConfig, form)
  await checkpoint.writeFile(
    path.join(process.cwd(), form.files.tests),
    testContent,
    'Regenerate test suite'
  )

  // 7. Update documentation
  const docContent = regenerateDocumentation(migrationConfig, form, plan)
  await checkpoint.writeFile(
    path.join(process.cwd(), form.files.documentation),
    docContent,
    'Update documentation with migration notes'
  )

  // 8. Commit all changes
  await checkpoint.commit()

  console.log('✅ All file changes committed')

} catch (error) {
  console.error('❌ Migration failed:', error.message)
  console.log('Rolling back changes...')

  await checkpoint.rollback()

  throw error
}
```

### Step 8: Update Form Registry

Update registry with major version bump:

```typescript
const oldVersion = form.version
const newVersion = incrementVersion(oldVersion, 'major')

await registryManager.addChangeLog(formName, {
  version: newVersion,
  date: new Date().toISOString(),
  type: 'migrated',
  description: generateMigrationDescription(plan),
  breaking: true,
  questionsAdded: plan.questionChanges.questionsAdded.length,
  questionsRemoved: plan.questionChanges.questionsRemoved.length,
  questionsModified: plan.questionChanges.questionsModified.length
})

await registryManager.updateForm(formName, {
  version: newVersion,
  questionCount: newTotalQuestions
})

// Add migration name to form
const migrationName = `${new Date().toISOString().split('T')[0]}_migrate_${formName}`
await registryManager.updateForm(formName, {
  migrations: [...(form.migrations || []), migrationName]
})
```

### Step 9: Verify Migration Success

Run validation checks:

```typescript
console.log('Verifying migration...')

// 1. Check all responses are still accessible
const postMigrationCount = await prisma[modelName].count()

if (postMigrationCount !== responseCount) {
  console.error(`❌ Response count mismatch: ${responseCount} → ${postMigrationCount}`)
  throw new Error('Data loss detected during migration')
}

console.log(`✅ All ${postMigrationCount} responses preserved`)

// 2. Sample responses to check data integrity
const sampleCheck = await prisma[modelName].findMany({ take: 5 })

sampleCheck.forEach(response => {
  const validation = validateResponseAgainstSchema(response.responses, newQuestions)

  if (!validation.valid) {
    console.warn(`⚠️ Response ${response.id} may need review:`)
    validation.errors.forEach(err => console.warn(`    ${err}`))
  }
})

// 3. Check schema is valid
const { stdout: schemaCheck } = await execAsync('npx prisma validate', { cwd: process.cwd() })
console.log('✅ Prisma schema valid')

console.log('Migration verification complete')
```

### Step 10: Show Success Summary

```
✅ Migration Completed Successfully

Form:                employee-review
Old Version:         1.2.0
New Version:         2.0.0 (MAJOR - Breaking Changes)

Migration Summary:
  ✅ Backup created: build-data/01 employee-review/archive/employee-review-backup-2025-11-20.json
  ✅ Questions migrated: 7 → 9 (+2 added, -0 removed)
  ✅ Data transformations: 3 applied
  ✅ Responses migrated: 45 responses preserved
  ✅ Database schema updated
  ✅ Files regenerated: 5 files
  ✅ Tests updated
  ✅ Documentation updated

Data Transformations Applied:
  • employee_name: Copied to employee_full_name (45 responses)
  • satisfaction_rating: Converted 1-10 scale to 1-5 (45 responses)
  • goals: Set default value for required field (12 empty responses)

Files Modified:
  • src/lib/forms/employee-review-questions.ts
  • prisma/schema.prisma
  • src/app/(dashboard)/employee-review/page.tsx
  • tests/e2e/employee-review.spec.ts
  • build-data/01 employee-review/documentation/employee-review-overview.md

Database Migrations:
  • 20251120_migrate_employee_review_v2_0_0

⚠️ Responses Requiring Review: 5
These responses have values that may need manual verification. View at:
  build-data/01 employee-review/archive/responses-for-review.json

Next Steps:
  1. Review flagged responses: cat build-data/01 employee-review/archive/responses-for-review.json
  2. Test the migrated form: Visit /(dashboard)/employee-review
  3. Run tests: npm test tests/e2e/employee-review.spec.ts
  4. Verify responses: Check a few existing responses load correctly
  5. Commit changes: git add . && git commit -m "Migrate employee-review to v2.0.0"
  6. Notify users: Inform team about form changes

Backup Location:
  build-data/01 employee-review/archive/employee-review-backup-2025-11-20.json

To rollback (if needed):
  1. Restore from backup JSON
  2. Revert git commit
  3. Run: npx prisma migrate reset
  4. Re-run previous migration
```

## Data Transformation Functions

The migration system includes built-in transformation functions:

### Copy Field
Copy data from old field to new field:
```typescript
{
  type: 'copy',
  from: 'old_question_id',
  to: 'new_question_id',
  preserveOriginal: false  // Remove old field after copy
}
```

### Convert Type
Convert data between question types:
```typescript
{
  type: 'convert',
  questionId: 'rating_question',
  fromType: 'number',
  toType: 'radio',
  mapping: {
    '1-2': 'Poor',
    '3-4': 'Fair',
    '5-6': 'Good',
    '7-8': 'Very Good',
    '9-10': 'Excellent'
  }
}
```

### Set Default
Set default value for new required fields:
```typescript
{
  type: 'setDefault',
  questionId: 'new_required_field',
  defaultValue: 'Not provided',
  markIncomplete: true  // Flag response as incomplete
}
```

### Remove Field
Archive removed field data:
```typescript
{
  type: 'remove',
  questionId: 'deprecated_question',
  archive: true  // Keep in _archived field
}
```

### Validate Options
Flag responses with invalid options:
```typescript
{
  type: 'validateOptions',
  questionId: 'department',
  validOptions: ['Engineering', 'Sales', 'Marketing'],
  action: 'flag'  // Flag for review vs 'clear' to remove
}
```

## Dry-Run Mode

Use `--dry-run` flag to preview migration without applying changes:

```bash
/migrate-form employee-review --dry-run
```

Dry-run output shows:
- ✅ All proposed changes
- ✅ Data transformations that would be applied
- ✅ Number of affected responses
- ✅ Estimated duration
- ❌ NO changes are actually made
- ❌ NO database migration is run
- ❌ NO files are modified

## Error Scenarios

| Error | Message | Action |
|-------|---------|--------|
| No existing responses | "Form has no responses. Use /update-form for simpler updates." | Suggest /update-form |
| Migration too complex | "This migration is too complex to automate safely." | Provide manual steps |
| Data loss risk | "Migration would cause data loss for X responses." | Show affected data, require confirmation |
| Schema conflict | "Database schema conflict detected." | Show conflicts, suggest resolution |
| Backup failed | "Cannot create backup. Migration aborted." | Fix backup issues first |

## Success Criteria

✅ User can make breaking changes safely with data preservation
✅ All existing responses are preserved or archived
✅ Data transformations are applied correctly
✅ Version history tracks breaking changes
✅ Backup is created before migration
✅ Dry-run mode available for testing
✅ Responses flagged for review when needed
✅ Complete rollback on any error

## Example Workflows

### Remove Question

```bash
/migrate-form employee-review
# Select: "Remove questions"
# Specify: employee_id (no longer needed)
# Data: "Migrate automatically" (archive old data)
# Backup: "Yes, create backup"
# Confirm: "Yes, proceed"
```

### Change Question Type

```bash
/migrate-form hr-feedback
# Select: "Change question types"
# Specify: satisfaction (number 1-10 → radio Poor/Fair/Good/Excellent)
# Provide mapping for data conversion
# Data: "Migrate automatically"
# Backup: "Yes, create backup"
# Confirm: "Yes, proceed"
```

### Add Required Question

```bash
/migrate-form goal-setting
# Select: "Add required questions"
# Provide: department field (required)
# Set default: "Unspecified"
# Mark incomplete: true
# Data: "Mark for review"
# Backup: "Yes, create backup"
# Confirm: "Yes, proceed"
```

---

**Note:** Always create a backup before migration. For simple changes, use `/update-form` instead.
