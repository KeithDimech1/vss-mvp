# 07 ISO Documents

Build data for the ISO Document Builder form system.

## Purpose

This folder contains documentation, research, and assets related to ISO-aligned policy and procedure documents:

- **HSE Policy** (ISO 45001 + ISO 14001) - Health, Safety & Environment
- **Quality Policy** (ISO 9001) - Quality Management System
- **Environmental Policy** (ISO 14001 standalone) - Coming soon
- **OHS Policy** (ISO 45001 standalone) - Coming soon
- **IMS Manual** (Integrated Management System) - Coming soon

## Related Form

- **URL:** `/iso-documents`
- **Access:** Managers only
- **Form ID:** FORM-003 (iso-document-builder)

## Folder Structure

```
07 iso-documents/
├── assets/          - Logos, images, PDF templates
├── documentation/   - Implementation specs, guides
├── learning/        - ISO standards research, examples
├── prototypes/      - Draft documents, mockups
├── archive/         - Old versions, deprecated docs
├── errors/          - Form-specific error tracking
└── ideas/           - Feature ideas for the form
```

## Key Files

- `src/lib/iso-documents/hse-policy-template.ts` - HSE template (10 sections)
- `src/lib/iso-documents/quality-policy-template.ts` - Quality template (14 sections)
- `src/app/(dashboard)/iso-documents/` - Frontend pages

## Related Ideas

- IDEA-002: Lithodat HSE Policy & Procedures (implemented)
