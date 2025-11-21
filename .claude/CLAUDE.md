# VSM Platform Project - Claude AI Instructions

**Project:** Viable Strategy System (VSS) Platform for Lithodat
**Owner:** Keith Dimech (COO)
**Target:** clair.au/vss/
**Status:** Prototype Planning Phase
**Last Updated:** 2025-10-31

---

## Priority before beggining

need to clean up the database users - there are still fake users in there

## 📚 Auto-Loaded Reference Documents

The following documents are automatically imported for context:

**Claude Project Files:**
@./.claude/README.md
@./.claude/SUMMARY.md
@./.claude/LIBRARY-GUIDE.md

**Project Overview:**
@../PROJECT-SUMMARY.md
@../QUICK-START.md
@../README.md

**Core Documentation:**
@../docs/01-VSM-FRAMEWORK-GUIDE.md
@../docs/02-LITHODAT-CONTEXT.md
@../docs/03-VSS-PRODUCT-STRATEGY-CLAIR.md

**Implementation Plans:**
@./.claude/plans/2025-10-31-prototype-implementation-plan.md
@./.claude/plans/hosting-investigation-guide.md

**Team Data:**
@../prototypes/web-app/data/lithodat-team-roster.md

**Strategic Approach:**
@../specs/RECOMMENDED-Phased-Hybrid.md
@../roadmap/PHASE-1-Immediate-Start.md

---

## 🎯 Project Overview

Building an interactive web platform for the Viable Systems Model (VSM) strategic planning framework. This will enable Lithodat's team (currently 19 people: 3 management + 10 full-time + 6 contractors) to collaboratively diagnose organizational health, create unified vision, and execute strategy.

### Phase Approach
- **Phase 1 (Current):** Prototype planning and architecture
- **Phase 2:** Build MVP prototype (simple web interface)
- **Phase 3:** Production deployment to clair.au/vss/
- **Phase 4:** Scale and productize for external customers

---

## 📚 LIBRARY ORGANIZATION SYSTEM

This project uses a structured library system to organize all files and artifacts. All paths are relative to project root: `/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/`

### Complete Directory Structure

```
VSM-Platform-Project/
│
├── .claude/                           # 🎯 PROJECT-LEVEL CLAUDE CONFIGURATION
│   ├── CLAUDE.md                     # This file - main project instructions
│   ├── README.md                     # Quick reference and navigation guide
│   ├── SUMMARY.md                    # Complete project overview and status
│   │
│   ├── plans/                        # 📋 Implementation plans and guides
│   │   ├── 2025-10-31-prototype-implementation-plan.md
│   │   └── hosting-investigation-guide.md
│   │
│   └── memory/                       # 🧠 Project memory and context
│       ├── decisions/                # Important decision logs (date-stamped)
│       └── meetings/                 # Workshop and meeting notes
│
├── docs/                             # 📖 CORE DOCUMENTATION
│   ├── 01-VSM-FRAMEWORK-GUIDE.md    # VSM methodology reference
│   ├── 02-LITHODAT-CONTEXT.md       # Lithodat's specific situation
│   ├── 03-VSS-PRODUCT-STRATEGY-CLAIR.md  # Product vision for clair.au
│   ├── 04-MAX-CLEAN-LEARNINGS.md    # Learnings from Max Clean project
│   └── Images/                       # Documentation images and diagrams
│
├── specs/                            # 📐 APPROACH SPECIFICATIONS
│   ├── RECOMMENDED-Phased-Hybrid.md  # Recommended implementation approach
│   └── [other approach specs]        # Alternative approaches evaluated
│
├── roadmap/                          # 🗺️ IMPLEMENTATION ROADMAPS
│   ├── PHASE-1-Immediate-Start.md   # Week-by-week Phase 1 plan
│   ├── DECISION-FRAMEWORK.md        # Decision-making framework
│   └── [other phase plans]          # Detailed phase breakdowns
│
├── integrations/                     # 🔌 INTEGRATION SPECIFICATIONS
│   ├── Claude-AI-Integration.md     # AI integration approach
│   ├── Jira-Integration-Plan.md     # Jira sync specifications
│   └── MCP-Tools-Integration.md     # MCP server integrations
│
├── prototypes/                       # 🧪 PROTOTYPE IMPLEMENTATIONS
│   └── web-app/                     # Web application prototype
│       ├── planning/                # Architecture and technical specs
│       ├── design/                  # UI/UX wireframes and mockups
│       ├── code/                    # Prototype source code
│       └── data/                    # Test data and samples
│
├── production/                       # 🚀 PRODUCTION-READY CODE
│   ├── web-app/                     # Production web application
│   │   ├── frontend/                # Next.js frontend application
│   │   ├── backend/                 # API routes and server logic
│   │   ├── database/                # Database schemas and migrations
│   │   └── deployment/              # Deployment configs and scripts
│   │
│   └── documentation/               # Production documentation
│       ├── api/                     # API documentation
│       ├── user-guides/             # End-user documentation
│       └── admin-guides/            # Admin documentation
│
├── research/                         # 🔬 RESEARCH AND REFERENCES
│   ├── VSM-Literature.md            # VSM research papers and books
│   └── Competitive-Analysis.md      # Competitor analysis
│
├── PROJECT-SUMMARY.md               # 📄 Executive project summary
├── QUICK-START.md                   # ⚡ Quick reference guide
└── README.md                        # 📘 Project overview
```

