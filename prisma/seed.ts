import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Hash passwords using bcryptjs (pure JS, works in all environments)
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

  // Management Team (4 - Wayne, Fabian, Moritz, Vinko)
  const management = [
    { username: 'wayne', fullName: 'Wayne Noble' },
    { username: 'fabian', fullName: 'Fabian Kohlmann' },
    { username: 'moritz', fullName: 'Moritz Theile' },
    { username: 'vinko', fullName: 'Vinko Novak' },
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

  // Create 7 VSM Action Items
  console.log('\n📋 Creating VSM Action Items...');

  const actions = [
    {
      actionNumber: 1,
      actionSlug: 'products-services',
      title: 'Products, Services & Pricing',
      description: 'Define product portfolio and pricing framework before adding to utopia.',
      priority: 'IMMEDIATE',
      owner: 'Keith (Management Team)',
      status: 'not-started'
    },
    {
      actionNumber: 2,
      actionSlug: 'unified-utopia',
      title: 'Define Unified Utopia',
      description: 'Resolve clashes and create coherent 2yr/5yr/10yr roadmap.',
      priority: 'IMMEDIATE',
      owner: 'Management Team',
      status: 'not-started'
    },
    {
      actionNumber: 3,
      actionSlug: 'setup-departments',
      title: 'Setup Three Departments',
      description: 'Formalize LithoSurfer, LithoBuild, LithoData systems.',
      priority: 'IMMEDIATE',
      owner: 'Management Team',
      status: 'not-started'
    },
    {
      actionNumber: 4,
      actionSlug: 'okrs',
      title: 'Implementation Plan (OKRs)',
      description: 'Create actionable roadmap with quarterly OKRs.',
      priority: 'SHORT-TERM',
      owner: 'Keith & Vinko',
      status: 'not-started'
    },
    {
      actionNumber: 5,
      actionSlug: 'intelligence',
      title: 'Build System 4 Intelligence',
      description: 'Address blind spots in market intelligence and CRM.',
      priority: 'SHORT-TERM',
      owner: 'Management Team',
      status: 'not-started'
    },
    {
      actionNumber: 6,
      actionSlug: 'career-paths',
      title: 'Career Paths & Org Design',
      description: 'Create progression paths for scaling to 20+ staff.',
      priority: 'SHORT-TERM',
      owner: 'Management Team',
      status: 'not-started'
    },
    {
      actionNumber: 7,
      actionSlug: 'realtime-intelligence',
      title: 'Lithodat Realtime Intelligence System',
      description: 'Build proper attenuators for System 1 → System 3 communication. Real-time visibility of operational performance enables effective management decisions.',
      priority: 'IMMEDIATE',
      owner: 'Management Team + Tech Leads',
      status: 'not-started'
    }
  ];

  for (const action of actions) {
    const actionItem = await prisma.actionItem.upsert({
      where: { actionNumber: action.actionNumber },
      update: {},
      create: action
    });
    console.log(`✓ Created action ${actionItem.actionNumber}: ${actionItem.title}`);
  }

  console.log('\n✅ Database seeding completed!');
  console.log(`Total users created: ${teamMembers.length + 1}`);
  console.log(`Total actions created: ${actions.length}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
