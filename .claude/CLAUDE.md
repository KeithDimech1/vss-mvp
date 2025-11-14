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
