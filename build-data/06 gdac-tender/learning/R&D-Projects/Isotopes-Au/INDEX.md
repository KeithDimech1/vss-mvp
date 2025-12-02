# Isotopes.au - National Data Infrastructure for Environmental Isotope Analysis

**Extraction Date:** 2025-11-28
**Source Directory:** `build-data/06 gdac-tender/learning/Isotopes Au/`
**Purpose:** GDAC Tender Submission Reference Documentation (R&D Tax Incentive Evidence)

---

## Project Overview

| Field | Value |
|-------|-------|
| **Project Name** | Isotopes.au: A National Data Infrastructure for Environmental Isotope Analysis |
| **Developer** | Lithodat Pty Ltd |
| **Duration** | July 2024 – December 2028 |
| **Total Budget** | $300,000 |
| **FY2024-25 Expenditure** | $77,298 |
| **Partners** | CSIRO, ANSTO, Geoscience Australia (GA), NMI, Australian Universities |

---

## R&D Core Activity

| Field | Value |
|-------|-------|
| **Activity Name** | Schema Validation and Ingestion Framework for Environmental Isotope Data |
| **Period** | July 2024 - June 2025 |
| **Type** | Eligible R&D - Systematic experimentation |

### Project Objectives

1. Develop a national digital platform for standardising, ingesting, and querying isotopic data from multiple Australian institutions
2. Validate a harmonised schema and isotope ontology for environmental science and geochemistry research
3. Enable machine-readable FAIR data publication for isotopic measurements and metadata
4. Support automated and user-guided data ingestion workflows using adapters and import wizard
5. Reduce duplication, improve interoperability for climate, hydrology, soil, and contamination research

---

## Hypothesis

The experiment tested whether diverse isotope datasets from Australian institutions (CSIRO, ANSTO, GA, universities) could be programmatically harmonised into a single ingestion framework using:

- A unified schema
- A controlled vocabulary (ontology)
- Automated adapters
- Semi-automated import wizard tools

**Technical Uncertainty:**
- No published schema or system existed to harmonise Australia's multi-agency isotope data
- Each agency had its own field conventions, measurement units, and metadata structures
- No existing tools could reconcile semantic mismatches through vocabulary design

---

## Experiments Conducted

### Experiment 001: Adapter Validation

| Field | Value |
|-------|-------|
| **Report** | `Isotopes_Experiment_Report_001_Adapter_Validation` |
| **Objective** | Test automated ingestion adapters for institutional data sources |
| **Sources Tested** | 6 institutional sources (CSIRO, GA, ANSTO, universities) |
| **Outcome** | Adapter pipelines validated for structured datasets |

**Key Findings:**
- Adapters work well for structured datasets from national institutions
- Semi-structured and legacy datasets require manual oversight via wizard interfaces
- Dual-mode ingestion system (automated + manual) required for comprehensive coverage

### Experiment 002: Import Wizard Benchmarking

| Field | Value |
|-------|-------|
| **Report** | `Isotopes_Experiment_Report_002_Wizard_Benchmarking.docx` |
| **Objective** | Compare manual import wizard vs automated adapter performance |
| **Metrics** | Field mapping accuracy, rejection rate, QA time, user satisfaction |

**Results:**
- 93-96% field mapping accuracy across 4 datasets
- Rejection rates under 6% after QA pass
- Most imports completed in under 15 minutes
- Wizard preferred for small/irregular datasets; adapters for high-volume sources

**Key Findings:**
- Import wizard is valuable complement to adapter ingestion
- Greater flexibility for novel or low-volume datasets
- Plans to extend wizard's logic library and metadata annotation tools

### Experiment 003: Ontology Field Testing

| Field | Value |
|-------|-------|
| **Report** | `Isotopes_Experiment_Report_003_Ontology_Validation.docx` |
| **Objective** | Validate harmonised isotope ontology across diverse Australian datasets |
| **Field Names Mapped** | 250+ across multiple sources |

**Results:**
- After 3 iteration rounds: 97% match rate achieved
- 37 new terms added to ontology
- 4 field definitions adjusted for clarity

**Issues Identified:**
- Duplicate labels (e.g., 'SampleID' vs 'Sample_ID')
- Inconsistent date formats
- Overlapping definitions for 'material type'

**Key Findings:**
- Ontology proved robust against diverse Australian isotope data
- Field inconsistencies primarily superficial and addressable via controlled vocabularies
- Ontology alignment significantly improved FAIR compliance and analytics reliability

---

## Technical Architecture

### Data Schema Coverage

