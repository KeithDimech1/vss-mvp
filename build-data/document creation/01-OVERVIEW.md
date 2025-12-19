# Documents System - Overview

**Last Updated:** 2025-12-18
**Version:** 1.0
**Status:** Production

---

## What is the Documents System?

The Documents System is a full-featured HTML/CSS document builder integrated into the VSM Platform. It enables users to create, edit, and manage professional documents with version control, live preview, and PDF export capabilities.

## Key Features

### 1. Template-Based Creation
- 5 built-in professional templates
- Variable substitution for quick customization
- Template categories: Resume, Business Report, VSM Report, Custom

### 2. Split-Pane Editor
- Live HTML/CSS editing with instant preview
- Tab-based interface for HTML and CSS
- Auto-save every 30 seconds
- Character counter and save status

### 3. Version Control
- Complete version history tracking
- Named versions with change notes
- Immutable version storage
- Current version pointer system

### 4. PDF Export
- High-fidelity HTML-to-PDF conversion
- On-demand generation using Playwright
- Print-optimized A4 format
- Background graphics included

### 5. Permissions & Sharing
- Owner-based access control
- Public document sharing
- User-specific sharing (sharedWith)
- Read/edit/delete permissions

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18, Next.js 14 App Router, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes, Server Components |
| Database | PostgreSQL (Neon) + Prisma ORM |
| PDF Generation | Playwright (Chromium headless) |
| Authentication | JWT-based (verifyAuth middleware) |

---

## Document Types

### RESUME
Professional resume/CV templates optimized for job applications. Includes sections for experience, education, skills, and professional summary.

### BUSINESS_REPORT
Formal business reports with cover page, table of contents, executive summary, data tables, and recommendations.

### VSM_REPORT
Specialized templates for Viable Systems Model assessment reports. Includes health scores, system analysis, metrics tables, and strategic recommendations.

### CUSTOM
Blank canvas for any HTML/CSS document. No predefined structure - full creative control.

---