---

## 🗂️ FILE STORAGE LOCATIONS

### Claude Project Files (.claude/)

| Type | Location | Description |
|------|----------|-------------|
| **Project Instructions** | `.claude/CLAUDE.md` | This file - main project configuration |
| **Quick Reference** | `.claude/README.md` | Navigation and getting started guide |
| **Project Summary** | `.claude/SUMMARY.md` | Complete status and deliverables |
| **Implementation Plans** | `.claude/plans/` | Detailed roadmaps and technical specs |
| **Decision Logs** | `.claude/memory/decisions/` | Date-stamped decision records |
| **Meeting Notes** | `.claude/memory/meetings/` | Workshop and planning session notes |

### Core Documentation (docs/)

| Type | Location | Description |
|------|----------|-------------|
| **VSM Framework** | `docs/01-VSM-FRAMEWORK-GUIDE.md` | VSM methodology reference |
| **Context** | `docs/02-LITHODAT-CONTEXT.md` | Lithodat organizational context |
| **Product Strategy** | `docs/03-VSS-PRODUCT-STRATEGY-CLAIR.md` | clair.au vision and strategy |
| **Learnings** | `docs/04-MAX-CLEAN-LEARNINGS.md` | Prior project insights |
| **Images** | `docs/Images/` | Documentation diagrams and screenshots |

### Specifications & Roadmaps

| Type | Location | Description |
|------|----------|-------------|
| **Approach Specs** | `specs/` | Implementation approach evaluations |
| **Phase Plans** | `roadmap/` | Detailed phase breakdowns and timelines |
| **Integration Specs** | `integrations/` | Third-party integration plans |

### Prototype Files (prototypes/)

| Type | Location | Description |
|------|----------|-------------|
| **Architecture Docs** | `prototypes/web-app/planning/` | Technical architecture specifications |
| **Design Files** | `prototypes/web-app/design/` | UI mockups, wireframes, user flows |
| **Prototype Code** | `prototypes/web-app/code/` | MVP implementation (Next.js app) |
| **Test Data** | `prototypes/web-app/data/` | Sample data and fixtures |
| **Local Database** | `prototypes/web-app/code/*.db` | SQLite database files |
| **Static Assets** | `prototypes/web-app/code/public/` | Images, icons, fonts |

### Production Files (production/)

| Type | Location | Description |
|------|----------|-------------|
| **Frontend Code** | `production/web-app/frontend/` | Production Next.js application |
| **Backend Code** | `production/web-app/backend/` | Production API routes and services |
| **Database Schemas** | `production/web-app/database/schema/` | PostgreSQL schema definitions |
| **Migrations** | `production/web-app/database/migrations/` | Database migration scripts |
| **Deployment Configs** | `production/web-app/deployment/` | Environment and deployment files |
| **API Documentation** | `production/documentation/api/` | OpenAPI/Swagger specs |
| **User Guides** | `production/documentation/user-guides/` | End-user documentation |
| **Admin Guides** | `production/documentation/admin-guides/` | Administrator documentation |

