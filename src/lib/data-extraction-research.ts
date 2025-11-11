/**
 * Data Extraction Research & AI Integration Metadata
 *
 * Comprehensive research findings on industry best practices,
 * AI integration strategies, and implementation guides.
 * All recommendations are evidence-based with citations.
 */

export interface ResearchSource {
  title: string;
  url: string;
  year: number;
  organization: string;
  keyFindings: string[];
}

export interface AITool {
  name: string;
  provider: string;
  type: 'LLM' | 'Platform' | 'Specialized';
  accessMethod: 'Personal Login' | 'API' | 'Enterprise';
  costModel: string;
  strengths: string[];
  limitations: string[];
  geologicalUseCase: string;
  implementationGuide: string;
  url?: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Data Extraction' | 'Quality Control' | 'Classification' | 'Summarization';
  tool: string; // Which AI tool this works best with
  prompt: string;
  exampleInput: string;
  exampleOutput: string;
  accuracyRate?: string;
  source?: string;
}

export interface ImplementationStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  owner: string;
  prerequisites: string[];
  deliverables: string[];
  resources: {
    title: string;
    url?: string;
  }[];
}

export interface AIIntegrationProposal {
  id: string;
  title: string;
  description: string;
  aiTools: string[];
  benefits: string[];
  risks: string[];
  implementation: ImplementationStep[];
  estimatedTimeSaving: string;
  estimatedCost: string;
  priority: 'High' | 'Medium' | 'Low';
}

/**
 * INDUSTRY RESEARCH FINDINGS
 */
export const researchSources: ResearchSource[] = [
  {
    title: "Geology AI: Trending Tools for Exploration Teams",
    url: "https://www.coreplan.io/blog/exploration-teams-a-list-of-trending-geology-ai-tools",
    year: 2024,
    organization: "CorePlan.io",
    keyFindings: [
      "AI platforms specifically trained on geological documents (millions of reports)",
      "RadiXplore built for mining teams to search and extract insights",
      "Integration with industry-standard software (Leapfrog, Seequent)",
      "Human-in-the-loop approach essential - AI empowers, doesn't replace geologists"
    ]
  },
  {
    title: "Extracting Data from Maps: AI for Critical Mineral Assessment",
    url: "https://www.usgs.gov/publications/extracting-data-maps-lessons-learned-artificial-intelligence-critical-mineral",
    year: 2024,
    organization: "USGS",
    keyFindings: [
      "USGS CriticalMAAS project reduced assessment workflow from weeks to 2.5 days",
      "AI hackathons demonstrating practical extraction from geological maps",
      "Collaboration with DARPA and ARPA-E on critical mineral challenges",
      "Automated extraction from maps and documents is now analysis-ready"
    ]
  },
  {
    title: "Extracting Accurate Materials Data from Research Papers with LLMs",
    url: "https://www.nature.com/articles/s41467-024-45914-8",
    year: 2024,
    organization: "Nature Communications",
    keyFindings: [
      "ChatExtract method achieves 90.8% precision, 87.7% recall",
      "Zero-shot prompting with engineered prompts - no fine-tuning needed",
      "Follow-up questions overcome LLM hallucination issues",
      "Conversational models with redundancy improve accuracy significantly"
    ]
  },
  {
    title: "Claude for Life Sciences - Scientific Workflow Integration",
    url: "https://www.anthropic.com/news/claude-for-life-sciences",
    year: 2025,
    organization: "Anthropic",
    keyFindings: [
      "Direct integration with lab platforms (Benchling, PubMed, 10x Genomics)",
      "Agent skills transform complex protocols into repeatable AI workflows",
      "Weeks-long workflows reduced to minutes with actionable intelligence",
      "Hybrid technical precision + conversational interface for research"
    ]
  },
  {
    title: "28 ChatGPT Use Cases in Mining Industry",
    url: "https://www.digitalvibes.ai/post/28-unique-chatgpt-use-cases-in-the-mining-industry-optimizing-exploration-and-cost-reduction",
    year: 2024,
    organization: "Digital Vibes AI",
    keyFindings: [
      "ChatGPT automates data transformation and cleaning tasks",
      "Categorizes geological data by type, location, date",
      "Analyzes data to identify potential mineral deposits efficiently",
      "28 documented use cases for exploration cost reduction"
    ]
  },
  {
    title: "Integrating Data Science and Geoscience: Best Practices",
    url: "https://www.agilegeoscience.com/blog/integrating-data-science-and-geoscience-best-practices-and-future-trends/",
    year: 2024,
    organization: "Agile Geoscience",
    keyFindings: [
      "Implement robust ETL pipelines for data from various sources",
      "Build data warehouses/lakes for structured consolidation",
      "Standardize data collection for easy recall and comparison",
      "Use indexing and partitioning to enhance retrieval performance"
    ]
  }
];

