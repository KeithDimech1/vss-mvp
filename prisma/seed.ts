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
    update: { isManager: true }, // Ensure isManager is set on updates
    create: {
      username: 'keith',
      passwordHash: adminPassword,
      fullName: 'Keith Dimech',
      role: 'ADMIN',
      isManager: true, // Keith is a manager
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
    // Check if this member is in the management team
    const isManagerMember = management.some(m => m.username === member.username);

    const user = await prisma.user.upsert({
      where: { username: member.username },
      update: { isManager: isManagerMember }, // Update isManager on updates
      create: {
        username: member.username,
        passwordHash: memberPassword,
        fullName: member.fullName,
        role: 'MEMBER',
        isManager: isManagerMember, // Set isManager for management team
      },
    });
    console.log(`✓ Created team member: ${user.username}${isManagerMember ? ' (Manager)' : ''}`);
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
      title: 'Unified Utopia Vision',
      description: 'Build consensus on Lithodat\'s unified utopia vision across management team',
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
      title: 'Lithodat Realtime Amplifiers and Attenuators',
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

  // Create Finance Dashboard Tasks
  console.log('\n💰 Creating Finance Dashboard Tasks...');

  // Get Kristy's user ID for task assignment
  const kristy = await prisma.user.findUnique({
    where: { username: 'kristy' }
  });

  if (kristy) {
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const financeTasks = [
      // Week 1: Fresh Start + Payroll
      {
        title: 'Review last month\'s close status',
        description: 'Check for any overdue items from previous month and set up current month calendar',
        category: 'DAILY',
        priority: 'MEDIUM',
        dueDate: new Date(currentMonth.getTime() + 1 * 24 * 60 * 60 * 1000), // Day 1
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'Run payroll in Xero',
        description: `1. Open Xero → Payroll
2. Select current pay period
3. Review staff hours/salaries
4. Click "Process Payroll"
5. File STP (next task)`,
        category: 'CRITICAL',
        priority: 'HIGH',
        dueDate: new Date(currentMonth.getTime() + 3 * 24 * 60 * 60 * 1000), // Day 3
        recurringRule: 'MONTHLY_DAY_3',
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'File STP (Single Touch Payroll)',
        description: 'After processing payroll, file STP report to ATO',
        category: 'CRITICAL',
        priority: 'HIGH',
        dueDate: new Date(currentMonth.getTime() + 3 * 24 * 60 * 60 * 1000), // Day 3
        recurringRule: 'MONTHLY_DAY_3',
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'Process staff payments',
        description: 'Ensure all payroll payments are processed from bank account',
        category: 'CRITICAL',
        priority: 'HIGH',
        dueDate: new Date(currentMonth.getTime() + 3 * 24 * 60 * 60 * 1000), // Day 3
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'Reconcile previous month bank feeds (100%)',
        description: 'Ensure all bank transactions from previous month are fully reconciled',
        category: 'DAILY',
        priority: 'HIGH',
        dueDate: new Date(currentMonth.getTime() + 5 * 24 * 60 * 60 * 1000), // Day 5
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'Pay all bills due this week',
        description: 'Sort bills by due date in Xero and process payments',
        category: 'WEEKLY',
        priority: 'MEDIUM',
        dueDate: new Date(currentMonth.getTime() + 7 * 24 * 60 * 60 * 1000), // Day 7
        recurringRule: 'WEEKLY_FRIDAY',
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      // Daily recurring tasks
      {
        title: 'Check Dext inbox (5-10 min)',
        description: `1. Open Dext Costs Inbox
2. Review new receipts/invoices
3. Verify supplier, date, amount, tax
4. Apply account codes
5. Set tracking categories (team, initiative, cost type)
6. Publish to Xero as Bills

Goal: No item sits unpublished for >3 days`,
        category: 'DAILY',
        priority: 'MEDIUM',
        dueDate: new Date(currentMonth.getTime() + 1 * 24 * 60 * 60 * 1000),
        recurringRule: 'DAILY',
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'Bank reconciliation check',
        description: `Check daily, reconcile 2-3x/week:
1. Open Xero → Accounting → Bank Accounts
2. Match payments to bills
3. Use "Spend Money" for non-bill transactions
4. Use "Transfer" for inter-account movements
5. For multi-currency (Wise): Check FX rates

Goal: No unreconciled line older than 5 days`,
        category: 'DAILY',
        priority: 'MEDIUM',
        dueDate: new Date(currentMonth.getTime() + 1 * 24 * 60 * 60 * 1000),
        recurringRule: 'DAILY',
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      // Month-end tasks
      {
        title: 'Month-end close: All Dext items published',
        description: 'Code and publish all remaining Dext items. Target: 0 unpublished items',
        category: 'MONTH_END',
        priority: 'HIGH',
        dueDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0), // Last day of month
        recurringRule: 'MONTHLY_LAST_DAY',
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'Month-end close: All bills coded and approved',
        description: 'Review all Draft and Awaiting Approval bills in Xero. Move approved bills to Awaiting Payment.',
        category: 'MONTH_END',
        priority: 'HIGH',
        dueDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0), // Last day of month
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
      {
        title: 'Month-end close: Bank reconciliation 100%',
        description: 'All bank feed lines reconciled. Target: 0 lines older than 5 days',
        category: 'MONTH_END',
        priority: 'HIGH',
        dueDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0), // Last day of month
        status: 'PENDING',
        assignedToId: kristy.id,
        createdById: keith.id,
      },
    ];

    for (const task of financeTasks) {
      const createdTask = await prisma.financeTask.create({
        data: task
      });
      console.log(`✓ Created finance task: ${createdTask.title}`);
    }

    // Create initial metrics entry
    const initialMetrics = await prisma.financeMetric.create({
      data: {
        month: currentMonth,
        dextPublished: 0,
        dextTotal: 0,
        unreconciledLines: 0,
        unreconciledOld: 0,
        billsPaid: 0,
        billsDueThisWeek: 0,
        payrollCompleted: false,
      }
    });
    console.log('✓ Created initial finance metrics');
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