## System Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components + Next.js Pages)     │
│  - Document List                        │
│  - New Document Wizard                  │
│  - Split-Pane Editor                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Application Layer               │
│      (Next.js API Routes)               │
│  - Document CRUD operations             │
│  - Version management                   │
│  - PDF generation                       │
│  - Permission checks                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Data Layer                    │
│    (PostgreSQL + Prisma)                │
│  - Document table                       │
│  - DocumentVersion table                │
│  - DocumentTemplate table               │
└─────────────────────────────────────────┘
```

### Key Design Patterns

1. **Version Control Pattern**
   - Immutable versions (never update existing versions)
   - Current version pointer for quick access
   - Auto-incrementing version numbers

2. **Template Pattern**
   - Reusable document templates with variables
   - Category-based organization
   - Variable substitution engine

3. **Permission Pattern**
   - Owner-based authorization
   - Public/private visibility
   - Explicit user sharing list

4. **On-Demand Generation Pattern**
   - PDFs generated per request (not stored)
   - Reduces storage costs
   - Always reflects current content

---

## File Locations

### Routes & Pages
```
src/app/(dashboard)/documents/
├── page.tsx                    # Document list
├── new/page.tsx               # New document wizard
└── [id]/edit/page.tsx         # Document editor
```

### API Endpoints
```
src/app/api/documents/
├── route.ts                   # GET (list), POST (create)
├── [id]/route.ts              # GET, PATCH, DELETE
└── [id]/pdf/route.ts          # GET, POST (PDF generation)
```

### Components
```
src/components/documents/
└── SplitPaneEditor.tsx        # Main editor component
```

### Libraries
```
src/lib/
└── document-templates.ts      # 5 built-in templates
```

### Database Schema
```
prisma/schema.prisma
├── Document model            (lines 750-780)
├── DocumentVersion model     (lines 782-811)
├── DocumentTemplate model    (lines 813-838)
└── DocumentType enum         (lines 840-845)
```

---

## User Workflow

### Creating a Document

1. Navigate to `/documents`
2. Click "Create New Document"
3. Select a template (5 options)
4. Configure document:
   - Enter title (auto-generates slug)
   - Add description (optional)
   - Fill template variables
5. Click "Create Document"
6. Redirect to editor

### Editing a Document

1. Open document from list
2. Use split-pane editor:
   - Left pane: HTML/CSS tabs
   - Right pane: Live preview
3. Make changes (auto-saves every 30s)
4. Manual save with Cmd+S or Save button
5. Version created on content change

### Exporting to PDF

1. Open document in editor
2. Click "Export PDF" button
3. PDF generated via Playwright
4. Browser downloads PDF file
5. Version marked as `pdfGenerated`

### Managing Versions

1. Click version history icon in editor
2. Sidebar shows all versions
3. Each version displays:
   - Version number
   - Version name (if provided)
   - Created date
   - Change notes
4. Click version to view details

---

## Typical Use Cases

### 1. Creating VSM Assessment Reports
- Start with "VSM Assessment Report" template
- Fill in company name, assessment date, preparer
- Edit system analysis sections (Systems 1-5)
- Add metrics and health scores
- Export to PDF for client delivery

### 2. Professional Resume Creation
- Start with "Professional Resume" template
- Fill in personal info (name, contact, title)
- Add experience, education, skills
- Customize colors and layout
- Export to PDF for job applications

### 3. Business Proposals
- Start with "Business Report" template
- Customize cover page and executive summary
- Add data tables and recommendations
- Version control for draft revisions
- Export final version to PDF

### 4. Custom HTML Documents
- Start with "Blank Document" template
- Build from scratch with HTML/CSS
- Full creative control
- Use for letters, presentations, certificates, etc.

---

## Performance Characteristics

### Auto-Save
- Interval: 30 seconds (default)
- Configurable via `autoSaveInterval` prop
- Debounced to prevent excessive saves
- Shows last saved timestamp

### PDF Generation
- Time: 2-5 seconds (typical)
- Depends on document complexity
- Uses headless Chromium
- Waits for networkidle before rendering

### Version History
- Ordered by version number (descending)
- Loaded with document in single query
- Join on currentVersion for quick access

---

## Security Considerations

### Authentication
- All routes require JWT authentication
- Verified via `verifyAuth()` middleware

### Authorization
- Document ownership checked on edit/delete
- Read access: owner, public, or sharedWith
- Write access: owner only

### Input Validation
- HTML/CSS sanitized before storage
- Slug uniqueness enforced
- Required fields validated

### PDF Generation
- Sandboxed Chromium instance
- No external network access during render
- Content isolated per user

---

## Future Enhancements

### Planned Features
- [ ] Real-time collaboration (multiple editors)
- [ ] More templates (newsletters, presentations)
- [ ] Export to DOCX format
- [ ] Template marketplace (user-created)
- [ ] Document comments and annotations
- [ ] Advanced version comparison (diff view)
- [ ] Custom CSS libraries/themes
- [ ] Embedded images and media
- [ ] Print preview mode

### Technical Improvements
- [ ] PDF caching (24-hour TTL)
- [ ] Incremental auto-save (only changed content)
- [ ] WebSocket-based live preview
- [ ] Offline editing support
- [ ] Mobile-responsive editor

---

## Related Documentation

- [User Guide](./02-USER-GUIDE.md) - Step-by-step usage instructions
- [API Reference](./03-API-REFERENCE.md) - Complete API documentation
- [Database Schema](./04-DATABASE-SCHEMA.md) - Detailed schema reference
- [Template Guide](./05-TEMPLATE-GUIDE.md) - How to create/customize templates
- [Technical Reference](./06-TECHNICAL-REFERENCE.md) - Deep dive into implementation

---

**Questions or issues?** Contact the development team or file an issue in the project repository.
