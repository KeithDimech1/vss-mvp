/**
 * Script to add action item for Wayne to look into purchasing MacBook for Lujia
 */

import { prisma } from '../src/lib/prisma';

async function addMacbookAction() {
  try {
    console.log('Finding users...\n');

    // Find Wayne
    const wayne = await prisma.user.findFirst({
      where: {
        OR: [
          { fullName: { contains: 'Wayne', mode: 'insensitive' } },
          { username: { contains: 'wayne', mode: 'insensitive' } },
        ],
      },
    });

    if (!wayne) {
      console.log('❌ Wayne not found');
      return;
    }
    console.log(`✓ Found Wayne: ${wayne.fullName}`);

    // Find Lujia
    const lujia = await prisma.user.findFirst({
      where: {
        OR: [
          { fullName: { contains: 'Lujia', mode: 'insensitive' } },
          { username: { contains: 'lujia', mode: 'insensitive' } },
        ],
      },
    });

    if (!lujia) {
      console.log('❌ Lujia not found');
      return;
    }
    console.log(`✓ Found Lujia: ${lujia.fullName}`);

    // Find Lujia's interview note (to link the action)
    const interview = await prisma.hRInterviewNote.findFirst({
      where: { userId: lujia.id },
    });

    if (interview) {
      console.log(`✓ Found Lujia's interview note`);
    }

    // Create the action item
    const actionItem = await prisma.hRActionItem.create({
      data: {
        description: 'Look into Lithodat purchasing a new MacBook for Lujia',
        employeeId: lujia.id,
        assignedToId: wayne.id,
        interviewNoteId: interview?.id || null,
        priority: 'MEDIUM',
        status: 'PENDING',
        createdById: wayne.id, // Wayne creating this for himself
      },
      include: {
        employee: {
          select: {
            fullName: true,
          },
        },
        assignedTo: {
          select: {
            fullName: true,
          },
        },
      },
    });

    console.log('\n✅ Created action item:');
    console.log(`   Description: ${actionItem.description}`);
    console.log(`   For: ${actionItem.assignedTo?.fullName}`);
    console.log(`   About: ${actionItem.employee.fullName}`);
    console.log(`   Priority: ${actionItem.priority}`);
    console.log(`   Status: ${actionItem.status}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addMacbookAction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
