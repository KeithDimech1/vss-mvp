import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting action migration...\n');

  // First, check what exists
  const existingActions = await prisma.actionItem.findMany({
    orderBy: { actionNumber: 'asc' }
  });

  console.log('Existing actions:');
  existingActions.forEach(action => {
    console.log(`  - ${action.actionNumber}: ${action.actionSlug} - "${action.title}"`);
  });
  console.log();

  // Check if 'products-services' exists (the old action 1)
  const oldAction1 = existingActions.find(a => a.actionSlug === 'products-services');

  if (oldAction1) {
    console.log('Found old "products-services" action. We need to split it into three...');

    // Update the old action to become lithosurfer (keeping actionNumber 1)
    const action1 = await prisma.actionItem.update({
      where: { id: oldAction1.id },
      data: {
        actionSlug: 'lithosurfer',
        title: 'LithoSurfer: Three-Tier Product Strategy',
        description: 'Define the three-tier access model for LithoSurfer (Free, Pro, Enterprise) including features, pricing, and implementation requirements.',
      }
    });
    console.log('✓ Updated existing action to Action 1: LithoSurfer');

    // Create action 2 (lithodata) - need to increment other action numbers first
    // Increment all existing actions with actionNumber >= 2
    // IMPORTANT: Must do this in REVERSE order to avoid unique constraint violations
    const actionsToUpdate = existingActions
      .filter(a => a.actionNumber >= 2 && a.id !== oldAction1.id)
      .sort((a, b) => b.actionNumber - a.actionNumber); // Sort descending

    for (const action of actionsToUpdate) {
      await prisma.actionItem.update({
        where: { id: action.id },
        data: { actionNumber: action.actionNumber + 2 } // +2 because we're adding 2 new actions
      });
      console.log(`  ✓ Moved action ${action.actionNumber} (${action.actionSlug}) to ${action.actionNumber + 2}`);
    }
    console.log(`✓ Incremented ${actionsToUpdate.length} existing action numbers by 2`);

    // Now create the two new actions
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
    console.log('✓ Created Action 2: LithoData');

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
    console.log('✓ Created Action 3: LithoBuild');

    console.log('\n✓ Migration complete!');
    console.log('\nNew action structure:');
    console.log(`  1. lithosurfer: ${action1.id}`);
    console.log(`  2. lithodata: ${action2.id}`);
    console.log(`  3. lithobuild: ${action3.id}`);

  } else {
    // No old action, just create the three new ones
    console.log('No "products-services" action found. Creating three new actions...');

    const action1 = await prisma.actionItem.create({
      data: {
        actionSlug: 'lithosurfer',
        actionNumber: 1,
        title: 'LithoSurfer: Three-Tier Product Strategy',
        description: 'Define the three-tier access model for LithoSurfer (Free, Pro, Enterprise) including features, pricing, and implementation requirements.',
        priority: 'IMMEDIATE',
        owner: 'Keith (Management Team)',
      }
    });
    console.log('✓ Created Action 1: LithoSurfer');

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
    console.log('✓ Created Action 2: LithoData');

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
    console.log('✓ Created Action 3: LithoBuild');

    console.log('\n✓ All three actions created successfully!');
    console.log('\nAction IDs:');
    console.log(`  - lithosurfer: ${action1.id}`);
    console.log(`  - lithodata: ${action2.id}`);
    console.log(`  - lithobuild: ${action3.id}`);
  }

  // Show final state
  console.log('\n--- Final Action State ---');
  const finalActions = await prisma.actionItem.findMany({
    orderBy: { actionNumber: 'asc' }
  });
  finalActions.forEach(action => {
    console.log(`  ${action.actionNumber}. ${action.actionSlug} - "${action.title}"`);
  });
}

main()
  .catch((e) => {
    console.error('Error migrating actions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
