import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Checking database state...\n');

  // Count users
  const userCount = await prisma.user.count();
  console.log(`📊 Users: ${userCount}`);

  // List all users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
      role: true,
    },
  });
  console.log('\n👥 User List:');
  users.forEach((user) => {
    console.log(`  - ${user.fullName} (@${user.username}) [${user.role}]`);
  });

  // Count assessments
  const assessmentCount = await prisma.assessment.count();
  console.log(`\n📝 Assessments: ${assessmentCount}`);

  // List all assessments
  const assessments = await prisma.assessment.findMany({
    include: {
      user: {
        select: {
          username: true,
          fullName: true,
        },
      },
    },
  });

  if (assessments.length > 0) {
    console.log('\n📋 Assessment Details:');
    assessments.forEach((assessment) => {
      const responseCount = Object.keys(assessment.responses || {}).length;
      const status = assessment.completed ? '✅ Completed' : `🔄 Draft (${responseCount}/10)`;
      console.log(`  - ${assessment.user.fullName}: ${status}`);
      if (assessment.completed) {
        console.log(`    Submitted: ${assessment.submittedAt?.toLocaleString()}`);
      }
    });
  } else {
    console.log('  No assessments found.');
  }

  console.log('\n✅ Database check complete!');
}

checkDatabase()
  .catch((e) => {
    console.error('❌ Error checking database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
