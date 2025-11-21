/**
 * Import Action Items from Interview Notes
 *
 * This script reads all interview notes from the build-data folder,
 * parses the "## Action Items" sections, and creates HRActionItem records
 * in the database with proper employee and assignment mapping.
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Interview notes directory
const INTERVIEW_NOTES_DIR = path.join(
  process.cwd(),
  'build-data',
  'hr review',
  'documentation',
  'Interview'
);

interface ParsedAction {
  person: string;
  action: string;
}

/**
 * Parse action items from markdown interview notes
 * Format: ## Action Items\n- **Person Name:** Action description
 */
function parseActionItemsFromMarkdown(markdown: string): ParsedAction[] {
  const actionItems: ParsedAction[] = [];
  const lines = markdown.split('\n');

  let inActionItemsSection = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check if we're entering the Action Items section
    if (trimmedLine.toLowerCase() === '## action items') {
      inActionItemsSection = true;
      continue;
    }

    // Check if we're leaving the Action Items section (new ## header)
    if (inActionItemsSection && trimmedLine.startsWith('## ') && !trimmedLine.toLowerCase().includes('action items')) {
      inActionItemsSection = false;
      continue;
    }

    // If we're in the Action Items section, parse the action items
    if (inActionItemsSection && trimmedLine) {
      // Match patterns like: - **Name:** Action text
      const match = trimmedLine.match(/^-\s*\*\*([^*]+):\*\*\s+(.+)/);
      if (match) {
        const person = match[1].trim();
        const action = match[2].trim();
        actionItems.push({ person, action });
      }
    }
  }

  return actionItems;
}

/**
 * Map interview note filename to database user full name
 */
function getEmployeeNameFromFilename(filename: string): string {
  // Map filenames to database user full names
  const filenameMap: Record<string, string> = {
    'christina': 'Aida Cristina Ibarra Sarabia',
    'christina.md': 'Aida Cristina Ibarra Sarabia',
    'juan': 'Juan Bac',
    'juan.md': 'Juan Bac',
    'kimberly': 'Xinyan Zhang (Kimberly)',
    'kimberly.md': 'Xinyan Zhang (Kimberly)',
    'kristy': 'Kristy Kohlmann',
    'kristy.md': 'Kristy Kohlmann',
    'nora': 'Lujia Yang (Nora)',
    'nora.md': 'Lujia Yang (Nora)',
    'perla': 'Perla Luque',
    'perla.md': 'Perla Luque',
    'raul': 'Raul Lugo',
    'raul.md': 'Raul Lugo',
    'tarun': 'Tarun Sengar',
    'tarun.md': 'Tarun Sengar',
    'benjamin dib': 'Benjamin Dib',
    'benjamin dib.md': 'Benjamin Dib',
  };

  const normalized = filename.toLowerCase();
  return filenameMap[normalized] || filename;
}

/**
 * Map action assignee names to database user full names
 */
function normalizeAssigneeName(name: string): string {
  // Normalize common name variations for assignees
  const nameMap: Record<string, string> = {
    'cris ibarra': 'Aida Cristina Ibarra Sarabia',
    'cris': 'Aida Cristina Ibarra Sarabia',
    'xinyan zhang': 'Xinyan Zhang (Kimberly)',
    'kimbley': 'Xinyan Zhang (Kimberly)',
    'lujia yang': 'Lujia Yang (Nora)',
    'nora': 'Lujia Yang (Nora)',
    'ben': 'Benjamin Dib',
    'benjamin': 'Benjamin Dib',
    'juan': 'Juan Bac',
    'juan baca': 'Juan Bac',
    'perla': 'Perla Luque',
    'perla luque': 'Perla Luque',
  };

  const normalized = name.toLowerCase().trim();
  return nameMap[normalized] || name;
}

