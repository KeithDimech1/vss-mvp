# Database Scripts

Utility scripts for managing and inspecting the VSS MVP database.

## Available Scripts

### 1. Check Database State
```bash
npx tsx scripts/check-db.ts
```

**What it does:**
- Shows total user count
- Lists all users with their roles
- Shows total assessment count
- Lists all assessments with completion status

**When to use:** To quickly verify database state without launching Prisma Studio

---

### 2. View Assessment Details
```bash
npx tsx scripts/view-assessment.ts [username]
```

**Examples:**
```bash
npx tsx scripts/view-assessment.ts keith
npx tsx scripts/view-assessment.ts fabian
npx tsx scripts/view-assessment.ts wayne
```

**What it does:**
- Shows full assessment details for a specific user
- Displays all question responses
- Shows completion status and timestamps

**When to use:** To inspect a specific user's assessment responses in detail

---

### 3. Seed Test Assessments
```bash
npx tsx scripts/seed-test-assessments.ts
```

**What it does:**
- Creates test assessment data for:
  - **Fabian:** Completed assessment (10/10 questions)
  - **Wayne:** In-progress assessment (6/10 questions)
  - **Moritz:** Just started assessment (2/10 questions)
- Uses realistic data from the draft answers document
- Won't duplicate if assessments already exist

**When to use:**
- Initial setup to populate test data
- Testing the admin view with multiple assessments
- Demonstrating different completion states

---

## Database Tools

### Prisma Studio (Visual Database Browser)
```bash
npx prisma studio
```

**What it does:**
- Opens a web UI at http://localhost:5555
- Visual interface to browse/edit database records
- Shows all tables (User, Assessment)
- Can manually edit records

**When to use:**
- Visual inspection of data
- Manual data corrections
- Understanding database structure

---

## Current Database State

After running seed scripts, you should have:

**Users:** 27 total
- 1 Admin: Keith Dimech (@keith)
- 26 Members: Actual Lithodat team roster

**Assessments:** 4 total
- Keith Dimech: ✅ Completed (10/10)
- Fabian: ✅ Completed (10/10)
- Wayne: 🔄 In Progress (6/10)
- Moritz: 🔄 Just Started (2/10)

**Login Credentials:**
- Admin: `keith` / `lithodat2024`
- Members: `[username]` / `welcome2024`
  - Example: `fabian` / `welcome2024`

---

## Resetting Data

### Clear all assessments:
```bash
npx prisma studio
# Navigate to Assessment table, select all, delete
```

### Reset entire database:
```bash
npx prisma migrate reset
# WARNING: This deletes all data and re-runs migrations + seed
```

---

## Script Development

All scripts use:
- **TypeScript** with `tsx` for execution
- **Prisma Client** for database access
- **Pretty console output** with emojis and formatting

To add a new script:
1. Create `scripts/your-script.ts`
2. Import Prisma Client
3. Add async main function
4. Call with error handling and disconnect
5. Run with `npx tsx scripts/your-script.ts`
