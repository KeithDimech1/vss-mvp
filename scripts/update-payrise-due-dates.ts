/**
 * Script to update all payrise-related action items to be due on December 12, 2025
 */

import { prisma } from '../src/lib/prisma';

async function updatePayriseDueDates() {
  try {
    console.log('Fetching all HR action items...');

    // Fetch all action items
    const allActions = await prisma.hRActionItem.findMany({
      select: {
        id: true,
        description: true,
        dueDate: true,
      },
    });

    console.log(`Found ${allActions.length} total action items`);

    // Filter for payrise-related actions (case insensitive)
    const payriseActions = allActions.filter(action =>
      action.description.toLowerCase().includes('payrise') ||
      action.description.toLowerCase().includes('pay rise') ||
      action.description.toLowerCase().includes('pay-rise') ||
      action.description.toLowerCase().includes('salary increase') ||
      action.description.toLowerCase().includes('salary review')
    );

    console.log(`\nFound ${payriseActions.length} payrise-related action items:`);
    payriseActions.forEach(action => {
      console.log(`- ${action.description.substring(0, 80)}${action.description.length > 80 ? '...' : ''}`);
      console.log(`  Current due date: ${action.dueDate ? action.dueDate.toISOString().split('T')[0] : 'Not set'}`);
    });

    if (payriseActions.length === 0) {
      console.log('\nNo payrise-related actions found. Exiting.');
      return;
    }

    // Set due date to December 12, 2025
    const newDueDate = new Date('2025-12-12T00:00:00.000Z');

    console.log(`\nUpdating ${payriseActions.length} action items to be due on December 12, 2025...`);

    // Update each action item
    for (const action of payriseActions) {
      await prisma.hRActionItem.update({
        where: { id: action.id },
        data: { dueDate: newDueDate },
      });
      console.log(`✓ Updated: ${action.description.substring(0, 80)}${action.description.length > 80 ? '...' : ''}`);
    }

    console.log(`\n✅ Successfully updated ${payriseActions.length} payrise-related action items!`);

  } catch (error) {
    console.error('Error updating payrise due dates:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
updatePayriseDueDates()
  .then(() => {
    console.log('\nScript completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nScript failed:', error);
    process.exit(1);
  });