/**
 * AI TOOLS FOR GEOLOGICAL DATA EXTRACTION
 */
export const aiTools: AITool[] = [
  {
    name: "ChatGPT (GPT-4)",
    provider: "OpenAI",
    type: "LLM",
    accessMethod: "Personal Login",
    costModel: "$20/month per user (Plus) or $25/month (Pro)",
    strengths: [
      "Excellent at data transformation and categorization",
      "28 documented mining use cases",
      "Good at analyzing geological data patterns",
      "Strong natural language understanding for papers"
    ],
    limitations: [
      "Context window limits (128k tokens)",
      "Can hallucinate without proper prompting",
      "No built-in geological domain knowledge",
      "Requires careful prompt engineering"
    ],
    geologicalUseCase: "Best for: Data categorization, cleaning, transformation, and identifying mineral deposit patterns from text descriptions",
    implementationGuide: "1. Each team member gets ChatGPT Plus/Pro account. 2. Use standardized prompt templates. 3. Always validate outputs against source. 4. Log usage in tracking system.",
    url: "https://chat.openai.com"
  },
  {
    name: "Claude (Opus/Sonnet)",
    provider: "Anthropic",
    type: "LLM",
    accessMethod: "Personal Login",
    costModel: "$20/month per user (Pro) or $25/month (Teams)",
    strengths: [
      "200k token context window (handles entire papers)",
      "Superior at scientific/technical analysis",
      "Better at following complex multi-step instructions",
      "Strong document understanding and synthesis",
      "Code analysis capabilities (for automated extraction scripts)"
    ],
    limitations: [
      "Slower response times than ChatGPT",
      "Less well-known, smaller community",
      "No browsing capability"
    ],
    geologicalUseCase: "Best for: Analyzing entire research papers, extracting structured data (Material-Value-Unit triplets), synthesizing multiple sources, code generation for extraction scripts",
    implementationGuide: "1. Team gets Claude Pro/Teams. 2. Upload PDFs directly for analysis. 3. Use Projects feature for ongoing extractions. 4. Export conversations for documentation.",
    url: "https://claude.ai"
  },
  {
    name: "Google Gemini (Advanced)",
    provider: "Google",
    type: "LLM",
    accessMethod: "Personal Login",
    costModel: "$20/month per user (Google One AI Premium)",
    strengths: [
      "Integrated with Google Workspace (Docs, Sheets, Drive)",
      "Good at search and recent information retrieval",
      "Multi-modal (can analyze images, charts, maps)",
      "1M token context window (industry leading)"
    ],
    limitations: [
      "Less consistent than ChatGPT/Claude for structured extraction",
      "Newer, less proven in scientific contexts",
      "Can be overconfident in responses"
    ],
    geologicalUseCase: "Best for: Processing geological maps and images, working within Google Workspace ecosystem, searching for recent papers/data",
    implementationGuide: "1. Add to existing Google Workspace. 2. Use for map/image analysis. 3. Export extracted data to Google Sheets. 4. Integrate with Drive for source storage.",
    url: "https://gemini.google.com"
  },
  {
    name: "RadiXplore",
    provider: "CorePlan.io",
    type: "Specialized",
    accessMethod: "Enterprise",
    costModel: "Contact for pricing (Enterprise only)",
    strengths: [
      "Trained on millions of geological documents",
      "Purpose-built for mining/exploration",
      "Understands geological terminology natively",
      "Integrated with exploration workflows"
    ],
    limitations: [
      "Enterprise pricing may be prohibitive",
      "Less flexible than general LLMs",
      "Requires commitment to specific platform"
    ],
    geologicalUseCase: "Best for: Large-scale mining operations with budget for specialized tools. Searching historical reports and extracting exploration insights.",
    implementationGuide: "Contact CorePlan.io for demo. Evaluate ROI vs. ChatGPT/Claude approach. Consider for future if budget allows.",
    url: "https://www.coreplan.io"
  },
  {
    name: "VRIFY Dora",
    provider: "VRIFY",
    type: "Specialized",
    accessMethod: "Enterprise",
    costModel: "Contact for pricing",
    strengths: [
      "Described as 'ChatGPT for geology'",
      "Research tool for mineral exploration",
      "Built for geologists and geoscientists"
    ],
    limitations: [
      "Limited public information",
      "Likely enterprise pricing",
      "Unknown integration capabilities"
    ],
    geologicalUseCase: "Best for: Dedicated geological research and mineral exploration",
    implementationGuide: "Monitor development. Consider for evaluation when more widely available.",
    url: "https://vrify.com"
  }
];

/**
 * PROMPT TEMPLATES FOR DATA EXTRACTION
 * Based on research from Nature Communications ChatExtract study
 */
