# VSS Platform - Library System Quick Reference

**Purpose:** Quick guide to understanding and using the project library system
**Last Updated:** 2025-10-31

---

## 🎯 What is the Library System?

The library system is a **structured file organization** that ensures:
- Every file has a designated place
- You can find things quickly
- Claude knows where to put/retrieve files
- New team members can navigate easily
- Project stays organized as it grows

---

## 📚 The Two-Level Memory System

### Level 1: User Memory (Global)
```
~/.claude/CLAUDE.md
```
**What:** Your personal preferences across ALL projects
**Contains:**
- Token monitor setup
- Documentation tools (/docs)
- Web research tools
- YOLO mode configuration
- Personal coding preferences

**Who sees it:** Just you (applies to every Claude session)

### Level 2: Project Memory (This Project)
```
VSM-Platform-Project/.claude/CLAUDE.md
```
**What:** VSS Platform-specific instructions
**Contains:**
- Project overview and goals
- File organization rules
- Tech stack specifications
- Development workflows
- Where to put different types of files

**Who sees it:** Anyone working on VSS Platform (shared via git)

### How They Work Together

When you run Claude Code in the VSM project:
```
1. Loads: ~/.claude/CLAUDE.md              (your global prefs)
2. Loads: VSM-Platform-Project/.claude/CLAUDE.md  (project rules)
3. Combines them: Project-specific overrides/extends global
```

---

## 🗂️ The Library Zones (Where Things Go)

### Zone 1: Planning & Memory (.claude/)
**Purpose:** Project planning, decisions, and session memory

```
.claude/
├── CLAUDE.md              # Main project instructions (this is key!)
├── README.md              # Quick reference guide
├── SUMMARY.md             # Project status overview
├── LIBRARY-GUIDE.md       # This file
│
├── plans/                 # Implementation plans
│   ├── 2025-10-31-prototype-implementation-plan.md
│   └── hosting-investigation-guide.md
│
└── memory/                # Project memory
    ├── decisions/         # Decision logs (YYYY-MM-DD-topic.md)
    └── meetings/          # Meeting notes (YYYY-MM-DD-meeting.md)
```

**When to use:**
- Creating implementation plans
- Logging important decisions
- Recording meeting outcomes
- Project-level configuration

### Zone 2: Documentation (docs/, specs/, roadmap/)
**Purpose:** Reference materials and strategic documents

```
docs/                      # Core VSM documentation
specs/                     # Approach specifications
roadmap/                   # Phase plans
integrations/              # Integration specs
research/                  # Research and analysis
```

**When to use:**
- Reference materials (VSM framework)
- Strategic planning documents
- Research and analysis
- Integration specifications

### Zone 3: Prototype (prototypes/)
**Purpose:** MVP development and experimentation

```
prototypes/
└── web-app/
    ├── planning/          # Technical architecture
    ├── design/            # UI/UX mockups
    ├── code/              # Actual prototype code
    └── data/              # Test data
```

**When to use:**
- Building the MVP
- Quick experiments
- Learning and iteration
- Testing ideas

**Philosophy:** Move fast, learn quickly, don't over-engineer

### Zone 4: Production (production/)
**Purpose:** Production-ready, tested, documented code

```
production/
├── web-app/
│   ├── frontend/          # Next.js app
│   ├── backend/           # API services
│   ├── database/          # Schema and migrations
│   └── deployment/        # Deploy configs
│
└── documentation/
    ├── api/               # API docs
    ├── user-guides/       # End-user guides
    └── admin-guides/      # Admin docs
```

**When to use:**
- After prototype proves successful
- Building for scale
- Adding proper error handling
- Creating deployment pipelines

**Philosophy:** Maintainable, secure, scalable

---

## 🎬 Common Workflows

### Workflow 1: Making an Important Decision

```
1. Discuss options with Claude
2. Make the decision
3. Create decision log:
   Location: .claude/memory/decisions/
   Name: YYYY-MM-DD-decision-topic.md

Example: .claude/memory/decisions/2025-10-31-hosting-decision.md
```

