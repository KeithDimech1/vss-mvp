# Lesson 01: Financial Statement Extraction Methodology for Australian Companies

**Agent:** Dollar Bill (Accountant)
**Created:** 2026-01-11
**Target Unknown:** How to systematically extract financial information from Australian company PDF documents and create structured, reusable markdown records
**Status:** Active - Testing (1/3 tasks completed)

---

## What This Lesson Covers

This lesson documents a comprehensive methodology for extracting financial information from Australian company documents (financial statements, tax returns, ASIC extracts, R&D schedules) and creating structured markdown documentation suitable for:
- Tender submissions (proving financial capacity)
- Due diligence processes
- Business valuations
- Financial analysis and reporting
- Historical record-keeping

---

## Document Types Covered

### 1. Annual Financial Statements (Annual Report)
**Typical Pages:** 9-10 pages
**Key Sections:**
- Income Statement (P&L)
- Balance Sheet (Statement of Financial Position)
- Notes to Financial Statements
- Directors' Declaration
- Compilation Report (from accountant/auditor)

### 2. Company Tax Return (CTR)
**Typical Pages:** 8 pages
**Key Sections:**
- Item 6: Calculation of Total Profit or Loss
- Item 7: Reconciliation to Taxable Income
- Item 8: Financial and Other Information
- Tax Calculation Statement
- R&D Tax Incentive Schedule (if applicable)

### 3. Tax Reconciliation Worksheet
**Typical Pages:** 1 page
**Key Information:**
- Reconciliation from accounting profit to taxable income
- Add-backs (non-deductible expenses)
- Deductions (non-assessable income)
- Final tax payable or refund calculation

### 4. ASIC Company Extract
**Typical Pages:** Variable (can be 10-50 pages)
**Key Information:**
- Company registration details (ABN, ACN, registration date)
- Registered office and principal place of business
- Directors and officeholders
- Shareholders and share structure
- Company status

### 5. R&D Tax Incentive Schedule
**Part of CTR, typically 2-3 pages**
**Note:** R&D extraction is handled by a separate Haiku sub-agent task (not part of main extraction workflow)

---

## Extraction Methodology

**Important Note:** R&D Tax Incentive extraction (IISA registration, notional R&D deductions, offset calculations) is NOT included in this main extraction workflow. R&D details should be delegated to a separate Haiku sub-agent task for efficiency and focus.

### Step 1: Document Conversion (5-10 minutes)

**Goal:** Convert PDF documents to readable text format for analysis

**Method:**
1. Use `textutil` or `pdftotext` to convert PDFs to text files
   ```bash
   textutil -convert txt "FY2025 Annual Report.pdf" -output "annual-report.txt"
   ```
2. Alternatively, use Claude's Read tool which can directly read PDF files
3. Create a working directory structure:
   ```
   Financial-Statements/
   ├── FY2023/
   │   ├── Annual-Report.pdf
   │   ├── CTR.pdf
   │   ├── Tax-Reconciliation.pdf
   │   └── FY2023-EXTRACTION.md (output)
   ├── FY2024/
   ├── FY2025/
   ├── Corporate/
   │   ├── ASIC-Extract.pdf
   │   └── ASIC-INDEX.md (output)
   └── INDEX.md (master summary)
   ```

### Step 2: Extract Company Information (10-15 minutes)

**From:** ASIC Company Extract, Annual Report header, CTR

**Information to Capture:**

| Field | Where to Find | Example |
|-------|---------------|---------|
| Company Name | ASIC Extract, Annual Report | LITHODAT PTY. LTD. |
| ABN | ASIC Extract, CTR, Annual Report | 63 627 008 904 |
| ACN | ASIC Extract | 627 008 904 |
| TFN | CTR | 452 382 055 |
| Date Registered | ASIC Extract | 25-06-2018 |
| Industry Code | ASIC Extract, CTR | B 69250 |
| Industry Description | ASIC Extract | Geological and geophysical consultancy service |
| Company Type | ASIC Extract | Australian Proprietary Company |
| Company Status | ASIC Extract | Registered |
| Base Rate Entity | CTR Item 8 | Yes (25% tax rate) |
| Small Business Entity | CTR Item 8 | Yes |

