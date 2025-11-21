# Form Generation System - /gen-form

**Command:** `/gen-form`

**Purpose:** Generate a complete form infrastructure from an interactive 5-question prompt. Creates database schema, API routes, frontend components, tests, and documentation atomically with rollback capability.

**Benefits:**
- Reduces form creation time from 40+ hours to ~5 hours
- Ensures consistency across all forms (architecture, UX patterns, auto-save, validation)
- Eliminates human error in boilerplate code
- Provides comprehensive testing and documentation out-of-the-box

---

## Your Task

You are now in **FORM GENERATION MODE**. Follow these steps systematically:

### Step 1: Validate Environment (2 minutes)

**Check required environment variables:**

```typescript
import { validateEnvironment } from '../lib/validation';

const envValidation = validateEnvironment();
if (!envValidation.valid) {
  console.error('❌ Environment validation failed:');
  envValidation.errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}

if (envValidation.warnings.length > 0) {
  console.warn('⚠️  Warnings:');
  envValidation.warnings.forEach(warning => console.warn(`  - ${warning}`));
}
```

**Required variables:**
- `DATABASE_URL` - Neon database connection URL
- `DIRECT_URL` - Direct connection URL (not pooled) for migrations
- `JWT_SECRET` - Secret key for JWT sessions
- `NODE_ENV` - Environment (development/production)

**If missing:** Show clear error with instructions to add to `.env.local`

---

### Step 2: Interactive 5-Question Prompt (5 minutes)

Ask the user these questions in sequence using the AskUserQuestion tool:

**Question 1: Form Name**
```
What is the form name? (e.g., "employee-review", "project-approval", "client-intake")

Rules:
- Lowercase letters, numbers, hyphens, underscores only
- 3-50 characters
- No spaces
- Not a reserved word (user, admin, api, auth, login, dashboard, etc.)

Examples: employee-review, quarterly-goals, team-feedback
```

**Question 2: Access Control**
```
Who can access this form?

Options:
A) All authenticated users
B) Managers only (requires manager role)

Select A or B:
```

**Question 3: Form Purpose**
```
What is the purpose of this form? (1-2 sentences)

This will appear in:
- Form page header
- Documentation
- Database comments

Example: "Quarterly performance review for employees to set goals and track achievements."
```

**Question 4: Questions Source**
```
How do you want to define the form questions?

Options:
A) Parse from a learning document (markdown, CSV, or text file)
B) I'll provide questions manually in the next step

Select A or B:
```

**If Option A selected:**
```
Provide the absolute file path to your learning document:

Supported formats:
- Markdown (.md) - Questions with headers, bullet lists, metadata
- CSV (.csv) - Structured table with question, type, options columns
- Text (.txt) - Simple line-by-line questions

Example: /path/to/employee-review-questions.md
```

**If Option B selected:**
```
Provide questions in this format (one per line):

Format: Question text? [type] (required/optional)

Supported types:
- text, textarea, radio, checkbox, dropdown
- number, currency, date
- rating, ranking, selectable_tags
- info (display-only text)

Example:
What is your name? [text] (required)
Describe your achievements this quarter. [textarea] (required)
Rate your overall satisfaction (1-5). [rating] (required)
```

**Question 5: UX Pattern**
```
Which UX pattern should this form use?

Options:
A) Step-by-step (one question at a time with navigation)
B) Single-page (all questions visible, scroll to navigate)
C) Multi-section (grouped questions with expandable sections)

Select A, B, or C:
```

**After all questions:** Show summary and ask for confirmation:
```
📋 Form Generation Summary

Name: employee-review
Access: Managers only
Purpose: Quarterly performance review for employees
Questions: 12 questions parsed from employee-review-questions.md
UX Pattern: Step-by-step

Files that will be created:
- prisma/schema.prisma (model added)
- src/app/(dashboard)/employee-review/page.tsx
- src/lib/forms/employee-review-questions.ts
- src/app/api/employee-review/route.ts
- tests/e2e/employee-review.spec.ts
- build-data/01 employee-review/documentation/employee-review-overview.md

Proceed with generation? (yes/no)
```

