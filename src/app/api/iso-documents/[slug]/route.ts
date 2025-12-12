import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireManager } from '@/lib/server-auth';
import { getDocumentTemplate, documentTypeLabels } from '@/lib/iso-documents';
import { IsoDocumentType, getSectionStatus } from '@/lib/iso-documents/types';

// GET - Get a specific document with its template
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await requireManager();
    const { slug } = await params;

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

    // Calculate section statuses based on saved content
    const sections = document.sections as Record<string, any>;
    const sectionStatuses: Record<string, string> = {};

    if (template) {
      template.sections.forEach(section => {
        const sectionContent = sections[section.key] || {};
        sectionStatuses[section.key] = getSectionStatus(section, sectionContent);
      });
    }

    return NextResponse.json({
      document,
      template,
      typeLabel: documentTypeLabels[document.documentType as IsoDocumentType],
      sectionStatuses
    });
  } catch (error: any) {
    console.error('[ISO-DOCUMENTS API] GET error:', error);

    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden - Manager access required' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

// PATCH - Update document sections (auto-save)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await requireManager();
    const { slug } = await params;
    const body = await request.json();

    const { sectionKey, sectionContent, metadata } = body;

    // Get existing document
    const document = await prisma.isoDocument.findUnique({
      where: { documentSlug: slug }
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Get existing sections
    const existingSections = document.sections as Record<string, any>;

    // Update the specific section
    const updatedSections = {
      ...existingSections,
      [sectionKey]: {
        ...sectionContent,
        lastUpdated: new Date().toISOString(),
        lastEditedBy: user.id
      }
    };

    // Prepare update data
    const updateData: any = {
      sections: updatedSections,
      lastEditedById: user.id,
      lastEditedAt: new Date()
    };

    // If metadata provided, update those fields too
    if (metadata) {
      if (metadata.title) updateData.title = metadata.title;
      if (metadata.organizationName) updateData.organizationName = metadata.organizationName;
      if (metadata.effectiveDate) updateData.effectiveDate = new Date(metadata.effectiveDate);
      if (metadata.reviewDate) updateData.reviewDate = new Date(metadata.reviewDate);
      if (metadata.status) updateData.status = metadata.status;
    }

    // Update document
    const updated = await prisma.isoDocument.update({
      where: { documentSlug: slug },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      document: updated,
      message: 'Section saved successfully'
    });
  } catch (error: any) {
    console.error('[ISO-DOCUMENTS API] PATCH error:', error);

    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden - Manager access required' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

// PUT - Update document metadata and status (submit/approve)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await requireManager();
    const { slug } = await params;
    const body = await request.json();

    const {
      title,
      organizationName,
      status,
      effectiveDate,
      reviewDate,
      approvedBy,
      policyStatement
    } = body;

    // Get existing document
    const document = await prisma.isoDocument.findUnique({
      where: { documentSlug: slug }
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      lastEditedById: user.id,
      lastEditedAt: new Date()
    };

    if (title) updateData.title = title;
    if (organizationName) updateData.organizationName = organizationName;
    if (status) updateData.status = status;
    if (effectiveDate) updateData.effectiveDate = new Date(effectiveDate);
    if (reviewDate) updateData.reviewDate = new Date(reviewDate);
    if (policyStatement) updateData.policyStatement = policyStatement;

    // If approving, set approval details
    if (status === 'APPROVED') {
      updateData.approvedBy = approvedBy || user.fullName;
      updateData.approvedAt = new Date();
    }

    // Update document
    const updated = await prisma.isoDocument.update({
      where: { documentSlug: slug },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      document: updated,
      message: status === 'APPROVED'
        ? 'Document approved successfully'
        : 'Document updated successfully'
    });
  } catch (error: any) {
    console.error('[ISO-DOCUMENTS API] PUT error:', error);

    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden - Manager access required' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a document (only drafts)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await requireManager();
    const { slug } = await params;

    const document = await prisma.isoDocument.findUnique({
      where: { documentSlug: slug }
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Only allow deleting drafts
    if (document.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'Only draft documents can be deleted. Archive approved documents instead.' },
        { status: 400 }
      );
    }

    await prisma.isoDocument.delete({
      where: { documentSlug: slug }
    });

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error: any) {
    console.error('[ISO-DOCUMENTS API] DELETE error:', error);

    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden - Manager access required' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
