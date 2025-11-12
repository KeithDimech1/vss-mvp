import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Get Moritz's LithoSurfer response
    const moritzResponse = await prisma.actionResponse.findFirst({
      where: {
        user: {
          username: 'moritz'
        },
        actionItem: {
          actionSlug: 'lithosurfer'
        }
      },
      include: {
        user: true,
        actionItem: true
      }
    });

    if (!moritzResponse) {
      console.log('❌ No LithoSurfer response found for Moritz');
      return;
    }

    console.log('\n==========================================================');
    console.log('MORITZ THEILE - LITHOSURFER RESPONSE');
    console.log('==========================================================\n');
    console.log(`Submitted: ${moritzResponse.submittedAt?.toLocaleString() || 'Draft'}`);
    console.log(`Completed: ${moritzResponse.completed ? 'Yes' : 'No'}`);
    console.log(`Last Updated: ${moritzResponse.updatedAt.toLocaleString()}`);
    console.log('\n');

    const responses = moritzResponse.responses as Record<string, any>;

    console.log('ALL RESPONSES:\n');
    for (const [key, value] of Object.entries(responses)) {
      console.log(`[${key}]`);
      if (typeof value === 'string') {
        console.log(value);
      } else {
        console.log(JSON.stringify(value, null, 2));
      }
      console.log('\n');
    }

    // Specifically check implementation question
    console.log('==========================================================');
    console.log('IMPLEMENTATION QUESTION SPECIFICALLY:');
    console.log('==========================================================\n');

    const implResponse = responses['lithosurfer_implementation'];
    console.log('lithosurfer_implementation:');
    console.log(JSON.stringify(implResponse, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
