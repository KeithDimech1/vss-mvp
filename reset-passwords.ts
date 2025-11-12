import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting passwords for Juan and Fabian...');

  const newPassword = await bcrypt.hash('welcome2024', 10);

  // Update Juan
  await prisma.user.update({
    where: { username: 'juan' },
    data: { passwordHash: newPassword }
  });
  console.log('✓ Updated password for juan');

  // Update Fabian
  await prisma.user.update({
    where: { username: 'fabian' },
    data: { passwordHash: newPassword }
  });
  console.log('✓ Updated password for fabian');

  console.log('\n✅ Passwords reset successfully!');
  console.log('Username: juan, Password: welcome2024');
  console.log('Username: fabian, Password: welcome2024');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
