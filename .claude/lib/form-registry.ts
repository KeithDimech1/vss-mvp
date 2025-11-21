/**
 * Form Registry Type Definitions and Management
 *
 * The form registry (FORM-REGISTRY.json) tracks all generated forms in the platform.
 * It provides metadata for form discovery, version tracking, and lifecycle management.
 */

import * as fs from 'fs/promises'
import * as path from 'path'
import { existsSync } from 'fs'

/**
 * Form status values
 */
export type FormStatus = 'active' | 'deprecated' | 'archived' | 'draft'

/**
 * UX pattern types
 */
export type UXPattern = 'step-by-step' | 'single-page' | 'multi-section' | 'dashboard'

/**
 * Form metadata in registry
 */
export interface FormRegistryEntry {
  id: string                  // FORM-001, FORM-002, etc.
  name: string                // kebab-case form name
  title: string               // Display title
  version: string             // Semantic version (1.0.0)
  status: FormStatus          // Current status
  createdAt: string           // ISO timestamp
  updatedAt: string           // ISO timestamp
  requiresManager: boolean    // Manager-only access
  questionCount: number       // Number of questions
  uxPattern: UXPattern        // UX pattern used
  routes: {
    page: string              // Page route (e.g., /(dashboard)/employee-review)
    api: string               // API route (e.g., /api/employee-review)
  }
  files: {
    schema: string            // Prisma schema file
    page: string              // Page component file
    questions: string         // Questions definition file
    api: string               // API route file
    tests: string             // Test suite file
    documentation: string     // Documentation file
  }
  migrations?: string[]       // List of migration names applied
  changeLog?: FormChangeLogEntry[]  // Version history
}

/**
 * Change log entry for version history
 */
export interface FormChangeLogEntry {
  version: string             // Semantic version
  date: string                // ISO timestamp
  type: 'created' | 'updated' | 'migrated' | 'deprecated' | 'archived'
  description: string         // Change description
  breaking: boolean           // Breaking change flag
  questionsAdded?: number     // Number of questions added
  questionsRemoved?: number   // Number of questions removed
  questionsModified?: number  // Number of questions modified
}

/**
 * Complete form registry structure
 */
export interface FormRegistry {
  version: string             // Registry schema version (1.0.0)
  lastUpdated: string         // ISO timestamp
  forms: FormRegistryEntry[]  // Array of form entries
}

/**
 * Form Registry Manager
 *
 * Provides CRUD operations for the form registry
 */
