import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateManagers() {
  const managementTeam = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];

  console.log('Updating management team members...');

  // Update all users in the management team to isManager = true
  const result = await prisma.user.updateMany({
    where: {
      username: {
        in: managementTeam
      }
    },
    data: {
      isManager: true
    }
  });

  console.log(`✓ Updated ${result.count} users to isManager = true`);

  // List all managers for verification
  const managers = await prisma.user.findMany({
    where: {
      isManager: true
    },
    select: {
      username: true,
      fullName: true,
      isManager: true
    }
  });

  console.log('\nCurrent managers:');
  managers.forEach(manager => {
    console.log(`  - ${manager.fullName} (${manager.username})`);
  });

  await prisma.$disconnect();
}

updateManagers()
  .catch((error) => {
    console.error('Error updating managers:', error);
    process.exit(1);
  });