async function main() {
  console.log('🚀 Starting import of action items from interview notes...\n');

  // Read all interview note files
  const files = fs.readdirSync(INTERVIEW_NOTES_DIR);
  const markdownFiles = files.filter(f => f.endsWith('.md') && !f.includes('juan-interview'));

  console.log(`📂 Found ${markdownFiles.length} interview note files\n`);

  // Fetch all users for name mapping
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
    },
  });

  console.log(`👥 Found ${allUsers.length} users in database\n`);

  let totalActionsCreated = 0;
  let totalActionsSkipped = 0;
  const errors: string[] = [];

  for (const filename of markdownFiles) {
    const filePath = path.join(INTERVIEW_NOTES_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract employee name from filename and map to database name
    const rawName = filename.replace('.md', '').trim();
    const employeeName = getEmployeeNameFromFilename(rawName);

    console.log(`\n📄 Processing: ${rawName} → ${employeeName}`);

    // Find the employee in the database
    const employee = allUsers.find(
      u => u.fullName.toLowerCase() === employeeName.toLowerCase()
    );

    if (!employee) {
      const error = `❌ Employee not found in database: ${employeeName}`;
      console.log(error);
      errors.push(error);
      continue;
    }

    console.log(`   ✅ Matched to user: ${employee.fullName} (@${employee.username})`);

    // Check if interview note already exists in database
    let interviewNote = await prisma.hRInterviewNote.findFirst({
      where: { userId: employee.id },
    });

    // If interview note doesn't exist, create it
    if (!interviewNote) {
      // Extract interview date from content (format: **Date:** October 27, 2025)
      const dateMatch = content.match(/\*\*Date:\*\*\s+([^\n]+)/);
      let interviewDate = new Date();

      if (dateMatch) {
        const dateStr = dateMatch[1].trim();
        interviewDate = new Date(dateStr);
      }

      console.log(`   📝 Creating interview note record...`);

      interviewNote = await prisma.hRInterviewNote.create({
        data: {
          userId: employee.id,
          interviewDate: interviewDate,
          notes: content,
          interviewer: 'Keith Dimech',
          interviewType: 'Annual Review',
        },
      });

      console.log(`   ✅ Interview note created`);
    } else {
      console.log(`   ℹ️  Interview note already exists`);
    }

    // Parse action items from markdown
    const parsedActions = parseActionItemsFromMarkdown(content);

    console.log(`   🎯 Found ${parsedActions.length} action items`);

    if (parsedActions.length === 0) {
      console.log(`   ⚠️  No action items found in "## Action Items" section`);
      continue;
    }

    // Create action items
    for (const { person, action } of parsedActions) {
      console.log(`\n   👉 Action: ${person} - ${action.substring(0, 50)}...`);

      // Handle combined names (e.g., "Fabian Kohlmann and Keith Dimech" or "Keith & Fabian")
      // Split on "and" or "&" and take the first person mentioned
      let assigneeName = person.trim();

      // Handle special case of "ALL" - assign to Keith as the coordinator
      if (assigneeName.toUpperCase() === 'ALL') {
        assigneeName = 'Keith Dimech';
        console.log(`      ℹ️  ALL team action, assigning to coordinator: ${assigneeName}`);
      }
      // Split on "and" or "&"
      else if (assigneeName.toLowerCase().includes(' and ') || assigneeName.includes(' & ')) {
        const parts = assigneeName.split(/\s+(?:and|&)\s+/i);
        assigneeName = parts[0].trim();
        console.log(`      ℹ️  Multiple assignees detected, using primary: ${assigneeName}`);
      }

      // Find the assigned user by name
      let assignedUser = allUsers.find(
        u => u.fullName.toLowerCase() === assigneeName.toLowerCase()
      );

      // Try normalized name
      if (!assignedUser) {
        const normalizedName = normalizeAssigneeName(assigneeName);
        assignedUser = allUsers.find(
          u => u.fullName.toLowerCase() === normalizedName.toLowerCase()
        );
      }

      if (!assignedUser) {
        const error = `      ❌ Assigned user not found: ${person}`;
        console.log(error);
        errors.push(error);
        totalActionsSkipped++;
        continue;
      }

      // Check if this action already exists
      const existingAction = await prisma.hRActionItem.findFirst({
        where: {
          description: action,
          employeeId: employee.id,
          assignedToId: assignedUser.id,
        },
      });

      if (existingAction) {
        console.log(`      ⏭️  Action already exists, skipping`);
        totalActionsSkipped++;
        continue;
      }

      // Get the current user (Keith) as the creator
      const creator = allUsers.find(u => u.username === 'keith');

      if (!creator) {
        console.log(`      ❌ Could not find creator user (keith)`);
        errors.push('Creator user (keith) not found');
        totalActionsSkipped++;
        continue;
      }

      // Create the action item
      await prisma.hRActionItem.create({
        data: {
          description: action,
          employeeId: employee.id, // Who the action is FOR
          assignedToId: assignedUser.id, // Who will DO the action
          interviewNoteId: interviewNote.id,
          createdById: creator.id,
          priority: 'MEDIUM',
          status: 'PENDING',
        },
      });

      console.log(`      ✅ Created action item assigned to ${assignedUser.fullName}`);
      totalActionsCreated++;
    }
  }

  console.log('\n\n' + '='.repeat(60));
  console.log('✨ Import Complete!');
  console.log('='.repeat(60));
  console.log(`✅ Total actions created: ${totalActionsCreated}`);
  console.log(`⏭️  Total actions skipped: ${totalActionsSkipped}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors encountered (${errors.length}):`);
    errors.forEach(err => console.log(`   ${err}`));
  }

  console.log('\n💡 Next steps:');
  console.log('   1. Go to http://localhost:3000/hr-review');
  console.log('   2. Navigate to the "Action Items" tab');
  console.log('   3. Set due dates for each action item');
  console.log('   4. Assign priorities as needed\n');
}

main()
  .catch((error) => {
    console.error('💥 Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
