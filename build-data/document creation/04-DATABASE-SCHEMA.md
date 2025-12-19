# Documents System - Database Schema

**Last Updated:** 2025-12-18
**Database:** PostgreSQL (Neon)
**ORM:** Prisma
**Schema File:** `prisma/schema.prisma`

---

## Table of Contents

1. [Overview](#overview)
2. [Entity Relationship Diagram](#entity-relationship-diagram)
3. [Document Model](#document-model)
4. [DocumentVersion Model](#documentversion-model)
5. [DocumentTemplate Model](#documenttemplate-model)
6. [DocumentType Enum](#documenttype-enum)
7. [Relationships](#relationships)
8. [Indexes](#indexes)
9. [Constraints](#constraints)
10. [Migration History](#migration-history)

---

## Overview

The Documents System uses 3 primary tables and 1 enum:

| Table | Purpose | Records (est.) |
|-------|---------|----------------|
| `Document` | Main document metadata | 1 per document |
| `DocumentVersion` | Version history | N per document |
| `DocumentTemplate` | Reusable templates | 5 built-in |
| `DocumentType` (enum) | Document categories | 4 types |

**Total Relationships:** 3 foreign keys, 2 unique constraints, 1 compound unique constraint

---

## Entity Relationship Diagram

```
┌─────────────────────┐
│  DocumentTemplate   │
│  (Built-in)         │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ category            │
│ htmlTemplate        │
│ cssTemplate         │
│ variables (JSON)    │
└─────────┬───────────┘
          │
          │ 1:N
          ▼
┌─────────────────────┐          ┌─────────────────────┐
│     Document        │◄─────────┤  DocumentVersion    │
│                     │  1:N     │                     │
├─────────────────────┤          ├─────────────────────┤
│ id (PK)             │          │ id (PK)             │
│ title               │          │ documentId (FK)     │
│ slug (UNIQUE)       │          │ versionNumber       │
│ documentType        │          │ versionName         │
│ description         │          │ htmlContent         │
│ currentVersionId◄───┼──────────┤ cssContent          │
│ templateId (FK)     │   1:1    │ pdfGenerated        │
│ createdById         │          │ changeNotes         │
│ isPublic            │          │ createdById         │
│ sharedWith (JSON)   │          │ createdAt           │
│ createdAt           │          └─────────────────────┘
│ updatedAt           │
└─────────────────────┘

Legend:
PK = Primary Key
FK = Foreign Key
1:N = One-to-Many
1:1 = One-to-One (currentVersion pointer)
```

---

## Document Model

**Purpose:** Stores document metadata and points to the current version.

### Prisma Schema

```prisma
model Document {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  documentType    DocumentType
  description     String?  @db.Text

  // Current version pointer
  currentVersionId String?
  currentVersion   DocumentVersion? @relation("CurrentVersion", fields: [currentVersionId], references: [id])

  // All versions
  versions        DocumentVersion[] @relation("DocumentVersions")

  // Template info
  templateId      String?
  template        DocumentTemplate? @relation(fields: [templateId], references: [id])

  // Ownership and permissions
  createdById     String
  isPublic        Boolean  @default(false)
  sharedWith      Json?    // Array of user IDs

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | String (CUID) | No | Primary key, auto-generated |
| `title` | String | No | Document title (human-readable) |
| `slug` | String | No | URL-friendly identifier (unique) |
| `documentType` | Enum | No | Category: RESUME, BUSINESS_REPORT, VSM_REPORT, CUSTOM |
| `description` | Text | Yes | Optional description |
| `currentVersionId` | String (FK) | Yes | Points to the current/active version |
| `templateId` | String (FK) | Yes | Template used to create document |
| `createdById` | String | No | User ID of document creator |
| `isPublic` | Boolean | No | Public visibility flag (default: false) |
| `sharedWith` | JSON | Yes | Array of user IDs with view access |
| `createdAt` | DateTime | No | Creation timestamp (auto) |
| `updatedAt` | DateTime | No | Last update timestamp (auto) |

### Relationships

- `currentVersion`: One-to-one with `DocumentVersion` (relation: "CurrentVersion")
- `versions`: One-to-many with `DocumentVersion` (relation: "DocumentVersions")
- `template`: Many-to-one with `DocumentTemplate`

### Indexes

- **Primary Key:** `id`
- **Unique Index:** `slug`

### Constraints

- `slug` must be unique across all documents
- `currentVersionId` must reference an existing `DocumentVersion.id`

### Example Record

```json
{
  "id": "clxxx1234567890",
  "title": "Q4 Business Report",
  "slug": "q4-business-report",
  "documentType": "BUSINESS_REPORT",
  "description": "Quarterly analysis for stakeholders",
  "currentVersionId": "clxxx9876543210",
  "templateId": "business-report",
  "createdById": "user_clxxx111111",
  "isPublic": false,
  "sharedWith": ["user_clxxx222222", "user_clxxx333333"],
  "createdAt": "2024-12-01T08:00:00Z",
  "updatedAt": "2024-12-15T10:30:00Z"
}
```

### Notes

- **CUID:** Collision-resistant unique identifier (27 chars, URL-safe)
- **Slug:** Generated from title, lowercase, hyphens instead of spaces
- **sharedWith:** JSON array of user IDs (e.g., `["user1", "user2"]`)

---

## DocumentVersion Model

**Purpose:** Stores immutable versions of document content.

### Prisma Schema

```prisma
model DocumentVersion {
  id              String   @id @default(cuid())
  documentId      String
  document        Document @relation("DocumentVersions", fields: [documentId], references: [id], onDelete: Cascade)

  versionNumber   Int      // 1, 2, 3, etc.
  versionName     String?  // Optional name like "Draft", "Final"

  // HTML and CSS content
  htmlContent     String   @db.Text
  cssContent      String   @db.Text
  combinedHtml    String?  @db.Text // Combined HTML with inline CSS (for PDF)

  // PDF generation
  pdfGenerated    Boolean  @default(false)
  pdfUrl          String?
  pdfGeneratedAt  DateTime?

  // Change tracking
  changeNotes     String?  @db.Text
  createdById     String
  createdAt       DateTime @default(now())

  // Relation for current version pointer
  currentFor      Document[] @relation("CurrentVersion")

  @@unique([documentId, versionNumber])
}
```

### Fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | String (CUID) | No | Primary key, auto-generated |
| `documentId` | String (FK) | No | References `Document.id` |
| `versionNumber` | Int | No | Sequential version number (1, 2, 3, ...) |
| `versionName` | String | Yes | Optional label (e.g., "Draft", "Final") |
| `htmlContent` | Text | No | Document HTML content |
| `cssContent` | Text | No | Document CSS styles |
| `combinedHtml` | Text | Yes | HTML with inline CSS (used for PDF) |
| `pdfGenerated` | Boolean | No | Flag if PDF was generated for this version |
| `pdfUrl` | String | Yes | URL to generated PDF (currently unused) |
| `pdfGeneratedAt` | DateTime | Yes | Timestamp when PDF was generated |
| `changeNotes` | Text | Yes | Notes describing changes in this version |
| `createdById` | String | No | User ID who created this version |
| `createdAt` | DateTime | No | Version creation timestamp (auto) |

### Relationships

- `document`: Many-to-one with `Document` (relation: "DocumentVersions")
- `currentFor`: One-to-many with `Document` (relation: "CurrentVersion", reverse)

### Indexes

- **Primary Key:** `id`
- **Compound Unique Index:** `(documentId, versionNumber)`

### Constraints

- `(documentId, versionNumber)` pair must be unique
- `onDelete: Cascade` - deleting a document deletes all its versions

### Example Record

```json
{
  "id": "clxxx9876543210",
  "documentId": "clxxx1234567890",
  "versionNumber": 3,
  "versionName": "Final",
  "htmlContent": "<html><body><h1>Q4 Report</h1><p>Content...</p></body></html>",
  "cssContent": "body { font-family: Arial; margin: 0; }",
  "combinedHtml": null,
  "pdfGenerated": true,
  "pdfUrl": null,
  "pdfGeneratedAt": "2024-12-15T10:30:00Z",
  "changeNotes": "Updated financial projections and fixed typos",
  "createdById": "user_clxxx111111",
  "createdAt": "2024-12-15T10:30:00Z"
}
```

### Versioning Logic

1. **First Version:**
   - `versionNumber: 1`
   - `versionName: "Initial version"`
   - Created automatically when document is created

2. **Subsequent Versions:**
   - Auto-increment `versionNumber`
   - Created when HTML or CSS changes
   - Previous versions remain immutable

3. **Version Retrieval:**
   - Order by `versionNumber DESC` for version history
   - Current version accessed via `Document.currentVersion`

### Notes

- **Immutable:** Versions are never updated after creation
- **Cascade Delete:** Deleting a document removes all versions
- **Text Fields:** `@db.Text` allows unlimited content length (vs VARCHAR)

---

## DocumentTemplate Model

**Purpose:** Stores reusable document templates with variables.

### Prisma Schema

```prisma
model DocumentTemplate {
  id              String   @id @default(cuid())
  name            String   @unique
  description     String   @db.Text
  category        DocumentType

  // Template content
  htmlTemplate    String   @db.Text
  cssTemplate     String   @db.Text
  thumbnailUrl    String?

  // Template variables/placeholders
  variables       Json?    // Array of { name, description, defaultValue }

  // Metadata
  isActive        Boolean  @default(true)
  usageCount      Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Documents created from this template
  documents       Document[]
}
```

### Fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | String (CUID) | No | Primary key, auto-generated |
| `name` | String | No | Template name (unique) |
| `description` | Text | No | Template description |
| `category` | Enum | No | Template category (same as DocumentType) |
| `htmlTemplate` | Text | No | HTML template with `{{variables}}` |
| `cssTemplate` | Text | No | CSS template |
| `thumbnailUrl` | String | Yes | Preview image URL |
| `variables` | JSON | Yes | Array of variable definitions |
| `isActive` | Boolean | No | Active status (default: true) |
| `usageCount` | Int | No | Number of documents created from template |
| `createdAt` | DateTime | No | Creation timestamp (auto) |
| `updatedAt` | DateTime | No | Last update timestamp (auto) |

### Relationships

- `documents`: One-to-many with `Document`

### Indexes

- **Primary Key:** `id`
- **Unique Index:** `name`

### Example Record

```json
{
  "id": "template_resume",
  "name": "Professional Resume",
  "description": "Clean, professional resume template with sections for experience, education, and skills.",
  "category": "RESUME",
  "htmlTemplate": "<div class='header'><h1>{{name}}</h1><p>{{jobTitle}}</p></div>...",
  "cssTemplate": "body { font-family: Arial; } .header { text-align: center; }",
  "thumbnailUrl": "/templates/resume-preview.png",
  "variables": [
    {
      "name": "name",
      "description": "Your full name",
      "defaultValue": "John Doe"
    },
    {
      "name": "jobTitle",
      "description": "Your job title",
      "defaultValue": "Software Engineer"
    },
    {
      "name": "email",
      "description": "Email address",
      "defaultValue": "john@example.com"
    }
  ],
  "isActive": true,
  "usageCount": 42,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-12-01T12:00:00Z"
}
```

### Variables JSON Schema

```typescript
interface TemplateVariable {
  name: string;          // Variable name (used in {{name}})
  description: string;   // Human-readable description
  defaultValue: string;  // Default/placeholder value
}

// Example
variables: TemplateVariable[] = [
  {
    name: "companyName",
    description: "Company name for the report",
    defaultValue: "Acme Corporation"
  }
]
```

### Built-in Templates

See [Template Guide](./05-TEMPLATE-GUIDE.md) for the 5 built-in templates:
1. Blank Document
2. Professional Resume
3. Business Report
4. VSM Assessment Report
5. Modern Invoice

### Notes

- **Template Variables:** Use `{{variableName}}` syntax in HTML
- **Variable Replacement:** Handled by `replaceTemplateVariables()` in `src/lib/document-templates.ts`
- **Usage Count:** Could be incremented when documents are created (future feature)

---

## DocumentType Enum

**Purpose:** Categorize documents and templates.

### Prisma Schema

```prisma
enum DocumentType {
  RESUME           // Personal resume/CV
  BUSINESS_REPORT  // Business reports, analytics
  VSM_REPORT       // VSM assessment reports
  CUSTOM           // Custom HTML documents
}
```

### Values

| Value | Description | Use Cases |
|-------|-------------|-----------|
| `RESUME` | Personal resume/CV | Job applications, professional profiles |
| `BUSINESS_REPORT` | Business reports | Quarterly reports, proposals, analytics |
| `VSM_REPORT` | VSM assessment reports | Client deliverables, system analysis |
| `CUSTOM` | Custom HTML documents | Letters, certificates, presentations |

### Usage

- Used in `Document.documentType`
- Used in `DocumentTemplate.category`
- Determines template filtering and categorization

---

## Relationships

### Relationship Summary

```
DocumentTemplate (1) ──< (N) Document
Document (1) ──< (N) DocumentVersion
Document (1) ──> (1) DocumentVersion (currentVersion)
```

### Foreign Keys

| Table | Column | References | On Delete |
|-------|--------|------------|-----------|
| `Document` | `currentVersionId` | `DocumentVersion.id` | SET NULL (implied) |
| `Document` | `templateId` | `DocumentTemplate.id` | SET NULL (implied) |
| `DocumentVersion` | `documentId` | `Document.id` | CASCADE |

### Cascade Behavior

**Deleting a Document:**
- ✅ Deletes all associated `DocumentVersion` records (CASCADE)
- ❌ Does NOT delete the `DocumentTemplate`

**Deleting a DocumentTemplate:**
- ❌ Does NOT delete documents created from it
- Documents' `templateId` becomes NULL (implied SET NULL)

**Deleting a DocumentVersion:**
- ❌ Cannot delete if it's the current version of a document
- Must update `Document.currentVersionId` first

---

## Indexes

### Automatic Indexes (Prisma)

1. **Primary Keys:**
   - `Document.id`
   - `DocumentVersion.id`
   - `DocumentTemplate.id`

2. **Unique Constraints:**
   - `Document.slug`
   - `DocumentTemplate.name`
   - `(DocumentVersion.documentId, DocumentVersion.versionNumber)`

3. **Foreign Keys:**
   - `Document.currentVersionId` → `DocumentVersion.id`
   - `Document.templateId` → `DocumentTemplate.id`
   - `DocumentVersion.documentId` → `Document.id`

### Recommended Additional Indexes (Future)

```prisma
@@index([createdById])           // Fast filtering by user
@@index([documentType])          // Fast filtering by type
@@index([isPublic])              // Fast filtering for public docs
@@index([updatedAt])             // Fast ordering by recent
```

---

## Constraints

### Unique Constraints

1. **`Document.slug`**: Must be unique across all documents
2. **`DocumentTemplate.name`**: Must be unique across all templates
3. **`(DocumentVersion.documentId, versionNumber)`**: Prevents duplicate version numbers

### Check Constraints (Implicit)

- `Document.documentType` must be one of: RESUME, BUSINESS_REPORT, VSM_REPORT, CUSTOM
- `DocumentVersion.versionNumber` should be > 0 (enforced in application logic)

### Referential Integrity

- `Document.currentVersionId` must reference an existing `DocumentVersion.id` that belongs to the same document
- `DocumentVersion.documentId` must reference an existing `Document.id`

---

## Migration History

### Initial Migration (Example)

**Migration:** `20241201_create_documents_tables`

**Created:**
- `Document` table
- `DocumentVersion` table
- `DocumentTemplate` table
- `DocumentType` enum

**SQL (PostgreSQL):**

```sql
-- DocumentType Enum
CREATE TYPE "DocumentType" AS ENUM ('RESUME', 'BUSINESS_REPORT', 'VSM_REPORT', 'CUSTOM');

-- DocumentTemplate Table
CREATE TABLE "DocumentTemplate" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" "DocumentType" NOT NULL,
  "htmlTemplate" TEXT NOT NULL,
  "cssTemplate" TEXT NOT NULL,
  "thumbnailUrl" TEXT,
  "variables" JSONB,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "usageCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "DocumentTemplate_pkey" PRIMARY KEY ("id")
);

-- Document Table
CREATE TABLE "Document" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "documentType" "DocumentType" NOT NULL,
  "description" TEXT,
  "currentVersionId" TEXT,
  "templateId" TEXT,
  "createdById" TEXT NOT NULL,
  "isPublic" BOOLEAN NOT NULL DEFAULT false,
  "sharedWith" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- DocumentVersion Table
CREATE TABLE "DocumentVersion" (
  "id" TEXT NOT NULL,
  "documentId" TEXT NOT NULL,
  "versionNumber" INTEGER NOT NULL,
  "versionName" TEXT,
  "htmlContent" TEXT NOT NULL,
  "cssContent" TEXT NOT NULL,
  "combinedHtml" TEXT,
  "pdfGenerated" BOOLEAN NOT NULL DEFAULT false,
  "pdfUrl" TEXT,
  "pdfGeneratedAt" TIMESTAMP(3),
  "changeNotes" TEXT,
  "createdById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DocumentVersion_pkey" PRIMARY KEY ("id")
);

-- Unique Indexes
CREATE UNIQUE INDEX "Document_slug_key" ON "Document"("slug");
CREATE UNIQUE INDEX "DocumentTemplate_name_key" ON "DocumentTemplate"("name");
CREATE UNIQUE INDEX "DocumentVersion_documentId_versionNumber_key" ON "DocumentVersion"("documentId", "versionNumber");

-- Foreign Keys
ALTER TABLE "Document" ADD CONSTRAINT "Document_currentVersionId_fkey"
  FOREIGN KEY ("currentVersionId") REFERENCES "DocumentVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Document" ADD CONSTRAINT "Document_templateId_fkey"
  FOREIGN KEY ("templateId") REFERENCES "DocumentTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_documentId_fkey"
  FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### Applying Migrations

```bash
# Generate migration
npx prisma migrate dev --name create_documents_tables

# Apply to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

---

## Sample Queries

### Get Document with Current Version

```sql
SELECT d.*, v.*
FROM "Document" d
LEFT JOIN "DocumentVersion" v ON d."currentVersionId" = v.id
WHERE d.id = 'clxxx1234567890';
```

### Get All Versions for a Document

```sql
SELECT *
FROM "DocumentVersion"
WHERE "documentId" = 'clxxx1234567890'
ORDER BY "versionNumber" DESC;
```

### Get Public Documents

```sql
SELECT *
FROM "Document"
WHERE "isPublic" = true
ORDER BY "updatedAt" DESC;
```

### Get Documents by User (including shared)

```sql
SELECT *
FROM "Document"
WHERE "createdById" = 'user_clxxx111111'
   OR "isPublic" = true
   OR "sharedWith" @> '["user_clxxx111111"]'::jsonb
ORDER BY "updatedAt" DESC;
```

---

## Database Seeding

### Seed Script Location
`prisma/seed.ts` (or `seed.js`)

### Example Seed Data

```typescript
import { PrismaClient } from '@prisma/client';
import { documentTemplates } from '../src/lib/document-templates';

const prisma = new PrismaClient();

async function main() {
  // Seed DocumentTemplates
  for (const template of documentTemplates) {
    await prisma.documentTemplate.upsert({
      where: { name: template.name },
      update: template,
      create: template,
    });
  }

  console.log('Seeded 5 document templates');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Running Seed

```bash
npx prisma db seed
```

---

## Related Documentation

- [Overview](./01-OVERVIEW.md) - System architecture
- [API Reference](./03-API-REFERENCE.md) - REST API endpoints
- [Template Guide](./05-TEMPLATE-GUIDE.md) - Template creation

---

**Questions?** Contact the development team or consult Prisma documentation.
