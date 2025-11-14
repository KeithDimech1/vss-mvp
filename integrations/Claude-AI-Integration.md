# Claude AI Integration Plan

**Purpose:** Design AI enhancement layer for Phase 2 of VSM Platform
**Timeline:** Month 2-3 (after Phase 1 complete)
**Owner:** TBD (Wayne or Moritz to assign developer)
**AI Model:** Anthropic Claude (Sonnet 4 or Opus as needed)

---

## 🎯 Objectives

### What AI Will Do

**Primary Functions:**
1. **Intelligent Analysis** - Synthesize workshop outputs and identify patterns
2. **Gap Detection** - Find missing elements across 5 VSM systems
3. **Dependency Mapping** - Identify conflicts and dependencies automatically
4. **OKR Generation** - Draft objectives and key results from strategies
5. **Progress Tracking** - Monitor execution and flag risks
6. **Natural Language Interface** - Answer strategy questions conversationally

**Value Proposition:**
- **Save time:** 10+ hours/week for directors in synthesis and reporting
- **Improve quality:** Catch gaps and conflicts humans miss
- **Accelerate execution:** Faster from strategy to Jira tickets
- **Enable scale:** Can handle 25+ people's inputs

---

## 🏗️ Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    USER INTERFACES                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Notion Pages │  │  Chat Widget │  │    Signal    │         │
│  │  (embedded)  │  │   (web app)  │  │   Bot (opt)  │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                 │
│                            │                                     │
│            ┌───────────────▼────────────────┐                   │
│            │                                │                   │
│            │    CLAUDE AI API LAYER         │                   │
│            │  - Request handling            │                   │
│            │  - Context assembly            │                   │
│            │  - Response generation         │                   │
│            │  - Function calling           │                   │
│            │                                │                   │
│            └───────────────┬────────────────┘                   │
│                            │                                     │
│         ┌─────────────────┼──────────────────┐                  │
│         │                 │                   │                  │
│    ┌────▼────┐    ┌──────▼─────┐    ┌───────▼────┐            │
│    │ Notion  │    │   Vector    │    │    Jira    │            │
│    │   API   │    │  Database   │    │    API     │            │
│    │         │    │ (Pinecone)  │    │            │            │
│    └─────────┘    └─────────────┘    └────────────┘            │
│                                                                 │
│                    DATA LAYER                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ - Workshop transcripts                                   │  │
│  │ - Notion databases (Systems, Ideas, Decisions, Tasks)   │  │
│  │ - Miro board exports                                     │  │
│  │ - Meeting notes                                          │  │
│  │ - VSM framework knowledge                                │  │
│  │ - Lithodat context documents                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Implementation

### Phase 2A: Core AI System (Month 2, Weeks 1-2)

#### Step 1: Setup Foundation

**Tech Stack:**
```python
# Backend
- Python 3.11+
- FastAPI (web framework)
- Anthropic Python SDK
- Pinecone (vector database)
- LangChain (RAG orchestration)

# Frontend
- React + TypeScript
- TailwindCSS
- shadcn/ui components

# Infrastructure
- Vercel or Railway (hosting)
- Supabase (auth + database)
- GitHub Actions (CI/CD)
```

**Repository Structure:**
```
vsm-ai-assistant/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app
│   │   ├── claude.py            # Claude API wrapper
│   │   ├── rag.py               # RAG implementation
│   │   ├── notion_sync.py       # Notion integration
│   │   ├── jira_sync.py         # Jira integration
│   │   └── prompts/             # System prompts
│   │       ├── analyst.py
│   │       ├── facilitator.py
│   │       └── strategist.py
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.tsx
│   │   │   ├── Canvas.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tailwind.config.js
├── data/
│   ├── knowledge-base/          # VSM docs, Lithodat context
│   └── embeddings/              # Cached embeddings
├── scripts/
│   ├── ingest_notion.py         # Import Notion data
│   ├── ingest_meetings.py       # Import meeting transcripts
│   └── generate_embeddings.py   # Create embeddings
└── README.md
```

