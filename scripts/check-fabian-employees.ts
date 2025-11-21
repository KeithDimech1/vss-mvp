/**
 * Script to check Fabian's employee assignments
 */

import { prisma } from '../src/lib/prisma';

async function checkFabianEmployees() {
  try {
    console.log('Finding Fabian...\n');

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

    console.log(`✓ Found Fabian: ${fabian.fullName} (ID: ${fabian.id})\n`);

    // Get all employees managed by Fabian
    const managedEmployees = await prisma.userManager.findMany({
      where: { managerId: fabian.id },
      include: {
        employee: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
    });

    console.log(`Employees managed by Fabian (${managedEmployees.length}):`);
    if (managedEmployees.length === 0) {
      console.log('  (none)');
    } else {
      managedEmployees.forEach((rel) => {
        console.log(`  - ${rel.employee.fullName} (${rel.employee.username})`);
      });
    }

    console.log('\n---\n');

    // Check expected employees
    const expectedNames = ['Cris', 'Juan', 'Benjamin', 'Perla', 'Raul', 'Alejandra'];
    console.log('Checking expected employees:');

    for (const name of expectedNames) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { fullName: { contains: name, mode: 'insensitive' } },
            { username: { contains: name, mode: 'insensitive' } },
          ],
        },
        include: {
          managers: {
            include: {
              manager: {
                select: {
                  fullName: true,
                },
              },
            },
          },
        },
      });

      if (user) {
        const managerNames = user.managers.map(m => m.manager.fullName).join(', ');
        console.log(`  ${user.fullName}: ${managerNames || '(no manager)'}`);
      } else {
        console.log(`  ${name}: NOT FOUND`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkFabianEmployees()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
