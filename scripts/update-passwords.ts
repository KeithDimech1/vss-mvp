/**
 * Script to update all user passwords (except Keith) to welcome2026
 */

import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function updatePasswords() {
  try {
    const newPassword = 'welcome2026';
    const saltRounds = 10;

    console.log('Hashing new password...\n');
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Get all users except Keith
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          OR: [
            { fullName: { contains: 'Keith', mode: 'insensitive' } },
            { username: { contains: 'keith', mode: 'insensitive' } },
          ],
        },
      },
      select: {
        id: true,
        username: true,
        fullName: true,
      },
    });

    console.log(`Found ${users.length} users to update (excluding Keith):\n`);

    let updateCount = 0;

    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      });

      console.log(`✓ Updated: ${user.fullName} (@${user.username})`);
      updateCount++;
    }

    console.log(`\n✅ Successfully updated ${updateCount} user passwords to "welcome2026"`);
    console.log('Keith\'s password was not changed.');
  } catch (error) {
    console.error('Error updating passwords:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updatePasswords()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