#### Step 2: Implement RAG (Retrieval Augmented Generation)

**Knowledge Base Content:**
```
Documents to embed:
├── VSM Framework Guide (from docs/)
├── Lithodat Context (from docs/)
├── All meeting transcripts (from ../Meetings/)
├── Workshop outputs (from Phase 1)
├── Utopia visions (all 5 leadership visions)
├── Current state findings (Systems 1-5)
└── Industry knowledge (competitors, market)
```

**RAG Implementation:**
```python
# backend/app/rag.py
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.text_splitter import RecursiveCharacterTextSplitter
import pinecone

class LithodatRAG:
    def __init__(self):
        # Initialize Pinecone
        pinecone.init(
            api_key=os.getenv("PINECONE_API_KEY"),
            environment=os.getenv("PINECONE_ENV")
        )

        self.index = pinecone.Index("lithodat-strategy")
        self.embeddings = OpenAIEmbeddings()  # Or Anthropic when available

    def ingest_documents(self, docs):
        """Split documents and create embeddings"""
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

        chunks = text_splitter.split_documents(docs)

        # Create embeddings and store in Pinecone
        Pinecone.from_documents(
            documents=chunks,
            embedding=self.embeddings,
            index_name="lithodat-strategy"
        )

    def retrieve_context(self, query, k=5):
        """Retrieve relevant context for query"""
        results = self.index.query(
            query,
            top_k=k,
            include_metadata=True
        )

        return [r['metadata']['text'] for r in results['matches']]
```

#### Step 3: Build Claude AI Wrapper

**Claude Integration:**
```python
# backend/app/claude.py
import anthropic
from typing import List, Dict

class ClaudeAssistant:
    def __init__(self):
        self.client = anthropic.Anthropic(
            api_key=os.getenv("ANTHROPIC_API_KEY")
        )
        self.model = "claude-sonnet-4-20250514"  # Or latest

    async def analyze_system(
        self,
        system_num: int,
        current_state: Dict,
        context_docs: List[str]
    ) -> Dict:
        """Analyze a VSM system and provide insights"""

        system_prompt = f"""You are an expert in Stafford Beer's Viable Systems Model,
        specializing in organizational diagnosis for technology companies.

        Context about Lithodat:
        {'\n'.join(context_docs)}

        Current assessment of System {system_num}:
        {json.dumps(current_state, indent=2)}

        Analyze this system and provide:
        1. Strengths (what's working well)
        2. Gaps (what's missing or weak)
        3. Risks (what could cause problems)
        4. Recommendations (specific actions to improve)

        Format as structured JSON."""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            system=system_prompt,
            messages=[{
                "role": "user",
                "content": "Please analyze this VSM system."
            }]
        )

        return json.loads(message.content[0].text)

    async def synthesize_visions(
        self,
        visions: List[Dict]
    ) -> Dict:
        """Synthesize multiple utopia visions into unified vision"""

        prompt = f"""You have 5 leadership visions for Lithodat's future:

        {json.dumps(visions, indent=2)}

        Synthesize these into:
        1. Common themes (where they align)
        2. Tensions (where they differ)
        3. Recommendations (how to resolve tensions)
        4. Unified vision statement (that honors all perspectives)

        Be specific and actionable."""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )

        return {"synthesis": message.content[0].text}

    async def generate_okrs(
        self,
        strategic_initiatives: List[Dict],
        timeframe: str = "Q1 2026"
    ) -> List[Dict]:
        """Generate OKRs from strategic initiatives"""

        prompt = f"""Given these strategic initiatives:

        {json.dumps(strategic_initiatives, indent=2)}

        Generate OKRs (Objectives and Key Results) for {timeframe}.

        Format:
        {{
          "objective": "Clear, ambitious, qualitative goal",
          "key_results": [
            {{"kr": "Measurable outcome", "target": "Specific number", "current": "Current value"}},
            ...
          ],
          "related_initiatives": ["ID1", "ID2"]
        }}

        Create 3-5 OKRs that cover the most important initiatives."""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )

        return json.loads(message.content[0].text)

    async def detect_dependencies(
        self,
        initiatives: List[Dict]
    ) -> List[Dict]:
        """Detect dependencies and conflicts between initiatives"""

        prompt = f"""Analyze these initiatives for dependencies and conflicts:

        {json.dumps(initiatives, indent=2)}

        Identify:
        1. Dependencies (Initiative A must finish before B can start)
        2. Resource conflicts (Both need same people/resources)
        3. Logical conflicts (Contradictory goals or approaches)
        4. Timeline risks (Sequential dependencies creating bottlenecks)

        For each, explain the issue and suggest resolution."""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )

        return {"dependencies": message.content[0].text}
```

