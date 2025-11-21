/**
 * Script to clean all interview notes by removing:
 * 1. **Records:** [Transcript](#) | [Recording](#)
 * 2. --- separator
 * 3. ## Action Items section and everything after it
 */

import { prisma } from '../src/lib/prisma';

async function cleanAllInterviewNotes() {
  try {
    console.log('Fetching all interview notes...\n');

    const interviews = await prisma.hRInterviewNote.findMany({
      select: {
        id: true,
        notes: true,
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });

    console.log(`Found ${interviews.length} interview notes\n`);

    let updatedCount = 0;
    let unchangedCount = 0;

    for (const interview of interviews) {
      let cleanedNotes = interview.notes;
      let wasModified = false;

      // 1. Remove the **Records:** line (with any variation)
      const recordsPattern = /\*\*Records:\*\*[^\n]*\n?/gi;
      if (recordsPattern.test(cleanedNotes)) {
        cleanedNotes = cleanedNotes.replace(recordsPattern, '');
        wasModified = true;
      }

      // 2. Remove --- separator (and other variations like ***, ___)
      const separatorPattern = /^[\s]*(-{3,}|\*{3,}|_{3,})[\s]*$/gm;
      if (separatorPattern.test(cleanedNotes)) {
        cleanedNotes = cleanedNotes.replace(separatorPattern, '');
        wasModified = true;
      }

      // 3. Remove ## Action Items section and everything after it
      const actionItemsIndex = cleanedNotes.search(/^##\s+Action\s+Items/im);
      if (actionItemsIndex !== -1) {
        cleanedNotes = cleanedNotes.substring(0, actionItemsIndex);
        wasModified = true;
      }

      // 4. Clean up excessive newlines (more than 2 consecutive)
      cleanedNotes = cleanedNotes.replace(/\n{3,}/g, '\n\n');

      // 5. Trim trailing whitespace
      cleanedNotes = cleanedNotes.trim();

      if (wasModified) {
        // Update the interview note
        await prisma.hRInterviewNote.update({
          where: { id: interview.id },
          data: { notes: cleanedNotes },
        });

        console.log(`✓ Updated: ${interview.user.fullName}`);
        console.log(`  Before: ${interview.notes.length} chars`);
        console.log(`  After: ${cleanedNotes.length} chars`);
        console.log(`  Removed: ${interview.notes.length - cleanedNotes.length} chars\n`);
        updatedCount++;
      } else {
        console.log(`⏭️  Unchanged: ${interview.user.fullName}`);
        unchangedCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Summary:`);
    console.log(`   Updated: ${updatedCount} interview notes`);
    console.log(`   Unchanged: ${unchangedCount} interview notes`);
    console.log(`   Total: ${interviews.length} interview notes`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('Error cleaning interview notes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
cleanAllInterviewNotes()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
