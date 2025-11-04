import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getKeithResponses() {
  // First find keith user
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: { contains: 'keith', mode: 'insensitive' } },
        { fullName: { contains: 'keith', mode: 'insensitive' } }
      ]
    }
  });

  if (!user) {
    console.log('No user found matching "keith"');
    await prisma.$disconnect();
    return;
  }

  console.log(`Found user: ${user.username} (${user.fullName})`);
  console.log('');

  const responses = await prisma.actionResponse.findMany({
    where: {
      userId: user.id
    },
    include: {
      actionItem: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(`Total responses found: ${responses.length}`);
  console.log('\n=== ALL YOUR RESPONSES ===\n');

  responses.forEach((response, index) => {
    console.log(`${index + 1}. Action #${response.actionItem.actionNumber}: ${response.actionItem.title}`);
    console.log(`   Status: ${response.completed ? '✓ COMPLETED' : '○ In Progress'}`);
    console.log(`   Submitted: ${response.submittedAt || 'Not yet'}`);
    console.log(`   Responses:`, JSON.stringify(response.responses, null, 2));
    console.log(`   Created: ${response.createdAt}`);
    console.log(`   Updated: ${response.updatedAt}`);
    console.log('');
  });

  await prisma.$disconnect();
}

getKeithResponses().catch(console.error);
