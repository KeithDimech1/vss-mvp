import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const cvDir = '/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/06 gdac-tender/appendices/CV';

// List of PDFs to merge in order
const pdfFiles = [
  'CV-01-Fabian-Kohlmann.pdf',
  'CV-02-Wayne-Noble.pdf',
  'CV-03-Keith-Dimech.pdf',
  'CV-04-Mahdi-AbuAli.pdf',
  'CV-05-Qusay-Abeed.pdf',
  'CV-06-Moritz-Theile.pdf',
  'CV-07-Behnam-Sadeghi.pdf',
  'CV-08-Vinko-Novak.pdf',
  'CV-Annemarie-Grass.pdf',
  'CV-Nilesh-Khadse.pdf'
];

async function mergePDFs() {
  console.log('Creating merged PDF document...\n');

  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();

  // Process each PDF file
  for (const pdfFile of pdfFiles) {
    const pdfPath = join(cvDir, pdfFile);
    console.log(`Adding ${pdfFile}...`);

    try {
      // Load the PDF
      const pdfBytes = await readFile(pdfPath);
      const pdf = await PDFDocument.load(pdfBytes);

      // Copy all pages from this PDF
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });

      console.log(`  ✓ Added ${pdf.getPageCount()} page(s)`);
    } catch (error) {
      console.error(`  ✗ Error adding ${pdfFile}:`, error.message);
    }
  }

  // Save the merged PDF
  const outputPath = join(cvDir, 'All-CVs-Merged.pdf');
  const mergedPdfBytes = await mergedPdf.save();
  await writeFile(outputPath, mergedPdfBytes);

  console.log(`\n✅ Merged PDF created: All-CVs-Merged.pdf`);
  console.log(`   Total pages: ${mergedPdf.getPageCount()}`);
  console.log(`   File size: ${(mergedPdfBytes.length / 1024 / 1024).toFixed(2)} MB`);
}

mergePDFs().catch(console.error);
