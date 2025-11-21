/**
 * Script to assign employees to their managers
 */

import { prisma } from '../src/lib/prisma';

async function assignManagers() {
  try {
    console.log('Setting up manager-employee relationships...\n');

    // Define the assignments
    const assignments = [
      // Nirai and Tarun → Moritz
      { employees: ['Nirai', 'Tarun'], manager: 'Moritz' },
      // Lujia and Xinyan → Wayne
      { employees: ['Lujia', 'Xinyan'], manager: 'Wayne' },
      // Ben → Fabian and Wayne
      { employees: ['Ben', 'Benjamin'], manager: 'Fabian' },
      { employees: ['Ben', 'Benjamin'], manager: 'Wayne' },
      // Perla and Christina → Juan
      { employees: ['Perla', 'Christina'], manager: 'Juan' },
      // Alejandra → Fabian
      { employees: ['Alejandra'], manager: 'Fabian' },
      // Kristy → Fabian and Keith
      { employees: ['Kristy'], manager: 'Fabian' },
      { employees: ['Kristy'], manager: 'Keith' },
      // Raul → Fabian
      { employees: ['Raul'], manager: 'Fabian' },
    ];

    // Get all users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        fullName: true,
        isManager: true,
      },
    });

    console.log(`Found ${allUsers.length} users in the database\n`);

    // Helper function to find user by name (flexible matching)
    function findUser(name: string) {
      return allUsers.find(u =>
        u.fullName.toLowerCase().includes(name.toLowerCase()) ||
        u.username.toLowerCase().includes(name.toLowerCase())
      );
    }

    let created = 0;
    let skipped = 0;
    const errors: string[] = [];

    // Process each assignment
    for (const assignment of assignments) {
      const manager = findUser(assignment.manager);

      if (!manager) {
        errors.push(`Manager not found: ${assignment.manager}`);
        continue;
      }

      for (const employeeName of assignment.employees) {
        const employee = findUser(employeeName);

        if (!employee) {
          errors.push(`Employee not found: ${employeeName}`);
          continue;
        }

        // Check if relationship already exists
        const existing = await prisma.userManager.findUnique({
          where: {
            employeeId_managerId: {
              employeeId: employee.id,
              managerId: manager.id,
            },
          },
        });

        if (existing) {
          console.log(`⏭️  ${employee.fullName} → ${manager.fullName} (already exists)`);
          skipped++;
          continue;
        }

        // Create the relationship
        await prisma.userManager.create({
          data: {
            employeeId: employee.id,
            managerId: manager.id,
          },
        });

        console.log(`✓ ${employee.fullName} → ${manager.fullName}`);
        created++;
      }
    }

    console.log(`\n✅ Created ${created} manager-employee relationships`);
    console.log(`⏭️  Skipped ${skipped} existing relationships`);

    if (errors.length > 0) {
      console.log(`\n❌ Errors (${errors.length}):`);
      errors.forEach(error => console.log(`  - ${error}`));
    }

    // Show summary by manager
    console.log('\n📊 Summary by Manager:');
    const managers = allUsers.filter(u => u.isManager);

    for (const manager of managers) {
      const managedEmployees = await prisma.userManager.findMany({
        where: { managerId: manager.id },
        include: {
          employee: {
            select: {
              fullName: true,
            },
          },
        },
      });

      if (managedEmployees.length > 0) {
        console.log(`\n${manager.fullName}:`);
        managedEmployees.forEach(rel => {
          console.log(`  - ${rel.employee.fullName}`);
        });
      }
    }

  } catch (error) {
    console.error('Error assigning managers:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
assignManagers()
  .then(() => {
    console.log('\nScript completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nScript failed:', error);
    process.exit(1);
  });
