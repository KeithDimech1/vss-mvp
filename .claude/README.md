# VSS Platform - Project Control Center

**Welcome to the `.claude` directory!**

This directory contains all project-level Claude AI configuration, planning documents, and project memory. Everything here helps Claude understand and work on your VSS Platform project effectively.

---

## 📂 Directory Structure

```
.claude/
├── README.md                          # This file
├── CLAUDE.md                          # Main project instructions for Claude
├── plans/                             # Implementation plans
│   ├── 2025-10-31-prototype-implementation-plan.md
│   └── hosting-investigation-guide.md
├── memory/                            # Project memory and context
│   ├── meetings/                      # Meeting notes
│   └── decisions/                     # Decision logs
└── [future additions]
```

---

## 📚 Quick Reference

### Essential Documents

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **CLAUDE.md** | Main project instructions and library system | Always (Claude reads this first) |
| **LIBRARY-GUIDE.md** | Understanding the file organization system | When navigating the project |
| **SUMMARY.md** | Complete project overview and status | Getting started overview |
| **plans/prototype-implementation-plan.md** | Detailed 21-day development roadmap | Before starting development |
| **plans/hosting-investigation-guide.md** | Guide for evaluating hosting options | Before deploying |

### Parent Directory Documents

| Document | Purpose |
|----------|---------|
| `../docs/01-VSM-FRAMEWORK-GUIDE.md` | VSM methodology reference |
| `../docs/02-LITHODAT-CONTEXT.md` | Lithodat's specific context |
| `../docs/03-VSS-PRODUCT-STRATEGY-CLAIR.md` | Product strategy for clair.au |
| `../PROJECT-SUMMARY.md` | Executive summary |
| `../QUICK-START.md` | Quick reference |

---

## 🎯 What You Have Now

### ✅ Completed

1. **Project Organization System**
   - Clear directory structure for prototype and production
   - File naming conventions
   - Library system for organizing all artifacts

2. **Comprehensive Planning**
   - 21-day prototype implementation plan
   - Week-by-week breakdown with deliverables
   - Technical architecture design
   - Database schema design
   - UI/UX wireframes

3. **Hosting Strategy**
   - Investigation guide for GoDaddy
   - Alternative hosting options documented
   - DNS configuration instructions
   - Deployment scenarios for each option

4. **Development Roadmap**
   - Phase 1: Research & Planning (Days 1-3)
   - Phase 2: Development Setup (Days 4-5)
   - Phase 3: Core Features (Days 6-12)
   - Phase 4: Admin Features (Days 13-14)
   - Phase 5: Polish & Testing (Days 15-17)
   - Phase 6: Deployment (Days 18-19)
   - Phase 7: Team Launch (Days 20-21)

---

## 🚀 Next Steps (What to Do Now)

### Step 1: Review the Plans (30-60 minutes)

**Read these in order:**
1. `.claude/CLAUDE.md` - Understand the library system
2. `.claude/plans/2025-10-31-prototype-implementation-plan.md` - Review the full plan
3. `.claude/plans/hosting-investigation-guide.md` - Understand hosting options

### Step 2: Investigate Hosting (This Week)

**Follow the hosting investigation guide:**
1. Login to your GoDaddy account
2. Check what hosting capabilities you have
3. Determine if you can host Node.js
4. Make a hosting decision
5. Document your decision in `.claude/memory/decisions/`

**Create:** `.claude/memory/decisions/2025-10-31-hosting-decision.md`

### Step 3: Make Go/No-Go Decision

**Questions to answer:**
- Do you want to proceed with building the web prototype?
- Do you have 2-3 weeks to dedicate to this?
- Are you comfortable with the technical approach?
- Do you want to build it yourself or hire a developer?

### Step 4: If GO - Start Development

**Follow the implementation plan Day 1:**
- Set up development environment
- Choose hosting approach
- Initialize Next.js project
- Begin building

**Or hire help:**
- Share the implementation plan with a developer
- The plan is detailed enough for a contractor to follow
- Estimated cost: $2,000-$5,000 for prototype
- Timeline: 2-3 weeks

---

## 💡 How to Use This System

### When Working with Claude

**Always mention the context:**
```
"Let's work on the VSS platform. Reference the implementation plan
in .claude/plans/ and follow the library system in .claude/CLAUDE.md"
```

**Create decision logs:**
```
"I've decided to use Vercel for hosting. Create a decision log
at .claude/memory/decisions/2025-10-31-hosting-decision.md"
```

**Update the CLAUDE.md when things change:**
```
"Update .claude/CLAUDE.md to reflect that we're using Vercel
instead of GoDaddy"
```

### File Organization Rules

**Planning docs** → `.claude/plans/`
- Name format: `YYYY-MM-DD-plan-name.md`
- Detailed implementation plans
- Research documents
- Technical specs

**Decisions** → `.claude/memory/decisions/`
- Name format: `YYYY-MM-DD-decision-topic.md`
- Important choices and rationale
- Trade-offs considered
- Implementation implications

**Meeting notes** → `.claude/memory/meetings/`
- Name format: `YYYY-MM-DD-meeting-topic.md`
- Workshop outputs
- Team discussions
- Action items

