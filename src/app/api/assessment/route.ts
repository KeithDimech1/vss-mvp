import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/assessment
 * Fetch the current user's assessment (if exists)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user's assessment
    const assessment = await prisma.assessment.findFirst({
      where: {
        userId: session.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!assessment) {
      return NextResponse.json({ assessment: null }, { status: 200 })
    }

    return NextResponse.json({ assessment }, { status: 200 })
  } catch (error) {
    console.error('GET /api/assessment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/assessment
 * Create a new assessment for the current user
 */
export async function POST(request: NextRequest) {
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already has an assessment
    const existingAssessment = await prisma.assessment.findFirst({
      where: {
        userId: session.userId
      }
    })

    if (existingAssessment) {
      return NextResponse.json(
        { error: 'Assessment already exists', assessment: existingAssessment },
        { status: 400 }
      )
    }

    // Create new assessment with empty responses
    const assessment = await prisma.assessment.create({
      data: {
        userId: session.userId,
        responses: {},
        completed: false
      }
    })

    return NextResponse.json({ assessment }, { status: 201 })
  } catch (error) {
    console.error('POST /api/assessment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/assessment
 * Update assessment responses (save draft)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { responses } = body

    if (!responses || typeof responses !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request: responses object required' },
        { status: 400 }
      )
    }

    // Find user's assessment
    const existingAssessment = await prisma.assessment.findFirst({
      where: {
        userId: session.userId
      }
    })

    let assessment

    if (existingAssessment) {
      // Update existing assessment
      assessment = await prisma.assessment.update({
        where: {
          id: existingAssessment.id
        },
        data: {
          responses: responses,
          updatedAt: new Date()
        }
      })
    } else {
      // Create new assessment if none exists
      assessment = await prisma.assessment.create({
        data: {
          userId: session.userId,
          responses: responses,
          completed: false
        }
      })
    }

    return NextResponse.json({ assessment }, { status: 200 })
  } catch (error) {
    console.error('PATCH /api/assessment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/assessment
 * Submit assessment (mark as completed)
 */
export async function PUT(request: NextRequest) {
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { responses } = body

    if (!responses || typeof responses !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request: responses object required' },
        { status: 400 }
      )
    }

    // Find user's assessment
    const existingAssessment = await prisma.assessment.findFirst({
      where: {
        userId: session.userId
      }
    })

    let assessment

    if (existingAssessment) {
      // Update and mark as completed
      assessment = await prisma.assessment.update({
        where: {
          id: existingAssessment.id
        },
        data: {
          responses: responses,
          completed: true,
          submittedAt: new Date(),
          updatedAt: new Date()
        }
      })
    } else {
      // Create new assessment and mark as completed
      assessment = await prisma.assessment.create({
        data: {
          userId: session.userId,
          responses: responses,
          completed: true,
          submittedAt: new Date()
        }
      })
    }

    return NextResponse.json({ assessment, message: 'Assessment submitted successfully' }, { status: 200 })
  } catch (error) {
    console.error('PUT /api/assessment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
