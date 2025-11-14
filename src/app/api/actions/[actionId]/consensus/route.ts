import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * PUT /api/actions/[actionId]/consensus
 * Create or update consensus data for an action
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ actionId: string }> }
) {
  try {
    // Verify session
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await the params promise (actionId is actually the slug from URL)
    const { actionId: actionSlug } = await params

    // Look up the ActionItem by slug to get the actual database ID
    const actionItem = await prisma.actionItem.findUnique({
      where: { actionSlug: actionSlug }
    })

    if (!actionItem) {
      return NextResponse.json(
        { error: 'Action not found' },
        { status: 404 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { consensusData, notes, resolved = false } = body

    if (!consensusData || typeof consensusData !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request: consensusData object required' },
        { status: 400 }
      )
    }

    // Use upsert to handle both create and update cases
    const actionConsensus = await prisma.actionConsensus.upsert({
      where: {
        actionItemId: actionItem.id
      },
      update: {
        consensusData: consensusData,
        notes: notes || null,
        resolved: resolved,
        resolvedAt: resolved ? new Date() : null,
        resolvedBy: resolved ? session.userId : null,
        updatedAt: new Date()
      },
      create: {
        actionItemId: actionItem.id,
        consensusData: consensusData,
        notes: notes || null,
        resolved: resolved,
        resolvedAt: resolved ? new Date() : null,
        resolvedBy: resolved ? session.userId : null
      }
    })

    return NextResponse.json({ actionConsensus }, { status: 200 })
  } catch (error) {
    console.error('PUT /api/actions/[actionId]/consensus error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/actions/[actionId]/consensus
 * Fetch the consensus data for this action (if exists)
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

    // Await the params promise (actionId is actually the slug from URL)
    const { actionId: actionSlug } = await params

    // Look up the ActionItem by slug to get the actual database ID
    const actionItem = await prisma.actionItem.findUnique({
      where: { actionSlug: actionSlug }
    })

    if (!actionItem) {
      return NextResponse.json(
        { error: 'Action not found' },
        { status: 404 }
      )
    }

    // Find consensus for this action
    const actionConsensus = await prisma.actionConsensus.findUnique({
      where: {
        actionItemId: actionItem.id
      }
    })

    if (!actionConsensus) {
      return NextResponse.json({ actionConsensus: null }, { status: 200 })
    }

    return NextResponse.json({ actionConsensus }, { status: 200 })
  } catch (error) {
    console.error('GET /api/actions/[actionId]/consensus error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/actions/[actionId]/consensus
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, PUT, OPTIONS',
    },
  })
}
