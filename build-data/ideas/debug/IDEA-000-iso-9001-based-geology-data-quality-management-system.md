# ISO 9001-Based Geology Data Quality Management System Implementation Log

**Idea ID:** IDEA-000
**Date:** 2025-12-02
**Status:** 💡 idea
**Priority:** P1 (High - Required for GDAC Saudi tender, worth 10% of technical evaluation)

---

## Idea Description

Develop an ISO 9001-aligned Quality Management System (QMS) specifically designed for geological data services. This QMS will establish Lithodat's data quality assurance processes, with **geologists serving as the primary data quality reviewers** through a structured peer review system. The system must satisfy the GDAC-SA RFQ requirement for "Quality Assurance" (10% of technical evaluation) and demonstrate professional standards for geological data accuracy and model validation.

### Key Principles

1. **ISO 9001:2015 Alignment** - Use the internationally recognized quality management framework as the foundation
2. **Geologist-Centered Peer Review** - Leverage our domain experts (geologists) as primary quality gatekeepers
3. **Data Model Accuracy** - Focus on validation of geological data models, schemas, and interpretations
4. **JORC/CIM Competent Person Principles** - Incorporate mineral industry standards for qualified review
5. **Continuous Improvement** - Build in mechanisms for iterative quality enhancement

### Saudi Context (GDAC Tender Requirements)

From the **RFQ-REQUIREMENTS-VERBATIM-EN.md**:
- Quality Assurance is worth **10% of the Technical & Administrative evaluation** (60% of total)
- Required: "Valid quality policy/certificate and HSE policy/certificate"
- Evaluation question: "What are the quality assurance standards? (provide evidence)"

---

## Use Cases

1. **GDAC-SA Tender Compliance** - Primary use case: satisfy the 10% quality assurance requirement for the Saudi bid
2. **LithoSurfer Data Ingestion** - Quality control for data extraction from scientific publications
3. **Client Data Services** - Quality assurance for data compilation projects (e.g., AusScope EarthBank)
4. **Data Model Validation** - Peer review of ontologies, schemas, and data models before deployment
5. **Research Partnerships** - Demonstrate quality standards to academic partners (CSIRO, universities)
6. **Future ISO Certification** - Lay groundwork for formal ISO 9001 certification if needed

---

## Research Findings

### ISO 9001 for Technology/Data Services Companies

Based on web research, ISO 9001:2015 for tech companies typically includes:

| Component | Description | Relevance to Lithodat |
|-----------|-------------|----------------------|
| Quality Policy | High-level commitment statement | Document commitment to geological data accuracy |
| Quality Objectives | Measurable goals | Data accuracy rates, error detection KPIs |
| Process Documentation | SOPs for key activities | Data extraction, validation, peer review |
| Document Control | Version control, change management | Schema versions, ontology updates |
| Internal Audits | Periodic self-assessment | Quarterly data quality reviews |
| Corrective Actions | Non-conformance handling | Error correction procedures |
| Management Review | Leadership oversight | Monthly/quarterly quality metrics review |
| Competence Requirements | Staff qualifications | Geologist qualifications for review roles |

### USGS Data Quality Best Practices