#### Step 4: Create Chat Interface

**Simple Chat UI:**
```typescript
// frontend/src/components/Chat.tsx
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Call API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, context: messages }),
      });

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className="text-xs opacity-70">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-lg">
              <div className="animate-pulse">Thinking...</div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about strategy, systems, or visions..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Week 1-2 Deliverable:** ✅ Core AI system operational with RAG and chat interface

---

### Phase 2B: Integration Layer (Month 2, Weeks 3-4)

#### Step 5: Notion Integration

**Bidirectional Sync:**
```python
# backend/app/notion_sync.py
from notion_client import Client
import asyncio

class NotionSync:
    def __init__(self):
        self.notion = Client(auth=os.getenv("NOTION_TOKEN"))
        self.database_ids = {
            "systems": os.getenv("NOTION_SYSTEMS_DB"),
            "ideas": os.getenv("NOTION_IDEAS_DB"),
            "decisions": os.getenv("NOTION_DECISIONS_DB"),
            "tasks": os.getenv("NOTION_TASKS_DB"),
        }

    async def fetch_all_ideas(self) -> List[Dict]:
        """Fetch all ideas from Notion"""
        results = self.notion.databases.query(
            database_id=self.database_ids["ideas"]
        )

        return [self.parse_idea(page) for page in results["results"]]

    async def create_task(self, task_data: Dict) -> str:
        """Create a new task in Notion"""
        properties = {
            "Name": {"title": [{"text": {"content": task_data["title"]}}]},
            "Description": {"rich_text": [{"text": {"content": task_data["description"]}}]},
            "Owner": {"people": [{"id": task_data["owner_id"]}]},
            "Status": {"select": {"name": "To Do"}},
            "System": {"select": {"name": task_data["system"]}},
        }

        if task_data.get("due_date"):
            properties["Due Date"] = {"date": {"start": task_data["due_date"]}}

        page = self.notion.pages.create(
            parent={"database_id": self.database_ids["tasks"]},
            properties=properties
        )

        return page["id"]

    async def sync_ai_insights(self, insights: Dict):
        """Add AI analysis as comments or properties in Notion"""
        # Implementation for adding AI insights to relevant pages
        pass
```

#### Step 6: Jira Integration

**Auto-Create Epics/Stories:**
```python
# backend/app/jira_sync.py
from jira import JIRA

