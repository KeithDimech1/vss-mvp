# GDAC Tender Documentation Index

**Last Updated:** 2025-12-02
**Purpose:** Saudi Arabia GDAC tender response materials for Lithodat Pty Ltd

---

## Quick Navigation

### Response Forms (Used by Application)

The 6 main tender response forms have been moved to `src/content/tender-forms/` as they are read by the VSM Platform application:

| Form | Description | App Location |
|------|-------------|--------------|
| FORM-9.1 | Applicant Information | `src/content/tender-forms/FORM-9.1-APPLICANT-INFORMATION.md` |
| FORM-9.2 | Technical & Administrative Capabilities | `src/content/tender-forms/FORM-9.2-TECHNICAL-ADMINISTRATIVE-CAPABILITIES.md` |
| FORM-9.3 | Administrative Staff Experience | `src/content/tender-forms/FORM-9.3-ADMINISTRATIVE-STAFF-EXPERIENCE.md` |
| FORM-9.4 | Professional Staff Experience | `src/content/tender-forms/FORM-9.4-PROFESSIONAL-STAFF-EXPERIENCE.md` |
| FORM-9.5 | Similar Projects | `src/content/tender-forms/FORM-9.5-SIMILAR-PROJECTS.md` |
| FORM-9.6 | Financial Capacity Criteria | `src/content/tender-forms/FORM-9.6-FINANCIAL-CAPACITY-CRITERIA.md` |

---

## Folder Structure

```
06 gdac-tender/
├── INDEX.md                    ← You are here
├── TIDYING-PLAN.md            ← Reorganization documentation
│
├── response/                   ← Tender response documents
│   ├── offline/               ← Condensed offline reference copies
│   ├── emails/                ← ETIMAD, LEI, MISA correspondence
│   └── BOARD-RESOLUTION-SAUDI-EXPANSION.html
│
├── documentation/              ← RFQ analysis and guides
│   ├── CR-APPLICATION-CHECKLIST.md
│   ├── LITHODAT-DOCUMENT-ACQUISITION-GUIDE.md
│   ├── RFQ-REQUIREMENTS-VERBATIM-AR.md
│   ├── RFQ-REQUIREMENTS-VERBATIM-EN.md
│   ├── RFQ-SOURCE-ANALYSIS.md
│   └── SAUDI-EMBASSY-AUTHENTICATION-GUIDE.md
│
├── assets/                     ← Source documents
│   └── archive/               ← Original RFQ text files (raw)
│
└── learning/                   ← Supporting evidence and research
    ├── Financial-Statements/   ← FY2023-2025 financials
    ├── People/                 ← Team profiles and CVs
    ├── R&D-Projects/          ← EarthBank, Isotopes.au, LithoSpace
    ├── Saudi-Regulatory/      ← MISA manuals and guides
    ├── Reference/             ← ChatGPT drafts and templates
    └── archive/               ← Old MISA v12.3 files
```

---

## Response Documents

### Offline Form Copies (`response/offline/`)

Condensed versions for offline reference:
- `FORM-9.1-APPLICANT-INFORMATION-OFFLINE.md`
- `FORM-9.2-TECHNICAL-ADMINISTRATIVE-CAPABILITIES-OFFLINE.md`
- `FORM-9.3-ADMINISTRATIVE-STAFF-EXPERIENCE-OFFLINE.md`
- `FORM-9.4-PROFESSIONAL-STAFF-EXPERIENCE-OFFLINE.md`
- `FORM-9.5-SIMILAR-PROJECTS-OFFLINE.md`
- `FORM-9.6-FINANCIAL-CAPACITY-CRITERIA-OFFLINE.md`

### Email Correspondence (`response/emails/`)

| File | Description |
|------|-------------|
| `email-mahdi-abuali-introduction.html` | Introduction to Saudi facilitator |
| `ETIMAD-REGISTRATION-EMAIL.html` | ETIMAD registration confirmation |
| `ETIMAD-REGISTRATION-EMAIL-PLAIN.html` | Plain text version |
| `ETIMAD-REGISTRATION-RESPONSE.md` | Markdown summary |
| `LEI-LETTER-OF-AUTHORIZATION.html` | LEI registration authorization |
| `LEI-EVIDENCE-OF-AUTHORITY.html` | Evidence of authority (HTML) |
| `LEI-EVIDENCE-OF-AUTHORITY.md` | Evidence of authority (MD) |
| `MISA-CLARIFICATION-REQUEST.html` | MISA clarification request |
| `MISA-REJECTION-NEXT-STEPS-FABIAN.html` | Next steps after MISA rejection |

