/**
 * End-to-End Test for Form Generation System
 *
 * Tests the complete form generation workflow including:
 * - Environment validation
 * - Form name validation
 * - Question parsing
 * - File generation
 * - Registry management
 *
 * Run with: npx tsx .claude/scripts/test-form-generation-e2e.ts
 */

// Load environment variables from .env.local
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const PROJECT_ROOT = path.join(__dirname, '../../');
dotenv.config({ path: path.join(PROJECT_ROOT, '.env.local') });

import { FormGenerator } from '../lib/form-generator';
import { validateEnvironment, validateFormName, validateQuestions } from '../lib/validation';
import { parseMarkdown } from '../lib/question-parser';
import { FormRegistryManager } from '../lib/form-registry';

// Test configuration
const TEST_FORM_NAME = 'test-employee-feedback';

// Test questions (markdown format)
const TEST_QUESTIONS_MD = `
## Employee Information

1. What is your full name?
   - Help: Please enter your first and last name
   - Required: yes
   - Placeholder: John Smith

2. What is your employee ID?
   - Help: Your 6-digit employee identification number
   - Required: yes
   - Placeholder: 123456

## Feedback

3. What did you accomplish this month? [textarea]
   - Help: Describe your key achievements and completed projects
   - Required: yes
   - Placeholder: I completed...
   - Max Length: 1000

4. What challenges did you face? [textarea]
   - Help: Share any obstacles or difficulties you encountered
   - Required: no
   - Placeholder: I had difficulty with...
   - Max Length: 1000

## Ratings

5. How satisfied are you with your work this month? [rating]
   - Help: Rate your satisfaction from 1 (very dissatisfied) to 5 (very satisfied)
   - Required: yes
   - Rating Scale: 5

6. How would you rate your work-life balance? [rating]
   - Help: Rate from 1 (poor) to 5 (excellent)
   - Required: yes
   - Rating Scale: 5

## Goals

7. What are your goals for next month? [textarea]
   - Help: List 2-3 specific goals you want to achieve
   - Required: yes
   - Placeholder: Next month I will...
   - Max Length: 500
`;

