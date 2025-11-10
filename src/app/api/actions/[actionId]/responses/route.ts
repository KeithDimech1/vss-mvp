import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/actions/[actionId]/responses
 * Create a new action response for the current user
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ actionId: string }> }
) {
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await the params promise
    const { actionId } = await params

    // Parse request body
    const body = await request.json()
    const { responses, completed = false } = body

    if (!responses || typeof responses !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request: responses object required' },
        { status: 400 }
      )
    }

    // Use upsert to handle both create and update cases
    const actionResponse = await prisma.actionResponse.upsert({
      where: {
        actionItemId_userId: {
          actionItemId: actionId,
          userId: session.userId
        }
      },
      update: {
        responses: responses,
        completed: completed,
        submittedAt: completed ? new Date() : null,
        updatedAt: new Date()
      },
      create: {
        actionItemId: actionId,
        userId: session.userId,
        responses: responses,
        completed: completed,
        submittedAt: completed ? new Date() : null
      }
    })

    return NextResponse.json({ actionResponse }, { status: 201 })
  } catch (error) {
    console.error('POST /api/actions/[actionId]/responses error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/actions/[actionId]/responses
 * Update an existing action response for the current user
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ actionId: string }> }
) {
  console.log('[API] PATCH /api/actions/[actionId]/responses called')
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      console.log('[API] PATCH: Unauthorized - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await the params promise
    const { actionId } = await params
    console.log('[API] PATCH: actionId =', actionId, ', userId =', session.userId)

    // Parse request body
    const body = await request.json()
    const { responses, completed = false } = body

    if (!responses || typeof responses !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request: responses object required' },
        { status: 400 }
      )
    }

    // Use upsert to handle both create and update cases
    // This prevents race conditions and handles the case where POST failed
    const actionResponse = await prisma.actionResponse.upsert({
      where: {
        actionItemId_userId: {
          actionItemId: actionId,
          userId: session.userId
        }
      },
      update: {
        responses: responses,
        completed: completed,
        submittedAt: completed ? new Date() : null,
        updatedAt: new Date()
      },
      create: {
        actionItemId: actionId,
        userId: session.userId,
        responses: responses,
        completed: completed,
        submittedAt: completed ? new Date() : null
      }
    })

    return NextResponse.json({ actionResponse }, { status: 200 })
  } catch (error) {
    console.error('PATCH /api/actions/[actionId]/responses error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/actions/[actionId]/responses
 * Fetch the current user's response for this action (if exists)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ actionId: string }> }
) {
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await the params promise
    const { actionId } = await params

    // Find user's response for this action
    const actionResponse = await prisma.actionResponse.findUnique({
      where: {
        actionItemId_userId: {
          actionItemId: actionId,
          userId: session.userId
        }
      }
    })

    if (!actionResponse) {
      return NextResponse.json({ actionResponse: null }, { status: 200 })
    }

    return NextResponse.json({ actionResponse }, { status: 200 })
  } catch (error) {
    console.error('GET /api/actions/[actionId]/responses error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/actions/[actionId]/responses
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  console.log('[API] OPTIONS /api/actions/[actionId]/responses called')
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, PATCH, OPTIONS',
    },
  })
}
