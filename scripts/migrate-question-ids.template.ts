/**
 * Migration Script Template: Rename Question IDs
 *
 * USE THIS TEMPLATE when you need to rename question IDs after users have submitted responses.
 *
 * Steps:
 * 1. Copy this file to a new file (e.g., migrate-question-ids-2025-01.ts)
 * 2. Update the ACTION_SLUG and ID_MAPPINGS below
 * 3. Run: npx tsx scripts/migrate-question-ids-2025-01.ts
 * 4. Verify in Prisma Studio that responses were updated correctly
 * 5. Deploy the code with new question IDs
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CONFIGURE THIS:
const ACTION_SLUG = 'lithosurfer'; // The action you're modifying

// Map old question IDs to new question IDs
const ID_MAPPINGS: Record<string, string> = {
  // Example:
  // 'old_question_id': 'new_question_id',
  // 'question1': 'lithosurfer_tier_agreement',
  // 'question2': 'lithosurfer_tier_concerns',
};

async function migrateQuestionIds() {
  console.log(`\n🔄 Starting migration for action: ${ACTION_SLUG}`);
  console.log('ID Mappings:', ID_MAPPINGS);

  // Get the action item
  const actionItem = await prisma.actionItem.findUnique({
    where: { actionSlug: ACTION_SLUG },
    select: { id: true, title: true }
  });

  if (!actionItem) {
    console.error(`❌ Action not found: ${ACTION_SLUG}`);
    process.exit(1);
  }

  console.log(`\n✅ Found action: ${actionItem.title} (${actionItem.id})`);

  // Get all responses for this action
  const responses = await prisma.actionResponse.findMany({
    where: { actionItemId: actionItem.id },
    select: {
      id: true,
      userId: true,
      responses: true,
      user: {
        select: { username: true }
      }
    }
  });

  console.log(`\n📊 Found ${responses.length} responses to migrate`);

  if (responses.length === 0) {
    console.log('✅ No responses to migrate. Safe to proceed with code changes.');
    await prisma.$disconnect();
    return;
  }

  // Preview changes
  console.log('\n🔍 Preview of changes:');
  for (const response of responses) {
    const oldResponses = response.responses as Record<string, any>;
    const newResponses: Record<string, any> = {};

    for (const [oldId, value] of Object.entries(oldResponses)) {
      const newId = ID_MAPPINGS[oldId] || oldId; // Keep unmapped IDs as-is
      newResponses[newId] = value;

      if (oldId !== newId) {
        console.log(`  User ${response.user.username}: "${oldId}" → "${newId}"`);
      }
    }
  }

  // Ask for confirmation
  console.log('\n⚠️  This will update', responses.length, 'response(s) in the database.');
  console.log('Press Ctrl+C to cancel, or any key to continue...');

  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  // Perform migration
  console.log('\n🚀 Migrating...');
  let successCount = 0;
  let errorCount = 0;

  for (const response of responses) {
    try {
      const oldResponses = response.responses as Record<string, any>;
      const newResponses: Record<string, any> = {};

      for (const [oldId, value] of Object.entries(oldResponses)) {
        const newId = ID_MAPPINGS[oldId] || oldId;
        newResponses[newId] = value;
      }

      await prisma.actionResponse.update({
        where: { id: response.id },
        data: { responses: newResponses }
      });

      successCount++;
      console.log(`  ✅ Migrated response for user: ${response.user.username}`);
    } catch (error) {
      errorCount++;
      console.error(`  ❌ Failed for user ${response.user.username}:`, error);
    }
  }

  console.log(`\n✨ Migration complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);

  await prisma.$disconnect();
}

migrateQuestionIds().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