async function runTests() {
  console.log('🧪 Form Generation System - E2E Test\n');
  console.log('=' .repeat(60));

  let testsPassed = 0;
  let testsFailed = 0;

  // Test 1: Environment Validation
  console.log('\n📋 Test 1: Environment Validation');
  try {
    const envResult = await validateEnvironment();
    if (!envResult.valid) {
      console.error('❌ FAILED: Environment validation failed');
      if (envResult.errors && envResult.errors.length > 0) {
        envResult.errors.forEach(err => console.error(`  - ${err}`));
      }
      testsFailed++;
    } else {
      console.log('✅ PASSED: All required environment variables set');
      if (envResult.warnings && envResult.warnings.length > 0) {
        console.log('   Warnings:');
        envResult.warnings.forEach(warn => console.log(`   - ${warn}`));
      }
      testsPassed++;
    }
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Test 2: Form Name Validation
  console.log('\n📋 Test 2: Form Name Validation');
  try {
    const nameResult = validateFormName(TEST_FORM_NAME);
    if (!nameResult.valid) {
      console.error('❌ FAILED: Form name validation failed');
      nameResult.errors.forEach(err => console.error(`  - ${err}`));
      testsFailed++;
    } else {
      console.log(`✅ PASSED: Form name "${TEST_FORM_NAME}" is valid`);
      testsPassed++;
    }
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Test 3: Question Parsing
  console.log('\n📋 Test 3: Question Parsing from Markdown');
  try {
    const questions = parseMarkdown(TEST_QUESTIONS_MD, {
      autoGenerateIds: true,
      inferTypes: true,
      defaultRequired: false
    });

    if (questions.length !== 7) {
      console.error(`❌ FAILED: Expected 7 questions, got ${questions.length}`);
      testsFailed++;
    } else {
      console.log(`✅ PASSED: Parsed ${questions.length} questions correctly`);
      console.log(`   - Sections: ${new Set(questions.map(q => q.section)).size}`);
      console.log(`   - Types: ${new Set(questions.map(q => q.type)).size} different types`);
      testsPassed++;
    }
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Test 4: Question Validation
  console.log('\n📋 Test 4: Question Validation');
  try {
    const questions = parseMarkdown(TEST_QUESTIONS_MD, {
      autoGenerateIds: true,
      inferTypes: true,
      defaultRequired: false
    });

    const validationResult = validateQuestions(questions);
    if (!validationResult.valid) {
      console.error('❌ FAILED: Question validation failed');
      validationResult.errors.forEach(err => console.error(`  - ${err}`));
      testsFailed++;
    } else {
      console.log('✅ PASSED: All questions are valid');
      if (validationResult.warnings.length > 0) {
        console.log('   Warnings:');
        validationResult.warnings.forEach(warn => console.log(`   - ${warn}`));
      }
      testsPassed++;
    }
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Test 5: Form Registry (Get Next Number)
  console.log('\n📋 Test 5: Form Registry - Next Form Number');
  try {
    const registryManager = new FormRegistryManager(PROJECT_ROOT);
    const nextNumber = await registryManager.getNextFormNumber();
    console.log(`✅ PASSED: Next form number is ${nextNumber}`);
    testsPassed++;
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Test 6: Form Generation (DRY RUN)
  console.log('\n📋 Test 6: Form Generation (Dry Run Mode)');
  try {
    const generator = new FormGenerator({
      projectRoot: PROJECT_ROOT,
      dryRun: true,  // Don't actually create files
      verbose: true
    });

    const questions = parseMarkdown(TEST_QUESTIONS_MD, {
      autoGenerateIds: true,
      inferTypes: true,
      defaultRequired: false
    });

    const result = await generator.generateForm({
      formName: TEST_FORM_NAME,
      formTitle: 'Employee Monthly Feedback',
      formDescription: 'Monthly feedback form for employee self-assessment',
      accessControl: 'all-users',
      purpose: 'Collect monthly feedback from all employees',
      questions: questions,
      uxPattern: 'step-by-step'
    });

    if (!result.success) {
      console.error('❌ FAILED: Form generation failed');
      console.error(`   Error: ${result.error}`);
      testsFailed++;
    } else {
      console.log('✅ PASSED: Form generation successful (dry run)');
      console.log(`   Form ID: ${result.formId}`);
      console.log(`   Files to be created: ${result.filesCreated.length}`);
      result.filesCreated.forEach(file => {
        console.log(`   - ${file}`);
      });
      testsPassed++;
    }
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Test 7: Template Rendering
  console.log('\n📋 Test 7: Template File Existence');
  try {
    const templateDir = path.join(PROJECT_ROOT, '.claude/templates/form');
    const requiredTemplates = [
      'api-route.hbs',
      'prisma-schema.hbs',
      'page-component.hbs',
      'questions-definition.hbs',
      'test-suite.hbs',
      'documentation.hbs'
    ];

    let allExist = true;
    for (const template of requiredTemplates) {
      const templatePath = path.join(templateDir, template);
      if (!fs.existsSync(templatePath)) {
        console.error(`❌ FAILED: Template not found: ${template}`);
        allExist = false;
      }
    }

    if (allExist) {
      console.log(`✅ PASSED: All ${requiredTemplates.length} templates exist`);
      testsPassed++;
    } else {
      testsFailed++;
    }
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Test 8: Utility Functions
  console.log('\n📋 Test 8: String Transformation Utilities');
  try {
    const { toCamelCase, toPascalCase, toKebabCase, generateVariations } =
      await import('../lib/string-transforms');

    const variations = generateVariations('employee-feedback');

    const expectedKeys = [
      'original', 'camelCase', 'pascalCase', 'kebabCase',
      'snakeCase', 'screamingSnakeCase', 'titleCase',
      'plural', 'singular'
    ];

    const hasAllKeys = expectedKeys.every(key => key in variations);

    if (!hasAllKeys) {
      console.error('❌ FAILED: Missing expected variations');
      testsFailed++;
    } else {
      console.log('✅ PASSED: String transformations working correctly');
      console.log(`   Example: "${variations.original}" → "${variations.pascalCase}" (PascalCase)`);
      testsPassed++;
    }
  } catch (error) {
    console.error('❌ FAILED:', error);
    testsFailed++;
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Summary\n');
  console.log(`Total Tests: ${testsPassed + testsFailed}`);
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);

  const successRate = Math.round((testsPassed / (testsPassed + testsFailed)) * 100);
  console.log(`Success Rate: ${successRate}%\n`);

  if (testsFailed === 0) {
    console.log('🎉 All tests passed! Form generation system is ready for use.\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Please review the errors above.\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('\n💥 Test suite crashed:', error);
  process.exit(1);
});
