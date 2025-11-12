# BigTidy Command Impact Analysis for VSS-MVP App

**Date:** 2025-11-11
**App Location:** `/prototypes/web-app/code/vss-mvp/`
**App Type:** Next.js 16 Application

---

## Executive Summary

The `/bigtidy` command is a **comprehensive project organization + living documentation system** that:
1. **Tidies project structure** (moves misplaced files to `build-data/`)
2. **Maintains living documentation** (auto-generates plain-English code summaries in `/readme/`)
3. **Tracks database schema** (downloads schema, detects changes, maps code ↔ tables)

**Impact on VSS-MVP:** Moderate - Several documentation files would be moved, but **all active code remains safe**.

---

## Safe Zone Architecture (The Core Principle)

### What Are Safe Zones?

**Safe zones** are directories containing **active application code** that the application executes.

**Key Rules:**
- ✅ **NEVER auto-moved** - bigtidy scans but never moves files from safe zones
- ✅ **Compared against PROJECT_INDEX.json** - Flags files in safe zones NOT in the index
- ✅ **User must explicitly approve** any changes to safe zone files
- ✅ **Protected by design** - Architecture principle: "If it's used by the app, it MUST be in a safe zone"

### Default Safe Zones (for Next.js apps)

Based on your current app structure and global rules:

