/**
 * Script to update Ben's time increase action to be more specific
 */

import { prisma } from '../src/lib/prisma';

async function updateBenTimeAction() {
  try {
    // Find Benjamin
    const ben = await prisma.user.findFirst({
      where: {
        OR: [
          { fullName: { contains: 'Benjamin', mode: 'insensitive' } },
          { username: { contains: 'benjamin', mode: 'insensitive' } },
        ],
      },
    });

    if (!ben) {
      console.log('❌ Benjamin not found');
      return;
    }

    console.log(`✓ Found: ${ben.fullName}\n`);

    // Find the action
    const action = await prisma.hRActionItem.findFirst({
      where: {
        AND: [
          { employeeId: ben.id },
          {
            OR: [
              { description: { contains: 'timeline', mode: 'insensitive' } },
              { description: { contains: 'hours', mode: 'insensitive' } },
            ],
          },
        ],
      },
    });

    if (!action) {
      console.log('❌ Action not found');
      return;
    }

    console.log('Current description:', action.description);

    // Update the action description
    const updated = await prisma.hRActionItem.update({
      where: { id: action.id },
      data: {
        description: 'Communicate offer to Benjamin to increase hours from 1 day to 2.5 days equivalent',
      },
      include: {
        assignedTo: {
          select: { fullName: true },
        },
      },
    });

    console.log('\n✅ Updated action:');
    console.log('New description:', updated.description);
    console.log('For:', updated.assignedTo?.fullName);
    console.log('Priority:', updated.priority);
    console.log('Status:', updated.status);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateBenTimeAction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
