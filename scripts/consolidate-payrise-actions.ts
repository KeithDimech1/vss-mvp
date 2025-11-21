/**
 * Script to consolidate all payrise actions into one for Fabian
 */

import { prisma } from '../src/lib/prisma';

async function consolidatePayriseActions() {
  try {
    console.log('Finding payrise-related actions...\n');

    // Find all payrise-related actions
    const payriseActions = await prisma.hRActionItem.findMany({
      where: {
        OR: [
          { description: { contains: 'payrise', mode: 'insensitive' } },
          { description: { contains: 'pay rise', mode: 'insensitive' } },
          { description: { contains: 'pay increase', mode: 'insensitive' } },
          { description: { contains: 'salary', mode: 'insensitive' } },
        ],
      },
      include: {
        employee: {
          select: { fullName: true },
        },
        assignedTo: {
          select: { fullName: true },
        },
      },
    });

    console.log(`Found ${payriseActions.length} payrise-related actions:\n`);
    payriseActions.forEach((action) => {
      console.log(`  - ${action.description}`);
      console.log(`    For: ${action.assignedTo?.fullName || 'N/A'}`);
      console.log(`    About: ${action.employee.fullName}`);
      console.log(`    Status: ${action.status}`);
      console.log();
    });

    if (payriseActions.length === 0) {
      console.log('No payrise actions found to consolidate.');
      return;
    }

    // Find Fabian
    const fabian = await prisma.user.findFirst({
      where: {
        OR: [
          { fullName: { contains: 'Fabian', mode: 'insensitive' } },
          { username: { contains: 'fabian', mode: 'insensitive' } },
        ],
      },
    });

    if (!fabian) {
      console.log('❌ Fabian not found');
      return;
    }

    console.log(`✓ Found Fabian: ${fabian.fullName}\n`);

    // Delete all existing payrise actions
    const deleteResult = await prisma.hRActionItem.deleteMany({
      where: {
        id: { in: payriseActions.map(a => a.id) },
      },
    });

    console.log(`✅ Deleted ${deleteResult.count} payrise actions\n`);

    // Create the consolidated action
    const consolidatedAction = await prisma.hRActionItem.create({
      data: {
        description: 'Provide update to all staff on payrise calculation and deliver by the end of the year',
        employeeId: fabian.id, // About Fabian (he's doing this work)
        assignedToId: fabian.id, // Assigned to Fabian
        priority: 'HIGH',
        status: 'PENDING',
        dueDate: new Date('2025-12-31'),
        createdById: fabian.id,
      },
      include: {
        employee: {
          select: { fullName: true },
        },
        assignedTo: {
          select: { fullName: true },
        },
      },
    });

    console.log('✅ Created consolidated action:');
    console.log(`   Description: ${consolidatedAction.description}`);
    console.log(`   For: ${consolidatedAction.assignedTo?.fullName}`);
    console.log(`   About: ${consolidatedAction.employee.fullName}`);
    console.log(`   Priority: ${consolidatedAction.priority}`);
    console.log(`   Due Date: ${consolidatedAction.dueDate?.toLocaleDateString()}`);
    console.log(`   Status: ${consolidatedAction.status}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

consolidatePayriseActions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
