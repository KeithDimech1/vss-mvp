/**
 * Script to assign Nirali to Moritz and Cris to Juan
 */

import { prisma } from '../src/lib/prisma';

async function assignMissingEmployees() {
  try {
    const allUsers = await prisma.user.findMany({
      select: { id: true, username: true, fullName: true }
    });

    console.log('Looking for Nirali and Cris...\n');

    // Find Nirali
    const nirali = allUsers.find(u =>
      u.fullName.toLowerCase().includes('nirali') ||
      u.username.toLowerCase().includes('nirali')
    );

    // Find Cris
    const cris = allUsers.find(u =>
      u.fullName.toLowerCase().includes('cris') ||
      u.username.toLowerCase().includes('cris')
    );

    // Find Moritz
    const moritz = allUsers.find(u =>
      u.fullName.toLowerCase().includes('moritz') ||
      u.username.toLowerCase().includes('moritz')
    );

    // Find Juan
    const juan = allUsers.find(u =>
      u.fullName.toLowerCase().includes('juan') ||
      u.username.toLowerCase().includes('juan')
    );

    if (!nirali) {
      console.log('❌ Nirali not found');
    } else {
      console.log('✓ Found Nirali:', nirali.fullName);
    }

    if (!cris) {
      console.log('❌ Cris not found');
    } else {
      console.log('✓ Found Cris:', cris.fullName);
    }

    if (!moritz) {
      console.log('❌ Moritz not found');
    } else {
      console.log('✓ Found Moritz:', moritz.fullName);
    }

    if (!juan) {
      console.log('❌ Juan not found');
    } else {
      console.log('✓ Found Juan:', juan.fullName);
    }

    console.log('\n');

    // Assign Nirali to Moritz
    if (nirali && moritz) {
      const existing = await prisma.userManager.findUnique({
        where: {
          employeeId_managerId: {
            employeeId: nirali.id,
            managerId: moritz.id
          }
        }
      });

      if (existing) {
        console.log('⏭️  Nirali → Moritz (already exists)');
      } else {
        await prisma.userManager.create({
          data: {
            employeeId: nirali.id,
            managerId: moritz.id
          }
        });
        console.log('✅ Assigned Nirali to Moritz');
      }
    }

    // Assign Cris to Juan
    if (cris && juan) {
      const existing = await prisma.userManager.findUnique({
        where: {
          employeeId_managerId: {
            employeeId: cris.id,
            managerId: juan.id
          }
        }
      });

      if (existing) {
        console.log('⏭️  Cris → Juan (already exists)');
      } else {
        await prisma.userManager.create({
          data: {
            employeeId: cris.id,
            managerId: juan.id
          }
        });
        console.log('✅ Assigned Cris to Juan');
      }
    }

    console.log('\n✅ Script completed!');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

assignMissingEmployees()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
