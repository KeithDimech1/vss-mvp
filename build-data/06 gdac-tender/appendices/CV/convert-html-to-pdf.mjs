import { chromium } from 'playwright';
import { readdir } from 'fs/promises';
import { join, basename } from 'path';

const cvDir = '/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/06 gdac-tender/appendices/CV';

async function convertHtmlToPdf() {
  console.log('Starting Playwright browser...\n');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Get all HTML files that start with CV-
  const files = await readdir(cvDir);
  const htmlFiles = files.filter(f => f.startsWith('CV-') && f.endsWith('.html'));

  console.log(`Found ${htmlFiles.length} HTML files to convert:\n`);

  for (const htmlFile of htmlFiles) {
    const htmlPath = join(cvDir, htmlFile);
    const pdfFile = htmlFile.replace('.html', '.pdf');
    const pdfPath = join(cvDir, pdfFile);

    console.log(`Converting ${htmlFile} → ${pdfFile}...`);

    // Navigate to the HTML file
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

    // Convert to PDF with settings optimized for CVs
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    console.log(`✓ Created ${pdfFile}`);
  }

  await browser.close();
  console.log('\n✅ All PDFs regenerated successfully!');
}

convertHtmlToPdf().catch(console.error);