### Workflow 2: Running a Workshop

```
1. Prepare workshop materials (in docs/)
2. Run workshop with team
3. Document outcomes:
   Location: .claude/memory/meetings/
   Name: YYYY-MM-DD-workshop-name.md

Example: .claude/memory/meetings/2025-11-05-system-1-workshop.md
```

### Workflow 3: Creating New Implementation Plan

```
1. Think through the approach
2. Create detailed plan:
   Location: .claude/plans/
   Name: YYYY-MM-DD-plan-name.md

Example: .claude/plans/2025-11-10-database-migration-plan.md
```

### Workflow 4: Starting Prototype Development

```
1. Read implementation plan from .claude/plans/
2. Create architecture doc:
   Location: prototypes/web-app/planning/
   Name: architecture-v1.md

3. Start coding:
   Location: prototypes/web-app/code/

4. Test with sample data:
   Location: prototypes/web-app/data/
```

### Workflow 5: Moving Prototype to Production

```
1. Prototype works and is validated
2. Copy stable code from prototypes/ → production/
3. Add production features:
   - Error handling
   - Logging
   - Security hardening
   - Performance optimization

4. Document in production/documentation/
```

---

## 📋 File Naming Conventions

### Decision Logs
```
Format: YYYY-MM-DD-decision-topic.md
Example: 2025-10-31-hosting-decision.md
```

### Meeting Notes
```
Format: YYYY-MM-DD-meeting-topic.md
Example: 2025-11-05-system-1-workshop.md
```

### Plans
```
Format: YYYY-MM-DD-plan-name.md
Example: 2025-10-31-prototype-implementation-plan.md
```

### Documentation
```
Format: descriptive-name-with-hyphens.md
Example: database-schema-design.md
Example: api-authentication-guide.md
```

### Code Files
```
Follow framework conventions:
- Next.js: page.tsx, layout.tsx, route.ts
- React: ComponentName.tsx
- Services: serviceName.ts
```

---

## 🔍 How to Find Things

### Finding Documentation
```bash
# All VSM framework docs
docs/01-VSM-FRAMEWORK-GUIDE.md

# Implementation plans
ls .claude/plans/

# Past decisions
ls .claude/memory/decisions/

# Meeting notes
ls .claude/memory/meetings/
```

### Ask Claude
```
"Where should I put the database schema design document?"
"Show me all the decision logs we've created"
"What's in the prototypes/web-app/planning/ folder?"
```

### Use /memory Command
```bash
/memory
```
Shows all loaded CLAUDE.md files and their imports

---

## 🎨 The @Import System

### What are Imports?

CLAUDE.md can automatically load other documents:

```markdown
# In .claude/CLAUDE.md

Project overview: @../PROJECT-SUMMARY.md
VSM Framework: @../docs/01-VSM-FRAMEWORK-GUIDE.md
```

### Why Use Imports?

**Without imports:**
- Claude needs to be told to read documents
- You have to manually reference files
- Easy to miss important context

**With imports:**
- Documents automatically loaded
- Always have necessary context
- Less repetition

### Current Imports in VSS Platform

Our CLAUDE.md automatically imports:
- PROJECT-SUMMARY.md
- QUICK-START.md
- README.md
- All core docs (VSM framework, context, strategy)
- All implementation plans
- Key roadmap documents

**You don't need to manually tell Claude to read these!**

---

## 💡 Quick Tips

### Tip 1: When in Doubt, Check CLAUDE.md
```
Open: .claude/CLAUDE.md
Look for: File storage locations table
Find: Where your file type belongs
```

### Tip 2: Use the Right Zone
```
Planning something? → .claude/plans/
Building prototype? → prototypes/web-app/code/
Going to production? → production/web-app/
Reference material? → docs/ or specs/
```

### Tip 3: Date-Stamp Important Files
```
Good: 2025-10-31-hosting-decision.md
Bad: hosting-decision.md

Why? Easy to sort chronologically and see history
```

