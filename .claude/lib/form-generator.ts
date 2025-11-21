/**
 * Form Generation Orchestrator
 *
 * Coordinates all components (templates, parsers, validators, file operations)
 * to generate complete form infrastructure atomically with rollback capability.
 *
 * @example
 * ```ts
 * import { FormGenerator } from './form-generator'
 *
 * const generator = new FormGenerator({
 *   dryRun: false,
 *   verbose: true
 * })
 *
 * const result = await generator.generateForm({
 *   formName: 'employee-review',
 *   accessControl: 'managers-only',
 *   purpose: 'Quarterly performance review',
 *   questionsFile: '/path/to/questions.md',
 *   uxPattern: 'step-by-step'
 * })
 *
 * if (result.success) {
 *   console.log('Form generated successfully!')
 *   console.log('Files created:', result.filesCreated)
 * } else {
 *   console.error('Generation failed:', result.error)
 * }
 * ```
 */

import * as fs from 'fs/promises'
import { existsSync } from 'fs'
import * as path from 'path'
import Handlebars from 'handlebars'
import { Checkpoint } from './file-operations'
import { generateVariations } from './string-transforms'
import { parseQuestions } from './question-parser'
import {
  validateEnvironment,
  validateFormName,
  validateQuestions,
  validateMigrationSafety,
  type ValidationResult
} from './validation'

/**
 * Form generation configuration
 */
export interface FormGenerationConfig {
  /** Form name (kebab-case, e.g., 'employee-review') */
  formName: string

  /** Access control: 'all-users' or 'managers-only' */
  accessControl: 'all-users' | 'managers-only'

  /** Form purpose (1-2 sentences) */
  purpose: string

  /** Questions source: file path or questions array */
  questions: string | Question[]

  /** UX pattern: 'step-by-step', 'single-page', or 'multi-section' */
  uxPattern: 'step-by-step' | 'single-page' | 'multi-section'

  /** Optional: Has unique constraint (default: false for simple forms) */
  hasUniqueConstraint?: boolean

  /** Optional: Unique fields array (e.g., ['formId', 'userId']) */
  uniqueFields?: string[]

  /** Optional: Has form ID field (for multi-instance forms) */
  hasFormId?: boolean

  /** Optional: Language support (default: false) */
  hasLanguageSupport?: boolean
}

/**
 * Question interface (matches ActionQuestion from types.ts)
 */
export interface Question {
  id: string
  question: string
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'dropdown' | 'date' | 'number' | 'currency' | 'info' | 'implementation_table' | 'data_inventory_matrix' | 'ranking' | 'rating' | 'selectable_tags'
  required?: boolean
  placeholder?: string
  helpText?: string
  options?: string[]
  section?: string
  maxLength?: number
  min?: number
  max?: number
  ratingScale?: number
  rankingLimit?: number
  conditionalOn?: { questionId: string; value: any }
  inheritSelectionsFrom?: string
  rows?: number
  maxSelections?: number
}

/**
 * Form generation result
 */
export interface FormGenerationResult {
  success: boolean
  formId?: string
  formNumber?: number
  filesCreated?: string[]
  migrationName?: string
  error?: string
  warnings?: string[]
}

/**
 * Form Generator Options
 */
export interface FormGeneratorOptions {
  /** Dry-run mode (don't actually create files) */
  dryRun?: boolean

  /** Verbose logging */
  verbose?: boolean

  /** Project root directory (default: process.cwd()) */
  projectRoot?: string

  /** Skip migration (for testing) */
  skipMigration?: boolean

  /** Skip Prisma generate (for testing) */
  skipGenerate?: boolean
}

/**
 * Form Generator Class
 */
export class FormGenerator {
  private options: FormGeneratorOptions
  private projectRoot: string
  private templatesDir: string

  constructor(options: FormGeneratorOptions = {}) {
    this.options = {
      dryRun: false,
      verbose: false,
      skipMigration: false,
      skipGenerate: false,
      ...options
    }

    this.projectRoot = options.projectRoot || process.cwd()
    this.templatesDir = path.join(this.projectRoot, '.claude', 'templates', 'form')

    if (this.options.verbose) {
      console.log('[FormGenerator] Initialized')
      console.log('[FormGenerator] Project root:', this.projectRoot)
      console.log('[FormGenerator] Templates dir:', this.templatesDir)
    }
  }

