import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/server-auth';
import { chromium } from 'playwright';

// POST /api/documents/[id]/pdf - Generate PDF from document
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let browser;

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

    // Check permissions
    const canAccess =
      document.createdById === auth.user!.userId ||
      document.isPublic ||
      (document.sharedWith as string[] | null)?.includes(auth.user!.userId);

    if (!canAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (!document.currentVersion) {
      return NextResponse.json(
        { error: 'No version available for this document' },
        { status: 400 }
      );
    }

    // Combine HTML and CSS
    const combinedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${document.title}</title>
        <style>
          ${document.currentVersion.cssContent}
        </style>
      </head>
      <body>
        ${document.currentVersion.htmlContent}
      </body>
      </html>
    `;

    // Launch Playwright browser
    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    // Set content and wait for any resources to load
    await page.setContent(combinedHtml, {
      waitUntil: 'networkidle',
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm',
      },
    });

    // Close browser
    await browser.close();

    // Update document version with PDF generated status
    await prisma.documentVersion.update({
      where: { id: document.currentVersion.id },
      data: {
        pdfGenerated: true,
        pdfGeneratedAt: new Date(),
      },
    });

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${document.slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);

    // Make sure browser is closed on error
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

// GET /api/documents/[id]/pdf - Download PDF (if already generated)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // This endpoint can be enhanced later to serve stored PDFs
  // For now, redirect to POST to generate on-demand
  return POST(request, { params });
}
