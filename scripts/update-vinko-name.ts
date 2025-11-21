/**
 * Script to update Vinko's full name to "Vinko Novak"
 */

import { prisma } from '../src/lib/prisma';

async function updateVinkoName() {
  try {
    console.log('Looking for Vinko...\n');

    // Find Vinko
    const vinko = await prisma.user.findFirst({
      where: {
        OR: [
          { fullName: { contains: 'Vinko', mode: 'insensitive' } },
          { username: { contains: 'vinko', mode: 'insensitive' } },
        ],
      },
    });

    if (!vinko) {
      console.log('❌ Vinko not found');
      return;
    }

    console.log(`✓ Found: ${vinko.fullName} (${vinko.username})`);
    console.log(`  Current name: "${vinko.fullName}"`);

    // Update to "Vinko Novak"
    const updated = await prisma.user.update({
      where: { id: vinko.id },
      data: { fullName: 'Vinko Novak' },
    });

    console.log(`\n✅ Updated to: "${updated.fullName}"`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateVinkoName()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
