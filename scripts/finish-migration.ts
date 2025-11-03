import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Finishing action migration...\n');

  // Check current state
  const existingActions = await prisma.actionItem.findMany({
    orderBy: { actionNumber: 'asc' }
  });

  console.log('Current state:');
  existingActions.forEach(action => {
    console.log(`  ${action.actionNumber}. ${action.actionSlug}`);
  });
  console.log();

  // First, increment all actions with actionNumber >= 2 (in reverse order)
  console.log('Step 1: Incrementing existing action numbers 2-7 to 4-9...');
  const toUpdate = existingActions
    .filter(a => a.actionNumber >= 2)
    .sort((a, b) => b.actionNumber - a.actionNumber); // Reverse order

  for (const action of toUpdate) {
    const newNumber = action.actionNumber + 2;
    await prisma.actionItem.update({
      where: { id: action.id },
      data: { actionNumber: newNumber }
    });
    console.log(`  ✓ Moved ${action.actionSlug} from ${action.actionNumber} to ${newNumber}`);
  }

  // Now create actions 2 and 3
  console.log('\nStep 2: Creating new actions 2 and 3...');

  const action2 = await prisma.actionItem.create({
    data: {
      actionSlug: 'lithodata',
      actionNumber: 2,
      title: 'LithoData: Three-Type Data Strategy',
      description: 'Define the three-type data model (Free, Premium, Commercial, Private) including data inventory, pricing, marketplace features, and implementation requirements.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    }
  });
  console.log(`  ✓ Created action 2: lithodata (${action2.id})`);

  const action3 = await prisma.actionItem.create({
    data: {
      actionSlug: 'lithobuild',
      actionNumber: 3,
      title: 'LithoBuild: Consulting & Development Strategy',
      description: 'Define the consulting and development service strategy including pricing, resource allocation, project selection criteria, and sunset timeline.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    }
  });
  console.log(`  ✓ Created action 3: lithobuild (${action3.id})`);

  // Show final state
  console.log('\n--- Final State ---');
  const finalActions = await prisma.actionItem.findMany({
    orderBy: { actionNumber: 'asc' }
  });
  finalActions.forEach(action => {
    console.log(`  ${action.actionNumber}. ${action.actionSlug} - "${action.title}"`);
  });

  console.log('\n✅ Migration complete!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
