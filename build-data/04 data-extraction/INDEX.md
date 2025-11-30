# 04 Data Extraction

**App Route:** `/data-extraction`
**Status:** REBUILDING - Original content deleted accidentally

## Overview

Data Extraction Review System - Juan-specific process documentation and feedback.

## Features

### Process Documentation
- Version-controlled process steps
- Flowchart data visualization
- Step-by-step feedback collection

### Feedback System
- Per-step correctness validation
- Quick question answers (JSON)
- Comments (400 words max)
- Multi-language support (en/es)

### Research Questions
- AI Implementation questions
- Workspace links and references
- Multi-language support

## Database Models

See `prisma/schema.prisma`:
- `DataExtractionProcess` - Process steps with flowchart data
- `DataExtractionFeedback` - Step-by-step feedback
- `DataExtractionQuestion` - Question responses
- `DataExtractionResearch` - AI implementation research

## Key Features

- Spanish/English language toggle
- Google Workspace integration links
- Completion tracking
- Unique constraints per user per step

## Subfolders

- `documentation/` - Process specifications, flowcharts
- `learning/` - Training materials, best practices
- `assets/` - Diagrams, screenshots
- `response/` - Juan's feedback, research answers

## TODO

- [ ] Rebuild process flowcharts
- [ ] Document extraction workflows
- [ ] Add training materials in Spanish/English