---

### Step 3: Parse Questions (3 minutes)

**If user provided a file path:**

```typescript
import { parseQuestions } from '../lib/question-parser';
import { validateQuestions } from '../lib/validation';

const questions = parseQuestions(filePath, {
  autoGenerateIds: true,
  inferTypes: true,
  defaultRequired: false,
  defaultSection: 'General'
});

const validation = validateQuestions(questions);
if (!validation.valid) {
  console.error('❌ Question validation failed:');
  validation.errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}

console.log(`✅ Parsed ${questions.length} questions successfully`);
```

**If user provided manual questions:**
- Parse each line
- Extract question text, type, required flag
- Generate IDs automatically
- Validate format

**Show parsed questions to user for confirmation:**
```
Parsed Questions:
1. [text] What is your name? (required)
2. [textarea] Describe your achievements this quarter. (required)
3. [rating] Rate your overall satisfaction (1-5). (required)

Continue? (yes/no)
```

---

### Step 4: Generate Form Files (10 minutes)

**Use Checkpoint system for atomic operations:**

```typescript
import { Checkpoint } from '../lib/file-operations';
import Handlebars from 'handlebars';
import { generateVariations } from '../lib/string-transforms';

const checkpoint = new Checkpoint();

try {
  // Generate string variations
  const variants = generateVariations(formName);
  // { camelCase: 'employeeReview', pascalCase: 'EmployeeReview', kebabCase: 'employee-review', ... }

  // Detect next available form number
  const formNumber = detectNextFormNumber('build-data');

  // Template data
  const templateData = {
    formName: variants.camelCase,
    formSlug: variants.kebabCase,
    formTitle: variants.titleCase,
    formDescription: purpose,
    modelName: variants.pascalCase,
    requiresManager: accessControl === 'managers-only',
    hasUniqueConstraint: false, // Simple form pattern
    questions: questions,
    formNumber: String(formNumber).padStart(2, '0'),
    createdAt: new Date().toISOString()
  };

  // 1. Generate Prisma schema addition
  const schemaTemplate = Handlebars.compile(fs.readFileSync('.claude/templates/form/prisma-schema.hbs', 'utf8'));
  const schemaContent = schemaTemplate(templateData);

  checkpoint.appendToFile('prisma/schema.prisma', schemaContent);
  console.log('✅ Added model to prisma/schema.prisma');

  // 2. Generate page component
  const pageTemplate = Handlebars.compile(fs.readFileSync('.claude/templates/form/page-component.hbs', 'utf8'));
  const pageContent = pageTemplate(templateData);

  checkpoint.createDirectory(`src/app/(dashboard)/${variants.kebabCase}`);
  checkpoint.writeFile(`src/app/(dashboard)/${variants.kebabCase}/page.tsx`, pageContent);
  console.log(`✅ Created src/app/(dashboard)/${variants.kebabCase}/page.tsx`);

  // 3. Generate questions definition
  const questionsTemplate = Handlebars.compile(fs.readFileSync('.claude/templates/form/questions-definition.hbs', 'utf8'));
  const questionsContent = questionsTemplate(templateData);

  checkpoint.createDirectory('src/lib/forms');
  checkpoint.writeFile(`src/lib/forms/${variants.kebabCase}-questions.ts`, questionsContent);
  console.log(`✅ Created src/lib/forms/${variants.kebabCase}-questions.ts`);

  // 4. Generate API route
  const apiTemplate = Handlebars.compile(fs.readFileSync('.claude/templates/form/api-route.hbs', 'utf8'));
  const apiContent = apiTemplate(templateData);

  checkpoint.createDirectory(`src/app/api/${variants.kebabCase}`);
  checkpoint.writeFile(`src/app/api/${variants.kebabCase}/route.ts`, apiContent);
  console.log(`✅ Created src/app/api/${variants.kebabCase}/route.ts`);

  // 5. Generate test suite
  const testTemplate = Handlebars.compile(fs.readFileSync('.claude/templates/form/test-suite.hbs', 'utf8'));
  const testContent = testTemplate(templateData);

  checkpoint.createDirectory('tests/e2e');
  checkpoint.writeFile(`tests/e2e/${variants.kebabCase}.spec.ts`, testContent);
  console.log(`✅ Created tests/e2e/${variants.kebabCase}.spec.ts`);

  // 6. Generate documentation
  const docsTemplate = Handlebars.compile(fs.readFileSync('.claude/templates/form/documentation.hbs', 'utf8'));
  const docsContent = docsTemplate(templateData);

  checkpoint.createDirectory(`build-data/${templateData.formNumber} ${variants.kebabCase}/documentation`);
  checkpoint.writeFile(`build-data/${templateData.formNumber} ${variants.kebabCase}/documentation/${variants.kebabCase}-overview.md`, docsContent);
  console.log(`✅ Created documentation`);

  // Commit checkpoint
  checkpoint.commit();
  console.log('\n✅ All files generated successfully!');

} catch (error) {
  console.error('❌ Generation failed:', error.message);
  console.log('🔄 Rolling back changes...');
  checkpoint.rollback();
  console.log('✅ Rollback complete - no changes made');
  process.exit(1);
}
```

