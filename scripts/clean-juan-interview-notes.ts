/**
 * Script to remove sensitive financial information from Juan's interview notes
 */

import { prisma } from '../src/lib/prisma';

async function cleanInterviewNotes() {
  try {
    console.log('Finding Juan\'s interview notes...');

    // Find Juan's user ID
    const juan = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { contains: 'juan', mode: 'insensitive' } },
          { fullName: { contains: 'Juan Baca', mode: 'insensitive' } },
        ],
      },
    });

    if (!juan) {
      console.log('Juan Baca not found in the database.');
      return;
    }

    const interview = await prisma.hRInterviewNote.findFirst({
      where: { userId: juan.id },
    });

    if (!interview) {
      console.log('No interview notes found for Juan.');
      return;
    }

    console.log('Original notes length:', interview.notes.length, 'characters');

    // Remove sensitive sections
    let cleanedNotes = interview.notes;

    // Remove the action item about the loan
    cleanedNotes = cleanedNotes.replace(
      /- \*\*Fabian Kohlmann:\*\* Will investigate how to help Juan Baca get rid of the high-interest loan and what type of help can be offered\./gi,
      ''
    );

    // Remove any other mentions of loans, debt, or financial situation
    const sensitivePatterns = [
      /.*loan.*\n?/gi,
      /.*high-interest.*\n?/gi,
      /.*financial situation.*\n?/gi,
      /.*debt.*\n?/gi,
      /.*get rid of.*interest.*\n?/gi,
    ];

    for (const pattern of sensitivePatterns) {
      cleanedNotes = cleanedNotes.replace(pattern, '');
    }

    // Clean up excessive newlines
    cleanedNotes = cleanedNotes.replace(/\n{3,}/g, '\n\n');

    console.log('Cleaned notes length:', cleanedNotes.length, 'characters');
    console.log('Removed:', interview.notes.length - cleanedNotes.length, 'characters');

    if (cleanedNotes !== interview.notes) {
      const confirm = process.argv.includes('--confirm');
      if (!confirm) {
        console.log('\n⚠️  Run with --confirm flag to update the interview notes');
        console.log('\nPreview of changes:');
        console.log('====================');

        // Show what will be removed
        const lines = interview.notes.split('\n');
        lines.forEach((line, idx) => {
          if (
            line.toLowerCase().includes('loan') ||
            line.toLowerCase().includes('financial') ||
            line.toLowerCase().includes('debt') ||
            line.toLowerCase().includes('interest')
          ) {
            console.log(`Line ${idx + 1} (WILL BE REMOVED): ${line}`);
          }
        });
        return;
      }

      // Update the interview notes
      await prisma.hRInterviewNote.update({
        where: { id: interview.id },
        data: { notes: cleanedNotes },
      });

      console.log('\n✅ Successfully cleaned Juan\'s interview notes');
    } else {
      console.log('\nNo sensitive information found to remove.');
    }

  } catch (error) {
    console.error('Error cleaning interview notes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
cleanInterviewNotes()
  .then(() => {
    console.log('\nScript completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nScript failed:', error);
    process.exit(1);
  });
