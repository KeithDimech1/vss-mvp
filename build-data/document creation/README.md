# Documents System - Complete Documentation

**Last Updated:** 2025-12-18
**VSM Platform Project**

---

## Welcome to the Documents System Documentation

This folder contains comprehensive documentation for the VSM Platform's Documents System - a full-featured HTML/CSS document builder with version control, live preview, and PDF export capabilities.

---

## Quick Navigation

### For End Users
Start here if you're using the Documents System to create documents:

1. **[Overview](./01-OVERVIEW.md)** - Understanding what the system does
2. **[User Guide](./02-USER-GUIDE.md)** - Step-by-step usage instructions

### For Developers
Start here if you're developing or maintaining the Documents System:

1. **[API Reference](./03-API-REFERENCE.md)** - Complete REST API documentation
2. **[Database Schema](./04-DATABASE-SCHEMA.md)** - Database structure and models
3. **[Technical Reference](./06-TECHNICAL-REFERENCE.md)** - Implementation details and architecture

### For Template Creators
Start here if you're creating or customizing document templates:

1. **[Template Guide](./05-TEMPLATE-GUIDE.md)** - How to create and customize templates

---

## Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| **01-OVERVIEW.md** | System architecture, features, capabilities | Everyone |
| **02-USER-GUIDE.md** | How to create, edit, and export documents | End Users |
| **03-API-REFERENCE.md** | REST API endpoints, request/response formats | Developers |
| **04-DATABASE-SCHEMA.md** | Database tables, relationships, queries | Developers, DBAs |
| **05-TEMPLATE-GUIDE.md** | Template creation, variables, best practices | Template Creators |
| **06-TECHNICAL-REFERENCE.md** | Implementation details, code architecture | Developers |

---

## System Overview

### What is the Documents System?

The Documents System is a web-based document builder that enables users to:

- **Create** professional documents from 5 built-in templates
- **Edit** HTML and CSS with live preview
- **Track** complete version history with immutable versions
- **Export** high-quality PDFs using Playwright
- **Share** documents publicly or with specific users

### Key Features

✅ **Template-Based Creation** - 5 professional templates (Resume, Business Report, VSM Report, Invoice, Blank)

✅ **Split-Pane Editor** - Live HTML/CSS editing with instant preview

✅ **Version Control** - Complete version history with named versions and change notes

✅ **PDF Export** - High-fidelity HTML-to-PDF conversion

✅ **Auto-Save** - 30-second auto-save prevents data loss

✅ **Permissions** - Owner-based access control with public/private sharing

### Technology Stack

- **Frontend:** React 18, Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Neon)
- **PDF Generation:** Playwright (Chromium)
- **Authentication:** JWT-based

---

## Getting Started

### For Users

1. Read the [Overview](./01-OVERVIEW.md) to understand the system
2. Follow the [User Guide](./02-USER-GUIDE.md) to create your first document
3. Export your document to PDF when ready

### For Developers

1. Read the [Overview](./01-OVERVIEW.md) for architecture
2. Review the [API Reference](./03-API-REFERENCE.md) for endpoints
3. Study the [Database Schema](./04-DATABASE-SCHEMA.md) for data structure
4. Dive into [Technical Reference](./06-TECHNICAL-REFERENCE.md) for implementation details

### For Template Creators

1. Read the [Overview](./01-OVERVIEW.md) for context
2. Study existing templates in [Template Guide](./05-TEMPLATE-GUIDE.md)
3. Follow the guide to create custom templates
4. Test your templates in the editor

---

## Common Questions

### Q: How do I create a new document?
**A:** See [User Guide - Creating Your First Document](./02-USER-GUIDE.md#creating-your-first-document)

### Q: What are the available templates?
**A:** See [Template Guide - Built-in Templates](./05-TEMPLATE-GUIDE.md#built-in-templates)

### Q: How do I export to PDF?
**A:** See [User Guide - Exporting to PDF](./02-USER-GUIDE.md#exporting-to-pdf)

### Q: How does version control work?
**A:** See [Technical Reference - Version Control System](./06-TECHNICAL-REFERENCE.md#version-control-system)

### Q: What API endpoints are available?
**A:** See [API Reference - Table of Contents](./03-API-REFERENCE.md#table-of-contents)

### Q: How do I create a custom template?
**A:** See [Template Guide - Creating Custom Templates](./05-TEMPLATE-GUIDE.md#creating-custom-templates)

---

## File Locations

### Source Code

```
VSM-Platform-Project/
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   └── documents/
│   │   │       ├── page.tsx                    # Document list
│   │   │       ├── new/page.tsx               # New document wizard
│   │   │       └── [id]/edit/page.tsx         # Document editor
│   │   └── api/
│   │       └── documents/
│   │           ├── route.ts                   # List, Create
│   │           ├── [id]/route.ts              # Get, Update, Delete
│   │           └── [id]/pdf/route.ts          # PDF generation
│   ├── components/
│   │   └── documents/
│   │       └── SplitPaneEditor.tsx            # Main editor component
│   └── lib/
│       └── document-templates.ts              # 5 built-in templates
└── prisma/
    └── schema.prisma                          # Database schema
```

### Documentation

```
build-data/document creation/
├── 01-OVERVIEW.md              # System architecture
├── 02-USER-GUIDE.md            # Usage instructions
├── 03-API-REFERENCE.md         # API documentation
├── 04-DATABASE-SCHEMA.md       # Database structure
├── 05-TEMPLATE-GUIDE.md        # Template creation
├── 06-TECHNICAL-REFERENCE.md   # Implementation details
└── README.md                   # This file
```

---

## Contributing

### Reporting Issues

Found a bug or have a suggestion? File an issue in the project repository.

### Documentation Updates

This documentation should be updated when:
- New features are added
- API endpoints change
- Database schema is modified
- Templates are added/removed

### Versioning

Documentation versions should align with the VSM Platform release versions.

---

## Support

### Self-Service
- Read the documentation files in order
- Check the FAQ sections in each guide
- Review code examples in Technical Reference

### Contact
- **Bug Reports:** File an issue in the repository
- **Feature Requests:** Contact the product team
- **Technical Support:** Email the development team

---

## Document Metadata

**Created:** 2025-12-18
**Last Updated:** 2025-12-18
**Documentation Version:** 1.0
**VSM Platform Version:** Current (as of 2025-12-18)

---

## License

This documentation is part of the VSM Platform Project. All rights reserved.

---

**Happy documenting!** 📄