**Directors & Shareholders:**
- Extract from ASIC Extract (full names, addresses, appointment dates)
- Note percentage ownership for shareholders

**Registered Office & Principal Place of Business:**
- Full addresses from ASIC Extract

**Tax Agent:**
- Name, reference number, contact details from CTR

### Step 3: Extract Income Statement (30-40 minutes per year)

**From:** Annual Report (typically pages 2-3)

**Structure:**

```markdown
## Income Statement

### For the Year Ended 30 June [YEAR]

#### Revenue

| Item | FY[YEAR] | FY[YEAR-1] | Variance | % Change |
|------|----------|------------|----------|----------|
| Sales | $X,XXX,XXX | $X,XXX,XXX | +$XXX,XXX | +XX.X% |
| **Total Income** | **$X,XXX,XXX** | **$X,XXX,XXX** | +$XXX,XXX | +XX.X% |

#### Other Income

| Item | FY[YEAR] | FY[YEAR-1] | Variance |
|------|----------|------------|----------|
| Interest Income | $X,XXX | $X,XXX | +$XXX |
| Government Grant | $XX,XXX | $XX,XXX | +$XX,XXX |
| R&D Offset Income | $XXX,XXX | $XXX,XXX | +$XX,XXX |
| Foreign Currency Gains | $X,XXX | $X,XXX | +$XXX |
| **Total Other Income** | **$XXX,XXX** | **$XXX,XXX** | +$XXX,XXX |

#### Operating Expenses

| Expense Category | FY[YEAR] | FY[YEAR-1] | Variance | % Change |
|------------------|----------|------------|----------|----------|
| Wages and Salaries | $XXX,XXX | $XXX,XXX | +$XX,XXX | +XX.X% |
| Superannuation | $XX,XXX | $XX,XXX | +$X,XXX | +XX.X% |
| Consulting | $XXX,XXX | $XXX,XXX | +$XX,XXX | +XX.X% |
| Travel and Accommodation | $XXX,XXX | $XX,XXX | +$XX,XXX | +XX.X% |
| Subscriptions | $XX,XXX | $XX,XXX | +$XX,XXX | +XX.X% |
| Conferences & Trade Fairs | $XX,XXX | $XX,XXX | +$X,XXX | +XX.X% |
| [... all expense categories ...] | | | | |
| **Total Expenses** | **$X,XXX,XXX** | **$XXX,XXX** | +$XXX,XXX | +XX.X% |

#### Profit Summary

| Item | FY[YEAR] | FY[YEAR-1] | Variance | % Change |
|------|----------|------------|----------|----------|
| Profit Before Tax | $XXX,XXX | $XX,XXX | +$XX,XXX | +XXX.X% |
| Income Tax Expense | $XXX,XXX | $XX,XXX | +$XX,XXX | +XXX.X% |
| **Net Profit After Tax** | **$XXX,XXX** | **$XX,XXX** | +$XX,XXX | +XXX.X% |
```

**Key Tips:**
- Always calculate variances (current year - prior year)
- Calculate percentage changes: (Variance / Prior Year) × 100%
- Flag significant variances (>50% change) for further investigation
- Reconcile Total Income from Annual Report with CTR Item 6

### Step 4: Extract Balance Sheet (20-30 minutes per year)

**From:** Annual Report (typically pages 3-4)

**Structure:**