class JiraSync:
    def __init__(self):
        self.jira = JIRA(
            server=os.getenv("JIRA_SERVER"),
            basic_auth=(
                os.getenv("JIRA_EMAIL"),
                os.getenv("JIRA_API_TOKEN")
            )
        )

        self.projects = {
            "surfer": "SURFER",
            "build": "BUILD",
            "data": "DATA",
        }

    async def create_epic_from_initiative(
        self,
        initiative: Dict
    ) -> str:
        """Create Jira epic from strategic initiative"""

        project_key = self.projects[initiative["system"].lower()]

        epic = self.jira.create_issue(
            project=project_key,
            summary=initiative["title"],
            description=self.format_description(initiative),
            issuetype={"name": "Epic"},
            customfield_10011=initiative["title"],  # Epic Name field
            labels=self.extract_labels(initiative),
        )

        return epic.key

    async def create_stories_from_tasks(
        self,
        epic_key: str,
        tasks: List[Dict]
    ) -> List[str]:
        """Create Jira stories linked to epic"""

        story_keys = []

        for task in tasks:
            story = self.jira.create_issue(
                project=epic_key.split('-')[0],
                summary=task["title"],
                description=task["description"],
                issuetype={"name": "Story"},
                customfield_10014=epic_key,  # Epic Link field
                assignee={"name": task["owner"]},
            )

            story_keys.append(story.key)

        return story_keys

    def format_description(self, initiative: Dict) -> str:
        """Format initiative as Jira description"""
        return f"""
*Strategic Initiative from VSM Platform*

h3. Objective
{initiative['description']}

h3. Expected Outcomes
{chr(10).join(f'* {outcome}' for outcome in initiative.get('outcomes', []))}

h3. Success Metrics
{chr(10).join(f'* {metric}' for metric in initiative.get('metrics', []))}

h3. Dependencies
{chr(10).join(f'* {dep}' for dep in initiative.get('dependencies', []))}

_Generated by VSM AI Assistant on {datetime.now().strftime('%Y-%m-%d')}_
"""
```

**Week 3-4 Deliverable:** ✅ Notion and Jira integrations working

---

### Phase 2C: Advanced Features (Month 3)

#### Step 7: Automated Analysis

**Weekly Strategic Health Check:**
```python
# backend/app/automations.py
import schedule
import time

class StrategicAutomations:
    def __init__(self, claude: ClaudeAssistant, notion: NotionSync):
        self.claude = claude
        self.notion = notion

    async def weekly_health_check(self):
        """Run comprehensive health check on strategy execution"""

        # Fetch current state
        initiatives = await self.notion.fetch_all_ideas()
        tasks = await self.notion.fetch_tasks()
        decisions = await self.notion.fetch_decisions()

        # Analyze with Claude
        analysis = await self.claude.analyze_weekly_progress({
            "initiatives": initiatives,
            "tasks": tasks,
            "decisions": decisions,
        })

        # Generate report
        report = self.generate_health_report(analysis)

        # Send to directors
        await self.send_to_signal(report)
        await self.create_notion_page(report)

        return report

    async def dependency_monitor(self):
        """Check for new dependency conflicts"""

        initiatives = await self.notion.fetch_all_ideas()

        conflicts = await self.claude.detect_dependencies(initiatives)

        if conflicts:
            # Alert relevant people
            await self.send_alerts(conflicts)

    def schedule_automations(self):
        """Set up scheduled jobs"""

        # Weekly health check (Mondays 9am)
        schedule.every().monday.at("09:00").do(self.weekly_health_check)

        # Dependency check (Daily)
        schedule.every().day.at("10:00").do(self.dependency_monitor)

        # Run scheduler
        while True:
            schedule.run_pending()
            time.sleep(60)
```

#### Step 8: Intelligent Recommendations

**Proactive Suggestions:**
```python
async def generate_recommendations(self):
    """Proactively suggest improvements"""

    # Fetch context
    current_state = await self.get_full_context()

    prompt = f"""Based on Lithodat's current strategic state:

    {json.dumps(current_state, indent=2)}

    Provide 3-5 specific, actionable recommendations for:
    1. Quick wins (can be done this week)
    2. Strategic priorities (focus for next quarter)
    3. Risks to mitigate (potential problems)
    4. Opportunities to explore (might be valuable)

    For each, explain why and how to execute."""

    recommendations = await self.claude.chat(prompt)

    return recommendations
