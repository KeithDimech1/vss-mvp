import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Get all action items for Action 1 (lithosurfer, lithodata, lithobuild)
    const action1Items = await prisma.actionItem.findMany({
      where: {
        actionSlug: {
          in: ['lithosurfer', 'lithodata', 'lithobuild']
        }
      },
      include: {
        responses: {
          include: {
            user: {
              select: {
                fullName: true,
                username: true
              }
            }
          }
        }
      }
    });

    console.log('\n==========================================================');
    console.log('ACTION 1 RESPONSES - WHO HAS RESPONDED AND WHAT THEY SAID');
    console.log('==========================================================\n');

    for (const actionItem of action1Items) {
      console.log(`\n📋 ${actionItem.title} (${actionItem.actionSlug})`);
      console.log(`   Priority: ${actionItem.priority} | Status: ${actionItem.status}`);
      console.log(`   Owner: ${actionItem.owner}`);
      console.log(`   Responses: ${actionItem.responses.length}`);
      console.log('   ---');

      if (actionItem.responses.length === 0) {
        console.log('   ❌ No responses yet\n');
        continue;
      }

      for (const response of actionItem.responses) {
        console.log(`\n   👤 ${response.user.fullName} (@${response.user.username})`);
        console.log(`      Submitted: ${response.submittedAt ? new Date(response.submittedAt).toLocaleDateString() : 'Draft (not submitted)'}`);
        console.log(`      Completed: ${response.completed ? 'Yes' : 'No'}`);
        console.log(`      Last updated: ${new Date(response.updatedAt).toLocaleDateString()}`);

        // Parse and display responses
        const responses = response.responses as Record<string, any>;
        const questionCount = Object.keys(responses).length;
        console.log(`      Questions answered: ${questionCount}`);

        // Show first few key responses as preview
        console.log(`\n      Preview of responses:`);
        let previewCount = 0;
        for (const [key, value] of Object.entries(responses)) {
          if (previewCount >= 3) break;
          if (value && typeof value === 'string' && value.length > 0) {
            const displayValue = value.length > 100 ? value.substring(0, 100) + '...' : value;
            console.log(`        • ${key}: ${displayValue}`);
            previewCount++;
          } else if (Array.isArray(value) && value.length > 0) {
            console.log(`        • ${key}: [${value.length} items]`);
            previewCount++;
          }
        }
        console.log('');
      }
    }

    console.log('\n==========================================================');
    console.log('SUMMARY');
    console.log('==========================================================\n');

    const totalActions = action1Items.length;
    const actionsWithResponses = action1Items.filter(a => a.responses.length > 0).length;
    const totalResponses = action1Items.reduce((sum, a) => sum + a.responses.length, 0);
    const completedResponses = action1Items.reduce(
      (sum, a) => sum + a.responses.filter(r => r.completed).length,
      0
    );

    console.log(`Total Action 1 sub-actions: ${totalActions}`);
    console.log(`Actions with responses: ${actionsWithResponses}`);
    console.log(`Total responses received: ${totalResponses}`);
    console.log(`Completed responses: ${completedResponses}`);
    console.log(`Draft responses: ${totalResponses - completedResponses}`);
    console.log('');

  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