### Research & Analysis

| Type | Location | Description |
|------|----------|-------------|
| **VSM Research** | `research/` | Academic papers, books, references |
| **Competitor Analysis** | `research/` | Market and competitor research |

---

## 📋 FORM SYSTEM ARCHITECTURE

### Overview

This project uses **dynamic form systems** as the primary method for **communicating with users and gathering information**. Forms are the core interaction pattern throughout the platform.

### Form System Pattern

All forms in this project follow a consistent architecture:

1. **Question Definition** → Define questions/fields in `/src/lib/` directory
2. **Database Schema** → Add models to `prisma/schema.prisma`
3. **API Routes** → Create CRUD endpoints in `/src/app/api/`
4. **Page Component** → Create form page in `/src/app/(dashboard)/`
5. **Reusable Components** → Build question renderers/form components
6. **Auto-Save** → Implement 30-second auto-save functionality
7. **Validation & Submit** → Handle required fields and completion tracking

### Current Forms in Production

#### 1. **Finance/Bookkeeping Dashboard** (`/finance`)
- **Purpose:** Monthly financial task tracking and metrics management
- **Database Models:** `FinanceTask`, `FinanceMetric`, `MonthEndSummary`, `FinanceComment`
- **Features:**
  - Task list with completion tracking
  - Calendar view toggle
  - Month navigation (previous/next)
  - Metrics dashboard with readiness scores
  - Task comments and collaboration
- **Components:** `MetricsDashboard`, `TaskList`, `CalendarView`
- **API Routes:** `/api/finance/tasks`, `/api/finance/metrics`, `/api/finance/tasks/[id]`
- **Page:** `src/app/(dashboard)/finance/page.tsx`

#### 2. **VSM System 1 Assessment** (`/assessment`)
- **Purpose:** Multi-step questionnaire for Viable Systems Model System 1 assessment
- **Database Model:** `Assessment`
- **Features:**
  - Step-by-step progression with progress bar
  - Auto-save every 30 seconds
  - Question types: text, textarea, radio
  - Navigation between questions (Previous/Next)
  - Draft saving and final submission
  - Progress indicator dots
- **Questions Defined In:** `src/lib/questions.ts`
- **API Routes:** `/api/assessment`
- **Page:** `src/app/(dashboard)/assessment/page.tsx`

#### 3. **Management Action Forms** (`/management/action/[slug]`)
- **Purpose:** Dynamic strategic action forms for team collaboration and consensus building
- **Database Models:** `ActionItem`, `ActionResponse`, `ActionConsensus`
- **Features:**
  - Dynamic questions based on action metadata (each action has unique questions)
  - Auto-save every 30 seconds
  - Conditional question logic (show/hide based on previous answers)
  - Multiple question types:
    - Basic: text, textarea, radio, checkbox, dropdown, date, number, currency
    - Advanced: implementation_table, ranking, rating, selectable_tags
    - Display: info (informational, no input)
  - Team response comparison view
  - Consensus building interface
  - Completion status tracking
- **Components:** `ActionFormWrapper`, `QuestionRenderer`, `LithodatLicenceModal`
- **Questions Defined In:** `src/lib/actions/` directory
  - `action1-products-services.ts` (LithoSurfer, LithoData, LithoBuild strategy)
  - `action2-unified-utopia.ts` (Unified vision definition)
  - `action3-setup-departments.ts` (Organizational structure)
  - `action4-okr-implementation.ts` (OKR framework and execution)
  - Future: action5, action6, action7
- **Type Definitions:** `src/lib/actions/types.ts`
- **API Routes:** `/api/actions/[actionId]/responses`, `/api/actions/[actionId]/consensus`
- **Pages:**
  - Individual form: `src/app/(dashboard)/management/action/[slug]/page.tsx`
  - Team responses: `src/app/(dashboard)/management/action/[slug]/team-responses/page.tsx`
  - Consensus: `src/app/(dashboard)/management/action/[slug]/consensus/page.tsx`

