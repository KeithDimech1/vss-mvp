# Documents System - API Reference

**Last Updated:** 2025-12-18
**Base URL:** `/api/documents`
**Authentication:** Required (JWT via `verifyAuth()`)

---

## Table of Contents

1. [Authentication](#authentication)
2. [List Documents](#list-documents)
3. [Create Document](#create-document)
4. [Get Document](#get-document)
5. [Update Document](#update-document)
6. [Delete Document](#delete-document)
7. [Export to PDF](#export-to-pdf)
8. [Error Responses](#error-responses)
9. [Rate Limits](#rate-limits)

---

## Authentication

All endpoints require authentication via JWT token.

### Header Format
```
Authorization: Bearer <jwt_token>
```

### Getting User ID
The API automatically extracts `userId` from the JWT token via `verifyAuth()` middleware.

---

## List Documents

Retrieve all documents accessible to the current user.

### Endpoint
```
GET /api/documents
```

### Request

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:** None

### Response

**Success (200 OK):**
```json
[
  {
    "id": "clxxx1234567890",
    "title": "Q4 Business Report",
    "slug": "q4-business-report",
    "documentType": "BUSINESS_REPORT",
    "description": "Quarterly analysis for stakeholders",
    "currentVersionId": "clxxx9876543210",
    "currentVersion": {
      "id": "clxxx9876543210",
      "versionNumber": 3,
      "versionName": "Final",
      "htmlContent": "<html>...</html>",
      "cssContent": "body { ... }",
      "pdfGenerated": true,
      "pdfGeneratedAt": "2024-12-15T10:30:00Z",
      "createdAt": "2024-12-15T10:30:00Z"
    },
    "templateId": "business-report",
    "template": {
      "name": "Business Report",
      "category": "BUSINESS_REPORT"
    },
    "isPublic": false,
    "createdAt": "2024-12-01T08:00:00Z",
    "updatedAt": "2024-12-15T10:30:00Z"
  },
  // ... more documents
]
```

### Filtering Logic

Documents are included if ANY of these conditions are true:
1. User is the creator (`createdById` matches current user)
2. Document is public (`isPublic: true`)
3. User is in the `sharedWith` array

### Ordering

Documents are ordered by `updatedAt DESC` (most recently updated first).

---

## Create Document

Create a new document with an initial version.

### Endpoint
```
POST /api/documents
```

### Request

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "My New Document",
  "slug": "my-new-document",
  "documentType": "CUSTOM",
  "description": "A custom HTML document",
  "htmlContent": "<html><body><h1>Hello World</h1></body></html>",
  "cssContent": "body { font-family: Arial; }",
  "templateId": "blank",
  "isPublic": false
}
```

**Required Fields:**
- `title` (string): Document title
- `slug` (string): URL-friendly identifier (must be unique)
- `documentType` (enum): One of `RESUME`, `BUSINESS_REPORT`, `VSM_REPORT`, `CUSTOM`

**Optional Fields:**
- `description` (string): Document description
- `htmlContent` (string): Initial HTML content (default: empty template)
- `cssContent` (string): Initial CSS content (default: empty)
- `templateId` (string): ID of template to use (default: none)
- `isPublic` (boolean): Public visibility (default: false)

### Response

**Success (201 Created):**
```json
{
  "id": "clxxx1234567890",
  "title": "My New Document",
  "slug": "my-new-document",
  "documentType": "CUSTOM",
  "description": "A custom HTML document",
  "currentVersionId": "clxxx9876543210",
  "currentVersion": {
    "id": "clxxx9876543210",
    "versionNumber": 1,
    "versionName": "Initial version",
    "htmlContent": "<html><body><h1>Hello World</h1></body></html>",
    "cssContent": "body { font-family: Arial; }",
    "pdfGenerated": false,
    "createdAt": "2024-12-18T10:00:00Z"
  },
  "templateId": "blank",
  "isPublic": false,
  "createdById": "user_clxxx111111",
  "createdAt": "2024-12-18T10:00:00Z",
  "updatedAt": "2024-12-18T10:00:00Z"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Slug already exists"
}
```

### Notes

- A `DocumentVersion` with `versionNumber: 1` is automatically created
- The document's `currentVersionId` is set to this first version
- `createdById` is automatically set from JWT token

---

## Get Document

Retrieve a single document with all version history.

### Endpoint
```
GET /api/documents/{id}
```

### Request

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Path Parameters:**
- `id` (string): Document ID

### Response

**Success (200 OK):**
```json
{
  "id": "clxxx1234567890",
  "title": "Q4 Business Report",
  "slug": "q4-business-report",
  "documentType": "BUSINESS_REPORT",
  "description": "Quarterly analysis",
  "currentVersionId": "clxxx9876543210",
  "currentVersion": {
    "id": "clxxx9876543210",
    "versionNumber": 3,
    "versionName": "Final",
    "htmlContent": "<html>...</html>",
    "cssContent": "body { ... }",
    "pdfGenerated": true,
    "pdfGeneratedAt": "2024-12-15T10:30:00Z",
    "changeNotes": "Updated financial projections",
    "createdById": "user_clxxx111111",
    "createdAt": "2024-12-15T10:30:00Z"
  },
  "versions": [
    {
      "id": "clxxx9876543210",
      "versionNumber": 3,
      "versionName": "Final",
      "createdAt": "2024-12-15T10:30:00Z"
    },
    {
      "id": "clxxx9876543211",
      "versionNumber": 2,
      "versionName": "Draft 2",
      "createdAt": "2024-12-10T14:20:00Z"
    },
    {
      "id": "clxxx9876543212",
      "versionNumber": 1,
      "versionName": "Initial version",
      "createdAt": "2024-12-01T08:00:00Z"
    }
  ],
  "templateId": "business-report",
  "isPublic": false,
  "createdById": "user_clxxx111111",
  "createdAt": "2024-12-01T08:00:00Z",
  "updatedAt": "2024-12-15T10:30:00Z"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Document not found"
}
```

**Error (403 Forbidden):**
```json
{
  "error": "Access denied"
}
```

### Access Control

User can access document if ANY of these are true:
1. User is the creator
2. Document is public
3. User is in `sharedWith` array

---

## Update Document

Update a document's metadata and/or content. Creates a new version if content changes.

### Endpoint
```
PATCH /api/documents/{id}
```

### Request

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Path Parameters:**
- `id` (string): Document ID

**Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "isPublic": true,
  "htmlContent": "<html>...</html>",
  "cssContent": "body { ... }",
  "versionName": "Draft 3",
  "changeNotes": "Fixed typos and updated header"
}
```

**All fields are optional:**
- `title` (string): New title
- `description` (string): New description
- `isPublic` (boolean): Public visibility
- `htmlContent` (string): Updated HTML
- `cssContent` (string): Updated CSS
- `versionName` (string): Name for new version (if content changed)
- `changeNotes` (string): Notes for new version (if content changed)

### Response

**Success (200 OK) - Content Changed (new version created):**
```json
{
  "id": "clxxx1234567890",
  "title": "Updated Title",
  "description": "Updated description",
  "currentVersionId": "clxxx9876543220",
  "currentVersion": {
    "id": "clxxx9876543220",
    "versionNumber": 4,
    "versionName": "Draft 3",
    "htmlContent": "<html>...</html>",
    "cssContent": "body { ... }",
    "changeNotes": "Fixed typos and updated header",
    "createdAt": "2024-12-18T11:00:00Z"
  },
  "updatedAt": "2024-12-18T11:00:00Z"
}
```

**Success (200 OK) - Only Metadata Changed (no new version):**
```json
{
  "id": "clxxx1234567890",
  "title": "Updated Title",
  "description": "Updated description",
  "isPublic": true,
  "currentVersionId": "clxxx9876543210",
  "updatedAt": "2024-12-18T11:00:00Z"
}
```

**Error (403 Forbidden):**
```json
{
  "error": "Only the document owner can edit"
}
```

### Versioning Logic

**New version is created if:**
- `htmlContent` is provided AND differs from current version, OR
- `cssContent` is provided AND differs from current version

**No new version is created if:**
- Only `title`, `description`, or `isPublic` are updated
- Content is identical to current version

### Notes

- Only the document owner can update
- Version numbers auto-increment
- Old versions are never modified (immutable)

---

## Delete Document

Delete a document and all its versions.

### Endpoint
```
DELETE /api/documents/{id}
```

### Request

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Path Parameters:**
- `id` (string): Document ID

### Response

**Success (200 OK):**
```json
{
  "message": "Document deleted successfully"
}
```

**Error (403 Forbidden):**
```json
{
  "error": "Only the document owner can delete"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Document not found"
}
```

### Notes

- Cascade deletes all `DocumentVersion` records
- Only the document owner can delete
- This action is irreversible

---

## Export to PDF

Generate a PDF from the document's current version.

### Endpoint
```
POST /api/documents/{id}/pdf
GET /api/documents/{id}/pdf  (redirects to POST)
```

### Request

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Path Parameters:**
- `id` (string): Document ID

### Response

**Success (200 OK):**

Binary PDF data with headers:
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="document-title.pdf"
```

**Error (404 Not Found):**
```json
{
  "error": "Document not found"
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Failed to generate PDF: [error details]"
}
```

### PDF Generation Process

1. Fetch document with current version
2. Combine HTML and CSS into single HTML document
3. Launch headless Chromium browser (Playwright)
4. Load HTML into browser
5. Wait for `networkidle` event
6. Generate PDF with settings:
   - Format: A4
   - Margins: 15mm all sides
   - Print background: true
7. Update `DocumentVersion`:
   - `pdfGenerated: true`
   - `pdfGeneratedAt: <current timestamp>`
8. Return PDF as binary download

### Generation Time

- Typical: 2-5 seconds
- Depends on document complexity
- May timeout after 30 seconds (server config)

### Access Control

User can export PDF if:
- User is the owner, OR
- Document is public, OR
- User is in `sharedWith` array

### Notes

- PDF is generated on-demand (not stored)
- Multiple exports regenerate the PDF each time
- Useful for getting latest content changes

---

## Error Responses

### Standard Error Format

```json
{
  "error": "Error message describing the issue"
}
```

### HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | OK | Request successful |
| 201 | Created | Document created successfully |
| 400 | Bad Request | Invalid input, missing required fields, duplicate slug |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | User lacks permission (not owner) |
| 404 | Not Found | Document does not exist |
| 500 | Internal Server Error | Database error, PDF generation failure |

### Example Error Responses

**Missing Required Field:**
```json
{
  "error": "Title is required"
}
```

**Duplicate Slug:**
```json
{
  "error": "Slug already exists"
}
```

**Permission Denied:**
```json
{
  "error": "Only the document owner can edit"
}
```

**Invalid Document Type:**
```json
{
  "error": "Invalid documentType. Must be one of: RESUME, BUSINESS_REPORT, VSM_REPORT, CUSTOM"
}
```

---

## Rate Limits

### Current Implementation

No rate limits currently enforced.

### Future Considerations

- PDF generation: 10 requests/minute per user
- Document creation: 50 requests/hour per user
- Document updates: 100 requests/hour per user

---

## Example Workflows

### Workflow 1: Create and Edit Document

```bash
# 1. Create document
POST /api/documents
{
  "title": "My Report",
  "slug": "my-report",
  "documentType": "BUSINESS_REPORT",
  "htmlContent": "<h1>Initial Draft</h1>"
}

# Response: { id: "doc123", currentVersionId: "v1", versionNumber: 1 }

# 2. Update content (creates v2)
PATCH /api/documents/doc123
{
  "htmlContent": "<h1>Revised Draft</h1>",
  "versionName": "Draft 2",
  "changeNotes": "Updated title"
}

# Response: { currentVersionId: "v2", versionNumber: 2 }

# 3. Export to PDF
POST /api/documents/doc123/pdf

# Response: PDF binary data
```

### Workflow 2: List and View Documents

```bash
# 1. List all accessible documents
GET /api/documents

# Response: [ { id: "doc123", title: "My Report", ... }, ... ]

# 2. Get specific document with versions
GET /api/documents/doc123

# Response: {
#   id: "doc123",
#   versions: [
#     { versionNumber: 2, versionName: "Draft 2" },
#     { versionNumber: 1, versionName: "Initial version" }
#   ]
# }
```

### Workflow 3: Share and Delete

```bash
# 1. Make document public
PATCH /api/documents/doc123
{
  "isPublic": true
}

# 2. Later, delete document
DELETE /api/documents/doc123

# Response: { message: "Document deleted successfully" }
```

---

## Development & Testing

### Testing with cURL

**List Documents:**
```bash
curl -X GET http://localhost:3000/api/documents \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Create Document:**
```bash
curl -X POST http://localhost:3000/api/documents \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Document",
    "slug": "test-document",
    "documentType": "CUSTOM",
    "htmlContent": "<h1>Test</h1>"
  }'
```

**Export PDF:**
```bash
curl -X POST http://localhost:3000/api/documents/DOC_ID/pdf \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  --output document.pdf
```

### Postman Collection

A Postman collection is available for testing all endpoints:
- Import from: `build-data/documentation/postman/documents-api.json` (future)

---

## Related Documentation

- [User Guide](./02-USER-GUIDE.md) - End-user instructions
- [Database Schema](./04-DATABASE-SCHEMA.md) - Database structure
- [Technical Reference](./06-TECHNICAL-REFERENCE.md) - Implementation details

---

**Questions?** Contact the development team or file an issue.
