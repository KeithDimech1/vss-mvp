import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
    },
    orderBy: { fullName: 'asc' },
  });

  console.log('Users in database:');
  users.forEach(u => {
    console.log(`  ${u.fullName.padEnd(25)} (@${u.username})`);
  });
}

main()
  .finally(() => prisma.$disconnect());