#### 4. **Data Extraction Forms** (Juan-specific workflows)
- **Purpose:** Research and feedback collection for data extraction processes
- **Database Models:** `DataExtractionProcess`, `DataExtractionFeedback`, `DataExtractionQuestion`, `DataExtractionResearch`
- **Features:**
  - Multi-language support (English/Spanish)
  - Process step feedback
  - Research question responses
  - Workspace links management
- **API Routes:**
  - `/api/data-extraction/research`
  - `/api/data-extraction/feedback`
  - `/api/data-extraction/questions`
- **Pages:**
  - Research: `src/app/(dashboard)/data-extraction/research/page.tsx`
  - Questions: `src/app/(dashboard)/data-extraction/questions/page.tsx`
  - Process: `src/app/(dashboard)/data-extraction/process/page.tsx`

### Creating New Forms

**⚡ AUTOMATED FORM GENERATION (Recommended)**

The VSM Platform includes an automated form generation system that creates complete form infrastructure from a 5-question prompt. This is the fastest and most consistent way to create new forms.

#### Quick Start: Generate a New Form

```bash
/gen-form
```

Claude will ask 5 questions:
1. **Form name** - Unique identifier (e.g., "employee-review", "client-feedback")
2. **Access control** - Who can access (all users, managers only, admin only)
3. **Purpose** - Brief description of the form's purpose
4. **Questions** - Path to markdown/CSV/text file OR manually specify questions
5. **UX pattern** - step-by-step, single-page, multi-section, or dashboard

**What Gets Generated (6 files):**
- Database schema (Prisma model)
- API routes (GET, POST, PATCH, PUT with auto-save)
- Frontend page (client component with auto-save, validation)
- Questions definition (TypeScript with helper functions)
- E2E test suite (Playwright tests)
- Documentation (complete API and usage docs)

**Time Savings:** ~40 hours → ~5 hours (including testing)

#### Example: Employee Feedback Form

1. Create questions file (markdown format):

```markdown
## Employee Information
1. What is your full name?
   - Required: yes
   - Placeholder: John Smith

2. What is your employee ID?
   - Required: yes

## Feedback
3. What did you accomplish this month? [textarea]
   - Required: yes
   - Max Length: 1000

4. How satisfied are you with your work? [rating]
   - Required: yes
   - Rating Scale: 5
```

2. Run `/gen-form` and answer the prompts
3. Form is ready to use at `/employee-feedback`

#### Form Management Commands

Once forms are created, you can manage them with these commands:

**List all forms:**
```bash
/list-form                    # Show all forms
/list-form active            # Show only active forms
/list-form --manager-only    # Show manager-only forms
/list-form --detailed        # Show detailed information
/list-form --stats           # Show registry statistics
```

**Update existing form (non-breaking changes):**
```bash
/update-form employee-review
```

Non-breaking changes include:
- ✅ Add new optional questions
- ✅ Update question text/help text
- ✅ Add new sections
- ✅ Reorder questions
- ✅ Fix typos

**Migrate form (breaking changes):**
```bash
/migrate-form employee-review
```

Breaking changes include:
- ⚠️ Remove questions
- ⚠️ Change question types
- ⚠️ Make optional questions required
- ⚠️ Remove/rename options from choice questions

**Data preservation:** `/migrate-form` automatically preserves existing data during migrations

#### Question File Formats

The form generator supports three input formats:

**1. Markdown (recommended)**
```markdown
## Section Name

1. Question text? [type]
   - Help: Help text here
   - Required: yes/no
   - Placeholder: Enter value...
   - Max Length: 1000

   Options:
   - Option 1
   - Option 2
```

**2. CSV**
```csv
id,question,type,section,required,placeholder,helpText,options
q1,Full name?,text,Info,yes,John Smith,Enter your full name,
q2,Department?,dropdown,Info,yes,,Select department,"Sales,Marketing,Tech"
```

**3. Plain Text**
```
What is your full name?
What is your employee ID?
What did you accomplish this month?
```

#### Supported Question Types (12 types)

- **text** - Single-line text input
- **textarea** - Multi-line text input
- **radio** - Single choice (radio buttons)
- **checkbox** - Multiple choices
- **dropdown** - Single choice (dropdown menu)
- **date** - Date picker
- **number** - Numeric input
- **currency** - Money/price input
- **rating** - Star rating (1-10 scale)
- **ranking** - Drag-and-drop ranking
- **selectable_tags** - Tag selection
- **info** - Display-only (no input)