From [USGS Data Quality Assessment and Review](https://www.usgs.gov/data-management/data-quality-assessment-and-review-recommended-practices):
- Data collection must be **documented** to describe methods, accuracy, and quality assurance processes
- **Peer review** is essential for scientific information
- Must facilitate **reproducibility** by other qualified scientists
- Need **transparency** about data and methods used

### JORC Code Competent Person Model

From [JORC Competent Person Requirements](https://www.jorc.org/competent/):
- **Competent Person** = qualified geologist with minimum 5 years relevant experience
- Self-assessment of competence based on qualifications and experience
- **Peer review** identified as critical for establishing competence and report quality
- Use of **Competent Person teams** for complex projects

### Mineral Exploration QA/QC Best Practices

From [GeoScience World - Practical Applications of QA/QC](https://pubs.geoscienceworld.org/gsl/geea/article/24/2/geochem2023-046):
- QA/QC interpretation should be **quantitative** for benchmarking
- Require **Standard Operating Procedures (SOPs)** that are periodically reviewed
- **External audits** by qualified persons for larger programs
- Document sample flow and procedures

---

## Requirements

### Functional Requirements

- [ ] Quality Policy document articulating commitment to geological data accuracy
- [ ] Quality objectives with measurable KPIs (e.g., data accuracy rate, peer review coverage)
- [ ] Defined roles for data quality reviewers (geologists as "Competent Persons")
- [ ] Peer review workflow with documented approval gates
- [ ] Non-conformance/error tracking and corrective action procedures
- [ ] Document control system for procedures and schemas
- [ ] Internal audit schedule and procedures
- [ ] Management review process with quality metrics dashboard

### Technical Requirements

- [ ] SOPs for all data processing workflows (extraction, validation, ingestion)
- [ ] Data validation checklists aligned with geological best practices
- [ ] Quality records storage (audit trails, review logs)
- [ ] Competence matrix for geologist reviewers (qualifications, experience areas)
- [ ] Integration with existing Lithodat systems (LithoSurfer, data extraction workflows)

---

## Implementation Options

### Option 1: Lightweight QMS Documentation (Tender-Ready)

**Approach:**
Create policy documents, SOPs, and quality procedures as markdown/PDF documents that can be submitted with the GDAC tender. Focus on demonstrating commitment and approach rather than full operational implementation.

**Deliverables:**
- Quality Policy (1-2 pages)
- Quality Objectives and KPIs document
- Peer Review Procedure SOP
- Data Validation Checklist
- Competence Requirements for Reviewers
- Organizational Quality Structure chart

**Pros:**
- ✅ Fast to produce (days, not weeks)
- ✅ Satisfies tender requirements for "evidence" of quality standards
- ✅ Can be refined based on actual contract needs
- ✅ Low effort, high impact for bid scoring

**Cons:**
- ❌ Not operationally implemented yet
- ❌ Would need implementation if contract awarded
- ❌ May lack the depth of a full ISO 9001 system

**Effort:** Low-Medium (2-3 days)

---

### Option 2: Geologist Peer Review Workflow in VSM Platform

**Approach:**
Build a digital workflow in the VSS platform where geologists can:
- Review data extractions before final ingestion
- Approve/reject with structured feedback
- Track quality metrics and error rates
- Log competence/qualifications

**Pros:**
- ✅ Operationally functional
- ✅ Demonstrates sophisticated quality management
- ✅ Provides actual quality data for tender evidence
- ✅ Could be used internally immediately

**Cons:**
- ❌ Higher development effort
- ❌ May not be needed for tender submission (documentation may suffice)
- ❌ Scope creep risk

**Effort:** High (2-4 weeks development)

---

### Option 3: ISO 9001-Aligned Documentation + Key Processes

**Approach:**
Create comprehensive QMS documentation following ISO 9001:2015 clause structure, plus implement 2-3 key operational procedures:
1. Peer Review Process (using existing tools - e.g., Google Docs, Jira)
2. Competence Register (spreadsheet of geologist qualifications)
3. Quality Metrics Tracking (monthly KPI tracking)

**Pros:**
- ✅ Credible ISO-aligned framework
- ✅ Some operational implementation
- ✅ Demonstrates both policy AND practice
- ✅ Provides evidence of functional QMS

**Cons:**
- ❌ Medium effort required
- ❌ Need to maintain the processes going forward

**Effort:** Medium (1-2 weeks)

---

## Recommended Approach for GDAC Tender

**Selected Approach:** Option 3 (ISO 9001-Aligned Documentation + Key Processes)

This balances:
- **Credibility**: ISO 9001 structure shows professionalism
- **Evidence**: Operational processes provide concrete proof
- **Feasibility**: Achievable before tender deadline
- **Geological Focus**: Emphasizes our unique strength (geologist expertise)

---

## Implementation Plan

**Phase 1: Core Documentation (Days 1-3)**

1. [ ] Draft Quality Policy (1-page statement of commitment)
2. [ ] Create Quality Objectives document with measurable KPIs
3. [ ] Define organizational quality structure (roles, responsibilities)
4. [ ] Document Competence Requirements for Geological Reviewers

**Phase 2: Peer Review Process (Days 4-5)**

5. [ ] Create Geological Data Peer Review SOP
6. [ ] Develop Data Validation Checklists (by data type)
7. [ ] Establish Competence Register template (geologist qualifications)
8. [ ] Define non-conformance and corrective action procedure

**Phase 3: Operational Setup (Days 6-7)**

9. [ ] Create Competence Register with current Lithodat geologists
10. [ ] Set up quality metrics tracking (spreadsheet/simple dashboard)
11. [ ] Conduct pilot peer review on sample data extraction
12. [ ] Document evidence of functional QMS for tender

---

## Proposed Quality Structure for Lithodat

### Quality Roles

| Role | Responsibilities | Suggested Assignee |
|------|-----------------|-------------------|
| **Quality Manager** | Overall QMS oversight, audits, management review | Keith Dimech (COO) |
| **Lead Geologist - Quality** | Peer review standards, competence assessment | Wayne Noble (Technical Director) |
| **Competent Reviewer (Geochemistry)** | Peer review of geochemistry data | Fun Meeuws, Juan Baca |
| **Competent Reviewer (Geochronology)** | Peer review of geochronology data | Alejandra Bedoya, Lujia Yang |
| **Competent Reviewer (General Geology)** | Peer review of general geological data | Wayne Noble, Benjamin Dib |
| **Data Quality Coordinator** | Track metrics, coordinate reviews | Fabian Kohlmann (CEO) |

### Quality KPIs

| KPI | Target | Measurement Method |
|-----|--------|-------------------|
| Peer Review Coverage | 100% of published data reviewed | Review log tracking |
| Data Accuracy Rate | >98% | Post-review error audits |
| Review Turnaround | <48 hours | Review timestamp tracking |
| Corrective Actions Closed | 100% within 30 days | Corrective action log |
| Competence Maintenance | Annual review of all reviewers | Competence register updates |

---

## Files to Create

### New Documentation Files (in `build-data/06 gdac-tender/documentation/quality-management/`)

| File | Purpose |
|------|---------|
| `QMS-001-Quality-Policy.md` | High-level quality commitment statement |
| `QMS-002-Quality-Objectives.md` | Measurable quality goals and KPIs |
| `QMS-003-Quality-Manual.md` | Overview of QMS structure (ISO 9001 aligned) |
| `SOP-001-Peer-Review-Process.md` | Standard Operating Procedure for geological peer review |
| `SOP-002-Data-Validation-Checklists.md` | Checklists by data type (geochemistry, geochronology, etc.) |
| `SOP-003-Non-Conformance-Procedure.md` | How to handle data quality issues |
| `REG-001-Competence-Register.xlsx` | Register of qualified reviewers with experience areas |
| `FORM-001-Peer-Review-Record.md` | Template for documenting peer reviews |
| `FORM-002-Corrective-Action-Request.md` | Template for corrective actions |
| `ORG-Quality-Structure.svg` | Organizational chart for quality roles |

---

## Saudi/GDAC-Specific Considerations

### Evidence to Provide in Tender

The RFQ asks: "What are the quality assurance standards? (provide evidence)"

**Evidence package should include:**
1. Quality Policy document (signed by CEO)
2. Quality Manual summary
3. SOPs for data validation and peer review
4. Competence Register excerpt (showing qualified geologists)
5. Sample peer review record (demonstrating operational use)
6. Quality metrics summary (if available)

### Alignment with Saudi Geological Survey Standards

- Saudi Arabia's National Geological Database requires "reliable, quality-controlled collection processing workflows"
- Emphasize alignment with international standards (ISO 9001, JORC principles)
- Highlight geologist qualifications (Wayne Noble's Vistelius Award adds credibility)
- Reference experience with government data programs (AusScope, CSIRO partnerships)

---

## Notes

- **Timing**: This QMS should be developed before the GDAC tender submission deadline
- **Scope**: Focus on data quality (not general business quality) - this is our differentiator
- **Geologist-Centric**: Emphasize that domain experts (geologists) are the quality gatekeepers, not just software processes
- **ISO 9001:2026**: A new version is expected in 2026 - current documentation should use 2015 framework but remain flexible
- **Future Certification**: If Lithodat pursues formal ISO 9001 certification later, this documentation provides a foundation

---

## Additional Research (2025-12-02)

### USGS Data Strategy 2023-33

From [USGS Data Strategy 2023-33](https://pubs.usgs.gov/publication/cir1517/full):
- USGS has long recognized the **strategic importance and value of well-managed data assets** as integral to scientific integrity
- Data-quality management is a process where protocols and methods ensure data are properly collected, handled, processed, used, and maintained at **all stages of the scientific data lifecycle**
- **QA (Quality Assurance)** = defect prevention (applied BEFORE and DURING data acquisition)
- **QC (Quality Control)** = defect detection (applied AFTER data are in hand)

### Quality Assurance Plans (QAPs)

From [USGS Quality Assurance Plans](https://www.usgs.gov/data-management/quality-assurance-plans-recommended-practices-and-examples):
- A Quality Assurance Plan (QAP) defines **criteria and processes** that ensure data meet specific data-quality objectives throughout the Data Lifecycle
- Covers full data lifecycle from **Acquisition through Publication**
- Focus on: quality goals, criteria, assessment, and validation methods
- USGS goal: **complete QMS implementation in all USGS laboratories by 2024**

### FAIR Data Principles

From [State of the Data: FAIR Assessment](https://datascience.codata.org/articles/10.5334/dsj-2024-022):
- USGS designed a methodology for **quantitative analysis of FAIR characteristics** (Findable, Accessible, Interoperable, Reusable)
- New rubric derived from crosswalk of existing FAIR evaluation frameworks
- Relevant for demonstrating data quality to government clients like Saudi Arabia

### Geochemistry QA/QC Standards

From [USGS Geochemical QA/QC Primer](https://pubs.usgs.gov/of/2011/1187/pdf/ofr2011-1187.pdf):
- QA/QC involves monitoring **precision, accuracy, and potential contamination** from sampling to analysis
- **Duplicates:** 5-10% field duplicates, 3-5% pulp duplicates
- **Standards:** 3-5% certified reference materials per batch
- **Blanks:** Include samples below detection limit
- **Up to 70% of QC mistakes occur due to field errors** - emphasizes importance of SOPs

### ISO 9001 Implementation Lessons (Case Studies)

From [Dell ISO 9001 Case Study](https://advisera.com/9001academy/blog/2019/05/28/iso-9001-implementation-case-study-dells-experience/):
- Dell created a **web-based tool (BMIS)** embedding ISO 9001 requirements into workflow
- Cross-functional implementation team with area-specific responsibilities

From [Telecom NOC Case Study](http://www.ieomsociety.org/singapore2021/papers/13.pdf):
- Benefits: **defining indicators, agreements with providers, risk response planning, increased staff motivation**
- Once certified, able to **accredit new government contracts**

General findings:
- **66% report improved products/services**
- **60% experience reduction in errors**
- **65% notice increased consumer trust**

---

## Lithodat Team Competence Analysis

Based on team resumes and HR feedback surveys, here is the competence profile for QMS reviewer roles:

### Leadership Team

| Name | Role | Qualifications | Years Experience | Relevant Expertise | HR Self-Assessment (Avg) |
|------|------|----------------|------------------|-------------------|--------------------------|
| **Dr. Wayne Noble** | CIO/Technical Director | PhD Geology (La Trobe), GradDip CompSci (RMIT) | 7+ years Lithodat, 12+ years MYOB, 4+ years research | Thermochronology, Fission Track, Agile, OKRs | 9.4/10 |
| **Dr. Fabian Kohlmann** | CEO/Managing Director | PhD (Melbourne) | 6+ years Lithodat, 4.5 years Halliburton | Thermochronology, Thermal Histories, Geodynamics | 9.1/10 |
| **Keith Dimech** | COO | BSc Hons Geophysics (Melbourne), Exec MBA (RMIT) | ISO 9001/14001 experience at John Holland | Environmental data, ESDAT databases, Carbon accounting | 8.3/10 |
| **Moritz Theile** | CTO | Computational Science (TUM) | 6+ years Lithodat | Software architecture, Data modeling, AWS | 8.4/10 |
| **Vinko Novak** | Consultant | Diplom Informatiker (TUM) | 18+ years digital transformation | Domain-Driven Design, Architecture reviews | N/A |

### Technical/Geoscience Team

| Name | Role | Qualifications | Years Experience | Relevant Expertise | HR Self-Assessment |
|------|------|----------------|------------------|-------------------|---------------------|
| **Dr. Alejandra Bedoya** | Data Entry Specialist | PhD (Adelaide), MSc (UNAM), Geological Engineer | 3+ years Lithodat, Colombian Geological Survey | Geochronology, Thermochronology, Tectonics | 8.1/10 |
| **Dr. Fun Meeuws** | Geochemistry Data Specialist | PhD Geology (Adelaide), MSc (Ghent) | 5+ years research (Adelaide), 4 months Lithodat | Geochemistry, Fission Track, Thermal History Modelling | N/A |
| **Benjamin Dib** | Data Clerk | BSc Space Science (RMIT - current) | 10 months Lithodat | Planetary geochemistry, QA testing, R programming | 7.1/10 |
| **Lujia Yang** | Developer | MSc Data Science (Melbourne), BSc Computing (Melbourne) | 1 year Lithodat | React, SQL, Data Science | N/A (new hire) |

### Key Observations for QMS

1. **Strong Geoscience Leadership:** Wayne (PhD Geology, Vistelius Award background) and Fabian (Halliburton Thermochronology lead) provide credible "Competent Person" credentials
2. **ISO Experience:** Keith has direct ISO 9001/14001 authorship experience from John Holland Water projects
3. **Domain Experts Available:** Alejandra (geochronology), Fun (geochemistry/fission track) have PhD-level specializations
4. **Quality Culture Evidence:** HR survey shows high tool effectiveness (avg 8.5/10) and skill development support (avg 8.9/10)
5. **Skills to Develop:** Team members identified AI/automation skills as growth areas - relevant for future QMS automation

### Team Satisfaction Indicators (from HR Feedback Surveys)

| Metric | Average Rating | Implication for QMS |
|--------|---------------|---------------------|
| Autonomy | 8.4/10 | Team capable of self-directed peer review |
| Motivation | 8.8/10 | High engagement supports quality culture |
| Support | 8.5/10 | Good foundation for collaborative review |
| Tools Effectiveness | 8.5/10 | Existing tools adequate for QMS processes |
| Collaboration Ease | 7.5/10 | Some room for improvement - QMS can help |
| Career Path Clarity | 8.1/10 | Clear roles support competence development |

---

## Research Sources

- [ISO 9001:2015 Standard](https://www.iso.org/standard/62085.html)
- [USGS Data Quality Assessment and Review](https://www.usgs.gov/data-management/data-quality-assessment-and-review-recommended-practices)
- [USGS Data Strategy 2023-33](https://pubs.usgs.gov/publication/cir1517/full)
- [USGS Quality Assurance Plans](https://www.usgs.gov/data-management/quality-assurance-plans-recommended-practices-and-examples)
- [USGS Geochemical QA/QC Primer](https://pubs.usgs.gov/of/2011/1187/pdf/ofr2011-1187.pdf)
- [JORC Competent Person Requirements](https://www.jorc.org/competent/)
- [GeoScience World - QA/QC Best Practices](https://pubs.geoscienceworld.org/gsl/geea/article/24/2/geochem2023-046)
- [AusIMM JORC Baseline Review](https://www.ausimm.com/globalassets/downloads/jorc-competent-person---a-baseline-review-in-a-global-context-june-2022-final.pdf)
- [Saudi Geological Survey](https://sgs.gov.sa/en)
- [Oxebridge Free ISO 9001 Templates](https://www.oxebridge.com/emma/iso9001-template-kit/)
- [Dell ISO 9001 Case Study](https://advisera.com/9001academy/blog/2019/05/28/iso-9001-implementation-case-study-dells-experience/)
- [FAIR Data Principles Assessment](https://datascience.codata.org/articles/10.5334/dsj-2024-022)
- Lithodat Team Resumes (build-data/06 gdac-tender/learning/People/)
- Lithodat HR Feedback Survey Data (VSS Platform Database)

---

**Use `/idea-mode` to start implementation with full audit trail.**

<!-- Implementation sessions will be appended below this line -->

---
