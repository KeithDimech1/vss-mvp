# ACTION REQUIRED: CoreTrustSeal Certificate Number
**Priority:** P1 - High
**Time Required:** 5 minutes
**Assignee:** Keith Dimech + Fabian Kohlmann
**Deadline:** Before stakeholder review distribution

---

## Issue Details

**File:** `appendices/E-Quality-Management-System-QMS-Policy.md`
**Location:** Line 138
**Current Text:** `- Certificate Number: *To be inserted*`

---

## Background

Appendix E (QMS Policy) states that Lithodat/EarthBank has CoreTrustSeal certification (line 124-139):

```markdown
### • CoreTrustSeal (CTS) – Certified Trusted Scientific Repository
Lithodat is officially **CoreTrustSeal certified** through the EarthBank (AusGeochem) repository...

**Certification status:**
- Certified: **Yes**
- Certified Repository: **EarthBank / AusGeochem**
- Certification Body: **CoreTrustSeal**
- Affiliation: **World Data System (WDS)**
- Certificate Number: *To be inserted*  ← THIS LINE
- Validity Dates: since 2023
```

---

## Required Action

**Choose ONE of these options:**

### Option 1: Insert Actual Certificate Number (Preferred)
- Contact: Fabian Kohlmann / EarthBank team / AuScope
- Source: CoreTrustSeal certification documentation
- Update line 138 with actual certificate number
- Format: `- Certificate Number: [ACTUAL NUMBER]`

### Option 2: Available Upon Request
- No external contact needed
- Update line 138 to: `- Certificate Number: Available upon request`
- Alternative: `- Certificate Number: On file with AuScope/EarthBank`

### Option 3: Remove the Line
- Simply delete line 138 entirely
- Keep all other certification details
- Least preferred option

---

## How to Obtain Certificate Number

### Contact Fabian Kohlmann
- Email: fabian.kohlmann@lithodat.com
- Phone: [Fabian's number]
- Ask: "What is the CoreTrustSeal certificate number for EarthBank/AusGeochem?"

### Contact AuScope/EarthBank
- Primary Contact: Prof. Brent McInnes (b.mcinnes@curtin.edu.au)
- Organization: AuScope (EarthBank project owner)
- They should have the official certificate documentation

### Online Verification
- CoreTrustSeal website: https://www.coretrustseal.org/
- Search for: EarthBank or AusGeochem
- Certificate details may be publicly listed

---

## Implementation

Once you have the certificate number (or chosen alternative):

**File to edit:**
```
/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/
VSM-Platform-Project/build-data/06 gdac-tender/appendices/
E-Quality-Management-System-QMS-Policy.md
```

**Line to change:** Line 138

**Current:**
```markdown
- Certificate Number: *To be inserted*
```

**Option 1 (Preferred):**
```markdown
- Certificate Number: CTS-2023-001 (example format - use actual number)
```

**Option 2 (Acceptable):**
```markdown
- Certificate Number: Available upon request from AuScope/EarthBank
```

---

## Timeline

**Deadline:** Before distributing to stakeholders for review (within 24 hours)

**Why it matters:**
- Shows attention to detail
- Completes professional documentation
- Avoids questions during stakeholder review
- Low effort, high polish value

**Impact if not done:**
- Minor professional appearance issue
- Stakeholders may ask about it
- Not submission-blocking (low severity)

---

## Follow-Up

After updating:
- [ ] Edit line 138 in Appendix E
- [ ] Mark this action as complete
- [ ] Include in final stakeholder distribution
- [ ] No need to regenerate PDFs yet (wait for all feedback)

---

**Status:** ⬜ Pending
**Last Updated:** 2026-01-11
**Owner:** Keith Dimech

---

*This is the ONLY remaining item before documentation is 100% complete.*