#### Form Registry

All generated forms are tracked in `build-data/FORM-REGISTRY.json`:
- Unique form ID (FORM-001, FORM-002, etc.)
- Version number (semantic versioning)
- Status (active, deprecated, archived, draft)
- Question count and UX pattern
- File locations and migration history
- Complete change log

#### Advanced: Manual Form Creation

If you need custom logic beyond what the generator provides, follow this workflow:

1. **Define Questions** in `src/lib/[form-name]/` or `src/lib/[form-name].ts`
   - Export question array with types
   - Define validation rules
   - Set up conditional logic if needed

2. **Update Database Schema** in `prisma/schema.prisma`
   - Add new models for the form
   - Define relationships
   - Run `npx prisma migrate dev`

3. **Create API Routes** in `src/app/api/[form-name]/`
   - GET: Fetch existing responses
   - POST: Create new response
   - PATCH: Update draft response
   - PUT: Submit completed response

4. **Build Page Component** in `src/app/(dashboard)/[form-name]/page.tsx`
   - Use existing patterns (ActionFormWrapper, QuestionRenderer)
   - Implement auto-save (30-second interval)
   - Add loading states and error handling

5. **Add Navigation** to sidebar/dashboard as needed

**Note:** Manual creation takes ~40+ hours vs ~5 hours with `/gen-form`

### Form Design Principles

- **Auto-save is mandatory** - Users should never lose work
- **Progress indicators** - Show completion status clearly
- **Validation on submit** - Not on every keystroke
- **Conditional logic** - Show/hide questions based on answers
- **Mobile responsive** - All forms work on mobile devices
- **Accessibility** - WCAG 2.1 AA compliant
- **Team collaboration** - Many forms support viewing team responses

---

## 📁 BUILD-DATA ORGANIZATION

### Overview

The `build-data/` directory is organized by **form categories**, with each form having its own complete build-data structure. Files are organized into **numbered priority folders** (01-05) plus a shared `errors/` folder.

### Top-Level Structure

```
build-data/
├── .gitignore
├── 01 main-app/          ← General platform documentation (18 files)
├── 02 products/          ← VSM/LithoSurfer strategy forms (19 files)
├── 03 bookkeeping/       ← Finance dashboard form (6 files)
├── 04 juan/              ← Data extraction forms (2 files)
├── 05 hr review/         ← HR review forms (23 files)
└── errors/               ← Project-wide error tracking
    └── debug/
```

### Standard Build-Data Substructure

**Each numbered folder (01-05) contains the same substructure:**

```
[folder-name]/
├── assets/              ← Images, PDFs, design files
├── documentation/       ← Specs, guides, implementation docs
├── learning/            ← Research notes, tutorials, experiments
├── prototypes/          ← POCs, draft implementations
├── archive/             ← Deprecated docs, old versions
├── errors/              ← Form-specific error tracking
└── ideas/               ← Form-specific feature ideas
```

### Form Categories

#### **01 main-app/** (Platform-Wide Documentation)
- **Purpose:** General VSS platform documentation not specific to any form
- **Contains:**
  - Platform deployment architecture
  - Troubleshooting guides
  - Progress tracking
  - Max Clean learnings
  - License and consolidated docs
- **Assets:** Clair logo, sellables PDF
- **File Count:** 18 files

#### **02 products/** (VSM Strategy & Products Forms)
- **Purpose:** Documentation for management action forms (products-services, unified-utopia, setup-departments, okr-implementation)
- **Contains:**
  - VSM framework guides (01-VSM-FRAMEWORK-GUIDE.md)
  - Lithodat context (02-LITHODAT-CONTEXT.md)
  - Product strategy (03-VSS-PRODUCT-STRATEGY-CLAIR.md)
  - Action response summaries and questions
  - LithoSurfer, LithoData, LithoBuild questions
  - Pricing calculator specs
  - Draft system assessments
