const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find action 2
  const action = await prisma.actionItem.findUnique({
    where: { actionSlug: 'unified-utopia' }
  });

  console.log('Action 2:', action);
  console.log('\n---\n');

  if (action) {
    // Find all responses for this action
    const responses = await prisma.actionResponse.findMany({
      where: { actionItemId: action.id },
      include: { user: true }
    });

    console.log(`Found ${responses.length} responses:`);
    responses.forEach((r, index) => {
      console.log(`\nResponse ${index + 1} (User: ${r.user.email}):`);
      console.log('Completed:', r.completed);
      console.log('Responses:', JSON.stringify(r.responses, null, 2));
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
