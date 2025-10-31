import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Hash passwords
  const adminPassword = await bcrypt.hash('lithodat2024', 10);
  const memberPassword = await bcrypt.hash('welcome2024', 10);

  // Create admin user (Keith)
  const keith = await prisma.user.upsert({
    where: { username: 'keith' },
    update: {},
    create: {
      username: 'keith',
      passwordHash: adminPassword,
      fullName: 'Keith Dimech',
      role: 'ADMIN',
    },
  });
  console.log('✓ Created admin user:', keith.username);

  // Create team members - ACTUAL LITHODAT ROSTER (19 people total)
  // Source: prototypes/web-app/data/lithodat-team-roster.md

  // Management Team (2 more - Wayne and Fabian, Moritz)
  const management = [
    { username: 'wayne', fullName: 'Wayne Noble' },
    { username: 'fabian', fullName: 'Fabian Kohlmann' },
    { username: 'moritz', fullName: 'Moritz Theile' },
  ];

  // Full-Time Employees (10)
  const fullTime = [
    { username: 'tarun', fullName: 'Tarun Sengar' },
    { username: 'nirali', fullName: 'Nirali Dudharejiya' },
    { username: 'xinyan', fullName: 'Xinyan Zhang' },
    { username: 'lujia', fullName: 'Lujia Yang' },
    { username: 'juan', fullName: 'Juan Bac' },
    { username: 'kristy', fullName: 'Kristy Kohlmann' },
    { username: 'aida', fullName: 'Aida Cristina Ibarra Sarabia' },
    { username: 'perla', fullName: 'Perla Luque' },
    { username: 'benjamin', fullName: 'Benjamin Dib' },
    { username: 'alejandra', fullName: 'Alejandra Bedoya Mejia' },
  ];

  // Contractors (5 more - Keith is admin, handled separately)
  const contractors = [
    { username: 'romain', fullName: 'Romain Beucher' },
    { username: 'nilesh', fullName: 'Nilesh Ambadas Vyavahare' },
    { username: 'raul', fullName: 'Raul Lugo' },
    { username: 'melanie', fullName: 'Melanie Sofia Cast. Gil' },
    { username: 'fun', fullName: 'Fun Meeuws' },
  ];

  const teamMembers = [...management, ...fullTime, ...contractors];

  for (const member of teamMembers) {
    const user = await prisma.user.upsert({
      where: { username: member.username },
      update: {},
      create: {
        username: member.username,
        passwordHash: memberPassword,
        fullName: member.fullName,
        role: 'MEMBER',
      },
    });
    console.log('✓ Created team member:', user.username);
  }

  console.log('\n✅ Database seeding completed!');
  console.log(`Total users created: ${teamMembers.length + 1}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
