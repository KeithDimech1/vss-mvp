# Max Clean Case Study: Key Learnings for Lithodat VSS Implementation

**Document Type:** Implementation Guide
**Created:** October 31, 2025
**Source:** "The Viable System Model: An Introduction to Theory and Practice" - Max Clean case study
**Purpose:** Extract practical lessons from 1,200-employee VSM intervention to inform Lithodat implementation

---

## 🎯 Executive Summary

Max Clean, a $10M Mexican industrial cleaning company with 1,200 employees, successfully implemented a VSM-based self-transformation over 6 months using participatory action research. The intervention delivered impressive results:

- **Client satisfaction:** 69% → 85% (+16 points)
- **Diagnostic progress:** Red dots (problems) 86 → 29 (-66%), Green dots (improvements) 6 → 53 (+783%)
- **Environmental impact:** Chemicals use reduced 1850L → 1300L/month (-30%)
- **Social impact:** 220 employees + families received training
- **Timeline:** 6 iterations over 6 months with 15-day review cycles

**Critical Success Factor:** The very short lag in control loops (15 days, not monthly) led to rapid positive outcomes.

---

## 📋 10 Critical Learnings for Lithodat

### 1. 15-Day Review Cycles (Not Monthly!) ⚡

**Max Clean Insight:**
> "Very short lag in control loops led to rapid positive outcomes"

**What They Did:**
- Review meetings every 15 days (bi-weekly)
- Between meetings: implement action plans
- At meetings: review KPIs, update visual progress, adjust plans

**Lithodat Application:**
```
Week 1-2: Implement action plans
Day 15: Bi-weekly review meeting (2 hours)
  ├── KPI dashboard review
  ├── Visual applause update (🔴→🟢)
  ├── Obstacles discussed
  ├── Action plans adjusted
  └── Next 15 days planned
Week 3-4: Implement adjusted plans
Day 30: Next review
```

**Why It Matters for Lithodat:**
- 14 employees → 20-25 employees = need rapid adaptation
- Fast-moving tech/data industry requires agility
- Quarterly OKRs need continuous check-ins, not quarterly surprises

**Recommendation:**
- Start with bi-weekly reviews for first 6 months
- Can move to monthly after system stabilizes (if appropriate)
- Use 15-day KPI tracking, even if meetings are monthly

---

### 2. Visual Applause Technique 🔴🟢

**Max Clean Insight:**
> National level perceptions changed dramatically: Red dots 86→29, Green dots 6→53

**What They Did:**
- At each workshop, list all diagnostic findings on wall
- Participants given red dots (🔴 = still a problem) and green dots (🟢 = improved/exemplary)
- Photograph results at each session
- Track changes over 6 months

**Max Clean Results by Recursion Level:**
- **National level:** Most dramatic improvement (top management responded positively)
- **Regional level:** Moderate improvement
- **Service level:** Varied by unit

**Lithodat Application:**

**Workshop 1 (Week 1):** Baseline
```
Diagnostic Finding Examples:
├── "Unclear which System 1 owns which tasks" 🔴🔴🔴🔴🔴🔴🔴🔴 (8 red dots)
├── "No dedicated System 4 for market intelligence" 🔴🔴🔴🔴🔴🔴 (6 red)
├── "Financial visibility limited (Xero not dashboarded)" 🔴🔴🔴🔴🔴 (5 red)
├── "Strong technical culture" 🟢🟢🟢 (3 green dots)
└── "Directors collaborative" 🟢🟢 (2 green)
```

**Workshop 2 (Week 3):** Progress check
```
├── "Unclear which System 1 owns which tasks" 🔴🔴🔴🔴🟢🟢 (4 red, 2 green - improving!)
├── "No dedicated System 4 for market intelligence" 🔴🔴🔴🟢 (3 red, 1 green - started)
├── "Financial visibility limited" 🔴🔴🟢🟢🟢 (2 red, 3 green - dashboard built!)
```

**Why It Matters for Lithodat:**
- Visual, democratic way to track progress
- Everyone sees what's improving
- Builds momentum and team buy-in
- Simple to implement (sticky dots on whiteboard or digital equivalent)

