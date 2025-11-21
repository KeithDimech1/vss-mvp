/**
 * Safe File Operations Utilities
 *
 * Provides atomic file operations with backup and rollback capability:
 * - Create files/directories with conflict detection
 * - Backup existing files before overwriting
 * - Checkpoint system for multi-file operations
 * - Rollback on failure (restore from backups)
 * - Dry-run mode for testing without actual changes
 *
 * @example
 * ```ts
 * const checkpoint = createCheckpoint()
 *
 * try {
 *   await checkpoint.writeFile('src/app/new-page.tsx', content)
 *   await checkpoint.appendToFile('prisma/schema.prisma', schemaAddition)
 *   await checkpoint.commit() // Finalize changes
 * } catch (error) {
 *   await checkpoint.rollback() // Restore all backups
 *   throw error
 * }
 * ```
 */

import * as fs from 'fs/promises'
import * as path from 'path'
import { existsSync } from 'fs'

/**
 * Checkpoint operation record
 */
interface Operation {
  type: 'create' | 'modify' | 'delete' | 'mkdir'
  path: string
  backupPath?: string
  originalContent?: string
}

/**
 * Checkpoint for atomic multi-file operations
 */
export class Checkpoint {
  private operations: Operation[] = []
  private dryRun: boolean
  private backupDir: string

  constructor(options: { dryRun?: boolean; backupDir?: string } = {}) {
    this.dryRun = options.dryRun ?? false
    this.backupDir = options.backupDir ?? '.checkpoint-backups'
  }

  /**
   * Ensure backup directory exists
   */
  private async ensureBackupDir(): Promise<void> {
    if (this.dryRun) return

    try {
      await fs.mkdir(this.backupDir, { recursive: true })
    } catch (error) {
      throw new Error(`Failed to create backup directory: ${error}`)
    }
  }