```

**Month 3 Deliverable:** ✅ Automated analysis and intelligent recommendations

---

## 📊 Example AI Capabilities

### Capability 1: Vision Synthesis

**Input:**
```
5 leadership utopia visions (Wayne, Vinko, Fabian, Moritz, Keith)
```

**AI Output:**
```
COMMON THEMES:
✓ Data is the core asset (mentioned 23 times)
✓ World-leader ambition (all 5 visions)
✓ LithoBuild is temporary (4 out of 5)
✓ Network effects matter (data → users → value)
✓ Quality + volume both essential

KEY TENSIONS:
⚠ Scale: Wayne prefers 100 people, Fabian implies 200+
⚠ Exit vs build: Wayne sees eventual sale, others focused on building
⚠ Timeline: Keith emphasizes 1-2 years, Vinko emphasizes 5+ years

SYNTHESIS RECOMMENDATION:
Plan for 100-150 person company over 5 years, with flexibility for Wayne's
exit path after establishing world-leader position. Balance short-term revenue
(LithoBuild) with platform development (Surfer/Data).

UNIFIED VISION STATEMENT:
"Lithodat will be the world's essential platform for geological and geochemical
data, where aggregating the world's geological knowledge creates insights
impossible elsewhere. We achieve this through data mass, quality excellence,
and tools that make data contribution voluntary and valuable."
```

### Capability 2: Gap Analysis

**Input:**
```
System 3 (Control) current state assessment
```

**AI Output:**
```
STRENGTHS:
✓ Financial data tracked in Xero
✓ Security compliance (Essential 8)
✓ Director-level decision making functional

GAPS IDENTIFIED:
❌ No real-time financial dashboard (directors lack visibility)
❌ Resource allocation is ad-hoc (no formal prioritization)
❌ Quality control unclear for Data and Surfer (works for Build only)
❌ No systematic audit process (System 3* weak)

RISKS:
⚠ Financial surprises likely as team scales to 25+
⚠ Resource conflicts will increase without allocation framework
⚠ Quality issues may go undetected until customer complaints

RECOMMENDATIONS:
1. URGENT: Build financial dashboard (week-level effort, high impact)
2. Q1: Implement formal prioritization framework (RICE or similar)
3. Q2: Establish QA processes for Data and Surfer teams
4. Q2: Create audit schedule and checklists
```

### Capability 3: OKR Generation

**Input:**
```
Strategic initiative: "Launch LithoSurfer Max subscription model"
```

**AI Output:**
```
OBJECTIVE: Establish LithoSurfer as revenue-generating subscription platform

KEY RESULTS:
1. Acquire 30 paying subscribers by end of Q2 2026
   Target: 30 | Current: 0 | Metric: Number of active subscriptions

2. Generate $150K annual recurring revenue by Q2 2026
   Target: $150,000 | Current: $0 | Metric: ARR

3. Achieve 80% customer satisfaction score from subscribers
   Target: 80% | Current: N/A | Metric: NPS or CSAT survey

4. Reduce churn to <5% monthly
   Target: <5% | Current: N/A | Metric: Monthly churn rate

RELATED INITIATIVES:
- Build subscription infrastructure (Dependency)
- Marketing campaign for LithoSurfer Max (Parallel)
- Customer success process (Parallel)
- Pricing strategy finalization (Dependency)

TIMELINE DEPENDENCIES:
⚠ Cannot launch until subscription infrastructure complete (estimated Q1)
💡 Suggest moving infrastructure to Q4 2025 to enable Q1 2026 launch
```

### Capability 4: Dependency Detection

**Input:**
```
100+ strategic ideas from Phase 1
```

**AI Output:**
```
DEPENDENCY CONFLICTS DETECTED:

CONFLICT 1: Timeline Risk
├── Initiative: "Launch LithoSurfer Max" (Q2 2026)
└── Depends on: "Build subscription infrastructure" (Q3 2026)
    ⚠ Dependent scheduled AFTER parent
    💡 Resolution: Move infrastructure to Q1 or delay launch to Q3

