# Documents System - Technical Reference

**Last Updated:** 2025-12-18
**Audience:** Developers, System Architects

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Implementation](#frontend-implementation)
3. [Backend Implementation](#backend-implementation)
4. [PDF Generation System](#pdf-generation-system)
5. [Version Control System](#version-control-system)
6. [Template Engine](#template-engine)
7. [Authentication & Authorization](#authentication--authorization)
8. [Performance Considerations](#performance-considerations)
9. [Error Handling](#error-handling)
10. [Testing Strategy](#testing-strategy)
11. [Deployment & Monitoring](#deployment--monitoring)

---

## Architecture Overview

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Client (Browser)                         │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐ │
│  │ Document List  │  │  New Document  │  │ Document Editor │ │
│  │    Page        │  │     Wizard     │  │  (Split-Pane)   │ │
│  └────────┬───────┘  └────────┬───────┘  └─────────┬───────┘ │
└───────────┼────────────────────┼────────────────────┼─────────┘
            │                    │                    │
            │   REST API Calls   │                    │
            ▼                    ▼                    ▼
┌──────────────────────────────────────────────────────────────┐
│                   Next.js API Routes                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  GET /api/documents      - List documents               │ │
│  │  POST /api/documents     - Create document              │ │
│  │  GET /api/documents/:id  - Get document                 │ │
│  │  PATCH /api/documents/:id - Update document             │ │
│  │  DELETE /api/documents/:id - Delete document            │ │
│  │  POST /api/documents/:id/pdf - Generate PDF             │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                   │
│                           ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Prisma ORM Client                          │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │      PostgreSQL Database (Neon)      │
         │  ┌────────────┐  ┌─────────────────┐ │
         │  │ Document   │  │ DocumentVersion │ │
         │  └────────────┘  └─────────────────┘ │
         │  ┌────────────────────────────────┐  │
         │  │     DocumentTemplate           │  │
         │  └────────────────────────────────┘  │
         └──────────────────────────────────────┘

         ┌──────────────────────────────────────┐
         │  Playwright (PDF Generation)         │
         │  - Headless Chromium                 │
         │  - HTML → PDF conversion             │
         └──────────────────────────────────────┘
```

### Technology Decisions

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Frontend Framework | React 18 + Next.js 14 | Server components, App Router, built-in API routes |
| UI Styling | Tailwind CSS | Utility-first, rapid development, consistent design |
| Database | PostgreSQL (Neon) | Relational data, ACID compliance, JSON support |
| ORM | Prisma | Type-safe queries, migrations, great DX |
| PDF Generation | Playwright | High-fidelity rendering, CSS support, actively maintained |
| Authentication | JWT | Stateless, scalable, standard approach |
| Deployment | Vercel | Optimized for Next.js, edge functions, easy CI/CD |

---

## Frontend Implementation

### Component Hierarchy

```
app/
├── (dashboard)/
│   └── documents/
│       ├── page.tsx                    # Document List Component
│       ├── new/
│       │   └── page.tsx                # New Document Wizard
│       └── [id]/
│           └── edit/
│               └── page.tsx            # Document Editor Page
│
components/
└── documents/
    └── SplitPaneEditor.tsx             # Core Editor Component
```

### Document List Page

**File:** `src/app/(dashboard)/documents/page.tsx`

**Key Features:**
- Server Component (fetches data server-side)
- Grid layout for document cards
- Document type badges
- Action buttons (Edit, Export PDF, Delete)
- Empty state with CTA

**Implementation Highlights:**

```typescript
export default async function DocumentsPage() {
  // Server-side data fetching
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents`, {
    headers: {
      Authorization: `Bearer ${getServerToken()}`,
    },
    cache: 'no-store', // Always fresh data
  });

  const documents = await response.json();

  return (
    <div className="container">
      <h1>My Documents</h1>
      {documents.length === 0 ? (
        <EmptyState />
      ) : (
        <DocumentGrid documents={documents} />
      )}
    </div>
  );
}
```

**State Management:**
- Uses Server Components (no client state for list)
- Mutations trigger revalidation via `router.refresh()`

---

### New Document Wizard

**File:** `src/app/(dashboard)/documents/new/page.tsx`

**Two-Step Process:**

**Step 1: Template Selection**
- Displays 5 template cards
- Shows template name, description, category
- Click to select template

**Step 2: Document Configuration**
- Form with fields:
  - Title (required)
  - Slug (auto-generated, editable)
  - Description (optional)
  - Template variables (dynamic based on template)

**Implementation Highlights:**

```typescript
'use client';

export default function NewDocumentPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    variables: {} as Record<string, string>,
  });

  // Auto-generate slug from title
  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  }, [formData.title]);

  const handleCreate = async () => {
    // Replace template variables
    const htmlContent = replaceTemplateVariables(
      selectedTemplate.htmlTemplate,
      formData.variables
    );
    const cssContent = selectedTemplate.cssTemplate;

    // Create document via API
    const response = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        documentType: selectedTemplate.category,
        htmlContent,
        cssContent,
        templateId: selectedTemplate.id,
      }),
    });

    const document = await response.json();
    router.push(`/documents/${document.id}/edit`);
  };

  // Render UI...
}
```

**Client-Side Validation:**
- Title required
- Slug must be URL-friendly
- Duplicate slug check (via API)

---

### Document Editor (Split-Pane)

**File:** `src/app/(dashboard)/documents/[id]/edit/page.tsx`

**Parent Component Responsibilities:**
- Fetch document data
- Manage toolbar state
- Handle PDF export
- Display version history

**Child Component:** `SplitPaneEditor`

**File:** `src/components/documents/SplitPaneEditor.tsx`

**Features:**
- 50/50 split layout
- HTML/CSS tab switcher
- Live preview in iframe
- Auto-save (30s interval)
- Manual save (Cmd+S)
- Character counter
- Last saved timestamp

**Implementation Highlights:**

```typescript
'use client';

interface SplitPaneEditorProps {
  initialHtml: string;
  initialCss: string;
  onHtmlChange: (html: string) => void;
  onCssChange: (css: string) => void;
  onSave: () => Promise<void>;
  autoSave?: boolean;
  autoSaveInterval?: number;
}

export default function SplitPaneEditor({
  initialHtml,
  initialCss,
  onHtmlChange,
  onCssChange,
  onSave,
  autoSave = true,
  autoSaveInterval = 30000, // 30 seconds
}: SplitPaneEditorProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save logic
  useEffect(() => {
    if (!autoSave) return;

    const timer = setTimeout(async () => {
      await handleSave();
    }, autoSaveInterval);

    return () => clearTimeout(timer);
  }, [html, css, autoSave, autoSaveInterval]);

  // Debounced preview update
  const debouncedHtml = useDebounce(html, 500);
  const debouncedCss = useDebounce(css, 500);

  // Combined HTML for iframe
  const previewHtml = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${debouncedCss}</style>
        </head>
        <body>
          ${debouncedHtml}
        </body>
      </html>
    `;
  }, [debouncedHtml, debouncedCss]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="split-pane-editor">
      {/* Editor Pane */}
      <div className="editor-pane">
        <div className="tabs">
          <button onClick={() => setActiveTab('html')}>HTML</button>
          <button onClick={() => setActiveTab('css')}>CSS</button>
        </div>

        <textarea
          value={activeTab === 'html' ? html : css}
          onChange={(e) => {
            const value = e.target.value;
            if (activeTab === 'html') {
              setHtml(value);
              onHtmlChange(value);
            } else {
              setCss(value);
              onCssChange(value);
            }
          }}
          className="code-editor"
        />

        <div className="status-bar">
          <button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <span>Characters: {(activeTab === 'html' ? html : css).length}</span>
          <span>
            {lastSaved ? `Last saved: ${formatTimeAgo(lastSaved)}` : 'Not saved'}
          </span>
        </div>
      </div>

      {/* Preview Pane */}
      <div className="preview-pane">
        <iframe
          srcDoc={previewHtml}
          sandbox="allow-same-origin"
          className="preview-iframe"
        />
      </div>
    </div>
  );
}
```

**Performance Optimizations:**
- Debounced preview updates (500ms)
- Auto-save only on content change
- Memoized preview HTML
- Sandboxed iframe (security)

---

## Backend Implementation

### API Route Structure

**File:** `src/app/api/documents/route.ts`

**Handlers:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// GET /api/documents - List all accessible documents
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const userId = await verifyAuth(request);

    // Fetch documents
    const documents = await prisma.document.findMany({
      where: {
        OR: [
          { createdById: userId },
          { isPublic: true },
          { sharedWith: { has: userId } },
        ],
      },
      include: {
        currentVersion: true,
        template: { select: { name: true, category: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// POST /api/documents - Create new document
export async function POST(request: NextRequest) {
  try {
    const userId = await verifyAuth(request);
    const body = await request.json();

    // Validate input
    if (!body.title || !body.slug || !body.documentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.document.findUnique({
      where: { slug: body.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    // Create document with first version
    const document = await prisma.document.create({
      data: {
        title: body.title,
        slug: body.slug,
        documentType: body.documentType,
        description: body.description,
        templateId: body.templateId,
        createdById: userId,
        isPublic: body.isPublic ?? false,
        versions: {
          create: {
            versionNumber: 1,
            versionName: 'Initial version',
            htmlContent: body.htmlContent ?? '',
            cssContent: body.cssContent ?? '',
            createdById: userId,
          },
        },
      },
      include: { versions: true },
    });

    // Link currentVersion to first version
    await prisma.document.update({
      where: { id: document.id },
      data: { currentVersionId: document.versions[0].id },
    });

    // Fetch updated document with currentVersion
    const updatedDocument = await prisma.document.findUnique({
      where: { id: document.id },
      include: { currentVersion: true },
    });

    return NextResponse.json(updatedDocument, { status: 201 });
  } catch (error) {
    console.error('Create document error:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
```

**File:** `src/app/api/documents/[id]/route.ts`

**Handlers:**

```typescript
// GET /api/documents/:id - Get single document with versions
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyAuth(request);

    const document = await prisma.document.findUnique({
      where: { id: params.id },
      include: {
        currentVersion: true,
        versions: {
          orderBy: { versionNumber: 'desc' },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Check access permissions
    const hasAccess =
      document.createdById === userId ||
      document.isPublic ||
      (document.sharedWith as string[])?.includes(userId);

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

// PATCH /api/documents/:id - Update document (creates version if content changed)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyAuth(request);
    const body = await request.json();

    // Fetch existing document
    const document = await prisma.document.findUnique({
      where: { id: params.id },
      include: { currentVersion: true },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Only owner can edit
    if (document.createdById !== userId) {
      return NextResponse.json(
        { error: 'Only the document owner can edit' },
        { status: 403 }
      );
    }

    // Determine if content changed
    const htmlChanged = body.htmlContent && body.htmlContent !== document.currentVersion?.htmlContent;
    const cssChanged = body.cssContent && body.cssContent !== document.currentVersion?.cssContent;
    const contentChanged = htmlChanged || cssChanged;

    let updateData: any = {};

    // Update metadata
    if (body.title) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.isPublic !== undefined) updateData.isPublic = body.isPublic;

    // Create new version if content changed
    if (contentChanged) {
      const newVersionNumber = (document.currentVersion?.versionNumber ?? 0) + 1;

      const newVersion = await prisma.documentVersion.create({
        data: {
          documentId: document.id,
          versionNumber: newVersionNumber,
          versionName: body.versionName ?? `Version ${newVersionNumber}`,
          htmlContent: body.htmlContent ?? document.currentVersion?.htmlContent ?? '',
          cssContent: body.cssContent ?? document.currentVersion?.cssContent ?? '',
          changeNotes: body.changeNotes,
          createdById: userId,
        },
      });

      updateData.currentVersionId = newVersion.id;
    }

    // Update document
    const updatedDocument = await prisma.document.update({
      where: { id: params.id },
      data: updateData,
      include: { currentVersion: true },
    });

    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error('Update document error:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

// DELETE /api/documents/:id - Delete document (cascades to versions)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyAuth(request);

    const document = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Only owner can delete
    if (document.createdById !== userId) {
      return NextResponse.json(
        { error: 'Only the document owner can delete' },
        { status: 403 }
      );
    }

    // Delete document (cascades to versions)
    await prisma.document.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
```

---

## PDF Generation System

**File:** `src/app/api/documents/[id]/pdf/route.ts`

**PDF Generation Flow:**

```
1. Fetch document + current version
2. Combine HTML + CSS into single HTML string
3. Launch headless Chromium (Playwright)
4. Load HTML into browser
5. Wait for networkidle
6. Generate PDF with A4 format
7. Update DocumentVersion (pdfGenerated flag)
8. Return PDF as binary download
```

**Implementation:**

```typescript
import { chromium } from 'playwright';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let browser;

  try {
    const userId = await verifyAuth(request);

    // Fetch document
    const document = await prisma.document.findUnique({
      where: { id: params.id },
      include: { currentVersion: true },
    });

    if (!document || !document.currentVersion) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Check access
    const hasAccess =
      document.createdById === userId ||
      document.isPublic ||
      (document.sharedWith as string[])?.includes(userId);

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Combine HTML + CSS
    const combinedHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>${document.currentVersion.cssContent}</style>
        </head>
        <body>
          ${document.currentVersion.htmlContent}
        </body>
      </html>
    `;

    // Launch Playwright browser
    browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage();

    // Set content and wait for rendering
    await page.setContent(combinedHtml, {
      waitUntil: 'networkidle',
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm',
      },
      printBackground: true,
    });

    // Update version with PDF flag
    await prisma.documentVersion.update({
      where: { id: document.currentVersion.id },
      data: {
        pdfGenerated: true,
        pdfGeneratedAt: new Date(),
      },
    });

    // Return PDF as download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${document.slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: `Failed to generate PDF: ${error.message}` },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// GET redirects to POST for convenience
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return POST(request, { params });
}
```

**Playwright Configuration:**

**File:** `playwright.config.ts`

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
});
```

**Dependencies:**

```json
{
  "dependencies": {
    "playwright": "^1.40.0"
  }
}
```

**Performance:**
- Average generation time: 2-5 seconds
- Memory usage: ~200MB per PDF
- Concurrent limit: 5 (configurable)

---

## Version Control System

### Version Creation Logic

**Trigger:** Content change (HTML or CSS)

**Process:**
1. Fetch current version number
2. Increment version number
3. Create new `DocumentVersion` record
4. Update `Document.currentVersionId` to point to new version

**Code:**

```typescript
// In PATCH /api/documents/[id]

const newVersionNumber = (document.currentVersion?.versionNumber ?? 0) + 1;

const newVersion = await prisma.documentVersion.create({
  data: {
    documentId: document.id,
    versionNumber: newVersionNumber,
    versionName: body.versionName ?? `Version ${newVersionNumber}`,
    htmlContent: body.htmlContent,
    cssContent: body.cssContent,
    changeNotes: body.changeNotes,
    createdById: userId,
  },
});

await prisma.document.update({
  where: { id: document.id },
  data: { currentVersionId: newVersion.id },
});
```

### Immutability

- **Versions are never updated** after creation
- Only `pdfGenerated` and `pdfGeneratedAt` are updated (for tracking)
- To "edit" a version, create a new version instead

### Version Retrieval

**Get all versions:**
```typescript
const versions = await prisma.documentVersion.findMany({
  where: { documentId: 'doc123' },
  orderBy: { versionNumber: 'desc' },
});
```

**Get specific version:**
```typescript
const version = await prisma.documentVersion.findUnique({
  where: {
    documentId_versionNumber: {
      documentId: 'doc123',
      versionNumber: 2,
    },
  },
});
```

---

## Template Engine

**File:** `src/lib/document-templates.ts`

### Template Definition

```typescript
export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: DocumentType;
  htmlTemplate: string;
  cssTemplate: string;
  variables?: TemplateVariable[];
}

export interface TemplateVariable {
  name: string;
  description: string;
  defaultValue: string;
}
```

### Variable Replacement Function

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
const template = getTemplateById('professional-resume');
const variables = {
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  email: 'john@example.com',
};

const html = replaceTemplateVariables(template.htmlTemplate, variables);
// Result: HTML with {{name}}, {{jobTitle}}, {{email}} replaced
```

### Helper Functions

```typescript
// Get template by ID
export function getTemplateById(id: string): DocumentTemplate | undefined {
  return documentTemplates.find(t => t.id === id);
}

// Get templates by category
export function getTemplatesByCategory(category: DocumentType): DocumentTemplate[] {
  return documentTemplates.filter(t => t.category === category);
}

// Get all active templates
export function getAllTemplates(): DocumentTemplate[] {
  return documentTemplates;
}
```

---

## Authentication & Authorization

### Authentication Flow

1. **User logs in** → JWT token issued
2. **Token stored** in cookies/localStorage
3. **Every API request** includes `Authorization: Bearer <token>`
4. **Middleware verifies** token and extracts user ID

### verifyAuth Middleware

**File:** `src/lib/auth.ts` (example)

```typescript
import { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function verifyAuth(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.substring(7);

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    if (!payload.userId) {
      throw new Error('Invalid token payload');
    }

    return payload.userId as string;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
```

### Authorization Rules

| Action | Rule |
|--------|------|
| View document | Owner OR public OR in sharedWith |
| Edit document | Owner only |
| Delete document | Owner only |
| Export PDF | Owner OR public OR in sharedWith |
| Create document | Authenticated user |

### Permission Checks

```typescript
// Check if user can view
const canView =
  document.createdById === userId ||
  document.isPublic ||
  (document.sharedWith as string[])?.includes(userId);

// Check if user can edit
const canEdit = document.createdById === userId;
```

---

## Performance Considerations

### Database Queries

**Optimization 1: Include current version in list query**
```typescript
// Avoids N+1 queries
const documents = await prisma.document.findMany({
  include: {
    currentVersion: true, // Join instead of separate query
  },
});
```

**Optimization 2: Limit version history**
```typescript
// Only fetch recent versions
const versions = await prisma.documentVersion.findMany({
  where: { documentId: 'doc123' },
  orderBy: { versionNumber: 'desc' },
  take: 10, // Limit to last 10 versions
});
```

**Optimization 3: Use indexes**
```prisma
@@index([createdById])
@@index([updatedAt])
@@index([slug])
```

### Frontend Performance

**Optimization 1: Debounced preview updates**
```typescript
const debouncedHtml = useDebounce(html, 500);
const debouncedCss = useDebounce(css, 500);
```

**Optimization 2: Memoized preview HTML**
```typescript
const previewHtml = useMemo(() => {
  return `<html><head><style>${css}</style></head><body>${html}</body></html>`;
}, [html, css]);
```

**Optimization 3: Auto-save throttling**
```typescript
const autoSaveInterval = 30000; // 30 seconds, not on every keystroke
```

### PDF Generation Performance

**Optimization 1: Reuse browser instance (future)**
```typescript
// Current: New browser per request
// Future: Browser pool
const browserPool = new BrowserPool({ max: 5 });
const browser = await browserPool.acquire();
```

**Optimization 2: Cache PDFs (future)**
```typescript
// Generate PDF once, cache for 24 hours
const cacheKey = `pdf:${documentId}:${versionId}`;
const cachedPdf = await redis.get(cacheKey);
if (cachedPdf) return cachedPdf;
```

---

## Error Handling

### API Error Response Format

```typescript
{
  "error": "Error message describing the issue"
}
```

### Error Types

| HTTP Status | Error Type | Example |
|-------------|------------|---------|
| 400 | Bad Request | Missing required fields, invalid input |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | User lacks permission (not owner) |
| 404 | Not Found | Document does not exist |
| 500 | Internal Server Error | Database error, PDF generation failure |

### Error Handling Pattern

```typescript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error);

  if (error.code === 'P2002') {
    // Prisma unique constraint violation
    return NextResponse.json(
      { error: 'Slug already exists' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### Client-Side Error Handling

```typescript
try {
  const response = await fetch('/api/documents', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create document');
  }

  const document = await response.json();
  // Success
} catch (error) {
  console.error(error);
  alert(error.message);
}
```

---

## Testing Strategy

### Unit Tests

**Test:** Template variable replacement
```typescript
// template-engine.test.ts
import { replaceTemplateVariables } from '@/lib/document-templates';

test('replaces single variable', () => {
  const html = '<h1>{{name}}</h1>';
  const variables = { name: 'John' };
  const result = replaceTemplateVariables(html, variables);
  expect(result).toBe('<h1>John</h1>');
});

test('replaces multiple variables', () => {
  const html = '<h1>{{name}}</h1><p>{{role}}</p>';
  const variables = { name: 'John', role: 'Developer' };
  const result = replaceTemplateVariables(html, variables);
  expect(result).toBe('<h1>John</h1><p>Developer</p>');
});
```

### Integration Tests

**Test:** Create document API
```typescript
// api/documents.test.ts
import { POST } from '@/app/api/documents/route';

test('creates document with version', async () => {
  const request = new NextRequest('http://localhost/api/documents', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer valid-token',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Test Document',
      slug: 'test-document',
      documentType: 'CUSTOM',
    }),
  });

  const response = await POST(request);
  const data = await response.json();

  expect(response.status).toBe(201);
  expect(data.title).toBe('Test Document');
  expect(data.currentVersion.versionNumber).toBe(1);
});
```

### End-to-End Tests

**Test:** Full document creation flow
```typescript
// e2e/documents.spec.ts
import { test, expect } from '@playwright/test';

test('create and edit document', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');

  // Navigate to documents
  await page.goto('/documents');

  // Create new document
  await page.click('text=Create New Document');
  await page.click('text=Blank Document');
  await page.fill('[name="title"]', 'E2E Test Document');
  await page.click('text=Create Document');

  // Edit document
  await expect(page).toHaveURL(/\/documents\/.*\/edit/);
  await page.fill('textarea', '<h1>Test Content</h1>');
  await page.click('text=Save');

  // Verify saved
  await expect(page.locator('text=Last saved')).toBeVisible();
});
```

---

## Deployment & Monitoring

### Environment Variables

```bash
# .env.local
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
DIRECT_URL="postgresql://user:pass@host:5432/dbname"  # For migrations
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_API_URL="https://yourapp.com"
```

### Deployment Checklist

- [ ] Database migrations applied (`npx prisma migrate deploy`)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Environment variables configured
- [ ] Playwright installed (`npx playwright install`)
- [ ] Build successful (`npm run build`)

### Vercel Deployment

**vercel.json:**
```json
{
  "buildCommand": "npx prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install && npx playwright install chromium"
}
```

### Monitoring

**Key Metrics:**
- API response times (target: <200ms)
- PDF generation success rate (target: >99%)
- Database query performance
- Auto-save success rate

**Logging:**
```typescript
console.log('[PDF] Generating PDF for document:', documentId);
console.error('[PDF] Generation failed:', error);
```

**Error Tracking:** Sentry, LogRocket, or similar

---

## Security Considerations

### Input Sanitization

**Prevent XSS:**
- User HTML is sandboxed in iframe
- Preview iframe has `sandbox="allow-same-origin"`

**Prevent SQL Injection:**
- Prisma ORM uses parameterized queries (safe by default)

### Authentication Security

- JWT tokens have expiration
- Secret key stored in environment variables
- HTTPS only in production

### Authorization Checks

- Every API route verifies user identity
- Permission checks before sensitive operations

### Rate Limiting (Future)

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

export async function POST(request: NextRequest) {
  await limiter(request);
  // ... rest of handler
}
```

---

## Related Documentation

- [Overview](./01-OVERVIEW.md) - System architecture
- [API Reference](./03-API-REFERENCE.md) - API endpoints
- [Database Schema](./04-DATABASE-SCHEMA.md) - Database structure

---

**Questions?** Contact the development team or file an issue.
