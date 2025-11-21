# List Forms Command

List all forms in the form registry with optional filtering and detailed information.

## Usage

```bash
/list-form
/list-form active
/list-form --status=active
/list-form --manager-only
/list-form --pattern=step-by-step
/list-form --detailed
/list-form --stats
```

## Instructions for Claude

When the user runs `/list-form`, follow these steps:

### Step 1: Parse Command Arguments

Extract any filters from the command:
- `--status=<status>` or bare word (active, deprecated, archived, draft)
- `--manager-only` or `--managers` - Show only manager-required forms
- `--pattern=<pattern>` or `--ux=<pattern>` - Filter by UX pattern (step-by-step, single-page, multi-section, dashboard)
- `--detailed` or `-d` - Show detailed information
- `--stats` or `-s` - Show registry statistics only

### Step 2: Load Form Registry

Use the FormRegistryManager to load the registry:

```typescript
import { FormRegistryManager } from '../lib/form-registry'

const registryManager = new FormRegistryManager()
const forms = await registryManager.listForms({
  status: parsedStatus,
  requiresManager: managerOnlyFlag,
  uxPattern: parsedPattern
})
```

**Error Handling:**
- If registry file doesn't exist, show message: "No forms found. Run `/gen-form` to create your first form."
- If registry is empty, show message: "No forms in registry yet. Run `/gen-form` to create a form."

### Step 3: Display Forms

#### Default Display (Table Format)

Show a clean table with these columns:
- **ID** - Form ID (FORM-001, FORM-002, etc.)
- **Name** - Form name (kebab-case)
- **Title** - Display title
- **Version** - Semantic version
- **Status** - Status with emoji:
  - active: ✅
  - deprecated: ⚠️
  - archived: 📦
  - draft: 🚧
- **Questions** - Number of questions
- **Access** - 👥 All users or 👔 Managers only
- **Pattern** - UX pattern

**Example:**
```
Forms Registry (5 forms)

ID        Name              Title              Version  Status  Questions  Access  Pattern
--------  ----------------  -----------------  -------  ------  ---------  ------  ------------
FORM-001  employee-review   Employee Review    1.0.0    ✅      7          👥      step-by-step
FORM-002  hr-feedback       HR Feedback        1.2.0    ✅      12         👔      single-page
FORM-003  goal-setting      Goal Setting       2.0.0    ✅      8          👥      multi-section
FORM-004  old-survey        Old Survey         1.0.0    ⚠️      5          👥      single-page
FORM-005  test-form         Test Form          0.1.0    🚧      3          👥      step-by-step
```

#### Detailed Display (with --detailed flag)

Show full information for each form:

```
FORM-001: Employee Review
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:           employee-review
Title:          Employee Review
Version:        1.0.0
Status:         active ✅
Access:         All users 👥
Questions:      7
UX Pattern:     step-by-step

Routes:
  Page:         /(dashboard)/employee-review
  API:          /api/employee-review

Files:
  Schema:       prisma/schema.prisma
  Page:         src/app/(dashboard)/employee-review/page.tsx
  Questions:    src/lib/forms/employee-review-questions.ts
  API:          src/app/api/employee-review/route.ts
  Tests:        tests/e2e/employee-review.spec.ts
  Docs:         build-data/01 employee-review/documentation/employee-review-overview.md

Timestamps:
  Created:      2025-11-20T10:30:00.000Z
  Updated:      2025-11-20T10:30:00.000Z

Migrations:
  20251120103000_create_employee_review

Change Log:
  v1.0.0 (2025-11-20) - Created - Initial form creation
```

Repeat for each form with a separator line between forms.

#### Statistics Display (with --stats flag)

Show summary statistics:

```
Form Registry Statistics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Forms:        5
Active:             3
Deprecated:         1
Archived:           0
Draft:              1

By UX Pattern:
  Step-by-step:     2
  Single-page:      2
  Multi-section:    1
  Dashboard:        0

Average Questions:  7.0

Last Updated:       2025-11-20T10:30:00.000Z
```

### Step 4: Show Quick Actions

After displaying forms, show these quick action tips:

```
Quick Actions:
  /gen-form              Create a new form
  /update-form <name>    Update an existing form (non-breaking)
  /migrate-form <name>   Migrate form with breaking changes
```

### Step 5: Filtering Examples

If no filters are applied, show filtering tips:

```
Filtering Examples:
  /list-form active              Show only active forms
  /list-form --manager-only      Show manager-only forms
  /list-form --pattern=dashboard Show dashboard-style forms
  /list-form --stats             Show statistics summary
```

## Filter Options Reference

### Status Filter
- `active` - Currently used forms
- `deprecated` - Forms marked as deprecated (still work but discouraged)
- `archived` - Forms no longer in use
- `draft` - Forms under development

### Access Filter
- `--manager-only` - Show only forms requiring manager access
- No flag - Show all forms regardless of access level

### Pattern Filter
- `step-by-step` - Forms with step-by-step navigation
- `single-page` - Forms with all questions on one page
- `multi-section` - Forms with multiple collapsible sections
- `dashboard` - Dashboard-style forms

## Implementation Notes

1. **Use FormRegistryManager**: Import from `.claude/lib/form-registry.ts`
2. **Handle empty registry**: Show helpful message with `/gen-form` suggestion
3. **Format timestamps**: Show in readable format (not ISO strings in detailed view)
4. **Align columns**: Use proper spacing for table display
5. **Color coding**: Use emojis for status indicators
6. **Sort order**: Display forms by ID (ascending) by default

## Error Scenarios

| Error | Message | Action |
|-------|---------|--------|
| Registry file missing | "No forms found. Run `/gen-form` to create your first form." | Suggest /gen-form |
| Empty registry | "No forms in registry yet. Run `/gen-form` to create a form." | Suggest /gen-form |
| Invalid status filter | "Invalid status: 'xyz'. Valid options: active, deprecated, archived, draft" | Show valid options |
| Invalid pattern filter | "Invalid pattern: 'xyz'. Valid options: step-by-step, single-page, multi-section, dashboard" | Show valid options |
| Registry corrupted | "Registry file is corrupted. Please check build-data/FORM-REGISTRY.json" | Show file path |

## Success Criteria

✅ User can see all forms at a glance
✅ User can filter by status, access level, and UX pattern
✅ User can see detailed information for each form
✅ User can see registry statistics
✅ User gets helpful suggestions for next actions

## Example Workflow

```bash
# List all forms
/list-form

# Show only active forms
/list-form active

# Show manager-only forms
/list-form --manager-only

# Show detailed information
/list-form --detailed

# Show statistics
/list-form --stats

# Combine filters
/list-form active --pattern=step-by-step --detailed
```

---

**Note:** This command is read-only and does not modify the registry or any files.