### Other Response Documents

- `BOARD-RESOLUTION-SAUDI-EXPANSION.html` - Board resolution authorizing Saudi expansion

---

## Documentation

### RFQ Analysis (`documentation/`)

| File | Description |
|------|-------------|
| `RFQ-SOURCE-ANALYSIS.md` | Detailed analysis of RFQ requirements |
| `RFQ-REQUIREMENTS-VERBATIM-EN.md` | English requirements with section references |
| `RFQ-REQUIREMENTS-VERBATIM-AR.md` | Arabic requirements with section references |
| `CR-APPLICATION-CHECKLIST.md` | Commercial Registration checklist |
| `LITHODAT-DOCUMENT-ACQUISITION-GUIDE.md` | Guide to compiling required documents |
| `SAUDI-EMBASSY-AUTHENTICATION-GUIDE.md` | Document authentication procedures |

---

## Learning Materials

### Financial Statements (`learning/Financial-Statements/`)

```
Financial-Statements/
├── INDEX.md              ← Financial summary and company details
├── FY2023/              ← Fiscal Year 2023 documents
├── FY2024/              ← Fiscal Year 2024 documents
├── FY2025/              ← Fiscal Year 2025 documents (current)
└── Corporate/           ← ASIC certificates, LEI authorization
```

**Key Metrics (from INDEX.md):**
- 3-year revenue CAGR: 62.8%
- 3-year profit CAGR: 151.2%

### Team Profiles (`learning/People/`)

```
People/
├── README.md            ← Master team directory
├── Leadership/          ← Fabian, Wayne, Keith, Moritz, Vinko
├── Technical-Team/      ← Benjamin, Lujia, Alejandra, Fun
├── Consultants/         ← Behnam, Pedro, Juan, Qusay, Mahdi
└── Assets/              ← Shareholding structure, awards
```

### R&D Projects (`learning/R&D-Projects/`)

| Project | Description | Key Evidence |
|---------|-------------|--------------|
| **EarthBank** | AuScope NCRIS $19M national geoscience platform | Chemical Geology 2025 publication, Saudi proposal |
| **Isotopes-Au** | National isotope data infrastructure (CSIRO, ANSTO, GA) | R&D reports, ontology validation |
| **LithoSpace** | Extraterrestrial geochemistry (lunar, Mars data) | 25+ missions data, experiment reports |

### Saudi Regulatory (`learning/Saudi-Regulatory/`)

| File | Description |
|------|-------------|
| `MISA-Service-manual-12-4-1-edition-English.pdf` | Latest MISA manual (official) |
| `MISA-Service-Manual-12th-Edition-2025.md` | Markdown summary of MISA manual |
| `SAUDI-CONTRACT-GUIDE.md` | Saudi contract law and compliance guide |

### Reference Materials (`learning/Reference/`)

- `answers/ChatGPT answers/` - AI-generated draft responses for tender questions

### Archive (`learning/archive/`)

- `MISA-v12.3/` - Older MISA manual versions (superseded by v12.4.1)

---

## File Naming Convention

All files follow kebab-case naming:
- Lowercase letters
- Hyphens instead of spaces
- No parentheses or special characters
- Descriptive names (e.g., `shareholding-structure.png` not `image.png`)

---

## Maintenance Notes

**Reorganized:** 2025-12-02

Changes made:
1. Moved 6 app-dependent forms to `src/content/tender-forms/`
2. Fixed typo: `Finanical Statements` → `Financial-Statements`
3. Merged `email/` and `emails/` folders
4. Created `Saudi-Regulatory/` for MISA documents
5. Created `R&D-Projects/` for EarthBank, Isotopes, LithoSpace
6. Organized `People/` into Leadership/Technical/Consultants
7. Organized `Financial-Statements/` by fiscal year
8. Standardized all file names to kebab-case
9. Archived old MISA v12.3 and raw RFQ text files