**Recommendation:**
- Use in bi-weekly workshops with all 14-20 employees
- Photograph/screenshot each session
- Include in monthly all-hands presentations
- Build into VSS platform as digital feature

---

### 3. Identity Agreement FIRST 🎯

**Max Clean Insight:**
> First workshop focused solely on agreeing organizational identity statement

**Max Clean Identity Statement:**
> "Max Clean is a company that provides services in the facility services' industry using cutting edge technology that aims to reach the industrial and residential sector hoping to optimize the client's operation, working under international quality standards, offering excellence in its work, respecting the environment and creating value for the community"

**What This Achieved:**
- Shared language for transformation
- Foundation for all subsequent decisions
- Alignment before diving into Systems 1-5

**Lithodat Application:**

**Current State:**
- Multiple utopia visions from directors (Wayne, Vinko, Fabian, Moritz, Keith)
- Core agreement: "Data is the core asset," "World leader ambition," "LithoBuild is temporary"
- Need: Single agreed identity statement

**Proposed Lithodat Identity Workshop (2-4 hours, Week 1):**

**Facilitation Questions:**
1. What do we do that creates value?
2. Who do we serve?
3. What makes us unique?
4. What do we stand for (values)?
5. What are our boundaries (what we don't do)?
6. What future are we building toward?

**Draft Lithodat Identity Statement (for workshop refinement):**
> "Lithodat is a geoscience data technology company that aggregates, curates, and delivers geological and geochemical data at scale through AI-powered platforms. We serve exploration and mining companies globally, enabling better decision-making through data intelligence. We are building the world's leading repository of geological knowledge, combining public and private data with cutting-edge technology, while maintaining quality standards and creating value for customers, employees, and the scientific community."

**Why It Matters for Lithodat:**
- Five directors need unified vision
- Team needs clarity on "where are we going?"
- Foundation for System 5 (Policy & Identity)
- Answers Keith's question: "No one in our team including us clearly knows exactly where we want to go"

**Recommendation:**
- Workshop 1 (Week 1): Identity agreement with all directors + key team members
- Output: Single agreed statement (not 5 separate visions)
- Share with all 14 employees immediately
- Revisit quarterly as company evolves

---

### 4. Multi-Level Micro-Management Pathology 🚨

**Max Clean Insight:**
> "Same managers operating at all 3 levels of recursion creating bottlenecks due to lack of time to effectively attend to them all"

**Max Clean Problem:**
```
National Level (Company strategy)
   ├── Same managers
Regional Level (Branch operations)  ←┤
   ├── Same managers                 ├─ Bottleneck!
Service Level (Client projects)   ←─┘
```

**Max Clean Solution:**
- Appointed clear leaders at each recursion level
- Gave operational units more autonomy
- Minimized micro-management
- Created legitimacy and power at each level

**Lithodat Context:**

**Current Situation (from 02-LITHODAT-CONTEXT.md):**
- 3 directors historically did everything
- Now 14 employees, scaling to 20-25+
- "Current model worked for 3 directors, doesn't scale to 14-25 people" (System 3 challenge)
- Juan emerging into management role
- Staff unsure who to ask for what (e.g., Kimberly asking Wayne instead of Juan)

**Likely Lithodat Pathology:**
```
Level 0: Lithodat (Company strategy)
   ├── Wayne, Vinko, Fabian involved
Level 1: Surfer/Build/Data (System operations)  ←┤
   ├── Wayne, Vinko, Fabian still involved      ├─ Potential
Level 2: Within systems (Team decisions)      ←─┘  bottleneck?
```

**Diagnostic Questions for Lithodat:**
1. Are directors operating at all 3 recursion levels?
2. Do Surfer/Build/Data have clear leaders with autonomy?
3. Do team leads make operational decisions without director approval?
4. How quickly can operational decisions get made?

**Recommended Structure:**
```
Level 0: Lithodat (Company)
├── System 5: Directors (vision, policy, identity)
├── System 4: Strategic committee (intelligence, innovation)
└── System 3: Operations leadership (resource allocation)

Level 1: Operational Units
├── LithoSurfer
│   ├── Lead: [Name] (full System 5/4/3 authority for Surfer)
│   ├── Team: Frontend, backend, product
│   └── Autonomy: Subscription model, feature roadmap, customer support
├── LithoBuild
│   ├── Lead: Juan (emerging role)
│   ├── Team: Project teams, client relationships
│   └── Autonomy: Project delivery, client relationships, quality
└── LithoData
    ├── Lead: [Name] (needs appointment)
    ├── Team: Fun (QC), data curators
    └── Autonomy: Data curation, quality standards, workflows
```

**Key Actions:**
1. ✅ Appoint clear leaders for Surfer, Build, Data (if not already)
2. ✅ Define their decision-making authority (what can they decide without directors?)
3. ✅ Create escalation protocol (when to involve directors vs. decide independently)
4. ✅ Train directors to "let go" (hardest part per Max Clean)

**Max Clean Learning:**
> "Hard for management to give up power and control over operations in order to give people at lower recursions the autonomy required. But this autonomy was critical to success."

---

### 5. Self-Transformation Methodology (STM) - 7 Stages 📊

**Max Clean Used Proven 7-Stage Process:**

```
1. Specify System-in-Focus
   ├── Agree on identity and purpose
   └── Timeline: Week 1 workshop

2. Identify Recursive Levels
   ├── Map organizational structure
   ├── Define System 1 units at each level
   └── Timeline: Week 1-2 workshops

3. Clarify Strategic Direction
   ├── Economic goals (revenue, growth)
   ├── Social goals (employee well-being)
   ├── Environmental goals (sustainability)
   └── Timeline: Week 2 workshop

4. Design KPI Measurement System
   ├── 5-7 Key Performance Indicators
   ├── 15-day review frequency
   └── Timeline: Week 2-3

5. VSM Diagnosis
   ├── Semi-structured interviews (10-20 people)
   ├── Workshops with VSM meta-questions
   ├── Visual applause baseline
   └── Timeline: Week 3-4

6. Align Strategy/Structure/Capabilities
   ├── Action plans with owners
   ├── Structural adjustments
   ├── Required capabilities defined
   └── Timeline: Week 4-5

7. Learn from Progress
   ├── 15-day review cycles
   ├── KPI updates
   ├── Visual applause updates
   ├── Iterate 6× over 6 months
   └── Timeline: Ongoing (Week 5-28)
```

**Lithodat Implementation Timeline:**

**Weeks 1-4: Diagnostic & Design (following STM stages 1-6)**
- Week 1: Identity agreement + Recursive mapping
- Week 2: Strategic direction + KPI design
- Week 3: Semi-structured interviews + Workshops
- Week 4: Action plans + Structure alignment

**Weeks 5-28: Implementation & Learning (STM stage 7)**
- 12 × bi-weekly reviews (15-day cycles)
- 6 months of continuous iteration
- Quarterly milestones embedded within

**Why STM Matters for Lithodat:**
- Proven methodology (not inventing from scratch)
- Participatory (builds buy-in)
- Iterative (learns and adapts)
- Measurable (KPIs + visual applause)

---

### 6. Participatory Structure 👥

**Max Clean Structure:**
- **Project Team:** Led the intervention
- **Diagnostic Committee (DC):** Mix of top management and HR personnel
- **Workshops:** Employees from different organizational levels and roles
- **Semi-structured interviews:** 10-20 employees

**Why Participatory:**
- Employees propose and agree on action plans (ownership)
- Multiple perspectives surface issues
- Democratic legitimacy
- Faster implementation (people support what they help create)

**Lithodat Application:**

**Diagnostic Committee (DC):**
- Wayne, Vinko, Fabian (directors)
- Keith (leading implementation)
- Juan (emerging management)
- Fun (data QC role)
- 1-2 developers (representing technical team)
- **Total:** 7-9 people

**Workshop Participants:**
- All 14 employees invited to key workshops
- Some workshops: full group (identity, recursive mapping)
- Other workshops: by system (Surfer team, Build team, Data team)

**Interview Sample:**
- 10-20 employees (aim for all 14 initially)
- 30-60 min semi-structured interviews
- Mix of roles: developers, project managers, data curators, directors
- Questions: VSM meta-questions for Systems 1-5

**Timeline:**
- Week 1: DC kickoff (2 hours)
- Week 1: Identity workshop (all staff, 2-4 hours)
- Week 2: Recursive mapping workshop (all staff, 2-4 hours)
- Week 2-3: Semi-structured interviews (10-20 people × 30-60 min)
- Week 3: VSM diagnostic workshop (all staff, 4 hours)
- Week 4: Strategy alignment workshop (DC + key leads, 2-4 hours)
- Bi-weekly reviews: DC + relevant team members (2 hours)

**Why It Matters for Lithodat:**
- Team of 14 → 20-25: need everyone aligned
- "No d***heads policy" culture: participatory fits values
- "Make myself obsolete" (Wayne): requires empowered teams
- Democratic prioritization: already desired per 02-LITHODAT-CONTEXT.md

---

### 7. KPI Results Were Impressive 📈

**Max Clean's 7 Key Performance Indicators (6-month results):**

| KPI | Baseline | 6 Months | Improvement |
|-----|----------|----------|-------------|
| Client Satisfaction | 69% | 85% | +16 points (+23%) |
| Recruitment | 66 | 89 | +23 (+35%) |
| Payroll Compliance | 64 | 78 | +14 (+22%) |
| Chemical Use (env.) | 1850L/mo | 1300L/mo | -550L (-30%) |
| Training (social) | 0 | 220 employees + families | New program |
| Visual Applause (red) | 86 | 29 | -57 (-66%) |
| Visual Applause (green) | 6 | 53 | +47 (+783%) |

**Key Insight:** All 7 KPIs improved, showing holistic organizational health

**Lithodat's Proposed 7 KPIs:**

| KPI | Baseline (Oct 2025) | Target (3mo) | Target (6mo) | Measurement |
|-----|---------------------|--------------|--------------|-------------|
| **1. Employee Clarity on Vision** | TBD (survey) | 80%+ | 90%+ | "Do you know company vision and your role?" (1-10 scale) |
| **2. Client/Customer Satisfaction** | TBD | Maintain or improve | +10 points | NPS or CSAT survey |
| **3. Revenue Growth** | $1.3M annual | +10% QoQ | +25% H1 | Xero financial data |
| **4. OKR Completion Rate** | N/A (not tracking) | 60% | 70% | % Key Results achieved per quarter |
| **5. Time Strategy→Execution** | TBD (estimate 30-60d) | <20 days | <15 days | Days from decision to Jira ticket |
| **6. Visual Applause (red dots)** | TBD (Week 1) | -40% | -60% | Workshop tracking |
| **7. Operational Autonomy** | TBD (survey) | +20 points | +40 points | "Do you have authority to make decisions?" (1-100) |

**Additional Considerations for Lithodat:**
- **System-specific metrics:**
  - LithoSurfer: Subscribers, churn rate, feature adoption
  - LithoBuild: Project margins, client satisfaction, delivery on time
  - LithoData: Data volume, quality scores, curation speed
- **Leading indicators:**
  - Number of strategic initiatives identified
  - Action plan completion rates
  - Team capacity utilization

**Why 15-Day Tracking Matters:**
- Max Clean reviewed KPIs every 15 days (not monthly)
- Enabled rapid course correction
- Created urgency and focus
- Visible progress built momentum

**Recommendation:**
- Select 7 KPIs by end of Week 2
- Establish baselines in Week 3 (surveys, data collection)
- Track every 15 days for 6 months
- Review at bi-weekly meetings
- Update dashboard (visual display for all staff)

---

### 8. Common Pathologies Identified 🔍

**Max Clean Identified These Issues (also common in other VSM interventions):**

#### Pathology 1: Managers at Multiple Recursion Levels
- **Symptom:** Same people making decisions at company, regional, and service levels
- **Impact:** Bottlenecks, slow decisions, operational teams wait for approval
- **Solution:** Appoint leaders at each level with clear autonomy

#### Pathology 2: Missing System 4 (Intelligence)
- **Symptom:** Reactive to market changes, surprised by competitors
- **Impact:** Short-term focus, unprepared for future
- **Solution:** Create strategic/executive committee, systematic environmental scanning

#### Pathology 3: Weak System 3* (Audit)
- **Symptom:** Management surprised by operational realities
- **Impact:** "Didn't know we were losing money on that project"
- **Solution:** Sporadic audits, quality checks, "management by walking around"

#### Pathology 4: System 1 Conflicts (Coordination Issues)
- **Symptom:** Teams compete for resources, duplicate efforts, conflicts
- **Impact:** Inefficiency, internal friction
- **Solution:** Strengthen System 2 coordination (schedules, communication protocols, shared resources)

#### Pathology 5: Unclear Identity (System 5)
- **Symptom:** Different leaders have different visions, team confused about direction
- **Impact:** Strategic drift, conflicting priorities
- **Solution:** Identity agreement workshop, vision articulation

**Lithodat Diagnostic (from 02-LITHODAT-CONTEXT.md confirms these):**

| Pathology | Evidence in Lithodat? | Severity | Action Needed |
|-----------|----------------------|----------|---------------|
| **Multi-level micro-management** | "Current model worked for 3 directors, doesn't scale" | 🔴 High | Appoint system leaders |
| **Missing System 4** | "No dedicated market research or customer relationship function" | 🔴 High | Create strategic committee |
| **Weak System 3*** | "Limited real-time financial visibility" | 🟡 Medium | Xero dashboards, audits |
| **System 1 conflicts** | "Staff unsure who to ask for what" | 🟡 Medium | Communication protocols |
| **Unclear identity** | "No one in our team including us clearly knows exactly where we want to go" - Keith | 🔴 High | Identity workshop Week 1 |

**Recommendation:**
- Use Week 3-4 VSM diagnosis to confirm these pathologies
- Don't be surprised if Max Clean patterns apply to Lithodat
- Focus action plans on highest severity issues first

---

### 9. Autonomy Was Critical (But Hard) 🔓

**Max Clean Learning:**
> "Most significant improvement was at the national level, as the top management responded positively to the suggestions made and were able to immediately implement changes. This was despite the fact that it was hard for them to give up power and control over operations in order to give people at lower recursions the autonomy required."

**Why Autonomy Matters:**
- Operational units need requisite variety to manage their niche
- Faster decisions (don't wait for approval)
- Better decisions (people closest to work know best)
- Team empowerment and motivation

**Why It's Hard:**
- Management fears loss of control
- "What if they make wrong decisions?"
- Historical pattern of founders doing everything
- Trust must be built

**Max Clean Results from Giving Autonomy:**
- Regional level: improved System 3 managerial capacity, performance indicators, autonomy
- Service level: leaders appointed, employees empowered, performance tracking
- All operational units at all levels given more autonomy
- Micro-management minimized
- Results: significant improvements across all KPIs

**Lithodat Context:**

**Wayne's Vision:**
> "Make myself obsolete" - autonomous teams

**Current Challenge:**
- 3 directors historically did everything
- Now need to delegate to 14-25 employees
- Juan emerging into management role (but how much autonomy?)
- Team needs to know: "What can I decide? What needs approval?"

**Autonomy Framework for Lithodat:**

**Level 0 (Company): Directors**
- Strategic direction (5-year vision)
- Company-level OKRs
- Capital allocation (major investments)
- Key hires (director-level and above)
- Legal/compliance (major decisions)
- Utopia vision and identity

**Level 1 (Systems): Surfer/Build/Data Leads**
- System-specific strategy (how to achieve company OKRs)
- Quarterly OKRs for their system
- Resource allocation within budget
- Hiring within their system
- Customer relationships and decisions
- Feature roadmaps and priorities
- Operational processes
- **Escalation to directors:** Major strategic shifts, budget overruns, conflicts between systems

**Level 2 (Teams): Team Leads**
- Day-to-day task prioritization
- Technical decisions
- Work allocation within team
- Quality standards
- Process improvements
- **Escalation to system leads:** Resource conflicts, quality issues, timeline risks

**Implementation:**
1. **Week 1:** Draft autonomy framework with DC
2. **Week 2:** Review with all staff, get feedback
3. **Week 3:** Finalize and communicate widely
4. **Week 4:** Start operating under new framework
5. **Bi-weekly reviews:** Check "Did anyone feel unclear on decision authority?" Adjust as needed.

**Expected Friction Points:**
- Directors struggle to "let go" (normal per Max Clean)
- Team unsure if they "really" have authority (test with small decisions first)
- Overlap areas (who decides when two systems involved?)
- Cultural shift takes time (multiple 15-day cycles to embed)

**Max Clean Lesson:**
> Autonomy was critical to success. Despite initial difficulty, top management's willingness to give up power was key factor in achieving results.

**Recommendation:**
- Start Week 1 with explicit autonomy discussion
- Use Max Clean story to normalize directors' discomfort
- Create safe-to-fail experiments (small decisions first, build trust)
- Review and adjust at bi-weekly meetings
- Celebrate when autonomy leads to good outcomes

---

### 10. Multiple Iterations Required 🔄

**Max Clean Timeline:**
- **6 iterations over 6 months**
- Not a one-time diagnostic
- Continuous refinement
- Action plans implemented between workshops
- Each iteration built on previous learnings

**Iteration Pattern:**
```
Iteration 1 (Month 1):
├── Diagnostic and baseline
├── Initial action plans
└── Excitement and commitment

Iteration 2 (Month 2):
├── First progress check
├── Some plans working, some not
├── Adjustments made
└── Reality sets in

Iteration 3 (Month 3):
├── Visible improvements emerging
├── Momentum building
├── Some resistance fading
└── Green dots appearing

Iteration 4 (Month 4):
├── Systems starting to stabilize
├── New issues surfacing (deeper level)
├── Refinement of action plans
└── Confidence growing

Iteration 5 (Month 5):
├── Significant progress visible
├── Team requesting more autonomy
├── Management more comfortable delegating
└── New capabilities emerging

Iteration 6 (Month 6):
├── Results clearly visible
├── New patterns embedded
├── Continuous improvement culture forming
└── Ready for next phase
```

**Key Insight:**
- Month 1 sets direction
- Months 2-3 implement and learn
- Months 4-6 refine and embed
- After 6 months: reassess if monthly (vs. bi-weekly) reviews appropriate

**Lithodat Application:**

**Proposed 6-Month Roadmap:**

**Month 1 (Weeks 1-4): Foundation**
- Week 1: Identity agreement, recursive mapping
- Week 2: Strategic direction, KPI design, autonomy framework
- Week 3: Interviews, VSM diagnosis workshops
- Week 4: Action plans, structure alignment
- **Deliverables:** Diagnostic report, agreed identity, action plans with owners

**Month 2 (Weeks 5-8): Initial Implementation**
- Bi-weekly reviews: Day 15, Day 30
- Focus: Quick wins, establish new patterns
- Expected: Some action plans succeed, some struggle
- Adjustments: Based on what's working

**Month 3 (Weeks 9-12): Momentum Building**
- Bi-weekly reviews: Day 45, Day 60
- Focus: Scaling what works, addressing obstacles
- Expected: Green dots increasing, resistance fading
- Milestone: End Q1 OKRs, set Q2 OKRs

**Month 4 (Weeks 13-16): Stabilization**
- Bi-weekly reviews: Day 75, Day 90
- Focus: Deeper issues surface, capabilities develop
- Expected: Management more comfortable with autonomy
- Adjustments: Refine processes based on learnings

**Month 5 (Weeks 17-20): Embedding**
- Bi-weekly reviews: Day 105, Day 120
- Focus: New patterns becoming habit
- Expected: Significant visible progress
- Cultural shift: Team requesting more autonomy (positive sign)

**Month 6 (Weeks 21-24): Maturation**
- Bi-weekly reviews: Day 135, Day 150
- Focus: Results clearly visible, continuous improvement culture
- Expected: Ready to assess if monthly reviews appropriate
- Milestone: Mid-year review, set Q3 OKRs

**Why Multiple Iterations Matter:**
- Organizational change is not linear
- People need time to adapt
- Systems need time to stabilize
- Trust must be built gradually
- Some issues only become apparent after initial changes

**Lithodat Considerations:**
- 14 → 20-25 employees over this period (complexity increasing)
- Multiple systems (Surfer/Build/Data) at different maturity levels
- Directors used to controlling everything (will take time to delegate)
- Team used to going to directors (will take time to exercise autonomy)

**Recommendation:**
- Commit to 6 months, 12 × bi-weekly reviews
- Don't skip reviews (even if "nothing to report")
- Track progress at each iteration (visual applause, KPIs)
- Photograph/document each workshop (show progress over time)
- Month 6: reassess review frequency based on data

---

## 🚀 Immediate Next Steps for Lithodat

### This Week:
1. **Decision:** Leadership review this document and decide to proceed
2. **Setup:** Form Diagnostic Committee (DC) - Wayne, Vinko, Fabian, Keith, Juan, Fun, +1-2 others
3. **Schedule:** Block time for Week 1-4 workshops in calendars
4. **Communication:** Share with all 14 employees that VSM implementation starting

### Week 1: Foundation
**Day 1-2:**
- DC kickoff meeting (2 hours)
- Review Max Clean learnings
- Confirm 6-month commitment and bi-weekly review schedule

**Day 3:**
- Identity Agreement Workshop (all 14 employees, 2-4 hours)
- Facilitated by Keith
- Goal: Agree on single identity statement

**Day 4-5:**
- Recursive Mapping Workshop (all 14 employees, 2-4 hours)
- Map: Level 0 (Lithodat), Level 1 (Surfer/Build/Data), Level 2 (sub-systems)
- Identify: Who is operating at which level currently?
- Diagnose: Are directors at all levels? (Max Clean pathology)

### Week 2: Strategic Design
**Day 8:**
- Strategic Direction Workshop (DC + key leads, 2-4 hours)
- Economic, social, environmental goals
- Connect to individual director utopias

**Day 9-10:**
- KPI Design Workshop (DC, 2 hours)
- Select 7 KPIs (economic, social, operational)
- Design data collection processes
- Schedule baseline measurements for Week 3

**Day 11-12:**
- Autonomy Framework Workshop (DC + key leads, 2 hours)
- Define decision authority at each level
- Create escalation protocols
- Draft communication for all staff

### Week 3: Diagnosis
**Day 15:**
- **First Bi-weekly Review** (DC, 2 hours)
- Review: Progress on Weeks 1-2 actions
- KPIs: Establish baselines (surveys, data collection)
- Visual Applause: Baseline (all diagnostic findings documented)

**Day 16-19:**
- Semi-structured interviews (10-20 employees × 30-60 min each)
- Use VSM meta-questions for Systems 1-5
- Keith + 1-2 DC members conduct

**Day 21:**
- VSM Diagnostic Workshop (all 14 employees, 4 hours)
- Present interview findings
- Visual applause baseline (red/green dots)
- Identify: Common pathologies, structural issues

### Week 4: Action Planning
**Day 29:**
- **Second Bi-weekly Review** (DC, 2 hours)
- Review: Interview findings, visual applause baseline
- KPIs: Initial measurements recorded
- Obstacles: What's blocking progress?

**Day 30:**
- Strategy Alignment Workshop (DC + system leads, 2-4 hours)
- Design: Structural adjustments needed
- Create: Action plans with owners, timelines, success criteria
- Prioritize: Using RICE scoring or impact/effort matrix

**Day 31-35:**
- Action Plan Finalization
- Share with all staff
- Get buy-in and commitment
- Begin implementation

### Weeks 5-24: Implementation & Iteration
- Bi-weekly reviews every 15 days (12 total)
- Action plan implementation between reviews
- KPI tracking and reporting
- Visual applause updates
- 6 major iterations over 6 months

---

## 📚 Additional Resources to Review

### From Max Clean Case Study:
1. **Self-Transformation Methodology (STM)** - 7 stages (now in 01-VSM-FRAMEWORK-GUIDE.md)
2. **Visual applause technique** - Red/green dot tracking
3. **15-day review cycles** - Critical success factor
4. **Participatory structure** - DC + workshops + interviews
5. **Common pathologies** - Multi-level micro-management, missing System 4, etc.

### Tools Needed:
- [ ] Workshop facilitation guide (identity agreement, recursive mapping, etc.)
- [ ] Semi-structured interview questions (VSM meta-questions by system)
- [ ] Visual applause template (digital or physical)
- [ ] KPI dashboard (spreadsheet or platform)
- [ ] Action plan template (owner, timeline, success criteria, status)
- [ ] 15-day review meeting agenda template

### Platform Features to Build (Priority Order):
1. **MVP (Weeks 1-4):** Visual applause dashboard (🔴🟢 tracking)
2. **V1.0 (Weeks 5-8):** 15-day KPI dashboard with trend graphs
3. **V1.0 (Weeks 9-12):** Identity agreement tool (collaborative editing)
4. **V1.0 (Weeks 9-12):** Recursive mapping canvas (interactive)
5. **V2.0 (Months 4-6):** Common pathology detection (AI-powered alerts)

---

## ✅ Success Criteria for Lithodat (6 Months)

### Based on Max Clean Benchmarks:

| Metric | Max Clean Result | Lithodat Target |
|--------|------------------|-----------------|
| **Client Satisfaction** | 69% → 85% (+23%) | Maintain or +10 points |
| **Employee Clarity** | Improved perceptions across all diagnostic points | 90%+ know vision and role |
| **Visual Applause (red)** | 86 → 29 (-66%) | -60% reduction in problems |
| **Visual Applause (green)** | 6 → 53 (+783%) | 8× increase in improvements |
| **Timeline** | 6 iterations, 6 months | Same: 12 bi-weekly reviews |
| **Autonomy** | Operational units given autonomy, micro-management minimized | Clear autonomy at all levels |
| **System 4 Creation** | Strategic committee implemented | Strategic committee functioning |
| **KPI Improvements** | All 7 KPIs improved | 5-7 KPIs showing positive trends |

### Lithodat-Specific Success:
- [ ] **Identity:** Single agreed statement, all 14-20 employees can recite
- [ ] **Structure:** Clear leaders for Surfer/Build/Data with defined autonomy
- [ ] **System 4:** Strategic committee meeting regularly, scanning environment
- [ ] **Coordination:** Communication protocols working, staff know who to ask
- [ ] **Financials:** Real-time visibility via Xero dashboards
- [ ] **OKRs:** Q1 and Q2 OKRs set, tracked, and 60-70% completion
- [ ] **Culture:** Team requesting more autonomy (positive sign per Max Clean)
- [ ] **Scale:** 20-25 employees onboarded with clarity on vision and systems

---

## 🎯 Final Recommendation

**Adopt Max Clean methodology wholesale for Lithodat:**

✅ **7-stage STM process** (Weeks 1-4 diagnostic, Weeks 5-24 iteration)
✅ **15-day review cycles** (bi-weekly, not monthly - critical success factor)
✅ **Visual applause technique** (🔴/🟢 progress tracking at each workshop)
✅ **Participatory structure** (DC + workshops + interviews with all 14 employees)
✅ **Identity first** (Week 1 workshop to agree on unified statement)
✅ **Autonomy focus** (give up power/control, empower operational units)
✅ **6-month commitment** (12 iterations, continuous learning)
✅ **7 KPIs tracked** (economic, social, operational - 15-day measurement)

**Why this will work for Lithodat:**
- Proven with 1,200-employee company ($10M revenue, similar to Lithodat's $1.3M and growth trajectory)
- Addresses Lithodat's identified challenges (unclear identity, micro-management, missing System 4, coordination issues)
- Participatory approach fits "no d***heads policy" and "make myself obsolete" culture
- 15-day cycles match fast-paced tech/data industry needs
- Visual progress builds momentum and team buy-in
- Multiple iterations allow for learning and adaptation as Lithodat scales 14→25 employees

**This is not theory - this is proven practice. Let's implement it.**

---

**Document Status:** COMPLETE - Ready for leadership review and decision
**Next Actions:** DC kickoff meeting, Week 1 workshop scheduling
**Owner:** Keith Dimech
**Last Updated:** October 31, 2025
