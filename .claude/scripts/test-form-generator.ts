/**
 * Test Script for Form Generator
 *
 * Tests the form generation system end-to-end with a sample employee review form.
 *
 * Usage:
 *   npx ts-node .claude/scripts/test-form-generator.ts [--dry-run]
 */

import { FormGenerator } from '../lib/form-generator'
import type { FormGenerationConfig } from '../lib/form-generator'

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  console.log('🧪 Testing Form Generator\n')
  console.log(`Mode: ${dryRun ? 'DRY-RUN' : 'PRODUCTION'}`)
  console.log('─'.repeat(60))

  // Create form generator instance
  const generator = new FormGenerator({
    dryRun: dryRun,
    verbose: true,
    projectRoot: process.cwd(),
    skipMigration: dryRun, // Skip migration in dry-run mode
    skipGenerate: dryRun   // Skip Prisma generate in dry-run mode
  })

  // Form configuration
  const config: FormGenerationConfig = {
    formName: 'employee-review',
    accessControl: 'managers-only',
    purpose: 'Quarterly performance review for employees to set goals and track achievements.',
    questions: '/tmp/sample-employee-review.md',
    uxPattern: 'step-by-step'
  }

  console.log('\n📋 Form Configuration:')
  console.log(`  Name: ${config.formName}`)
  console.log(`  Access: ${config.accessControl}`)
  console.log(`  Purpose: ${config.purpose}`)
  console.log(`  Questions: ${config.questions}`)
  console.log(`  UX Pattern: ${config.uxPattern}`)
  console.log('─'.repeat(60))

  // Generate form
  console.log('\n🚀 Starting form generation...\n')

  const result = await generator.generateForm(config)

  console.log('\n' + '─'.repeat(60))

  if (result.success) {
    console.log('\n✅ Form Generated Successfully!\n')
    console.log(`Form ID: ${result.formId}`)
    console.log(`Form Number: ${result.formNumber}`)

    if (result.filesCreated && result.filesCreated.length > 0) {
      console.log(`\nFiles Created (${result.filesCreated.length}):`)
      result.filesCreated.forEach(file => console.log(`  ✅ ${file}`))
    }

    if (result.migrationName) {
      console.log(`\nMigration: ${result.migrationName}`)
    }

    if (result.warnings && result.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${result.warnings.length}):`)
      result.warnings.forEach(warning => console.log(`  - ${warning}`))
    }

    if (!dryRun) {
      console.log('\n📝 Next Steps:')
      console.log('  1. Start dev server: npm run dev')
      console.log('  2. Visit form: http://localhost:3000/employee-review')
      console.log('  3. Run tests: npm run test:e2e -- employee-review.spec.ts')
      console.log('  4. View docs: build-data/01 employee-review/documentation/employee-review-overview.md')
    }

  } else {
    console.log('\n❌ Form Generation Failed\n')
    console.log(`Error: ${result.error}`)

    if (result.warnings && result.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${result.warnings.length}):`)
      result.warnings.forEach(warning => console.log(`  - ${warning}`))
    }

    process.exit(1)
  }

  console.log('\n' + '─'.repeat(60))
  console.log('\n✨ Test complete!\n')
}

main().catch(error => {
  console.error('\n❌ Test failed:', error)
  process.exit(1)
})
