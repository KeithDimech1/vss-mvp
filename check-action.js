const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const action = await prisma.actionItem.findUnique({
    where: { actionSlug: 'products-services' }
  });
  
  console.log('Action item:', JSON.stringify(action, null, 2));
  
  if (!action) {
    console.log('ERROR: Action item not found! This is the problem.');
  } else {
    console.log('Action item exists with ID:', action.id);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