  /**
   * Generate form infrastructure
   */
  async generateForm(config: FormGenerationConfig): Promise<FormGenerationResult> {
    const checkpoint = new Checkpoint({ dryRun: this.options.dryRun })
    const warnings: string[] = []

    try {
      // Step 1: Validate environment
      if (this.options.verbose) console.log('\n[Step 1/8] Validating environment...')
      const envValidation = await this.validateEnvironmentStep()
      if (!envValidation.valid) {
        return {
          success: false,
          error: `Environment validation failed:\n${envValidation.errors?.join('\n') || 'Unknown error'}`
        }
      }
      if (envValidation.warnings && envValidation.warnings.length > 0) {
        warnings.push(...envValidation.warnings)
      }

      // Step 2: Validate form name
      if (this.options.verbose) console.log('[Step 2/8] Validating form name...')
      const nameValidation = validateFormName(config.formName)
      if (!nameValidation.valid) {
        return {
          success: false,
          error: `Form name validation failed:\n${nameValidation.errors.join('\n')}`
        }
      }

      // Step 3: Parse questions
      if (this.options.verbose) console.log('[Step 3/8] Parsing questions...')
      const questions = await this.parseQuestionsStep(config.questions)
      if (this.options.verbose) console.log(`[FormGenerator] Parsed ${questions.length} questions`)

      // Step 4: Validate questions
      if (this.options.verbose) console.log('[Step 4/8] Validating questions...')
      const questionsValidation = validateQuestions(questions)
      if (!questionsValidation.valid) {
        return {
          success: false,
          error: `Questions validation failed:\n${questionsValidation.errors.join('\n')}`
        }
      }

      // Step 5: Detect next form number
      if (this.options.verbose) console.log('[Step 5/8] Detecting next form number...')
      const formNumber = await this.detectNextFormNumber()
      if (this.options.verbose) console.log(`[FormGenerator] Next form number: ${formNumber}`)

      // Step 6: Generate all files
      if (this.options.verbose) console.log('[Step 6/8] Generating files...')
      const filesCreated = await this.generateFilesStep(checkpoint, config, questions, formNumber)
      if (this.options.verbose) console.log(`[FormGenerator] Created ${filesCreated.length} files`)

      // Commit all file operations
      if (!this.options.dryRun) {
        await checkpoint.commit()
        if (this.options.verbose) console.log('[FormGenerator] Checkpoint committed')
      } else {
        if (this.options.verbose) console.log('[FormGenerator] Dry-run mode - no files written')
      }

      // Step 7: Run database migration
      if (this.options.verbose) console.log('[Step 7/8] Running database migration...')
      let migrationName: string | undefined
      if (!this.options.skipMigration && !this.options.dryRun) {
        migrationName = await this.runMigrationStep(config.formName)
        if (this.options.verbose) console.log(`[FormGenerator] Migration: ${migrationName}`)
      } else {
        if (this.options.verbose) console.log('[FormGenerator] Skipping migration')
      }

      // Step 8: Generate Prisma client
      if (this.options.verbose) console.log('[Step 8/8] Generating Prisma client...')
      if (!this.options.skipGenerate && !this.options.dryRun) {
        await this.generatePrismaClientStep()
        if (this.options.verbose) console.log('[FormGenerator] Prisma client generated')
      } else {
        if (this.options.verbose) console.log('[FormGenerator] Skipping Prisma generate')
      }

      // Update form registry
      if (this.options.verbose) console.log('[FormGenerator] Updating form registry...')
      if (!this.options.dryRun) {
        await this.updateFormRegistry(config, formNumber, filesCreated)
        if (this.options.verbose) console.log('[FormGenerator] Registry updated')
      }

      return {
        success: true,
        formId: `FORM-${String(formNumber).padStart(3, '0')}`,
        formNumber,
        filesCreated,
        migrationName,
        warnings: warnings.length > 0 ? warnings : undefined
      }

    } catch (error) {
      console.error('[FormGenerator] Generation failed:', error)

      // Rollback all changes
      if (!this.options.dryRun) {
        await checkpoint.rollback()
        console.log('[FormGenerator] Rollback complete - no changes made')
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  /**
   * Step 1: Validate environment
   */
  private async validateEnvironmentStep(): Promise<ValidationResult> {
    return await validateEnvironment()
  }

  /**
   * Step 3: Parse questions
   */
  private async parseQuestionsStep(questionsInput: string | Question[]): Promise<Question[]> {
    if (Array.isArray(questionsInput)) {
      return questionsInput
    }

    // Parse from file
    const filePath = questionsInput
    if (!existsSync(filePath)) {
      throw new Error(`Questions file not found: ${filePath}`)
    }

    return parseQuestions(filePath, {
      autoGenerateIds: true,
      inferTypes: true,
      defaultRequired: false,
      defaultSection: 'General'
    })
  }

  /**
   * Step 5: Detect next available form number
   */
  private async detectNextFormNumber(): Promise<number> {
    const buildDataPath = path.join(this.projectRoot, 'build-data')

    if (!existsSync(buildDataPath)) {
      return 1
    }

    const dirs = await fs.readdir(buildDataPath)
    const numberedDirs = dirs.filter(d => /^\d{2} /.test(d))
    const numbers = numberedDirs.map(d => {
      const match = d.match(/^(\d{2})/)
      return match ? parseInt(match[1]) : 0
    })

    return numbers.length === 0 ? 1 : Math.max(...numbers) + 1
  }

  /**
   * Step 6: Generate all files using templates
   */
  private async generateFilesStep(
    checkpoint: Checkpoint,
    config: FormGenerationConfig,
    questions: Question[],
    formNumber: number
  ): Promise<string[]> {
    const filesCreated: string[] = []

    // Generate string variations
    const variants = generateVariations(config.formName)

    // Template data
    const templateData = {
      formName: variants.camelCase,
      formSlug: variants.kebabCase,
      formTitle: variants.titleCase,
      formDescription: config.purpose,
      modelName: variants.pascalCase,
      requiresManager: config.accessControl === 'managers-only',
      hasUniqueConstraint: config.hasUniqueConstraint || false,
      uniqueFields: config.uniqueFields || [],
      hasFormId: config.hasFormId || false,
      hasLanguageSupport: config.hasLanguageSupport || false,
      questions: questions,
      formNumber: String(formNumber).padStart(2, '0'),
      formUrl: `/(dashboard)/${variants.kebabCase}`,
      questionsImport: `@/lib/forms/${variants.kebabCase}-questions`,
      createdAt: new Date().toISOString()
    }

    // 1. Prisma schema
    const schemaContent = await this.renderTemplate('prisma-schema.hbs', templateData)
    await checkpoint.appendToFile(
      path.join(this.projectRoot, 'prisma', 'schema.prisma'),
      '\n' + schemaContent
    )
    filesCreated.push('prisma/schema.prisma')

    // 2. Page component
    const pageContent = await this.renderTemplate('page-component.hbs', templateData)
    const pageDir = path.join(this.projectRoot, 'src', 'app', '(dashboard)', variants.kebabCase)
    await checkpoint.createDirectory(pageDir)
    await checkpoint.writeFile(path.join(pageDir, 'page.tsx'), pageContent)
    filesCreated.push(`src/app/(dashboard)/${variants.kebabCase}/page.tsx`)

    // 3. Questions definition
    const questionsContent = await this.renderTemplate('questions-definition.hbs', templateData)
    const formsDir = path.join(this.projectRoot, 'src', 'lib', 'forms')
    if (!existsSync(formsDir)) {
      await checkpoint.createDirectory(formsDir)
    }
    await checkpoint.writeFile(
      path.join(formsDir, `${variants.kebabCase}-questions.ts`),
      questionsContent
    )
    filesCreated.push(`src/lib/forms/${variants.kebabCase}-questions.ts`)

    // 4. API route
    const apiContent = await this.renderTemplate('api-route.hbs', templateData)
    const apiDir = path.join(this.projectRoot, 'src', 'app', 'api', variants.kebabCase)
    await checkpoint.createDirectory(apiDir)
    await checkpoint.writeFile(path.join(apiDir, 'route.ts'), apiContent)
    filesCreated.push(`src/app/api/${variants.kebabCase}/route.ts`)

    // 5. Test suite
    const testContent = await this.renderTemplate('test-suite.hbs', templateData)
    const testsDir = path.join(this.projectRoot, 'tests', 'e2e')
    if (!existsSync(testsDir)) {
      await checkpoint.createDirectory(testsDir)
    }
    await checkpoint.writeFile(
      path.join(testsDir, `${variants.kebabCase}.spec.ts`),
      testContent
    )
    filesCreated.push(`tests/e2e/${variants.kebabCase}.spec.ts`)

    // 6. Documentation
    const docsContent = await this.renderTemplate('documentation.hbs', templateData)
    const docsDir = path.join(
      this.projectRoot,
      'build-data',
      `${templateData.formNumber} ${variants.kebabCase}`,
      'documentation'
    )
    await checkpoint.createDirectory(docsDir)
    await checkpoint.writeFile(
      path.join(docsDir, `${variants.kebabCase}-overview.md`),
      docsContent
    )
    filesCreated.push(`build-data/${templateData.formNumber} ${variants.kebabCase}/documentation/${variants.kebabCase}-overview.md`)

    return filesCreated
  }

  /**
   * Render Handlebars template
   */
  private async renderTemplate(templateName: string, data: any): Promise<string> {
    const templatePath = path.join(this.templatesDir, templateName)

    if (!existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`)
    }

    const templateContent = await fs.readFile(templatePath, 'utf8')
    const template = Handlebars.compile(templateContent)
    return template(data)
  }

  /**
   * Step 7: Run database migration
   */
  private async runMigrationStep(formSlug: string): Promise<string> {
    const { execSync } = require('child_process')

    // Validate migration safety
    const migrationValidation = validateMigrationSafety()
    if (!migrationValidation.valid) {
      throw new Error(`Migration safety check failed:\n${migrationValidation.errors.join('\n')}`)
    }

    const migrationName = `add-${formSlug}-model`

    try {
      execSync(`npx prisma migrate dev --name "${migrationName}"`, {
        cwd: this.projectRoot,
        stdio: this.options.verbose ? 'inherit' : 'pipe'
      })
      return migrationName
    } catch (error) {
      throw new Error(`Migration failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Step 8: Generate Prisma client
   */
  private async generatePrismaClientStep(): Promise<void> {
    const { execSync } = require('child_process')

    try {
      execSync('npx prisma generate', {
        cwd: this.projectRoot,
        stdio: this.options.verbose ? 'inherit' : 'pipe'
      })
    } catch (error) {
      throw new Error(`Prisma generate failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Update form registry
   */
  private async updateFormRegistry(
    config: FormGenerationConfig,
    formNumber: number,
    filesCreated: string[]
  ): Promise<void> {
    const registryPath = path.join(this.projectRoot, 'build-data', 'FORM-REGISTRY.json')
    const variants = generateVariations(config.formName)

    let registry: any = { forms: [] }

    if (existsSync(registryPath)) {
      const content = await fs.readFile(registryPath, 'utf8')
      registry = JSON.parse(content)
    }

    const questions = Array.isArray(config.questions) ? config.questions : await this.parseQuestionsStep(config.questions)

    registry.forms.push({
      id: `FORM-${String(formNumber).padStart(3, '0')}`,
      name: variants.kebabCase,
      title: variants.titleCase,
      version: '1.0.0',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      requiresManager: config.accessControl === 'managers-only',
      questionCount: questions.length,
      uxPattern: config.uxPattern,
      routes: {
        page: `/(dashboard)/${variants.kebabCase}`,
        api: `/api/${variants.kebabCase}`
      },
      files: {
        schema: 'prisma/schema.prisma',
        page: `src/app/(dashboard)/${variants.kebabCase}/page.tsx`,
        questions: `src/lib/forms/${variants.kebabCase}-questions.ts`,
        api: `src/app/api/${variants.kebabCase}/route.ts`,
        tests: `tests/e2e/${variants.kebabCase}.spec.ts`,
        documentation: `build-data/${String(formNumber).padStart(2, '0')} ${variants.kebabCase}/documentation/${variants.kebabCase}-overview.md`
      }
    })

    await fs.writeFile(registryPath, JSON.stringify(registry, null, 2))
  }

  /**
   * List all forms in registry
   */
  async listForms(): Promise<any[]> {
    const registryPath = path.join(this.projectRoot, 'build-data', 'FORM-REGISTRY.json')

    if (!existsSync(registryPath)) {
      return []
    }

    const content = await fs.readFile(registryPath, 'utf8')
    const registry = JSON.parse(content)
    return registry.forms || []
  }

  /**
   * Get form by name
   */
  async getForm(formName: string): Promise<any | null> {
    const forms = await this.listForms()
    return forms.find(f => f.name === formName) || null
  }
}

/**
 * Helper: Create FormGenerator instance
 */
export function createFormGenerator(options?: FormGeneratorOptions): FormGenerator {
  return new FormGenerator(options)
}
