/**
 * Script to check for Ben's time increase action
 */

import { prisma } from '../src/lib/prisma';

async function checkBenTimeAction() {
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

    // Search for actions about Ben's time increase
    const actions = await prisma.hRActionItem.findMany({
      where: {
        AND: [
          { employeeId: ben.id },
          {
            OR: [
              { description: { contains: '1 day', mode: 'insensitive' } },
              { description: { contains: '2.5', mode: 'insensitive' } },
              { description: { contains: 'time', mode: 'insensitive' } },
              { description: { contains: 'hours', mode: 'insensitive' } },
              { description: { contains: 'increase', mode: 'insensitive' } },
            ],
          },
        ],
      },
      include: {
        assignedTo: {
          select: { fullName: true },
        },
      },
    });

    console.log(`Found ${actions.length} actions about Ben's time:\n`);

    if (actions.length > 0) {
      actions.forEach(action => {
        console.log('Description:', action.description);
        console.log('For:', action.assignedTo?.fullName || 'N/A');
        console.log('Priority:', action.priority);
        console.log('Status:', action.status);
        console.log();
      });
    } else {
      console.log('No actions found about Ben\'s time increase.');
      console.log('\nShould I create this action?');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkBenTimeAction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
