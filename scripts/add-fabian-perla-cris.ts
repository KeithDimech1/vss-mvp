/**
 * Script to add Perla and Cris as Fabian's reports (in addition to Juan)
 */

import { prisma } from '../src/lib/prisma';

async function addFabianReports() {
  try {
    console.log('Finding users...\n');

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
    console.log(`✓ Found Fabian: ${fabian.fullName}`);

    // Find Perla
    const perla = await prisma.user.findFirst({
      where: {
        OR: [
          { fullName: { contains: 'Perla', mode: 'insensitive' } },
          { username: { contains: 'perla', mode: 'insensitive' } },
        ],
      },
    });

    if (!perla) {
      console.log('❌ Perla not found');
      return;
    }
    console.log(`✓ Found Perla: ${perla.fullName}`);

    // Find Cris/Aida
    const cris = await prisma.user.findFirst({
      where: {
        OR: [
          { fullName: { contains: 'Cris', mode: 'insensitive' } },
          { fullName: { contains: 'Aida', mode: 'insensitive' } },
          { username: { contains: 'aida', mode: 'insensitive' } },
        ],
      },
    });

    if (!cris) {
      console.log('❌ Cris/Aida not found');
      return;
    }
    console.log(`✓ Found Cris: ${cris.fullName}`);

    console.log('\nAdding manager relationships...\n');

    // Add Fabian → Perla
    const perlaRelation = await prisma.userManager.upsert({
      where: {
        employeeId_managerId: {
          employeeId: perla.id,
          managerId: fabian.id,
        },
      },
      create: {
        employeeId: perla.id,
        managerId: fabian.id,
      },
      update: {},
    });

    console.log(`✓ ${perla.fullName} now reports to ${fabian.fullName}`);

    // Add Fabian → Cris
    const crisRelation = await prisma.userManager.upsert({
      where: {
        employeeId_managerId: {
          employeeId: cris.id,
          managerId: fabian.id,
        },
      },
      create: {
        employeeId: cris.id,
        managerId: fabian.id,
      },
      update: {},
    });

    console.log(`✓ ${cris.fullName} now reports to ${fabian.fullName}`);

    // Show current managers for both
    console.log('\n--- Current Manager Relationships ---\n');

    const perlaManagers = await prisma.userManager.findMany({
      where: { employeeId: perla.id },
      include: {
        manager: {
          select: { fullName: true },
        },
      },
    });

    console.log(`${perla.fullName} reports to:`);
    perlaManagers.forEach((rel) => {
      console.log(`  - ${rel.manager.fullName}`);
    });

    const crisManagers = await prisma.userManager.findMany({
      where: { employeeId: cris.id },
      include: {
        manager: {
          select: { fullName: true },
        },
      },
    });

    console.log(`\n${cris.fullName} reports to:`);
    crisManagers.forEach((rel) => {
      console.log(`  - ${rel.manager.fullName}`);
    });

    console.log('\n✅ Manager relationships updated!');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addFabianReports()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
