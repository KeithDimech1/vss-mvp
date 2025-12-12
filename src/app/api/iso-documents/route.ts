import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, requireManager } from '@/lib/server-auth';
import { getDocumentTemplate, documentTypeLabels } from '@/lib/iso-documents';
import { IsoDocumentType } from '@/lib/iso-documents/types';

// GET - List all ISO documents or get a specific document by slug
export async function GET(request: NextRequest) {
  try {
    // Require manager access
    const user = await requireManager();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const type = searchParams.get('type') as IsoDocumentType | null;

    // If slug provided, get specific document
    if (slug) {
      const document = await prisma.isoDocument.findUnique({
        where: { documentSlug: slug }
      });

      if (!document) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }

      // Get template for this document type
      const template = getDocumentTemplate(document.documentType as IsoDocumentType);

      return NextResponse.json({
        document,
        template,
        typeLabel: documentTypeLabels[document.documentType as IsoDocumentType]
      });
    }

    // List all documents, optionally filtered by type
    const documents = await prisma.isoDocument.findMany({
      where: type ? { documentType: type } : undefined,
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({ documents });
  } catch (error: any) {
    console.error('[ISO-DOCUMENTS API] GET error:', error);

    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden - Manager access required' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// POST - Create a new ISO document
export async function POST(request: NextRequest) {
  try {
    const user = await requireManager();

    const body = await request.json();
    const { documentType, title, documentSlug } = body;

    // Validate document type
    if (!documentType || !['HSE_POLICY', 'QUALITY_POLICY', 'ENVIRONMENTAL_POLICY', 'OHS_POLICY', 'IMS_MANUAL'].includes(documentType)) {
      return NextResponse.json(
        { error: 'Invalid document type' },
        { status: 400 }
      );
    }

    // Check if template is available
    const template = getDocumentTemplate(documentType as IsoDocumentType);
    if (!template) {
      return NextResponse.json(
        { error: `Template for ${documentType} is not yet available` },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const slug = documentSlug || `${documentType.toLowerCase().replace('_', '-')}-${Date.now()}`;

    // Check for duplicate slug
    const existing = await prisma.isoDocument.findUnique({
      where: { documentSlug: slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A document with this slug already exists' },
        { status: 400 }
      );
    }

    // Create the document
    const document = await prisma.isoDocument.create({
      data: {
        documentType,
        documentSlug: slug,
        title: title || template.title,
        organizationName: 'Lithodat Pty Ltd',
        createdById: user.id,
        lastEditedById: user.id,
        sections: {} // Initialize empty sections
      }
    });

    return NextResponse.json({
      success: true,
      document,
      message: 'Document created successfully'
    });
  } catch (error: any) {
    console.error('[ISO-DOCUMENTS API] POST error:', error);

    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden - Manager access required' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