| Directory | Status | Purpose | Files in VSS-MVP |
|-----------|--------|---------|------------------|
| **src/** | ✅ Safe Zone | Next.js source code | app/, components/, lib/ subdirectories |
| **app/** | ✅ Safe Zone | App Router pages/routes | (using src/app/ instead) |
| **lib/** | ✅ Safe Zone | Utilities and libraries | (using src/lib/ instead) |
| **components/** | ✅ Safe Zone | React components | (using src/components/ instead) |
| **public/** | ✅ Safe Zone | Static assets served by Next.js | images/ subdirectory |
| **prisma/** | ✅ Safe Zone | Database schema and migrations | schema.prisma, seed.ts, migrations/ |
| **scripts/** | ✅ Safe Zone | Build/utility scripts | Multiple .ts scripts |
| **.claude/** | ✅ Safe Zone | Claude configuration | (would be created here) |
| **node_modules/** | ⚠️ Ignored | Dependencies (gitignored) | Not scanned |
| **.next/** | ⚠️ Ignored | Build artifacts (gitignored) | Not scanned |
| **.git/** | ⚠️ Ignored | Git metadata | Not scanned |

---

## Files That Would Be MOVED (Tidy Zones)

These files are **outside safe zones** and would be moved to `build-data/` after your approval:

### Documentation Files (→ build-data/documentation/)

| Current Location | New Location | Size | Purpose |
|------------------|--------------|------|---------|
| `action1-detailed-responses.txt` | `build-data/documentation/action1-detailed-responses.txt` | 33 KB | Action 1 implementation notes |
| `DATA_EXTRACTION_COMPLETE_SYSTEM.md` | `build-data/documentation/DATA_EXTRACTION_COMPLETE_SYSTEM.md` | 23 KB | System documentation |
| `DATA_EXTRACTION_REVIEW_IMPLEMENTATION.md` | `build-data/documentation/DATA_EXTRACTION_REVIEW_IMPLEMENTATION.md` | 13 KB | Implementation review |
| `DEBUG-LOGIN-500-ERROR.md` | `build-data/documentation/DEBUG-LOGIN-500-ERROR.md` | 9 KB | Debug notes |
| `TEST-RESULTS.md` | `build-data/documentation/TEST-RESULTS.md` | 6 KB | Test results log |
| `README.md` | ⚠️ **KEEP IN ROOT** | 1.5 KB | Main project README (exception - keep) |

### Temporary/Test Files (→ build-data/prototypes/ or archive/)

| Current Location | New Location | Purpose |
|------------------|--------------|---------|
| `check-action.js` | `build-data/prototypes/check-action.js` | Test/debug script |
| `test-auth.sh` | `build-data/prototypes/test-auth.sh` | Auth testing script |

### Documentation Folder

| Current Location | New Location | Purpose |
|------------------|--------------|---------|
| `docs/` | `build-data/documentation/docs/` | Additional documentation |

**Note:** README.md would typically be kept in root as it's a project entry point, but bigtidy would ask you to confirm.

---

## Files That Would REMAIN in Safe Zones

These files are in safe zones and **will never be auto-moved**:

### Configuration Files (Root - Considered Safe)

| File | Purpose | Status |
|------|---------|--------|
| `.env` | Environment variables | ✅ Stays (gitignored) |
| `.env.local` | Local env overrides | ✅ Stays (gitignored) |
| `.gitignore` | Git ignore rules | ✅ Stays |
| `eslint.config.mjs` | ESLint configuration | ✅ Stays |
| `next.config.ts` | Next.js config | ✅ Stays |
| `next-env.d.ts` | Next.js TypeScript defs | ✅ Stays |
| `package.json` | Dependencies | ✅ Stays |
| `package-lock.json` | Locked dependencies | ✅ Stays |
| `postcss.config.mjs` | PostCSS config | ✅ Stays |
| `prisma.config.ts` | Prisma configuration | ✅ Stays |
| `tsconfig.json` | TypeScript config | ✅ Stays |
| `tsconfig.tsbuildinfo` | TS build cache | ✅ Stays |
| `vercel.json` | Vercel deployment config | ✅ Stays |
| `PROJECT_INDEX.json` | File inventory (created by /index) | ✅ Stays |

### Application Code (Safe Zones)

| Directory | Files | Status |
|-----------|-------|--------|
| **src/app/** | All Next.js App Router files | ✅ **Protected** - Never moved |
| **src/components/** | All React components | ✅ **Protected** - Never moved |
| **src/lib/** | All utility/library code | ✅ **Protected** - Never moved |
| **prisma/** | schema.prisma, seed.ts, migrations/ | ✅ **Protected** - Never moved |
| **scripts/** | All .ts utility scripts | ✅ **Protected** - Never moved |
| **public/** | Static assets (images, etc.) | ✅ **Protected** - Never moved |

---

## New Structure After BigTidy

### Before
```
vss-mvp/
├── src/                                    ← Safe zone
├── prisma/                                 ← Safe zone
├── scripts/                                ← Safe zone
├── public/                                 ← Safe zone
├── action1-detailed-responses.txt          ← Would move
├── check-action.js                         ← Would move
├── DATA_EXTRACTION_COMPLETE_SYSTEM.md      ← Would move
├── DATA_EXTRACTION_REVIEW_IMPLEMENTATION.md ← Would move
├── DEBUG-LOGIN-500-ERROR.md                ← Would move
├── docs/                                   ← Would move
├── TEST-RESULTS.md                         ← Would move
├── test-auth.sh                            ← Would move
├── README.md                               ← Probably keep
└── [config files]                          ← Stay
```

### After BigTidy
```
vss-mvp/
├── src/                                    ← Unchanged (safe zone)
├── prisma/                                 ← Unchanged (safe zone)
├── scripts/                                ← Unchanged (safe zone)
├── public/                                 ← Unchanged (safe zone)
├── build-data/                             ← NEW - Organized development artifacts
│   ├── documentation/
│   │   ├── action1-detailed-responses.txt
│   │   ├── DATA_EXTRACTION_COMPLETE_SYSTEM.md
│   │   ├── DATA_EXTRACTION_REVIEW_IMPLEMENTATION.md
│   │   ├── DEBUG-LOGIN-500-ERROR.md
│   │   ├── TEST-RESULTS.md
│   │   └── docs/
│   └── prototypes/
│       ├── check-action.js
│       └── test-auth.sh
├── readme/                                 ← NEW - Living documentation
│   ├── INDEX.md                            ← Master catalog of all docs
│   ├── CHANGES.md                          ← What was generated this run
│   ├── database/                           ← Database schema docs
│   │   ├── SCHEMA_SUMMARY.md               ← All tables overview
│   │   ├── SCHEMA_CHANGES.md               ← Schema changelog
│   │   ├── CODE_USAGE.md                   ← Code ↔ table map
│   │   ├── .schema-snapshot.sql            ← Current schema (bones only)
│   │   ├── .schema-previous.sql            ← Previous version
│   │   └── tables/                         ← One .md per table
│   │       ├── users.md
│   │       ├── actions.md
│   │       ├── action_metadata.md
│   │       ├── responses.md
│   │       └── [etc...]
│   └── src/                                ← Code documentation (mirrors structure)
│       ├── app/
│       │   ├── api/
│       │   │   ├── login/route.md          ← Plain-English summary of route.ts
│       │   │   └── [etc...]
│       │   └── actions/[id]/page.md
│       ├── components/
│       │   ├── ActionForm.md
│       │   └── [etc...]
│       └── lib/
│           ├── auth.md
│           ├── db.md
│           └── [etc...]
├── README.md                               ← Kept in root
├── PROJECT_INDEX.json                      ← Updated with new structure
└── [config files]                          ← Unchanged
```

---

## Phase 3: Living Documentation (The Powerful Part)

After tidying files, `/bigtidy` automatically generates comprehensive documentation:

### Database Documentation

**What It Does:**
1. **Downloads current schema** from your database (PostgreSQL/Neon)
   - Uses connection string from `.env` (`DATABASE_URL`)
   - Extracts "bones only" (tables, columns, constraints, FKs)
   - Skips indexes, triggers, RLS policies (too verbose)
   - Saves to `readme/database/.schema-snapshot.sql`

2. **Detects schema changes** by comparing current vs. previous snapshot
   - New tables
   - Dropped tables
   - Column additions/changes/removals
   - Foreign key changes
   - Logs all changes to `readme/database/SCHEMA_CHANGES.md`

3. **Generates table documentation** (`readme/database/tables/[table].md`)
   - Plain-English description of what table stores
   - Column definitions with types and constraints
   - Relationships (FKs and references)
   - Business rules
   - **Which code files use this table** (read vs. write operations)

**Example: `readme/database/tables/actions.md`**
```markdown
# Table: `actions`

**Last Schema Update:** 2025-11-11 07:45
**Purpose:** Stores VSM priority actions and their metadata (questions, status, etc.)

## Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | integer | PK | Unique action identifier |
| title | text | NOT NULL | Action name (e.g., "Action 1: Products & Services") |
| description | text | | Detailed description |
| vsm_system | integer | | Related VSM system (1-5) |
| priority | integer | | Priority order |
| status | text | | Current status (draft/active/complete) |
| created_at | timestamp | DEFAULT now() | When created |

## Used By (Code Files)

**Write Operations:**
- `src/app/api/actions/route.ts:23` - Creates new actions (admin only)
- `prisma/seed.ts:15` - Seeds initial actions

**Read Operations:**
- `src/app/actions/page.tsx:12` - Lists all actions for user
- `src/app/actions/[id]/page.tsx:8` - Fetches single action details
- `src/components/ActionCard.tsx:5` - Displays action summary

## Related Tables
→ [action_metadata](action_metadata.md) - Stores action questions/configuration
→ [responses](responses.md) - User responses to actions
```

### Code Documentation

**What It Does:**
1. **Detects new/changed files** by comparing current `PROJECT_INDEX.json` with previous version
2. **Analyzes each file** to extract:
   - What it does (1-2 sentence summary)
   - Key exports (functions, components, types)
   - Dependencies (external packages + internal imports)
   - **Database interactions** (which tables, which fields, read vs. write)
   - Where it's used (which files import it)

3. **Generates plain-English summaries** in `readme/` (mirrors source structure)

**Example: `readme/src/app/api/actions/route.md`**
```markdown
# GET /api/actions

**Path:** `src/app/api/actions/route.ts`
**Type:** API Route
**Last Analyzed:** 2025-11-11 07:45
**File Size:** 127 lines

## What It Does
Fetches all VSM actions from database with their metadata (questions, status). Returns as JSON array.

## Database Interactions

### Tables Used
- **`actions`** (read: select)
  - Fields: `id`, `title`, `description`, `vsm_system`, `priority`, `status`
  - Operations: SELECT with JOIN to action_metadata
  - Lines: 23, 45

- **`action_metadata`** (read: select)
  - Fields: `action_id`, `metadata` (JSON with questions)
  - Operations: Joined with actions table
  - Lines: 23

### Key Queries
```sql
-- Fetch all actions with their metadata (line 23)
SELECT
  a.*,
  am.metadata
FROM actions a
LEFT JOIN action_metadata am ON a.id = am.action_id
ORDER BY a.priority
```

### Database Documentation
→ See [actions table docs](../../../database/tables/actions.md)
→ See [action_metadata table docs](../../../database/tables/action_metadata.md)

## Key Exports
- `GET()` - API route handler for fetching actions

## Dependencies

**External packages:**
- next (v16.0.1) - API route framework
- @prisma/client (v6.18.0) - Database ORM

**Internal imports:**
- `@/lib/db` - Prisma client instance
- `@/lib/auth` - Authentication helpers

## Used By
- `src/app/actions/page.tsx:15` - Fetches actions on page load
- `src/components/ActionsOverview.tsx:8` - Displays action list

## Notes
- ⚠️ No pagination - could be slow with 100+ actions
- ✅ Proper error handling with try/catch
- ✅ Returns consistent JSON format
```

### Cross-Reference Maps

**`readme/database/CODE_USAGE.md`** - Shows which code touches which tables:
```markdown
# Database Usage Map

Which code files interact with which database tables.

## Table: `actions`

**Read Operations:**
- `src/app/api/actions/route.ts:23` (SELECT with JOIN)
- `src/app/actions/page.tsx:12` (fetch via API)
- `src/app/actions/[id]/page.tsx:8` (fetch single action)

**Write Operations:**
- `src/app/api/actions/route.ts:67` (POST - create new action)
- `prisma/seed.ts:15` (seed initial actions)

## Table: `responses`

**Read Operations:**
- `src/app/api/responses/route.ts:12` (fetch user responses)
- `src/app/actions/[id]/page.tsx:34` (check if user completed)

**Write Operations:**
- `src/app/api/responses/route.ts:45` (POST - save user response)
- `src/components/ActionForm.tsx:89` (auto-save on input)

[... for all tables ...]
```

---

## What BigTidy Would Do (Step-by-Step)

### Phase 1: Dry-Run Preview (ALWAYS FIRST)

You run: `/bigtidy`

BigTidy shows you a preview:

```
🔍 BIGTIDY PREVIEW - vss-mvp

Configuration: Using global rules (no project CLAUDE.md found)
Project Type: Next.js Application
PROJECT_INDEX.json: Exists ✓ (last updated: 2025-11-06 15:48)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Safe Zones (monitored, never auto-moved)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Defined by global rules:
  - src/
  - prisma/
  - scripts/
  - public/
  - .claude/ (would be created)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Safe Zone Verification
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ src/ - All files in index (48 files)
✓ prisma/ - All files in index (5 files)
✓ scripts/ - All files in index (19 files)
✓ public/ - All files in index (3 files)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Files Outside Safe Zones (will be moved if approved)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Would move:
  action1-detailed-responses.txt → build-data/documentation/action1-detailed-responses.txt
  check-action.js → build-data/prototypes/check-action.js
  DATA_EXTRACTION_COMPLETE_SYSTEM.md → build-data/documentation/DATA_EXTRACTION_COMPLETE_SYSTEM.md
  DATA_EXTRACTION_REVIEW_IMPLEMENTATION.md → build-data/documentation/DATA_EXTRACTION_REVIEW_IMPLEMENTATION.md
  DEBUG-LOGIN-500-ERROR.md → build-data/documentation/DEBUG-LOGIN-500-ERROR.md
  docs/ → build-data/documentation/docs/
  TEST-RESULTS.md → build-data/documentation/TEST-RESULTS.md
  test-auth.sh → build-data/prototypes/test-auth.sh

Would keep (project entry point):
  README.md (in root)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proceed with these changes? (yes/no)
```

### Phase 2: Execute (Only After You Say "yes")

1. Creates `build-data/` structure:
   - `build-data/documentation/`
   - `build-data/prototypes/`
   - `build-data/archive/`
   - `build-data/assets/`

2. Moves files using `mv` (preserves git history)

3. Updates `.gitignore` to exclude `build-data/`

4. Runs `/index` to update `PROJECT_INDEX.json`

5. Shows completion report:
```
✅ TIDY COMPLETE

Moved 8 files/folders:
  ✓ action1-detailed-responses.txt → build-data/documentation/
  ✓ check-action.js → build-data/prototypes/
  ✓ DATA_EXTRACTION_COMPLETE_SYSTEM.md → build-data/documentation/
  ✓ DATA_EXTRACTION_REVIEW_IMPLEMENTATION.md → build-data/documentation/
  ✓ DEBUG-LOGIN-500-ERROR.md → build-data/documentation/
  ✓ docs/ → build-data/documentation/docs/
  ✓ TEST-RESULTS.md → build-data/documentation/
  ✓ test-auth.sh → build-data/prototypes/

.gitignore updated: ✓ (excluded build-data/)
PROJECT_INDEX.json updated: ✓
Safe zones verified: ✓ All active code remains in place

Root directory is now organized! 🎉
```

### Phase 3: Living Documentation (Automatic - No Approval Needed)

**This runs automatically after Phase 2 completes.**

1. **Checks for database configuration:**
   - Finds `DATABASE_URL` in `.env`
   - Connects to Neon PostgreSQL database

2. **Downloads database schema:**
   - Runs `pg_dump` (schema only, bones format)
   - Saves to `readme/database/.schema-snapshot.sql`
   - Compares with previous snapshot (if exists)

3. **Detects schema changes:**
   - Compares current vs. previous
   - Identifies new tables, dropped tables, column changes
   - Logs to `readme/database/SCHEMA_CHANGES.md`

4. **Generates table documentation:**
   - For each table: creates `readme/database/tables/[table].md`
   - Includes schema, relationships, business rules

5. **Finds code that uses each table:**
   - Uses Grep to search for table names in source code
   - Maps which files perform read vs. write operations
   - Adds "Used By" section to table docs

6. **Analyzes new/changed code files:**
   - Compares current `PROJECT_INDEX.json` with previous
   - For each new/changed file:
     - Reads the file
     - Extracts what it does, key exports, dependencies
     - **Detects database interactions** (pattern matching for Prisma calls, SQL queries)
     - Finds where file is used (Grep for imports)
     - Generates `readme/[mirror-path].md`

7. **Creates master indexes:**
   - `readme/INDEX.md` - Categorized list of all docs
   - `readme/CHANGES.md` - What was generated this run
   - `readme/database/CODE_USAGE.md` - Code ↔ table map

8. **Shows documentation report:**
```
📚 LIVING DOCUMENTATION UPDATED

Database Schema:
  ✓ Downloaded latest schema from PostgreSQL (Neon)
  ✓ Compared with previous snapshot
  🔍 Schema changes detected:
    - New table: action_okrs (for OKR tracking)
    - Modified: responses table (added validated_at column)
  ✓ Updated readme/database/SCHEMA_CHANGES.md
  ✓ Updated 7 table documentation files

Code Documentation:
  ✓ Analyzed 12 new/changed files
  ✓ Generated summaries in /readme
  ✓ Detected database interactions in 8 files
  ✓ Updated cross-references

Files Documented:
  ✓ src/app/api/actions/route.ts (uses: actions, action_metadata)
  ✓ src/app/api/responses/route.ts (uses: responses, users, actions)
  ✓ src/lib/db.ts (Prisma client - no direct DB access)
  ✓ src/components/ActionForm.tsx (no DB - uses API)
  [... 8 more files ...]

Documentation Structure:
  /readme/
    INDEX.md                    ← Start here
    CHANGES.md                  ← What's new
    /src/                       ← Code summaries (mirrors structure)
    /database/
      SCHEMA_SUMMARY.md         ← All tables overview
      SCHEMA_CHANGES.md         ← Schema changelog
      CODE_USAGE.md             ← Code ↔ table map
      /tables/                  ← 7 table docs

⚠️  Action Required:
  - 2 files may need updates for schema changes:
    - src/app/api/responses/route.ts (responses table modified)
    - src/components/ResponseList.tsx (uses responses table)
  - See readme/database/SCHEMA_CHANGES.md for details

📖 View documentation: open readme/INDEX.md
```

---

## Performance & Token Usage

### Phase 1 & 2 (Tidy Only)
- **Time:** < 30 seconds
- **Tokens:** ~2,000-5,000
- **Cost:** Negligible

### Phase 3 (Living Documentation) - FIRST RUN
- **Time:** 2-5 minutes
- **Tokens:** ~50,000-150,000 (for your app size)
- **Cost:** ~$1-3 (depending on model)
- **Why:** Analyzes all files, generates all docs from scratch

### Phase 3 (Living Documentation) - SUBSEQUENT RUNS
- **Time:** 30-60 seconds
- **Tokens:** ~10,000-30,000 (only analyzes changed files)
- **Cost:** ~$0.20-0.60
- **Why:** Incremental updates only

---

## Benefits for Your VSS App

### 1. **Onboarding New Developers**
- Read `readme/INDEX.md` → understand entire codebase structure
- Read `readme/database/SCHEMA_SUMMARY.md` → understand data model
- Read individual file docs → understand what each piece does
- **No need to read actual code first** - start with plain-English summaries

### 2. **Database Evolution Tracking**
- Every schema change is logged with timestamp
- See which code files are impacted by schema changes
- Prevents "forgotten migrations" - schema snapshot is version-controlled
- Useful for audits, compliance, debugging

### 3. **Code Impact Analysis**
- Want to change the `responses` table?
- Check `readme/database/tables/responses.md` → see all code files that use it
- Prevents breaking changes - know what to test before deploying

### 4. **Documentation That Stays Current**
- Run `/bigtidy` after major changes → docs auto-update
- No more "docs are 6 months out of date"
- Docs live in git → versioned with code

### 5. **Clean Project Structure**
- Root directory stays organized (only essential files)
- Development artifacts in `build-data/` (gitignored if desired)
- Easy to find things: "Where did I put those debug notes?" → `build-data/documentation/`

---

## Comparison: /tidy vs /bigtidy

For your app, choose based on need:

| Factor | /tidy | /bigtidy |
|--------|-------|----------|
| **Cleans up project structure** | ✅ | ✅ |
| **Moves files to build-data/** | ✅ | ✅ |
| **Updates .gitignore** | ✅ | ✅ |
| **Refreshes PROJECT_INDEX.json** | ✅ | ✅ |
| **Generates living documentation** | ❌ | ✅ |
| **Downloads database schema** | ❌ | ✅ |
| **Detects schema changes** | ❌ | ✅ |
| **Documents code files** | ❌ | ✅ |
| **Maps code ↔ database** | ❌ | ✅ |
| **Time (first run)** | < 30s | 2-5 min |
| **Time (subsequent)** | < 30s | 30-60s |
| **Tokens (first run)** | ~2-5K | ~50-150K |
| **Tokens (subsequent)** | ~2-5K | ~10-30K |

### Recommendation

**For your VSS app:**
1. Run `/bigtidy` **ONCE** now to:
   - Clean up project structure
   - Generate complete documentation baseline
   - Document your database schema
   - Create code summaries

2. Then use `/tidy` for **weekly maintenance:**
   - Quick cleanups as new files accumulate
   - Low token usage
   - Fast execution

3. Run `/bigtidy` again when:
   - Database schema changes significantly
   - Major code refactoring
   - New team member joining (give them fresh docs)
   - Quarterly documentation refresh

---

## Potential Issues & Considerations

### 1. README.md in Root
- **Issue:** Your current README.md might have important project info
- **Solution:** BigTidy will ask if you want to keep it in root (project entry point exception)
- **Recommendation:** Keep README.md in root

### 2. Git History Preservation
- **Concern:** Will moving files break git history?
- **Answer:** No - uses `mv` command which preserves git history
- **Verify:** After moving, `git log --follow build-data/documentation/DEBUG-LOGIN-500-ERROR.md` will show full history

### 3. Build-Data in Git?
- **Question:** Should `build-data/` be committed to git?
- **Options:**
  - **Gitignore build-data/** - If it's truly temporary/scratch files
  - **Commit build-data/documentation/** - If it contains useful context for team
  - **Commit all of build-data/** - If you want full history
- **Recommendation:** Commit `build-data/documentation/`, gitignore `build-data/prototypes/` and `build-data/archive/`

### 4. Readme Folder in Git?
- **Question:** Should `readme/` be committed to git?
- **Answer:** **YES** - This is living documentation that:
  - Helps team understand codebase
  - Tracks schema evolution
  - Versions with code
- **Exception:** You could gitignore `.schema-snapshot.sql` and `.schema-previous.sql` (large files), but keep all .md files

### 5. Token Cost for First Run
- **Concern:** 50K-150K tokens is significant
- **Mitigation:**
  - Run during low-usage time
  - Benefits outweigh cost (saves hours of manual documentation)
  - Subsequent runs are much cheaper (10K-30K tokens)
- **ROI:** One onboarding session saved = 4-8 hours = $200-800 value (vs. $1-3 cost)

### 6. False Positives in DB Detection
- **Issue:** AI might misidentify database interactions
- **Example:** Comment like "// fetch from users table" might be flagged as actual usage
- **Solution:** Review generated docs, correct if needed (it's markdown, easy to edit)
- **Frequency:** Rare - pattern matching is quite accurate for Prisma/SQL

---

## Action Items

### Before Running /bigtidy

1. **Commit current state:**
   ```bash
   cd /path/to/vss-mvp
   git add .
   git commit -m "Pre-bigtidy snapshot"
   ```

2. **Backup `.env` (contains DB credentials):**
   ```bash
   cp .env .env.backup
   ```

3. **Review this analysis** - Understand what will happen

4. **Decide on git strategy:**
   - Will you commit `build-data/`?
   - Will you commit `readme/`?
   - Update `.gitignore` accordingly (bigtidy will add `build-data/`, but you can modify)

### Running /bigtidy

1. **Navigate to app directory:**
   ```bash
   cd /Users/keithdimech/Pathway/Dev/Lithodat/Viable\ Systems\ Model/VSM-Platform-Project/prototypes/web-app/code/vss-mvp
   ```

2. **Run the command:**
   ```bash
   /bigtidy
   ```

3. **Review the preview carefully** - Check which files would be moved

4. **Approve if satisfied** - Type "yes" when prompted

5. **Wait for Phase 3 to complete** - Will take 2-5 minutes

6. **Review generated documentation:**
   ```bash
   open readme/INDEX.md
   ```

### After Running /bigtidy

1. **Verify safe zones are intact:**
   ```bash
   ls src/  # Should still have all files
   ls prisma/  # Should still have all files
   ```

2. **Verify moved files:**
   ```bash
   ls build-data/documentation/  # Should contain moved docs
   ```

3. **Review generated docs:**
   - Open `readme/INDEX.md`
   - Check `readme/database/SCHEMA_SUMMARY.md`
   - Spot-check a few code summaries in `readme/src/`

4. **Test app still works:**
   ```bash
   npm run dev
   # Visit app, test key features
   ```

5. **Commit changes:**
   ```bash
   git add .
   git status  # Review what's being committed
   git commit -m "Project organization: bigtidy cleanup + living documentation"
   ```

6. **Push to remote** (if desired):
   ```bash
   git push origin main
   ```

---

## Questions to Consider

Before running `/bigtidy`, answer these:

1. **Do you want living documentation?**
   - ✅ YES → Run `/bigtidy`
   - ❌ NO → Run `/tidy` instead (just cleanup, no docs)

2. **Is your database schema stable?**
   - ✅ YES → Good time to document it
   - ⚠️ NO → Maybe wait until after next major schema change, then run bigtidy to capture the "new normal"

3. **Are you comfortable with 2-5 min initial run + 50-150K tokens?**
   - ✅ YES → Proceed
   - ⚠️ NO → Use `/tidy` for now, run `/bigtidy` later when you have budget/time

4. **Do you have team members who would benefit from docs?**
   - ✅ YES (or planning to hire) → Huge value
   - ❌ NO (solo dev, no plans to expand) → Less urgent

5. **Is onboarding speed important?**
   - ✅ YES → Documentation saves hours per new developer
   - ❌ NO → Still useful, but lower priority

---

## Final Recommendation

**For your VSS-MVP app specifically:**

✅ **Run /bigtidy NOW** because:
1. Your root directory has clutter (8 files/folders would be moved)
2. You have a database with 7+ tables that should be documented
3. Your codebase is complex enough (48 source files) to benefit from summaries
4. Future team members (or your future self) will thank you for the docs
5. The token cost (~$1-3) is negligible compared to value gained

**Best time to run:** After your current feature work is complete, before next major development sprint.

**Follow-up cadence:**
- `/bigtidy` → Quarterly or after major schema changes
- `/tidy` → Weekly or as needed for quick cleanups

---

## Summary

| Aspect | Impact |
|--------|--------|
| **Safe Zones (Never Moved)** | src/, prisma/, scripts/, public/, all config files |
| **Files That Would Move** | 8 files/folders (docs, test scripts) → build-data/ |
| **Files That Stay** | README.md (in root), all active code |
| **New Folders Created** | build-data/, readme/ |
| **Documentation Generated** | Database schema docs, code summaries, cross-references |
| **Time Investment** | 2-5 minutes (first run), 30-60s (subsequent) |
| **Token Cost** | 50-150K (first run), 10-30K (subsequent) |
| **Risk Level** | Low - safe zones protected, preview before changes, git history preserved |
| **Value Gained** | High - organized structure, living docs, faster onboarding, database tracking |
| **Recommendation** | ✅ **Run /bigtidy now**, then use /tidy for maintenance |

---

**Questions? Run `/bigtidy` and see the preview first - you can always say "no" if you're not comfortable with the proposed changes.**
