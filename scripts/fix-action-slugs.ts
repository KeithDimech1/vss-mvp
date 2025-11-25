/**
 * Migration Script: Fix Action Slugs
 *
 * This script fixes the mismatch between ActionItem slugs in the database
 * and the form definitions in src/lib/actions/index.ts
 *
 * Changes:
 * - 'products-services' -> Now split into 'lithosurfer', 'lithodata', 'lithobuild'
 * - 'okrs' -> 'okr-implementation'
 *
 * Run with: npx tsx scripts/fix-action-slugs.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting action slug migration...\n');

  // First, let's see what actions exist in the database
  console.log('Current ActionItems in database:');
  const existingActions = await prisma.actionItem.findMany({
    select: {
      id: true,
      actionNumber: true,
      actionSlug: true,
      title: true,
      _count: {
        select: { responses: true }
      }
    },
    orderBy: { actionNumber: 'asc' }
  });

  for (const action of existingActions) {
    console.log(`  #${action.actionNumber} [${action.actionSlug}] "${action.title}" - ${action._count.responses} responses`);
  }

  console.log('\n--- Migration Steps ---\n');

  // Step 1: Fix 'okrs' -> 'okr-implementation'
  const okrsAction = existingActions.find(a => a.actionSlug === 'okrs');
  if (okrsAction) {
    console.log('Step 1: Updating "okrs" to "okr-implementation"...');
    await prisma.actionItem.update({
      where: { id: okrsAction.id },
      data: {
        actionSlug: 'okr-implementation',
        title: 'Implementation Plan (OKRs)',
        description: 'Define OKR framework, timeline, and execution strategy.'
      }
    });
    console.log('  ✓ Updated okrs -> okr-implementation');
  } else {
    console.log('Step 1: "okrs" action not found, checking for "okr-implementation"...');
    const okrAction = existingActions.find(a => a.actionSlug === 'okr-implementation');
    if (okrAction) {
      console.log('  ✓ "okr-implementation" already exists');
    } else {
      console.log('  ⚠ Neither "okrs" nor "okr-implementation" found - will be created by seed');
    }
  }

  // Step 2: Handle products-services split into lithosurfer, lithodata, lithobuild
  const productsServicesAction = existingActions.find(a => a.actionSlug === 'products-services');
  if (productsServicesAction) {
    console.log('\nStep 2: Handling "products-services" -> split into 3 actions...');

    // Check if any responses exist for products-services
    const productResponses = await prisma.actionResponse.findMany({
      where: { actionItemId: productsServicesAction.id }
    });

    if (productResponses.length > 0) {
      console.log(`  ⚠ Found ${productResponses.length} responses for products-services`);
      console.log('  These responses may need manual review');

      // For now, keep products-services but update it
      // The new lithosurfer, lithodata, lithobuild will be created fresh
    }

    // Delete the products-services action if it has no responses
    // Or keep it for historical data
    if (productResponses.length === 0) {
      console.log('  Deleting empty products-services action...');
      await prisma.actionItem.delete({
        where: { id: productsServicesAction.id }
      });
      console.log('  ✓ Deleted products-services (no responses)');
    } else {
      console.log('  Keeping products-services for historical data');
    }
  } else {
    console.log('\nStep 2: "products-services" not found, checking for individual product actions...');
    const lithoSurferExists = existingActions.find(a => a.actionSlug === 'lithosurfer');
    const lithoDataExists = existingActions.find(a => a.actionSlug === 'lithodata');
    const lithoBuildExists = existingActions.find(a => a.actionSlug === 'lithobuild');

    if (lithoSurferExists) console.log('  ✓ lithosurfer exists');
    else console.log('  ⚠ lithosurfer will be created by seed');

    if (lithoDataExists) console.log('  ✓ lithodata exists');
    else console.log('  ⚠ lithodata will be created by seed');

    if (lithoBuildExists) console.log('  ✓ lithobuild exists');
    else console.log('  ⚠ lithobuild will be created by seed');
  }

  // Step 3: Ensure all required actions exist with correct slugs
  console.log('\nStep 3: Creating/updating actions with correct slugs...');

  const requiredActions = [
    {
      actionNumber: 1,
      actionSlug: 'lithosurfer',
      title: 'LithoSurfer: Three-Tier Product Strategy',
      description: 'Define the three-tier access model for LithoSurfer (Free, Pro, Enterprise).',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
    {
      actionNumber: 2,
      actionSlug: 'lithodata',
      title: 'LithoData: Three-Type Data Strategy',
      description: 'Define the three-type data model (Free, Premium, Commercial, Private).',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
    {
      actionNumber: 3,
      actionSlug: 'lithobuild',
      title: 'LithoBuild: Consulting & Development Strategy',
      description: 'Define consulting and development service strategy.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
    },
    {
      actionNumber: 4,
      actionSlug: 'unified-utopia',
      title: 'Unified Utopia Vision',
      description: 'Build consensus on Lithodat\'s unified utopia vision.',
      priority: 'IMMEDIATE',
      owner: 'Management Team',
    },
    {
      actionNumber: 5,
      actionSlug: 'setup-departments',
      title: 'Setup Three Departments',
      description: 'Formalize LithoSurfer, LithoBuild, LithoData systems.',
      priority: 'IMMEDIATE',
      owner: 'Management Team',
    },
    {
      actionNumber: 6,
      actionSlug: 'okr-implementation',
      title: 'Implementation Plan (OKRs)',
      description: 'Define OKR framework, timeline, and execution strategy.',
      priority: 'SHORT-TERM',
      owner: 'Keith & Vinko',
    },
  ];

  for (const action of requiredActions) {
    try {
      await prisma.actionItem.upsert({
        where: { actionSlug: action.actionSlug },
        update: {
          title: action.title,
          description: action.description,
          priority: action.priority,
          owner: action.owner,
        },
        create: {
          ...action,
          status: 'not-started',
        },
      });
      console.log(`  ✓ ${action.actionSlug} - OK`);
    } catch (error: any) {
      // If upsert fails on slug, try by actionNumber
      if (error.code === 'P2002') {
        console.log(`  ⚠ ${action.actionSlug} - Conflict, trying by actionNumber...`);
        await prisma.actionItem.upsert({
          where: { actionNumber: action.actionNumber },
          update: {
            actionSlug: action.actionSlug,
            title: action.title,
            description: action.description,
            priority: action.priority,
            owner: action.owner,
          },
          create: {
            ...action,
            status: 'not-started',
          },
        });
        console.log(`  ✓ ${action.actionSlug} - Updated by actionNumber`);
      } else {
        throw error;
      }
    }
  }

  // Final verification
  console.log('\n--- Final State ---\n');

  const finalActions = await prisma.actionItem.findMany({
    select: {
      id: true,
      actionNumber: true,
      actionSlug: true,
      title: true,
      _count: {
        select: { responses: true }
      }
    },
    orderBy: { actionNumber: 'asc' }
  });

  for (const action of finalActions) {
    console.log(`  #${action.actionNumber} [${action.actionSlug}] "${action.title}" - ${action._count.responses} responses`);
  }

  console.log('\n✅ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Run "npm run dev" to test the forms');
  console.log('2. Verify each form loads correctly for each user');
  console.log('3. Check that responses are saved per-user');
}

main()
  .catch((e) => {
    console.error('Migration error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
