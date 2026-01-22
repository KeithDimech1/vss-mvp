# Lesson 01: Tender Document Design - Don't Over-Design

**Status:** Active - Testing
**Context:** GDAC-SA Saudi Geological Survey tender response
**Date:** 2026-01-12

---

## What I Got Wrong (Multiple Times)

### Mistake 1: Over-Designing Everything
- Added too many callout boxes (every other paragraph in a box)
- Used gradients, shadows, rounded corners everywhere
- Made it look like a website, not a Word document
- User feedback: "TOO MANY CALL OUTS, SO MANY FONT SIZES, SO MANY COLOURS"

### Mistake 2: Too Many Typography Sizes
- Used 6-7 different font sizes trying to create "hierarchy"
- User feedback: "SO MANY FONT SIZES"
- **What works:** Only 4 sizes maximum
  - Cover title: 22pt
  - H1: 16pt
  - H2: 12pt
  - Body: 10.5pt

### Mistake 3: Too Many Colors
- Used blue, green, teal, gold, multiple gradients
- User feedback: "SO MANY COLOURS"
- **What works:** Only 2 colors
  - Primary blue: #1f4e78
  - Black text: #000000
  - Gray accents for metadata: #333, #666

### Mistake 4: Not Listening to "Word Document Style"
- User said "word document / report style document" multiple times
- I kept adding fancy web design elements
- User feedback: "this is still the fucking worst"
- **What works:** Minimal styling, just clean typography and subtle borders

### Mistake 5: Ignoring Existing Working Version
- User had a FINAL version that was already working
- Instead of just fixing the fonts (Arial → better fonts), I redesigned everything
- **What works:** Take what's already working, make minimal changes

---

## What Actually Works for Tender Documents

### Typography
- **Serif for headings:** Merriweather, Georgia (adds authority)
- **Sans-serif for body:** Inter, system fonts (clean readability)
- **Simple scale:** 4 sizes max (22pt, 16pt, 12pt, 10.5pt)
- **NO ARIAL** - User banned it globally

### Colors
- **Primary:** One brand color (#1f4e78 blue for this client)
- **Text:** Black (#000000) for body, dark gray for secondary
- **Accents:** Use primary color sparingly (borders, emphasis)
- **NO:** Gradients, multiple accent colors, fancy effects

### Layout
- **Minimal boxes:** Only use ONE type of emphasis box
  - Light gray background (#f8f9fa)
  - Left border in brand color
  - Use sparingly (2-3 max per page)
- **NO:** Multiple box styles, cards everywhere, sections in boxes

### Structure
- **Clear page breaks:** Comment in HTML: `<!-- === PAGE 2 === -->`
- **Standard margins:** 20mm all around
- **Justified text:** Professional report style
- **Minimal borders:** H1 underline, that's it

### What NOT to Do
- ❌ Create "Five Differentiating Capabilities" boxes with white text on dark background
- ❌ Add shadows to everything
- ❌ Use rounded corners (too modern for government docs)
- ❌ Put content in colored boxes
- ❌ Add checkmarks or icons everywhere
- ❌ Create fancy pipeline infographics (simple text diagram is fine)

---

## The Rule: LESS IS MORE

**For tender documents:**
- Clean > Fancy
- Simple > Complex
- Professional > Creative
- Word style > Web style

**Process:**
1. Start with what's working (if there's an existing version)
2. Change ONLY what was requested (fonts, specific issues)
3. Keep everything else the same
4. Don't add features that weren't asked for

---

## Success Criteria

A tender document is done when:
- ✅ Uses professional fonts (NOT Arial)
- ✅ Has clear type hierarchy (4 sizes max)
- ✅ Uses 1-2 colors only
- ✅ Has clear page breaks with comments
- ✅ Uses minimal boxes/styling
- ✅ Looks like a high-quality Word document
- ✅ User doesn't say "this is shit"
- ✅ **CEO TEST:** "Would you send this to your CEO?" - If no, it's not done

## Infographic Quality Standards

**The Question:** "Would you send this to your CEO?"

If the answer is NO, the infographic is NOT READY. Common failures:
- Clunky boxes that look amateur
- Poor spacing/proportions
- Cheap-looking borders or backgrounds
- SVG that looks like it was made in 5 minutes
- Not polished enough for executive presentation

**What works for tender infographics:**
- Clean, minimal design
- Professional spacing
- No gray boxes around content
- Simple line-based diagrams or NO diagram at all
- Text-only is often better than bad graphics

---

## Keywords for Detection

When user says:
- "word document style" → Use minimal styling
- "report style" → Professional, simple layout
- "tender" → Government/corporate formal style
- "too many [X]" → Reduce X immediately
- "please do some research" → I'm not listening, stop and read

---

---

## User Design Preferences (Keith Dimech)

### Typography Rules
- **NEVER use Arial** - Banned globally
- **Serif for headings:** Merriweather, Georgia (authority, elegance)
- **Sans-serif for body:** Inter, system-ui (clean, modern)
- **Font scale:** Maximum 4 sizes
  - Cover title: 22pt
  - H1: 16pt
  - H2: 12pt (with 24pt margin-top for breathing room)
  - Body: 10.5-11pt

### Color Rules
- **Maximum 2 colors** - Primary brand color + black
- **No gradients, no shadows, no fancy effects**
- For Lithodat/GDAC: #1f4e78 (navy blue) + #2d5a7b (slightly lighter for accents)

### Layout Rules
- **Clear page breaks** - Comment in HTML: `<!-- === PAGE X === -->`
- **Proper bullet points** - Use `<ul><li>` not manual bullets
- **Generous spacing above H2** - 24pt minimum
- **Justified text** for body paragraphs

### Infographic Rules
- **CEO Test:** "Would you send this to your CEO?" - If no, don't ship it
- **Clean over fancy** - Simple is better than amateur
- **Proper spacing** - Don't cram elements together
- **Clean arrows** - Must connect properly, not overlap boxes
- **No gray background boxes** around infographics
- **Professional execution** - If you can't make it look executive-quality, use text only

### What NOT to Do
- ❌ Multiple callout boxes everywhere
- ❌ Too many font sizes (more than 4)
- ❌ Too many colors (more than 2)
- ❌ Gradients, shadows, rounded corners on everything
- ❌ Cheap-looking graphics
- ❌ Cramped spacing
- ❌ Arrows that overlap or point incorrectly

---

## Session Progress (2026-01-12)

**Attempts:**
1. ❌ Over-designed version - too many boxes, colors, fonts
2. ❌ Boring Arial version - user rejected font choice
3. ❌ Over-styled version with gradients - ignored "Word document style" feedback
4. ✅ Simple version with Inter/Merriweather - closer
5. 🔧 Infographic iterations - working on professional quality

**Current Status:**
- Fonts: ✅ Fixed (Inter/Merriweather)
- Layout: ✅ Clean and simple
- Spacing: ✅ Fixed (24pt above H2)
- Bullets: ✅ Fixed (proper `<ul>`)
- Infographic: 🔧 In progress (arrow spacing being refined)

**Next Session:**
- Continue refining infographic quality
- Ensure "CEO test" passes before showing final version

---

**Tasks Tested:** 5+ iterations
**Ready for Promotion:** No - still in progress, need user approval when complete
