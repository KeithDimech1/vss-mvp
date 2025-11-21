/**
 * Script to remove sensitive financial information about Juan Baca
 */

import { prisma } from '../src/lib/prisma';

async function removeSensitiveData() {
  try {
    console.log('Searching for sensitive financial information about Juan...');

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

    console.log(`Found Juan Baca: ${juan.fullName} (${juan.username})`);

    // Find all action items related to loans or financial situation
    const sensitiveActions = await prisma.hRActionItem.findMany({
      where: {
        OR: [
          { description: { contains: 'loan', mode: 'insensitive' } },
          { description: { contains: 'financial', mode: 'insensitive' } },
          { description: { contains: 'interest', mode: 'insensitive' } },
          { description: { contains: 'debt', mode: 'insensitive' } },
        ],
        employeeId: juan.id,
      },
    });

    console.log(`\nFound ${sensitiveActions.length} sensitive action items:`);
    sensitiveActions.forEach(action => {
      console.log(`- ${action.description}`);
    });

    if (sensitiveActions.length > 0) {
      const confirm = process.argv.includes('--confirm');
      if (!confirm) {
        console.log('\n⚠️  Run with --confirm flag to delete these action items');
        return;
      }

      // Delete the sensitive actions
      for (const action of sensitiveActions) {
        await prisma.hRActionItem.delete({
          where: { id: action.id },
        });
        console.log(`✓ Deleted: ${action.description.substring(0, 80)}...`);
      }

      console.log(`\n✅ Successfully deleted ${sensitiveActions.length} sensitive action items`);
    }

    // Now check interview notes for Juan
    const juanInterview = await prisma.hRInterviewNote.findFirst({
      where: { userId: juan.id },
    });

    if (juanInterview && juanInterview.notes.toLowerCase().includes('loan')) {
      console.log('\n⚠️  Found sensitive information in Juan\'s interview notes.');
      console.log('Please manually review and edit the interview notes to remove financial information.');
      console.log(`Interview ID: ${juanInterview.id}`);
    }

  } catch (error) {
    console.error('Error removing sensitive data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
removeSensitiveData()
  .then(() => {
    console.log('\nScript completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nScript failed:', error);
    process.exit(1);
  });
