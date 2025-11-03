import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed new actions...');

  // Create or update Action 1: LithoSurfer
  const action1 = await prisma.actionItem.upsert({
    where: { actionSlug: 'lithosurfer' },
    update: {
      actionNumber: 1,
      title: 'LithoSurfer: Three-Tier Product Strategy',
      description: 'Define the three-tier access model for LithoSurfer (Free, Pro, Enterprise) including features, pricing, and implementation requirements.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
    create: {
      actionSlug: 'lithosurfer',
      actionNumber: 1,
      title: 'LithoSurfer: Three-Tier Product Strategy',
      description: 'Define the three-tier access model for LithoSurfer (Free, Pro, Enterprise) including features, pricing, and implementation requirements.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
  });
  console.log('✓ Created/Updated Action 1: LithoSurfer');

  // Create or update Action 2: LithoData
  const action2 = await prisma.actionItem.upsert({
    where: { actionSlug: 'lithodata' },
    update: {
      actionNumber: 2,
      title: 'LithoData: Three-Type Data Strategy',
      description: 'Define the three-type data model (Free, Premium, Commercial, Private) including data inventory, pricing, marketplace features, and implementation requirements.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
    create: {
      actionSlug: 'lithodata',
      actionNumber: 2,
      title: 'LithoData: Three-Type Data Strategy',
      description: 'Define the three-type data model (Free, Premium, Commercial, Private) including data inventory, pricing, marketplace features, and implementation requirements.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
  });
  console.log('✓ Created/Updated Action 2: LithoData');

  // Create or update Action 3: LithoBuild
  const action3 = await prisma.actionItem.upsert({
    where: { actionSlug: 'lithobuild' },
    update: {
      actionNumber: 3,
      title: 'LithoBuild: Consulting & Development Strategy',
      description: 'Define the consulting and development service strategy including pricing, resource allocation, project selection criteria, and sunset timeline.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
    create: {
      actionSlug: 'lithobuild',
      actionNumber: 3,
      title: 'LithoBuild: Consulting & Development Strategy',
      description: 'Define the consulting and development service strategy including pricing, resource allocation, project selection criteria, and sunset timeline.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
  });
  console.log('✓ Created/Updated Action 3: LithoBuild');

  console.log('\n✓ All three actions seeded successfully!');
  console.log('\nAction IDs:');
  console.log(`  - lithosurfer: ${action1.id}`);
  console.log(`  - lithodata: ${action2.id}`);
  console.log(`  - lithobuild: ${action3.id}`);
}

main()
  .catch((e) => {
    console.error('Error seeding actions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
