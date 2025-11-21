import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const totalActions = await prisma.hRActionItem.count();

  const byStatus = await prisma.hRActionItem.groupBy({
    by: ['status'],
    _count: true,
  });

  const byEmployee = await prisma.hRActionItem.groupBy({
    by: ['employeeId'],
    _count: true,
  });

  console.log('\n📊 HR Action Items Summary\n');
  console.log(`Total Actions: ${totalActions}\n`);

  console.log('By Status:');
  for (const item of byStatus) {
    console.log(`  ${item.status}: ${item._count}`);
  }

  console.log(`\nActions distributed across ${byEmployee.length} employees\n`);

  // Get actions by employee with details
  const actionsWithEmployees = await prisma.hRActionItem.findMany({
    include: {
      employee: { select: { fullName: true } },
      assignedTo: { select: { fullName: true } },
    },
    orderBy: { employee: { fullName: 'asc' } },
  });

  console.log('Actions by Employee:');
  const employeeGroups = actionsWithEmployees.reduce((acc, action) => {
    const name = action.employee.fullName;
    if (!acc[name]) acc[name] = [];
    acc[name].push(action);
    return acc;
  }, {} as Record<string, typeof actionsWithEmployees>);

  for (const [employee, actions] of Object.entries(employeeGroups)) {
    console.log(`\n  ${employee} (${actions.length} actions):`);
    actions.forEach(action => {
      const assignee = action.assignedTo?.fullName || 'Unassigned';
      console.log(`    - ${assignee}: ${action.description.substring(0, 60)}...`);
    });
  }
}

main()
  .finally(() => prisma.$disconnect());