CONFLICT 2: Resource Conflict
├── Initiative: "Direct lab integrations" (Owner: Development team)
├── Initiative: "Rebuild LithoMine pipeline" (Owner: Development team)
└── Initiative: "LithoAI prototype" (Owner: Development team)
    ⚠ All three scheduled for Q1, team capacity is 2 FTE
    💡 Resolution: Prioritize one, defer others, or hire additional developer

CONFLICT 3: Strategic Conflict
├── Initiative: "Minimize LithoBuild work" (Moritz's preference)
└── Initiative: "Scale Build team for revenue" (Finance need)
    ⚠ Contradictory strategic directions
    💡 Resolution: Define sunset timeline for Build (e.g., "Scale Build until
    $2M ARR from Surfer/Data, then wind down over 6 months")

TOTAL CONFLICTS: 12 detected
HIGH PRIORITY: 3 (block execution)
MEDIUM PRIORITY: 6 (create friction)
LOW PRIORITY: 3 (minor inefficiency)
```

---

## 🔐 Security & Privacy

### Data Protection

**Sensitive Data Handling:**
```
What AI CAN access:
✓ Strategic visions and ideas
✓ Organizational structure and systems
✓ Meeting notes and workshop outputs
✓ Public competitive intelligence
✓ VSM framework knowledge

What AI CANNOT access:
✗ Customer data or private geological data
✗ Financial details beyond aggregates
✗ Employee personal information
✗ Security credentials or infrastructure details
✗ Proprietary algorithms or code
```

**Claude API Security:**
- All data sent to Claude is NOT used for training (Anthropic policy)
- Conversation history stored encrypted
- Access controlled by authentication
- Audit logs for all AI queries
- Data retention policy: 90 days then deleted

---

## 💰 Cost Estimates

### Phase 2 Monthly Costs

**AI API (Claude):**
- Assumption: 1M input tokens + 200K output tokens/month
- Input: 1M tokens × $3/1M = $3
- Output: 200K tokens × $15/1M = $3
- **Total: ~$6-10/month** (very low with current pricing)

**Vector Database (Pinecone):**
- Starter plan: $70/month (1M vectors)
- Should be sufficient for Phase 2

**Hosting (Vercel/Railway):**
- Pro plan: $20-50/month

**Development Time:**
- 2 developers × 2 months = 320 hours
- Internal resource allocation

**Total Phase 2 Cost: ~$100-150/month** + internal dev time

---

## 📈 Success Metrics

### AI Value Tracking

**Time Saved:**
- Target: Save 10+ hours/week for directors
- Measure: Time spent on synthesis and reporting (before/after)

**Quality Improvements:**
- Target: Catch 80%+ of dependency conflicts automatically
- Measure: Conflicts caught by AI vs. discovered later

**Adoption:**
- Target: 70%+ of team uses AI assistant weekly
- Measure: Active users per week

**ROI:**
- Target: 10x return on AI investment
- Measure: (Time saved × hourly rate) vs. AI costs

---

## 🎯 Rollout Plan

### Week 1-2: Internal Testing
- Directors only
- Test with real strategy data
- Iterate based on feedback

### Week 3: Pilot Expansion
- Add 5 key team members
- Monitor usage and issues
- Create user guides

### Week 4: Full Rollout
- All 14 team members
- Training session
- Support channel in Signal

### Ongoing: Optimization
- Monitor usage patterns
- Add requested features
- Improve prompts and accuracy

---

## 📚 Next Steps

1. **Assign developer** (Wayne or Moritz decision)
2. **Get API keys** (Anthropic, Pinecone, Notion, Jira)
3. **Set up repository** (GitHub)
4. **Begin implementation** (follow architecture above)
5. **Weekly check-ins** with Keith on progress

---

**Document Status:** Ready for implementation
**Prerequisites:** Phase 1 complete, developer assigned
**Owner:** TBD (Developer to be assigned)
**Last Updated:** October 30, 2025