```markdown
## Balance Sheet

### As at 30 June [YEAR]

#### Assets

##### Current Assets

| Item | 30 Jun [YEAR] | 30 Jun [YEAR-1] | Variance |
|------|---------------|-----------------|----------|
| Cash on Hand | $X,XXX | $X,XXX | $X |
| **Bank Accounts:** | | | |
| - Business Bank Account | $XXX,XXX | $XX,XXX | +$XXX,XXX |
| - Savings Account | $XXX,XXX | $XX,XXX | +$XXX,XXX |
| - Credit Card | ($XX,XXX) | ($XX,XXX) | -$X,XXX |
| **Total Bank Accounts** | **$XXX,XXX** | **$XX,XXX** | +$XXX,XXX |
| Accounts Receivable | $XX,XXX | $XXX,XXX | -$XX,XXX |
| Income Tax Refund | $XX,XXX | $XX,XXX | +$XX,XXX |
| **Total Current Assets** | **$XXX,XXX** | **$XXX,XXX** | +$XXX,XXX |

##### Non-Current Assets

| Item | 30 Jun [YEAR] | 30 Jun [YEAR-1] | Variance |
|------|---------------|-----------------|----------|
| Trademarks | $XX,XXX | $XX,XXX | $0 |
| Computer Equipment (Cost) | $XX,XXX | $XX,XXX | $X,XXX |
| Less: Accumulated Depreciation | ($XX,XXX) | ($XX,XXX) | -$X,XXX |
| Motor Vehicle (Cost) | $XX,XXX | $0 | +$XX,XXX |
| Less: Accumulated Depreciation (MV) | ($X,XXX) | $0 | -$X,XXX |
| **Total Non-Current Assets** | **$XX,XXX** | **$XX,XXX** | +$XX,XXX |

##### Total Assets

| Item | 30 Jun [YEAR] | 30 Jun [YEAR-1] | Variance | % Change |
|------|---------------|-----------------|----------|----------|
| **Total Assets** | **$XXX,XXX** | **$XXX,XXX** | +$XXX,XXX | +XXX.X% |

#### Liabilities

##### Current Liabilities

| Item | 30 Jun [YEAR] | 30 Jun [YEAR-1] | Variance |
|------|---------------|-----------------|----------|
| GST Payable | $XX,XXX | $XX,XXX | -$X,XXX |
| PAYG Withholdings Payable | $XX,XXX | $XX,XXX | +$X,XXX |
| Superannuation Payable | $XX,XXX | $X,XXX | +$X,XXX |
| **Total Current Liabilities** | **$XX,XXX** | **$XX,XXX** | +$XX,XXX |

##### Non-Current Liabilities

| Item | 30 Jun [YEAR] | 30 Jun [YEAR-1] | Variance |
|------|---------------|-----------------|----------|
| Hire Purchase Agreement | $XX,XXX | $0 | +$XX,XXX |
| Related Party Loan | $XX,XXX | $XX,XXX | +$X,XXX |
| **Total Non-Current Liabilities** | **$XX,XXX** | **$XX,XXX** | +$XX,XXX |

##### Total Liabilities

| Item | 30 Jun [YEAR] | 30 Jun [YEAR-1] | Variance |
|------|---------------|-----------------|----------|
| **Total Liabilities** | **$XXX,XXX** | **$XX,XXX** | +$XX,XXX |

#### Net Assets & Equity

| Item | 30 Jun [YEAR] | 30 Jun [YEAR-1] | Variance | % Change |
|------|---------------|-----------------|----------|----------|
| **Net Assets** | **$XXX,XXX** | **$XXX,XXX** | +$XXX,XXX | +XXX.X% |
| Retained Earnings | $XXX,XXX | $XXX,XXX | +$XXX,XXX | |
| Share Capital | $1,000 | $1,000 | $0 | |
| **Total Equity** | **$XXX,XXX** | **$XXX,XXX** | +$XXX,XXX | +XXX.X% |
```

**Key Tips:**
- Verify accounting equation: Assets = Liabilities + Equity
- Note any significant asset acquisitions (vehicles, equipment)
- Flag any hire purchase or lease liabilities
- Reconcile Total Assets/Liabilities with CTR Item 8

### Step 5: Extract Company Tax Return Details (20-30 minutes per year)

**From:** Company Tax Return (CTR)

**Key Sections:**

#### Item 6: Calculation of Total Profit or Loss