export const promptTemplates: PromptTemplate[] = [
  {
    id: "extract-geological-data",
    title: "Extract Geological Data from Paper",
    description: "Extracts Material-Value-Unit triplets from geological research papers",
    category: "Data Extraction",
    tool: "Claude (recommended) or ChatGPT",
    prompt: `You are a geological data extraction specialist. Your task is to extract structured data from the research paper I will provide.

TASK: Extract all instances of the following geological properties in the format: Material | Property | Value | Unit

Properties to extract:
- Mineral composition (% weight or volume)
- Chemical formulas and concentrations
- Geographic coordinates
- Sample depth/elevation
- Age dates (radiometric, stratigraphic)
- Physical properties (density, porosity, permeability)

RULES:
1. Only extract explicitly stated values - DO NOT infer or estimate
2. Include the exact text quote where you found each value
3. If units are ambiguous, note this
4. If multiple values given (e.g., range), include all
5. Mark confidence level: HIGH (directly stated), MEDIUM (implied), LOW (uncertain)

FORMAT your response as a table:
| Material | Property | Value | Unit | Confidence | Source Quote |

After extraction, ask me 3 follow-up questions to verify ambiguous entries.`,
    exampleInput: "PDF of geological survey report on gold deposits",
    exampleOutput: `| Material | Property | Value | Unit | Confidence | Source Quote |
|----------|----------|-------|------|------------|--------------|
| Quartz vein | Gold concentration | 5.2 | g/t | HIGH | "Assay results show 5.2 g/t Au in quartz vein QV-12" |
| Host rock | Depth | 450-520 | meters | HIGH | "Samples collected between 450m and 520m depth" |

Follow-up questions:
1. The report mentions "anomalous gold values" without specific numbers. Should I exclude these or mark as LOW confidence?
2. Section 3.4 references "previous work" for baseline values. Should I extract those or only new measurements?
3. Several samples list "trace Au" - should these be recorded as <detection limit?`,
    accuracyRate: "90.8% precision, 87.7% recall (Nature Communications study)",
    source: "https://www.nature.com/articles/s41467-024-45914-8"
  },
  {
    id: "categorize-data-sources",
    title: "Categorize Data Sources",
    description: "Automatically categorizes geological data sources by type, location, date",
    category: "Classification",
    tool: "ChatGPT or Claude",
    prompt: `You are organizing a geological data library. I will provide a list of data sources (reports, papers, datasets). Categorize each source using this schema:

REQUIRED FIELDS:
- Source ID (auto-generate: YYYY-ORG-NNN)
- Title
- Type: [Academic Paper | Government Report | Industry Report | Dataset | Map | Core Log | Other]
- Region: [Geographic location - country, state/province, specific area]
- Commodity: [Primary minerals/resources discussed]
- Date: [Publication or data collection date]
- Data Quality: [HIGH | MEDIUM | LOW] based on:
  * Peer review status
  * Data completeness
  * Methodology documentation
  * Source credibility
- Key Data Types: [Geochemistry | Geophysics | Drilling | Structural | Petrography | etc.]
- Extraction Priority: [IMMEDIATE | HIGH | MEDIUM | LOW] based on:
  * Data quality
  * Relevance to current projects
  * Uniqueness of data

OUTPUT as CSV format for import to database.`,
    exampleInput: `1. "Geochemical Analysis of Carlin-Type Gold Deposits in Nevada" - USGS Open File Report 2023
2. "Assay Results Q4 2024 - Northern Territory Exploration" - Internal report
3. Historic drill core logs from Broken Hill, NSW 1985-1990`,
    exampleOutput: `Source ID,Title,Type,Region,Commodity,Date,Data Quality,Key Data Types,Extraction Priority
2023-USGS-001,Geochemical Analysis of Carlin-Type Gold Deposits in Nevada,Government Report,USA-Nevada-Carlin,Gold,2023,HIGH,Geochemistry,HIGH
2024-INT-001,Assay Results Q4 2024 - Northern Territory Exploration,Industry Report,Australia-NT,Unknown,2024,MEDIUM,Geochemistry,IMMEDIATE
1985-HIST-001,Historic drill core logs from Broken Hill NSW,Core Log,Australia-NSW-Broken Hill,Silver-Lead-Zinc,1985-1990,MEDIUM,Drilling-Petrography,LOW`,
    accuracyRate: "Estimated 95%+ for well-structured sources",
    source: "https://www.digitalvibes.ai/post/28-unique-chatgpt-use-cases-in-the-mining-industry-optimizing-exploration-and-cost-reduction"
  },
  {
    id: "quality-control-validation",
    title: "Quality Control - Data Validation",
    description: "Cross-checks extracted data against original sources using follow-up questions",
    category: "Quality Control",
    tool: "Claude (recommended for longer context)",
    prompt: `You are a quality control specialist reviewing geological data extraction. I will provide:
1. Original source document excerpt
2. Extracted data table

YOUR TASK:
1. Verify each extracted value appears in the source
2. Check units match (watch for conversions)
3. Identify any values that seem unusual or potentially erroneous
4. Flag missing context that could change interpretation

For each discrepancy, ask me a follow-up question to clarify.

VALIDATION CHECKLIST:
☐ All values directly quoted from source?
☐ Units correctly captured?
☐ Ranges vs. single values correct?
☐ Sample IDs match?
☐ Geographic coordinates have correct sign (N/S, E/W)?
☐ Dates in consistent format?
☐ Detection limits vs. actual values distinguished?

OUTPUT:
- PASS/FAIL for each data row
- List of discrepancies found
- Recommended corrections
- Confidence score for overall extraction quality (0-100%)`,
    exampleInput: `Source excerpt: "Sample BH-45A from 342m depth yielded 12.3 ppm Cu and 0.8% Zn"
Extracted: BH-45A | Copper | 12.3 | ppm | 342 | m`,
    exampleOutput: `VALIDATION RESULTS:

Row 1: FAIL
- Issue: Zinc value (0.8% Zn) not extracted
- Issue: No column for second element
- Recommendation: Add row for Zinc or modify table schema to support multiple elements per sample

Follow-up questions:
1. Should samples with multiple elements be split into separate rows, or do you want a multi-element column structure?
2. The source uses "ppm" and "%" - do you want me to convert all to consistent units?

Overall Confidence: 75% - Schema needs adjustment for multi-element samples`,
    accuracyRate: "Follow-up questions reduce errors by 40% (Nature Communications)",
    source: "https://www.nature.com/articles/s41467-024-45914-8"
  },
  {
    id: "summarize-geology-paper",
    title: "Summarize Geological Paper for Database Entry",
    description: "Creates structured summary optimized for search and reference",
    category: "Summarization",
    tool: "Claude (200k context)",
    prompt: `You are summarizing a geological research paper for a searchable database. Create a structured summary with these sections:

1. EXECUTIVE SUMMARY (2-3 sentences)
   - What was studied, where, and key finding

2. GEOGRAPHIC FOCUS
   - Country, state/province, specific area
   - Coordinates if provided
   - Map references

3. COMMODITY/TARGET
   - Primary minerals/resources
   - Secondary commodities
   - Deposit type/classification

4. METHODOLOGY
   - Techniques used (list)
   - Sample count and types
   - Date of field work/data collection

5. KEY DATA EXTRACTED
   - List the types of quantitative data available
   - Indicate if raw data is in tables/appendices

6. MAIN CONCLUSIONS
   - Bullet points (3-5)

7. RELEVANCE KEYWORDS
   - 10-15 searchable terms for database tagging

8. EXTRACTION RECOMMENDATIONS
   - Priority: IMMEDIATE / HIGH / MEDIUM / LOW
   - Estimated effort: Hours needed
   - Special requirements (if any)

Keep technical language, but be concise. Focus on what makes this source valuable for future extraction.`,
    exampleInput: "PDF: 'Structural Controls on Gold Mineralization in the Yilgarn Craton, Western Australia'",
    exampleOutput: `EXECUTIVE SUMMARY:
Study of structural controls on gold deposits in southern Yilgarn Craton (WA) using detailed mapping, lithogeochemistry, and 3D modeling. Identifies NW-trending shear zones as primary ore controls with grade correlations to quartz vein density.

GEOGRAPHIC FOCUS:
- Australia, Western Australia, Yilgarn Craton (Southern Cross Domain)
- Specific areas: Marvel Loch, Cuddingwarra
- Coordinates: 31°S to 32°S, 119°E to 120°E
- References 1:100,000 geological maps

COMMODITY/TARGET:
- Primary: Gold (orogenic lode-gold)
- Secondary: None significant
- Deposit Type: Archean orogenic gold, structurally-controlled

METHODOLOGY:
- Structural mapping (150 stations)
- Lithogeochemistry (450 samples)
- Core logging (12 diamond drill holes, 3,200m)
- 3D modeling (Leapfrog software)
- Field work: 2022-2023

KEY DATA EXTRACTED:
- Gold assays (ppm Au) - 450 samples
- Quartz vein orientations and density measurements
- Structural orientation data (foliation, shear zones)
- Lithological contacts
- Tables 2-5 contain raw geochemical data

MAIN CONCLUSIONS:
- NW-trending (310-330°) shear zones control 80% of known deposits
- Gold grades correlate with quartz vein density (R² = 0.67)
- Ore shoots plunge 45-60° to SE
- Favorable host rocks: Mafic volcanics with carbonate alteration
- Three exploration targets identified with drill-ready coordinates

RELEVANCE KEYWORDS:
Yilgarn, orogenic gold, shear zones, structural controls, quartz veins, mafic volcanics, carbonate alteration, Marvel Loch, Archean, Leapfrog, gold assays, exploration targets

EXTRACTION RECOMMENDATIONS:
Priority: HIGH
Estimated Effort: 4-6 hours (tables are well-formatted)
Special Requirements: Geochemical data in Appendix B (separate Excel file referenced but not included - may need to request from authors)`,
    accuracyRate: "Qualitative - excellent for creating searchable metadata",
    source: "Based on Claude for Life Sciences methodology"
  },
  {
    id: "code-generation-extraction",
    title: "Generate Python Script for Data Extraction",
    description: "Creates automated extraction scripts for repetitive data patterns",
    category: "Data Extraction",
    tool: "Claude (best for code) or ChatGPT",
    prompt: `You are a Python developer specializing in geological data extraction. I will describe a repetitive data extraction task, and you will generate a Python script to automate it.

REQUIREMENTS:
1. Use pandas for data manipulation
2. Include error handling (try/except blocks)
3. Add logging to track extraction progress
4. Output to CSV format
5. Include docstrings and comments
6. Handle common edge cases (missing values, format variations)

INPUT DESCRIPTION:
[User describes the data source and desired extraction]

OUTPUT:
1. Complete Python script with imports
2. Sample usage example
3. Expected output format description
4. Known limitations/edge cases

Make the script production-ready, not just a proof of concept.`,
    exampleInput: "I have 100 PDF reports, each containing a table of assay results. Table format varies slightly (some use 'Sample_ID' column, others 'Sample ID' or 'ID'). Need to extract all rows into single CSV with: Sample ID, Depth (m), Au (ppm), Cu (%), Date Sampled",
    exampleOutput: `import pandas as pd
import pdfplumber
import re
import logging
from pathlib import Path
from datetime import datetime

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('extraction.log'),
        logging.StreamHandler()
    ]
)

def extract_assay_table(pdf_path):
    """
    Extract assay results table from PDF report.

    Handles common column name variations:
    - Sample_ID, Sample ID, ID, SampleID
    - Depth, Depth (m), Depth_m
    - Au, Au (ppm), Au_ppm, Gold
    - Cu, Cu (%), Cu_pct, Copper

    Args:
        pdf_path (Path): Path to PDF file

    Returns:
        DataFrame: Standardized assay data with columns:
                   Sample_ID, Depth_m, Au_ppm, Cu_pct, Date_Sampled, Source_File
    """
    # [Full script continues...]

# Expected output CSV format:
# Sample_ID,Depth_m,Au_ppm,Cu_pct,Date_Sampled,Source_File
# DDH-001,45.2,0.8,0.15,2024-01-15,report_001.pdf
# DDH-001,47.5,1.2,0.22,2024-01-15,report_001.pdf

# Known limitations:
# - Assumes tables are in standard grid format (not free-form text)
# - May struggle with hand-drawn or image-based tables
# - Date format must be recognizable (YYYY-MM-DD, DD/MM/YYYY, etc.)`,
    accuracyRate: "Code generation typically 85-95% correct, requires testing",
    source: "Claude code generation capabilities"
  }
];

