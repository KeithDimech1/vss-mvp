const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating Action 2 (unified-utopia) metadata...');

  // First, let's see all actions
  const allActions = await prisma.actionItem.findMany({
    orderBy: { actionNumber: 'asc' }
  });

  console.log('\nAll actions:');
  allActions.forEach(action => {
    console.log(`- Action ${action.actionNumber}: ${action.actionSlug} - "${action.title}"`);
  });

  // Update just the title and description, not the actionNumber
  const updated = await prisma.actionItem.update({
    where: { actionSlug: 'unified-utopia' },
    data: {
      title: 'Unified Utopia Vision',
      description: 'Build consensus on Lithodat\'s unified utopia vision across management team'
    }
  });

  console.log('\nUpdated action:', updated);
  console.log('\n✓ Action metadata updated successfully!');
}

main()
  .catch((error) => {
    console.error('Error updating action:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