```markdown
### Calculation of Total Profit or Loss (Item 6)

#### Income

| Label | Item | Amount |
|-------|------|--------|
| C | Other sales of goods and services | $X,XXX,XXX.00 |
| F | Gross interest | $X,XXX.00 |
| R | Total Other gross income | $XXX,XXX.00 |
| **S** | **Total Income** | **$X,XXX,XXX.00** |

#### Expenses

| Label | Item | Amount |
|-------|------|--------|
| A | Cost of sales | $0.00 |
| D | Superannuation expenses | $XX,XXX.00 |
| V | Interest expenses within Australia | $X,XXX.00 |
| X | Depreciation expenses | $X,XXX.00 |
| Y | Motor vehicle expenses | $X,XXX.00 |
| S | All other expenses | $X,XXX,XXX.00 |
| **Q** | **Total expenses** | **$X,XXX,XXX.00** |
| **T** | **Total Profit** | **$XXX,XXX.00** |
```

#### Item 7: Reconciliation to Taxable Income

```markdown
### Reconciliation to Taxable Income (Item 7)

#### Addition Items

| Label | Item | Amount |
|-------|------|--------|
| T | Total profit or loss amount shown at T item 6 | $XXX,XXX.00 |
| G | CGT event during the year? | No |
| W | Non-deductible expenses | $XX,XXX.00 |
| D | Accounting expenditure subject to R&D tax incentive | $XXX,XXX.00 |
| | **Subtotal (Additions)** | **$XXX,XXX.00** |

#### Subtraction Items

| Label | Item | Amount |
|-------|------|--------|
| F | Deduction for decline in value of depreciating assets | $X,XXX.00 |
| X | Other deductible expenses | $XXX,XXX.00 |
| | **Subtraction items subtotal** | **$XXX,XXX.00** |
| **T** | **Taxable/net income** | **$XXX,XXX.00** |
```

#### Item 8: Financial and Other Information

```markdown
### Financial and Other Information (Item 8)

| Label | Item | Amount |
|-------|------|--------|
| C | Trade debtors | $XX,XXX.00 |
| D | All current assets | $XXX,XXX.00 |
| E | Total assets | $XXX,XXX.00 |
| G | All current liabilities | $XX,XXX.00 |
| H | Total liabilities | $XXX,XXX.00 |
| P | Opening franking account balance | $X,XXX.00 |
| M | Closing franking account balance | $X,XXX.00 |
| D | Total salary and wage expenses | $XXX,XXX.00 |
| Q | Payments to associated persons (Code A) | $XXX,XXX.00 |
```

#### Tax Calculation

```markdown
### Tax Calculation Statement

| Label | Item | Amount |
|-------|------|--------|
| A | Taxable or net income | $XXX,XXX.00 |
| T1 | Tax on taxable or net income | $XXX,XXX.XX |
| B | Gross tax (T1 plus M) | $XXX,XXX.XX |
| E | Refundable tax offsets | $XXX,XXX.XX |
| **S** | **Amount refundable / (payable)** | **$XX,XXX.XX** |
```

**Key Tips:**
- Verify CTR Total Income matches Annual Report Total Income
- Note Base Rate Entity status (25% vs 30% tax rate)
- Identify all add-backs (non-deductible expenses, R&D)
- Identify all deductions (prior year accruals, R&D offset income)

### Step 6: Calculate Key Financial Ratios (10-15 minutes per year)

**Standard Ratios to Calculate:**

```markdown
## Key Financial Ratios

| Ratio | Calculation | FY[YEAR] | FY[YEAR-1] | FY[YEAR-2] |
|-------|-------------|----------|------------|------------|
| Net Profit Margin | Net Profit / Total Income | XX.X% | XX.X% | XX.X% |
| Return on Assets | Net Profit / Total Assets | XX.X% | XX.X% | XX.X% |
| Return on Equity | Net Profit / Total Equity | XX.X% | XX.X% | XX.X% |
| Current Ratio | Current Assets / Current Liabilities | X.X:1 | X.X:1 | X.X:1 |
| Debt to Equity | Total Liabilities / Total Equity | X.XX:1 | X.XX:1 | X.XX:1 |
| Asset Turnover | Revenue / Total Assets | X.Xx | X.Xx | X.Xx |
```