**Helper function: detectNextFormNumber**
```typescript
function detectNextFormNumber(buildDataPath: string): number {
  const dirs = fs.readdirSync(buildDataPath).filter(d => /^\d{2} /.test(d));
  const numbers = dirs.map(d => parseInt(d.match(/^(\d{2})/)[1]));
  return numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
}
```

---

### Step 5: Run Database Migration (5 minutes)

**Validate migration safety:**

```typescript
import { validateMigrationSafety } from '../lib/validation';

const migrationValidation = validateMigrationSafety();
if (!migrationValidation.valid) {
  console.error('❌ Migration safety check failed:');
  migrationValidation.errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}
```

**Run migration:**

```bash
cd VSM-Platform-Project
npx prisma migrate dev --name "add-${formSlug}-model"
```

**Check for errors:**
- If migration fails due to pooled connection → Show clear error about DIRECT_URL
- If migration fails due to schema conflict → Show suggestions for resolution
- If successful → Continue to next step

---

### Step 6: Generate Prisma Client (2 minutes)

```bash
npx prisma generate
```

**This ensures TypeScript types are updated for the new model.**

---

### Step 7: Update Form Registry (2 minutes)

**Create or update FORM-REGISTRY.json:**

```typescript
const registryPath = 'build-data/FORM-REGISTRY.json';
let registry = { forms: [] };

if (fs.existsSync(registryPath)) {
  registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

registry.forms.push({
  id: `FORM-${String(formNumber).padStart(3, '0')}`,
  name: variants.kebabCase,
  title: variants.titleCase,
  version: '1.0.0',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  requiresManager: accessControl === 'managers-only',
  questionCount: questions.length,
  routes: {
    page: `/(dashboard)/${variants.kebabCase}`,
    api: `/api/${variants.kebabCase}`
  },
  files: {
    schema: 'prisma/schema.prisma',
    page: `src/app/(dashboard)/${variants.kebabCase}/page.tsx`,
    questions: `src/lib/forms/${variants.kebabCase}-questions.ts`,
    api: `src/app/api/${variants.kebabCase}/route.ts`,
    tests: `tests/e2e/${variants.kebabCase}.spec.ts`,
    documentation: `build-data/${String(formNumber).padStart(2, '0')} ${variants.kebabCase}/documentation/${variants.kebabCase}-overview.md`
  }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log('✅ Updated FORM-REGISTRY.json');
```

---

### Step 8: Summary & Next Steps (1 minute)

**Show completion summary:**

