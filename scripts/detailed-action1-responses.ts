import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  try {
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
          },
          orderBy: {
            user: {
              username: 'asc'
            }
          }
        }
      },
      orderBy: {
        actionSlug: 'asc'
      }
    });

    let output = '';

    output += '\n==========================================================================\n';
    output += 'ACTION 1 DETAILED RESPONSES - ALL THREE SUB-ACTIONS\n';
    output += '==========================================================================\n\n';
    output += `Generated: ${new Date().toLocaleString()}\n\n`;

    for (const actionItem of action1Items) {
      output += '\n##########################################################################\n';
      output += `# ${actionItem.title.toUpperCase()}\n`;
      output += `# Slug: ${actionItem.actionSlug}\n`;
      output += '##########################################################################\n\n';

      if (actionItem.responses.length === 0) {
        output += '❌ NO RESPONSES YET\n\n';
        continue;
      }

      for (const response of actionItem.responses) {
        output += '\n--------------------------------------------------------------------------\n';
        output += `RESPONDENT: ${response.user.fullName} (@${response.user.username})\n`;
        output += '--------------------------------------------------------------------------\n';
        output += `Submitted: ${response.submittedAt ? new Date(response.submittedAt).toLocaleString() : '⚠️  DRAFT (Not Submitted)'}\n`;
        output += `Completed: ${response.completed ? '✅ Yes' : '⚠️  No (Draft)'}\n`;
        output += `Last Updated: ${new Date(response.updatedAt).toLocaleString()}\n`;
        output += '\n';

        const responses = response.responses as Record<string, any>;

        output += 'RESPONSES:\n';
        output += '----------\n\n';

        for (const [questionId, answer] of Object.entries(responses)) {
          output += `[${questionId}]\n`;

          if (typeof answer === 'string') {
            output += `${answer}\n\n`;
          } else if (Array.isArray(answer)) {
            output += `${JSON.stringify(answer, null, 2)}\n\n`;
          } else if (typeof answer === 'object' && answer !== null) {
            output += `${JSON.stringify(answer, null, 2)}\n\n`;
          } else {
            output += `${answer}\n\n`;
          }
        }

        output += '\n';
      }
    }

    // Summary table
    output += '\n==========================================================================\n';
    output += 'SUMMARY - WHO HAS RESPONDED TO WHAT\n';
    output += '==========================================================================\n\n';

    const respondents = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];
    const subActions = ['lithosurfer', 'lithodata', 'lithobuild'];

    // Header row
    output += 'RESPONDENT      | LithoSurfer | LithoData | LithoBuild\n';
    output += '----------------|-------------|-----------|------------\n';

    for (const respondent of respondents) {
      const row = [respondent.padEnd(15)];

      for (const subAction of subActions) {
        const actionItem = action1Items.find(a => a.actionSlug === subAction);
        const response = actionItem?.responses.find(r => r.user.username === respondent);

        if (response) {
          if (response.completed) {
            row.push('✅ Complete  ');
          } else {
            row.push('⚠️  Draft     ');
          }
        } else {
          row.push('❌ No response');
        }
      }

      output += row.join(' | ') + '\n';
    }

    output += '\n==========================================================================\n\n';

    // Write to file
    const outputPath = './action1-detailed-responses.txt';
    fs.writeFileSync(outputPath, output);

    console.log(output);
    console.log(`\n✅ Full report saved to: ${outputPath}\n`);

  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