**Interpretation Guides:**

| Ratio | Good Range | Interpretation |
|-------|------------|----------------|
| Net Profit Margin | 10-20% | Higher is better (profitability) |
| Return on Assets | 15-25% | Higher is better (asset efficiency) |
| Return on Equity | 20-40% | Higher is better (shareholder returns) |
| Current Ratio | 1.5-2.5:1 | Ability to meet short-term obligations |
| Debt to Equity | <0.5:1 | Lower is better (less financial risk) |
| Asset Turnover | 2-5x | How efficiently assets generate revenue |

### Step 7: Create Multi-Year Summary (30-45 minutes)

**Create a master INDEX.md file with:**

1. **Company Information Section** (one table with all key identifiers)
2. **Three-Year Financial Summary** (revenue, profitability, balance sheet)
3. **Document Index** (links to individual year extractions)
4. **R&D Tax Incentive Summary** (IISA numbers, offsets by year)
5. **Key Financial Ratios** (3-year comparison)
6. **Growth Trajectory** (CAGR calculations)
7. **Notes for Tender Submission** (highlights, context, disclaimers)

**Example Three-Year Financial Summary:**

```markdown
## Three-Year Financial Summary

### Revenue & Profitability

| Metric | FY2023 | FY2024 | FY2025 | YoY Growth (FY24-25) |
|--------|--------|--------|--------|----------------------|
| Sales Revenue | $XXX,XXX | $XXX,XXX | $X,XXX,XXX | +XX.X% |
| Government Grants (R&D) | $XX,XXX | $XXX,XXX | $XXX,XXX | +XX.X% |
| Total Income | $XXX,XXX | $XXX,XXX | $X,XXX,XXX | +XX.X% |
| Total Expenses | $XXX,XXX | $XXX,XXX | $X,XXX,XXX | +XX.X% |
| Profit Before Tax | $XX,XXX | $XXX,XXX | $XXX,XXX | +XXX.X% |
| Income Tax Expense | $XX,XXX | $XX,XXX | $XXX,XXX | +XXX.X% |
| Net Profit After Tax | $XX,XXX | $XX,XXX | $XXX,XXX | +XXX.X% |

### Balance Sheet Position

| Metric | FY2023 | FY2024 | FY2025 | YoY Growth (FY24-25) |
|--------|--------|--------|--------|----------------------|
| Cash Assets | $XX,XXX | $XXX,XXX | $XXX,XXX | +XXX.X% |
| Trade Receivables | $XX,XXX | $XXX,XXX | $XXX,XXX | +XXX.X% |
| Total Assets | $XX,XXX | $XXX,XXX | $XXX,XXX | +XXX.X% |
| Total Liabilities | $XX,XXX | $XX,XXX | $XXX,XXX | +XXX.X% |
| Net Assets/Equity | $XX,XXX | $XXX,XXX | $XXX,XXX | +XXX.X% |

### Tax Position

| Metric | FY2023 | FY2024 | FY2025 |
|--------|--------|--------|--------|
| Aggregated Turnover | $XXX,XXX | $XXX,XXX | $X,XXX,XXX |
| Base Rate Entity Status | Yes | Yes | Yes |
| Tax Rate Applied | 25% | 25% | 25% |
| R&D Tax Offset | $XX,XXX.XX | $XX,XXX.XX | $XXX,XXX.XX |
| Tax Refundable | $XX,XXX.XX | $XX,XXX.XX | $XX,XXX.XX |
```

**CAGR Calculation (Compound Annual Growth Rate):**

```
CAGR = ((End Value / Start Value)^(1 / Number of Years)) - 1

Example: Revenue growth FY2023 → FY2025 (2 years)
CAGR = (($1,192,265 / $450,125)^(1/2)) - 1 = 62.8%
```

---

## Output Format Standards

### Individual Year Extraction Files

**Filename Convention:** `FY[YEAR]-EXTRACTION.md`
**Example:** `FY2025-EXTRACTION.md`

