/**
 * Script to check if Fabian's employees have any HR data
 */

import { prisma } from '../src/lib/prisma';

async function checkFabianEmployeeData() {
  try {
    console.log('Finding Fabian and his employees...\n');

    const fabian = await prisma.user.findFirst({
      where: { fullName: { contains: 'Fabian', mode: 'insensitive' } },
    });

    if (!fabian) {
      console.log('❌ Fabian not found');
      return;
    }

    const managedEmployees = await prisma.userManager.findMany({
      where: { managerId: fabian.id },
      include: { employee: true },
    });

    console.log(`Checking HR data for Fabian's ${managedEmployees.length} employees:\n`);

    for (const { employee } of managedEmployees) {
      console.log(`\n${employee.fullName}:`);

      // Check interview notes
      const interviews = await prisma.hRInterviewNote.count({
        where: { userId: employee.id },
      });
      console.log(`  Interviews: ${interviews}`);

      // Check feedback surveys
      const feedback = await prisma.hRFeedbackSurvey.count({
        where: { userId: employee.id },
      });
      console.log(`  Feedback: ${feedback}`);

      // Check goal settings
      const goals = await prisma.hRGoalSetting.count({
        where: { userId: employee.id },
      });
      console.log(`  Goals: ${goals}`);

      // Check action items FOR this employee (as assignedTo)
      const actionsFor = await prisma.hRActionItem.count({
        where: { assignedToId: employee.id },
      });
      console.log(`  Actions assigned TO them: ${actionsFor}`);

      // Check action items ABOUT this employee (as employee)
      const actionsAbout = await prisma.hRActionItem.count({
        where: { employeeId: employee.id },
      });
      console.log(`  Actions about them: ${actionsAbout}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkFabianEmployeeData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
