import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

const cvDir = '/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/06 gdac-tender/appendices/CV';

async function optimizeCV(htmlContent) {
  let optimized = htmlContent;

  // Remove References section
  optimized = optimized.replace(
    /<p><strong>References<\/strong><\/p>\s*<p>Available upon request<\/p>/gi,
    ''
  );

  // Optimize CSS for less white space
  const cssOptimizations = {
    // Reduce header padding
    'padding: 25px 30px;': 'padding: 15px 20px;',
    'min-height: 100px;': 'min-height: 80px;',

    // Reduce content padding
    'padding: 40px 30px 30px 30px;': 'padding: 20px 20px 15px 20px;',
    'padding-bottom: 30px;': 'padding-bottom: 15px;',

    // Reduce section margins
    'margin-bottom: 25px;': 'margin-bottom: 12px;',
    'margin-bottom: 20px;': 'margin-bottom: 10px;',
    'margin-bottom: 18px;': 'margin-bottom: 10px;',
    'margin-bottom: 15px;': 'margin-bottom: 8px;',
    'margin-bottom: 12px;': 'margin-bottom: 6px;',
    'margin-bottom: 10px;': 'margin-bottom: 5px;',
    'margin-bottom: 8px;': 'margin-bottom: 4px;',

    // Reduce line height slightly
    'line-height: 1.4;': 'line-height: 1.3;',
    'line-height: 1.45;': 'line-height: 1.3;',
    'line-height: 1.5;': 'line-height: 1.35;',

    // Reduce font sizes slightly
    'font-size: 28pt;': 'font-size: 24pt;',
    'font-size: 14pt;': 'font-size: 12pt;',
    'font-size: 10.5pt;': 'font-size: 9.5pt;',

    // Reduce highlight box padding
    'padding: 12px 15px;': 'padding: 8px 10px;',

    // Reduce list spacing
    'margin-bottom: 6px;': 'margin-bottom: 3px;',
    'margin-left: 20px;': 'margin-left: 18px;',
  };

  // Apply all CSS optimizations
  for (const [original, replacement] of Object.entries(cssOptimizations)) {
    optimized = optimized.split(original).join(replacement);
  }

  return optimized;
}

async function processAllCVs() {
  console.log('Optimizing CV HTML files...\n');

  const files = await readdir(cvDir);
  const htmlFiles = files.filter(f => f.startsWith('CV-') && f.endsWith('.html'));

  for (const htmlFile of htmlFiles) {
    const htmlPath = join(cvDir, htmlFile);
    console.log(`Processing ${htmlFile}...`);

    try {
      const htmlContent = await readFile(htmlPath, 'utf-8');
      const optimized = await optimizeCV(htmlContent);

      // Check if references were removed
      const hadReferences = htmlContent.includes('References');
      const referencesRemoved = hadReferences && !optimized.includes('References');

      await writeFile(htmlPath, optimized, 'utf-8');

      console.log(`  ✓ Optimized spacing`);
      if (referencesRemoved) {
        console.log(`  ✓ Removed References section`);
      }
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
    }
  }

  console.log(`\n✅ Optimized ${htmlFiles.length} CV files`);
  console.log('\nNext steps:');
  console.log('1. Run: node convert-html-to-pdf.mjs');
  console.log('2. Run: node merge-pdfs.mjs');
}

processAllCVs().catch(console.error);