**Required Sections:**
1. Document Summary (envelope IDs, signing dates)
2. Company Details
3. Income Statement (full detail)
4. Balance Sheet (full detail)
5. Company Tax Return Details (items 6, 7, 8)
6. Tax Calculation Statement
7. Tax Reconciliation Worksheet
8. Notes to Financial Statements
9. Directors' Declaration
10. Key Financial Ratios
11. Cash Position Analysis
12. Employee & Related Party Information
13. Summary Statistics
14. Document Verification

**Note:** R&D Tax Incentive details (if applicable) should be extracted separately using a Haiku sub-agent for efficiency.

**Target Length:** 550-650 lines per year (excluding R&D details which are extracted separately)

### Master INDEX File

**Filename:** `INDEX.md`
**Location:** Parent directory of all year folders

**Required Sections:**
1. Company Information (one table)
2. Three-Year Financial Summary (revenue, balance sheet, tax)
3. Document Index (links to extractions)
4. R&D Tax Incentive Summary (multi-year)
5. Key Financial Ratios (multi-year)
6. Growth Trajectory (CAGR calculations)
7. Notes for Tender Submission

**Target Length:** 250-300 lines

---

## Quality Checks

### Cross-Validation Checklist

Before finalizing extractions, verify:

- [ ] **ABN Consistency** - Same ABN across all documents
- [ ] **Income Reconciliation** - Annual Report Total Income matches CTR Item 6 Label S
- [ ] **Expense Reconciliation** - Annual Report Total Expenses matches CTR Item 6 Label Q
- [ ] **Profit Reconciliation** - Annual Report Profit Before Tax matches CTR Item 6 Label T
- [ ] **Tax Reconciliation** - Tax Expense in Annual Report matches Tax Calculation
- [ ] **Asset Reconciliation** - Balance Sheet Total Assets matches CTR Item 8 Label E
- [ ] **Liability Reconciliation** - Balance Sheet Total Liabilities matches CTR Item 8 Label H
- [ ] **Accounting Equation** - Assets = Liabilities + Equity (must balance)
- [ ] **R&D Calculation** - (Notional R&D Deductions × 43.5%) = R&D Tax Offset *(delegate to sub-agent)*
- [ ] **Tax Rate** - 25% for Base Rate Entity, 30% for non-BRE
- [ ] **Prior Year Comparatives** - FY[N-1] figures match prior year FY[N-1] extraction

### Common Errors to Watch For

| Error | Impact | How to Catch |
|-------|--------|--------------|
| **ABN Mismatch** | Critical - affects company identity | Compare ABN across all documents |
| **Income Mismatch** | Annual Report vs CTR doesn't reconcile | Cross-check Item 6 Label S with P&L |
| **Expense Misclassification** | Wrong category allocation | Review "All other expenses" line in CTR |
| **R&D Calculation Error** | Wrong offset amount | Verify 43.5% × Notional Deductions |
| **Tax Rate Error** | 25% vs 30% | Check Base Rate Entity status in CTR |
| **Prior Year Restatements** | FY[N-1] differs between years | Note restatements in extraction |
| **Depreciation Mismatch** | Accounting vs Tax depreciation | Check Item 7 add-backs and deductions |
| **Superannuation Accrual** | Prior year accrual not deducted | Check Item 7 deductions |

---

## Tender Submission Considerations

### Financial Capacity Demonstration

When extracting for tender submissions, emphasize:

1. **Growth Trajectory**
   - Revenue CAGR over 3 years
   - Profit CAGR over 3 years
   - Asset growth over 3 years

2. **Financial Stability**
   - Positive net assets/equity
   - Strong cash position
   - Low debt-to-equity ratio
   - Current ratio > 1.5:1

3. **Profitability**
   - Positive net profit all years
   - Improving profit margins
   - Return on equity > 20%

4. **Government Support**
   - R&D tax offsets (demonstrates innovation)
   - Government grants (demonstrates credibility)
   - Aggregated turnover (size indicator)

5. **Compliance**
   - All years' returns lodged on time
   - Directors' declarations signed
   - Compilation reports from registered accountant/tax agent