- **Assets:** VSM diagrams, LithoDat logo, workflow images (in Images/ subfolder)
- **File Count:** 19 files
- **Related Forms:**
  - `/management/action/products-services`
  - `/management/action/unified-utopia`
  - `/management/action/setup-departments`
  - `/management/action/okr-implementation`

#### **03 bookkeeping/** (Finance Dashboard Form)
- **Purpose:** Documentation for monthly finance tracking form
- **Contains:**
  - Finance dashboard specs and implementation roadmap
  - MVP completion documentation
  - UltraThinking analysis
  - Kristy's monthly finance guide
  - MonthlyFinance guide
- **File Count:** 6 files
- **Related Form:** `/finance`

#### **04 juan/** (Data Extraction Forms)
- **Purpose:** Documentation for Juan's data extraction workflow forms
- **Contains:**
  - Data extraction process documentation (.docx)
  - Juan's interview notes (copied from HR)
- **File Count:** 2 files
- **Related Forms:**
  - `/data-extraction/research`
  - `/data-extraction/questions`
  - `/data-extraction/process`

#### **05 hr review/** (HR Review Forms)
- **Purpose:** Documentation for HR review and employee feedback forms
- **Contains:**
  - **2025/** - 2025 review data, meeting notes, planning emails, HTML reports
  - **Employee_Feedback_Survey_2025.csv** - Survey responses
  - **Goal Setting/** - Annual goal setting form responses
  - **HR_Review_System/** - System documentation
  - **Interview/** - 9 employee interview notes (Benjamin, Christina, Juan, Kimberly, Kristy, Nora, Perla, Raul, Tarun)
- **File Count:** 23 files
- **Related Forms:** HR review forms (future implementation)

#### **errors/** (Project-Wide Error Tracking)
- **Purpose:** Track and debug project-wide errors across all forms
- **Structure:**
  - `live-errors.md` - Current active errors
  - `debug/` - Individual error debug logs (ER-XXX-*.md)
- **Note:** This is separate from form-specific error folders because errors can span multiple forms

### File Organization Guidelines

1. **Form-specific documentation** → Goes in the corresponding numbered folder's `documentation/` subfolder
2. **Design assets (images, PDFs, mockups)** → Goes in `assets/` subfolder
3. **Research and learning notes** → Goes in `learning/` subfolder
4. **Prototypes and POCs** → Goes in `prototypes/` subfolder
5. **Old/deprecated files** → Move to `archive/` subfolder
6. **Form-specific errors** → Goes in form's `errors/` subfolder
7. **Cross-form errors** → Goes in top-level `errors/` folder
8. **Feature ideas** → Goes in form's `ideas/` subfolder

### Best Practices

- **Keep forms isolated** - Each form's documentation lives in its own folder
- **Use numbered prefixes** - 01-05 shows priority/importance
- **Maintain consistent structure** - Every form has the same subfolders
- **Document form relationships** - Note which build-data folder supports which route/form
- **Update this guide** - When adding new form categories, document them here

---

## 🔧 DEVELOPMENT WORKFLOW

### When Working on Prototype:
1. All planning docs → `.claude/plans/`
2. Code → `prototypes/web-app/code/`
3. Design work → `prototypes/web-app/design/`
4. Use lightweight tech (SQLite, JSON files, simple hosting)

### When Migrating to Production:
1. Copy stable code from `prototypes/` → `production/`
2. Upgrade infrastructure (PostgreSQL, proper hosting)
3. Add proper error handling, logging, security
4. Document API in `production/documentation/`

### File Naming Conventions:
- Plans: `YYYY-MM-DD-plan-name.md`
- Decisions: `YYYY-MM-DD-decision-topic.md`
- Code: Follow Next.js conventions
- Docs: Use descriptive names with hyphens

---

## 🎨 PROTOTYPE SPECIFICATIONS

### Target: clair.au/vss/

**Hosting:** GoDaddy (current domain owner)
**Deployment:** TBD - investigate GoDaddy hosting capabilities
**Tech Stack (Proposed):**
- Frontend: Next.js 14 + React + TypeScript + Tailwind CSS
- Backend: Next.js API routes
- Database: SQLite (prototype) → PostgreSQL (production)
- Auth: Simple username/password
- Hosting: Static export or Node.js hosting (depends on GoDaddy)

### Core Features (MVP):
1. **User Authentication**
   - Login page for 19 team members (3 mgmt + 10 full-time + 6 contractors)
   - Simple username/password
   - Admin dashboard for Keith (see actual roster: prototypes/web-app/data/lithodat-team-roster.md)

2. **VSM Assessment Forms**
   - 5 forms (one per system: 1, 2, 3, 4, 5)
   - Guided questions based on VSM framework
   - Save progress, submit when complete

3. **Vision Submission**
   - Form for submitting utopia visions
   - Rich text editor
   - Attach to user profile

4. **Ideas Portal**
   - Submit strategic ideas
   - Categorize by system and function
   - Vote/comment on ideas

5. **Admin Dashboard**
   - View all submissions
   - Team progress tracking
   - Export data (CSV/PDF)

### Non-Functional Requirements:
- Mobile-responsive
- Works on all modern browsers
- Simple, clean UI
- Fast load times
- Accessible (WCAG 2.1 AA)

---

## 📋 CURRENT PROJECT STATUS

**Phase:** VSM Action Implementation (Actions 1-4 Complete)
**Current Progress:** 4 of 7 Priority Actions Built
**Platform:** Deployed to Vercel at vss-5f7s688ry-cl-air.vercel.app
**Last Updated:** 2025-11-06

**VSM Priority Actions Progress:**
1. ✅ Action 1: Products, Services & Pricing (COMPLETE - Management consensus tool)
2. ✅ Action 2: Define Unified Utopia (COMPLETE - 8 questions, consensus building)
3. ✅ Action 3: Setup Three Departments (COMPLETE - Organizational structure)
4. ✅ Action 4: Implementation Plan (OKRs) (COMPLETE - OKR framework, execution strategy)
5. ⬜ Action 5: Build System 4 Intelligence
6. ⬜ Action 6: Career Paths & Org Design
7. ⬜ Action 7: Realtime Amplifiers & Attenuators

**Platform Capabilities Built:**
- ✅ Authentication system (JWT, bcrypt, session management)
- ✅ User management (19 team members seeded)
- ✅ Management team identification (isManager flag)
- ✅ Action metadata framework (flexible question structure)
- ✅ Individual assessment forms (8 questions per action)
- ✅ Team response comparison view
- ✅ Consensus building interface
- ✅ Auto-save functionality (30-second intervals)
- ✅ Progress tracking and completion status
- ✅ Database: Neon Postgres (production-ready)
- ✅ Hosting: Vercel (auto-deploy from GitHub)

**Tech Stack Implemented:**
- Frontend: Next.js 14 + React + TypeScript + Tailwind CSS
- Backend: Next.js API routes
- Database: PostgreSQL (Neon) + Prisma ORM
- Auth: JWT with HTTP-only cookies + bcrypt
- Deployment: Vercel (CI/CD from GitHub)
- Design: Blue/Navy/Gold color scheme

**Completed:**
- ✅ VSM framework research and documentation
- ✅ Lithodat context analysis
- ✅ Product strategy for clair.au
- ✅ Library organization system
- ✅ Full authentication and user management
- ✅ Actual Lithodat team data (19 employees + management flags)
- ✅ 4 complete VSM actions with consensus building
- ✅ Production database and hosting infrastructure
- ✅ OKR framework selection and implementation planning

**In Progress:**
- 🔄 Actions 5-7 (remaining priority actions)

**Next Actions:**
- Build Action 5: System 4 Intelligence
- Build Action 6: Career Paths & Org Design
- Build Action 7: Realtime Amplifiers & Attenuators

---

## 🚀 DEPLOYMENT PLAN

### Prototype Deployment:
1. **Option A: Static Export**
   - Build static Next.js site
   - Upload to GoDaddy via FTP
   - No server-side features
   - Limited functionality

2. **Option B: Node.js Hosting**
   - Use GoDaddy's Node.js hosting (if available)
   - Full Next.js features
   - Database connection
   - Recommended approach

3. **Option C: External Hosting**
   - Vercel/Netlify for app
   - Point clair.au/vss/ via DNS
   - Easiest development
   - May incur costs

### Production Deployment:
- Dedicated hosting (AWS, DigitalOcean, or Railway)
- Custom domain setup
- SSL certificates
- CDN for assets
- Database backups
- Monitoring and logging

---

## 🔐 SECURITY & PRIVACY

### Data Storage:
- All user submissions stored in database
- No sensitive personal information collected
- Workshop notes and strategic data are confidential
- Admin-only access to all submissions

### Authentication:
- Secure password hashing (bcrypt)
- Session management
- HTTPS required
- Rate limiting on login

### Access Control:
- Team members see only their own submissions
- Admins (Keith + Directors) see everything
- Export permissions restricted to admins

---

## 📞 KEY CONTACTS & ROLES

**Project Lead:** Keith Dimech (COO)
- Overall vision and requirements
- Admin user for platform
- Final decision authority

**Technical Team:**
- Developers: TBD (Lithodat dev team)
- Designer: TBD
- DevOps: TBD

**Stakeholders:**
- Fabian Kohlmann (CEO)
- Wayne Noble (Technical Director)
- Moritz Theile (Operations Director)
- Vinko Novak (Strategy/Planning)

---

## 📝 INSTRUCTIONS FOR CLAUDE

### When Working on This Project:

1. **Always reference the VSM framework docs** in `docs/` folder
2. **Follow the library organization** - put files in correct locations
3. **Update this CLAUDE.md** when making structural changes
4. **Create decision logs** in `.claude/memory/decisions/` for important choices
5. **Document assumptions** in planning files
6. **Ask clarifying questions** before major architectural decisions
7. **Keep prototype simple** - optimize for learning and speed
8. **Think production-ready** - but don't over-engineer the prototype

### File Creation Guidelines:

**For Planning Documents:**
- Create in `.claude/plans/`
- Include: Objective, Approach, Timeline, Deliverables, Risks
- Use markdown with clear headings
- Link to relevant docs

**For Code:**
- Follow Next.js/React best practices
- Comment complex logic
- Use TypeScript for type safety
- Keep components small and focused

**For Documentation:**
- Clear, concise language
- Code examples where helpful
- Screenshots/diagrams when appropriate
- Keep it updated as project evolves

### Communication Style:
- Be specific and detailed in technical docs
- Ask clarifying questions when requirements are ambiguous
- Propose options with pros/cons for decisions
- Flag risks and dependencies early
- Provide realistic timelines

---

## 🎯 SUCCESS CRITERIA

### Prototype Success:
- ✅ Keith can deploy to clair.au/vss/
- ✅ 19 team members can login and submit forms
- ✅ All 5 VSM systems have assessment forms (MVP: System 1 only, expand later)
- ✅ Admin dashboard shows all submissions
- ✅ Data can be exported for analysis
- ✅ Works on mobile and desktop
- ✅ Completed in 5 days (rapid MVP build)

### Production Success:
- ✅ Scalable to 25+ users
- ✅ Fast, reliable performance
- ✅ Professional UI/UX
- ✅ Secure and compliant
- ✅ Easy to maintain and update
- ✅ Could be productized for external customers

---

## 📚 REFERENCE DOCUMENTS

**Must Read:**
1. `docs/01-VSM-FRAMEWORK-GUIDE.md` - VSM methodology
2. `docs/02-LITHODAT-CONTEXT.md` - Lithodat's specific situation
3. `specs/RECOMMENDED-Phased-Hybrid.md` - Overall approach
4. `roadmap/PHASE-1-Immediate-Start.md` - Week-by-week plan

**Strategic Context:**
- `docs/03-VSS-PRODUCT-STRATEGY-CLAIR.md` - Product vision for clair.au
- `PROJECT-SUMMARY.md` - Executive summary
- `QUICK-START.md` - Quick reference guide

**Implementation:**
- `integrations/Claude-AI-Integration.md` - AI integration approach
- `.claude/plans/` - Detailed implementation plans (to be created)

---

## 🔄 VERSION HISTORY

**v0.1 - 2025-10-31**
- Initial CLAUDE.md creation
- Library organization system established
- Prototype planning phase begun

---

**This file should be updated whenever:**
- Project structure changes
- New directories are added
- File organization conventions change
- Important decisions are made
- Project status/phase changes