### Tip 4: Keep CLAUDE.md Updated
```
When you:
- Add new directories
- Change file organization
- Add new conventions
- Make structural changes

Update: .claude/CLAUDE.md
```

### Tip 5: Ask Claude for Help
```
"I need to create a document about [topic]. Where should it go?"
"Update the library system in CLAUDE.md to include [new thing]"
"Show me the file organization for this project"
```

---

## 🚀 Getting Started

### For Keith (Now)

1. **Investigate Hosting** (this week)
   - Follow: `.claude/plans/hosting-investigation-guide.md`
   - Create decision log when done

2. **Make Go/No-Go Decision**
   - Review: `.claude/SUMMARY.md`
   - Decide: Build it yourself or hire someone?

3. **Start Development** (if GO)
   - Follow: `.claude/plans/2025-10-31-prototype-implementation-plan.md`
   - Create files in: `prototypes/web-app/code/`

### For Future Developers

1. **Read These First:**
   - `.claude/README.md` (5 min)
   - `.claude/CLAUDE.md` (15 min)
   - `.claude/SUMMARY.md` (10 min)

2. **Understand the Library:**
   - `.claude/LIBRARY-GUIDE.md` (this file)

3. **Review Implementation Plan:**
   - `.claude/plans/2025-10-31-prototype-implementation-plan.md`

4. **Start Coding:**
   - Put code in: `prototypes/web-app/code/`
   - Follow day-by-day plan

---

## ❓ FAQ

**Q: Where do I put a new feature design doc?**
A: `prototypes/web-app/planning/feature-name.md`

**Q: Where do I log a decision about tech stack?**
A: `.claude/memory/decisions/YYYY-MM-DD-tech-stack-decision.md`

**Q: Where does the prototype code go?**
A: `prototypes/web-app/code/` (the entire Next.js app)

**Q: When do I use production/ folder?**
A: After prototype is validated and you're building for scale

**Q: Can I change the library organization?**
A: Yes! Update `.claude/CLAUDE.md` to reflect changes

**Q: How do I see what's loaded by Claude?**
A: Run `/memory` command in Claude session

**Q: What if I create a file in the wrong place?**
A: Just move it to the correct location and update any references

**Q: Should I commit .claude/ to git?**
A: YES! Project memory should be shared with team

---

## 🎓 Understanding the Philosophy

### Prototype Zone Philosophy
```
Goal: Learn fast, validate quickly
Approach: Simple, functional, good enough
Timeframe: Days to weeks
Quality bar: Works, demonstrates concept
```

### Production Zone Philosophy
```
Goal: Scalable, maintainable, secure
Approach: Proper architecture, tested, documented
Timeframe: Weeks to months
Quality bar: Enterprise-grade, production-ready
```

### Why Separate Them?
- Different mindsets and goals
- Prevents over-engineering prototypes
- Clear migration path
- Protects production quality

---

## 🔄 Maintenance

### Weekly
- [ ] Review decision logs
- [ ] Update project status in SUMMARY.md
- [ ] Clean up old/irrelevant files

### Monthly
- [ ] Review and update CLAUDE.md
- [ ] Reorganize if needed
- [ ] Archive completed phases

### As Needed
- [ ] Add new directories to CLAUDE.md
- [ ] Update file location tables
- [ ] Document new conventions

---

## 📞 Getting Help

**Ask Claude:**
```
"Explain the library system for this project"
"Where should I put [type of file]?"
"Show me the structure of .claude/ directory"
"Update CLAUDE.md to include [new thing]"
```

**Check Documentation:**
```
.claude/README.md         - Quick reference
.claude/CLAUDE.md         - Complete instructions
.claude/SUMMARY.md        - Project overview
.claude/LIBRARY-GUIDE.md  - This guide
```

---

**Remember:** The library system is a tool to help you stay organized.
Use it as a guide, adapt as needed, and keep it updated!

🎉 **Happy organizing!**