```
🎉 Form Generation Complete!

Form: Employee Review (employee-review)
Form ID: FORM-001
Version: 1.0.0
Questions: 12

Files Created:
  ✅ Database model (prisma/schema.prisma)
  ✅ Frontend page (src/app/(dashboard)/employee-review/page.tsx)
  ✅ Questions definition (src/lib/forms/employee-review-questions.ts)
  ✅ API routes (src/app/api/employee-review/route.ts)
  ✅ E2E tests (tests/e2e/employee-review.spec.ts)
  ✅ Documentation (build-data/01 employee-review/documentation/)

Next Steps:
1. Start development server: npm run dev
2. Visit form: http://localhost:3000/employee-review
3. Test form: npm run test:e2e -- employee-review.spec.ts
4. Review documentation: build-data/01 employee-review/documentation/employee-review-overview.md

Commands:
- View form registry: cat build-data/FORM-REGISTRY.json
- Update form (non-breaking): /update-form employee-review
- Migrate form (breaking): /migrate-form employee-review
- List all forms: /list-form
```

---

## Error Handling

**Environment errors:**
- Missing DATABASE_URL → "Add DATABASE_URL to .env.local"
- Missing DIRECT_URL → "Add DIRECT_URL to .env.local (direct connection, not pooled)"
- Missing JWT_SECRET → "Generate with: openssl rand -base64 32"

**Validation errors:**
- Invalid form name → Show rules and examples
- Reserved word → "Form name cannot be: user, admin, api, auth, login, dashboard, settings, profile"
- File not found → "File path does not exist: {path}"
- Invalid question format → Show expected format with examples

**Generation errors:**
- File already exists → "Form {name} already exists. Use /update-form to modify it."
- Schema conflict → "Model {name} already exists in schema. Choose a different form name."
- Template compilation error → Show template path and error details

**Migration errors:**
- Pooled connection error → "DIRECT_URL is required for migrations. See .env.local"
- Uncommitted changes → "Commit or stash changes before running migrations (safety check)"
- Migration conflict → "Migration failed. Run: npx prisma migrate reset (WARNING: deletes data)"

**Rollback on any error:**
- All file operations are atomic via Checkpoint class
- If any step fails, complete rollback is performed
- No partial state left in codebase

---

## Implementation Notes

**Atomic operations:**
- Use Checkpoint class from file-operations.ts
- All file writes are tracked
- Single commit() at the end
- Automatic rollback() on error

**String transformations:**
- Use generateVariations() from string-transforms.ts
- Generates: camelCase, PascalCase, kebabCase, snake_case, Title Case
- Consistent naming across all generated files

**Question parsing:**
- Use parseQuestions() from question-parser.ts
- Auto-detect format (markdown, CSV, text)
- Infer question types from keywords
- Extract options and metadata

**Validation:**
- Validate environment before starting
- Validate form name against reserved words
- Validate questions array for required fields
- Validate migration safety (git status, DIRECT_URL)

**Safety:**
- Dry-run mode available (show what would be generated)
- Backup files before modification
- Git status check before migrations
- Clear error messages with actionable guidance

---

## Testing the Command

**Test with sample form:**

```bash
# Create sample questions file
cat > /tmp/sample-form.md << 'EOF'
# Employee Information
1. What is your name? [text]
   - Required: yes
   - Placeholder: Enter your full name

2. What is your employee ID? [text]
   - Required: yes

# Performance
3. Describe your key achievements this quarter. [textarea]
   - Required: yes
   - Help: List 3-5 major accomplishments

4. Rate your overall satisfaction (1-5). [rating]
   - Required: yes
   - Rating Scale: 5
EOF

# Run command
/gen-form

# Answer prompts:
# 1. Form name: employee-review
# 2. Access: B (Managers only)
# 3. Purpose: Quarterly performance review for employees
# 4. Questions source: A (Parse from file)
#    File path: /tmp/sample-form.md
# 5. UX Pattern: A (Step-by-step)
# 6. Confirm: yes
```

**Expected output:**
- 4 questions parsed successfully
- 6 files created
- Database migration successful
- Prisma client generated
- Form registry updated

---

**Ready to generate forms in seconds! 🚀**
