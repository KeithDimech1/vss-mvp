# Documents System - User Guide

**Last Updated:** 2025-12-18
**Audience:** End Users, Content Creators, Administrators

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Your First Document](#creating-your-first-document)
3. [Using the Document Editor](#using-the-document-editor)
4. [Working with Templates](#working-with-templates)
5. [Version Control](#version-control)
6. [Exporting to PDF](#exporting-to-pdf)
7. [Sharing Documents](#sharing-documents)
8. [Tips & Best Practices](#tips--best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites
- Active VSM Platform account
- Logged in to the dashboard
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Accessing the Documents Section
1. Log in to the VSM Platform
2. Navigate to the dashboard
3. Click "Documents" in the main navigation
4. You'll see your document list (empty if first time)

---

## Creating Your First Document

### Step 1: Start the Creation Process

1. Click the **"Create New Document"** button on the documents page
2. You'll be taken to the new document wizard

### Step 2: Choose a Template

You have 5 template options:

#### 1. Blank Document
- **Best for:** Custom projects, unique layouts
- **Contains:** Basic HTML structure only
- **Difficulty:** Advanced (requires HTML/CSS knowledge)

#### 2. Professional Resume
- **Best for:** Job applications, CV creation
- **Contains:** Header, Summary, Experience, Education, Skills
- **Difficulty:** Beginner-friendly
- **Variables:** Name, Job Title, Email, Phone, Location, Summary

#### 3. Business Report
- **Best for:** Quarterly reports, proposals, analytics
- **Contains:** Cover page, Executive Summary, Data tables, Recommendations
- **Difficulty:** Intermediate
- **Variables:** Report Title, Subtitle, Author, Date, Department, Topic

#### 4. VSM Assessment Report
- **Best for:** Viable Systems Model client deliverables
- **Contains:** Health score, System analysis, Metrics, Strategic recommendations
- **Difficulty:** Intermediate
- **Variables:** Company Name, Assessment Date, Prepared By

#### 5. Modern Invoice
- **Best for:** Billing, invoices, financial documents
- **Contains:** Invoice header, Items table, Totals, Payment info
- **Difficulty:** Beginner-friendly
- **Variables:** 15 fields including company details, client info, banking

**Click on your chosen template to select it.**

### Step 3: Configure Your Document

#### Basic Information

1. **Title** (required)
   - Enter a descriptive title
   - Example: "Q4 2024 Business Report"
   - The slug will auto-generate from your title

2. **Slug** (auto-generated)
   - URL-friendly version of your title
   - Example: "q4-2024-business-report"
   - Can be edited if needed
   - Must be unique across all your documents

3. **Description** (optional)
   - Brief summary of the document
   - Helps you find it later
   - Example: "Quarterly business analysis for stakeholders"

#### Template Variables

If your chosen template has variables, fill them in:

**Example: Professional Resume Template**
- Name: "Jane Doe"
- Job Title: "Senior Software Engineer"
- Email: "jane@example.com"
- Phone: "+1 (555) 123-4567"
- Location: "San Francisco, CA"
- Summary: "Experienced software engineer with 10+ years..."

**These values will be inserted into the template placeholders.**

### Step 4: Create the Document

1. Click **"Create Document"**
2. Processing takes 1-2 seconds
3. You'll be redirected to the document editor
4. Your document is now saved with Version 1

---

## Using the Document Editor

The document editor is a split-pane interface with powerful editing capabilities.

### Editor Layout

```
┌─────────────────────────────────────────────────────┐
│  [← Back]  Document Title  [v1]  [Export PDF]       │ ← Toolbar
├─────────────────────┬───────────────────────────────┤
│                     │                               │
│   Editor Pane       │      Preview Pane             │
│   (Left)            │      (Right)                  │
│                     │                               │
│  ┌──────────────┐   │   ┌───────────────────────┐   │
│  │ HTML │  CSS  │   │   │                       │   │
│  └──────────────┘   │   │   Live Preview        │   │
│                     │   │   (Iframe)            │   │
│  [Code editor]      │   │                       │   │
│                     │   │                       │   │
│                     │   │                       │   │
│  [Save] [Auto-save] │   │                       │   │
│  Characters: 1234   │   └───────────────────────┘   │
│  Last saved: 2m ago │                               │
└─────────────────────┴───────────────────────────────┘
       50%                         50%
```

### Top Toolbar

- **Back Button (←)**: Return to document list
- **Document Title**: Shows current document name
- **Version Badge**: Current version number (e.g., "v1")
- **Export PDF Button**: Generate and download PDF

### Editor Pane (Left)

#### HTML Tab
- Write and edit your HTML content
- Syntax highlighting (if available in your browser)
- Line numbers for easy reference
- Auto-indentation

#### CSS Tab
- Write and edit your CSS styles
- Applies to the HTML in real-time
- Scoped to the document (won't affect other pages)

#### Bottom Status Bar
- **Save Button**: Manual save (or press Cmd+S / Ctrl+S)
- **Auto-save Indicator**: Shows "Auto-saving..." when active
- **Character Counter**: Total characters in current tab
- **Last Saved**: Timestamp of last save

### Preview Pane (Right)

- **Live Preview**: Real-time rendering of your HTML+CSS
- **Iframe Sandbox**: Isolated from the main page for safety
- **Updates Automatically**: Refreshes as you type (debounced)
- **Full Scroll**: Preview is scrollable for long documents

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+S` / `Ctrl+S` | Save document |
| `Tab` | Indent (in code editor) |
| `Shift+Tab` | Outdent (in code editor) |
| `Cmd+Z` / `Ctrl+Z` | Undo |
| `Cmd+Shift+Z` / `Ctrl+Y` | Redo |

### Making Changes

1. **Edit HTML**:
   - Click the "HTML" tab
   - Make your changes
   - Preview updates automatically

2. **Edit CSS**:
   - Click the "CSS" tab
   - Add or modify styles
   - Preview updates automatically

3. **Save Your Work**:
   - **Auto-save**: Happens every 30 seconds automatically
   - **Manual save**: Click "Save" button or press Cmd+S
   - Watch for "Last saved" timestamp to confirm

### Creating a New Version

When you save a document with content changes (HTML or CSS), a new version is automatically created:

1. Make changes to HTML or CSS
2. Save the document
3. Version number increments (e.g., v1 → v2)
4. Version stored in history with timestamp

**Note:** If you only change metadata (title, description), no new version is created.

---

## Working with Templates

### Template Variables

Templates use `{{variableName}}` placeholders that get replaced with your values.

**Example:**

**Template HTML:**
```html
<h1>{{companyName}}</h1>
<p>Assessment Date: {{assessmentDate}}</p>
```

**Your Input:**
```
companyName: "Acme Corp"
assessmentDate: "2024-12-18"
```

**Result:**
```html
<h1>Acme Corp</h1>
<p>Assessment Date: 2024-12-18</p>
```

### Customizing Templates

After creating a document from a template:

1. The variables are already replaced
2. You can edit the HTML/CSS freely
3. Add new sections, change colors, modify layout
4. No restrictions - full creative control

### Starting from Scratch

Choose the **"Blank Document"** template:

1. Minimal HTML structure provided
2. Basic CSS with A4 page setup
3. Build your document from the ground up
4. Ideal for unique layouts or custom designs

---

## Version Control

### Understanding Versions

- **Immutable**: Once created, versions never change
- **Auto-incrementing**: v1, v2, v3, etc.
- **Current Version**: The version currently displayed/edited
- **Complete History**: All versions are preserved

### Viewing Version History

1. Open a document in the editor
2. Click the **version history icon** (if available in UI)
3. Sidebar shows all versions:
   - Version number
   - Creation date
   - Version name (if set)
   - Change notes (if provided)

### Version Metadata

When saving, you can optionally provide:

- **Version Name**: e.g., "Draft", "Final", "Client Review"
- **Change Notes**: e.g., "Updated financial projections", "Fixed typos"

**To add metadata** (requires API or future UI feature):
- Currently automatic on save
- Future enhancement: version naming dialog

### Comparing Versions

**Current Capability**: View version list with timestamps

**Future Enhancement**: Side-by-side diff view

---

## Exporting to PDF

### How to Export

1. Open your document in the editor
2. Click **"Export PDF"** in the top toolbar
3. PDF generation begins (2-5 seconds)
4. Browser downloads the PDF file automatically

### PDF Characteristics

- **Format**: A4 (210mm × 297mm)
- **Margins**: 15mm on all sides
- **Quality**: High-fidelity rendering
- **Graphics**: Background colors and images included
- **Fonts**: Web-safe fonts embedded

### PDF Best Practices

#### Use Print-Friendly CSS

Add print-specific styles in your CSS:

```css
@media print {
  /* Avoid page breaks inside elements */
  h1, h2, h3 {
    page-break-after: avoid;
  }

  /* Force page breaks before sections */
  .section {
    page-break-before: always;
  }

  /* Hide elements that shouldn't print */
  .no-print {
    display: none;
  }
}
```

#### Optimize for A4 Pages

```css
.page {
  width: 210mm;
  min-height: 297mm;
  padding: 15mm;
  box-sizing: border-box;
}
```

#### Test Before Exporting

- Check the live preview
- Ensure content fits within page boundaries
- Verify colors render correctly
- Test with different content lengths

### Troubleshooting PDF Export

**Problem**: PDF is blank or incomplete
- **Solution**: Ensure HTML has content, check browser console for errors

**Problem**: Colors missing in PDF
- **Solution**: Verify CSS includes `print-color-adjust: exact;`

**Problem**: Text cut off
- **Solution**: Check margins and page width in CSS

---

## Sharing Documents

### Visibility Options

#### Private (Default)
- Only you can see and edit
- Not visible to other users
- `isPublic: false`

#### Public
- Anyone can view
- Only you can edit
- Visible in public galleries (future feature)
- `isPublic: true`

#### Shared with Specific Users
- Grant access to selected users
- They can view (not edit)
- Managed via `sharedWith` array
- **Future Feature**: UI for sharing

### How to Make a Document Public

**Current Method**: Via API
```bash
PATCH /api/documents/{id}
{
  "isPublic": true
}
```

**Future Enhancement**: Toggle switch in UI

### Permissions Summary

| Action | Owner | Public Viewer | Shared User |
|--------|-------|---------------|-------------|
| View | ✅ | ✅ | ✅ |
| Edit | ✅ | ❌ | ❌ |
| Delete | ✅ | ❌ | ❌ |
| Export PDF | ✅ | ✅ | ✅ |
| Share | ✅ | ❌ | ❌ |

---

## Tips & Best Practices

### 1. Save Frequently
- Auto-save is enabled, but manual saves are instant
- Press Cmd+S regularly to ensure no data loss
- Watch the "Last saved" indicator

### 2. Use Semantic HTML
```html
<!-- Good -->
<section>
  <h2>Introduction</h2>
  <p>Content here...</p>
</section>

<!-- Avoid -->
<div>
  <div class="heading">Introduction</div>
  <div>Content here...</div>
</div>
```

### 3. Organize CSS
```css
/* Group related styles */

/* Layout */
.container { /* ... */ }
.section { /* ... */ }

/* Typography */
h1, h2, h3 { /* ... */ }
p { /* ... */ }

/* Components */
.button { /* ... */ }
.card { /* ... */ }
```

### 4. Test PDF Export Early
- Export after initial template setup
- Check formatting before adding lots of content
- Iterate on CSS for print optimization

### 5. Use Version Names
- Name important versions: "Draft 1", "Final", "Client Version"
- Add change notes for team collaboration
- Makes it easy to find specific versions later

### 6. Plan for Print
- Use web-safe fonts (Arial, Times New Roman, Georgia)
- Avoid absolute positioning
- Test with different content lengths

### 7. Keep HTML Clean
- Proper indentation for readability
- Close all tags
- Use comments to organize sections

### 8. Leverage Templates
- Don't start from scratch if a template exists
- Customize templates to match your brand
- Save time with pre-built structures

---

## Troubleshooting

### Problem: Auto-save not working

**Symptoms**: "Last saved" timestamp not updating

**Solutions**:
1. Check internet connection
2. Ensure you're still logged in (session timeout)
3. Try manual save (Cmd+S)
4. Refresh the page and reopen document

---

### Problem: Preview not updating

**Symptoms**: Changes in editor don't appear in preview

**Solutions**:
1. Wait 1-2 seconds (debounced update)
2. Click "Save" to force refresh
3. Check for syntax errors in HTML/CSS
4. Refresh browser page

---

### Problem: Can't create document

**Symptoms**: Error message when clicking "Create Document"

**Solutions**:
1. **"Slug already exists"**: Change the document title or manually edit slug
2. **"Title required"**: Ensure title field is filled
3. **"Template not found"**: Refresh page and try again

---

### Problem: PDF export fails

**Symptoms**: No PDF downloads or error message

**Solutions**:
1. Check if HTML is valid (no unclosed tags)
2. Ensure document has content
3. Try exporting a simpler document to test
4. Contact support if problem persists

---

### Problem: Lost unsaved changes

**Symptoms**: Changes disappeared after closing editor

**Solutions**:
1. **Prevention**: Rely on auto-save (30s interval)
2. **Recovery**: Check version history for recent saves
3. **Future**: Auto-save prevents this issue

---

### Problem: Can't find my document

**Symptoms**: Document not in list

**Solutions**:
1. Check if you're logged in as correct user
2. Search by title (future feature)
3. Check if document was deleted
4. Contact admin to verify database

---

### Problem: Template variables didn't replace

**Symptoms**: `{{variableName}}` still visible in document

**Solutions**:
1. This is expected if variable wasn't filled during creation
2. Manually edit HTML to replace placeholders
3. Example: Find `{{companyName}}` and replace with "Acme Corp"

---

## Getting Help

### Self-Service Resources
- [Overview](./01-OVERVIEW.md) - System architecture and capabilities
- [API Reference](./03-API-REFERENCE.md) - For developers
- [Technical Reference](./06-TECHNICAL-REFERENCE.md) - Implementation details

### Support Channels
- **Bug Reports**: File an issue in the project repository
- **Feature Requests**: Contact product team
- **Technical Support**: Email support team

---

**Happy document creating!** 🎉
