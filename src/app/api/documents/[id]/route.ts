import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/server-auth';

// GET /api/documents/[id] - Get single document with current version
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAuth(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        currentVersion: true,
        template: true,
        versions: {
          select: {
            id: true,
            versionNumber: true,
            versionName: true,
            createdAt: true,
          },
          orderBy: {
            versionNumber: 'desc',
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Check permissions
    const canAccess =
      document.createdById === auth.user!.userId ||
      document.isPublic ||
      (document.sharedWith as string[] | null)?.includes(auth.user!.userId);

    if (!canAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ document });
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

// PATCH /api/documents/[id] - Update document (creates new version)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAuth(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        currentVersion: true,
      },
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Check permissions (only owner can edit)
    if (document.createdById !== auth.user!.userId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      description,
      htmlContent,
      cssContent,
      versionName,
      changeNotes,
      isPublic,
    } = body;

    // Determine if content has changed (need new version)
    const contentChanged =
      htmlContent !== undefined &&
      cssContent !== undefined &&
      (htmlContent !== document.currentVersion?.htmlContent ||
        cssContent !== document.currentVersion?.cssContent);

    if (contentChanged) {
      // Create new version
      const nextVersionNumber = (document.currentVersion?.versionNumber || 0) + 1;

      const newVersion = await prisma.documentVersion.create({
        data: {
          documentId: id,
          versionNumber: nextVersionNumber,
          versionName: versionName || `Version ${nextVersionNumber}`,
          htmlContent,
          cssContent,
          changeNotes,
          createdById: auth.user!.userId,
        },
      });

      // Update document metadata and point to new version
      const updatedDocument = await prisma.document.update({
        where: { id },
        data: {
          title: title || document.title,
          description: description !== undefined ? description : document.description,
          isPublic: isPublic !== undefined ? isPublic : document.isPublic,
          currentVersionId: newVersion.id,
        },
        include: {
          currentVersion: true,
          template: true,
        },
      });

      return NextResponse.json({ document: updatedDocument });
    } else {
      // Only update metadata (no new version needed)
      const updatedDocument = await prisma.document.update({
        where: { id },
        data: {
          title: title || document.title,
          description: description !== undefined ? description : document.description,
          isPublic: isPublic !== undefined ? isPublic : document.isPublic,
        },
        include: {
          currentVersion: true,
          template: true,
        },
      });

      return NextResponse.json({ document: updatedDocument });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

// DELETE /api/documents/[id] - Delete document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAuth(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Check permissions (only owner can delete)
    if (document.createdById !== auth.user!.userId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Delete document (versions will be cascade deleted)
    await prisma.document.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