| Isotopic System | Status |
|-----------------|--------|
| Stable isotopes (δ¹³C, δ¹⁸O, δ²H, δ¹⁵N) | ✅ Supported |
| Radiogenic isotopes (Sr, Nd, Pb) | ✅ Supported |
| Environmental isotopes | ✅ Supported |

### Schema Features

- FAIR-compliant metadata enrichment
- Programmatic interoperability from outset
- Support for high-trust (institutional) and low-trust (field lab) sources
- Scalable, role-based access control
- Downstream export to external systems

---

## Document Index

### Main Project Documentation

| Document | Description |
|----------|-------------|
| `Isotopes RnD Report - 2024 25.docx` | **R&D Project Report** - Comprehensive report for ATO R&D Tax Incentive submission |

### Experiment Reports (in `Isotopes/Evidence/`)

| Document | Description |
|----------|-------------|
| `Isotopes_Experiment_Report_002_Wizard_Benchmarking.docx` | Import wizard vs adapter comparison study |
| `Isotopes_Experiment_Report_003_Ontology_Validation.docx` | Ontology field testing across 250+ fields |

### Supporting Evidence (in `Isotopes/Evidence/`)

| Document | Description |
|----------|-------------|
| `CSIRO AF Isotope ontology results.xlsx` | CSIRO ontology alignment results |
| `isotope.au-System Documentation.docx` | System technical documentation |
| `IsotopesAu - Direct Data Upload.pptx` | Presentation on data upload workflow |
| `IsotopesAU requirements.docx` | Requirements specification |
| `Data Source 5 - Isotopes - Environment.pptx` | Environmental isotopes data source overview |
| `Ontology_Final.lithodat_edited.xlsx` | Final ontology definition spreadsheet |
| `Meetings/` | Meeting notes with stakeholders |

### Google Doc Links (require Google account)

| Document | Description |
|----------|-------------|
| `Isotopes RnD Report - 2024 25.gdoc` | Link to master R&D report |
| `Isotopes_Experiment_Report_001_Adapter_Validation.gdoc` | Link to Experiment 001 report |
| `Isotopes_Experiment_Report_002_Wizard_Benchmarking.gdoc` | Link to Experiment 002 report |
| `Isotopes_Experiment_Report_003_Ontology_Validation.gdoc` | Link to Experiment 003 report |

---

## Key Conclusions

### Core R&D Findings

1. **Hybrid ingestion model is essential** - Automated adapters for structured data, wizard for legacy/ad-hoc sources
2. **National schema is achievable** - But requires controlled vocabulary and ongoing ontology refinement
3. **User experience and QA critical** - Built-in validation prompts and schema feedback essential
4. **Business use cases identified:**
   - Direct integration with analytical labs for live upload
   - Regulatory reporting tools for environmental agencies
   - Cross-referencing with geochemistry and hydrology platforms

### Gap Filled

> "There is currently no centralised system in Australia capable of harmonising and storing environmental isotope data at scale. International schemas (e.g. EarthChem, PANGAEA) lack the flexibility and Australian-specific conventions required for this purpose. Isotopes.au is positioned to fill this gap and provide national infrastructure for research, regulation, and industry."

---

## Evidence of R&D Activities

### Searches/Enquiries Made
- Literature reviews of data schema repositories, isotope databases, FAIR implementation
- Expert consultations with CSIRO, ANSTO, Geoscience Australia
- Evaluation of international platforms (NASA PDS, EarthChem, PANGAEA)

### Systematic Progression of Work
- Structured experiment reports with QA logs
- Jira issue tracking
- Git commit history
- API test results

### Hypothesis and Experiment Design
- Formal R&D templates documenting hypothesis, methodology, variables, success criteria

### Results Documentation
- Experiment reports
- FAIR compliance audits
- QA dashboards
- Metadata scoring summaries
- Ingestion output files
- User feedback

---

## Relevance to GDAC Tender

This documentation demonstrates:

1. **R&D Capability:** Systematic experimental methodology for novel data platform development
2. **Schema Design Expertise:** Creating unified schemas for heterogeneous institutional data
3. **FAIR Compliance:** Deep expertise in implementing FAIR data principles
4. **Government Partnerships:** Collaboration with CSIRO, ANSTO, Geoscience Australia, NMI
5. **National Infrastructure:** Building platforms that serve multiple government agencies
6. **Data Harmonisation:** Proven ability to standardise diverse data formats and sources
7. **Ontology Development:** Controlled vocabulary design for complex scientific domains

---

*Generated for GDAC Tender Submission - Lithodat Pty Ltd*