### Red Flags to Address

If extraction reveals any of these, provide context:

- Net losses in any year
- Declining revenue trend
- Negative equity
- Very high debt-to-equity ratio (>1:1)
- Current ratio < 1:1 (liquidity issues)
- Large accounts receivable (collection issues)
- Unusual expense spikes

---

## Testing This Lesson

**To validate this lesson, Dollar Bill should:**

1. **Task 1:** Complete extraction of Lithodat's FY2023-2025 financial statements for GDAC tender (✅ DONE - 2026-01-11)
2. **Task 2:** Extract financial statements for a different company/client
3. **Task 3:** Extract financial statements for due diligence or business valuation purpose

**Success criteria:**
- All sections extracted completely
- Cross-validations pass (income, expenses, assets match between Annual Report and CTR)
- CAGR calculations correct
- Key ratios calculated accurately
- Extraction completed within estimated timeframes
- Output is suitable for intended purpose (tender, due diligence, etc.)

**After 3+ successful uses:** Teacher audits this lesson and (with user approval) promotes to completed/.

---

## Lesson Status

**Tasks Tested:** 1/3
- [x] Task 1: Lithodat FY2023-2025 extraction for GDAC-SA tender (2026-01-11) - Complete INDEX.md (269 lines) + FY2025-EXTRACTION.md (702 lines) + FY2024-EXTRACTION.md (665 lines) + FY2023-EXTRACTION.md. All cross-validations passed. Successfully demonstrated financial capacity for tender submission.
- [ ] Task 2: [Description pending]
- [ ] Task 3: [Description pending]

**Known Gaps:**
- R&D Tax Incentive extraction needs separate lesson/methodology (delegate to Haiku sub-agent)
- Need to test on company with net losses (how to present positively)
- Need to test on company with complex share structures
- Need to optimize extraction time (currently ~4-5 hours for 3 years, excluding R&D)
- Need to document foreign currency conversion methodology (for international tenders)

**Lessons Learned from Task 1:**
- Bank account changes between years create reconciliation challenges - note changes in extraction
- Restatements of prior year figures common - always note when FY[N-1] in Year N differs from FY[N-1] extraction
- R&D offset income is non-assessable - must be removed in tax reconciliation
- R&D Tax Incentive extraction is complex enough to warrant separate sub-agent task (use Haiku for efficiency)
- Tesla Model Y hire purchase created new liability category - document asset acquisitions thoroughly
- DocuSign envelope IDs useful for document verification

---

## Example: Lithodat GDAC Tender Extraction Summary

**Company:** Lithodat Pty Ltd
**Purpose:** GDAC-SA Saudi Geological Survey Tender Financial Capacity Demonstration
**Years Extracted:** FY2023, FY2024, FY2025
**Total Time:** ~5 hours (3 years)

**Key Highlights Extracted:**
- Strong growth: Revenue $450K → $1.19M (+165% growth over 2 years)
- Profitability: Net profit $25K → $160K (+530% growth over 2 years)
- R&D focus: $78K → $212K in R&D tax offsets (demonstrates innovation)
- Cash positive: $275K cash at 30 June 2025
- Healthy ratios: Current ratio 6:1, Debt-to-equity 0.45:1
- Compliant: All returns lodged, directors' declarations signed

**Documents Extracted:**
- 3 Annual Reports (9-10 pages each)
- 3 Company Tax Returns (8 pages each)
- 3 Tax Reconciliation Worksheets
- 1 ASIC Company Extract
- Master INDEX.md with 3-year summary

**Output Files:**
- INDEX.md (269 lines)
- FY2025-EXTRACTION.md (702 lines)
- FY2024-EXTRACTION.md (665 lines)
- FY2023-EXTRACTION.md (estimated 650 lines)
- Total: ~2,300 lines of structured financial data

**Tender Impact:**
- Demonstrated strong financial capacity
- Showed consistent growth trajectory
- Proved R&D capability
- Confirmed compliance and governance

---

*End of Lesson*
