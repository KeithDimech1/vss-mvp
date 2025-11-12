import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // First, find Action 2
    const action2 = await prisma.actionItem.findFirst({
      where: {
        actionNumber: 2
      }
    })

    if (!action2) {
      console.log('❌ Action 2 not found in database')
      return
    }

    console.log('✅ Found Action 2:')
    console.log(`   ID: ${action2.id}`)
    console.log(`   Title: ${action2.title}`)
    console.log(`   Status: ${action2.status}`)
    console.log('')

    // Get all responses for Action 2
    const responses = await prisma.actionResponse.findMany({
      where: {
        actionItemId: action2.id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true
          }
        }
      }
    })

    console.log(`📊 Total responses: ${responses.length}`)
    console.log('')

    if (responses.length === 0) {
      console.log('ℹ️  No responses found for Action 2')
    } else {
      responses.forEach((response, index) => {
        console.log(`\n--- Response #${index + 1} ---`)
        console.log(`User: ${response.user.fullName} (@${response.user.username})`)
        console.log(`Completed: ${response.completed ? '✅ Yes' : '⏳ Draft'}`)
        console.log(`Submitted: ${response.submittedAt ? response.submittedAt.toISOString() : 'Not submitted'}`)
        console.log(`Created: ${response.createdAt.toISOString()}`)
        console.log(`Updated: ${response.updatedAt.toISOString()}`)
        console.log(`\nResponse data:`)
        console.log(JSON.stringify(response.responses, null, 2))
      })
    }

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