  /**
   * Create a backup of a file
   */
  private async createBackup(filePath: string): Promise<string> {
    if (this.dryRun) return ''

    await this.ensureBackupDir()

    const timestamp = Date.now()
    const basename = path.basename(filePath)
    const backupPath = path.join(this.backupDir, `${basename}.${timestamp}.backup`)

    try {
      const content = await fs.readFile(filePath, 'utf-8')
      await fs.writeFile(backupPath, content, 'utf-8')
      return backupPath
    } catch (error) {
      throw new Error(`Failed to backup file ${filePath}: ${error}`)
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath: string): Promise<boolean> {
    return existsSync(filePath)
  }

  /**
   * Read file content
   */
  async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`)
    }
  }

  /**
   * Write content to a new file (fails if file exists)
   */
  async writeFile(filePath: string, content: string, options: { overwrite?: boolean } = {}): Promise<void> {
    const exists = await this.fileExists(filePath)

    if (exists && !options.overwrite) {
      throw new Error(`File already exists: ${filePath}. Use overwrite: true to replace.`)
    }

    if (this.dryRun) {
      console.log(`[DRY RUN] Would ${exists ? 'overwrite' : 'create'} file: ${filePath}`)
      return
    }

    // Ensure directory exists
    const dir = path.dirname(filePath)
    await fs.mkdir(dir, { recursive: true })

    // Backup if overwriting
    let backupPath: string | undefined
    if (exists) {
      backupPath = await this.createBackup(filePath)
      this.operations.push({
        type: 'modify',
        path: filePath,
        backupPath,
      })
    } else {
      this.operations.push({
        type: 'create',
        path: filePath,
      })
    }

    // Write file
    try {
      await fs.writeFile(filePath, content, 'utf-8')
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${error}`)
    }
  }

  /**
   * Append content to an existing file
   */
  async appendToFile(filePath: string, content: string, options: { createIfMissing?: boolean } = {}): Promise<void> {
    const exists = await this.fileExists(filePath)

    if (!exists && !options.createIfMissing) {
      throw new Error(`File does not exist: ${filePath}. Use createIfMissing: true to create.`)
    }

    if (this.dryRun) {
      console.log(`[DRY RUN] Would append to file: ${filePath}`)
      return
    }

    // Backup existing file
    let backupPath: string | undefined
    if (exists) {
      backupPath = await this.createBackup(filePath)
      this.operations.push({
        type: 'modify',
        path: filePath,
        backupPath,
      })
    } else {
      this.operations.push({
        type: 'create',
        path: filePath,
      })
    }

    // Append content
    try {
      await fs.appendFile(filePath, content, 'utf-8')
    } catch (error) {
      throw new Error(`Failed to append to file ${filePath}: ${error}`)
    }
  }

  /**
   * Insert content at a specific line in a file
   */
  async insertAtLine(
    filePath: string,
    lineNumber: number,
    content: string
  ): Promise<void> {
    const exists = await this.fileExists(filePath)

    if (!exists) {
      throw new Error(`File does not exist: ${filePath}`)
    }

    if (this.dryRun) {
      console.log(`[DRY RUN] Would insert at line ${lineNumber} in file: ${filePath}`)
      return
    }

    // Backup existing file
    const backupPath = await this.createBackup(filePath)
    this.operations.push({
      type: 'modify',
      path: filePath,
      backupPath,
    })

    // Read, modify, and write
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const lines = fileContent.split('\n')

      // Insert at line (0-indexed)
      lines.splice(lineNumber, 0, content)

      await fs.writeFile(filePath, lines.join('\n'), 'utf-8')
    } catch (error) {
      throw new Error(`Failed to insert at line ${lineNumber} in ${filePath}: ${error}`)
    }
  }

  /**
   * Replace text in a file using find/replace
   */
  async replaceInFile(
    filePath: string,
    searchValue: string | RegExp,
    replaceValue: string
  ): Promise<void> {
    const exists = await this.fileExists(filePath)

    if (!exists) {
      throw new Error(`File does not exist: ${filePath}`)
    }

    if (this.dryRun) {
      console.log(`[DRY RUN] Would replace in file: ${filePath}`)
      return
    }

    // Backup existing file
    const backupPath = await this.createBackup(filePath)
    this.operations.push({
      type: 'modify',
      path: filePath,
      backupPath,
    })

    // Read, modify, and write
    try {
      let content = await fs.readFile(filePath, 'utf-8')
      content = content.replace(searchValue, replaceValue)
      await fs.writeFile(filePath, content, 'utf-8')
    } catch (error) {
      throw new Error(`Failed to replace in file ${filePath}: ${error}`)
    }
  }

  /**
   * Create a directory
   */
  async createDirectory(dirPath: string): Promise<void> {
    if (this.dryRun) {
      console.log(`[DRY RUN] Would create directory: ${dirPath}`)
      return
    }

    this.operations.push({
      type: 'mkdir',
      path: dirPath,
    })

    try {
      await fs.mkdir(dirPath, { recursive: true })
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error}`)
    }
  }

  /**
   * Delete a file (with backup)
   */
  async deleteFile(filePath: string): Promise<void> {
    const exists = await this.fileExists(filePath)

    if (!exists) {
      throw new Error(`File does not exist: ${filePath}`)
    }

    if (this.dryRun) {
      console.log(`[DRY RUN] Would delete file: ${filePath}`)
      return
    }

    // Backup before deletion
    const backupPath = await this.createBackup(filePath)
    this.operations.push({
      type: 'delete',
      path: filePath,
      backupPath,
    })

    try {
      await fs.unlink(filePath)
    } catch (error) {
      throw new Error(`Failed to delete file ${filePath}: ${error}`)
    }
  }

  /**
   * Commit changes (delete all backups)
   */
  async commit(): Promise<void> {
    if (this.dryRun) {
      console.log('[DRY RUN] Would commit changes and delete backups')
      return
    }

    // Delete all backup files
    for (const op of this.operations) {
      if (op.backupPath) {
        try {
          await fs.unlink(op.backupPath)
        } catch (error) {
          console.warn(`Warning: Failed to delete backup ${op.backupPath}: ${error}`)
        }
      }
    }

    // Clear operations
    this.operations = []

    // Remove backup directory if empty
    try {
      const files = await fs.readdir(this.backupDir)
      if (files.length === 0) {
        await fs.rmdir(this.backupDir)
      }
    } catch (error) {
      // Ignore errors
    }
  }

  /**
   * Rollback all changes (restore from backups)
   */
  async rollback(): Promise<void> {
    if (this.dryRun) {
      console.log('[DRY RUN] Would rollback all changes')
      return
    }

    // Reverse order to undo operations
    for (const op of [...this.operations].reverse()) {
      try {
        switch (op.type) {
          case 'create':
            // Delete created file
            await fs.unlink(op.path)
            break

          case 'modify':
            // Restore from backup
            if (op.backupPath) {
              const backupContent = await fs.readFile(op.backupPath, 'utf-8')
              await fs.writeFile(op.path, backupContent, 'utf-8')
              await fs.unlink(op.backupPath)
            }
            break

          case 'delete':
            // Restore deleted file from backup
            if (op.backupPath) {
              const backupContent = await fs.readFile(op.backupPath, 'utf-8')
              await fs.writeFile(op.path, backupContent, 'utf-8')
              await fs.unlink(op.backupPath)
            }
            break

          case 'mkdir':
            // Remove created directory (only if empty)
            try {
              await fs.rmdir(op.path)
            } catch (error) {
              console.warn(`Warning: Could not remove directory ${op.path}: ${error}`)
            }
            break
        }
      } catch (error) {
        console.error(`Error during rollback of ${op.type} on ${op.path}: ${error}`)
      }
    }

    // Clear operations
    this.operations = []

    // Remove backup directory if empty
    try {
      const files = await fs.readdir(this.backupDir)
      if (files.length === 0) {
        await fs.rmdir(this.backupDir)
      }
    } catch (error) {
      // Ignore errors
    }
  }

  /**
   * Get operation summary
   */
  getSummary(): string[] {
    return this.operations.map(op => {
      switch (op.type) {
        case 'create':
          return `✓ Created: ${op.path}`
        case 'modify':
          return `✓ Modified: ${op.path}`
        case 'delete':
          return `✓ Deleted: ${op.path}`
        case 'mkdir':
          return `✓ Created directory: ${op.path}`
        default:
          return `✓ ${op.type}: ${op.path}`
      }
    })
  }
}

/**
 * Create a new checkpoint for atomic operations
 */
export function createCheckpoint(options?: { dryRun?: boolean; backupDir?: string }): Checkpoint {
  return new Checkpoint(options)
}

/**
 * Validate file path (security check)
 */
export function validatePath(filePath: string, allowedRoot: string): boolean {
  const resolvedPath = path.resolve(filePath)
  const resolvedRoot = path.resolve(allowedRoot)

  // Ensure path is within allowed root (prevent directory traversal)
  return resolvedPath.startsWith(resolvedRoot)
}

/**
 * Check if directory is empty
 */
export async function isDirectoryEmpty(dirPath: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dirPath)
    return files.length === 0
  } catch (error) {
    throw new Error(`Failed to check directory ${dirPath}: ${error}`)
  }
}

/**
 * List files in directory (non-recursive)
 */
export async function listFiles(dirPath: string): Promise<string[]> {
  try {
    return await fs.readdir(dirPath)
  } catch (error) {
    throw new Error(`Failed to list files in ${dirPath}: ${error}`)
  }
}

/**
 * List files in directory (recursive)
 */
export async function listFilesRecursive(dirPath: string): Promise<string[]> {
  const files: string[] = []

  async function traverse(currentPath: string) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name)

      if (entry.isDirectory()) {
        await traverse(fullPath)
      } else {
        files.push(fullPath)
      }
    }
  }

  await traverse(dirPath)
  return files
}

/**
 * Export all functions
 */
export default {
  createCheckpoint,
  validatePath,
  isDirectoryEmpty,
  listFiles,
  listFilesRecursive,
  Checkpoint,
}