export class FormRegistryManager {
  private projectRoot: string
  private registryPath: string

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot
    this.registryPath = path.join(projectRoot, 'build-data', 'FORM-REGISTRY.json')
  }

  /**
   * Initialize new registry file
   */
  async initializeRegistry(): Promise<void> {
    const registry: FormRegistry = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      forms: []
    }

    const dir = path.dirname(this.registryPath)
    if (!existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true })
    }

    await fs.writeFile(this.registryPath, JSON.stringify(registry, null, 2))
  }

  /**
   * Load registry from file
   */
  async loadRegistry(): Promise<FormRegistry> {
    if (!existsSync(this.registryPath)) {
      await this.initializeRegistry()
    }

    const content = await fs.readFile(this.registryPath, 'utf8')
    return JSON.parse(content)
  }

  /**
   * Save registry to file
   */
  async saveRegistry(registry: FormRegistry): Promise<void> {
    registry.lastUpdated = new Date().toISOString()
    await fs.writeFile(this.registryPath, JSON.stringify(registry, null, 2))
  }

  /**
   * List all forms in registry
   */
  async listForms(filter?: {
    status?: FormStatus
    requiresManager?: boolean
    uxPattern?: UXPattern
  }): Promise<FormRegistryEntry[]> {
    const registry = await this.loadRegistry()
    let forms = registry.forms

    if (filter) {
      if (filter.status) {
        forms = forms.filter(f => f.status === filter.status)
      }
      if (filter.requiresManager !== undefined) {
        forms = forms.filter(f => f.requiresManager === filter.requiresManager)
      }
      if (filter.uxPattern) {
        forms = forms.filter(f => f.uxPattern === filter.uxPattern)
      }
    }

    return forms
  }

  /**
   * Get form by name
   */
  async getForm(formName: string): Promise<FormRegistryEntry | null> {
    const registry = await this.loadRegistry()
    return registry.forms.find(f => f.name === formName) || null
  }

  /**
   * Get form by ID
   */
  async getFormById(formId: string): Promise<FormRegistryEntry | null> {
    const registry = await this.loadRegistry()
    return registry.forms.find(f => f.id === formId) || null
  }

  /**
   * Add new form to registry
   */
  async addForm(entry: FormRegistryEntry): Promise<void> {
    const registry = await this.loadRegistry()

    // Check for duplicate name
    const existing = registry.forms.find(f => f.name === entry.name)
    if (existing) {
      throw new Error(`Form with name "${entry.name}" already exists in registry`)
    }

    // Check for duplicate ID
    const existingId = registry.forms.find(f => f.id === entry.id)
    if (existingId) {
      throw new Error(`Form with ID "${entry.id}" already exists in registry`)
    }

    registry.forms.push(entry)
    await this.saveRegistry(registry)
  }

  /**
   * Update form in registry
   */
  async updateForm(formName: string, updates: Partial<FormRegistryEntry>): Promise<void> {
    const registry = await this.loadRegistry()
    const index = registry.forms.findIndex(f => f.name === formName)

    if (index === -1) {
      throw new Error(`Form "${formName}" not found in registry`)
    }

    // Merge updates
    registry.forms[index] = {
      ...registry.forms[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    await this.saveRegistry(registry)
  }

  /**
   * Add change log entry to form
   */
  async addChangeLog(
    formName: string,
    change: FormChangeLogEntry
  ): Promise<void> {
    const registry = await this.loadRegistry()
    const form = registry.forms.find(f => f.name === formName)

    if (!form) {
      throw new Error(`Form "${formName}" not found in registry`)
    }

    if (!form.changeLog) {
      form.changeLog = []
    }

    form.changeLog.push(change)
    form.version = change.version
    form.updatedAt = new Date().toISOString()

    await this.saveRegistry(registry)
  }

  /**
   * Deprecate a form
   */
  async deprecateForm(formName: string, reason?: string): Promise<void> {
    const registry = await this.loadRegistry()
    const form = registry.forms.find(f => f.name === formName)

    if (!form) {
      throw new Error(`Form "${formName}" not found in registry`)
    }

    form.status = 'deprecated'
    form.updatedAt = new Date().toISOString()

    if (!form.changeLog) {
      form.changeLog = []
    }

    form.changeLog.push({
      version: form.version,
      date: new Date().toISOString(),
      type: 'deprecated',
      description: reason || 'Form deprecated',
      breaking: false
    })

    await this.saveRegistry(registry)
  }

  /**
   * Archive a form
   */
  async archiveForm(formName: string, reason?: string): Promise<void> {
    const registry = await this.loadRegistry()
    const form = registry.forms.find(f => f.name === formName)

    if (!form) {
      throw new Error(`Form "${formName}" not found in registry`)
    }

    form.status = 'archived'
    form.updatedAt = new Date().toISOString()

    if (!form.changeLog) {
      form.changeLog = []
    }

    form.changeLog.push({
      version: form.version,
      date: new Date().toISOString(),
      type: 'archived',
      description: reason || 'Form archived',
      breaking: false
    })

    await this.saveRegistry(registry)
  }

  /**
   * Get next available form number
   */
  async getNextFormNumber(): Promise<number> {
    const registry = await this.loadRegistry()

    if (registry.forms.length === 0) {
      return 1
    }

    // Extract numbers from form IDs (FORM-001 → 1)
    const numbers = registry.forms
      .map(f => parseInt(f.id.replace('FORM-', ''), 10))
      .filter(n => !isNaN(n))

    return Math.max(...numbers) + 1
  }

  /**
   * Get form statistics
   */
  async getStatistics(): Promise<{
    total: number
    active: number
    deprecated: number
    archived: number
    draft: number
    byUXPattern: Record<UXPattern, number>
    averageQuestions: number
  }> {
    const registry = await this.loadRegistry()
    const forms = registry.forms

    const stats = {
      total: forms.length,
      active: forms.filter(f => f.status === 'active').length,
      deprecated: forms.filter(f => f.status === 'deprecated').length,
      archived: forms.filter(f => f.status === 'archived').length,
      draft: forms.filter(f => f.status === 'draft').length,
      byUXPattern: {
        'step-by-step': 0,
        'single-page': 0,
        'multi-section': 0,
        'dashboard': 0
      } as Record<UXPattern, number>,
      averageQuestions: 0
    }

    // Count by UX pattern
    forms.forEach(f => {
      if (f.uxPattern in stats.byUXPattern) {
        stats.byUXPattern[f.uxPattern]++
      }
    })

    // Calculate average questions
    if (forms.length > 0) {
      const totalQuestions = forms.reduce((sum, f) => sum + f.questionCount, 0)
      stats.averageQuestions = Math.round(totalQuestions / forms.length * 10) / 10
    }

    return stats
  }
}
