import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function viewAssessment() {
  const username = process.argv[2] || 'keith';

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      assessments: true,
    },
  });

  if (!user) {
    console.log(`❌ User '${username}' not found`);
    return;
  }

  console.log(`\n📋 Assessment for ${user.fullName} (@${user.username})\n`);

  if (user.assessments.length === 0) {
    console.log('No assessments found.');
    return;
  }

  const assessment = user.assessments[0];
  console.log(`Status: ${assessment.completed ? '✅ Completed' : '🔄 Draft'}`);
  console.log(`Created: ${assessment.createdAt.toLocaleString()}`);
  console.log(`Updated: ${assessment.updatedAt.toLocaleString()}`);
  if (assessment.submittedAt) {
    console.log(`Submitted: ${assessment.submittedAt.toLocaleString()}`);
  }

  console.log('\n📝 Responses:\n');
  const responses = assessment.responses as Record<string, string>;

  if (!responses || Object.keys(responses).length === 0) {
    console.log('No responses saved yet.');
    return;
  }

  Object.entries(responses).forEach(([key, value]) => {
    console.log(`${key}:`);
    console.log(value);
    console.log('\n---\n');
  });
}

viewAssessment()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
