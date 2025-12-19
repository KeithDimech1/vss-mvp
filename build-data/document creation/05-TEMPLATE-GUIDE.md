# Documents System - Template Guide

**Last Updated:** 2025-12-18
**Audience:** Developers, Template Creators

---

## Table of Contents

1. [Template Overview](#template-overview)
2. [Built-in Templates](#built-in-templates)
3. [Template Structure](#template-structure)
4. [Variable System](#variable-system)
5. [Creating Custom Templates](#creating-custom-templates)
6. [Template Best Practices](#template-best-practices)
7. [Print Optimization](#print-optimization)
8. [Template Examples](#template-examples)

---

## Template Overview

### What is a Document Template?

A document template is a pre-designed HTML/CSS structure with placeholders for user-provided content. Templates enable rapid document creation with consistent, professional styling.

### Template Components

1. **HTML Template**: Structure with `{{variable}}` placeholders
2. **CSS Template**: Styling and layout
3. **Variables**: Configurable fields that users fill in
4. **Category**: Document type classification
5. **Description**: Explains template purpose and use cases

### How Templates Work

```
User Input              Template Variables         Template HTML/CSS
┌──────────────┐       ┌──────────────────┐       ┌─────────────────┐
│ name: "John" │  ───> │ {{name}}         │  ───> │ <h1>John</h1>   │
│ title: "CEO" │  ───> │ {{jobTitle}}     │  ───> │ <p>CEO</p>      │
└──────────────┘       └──────────────────┘       └─────────────────┘
     Input              Placeholder                  Output
```

### Template Storage

**Location:** `src/lib/document-templates.ts`

**Type:** Static TypeScript array (not database-backed)

**Reason:** Built-in templates rarely change and don't require user customization (yet).

---

## Built-in Templates

### 1. Blank Document

**ID:** `blank`
**Category:** CUSTOM
**Variables:** None

**Purpose:** Starting point for custom HTML documents

**HTML:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="container">
    <h1>Your Content Here</h1>
    <p>Start editing to create your custom document.</p>
  </div>
</body>
</html>
```

**CSS:**
```css
@page {
  size: A4;
  margin: 15mm;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}
```

**Use Cases:**
- Custom letters
- Certificates
- Presentations
- Unique layouts

---

### 2. Professional Resume

**ID:** `professional-resume`
**Category:** RESUME
**Variables:** 6

| Variable | Description | Default |
|----------|-------------|---------|
| `name` | Full name | John Doe |
| `jobTitle` | Professional title | Software Engineer |
| `email` | Email address | john@example.com |
| `phone` | Phone number | +1 (555) 123-4567 |
| `location` | City, State | San Francisco, CA |
| `summary` | Professional summary | Experienced professional... |

**HTML Structure:**
- Header with name and contact info
- Professional summary section
- Experience section (3 job entries)
- Education section (2 degree entries)
- Skills section with pill-style tags

**CSS Features:**
- Navy blue color scheme (#2c3e50, #3498db)
- Clean, professional typography
- Section dividers
- Skill tags with rounded borders
- Print-optimized (no page breaks inside sections)

**Sample Output:**
```
┌─────────────────────────────────┐
│         JOHN DOE                │
│    Software Engineer            │
│  john@example.com | 555-123-4567│
└─────────────────────────────────┘

Professional Summary
─────────────────────
Experienced professional with...

Experience
──────────
Senior Developer | Tech Corp
2020 - Present
• Led development of...

Education
─────────
B.S. Computer Science
University Name, 2015

Skills
──────
[JavaScript] [React] [Node.js]
```

**Use Cases:**
- Job applications
- Professional portfolios
- LinkedIn profile exports

---

### 3. Business Report

**ID:** `business-report`
**Category:** BUSINESS_REPORT
**Variables:** 6

| Variable | Description | Default |
|----------|-------------|---------|
| `reportTitle` | Main report title | Quarterly Business Report |
| `subtitle` | Report subtitle | Q4 2024 Performance Analysis |
| `author` | Report author | Jane Smith |
| `date` | Report date | December 2024 |
| `department` | Department name | Business Analytics |
| `topic` | Main topic | Revenue Analysis |

**HTML Structure:**
- Cover page with title, subtitle, author, date
- Table of Contents (placeholder with internal links)
- Executive Summary
- Introduction
- Findings section with:
  - Data table (metrics with variance indicators)
  - Positive/negative variance highlighting
- Recommendations section with:
  - Priority boxes (High/Medium)
  - Actionable items
- Conclusion

**CSS Features:**
- Professional blue/gray color scheme
- Cover page centering
- Data tables with alternating row colors
- Colored variance indicators (green/red)
- Priority recommendation boxes (red/yellow)
- Page breaks between major sections

**Sample Output:**
```
┌────────────────────────────────┐
│    QUARTERLY BUSINESS REPORT   │
│  Q4 2024 Performance Analysis  │
│                                │
│      By: Jane Smith            │
│      December 2024             │
│      Business Analytics Dept.  │
└────────────────────────────────┘

Table of Contents
─────────────────
1. Executive Summary
2. Introduction
3. Key Findings
4. Recommendations

Executive Summary
─────────────────
This report analyzes...

Key Findings
────────────
┌──────────┬──────┬──────┬──────────┐
│ Metric   │ Q4   │ Q3   │ Variance │
├──────────┼──────┼──────┼──────────┤
│ Revenue  │ $1M  │ $900K│ +11% ↑   │
│ Expenses │ $800K│ $850K│ -6% ↓    │
└──────────┴──────┴──────┴──────────┘

Recommendations
───────────────
[HIGH] Increase marketing budget
[MEDIUM] Optimize supply chain
```

**Use Cases:**
- Quarterly reports
- Board presentations
- Client proposals
- Performance analyses

---

### 4. VSM Assessment Report

**ID:** `vsm-report`
**Category:** VSM_REPORT
**Variables:** 3

| Variable | Description | Default |
|----------|-------------|---------|
| `companyName` | Client company name | Acme Corporation |
| `assessmentDate` | Date of assessment | December 2024 |
| `preparedBy` | Consultant name | VSM Consulting Team |

**HTML Structure:**
- Header with gradient background and company name
- Executive Summary with:
  - Overall VSM Health Score (percentage circle)
  - Key findings list
- System Analysis section:
  - Individual analysis for Systems 1-5
  - SWOT-style findings (Strengths, Weaknesses, Opportunities, Threats)
- Metrics table:
  - System metrics with status indicators (Good/Fair/Needs Improvement)
- Strategic Recommendations:
  - Priority-based recommendations
- Next Steps:
  - Timeline with phases

**CSS Features:**
- Blue gradient header (#2196F3 to #1976D2)
- Health score circle visualization
- Color-coded status indicators:
  - Green (Good)
  - Yellow (Fair)
  - Red (Needs Improvement)
- Priority tags with colors
- Timeline component with connecting lines
- VSM-themed design

**Sample Output:**
```
╔════════════════════════════════════╗
║  VSM ASSESSMENT REPORT             ║
║  Acme Corporation                  ║
║  December 2024                     ║
╚════════════════════════════════════╝

Executive Summary
─────────────────
     ┌───────┐
     │  72%  │  Overall VSM Health
     └───────┘

Key Findings:
✓ Strong operational processes
⚠ Communication gaps between levels
✗ Limited strategic alignment

System Analysis
───────────────
System 1: Operations
  Strengths: Efficient processes
  Weaknesses: Manual data entry

System 2: Coordination
  Strengths: Regular meetings
  Weaknesses: Information silos

[... Systems 3, 4, 5 ...]

Metrics Overview
────────────────
┌─────────┬────────┬────────┐
│ System  │ Score  │ Status │
├─────────┼────────┼────────┤
│ Sys 1   │ 85%    │ Good   │
│ Sys 2   │ 65%    │ Fair   │
│ Sys 3   │ 70%    │ Fair   │
│ Sys 4   │ 60%    │ Fair   │
│ Sys 5   │ 75%    │ Good   │
└─────────┴────────┴────────┘

Strategic Recommendations
─────────────────────────
[P0] Implement communication protocols
[P1] Develop strategic planning framework
[P2] Enhance monitoring dashboards

Next Steps
──────────
Phase 1 (Weeks 1-4): Assessment & Planning
Phase 2 (Weeks 5-12): Implementation
Phase 3 (Ongoing): Monitoring & Optimization
```

**Use Cases:**
- VSM client assessments
- System health reports
- Organizational diagnostics
- Strategic consulting deliverables

---

### 5. Modern Invoice

**ID:** `modern-invoice`
**Category:** BUSINESS_REPORT
**Variables:** 15

| Variable | Description | Default |
|----------|-------------|---------|
| `companyName` | Your company name | Your Company Ltd |
| `address` | Your address | 123 Business Street |
| `city` | Your city | City, State 12345 |
| `country` | Your country | Country |
| `email` | Your email | billing@yourcompany.com |
| `invoiceNumber` | Invoice number | INV-001 |
| `invoiceDate` | Invoice date | 2024-12-18 |
| `dueDate` | Payment due date | 2025-01-18 |
| `clientName` | Client name | Client Company Inc. |
| `clientAddress` | Client address | 456 Client Avenue |
| `clientCity` | Client city | City, State 67890 |
| `clientCountry` | Client country | Country |
| `bankName` | Your bank name | Bank Name |
| `accountNumber` | Your account number | 1234567890 |
| `swiftCode` | SWIFT/BIC code | BANKUS33 |

**HTML Structure:**
- Header with company info and logo placeholder
- Invoice details (number, date, due date)
- Bill To section with client info
- Items table:
  - Description, Quantity, Unit Price, Total
  - Sample line items included
- Totals section:
  - Subtotal
  - Tax (10%)
  - Grand Total
- Payment information (bank details)
- Footer with terms and thank you message

**CSS Features:**
- Professional blue accent color (#2196F3)
- Clean grid layout
- Bordered table with alternating rows
- Bold totals section
- Print-optimized
- Clear typography hierarchy

**Sample Output:**
```
┌────────────────────────────────────┐
│  YOUR COMPANY LTD                  │
│  123 Business Street               │
│  City, State 12345                 │
│  billing@yourcompany.com           │
└────────────────────────────────────┘

INVOICE #INV-001
Date: 2024-12-18
Due Date: 2025-01-18

Bill To:
Client Company Inc.
456 Client Avenue
City, State 67890

┌─────────────┬────┬───────┬────────┐
│ Description │ Qty│ Price │ Total  │
├─────────────┼────┼───────┼────────┤
│ Service A   │ 10 │ $100  │ $1,000 │
│ Service B   │ 5  │ $200  │ $1,000 │
├─────────────┴────┴───────┼────────┤
│                 Subtotal: │ $2,000 │
│                Tax (10%): │   $200 │
│              Grand Total: │ $2,200 │
└───────────────────────────┴────────┘

Payment Information
───────────────────
Bank Name: Bank Name
Account: 1234567890
SWIFT: BANKUS33

Thank you for your business!
```

**Use Cases:**
- Client invoicing
- Billing documents
- Service quotes
- Financial records

---

## Template Structure

### TypeScript Interface

```typescript
interface DocumentTemplate {
  id: string;                  // Unique identifier
  name: string;                // Display name
  description: string;         // Template description
  category: DocumentType;      // RESUME, BUSINESS_REPORT, VSM_REPORT, CUSTOM
  htmlTemplate: string;        // HTML with {{variables}}
  cssTemplate: string;         // CSS styles
  variables?: TemplateVariable[]; // Optional variables
}

interface TemplateVariable {
  name: string;                // Variable name (without braces)
  description: string;         // User-facing description
  defaultValue: string;        // Placeholder value
}
```

### Example Template Object

```typescript
{
  id: 'blank',
  name: 'Blank Document',
  description: 'A minimal starting point for custom documents.',
  category: 'CUSTOM',
  htmlTemplate: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
      <div class="container">
        <h1>{{title}}</h1>
      </div>
    </body>
    </html>
  `,
  cssTemplate: `
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
  `,
  variables: [
    {
      name: 'title',
      description: 'Document title',
      defaultValue: 'Your Title Here'
    }
  ]
}
```

---

## Variable System

### Variable Syntax

**Placeholder Format:** `{{variableName}}`

**Example:**
```html
<h1>Welcome, {{name}}!</h1>
<p>Your role is: {{jobTitle}}</p>
```

### Variable Replacement

**Function:** `replaceTemplateVariables(html, variables)`

**Location:** `src/lib/document-templates.ts`

**Implementation:**
```typescript
export function replaceTemplateVariables(
  html: string,
  variables: Record<string, string>
): string {
  let result = html;

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }

  return result;
}
```

**Usage:**
```typescript
const html = "<h1>Hello, {{name}}!</h1>";
const variables = { name: "Alice" };
const output = replaceTemplateVariables(html, variables);
// Output: "<h1>Hello, Alice!</h1>"
```

### Variable Best Practices

1. **Descriptive Names:** Use clear, self-explanatory names
   - ✅ `companyName`, `assessmentDate`
   - ❌ `cn`, `date1`

2. **Consistent Naming:** Use camelCase for variable names
   - ✅ `firstName`, `jobTitle`
   - ❌ `first_name`, `job-title`

3. **Provide Defaults:** Always include meaningful default values
   - ✅ `defaultValue: "Acme Corporation"`
   - ❌ `defaultValue: ""`

4. **Clear Descriptions:** Help users understand what to enter
   - ✅ `description: "Your full legal name"`
   - ❌ `description: "Name"`

---

## Creating Custom Templates

### Step 1: Design the Template

1. **Plan the Structure:**
   - Identify sections (header, body, footer)
   - Determine variable placeholders
   - Sketch the layout

2. **Write the HTML:**
   ```html
   <div class="letter">
     <div class="header">
       <h1>{{companyName}}</h1>
       <p>{{date}}</p>
     </div>
     <div class="body">
       <p>Dear {{recipientName}},</p>
       <p>{{message}}</p>
     </div>
     <div class="footer">
       <p>Sincerely,</p>
       <p>{{senderName}}</p>
     </div>
   </div>
   ```

3. **Write the CSS:**
   ```css
   .letter {
     max-width: 800px;
     margin: 0 auto;
     font-family: 'Times New Roman', serif;
   }
   .header {
     text-align: center;
     margin-bottom: 40px;
   }
   ```

### Step 2: Define Variables

```typescript
variables: [
  {
    name: 'companyName',
    description: 'Your company name',
    defaultValue: 'Acme Corp'
  },
  {
    name: 'date',
    description: 'Letter date',
    defaultValue: 'December 18, 2024'
  },
  {
    name: 'recipientName',
    description: 'Recipient name',
    defaultValue: 'John Doe'
  },
  {
    name: 'message',
    description: 'Main message content',
    defaultValue: 'Your message here...'
  },
  {
    name: 'senderName',
    description: 'Your name',
    defaultValue: 'Jane Smith'
  }
]
```

### Step 3: Add to Templates Array

**File:** `src/lib/document-templates.ts`

```typescript
export const documentTemplates: DocumentTemplate[] = [
  // ... existing templates
  {
    id: 'business-letter',
    name: 'Business Letter',
    description: 'Professional business letter template',
    category: 'CUSTOM',
    htmlTemplate: `...`,
    cssTemplate: `...`,
    variables: [...]
  }
];
```

### Step 4: Test the Template

1. Create a new document using your template
2. Fill in variable values
3. Check the preview
4. Export to PDF and verify formatting
5. Iterate on CSS for print optimization

---

## Template Best Practices

### HTML Best Practices

1. **Semantic HTML:**
   ```html
   <!-- Good -->
   <section>
     <h2>Section Title</h2>
     <p>Content...</p>
   </section>

   <!-- Avoid -->
   <div>
     <div class="title">Section Title</div>
     <div>Content...</div>
   </div>
   ```

2. **Accessibility:**
   - Use proper heading hierarchy (h1, h2, h3)
   - Include `alt` attributes on images
   - Use semantic elements (`<section>`, `<article>`, `<nav>`)

3. **Print-Friendly Structure:**
   - Avoid absolute positioning
   - Use block elements for major sections
   - Add page break hints

### CSS Best Practices

1. **Use Web-Safe Fonts:**
   ```css
   body {
     font-family: 'Arial', 'Helvetica', sans-serif;
   }
   ```

2. **Define Page Settings:**
   ```css
   @page {
     size: A4;
     margin: 15mm;
   }
   ```

3. **Avoid Fixed Heights:**
   ```css
   /* Good */
   .section {
     min-height: 100px;
   }

   /* Avoid (content may overflow) */
   .section {
     height: 100px;
   }
   ```

4. **Page Break Control:**
   ```css
   h1, h2, h3 {
     page-break-after: avoid;
   }

   .section {
     page-break-inside: avoid;
   }
   ```

### Variable Best Practices

1. **Limit Variable Count:**
   - Aim for 3-10 variables per template
   - Too many variables = poor UX
   - Group related data if needed

2. **Provide Realistic Defaults:**
   - Use sample data that demonstrates the format
   - Example: `defaultValue: "+1 (555) 123-4567"` for phone

3. **Document Variable Purpose:**
   - Clear descriptions help users
   - Example: `"Your company's legal name as it appears on official documents"`

---

## Print Optimization

### A4 Page Setup

```css
@page {
  size: A4;  /* 210mm x 297mm */
  margin: 15mm;
}

body {
  width: 210mm;
  margin: 0 auto;
}

.page {
  min-height: 297mm;
  padding: 15mm;
  box-sizing: border-box;
}
```

### Page Break Control

```css
/* Avoid breaking inside these elements */
h1, h2, h3, h4, h5, h6 {
  page-break-after: avoid;
  page-break-inside: avoid;
}

table, figure, img {
  page-break-inside: avoid;
}

/* Force breaks before sections */
.section {
  page-break-before: always;
}

/* Never break inside a section */
.section {
  page-break-inside: avoid;
}
```

### Print-Specific Styles

```css
@media print {
  /* Hide navigation and UI elements */
  .no-print {
    display: none;
  }

  /* Ensure backgrounds print */
  * {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  /* Optimize text for print */
  body {
    font-size: 11pt;
    line-height: 1.4;
  }
}
```

### Color Considerations

```css
/* Use print-friendly colors */
body {
  color: #000;  /* Black text for readability */
  background: #fff;  /* White background */
}

/* Ensure sufficient contrast */
.header {
  background: #2c3e50;  /* Dark enough to print well */
  color: #fff;
}
```

---

## Template Examples

### Example 1: Simple Certificate

```typescript
{
  id: 'certificate',
  name: 'Certificate of Achievement',
  description: 'Award certificate template',
  category: 'CUSTOM',
  htmlTemplate: `
    <div class="certificate">
      <div class="border">
        <h1>Certificate of Achievement</h1>
        <p class="presented">This certificate is presented to</p>
        <h2 class="recipient">{{recipientName}}</h2>
        <p class="description">
          For {{achievement}} on {{date}}
        </p>
        <div class="signature">
          <p>{{signerName}}</p>
          <p class="title">{{signerTitle}}</p>
        </div>
      </div>
    </div>
  `,
  cssTemplate: `
    .certificate {
      width: 297mm;
      height: 210mm;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Georgia', serif;
    }
    .border {
      border: 10px double #2c3e50;
      padding: 60px;
      text-align: center;
    }
    h1 {
      font-size: 36pt;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    .recipient {
      font-size: 28pt;
      color: #3498db;
      border-bottom: 2px solid #2c3e50;
      display: inline-block;
      padding: 10px 40px;
    }
    .signature {
      margin-top: 60px;
    }
  `,
  variables: [
    { name: 'recipientName', description: 'Recipient name', defaultValue: 'John Doe' },
    { name: 'achievement', description: 'Achievement description', defaultValue: 'Outstanding Performance' },
    { name: 'date', description: 'Award date', defaultValue: 'December 18, 2024' },
    { name: 'signerName', description: 'Signer name', defaultValue: 'Jane Smith' },
    { name: 'signerTitle', description: 'Signer title', defaultValue: 'CEO' }
  ]
}
```

### Example 2: Meeting Minutes

```typescript
{
  id: 'meeting-minutes',
  name: 'Meeting Minutes',
  description: 'Professional meeting minutes template',
  category: 'BUSINESS_REPORT',
  htmlTemplate: `
    <div class="minutes">
      <header>
        <h1>Meeting Minutes</h1>
        <div class="meta">
          <p><strong>Date:</strong> {{date}}</p>
          <p><strong>Time:</strong> {{time}}</p>
          <p><strong>Location:</strong> {{location}}</p>
          <p><strong>Attendees:</strong> {{attendees}}</p>
        </div>
      </header>

      <section>
        <h2>Agenda</h2>
        <ol>
          <li>Opening remarks</li>
          <li>Review of previous minutes</li>
          <li>{{agendaItem1}}</li>
          <li>{{agendaItem2}}</li>
          <li>Next steps</li>
        </ol>
      </section>

      <section>
        <h2>Discussion</h2>
        <p>{{discussionNotes}}</p>
      </section>

      <section>
        <h2>Action Items</h2>
        <ul>
          <li>{{actionItem1}}</li>
          <li>{{actionItem2}}</li>
        </ul>
      </section>

      <footer>
        <p>Next meeting: {{nextMeeting}}</p>
      </footer>
    </div>
  `,
  cssTemplate: `
    .minutes {
      max-width: 800px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    header {
      border-bottom: 3px solid #2c3e50;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #2c3e50;
    }
    .meta p {
      margin: 5px 0;
    }
    section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    h2 {
      color: #3498db;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
  `,
  variables: [
    { name: 'date', description: 'Meeting date', defaultValue: 'December 18, 2024' },
    { name: 'time', description: 'Meeting time', defaultValue: '10:00 AM - 11:00 AM' },
    { name: 'location', description: 'Meeting location', defaultValue: 'Conference Room A' },
    { name: 'attendees', description: 'List of attendees', defaultValue: 'John Doe, Jane Smith, Bob Johnson' },
    { name: 'agendaItem1', description: 'First agenda item', defaultValue: 'Project status update' },
    { name: 'agendaItem2', description: 'Second agenda item', defaultValue: 'Budget review' },
    { name: 'discussionNotes', description: 'Meeting discussion notes', defaultValue: 'Key points discussed during the meeting...' },
    { name: 'actionItem1', description: 'First action item', defaultValue: 'John to prepare Q4 report by Friday' },
    { name: 'actionItem2', description: 'Second action item', defaultValue: 'Jane to schedule follow-up meeting' },
    { name: 'nextMeeting', description: 'Next meeting date', defaultValue: 'December 25, 2024 at 10:00 AM' }
  ]
}
```

---

## Related Documentation

- [User Guide](./02-USER-GUIDE.md) - How to use templates
- [Technical Reference](./06-TECHNICAL-REFERENCE.md) - Implementation details
- [API Reference](./03-API-REFERENCE.md) - Template API endpoints

---

**Questions?** Contact the development team or file an issue.
