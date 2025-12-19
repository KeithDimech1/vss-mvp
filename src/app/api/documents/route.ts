import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/server-auth';

// GET /api/documents - List all documents for current user
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const documents = await prisma.document.findMany({
      where: {
        OR: [
          { createdById: auth.user!.userId },
          { isPublic: true },
          {
            sharedWith: {
              path: '$',
              array_contains: auth.user!.userId,
            },
          },
        ],
      },
      include: {
        currentVersion: {
          select: {
            versionNumber: true,
            versionName: true,
            createdAt: true,
          },
        },
        template: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// POST /api/documents - Create new document
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      documentType,
      description,
      htmlContent,
      cssContent,
      templateId,
      isPublic = false,
    } = body;

    // Validate required fields
    if (!title || !slug || !documentType) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, documentType' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.document.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A document with this slug already exists' },
        { status: 400 }
      );
    }

    // Create document with first version
    const document = await prisma.document.create({
      data: {
        title,
        slug,
        documentType,
        description,
        createdById: auth.user!.userId,
        templateId,
        isPublic,
        versions: {
          create: {
            versionNumber: 1,
            versionName: 'Initial version',
            htmlContent: htmlContent || '',
            cssContent: cssContent || '',
            createdById: auth.user!.userId,
          },
        },
      },
      include: {
        versions: true,
      },
    });

    // Update currentVersionId to point to the first version
    const updatedDocument = await prisma.document.update({
      where: { id: document.id },
      data: {
        currentVersionId: document.versions[0].id,
      },
      include: {
        currentVersion: true,
        template: true,
      },
    });

    return NextResponse.json({ document: updatedDocument }, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