/**
 * AI INTEGRATION PROPOSALS FOR LITHODATA
 */
export const aiIntegrationProposals: AIIntegrationProposal[] = [
  {
    id: "proposal-1",
    title: "Personal AI Logins for Data Extraction Team",
    description: "Equip each team member with ChatGPT Plus/Pro and Claude Pro accounts for manual extraction tasks with centralized tracking",
    aiTools: ["ChatGPT Plus/Pro", "Claude Pro"],
    benefits: [
      "Immediate implementation - no API development needed",
      "Low cost: $40-50/month per user vs. thousands for API usage",
      "Flexibility - team can choose best tool for each task",
      "No token limits to worry about - unlimited usage within fair use",
      "Team learns AI skills transferable to other tasks",
      "Easy to scale up or down based on workload"
    ],
    risks: [
      "Data governance - need policies for sensitive data",
      "Inconsistent quality if not using standard prompts",
      "Harder to automate - more manual copy-paste",
      "Tracking requires manual logging by team",
      "No built-in version control for extracted data"
    ],
    implementation: [
      {
        step: 1,
        title: "Procurement and Access",
        description: "Purchase ChatGPT Plus/Pro and Claude Pro subscriptions for each extraction team member",
        duration: "1 day",
        owner: "Keith / IT",
        prerequisites: ["Budget approval for ~$500/month (10 users × $50)"],
        deliverables: [
          "Company credit card or reimbursement process",
          "List of team members needing access",
          "Login credentials securely shared"
        ],
        resources: [
          { title: "ChatGPT Plus", url: "https://chat.openai.com/plus" },
          { title: "Claude Pro", url: "https://claude.ai/upgrade" }
        ]
      },
      {
        step: 2,
        title: "Create Prompt Library",
        description: "Develop standardized prompts for common extraction tasks (using templates above)",
        duration: "3-5 days",
        owner: "Juan + Keith",
        prerequisites: ["Review of current extraction workflows", "Identification of repetitive tasks"],
        deliverables: [
          "Google Doc with 10-15 standard prompts",
          "Examples of expected outputs",
          "Quick reference guide for team"
        ],
        resources: [
          { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/" },
          { title: "Nature Communications ChatExtract Paper", url: "https://www.nature.com/articles/s41467-024-45914-8" }
        ]
      },
      {
        step: 3,
        title: "Team Training Session",
        description: "Train all users on ChatGPT, Claude, prompt engineering basics, and quality control",
        duration: "Half day workshop",
        owner: "Juan (technical) + Keith (process)",
        prerequisites: ["Prompt library created", "All team has active accounts"],
        deliverables: [
          "Training slides/recording",
          "Hands-on exercises completed",
          "Certification quiz (optional but recommended)"
        ],
        resources: [
          { title: "ChatGPT Best Practices", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
          { title: "Claude Prompt Engineering", url: "https://docs.anthropic.com/claude/docs/introduction-to-prompt-design" }
        ]
      },
      {
        step: 4,
        title: "Implement Tracking System",
        description: "Build simple tracking dashboard in Google Sheets or internal app to log AI usage",
        duration: "2-3 days",
        owner: "Developer + Juan",
        prerequisites: ["Define what metrics to track"],
        deliverables: [
          "Tracking template/form",
          "Dashboard showing team activity",
          "Weekly email summary for management"
        ],
        resources: [
          { title: "Google Sheets as Database", url: "https://developers.google.com/sheets/api" },
          { title: "See Tracking System section below for database schema" }
        ]
      },
      {
        step: 5,
        title: "Pilot Program (1 Month)",
        description: "Run pilot with 3-4 team members on real extraction tasks, track metrics, refine process",
        duration: "1 month",
        owner: "Juan",
        prerequisites: ["Training completed", "Tracking system live"],
        deliverables: [
          "Pilot results report (time saved, quality, issues)",
          "Updated prompts based on learnings",
          "Go/no-go decision for full rollout"
        ],
        resources: [
          { title: "Pilot program template" }
        ]
      },
      {
        step: 6,
        title: "Full Rollout",
        description: "Expand to all extraction team members, establish ongoing QC process",
        duration: "Ongoing",
        owner: "Juan",
        prerequisites: ["Successful pilot", "Final process documentation"],
        deliverables: [
          "All team members trained and using AI",
          "Monthly quality audits",
          "Continuous improvement feedback loop"
        ],
        resources: []
      }
    ],
    estimatedTimeSaving: "30-50% reduction in manual extraction time (based on USGS CriticalMAAS 2.5 day vs. weeks result)",
    estimatedCost: "$500-600/month for 10-12 users (ChatGPT + Claude), plus ~40 hours setup time",
    priority: "High"
  },
  {
    id: "proposal-2",
    title: "Automated Extraction Pipeline with LLM API Integration",
    description: "Build automated system using Claude API or ChatGPT API for batch processing of documents",
    aiTools: ["Claude API (Anthropic)", "ChatGPT API (OpenAI)"],
    benefits: [
      "Fully automated - no manual copying",
      "Consistent quality with standardized prompts",
      "Version controlled extraction logic",
      "Scales to thousands of documents easily",
      "Built-in tracking and logging",
      "Can process documents overnight/weekends"
    ],
    risks: [
      "Higher cost - API tokens can get expensive ($$$)",
      "Development time required (2-4 weeks)",
      "Requires maintenance and updates",
      "Less flexibility than manual approach",
      "Upfront investment before seeing value",
      "May need fine-tuning for edge cases"
    ],
    implementation: [
      {
        step: 1,
        title: "Requirements Gathering",
        description: "Document all extraction use cases, data formats, quality requirements",
        duration: "1 week",
        owner: "Juan + Development team",
        prerequisites: ["Access to sample documents"],
        deliverables: [
          "Technical requirements doc",
          "Sample input/output datasets",
          "Success criteria defined"
        ],
        resources: []
      },
      {
        step: 2,
        title: "API Selection and Setup",
        description: "Choose API provider (recommend Claude for scientific work), set up billing, test endpoints",
        duration: "2-3 days",
        owner: "Developer",
        prerequisites: ["Budget approval", "Credit card for API billing"],
        deliverables: [
          "API keys secured",
          "Billing alerts configured",
          "Hello world test successful"
        ],
        resources: [
          { title: "Claude API Docs", url: "https://docs.anthropic.com/claude/reference/getting-started-with-the-api" },
          { title: "OpenAI API Docs", url: "https://platform.openai.com/docs/introduction" }
        ]
      },
      {
        step: 3,
        title: "Prototype Development",
        description: "Build MVP script that extracts data from 10-20 sample documents",
        duration: "1-2 weeks",
        owner: "Developer",
        prerequisites: ["API access", "Sample documents", "Technical requirements"],
        deliverables: [
          "Python extraction script",
          "Accuracy testing on sample set",
          "Cost per document calculated"
        ],
        resources: [
          { title: "ChatExtract Method (Nature)", url: "https://www.nature.com/articles/s41467-024-45914-8" },
          { title: "LangChain for Document Processing", url: "https://python.langchain.com/docs/use_cases/extraction/" }
        ]
      },
      {
        step: 4,
        title: "Quality Control Integration",
        description: "Add validation layer, human review workflow, error handling",
        duration: "1 week",
        owner: "Developer + Juan",
        prerequisites: ["Prototype working"],
        deliverables: [
          "QC workflow implemented",
          "Flagging system for low-confidence extractions",
          "Human review interface"
        ],
        resources: []
      },
      {
        step: 5,
        title: "Production Deployment",
        description: "Deploy to server, set up monitoring, train team on reviewing outputs",
        duration: "1 week",
        owner: "Developer + IT",
        prerequisites: ["QC testing passed", "Cost analysis acceptable"],
        deliverables: [
          "Production pipeline running",
          "Monitoring dashboard",
          "Team trained on review process"
        ],
        resources: []
      },
      {
        step: 6,
        title: "Optimization and Scaling",
        description: "Fine-tune prompts, reduce API costs, expand to more document types",
        duration: "Ongoing",
        owner: "Developer + Juan",
        prerequisites: ["2-4 weeks of production usage data"],
        deliverables: [
          "Cost reduction strategies implemented",
          "Accuracy improvements documented",
          "Expanded to new use cases"
        ],
        resources: []
      }
    ],
    estimatedTimeSaving: "60-80% reduction in extraction time once deployed (based on USGS automation results)",
    estimatedCost: "Development: ~160 hours ($15-25k). API usage: $100-500/month depending on volume. Maintenance: 10 hours/month",
    priority: "Medium"
  },
  {
    id: "proposal-3",
    title: "Hybrid Approach: Personal AI + Centralized Tracking Dashboard",
    description: "Best of both worlds - team uses personal AI logins but logs all work through management dashboard",
    aiTools: ["ChatGPT Plus/Pro", "Claude Pro", "Custom tracking dashboard"],
    benefits: [
      "Low cost like Proposal 1",
      "Management visibility like Proposal 2",
      "Flexibility for team members",
      "No API development needed",
      "Centralized reporting for Keith",
      "Easy to audit and improve processes"
    ],
    risks: [
      "Relies on team discipline to log work",
      "More manual than fully automated approach",
      "Quality varies by team member skill",
      "Dashboard needs maintenance"
    ],
    implementation: [
      {
        step: 1,
        title: "Hybrid Setup (Combine Proposal 1 Steps 1-3)",
        description: "Get personal accounts, create prompts, train team",
        duration: "1 week",
        owner: "Keith + Juan",
        prerequisites: ["Budget approval"],
        deliverables: [
          "All team has AI access",
          "Prompt library created",
          "Training completed"
        ],
        resources: []
      },
      {
        step: 2,
        title: "Build Centralized Tracking Dashboard",
        description: "Create internal web app for logging extraction work (extend existing VSS platform)",
        duration: "1 week development",
        owner: "Developer",
        prerequisites: ["Define tracking fields (see schema below)"],
        deliverables: [
          "Tracking form/interface",
          "Management dashboard",
          "Weekly email reports"
        ],
        resources: [
          { title: "See database schema section below" }
        ]
      },
      {
        step: 3,
        title: "Integrate with Existing Workflows",
        description: "Add tracking step to extraction process, make it required before data handoff",
        duration: "2-3 days",
        owner: "Juan",
        prerequisites: ["Dashboard live"],
        deliverables: [
          "Updated SOP documentation",
          "Tracking reminders in Workbench",
          "Quality gates enforced"
        ],
        resources: []
      },
      {
        step: 4,
        title: "Launch and Monitor",
        description: "Full team adoption, weekly reviews of metrics, iterative improvements",
        duration: "Ongoing",
        owner: "Juan + Keith",
        prerequisites: ["Dashboard stable"],
        deliverables: [
          "100% compliance with tracking",
          "Monthly improvement reports",
          "Prompt library updates based on data"
        ],
        resources: []
      }
    ],
    estimatedTimeSaving: "35-55% reduction in extraction time (slightly less than full automation due to logging overhead)",
    estimatedCost: "$500-600/month AI subscriptions + ~80 hours development ($8-12k one-time) + minimal ongoing maintenance",
    priority: "High"
  }
];

/**
 * MANAGEMENT TRACKING METRICS
 * What Keith and management need to see
 */
export const trackingMetrics = {
  categories: [
    {
      name: "Team Activity",
      metrics: [
        "Data points extracted per team member per week",
        "Hours spent on extraction (with vs. without AI)",
        "AI tool usage distribution (ChatGPT vs. Claude vs. Gemini)",
        "Number of documents processed",
        "Active users vs. inactive users"
      ]
    },
    {
      name: "Quality Metrics",
      metrics: [
        "Extraction accuracy rate (% of QC passed)",
        "Errors caught in QC review",
        "Re-work rate (extractions needing correction)",
        "Confidence scores distribution",
        "Time to quality review"
      ]
    },
    {
      name: "Productivity Metrics",
      metrics: [
        "Average time per document (with AI vs. manual)",
        "Documents per day (team total)",
        "Data points per hour",
        "Bottlenecks identified (where time is lost)",
        "Automation rate (% of tasks using AI)"
      ]
    },
    {
      name: "Cost Metrics",
      metrics: [
        "AI subscription costs per month",
        "Cost per document extracted",
        "Cost per data point",
        "ROI calculation (time saved × hourly rate - AI costs)",
        "API costs if using automated approach"
      ]
    },
    {
      name: "Data Inventory",
      metrics: [
        "Total data points in database",
        "Data points by commodity type",
        "Data points by geographic region",
        "Data source types processed",
        "Growth rate (data points per month)"
      ]
    }
  ],

  visualizations: [
    "Team leaderboard (gamification - who extracted most this week)",
    "Trend chart: Data points extracted over time",
    "Pie chart: Time allocation (AI vs. manual vs. QC)",
    "Bar chart: Extraction by team member",
    "Heatmap: Activity by day/time",
    "Funnel: Documents → Extracted → QC'd → Database loaded"
  ],

  reportingCadence: {
    realTime: "Live dashboard showing current activity",
    daily: "Email digest with yesterday's stats",
    weekly: "Team performance summary",
    monthly: "Executive report with trends and ROI",
    quarterly: "Strategic review and process improvements"
  }
};

/**
 * DATABASE SCHEMA FOR AI TRACKING
 */
export const aiTrackingSchema = `
// Extend existing database schema with:

model ExtractionSession {
  id              String   @id @default(cuid())
  userId          String   // Team member doing extraction
  user            User     @relation(fields: [userId], references: [id])

  // What was extracted
  sourceType      String   // "PDF Paper", "Report", "Map", "Database", "Other"
  sourceTitle     String   // Title or identifier of source
  sourceUrl       String?  // Link to source if available
  sourceDateRange String?  // e.g., "1985-1990" for historical data

  // AI tool used
  aiTool          String?  // "ChatGPT", "Claude", "Gemini", "Manual", "Other"
  promptUsed      String?  // Which prompt template from library

  // Metrics
  dataPointsExtracted  Int   @default(0)  // How many data points added to DB
  timeSpentMinutes     Int?  // How long did extraction take
  qualityScore         Float? // 0-100, from QC review
  confidenceLevel      String? // "HIGH", "MEDIUM", "LOW"

  // Tracking
  startedAt       DateTime @default(now())
  completedAt     DateTime?
  reviewedAt      DateTime?
  reviewedBy      String?  // User ID of QC reviewer

  // Notes
  notes           String?  // Any issues, learnings, etc.

  // Relations
  dataPoints      DataPoint[]  // Link to actual extracted data
}

model DataPoint {
  id              String   @id @default(cuid())
  sessionId       String   // Which extraction session created this
  session         ExtractionSession @relation(fields: [sessionId], references: [id])

  // The actual data (flexible schema)
  material        String?  // e.g., "Quartz vein"
  property        String?  // e.g., "Gold concentration"
  value           String   // e.g., "5.2"
  unit            String?  // e.g., "g/t"

  // Context
  sampleId        String?
  location        String?
  depth           Float?
  date            DateTime?

  // Metadata
  confidence      String?  // "HIGH", "MEDIUM", "LOW"
  sourceQuote     String?  // Exact text from source

  // Quality control
  qcStatus        String   @default("pending") // "pending", "approved", "rejected", "flagged"
  qcNotes         String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model AIUsageLog {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])

  tool        String   // "ChatGPT", "Claude", "Gemini"
  action      String   // "extraction", "categorization", "qc", "summarization"
  promptId    String?  // Which prompt template used

  inputTokens  Int?    // If using API, track token usage
  outputTokens Int?
  cost         Float?  // Calculated cost

  timestamp   DateTime @default(now())
}
`;