**Prototype code** → `../prototypes/web-app/code/`
- Working prototype application
- Test code
- Sample data

**Production code** → `../production/web-app/`
- Production-ready application
- When prototype matures

---

## 🎓 Understanding the Library System

### Why This Organization?

**Problem:** Projects get messy without organization
- Files scattered everywhere
- Can't find important documents
- Hard to onboard new people
- Claude gets confused about where things are

**Solution:** Structured library system
- Everything has a place
- Clear naming conventions
- Easy to navigate
- Claude knows where to put files

### The Three Zones

**1. Planning Zone (`.claude/`)**
```
Where: .claude/plans/, .claude/memory/
What: Plans, decisions, meeting notes
Who: Keith, Claude, future team members
When: Before and during development
```

**2. Prototype Zone (`../prototypes/`)**
```
Where: prototypes/web-app/
What: MVP code, quick experiments, learning
Who: Developers building prototype
When: Weeks 1-3 of development
Goal: Get something working quickly
```

**3. Production Zone (`../production/`)**
```
Where: production/web-app/
What: Production-ready, tested, documented code
Who: Developers building final product
When: After prototype proves concept
Goal: Scalable, maintainable application
```

---

## 📊 Current Project Status

**Phase:** Planning Complete ✅
**Next Phase:** Hosting Investigation
**Timeline:** Ready to start when you are
**Blockers:** None - decision needed

**Progress:**
- [x] VSM framework research
- [x] Lithodat context analysis
- [x] Product strategy
- [x] Library organization
- [x] Implementation plan
- [x] Hosting strategy
- [ ] Hosting decision ⬅️ **YOU ARE HERE**
- [ ] Development environment setup
- [ ] Prototype development
- [ ] Team deployment

---

## 🛠️ Tools & Resources

### Development Tools (Will Need)
- Node.js and npm (install from nodejs.org)
- VS Code or your preferred code editor
- Git (for version control)
- Vercel CLI or GoDaddy FTP client

### Learning Resources
- Next.js tutorial: https://nextjs.org/learn
- Prisma quickstart: https://www.prisma.io/docs/getting-started
- Tailwind CSS docs: https://tailwindcss.com/docs
- Vercel deployment: https://vercel.com/docs

### Getting Help
- Claude (obviously!) - ask questions anytime
- Next.js Discord community
- Stack Overflow
- Vercel support (if using Vercel)

---

## ⚠️ Important Notes

### For Keith

**You Don't Need to Code Everything Yourself**
- The implementation plan is detailed enough to hire someone
- Or you can follow it step-by-step to learn
- Or work with Claude to build it together

**Start Simple**
- Don't try to build everything at once
- Get login working first
- Then one assessment form
- Then iterate

**It's OK to Change the Plan**
- This is a detailed starting point
- Adjust based on what you learn
- Update CLAUDE.md when you make changes

### For Future Developers

**Read CLAUDE.md First**
- It explains the whole system
- Follow the library organization
- Document your decisions

**Follow the Implementation Plan**
- It's your roadmap
- Each day has clear deliverables
- Ask questions if unclear

**Update Documentation as You Go**
- Keep CLAUDE.md current
- Log important decisions
- Comment your code

---

## 🎯 Success Criteria

### You'll Know It's Working When...

**Week 1:**
- [ ] Hosting decision made
- [ ] Development environment set up
- [ ] First page loads in browser

**Week 2:**
- [ ] Can create user accounts
- [ ] Login works
- [ ] One assessment form works

**Week 3:**
- [ ] All 5 systems have forms
- [ ] Admin dashboard shows data
- [ ] Deployed to clair.au/vss/

**Week 4:**
- [ ] Team is using it
- [ ] Collecting real data
- [ ] Making improvements

---

## 🔄 Maintenance

### Keep This Updated

**When to update CLAUDE.md:**
- Major architectural decisions
- Change in hosting approach
- New directories added
- Project structure changes

**When to add to memory/:**
- Important meetings
- Key decisions
- Lessons learned
- Team feedback

**When to update plans/:**
- Timeline changes
- Scope adjustments
- New phases added

---

## 📞 Questions?

**Ask Claude:**
```
"I'm looking at the .claude directory. I have a question about [X]"
```

**Common Questions:**

Q: Can I change the implementation plan?
A: Yes! It's a starting point. Adjust as needed.

Q: Do I have to use Next.js?
A: No, but it's recommended. The plan assumes Next.js.

Q: What if I don't understand something?
A: Ask Claude for clarification on any part.

Q: Can I hire someone to build this?
A: Yes! Share the implementation plan with them.

Q: How much will hosting cost?
A: Free for prototype (Vercel). ~$20/month for production.

---

## 🎉 You're Ready!

You now have:
- ✅ Complete project organization
- ✅ Detailed implementation plan
- ✅ Hosting strategy guide
- ✅ Clear next steps

**The next move is yours:**
1. Investigate hosting (this week)
2. Make go/no-go decision
3. Start building (or hire someone)
4. Launch with your team (3 weeks from start)

Good luck! 🚀

---

**Document Control**
- Created: 2025-10-31
- Owner: Keith Dimech
- Status: Active
- Last Updated: 2025-10-31
