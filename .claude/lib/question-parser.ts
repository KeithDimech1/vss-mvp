/**
 * Question Parser Utilities
 *
 * Parse questions from various document formats:
 * - Markdown (.md) - Extract from headings, lists, and formatted text
 * - CSV (.csv) - Parse structured question data
 * - Plain text (.txt) - Detect questions and infer types
 *
 * Supports all 12 question types:
 * text, textarea, radio, checkbox, dropdown, date, number, currency,
 * info, implementation_table, data_inventory_matrix, ranking, rating, selectable_tags
 *
 * @example
 * ```ts
 * const parser = new QuestionParser()
 * const questions = await parser.parseFile('questions.md')
 * console.log(questions)
 * ```
 */

import * as fs from 'fs/promises'
import * as path from 'path'
import { toCamelCase } from './string-transforms'

/**
 * Question type
 */
export type QuestionType =
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'number'
  | 'currency'
  | 'info'
  | 'implementation_table'
  | 'data_inventory_matrix'
  | 'ranking'
  | 'rating'
  | 'selectable_tags'

/**
 * Parsed question
 */
export interface ParsedQuestion {
  id: string
  section?: string
  question: string
  type: QuestionType
  placeholder?: string
  options?: string[]
  helpText?: string
  required?: boolean
  maxLength?: number
  min?: number
  max?: number
  ratingScale?: number
  rankingLimit?: number
}

/**
 * Parser options
 */
export interface ParserOptions {
  /** Automatically generate IDs if not present (default: true) */
  autoGenerateIds?: boolean
  /** Infer question types from content (default: true) */
  inferTypes?: boolean
  /** Mark all questions as required (default: false) */
  defaultRequired?: boolean
  /** Default question type (default: 'text') */
  defaultType?: QuestionType
  /** Section name for questions without sections */
  defaultSection?: string
}

/**
 * CSV column mapping
 */
interface CSVMapping {
  id?: string
  question?: string
  type?: string
  section?: string
  required?: string
  placeholder?: string
  helpText?: string
  options?: string
  maxLength?: string
  min?: string
  max?: string
  ratingScale?: string
  rankingLimit?: string
}

/**
 * Question Parser
 */
export class QuestionParser {
  private options: Required<ParserOptions>

  constructor(options: ParserOptions = {}) {
    this.options = {
      autoGenerateIds: options.autoGenerateIds ?? true,
      inferTypes: options.inferTypes ?? true,
      defaultRequired: options.defaultRequired ?? false,
      defaultType: options.defaultType ?? 'text',
      defaultSection: options.defaultSection ?? '',
    }
  }

  /**
   * Parse questions from a file
   */
  async parseFile(filePath: string): Promise<ParsedQuestion[]> {
    const ext = path.extname(filePath).toLowerCase()
    const content = await fs.readFile(filePath, 'utf-8')

    switch (ext) {
      case '.md':
      case '.markdown':
        return this.parseMarkdown(content)
      case '.csv':
        return this.parseCSV(content)
      case '.txt':
        return this.parseText(content)
      default:
        throw new Error(`Unsupported file format: ${ext}. Supported: .md, .csv, .txt`)
    }
  }

  /**
   * Parse markdown content
   *
   * Format:
   * ```markdown
   * ## Section Name
   *
   * 1. What is your name? [text]
   *    - Help: Enter your full name
   *    - Required: yes
   *
   * 2. How would you describe your role? [textarea]
   *    Options:
   *    - Manager
   *    - Developer
   *    - Designer
   * ```
   */
  parseMarkdown(content: string): ParsedQuestion[] {
    const questions: ParsedQuestion[] = []
    const lines = content.split('\n')

    let currentSection = this.options.defaultSection
    let currentQuestion: Partial<ParsedQuestion> | null = null
    let inOptionsBlock = false
    let questionCounter = 1

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Skip empty lines
      if (!line) {
        inOptionsBlock = false
        continue
      }

      // Detect section headers (## Section Name)
      if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').trim()
        continue
      }

      // Detect question line (numbered or bullet point with ?)
      const questionMatch = line.match(/^(?:\d+\.|[-*])\s+(.+\?)\s*(?:\[(\w+)\])?/)
      if (questionMatch) {
        // Save previous question
        if (currentQuestion) {
          questions.push(this.finalizeQuestion(currentQuestion))
        }

        const questionText = questionMatch[1].trim()
        const explicitType = questionMatch[2] as QuestionType | undefined

        currentQuestion = {
          id: this.options.autoGenerateIds
            ? `q${questionCounter}_${toCamelCase(questionText.replace('?', '').slice(0, 30))}`
            : '',
          section: currentSection,
          question: questionText,
          type: explicitType || this.inferQuestionType(questionText),
          required: this.options.defaultRequired,
          options: [],
        }

        questionCounter++
        inOptionsBlock = false
        continue
      }

      // Handle question metadata (inside question block)
      if (currentQuestion) {
        // Help text (- Help: ...)
        if (line.startsWith('- Help:') || line.startsWith('- help:')) {
          currentQuestion.helpText = line.replace(/^- [Hh]elp:\s*/, '').trim()
          continue
        }

        // Required flag (- Required: yes)
        if (line.startsWith('- Required:') || line.startsWith('- required:')) {
          const value = line.replace(/^- [Rr]equired:\s*/, '').trim().toLowerCase()
          currentQuestion.required = value === 'yes' || value === 'true'
          continue
        }

        // Placeholder (- Placeholder: ...)
        if (line.startsWith('- Placeholder:') || line.startsWith('- placeholder:')) {
          currentQuestion.placeholder = line.replace(/^- [Pp]laceholder:\s*/, '').trim()
          continue
        }

        // Max length (- Max length: 500)
        if (line.startsWith('- Max length:') || line.startsWith('- max length:')) {
          const value = line.replace(/^- [Mm]ax length:\s*/, '').trim()
          currentQuestion.maxLength = parseInt(value, 10)
          continue
        }

        // Rating scale (- Rating: 1-5)
        if (line.startsWith('- Rating:') || line.startsWith('- rating:')) {
          const value = line.replace(/^- [Rr]ating:\s*/, '').trim()
          const match = value.match(/1-(\d+)/)
          if (match) {
            currentQuestion.ratingScale = parseInt(match[1], 10)
          }
          continue
        }

        // Options block start
        if (line === 'Options:' || line === 'options:') {
          inOptionsBlock = true
          continue
        }

        // Option items (- Option name)
        if (inOptionsBlock && (line.startsWith('- ') || line.startsWith('* '))) {
          const option = line.replace(/^[-*]\s+/, '').trim()
          currentQuestion.options = currentQuestion.options || []
          currentQuestion.options.push(option)
          continue
        }
      }
    }

    // Save last question
    if (currentQuestion) {
      questions.push(this.finalizeQuestion(currentQuestion))
    }

    return questions
  }

  /**
   * Parse CSV content
   *
   * Expected columns:
   * id, question, type, section, required, placeholder, helpText, options, maxLength, etc.
   *
   * Options can be comma-separated: "Option 1, Option 2, Option 3"
   */
  parseCSV(content: string): Promise<ParsedQuestion[]> {
    const lines = content.split('\n').filter(l => l.trim())
    if (lines.length < 2) {
      return Promise.resolve([])
    }

    // Parse header
    const headers = this.parseCSVLine(lines[0])
    const mapping = this.detectCSVColumns(headers)

    // Parse rows
    const questions: ParsedQuestion[] = []
    let questionCounter = 1

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i])
      if (values.length === 0) continue

      const row: Record<string, string> = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })

      const question: Partial<ParsedQuestion> = {}

      // ID
      question.id = row[mapping.id || ''] || (this.options.autoGenerateIds
        ? `q${questionCounter}_${toCamelCase(row[mapping.question || '']?.slice(0, 30) || '')}`
        : '')

      // Question text
      question.question = row[mapping.question || ''] || ''
      if (!question.question) continue // Skip rows without question text

      // Type
      const typeStr = row[mapping.type || '']?.toLowerCase()
      question.type = (typeStr as QuestionType) || this.options.defaultType

      // Section
      question.section = row[mapping.section || ''] || this.options.defaultSection

      // Required
      const requiredStr = row[mapping.required || '']?.toLowerCase()
      question.required = requiredStr === 'yes' || requiredStr === 'true' || this.options.defaultRequired

      // Placeholder
      question.placeholder = row[mapping.placeholder || ''] || undefined

      // Help text
      question.helpText = row[mapping.helpText || ''] || undefined

      // Options (comma-separated)
      const optionsStr = row[mapping.options || '']
      if (optionsStr) {
        question.options = optionsStr.split(',').map(o => o.trim()).filter(Boolean)
      }

      // Max length
      const maxLengthStr = row[mapping.maxLength || '']
      if (maxLengthStr) {
        question.maxLength = parseInt(maxLengthStr, 10)
      }

      // Min/Max
      const minStr = row[mapping.min || '']
      if (minStr) question.min = parseInt(minStr, 10)

      const maxStr = row[mapping.max || '']
      if (maxStr) question.max = parseInt(maxStr, 10)

      // Rating scale
      const ratingStr = row[mapping.ratingScale || '']
      if (ratingStr) {
        question.ratingScale = parseInt(ratingStr, 10)
      }

      // Ranking limit
      const rankingStr = row[mapping.rankingLimit || '']
      if (rankingStr) {
        question.rankingLimit = parseInt(rankingStr, 10)
      }

      questions.push(this.finalizeQuestion(question))
      questionCounter++
    }

    return Promise.resolve(questions)
  }

  /**
   * Parse plain text content
   *
   * Format:
   * ```
   * What is your name?
   *
   * How would you describe your role in detail?
   * ```
   */
  parseText(content: string): ParsedQuestion[] {
    const questions: ParsedQuestion[] = []
    const lines = content.split('\n').filter(l => l.trim())

    let questionCounter = 1

    for (const line of lines) {
      // Detect question (ends with ?)
      if (line.trim().endsWith('?')) {
        const questionText = line.trim()
        const question: Partial<ParsedQuestion> = {
          id: this.options.autoGenerateIds
            ? `q${questionCounter}_${toCamelCase(questionText.replace('?', '').slice(0, 30))}`
            : '',
          question: questionText,
          type: this.inferQuestionType(questionText),
          required: this.options.defaultRequired,
        }

        questions.push(this.finalizeQuestion(question))
        questionCounter++
      }
    }

    return questions
  }

  /**
   * Infer question type from question text
   */
  private inferQuestionType(questionText: string): QuestionType {
    if (!this.options.inferTypes) {
      return this.options.defaultType
    }

    const lower = questionText.toLowerCase()

    // Textarea keywords
    if (
      lower.includes('describe') ||
      lower.includes('explain') ||
      lower.includes('elaborate') ||
      lower.includes('detail') ||
      lower.includes('in your own words') ||
      lower.includes('tell us about')
    ) {
      return 'textarea'
    }

    // Date keywords
    if (
      lower.includes('when') ||
      lower.includes('date') ||
      lower.includes('birthday') ||
      lower.includes('deadline')
    ) {
      return 'date'
    }

    // Number keywords
    if (
      lower.includes('how many') ||
      lower.includes('number of') ||
      lower.includes('quantity') ||
      lower.includes('count')
    ) {
      return 'number'
    }

    // Currency keywords
    if (
      lower.includes('cost') ||
      lower.includes('price') ||
      lower.includes('$') ||
      lower.includes('amount') ||
      lower.includes('budget') ||
      lower.includes('revenue')
    ) {
      return 'currency'
    }

    // Rating keywords
    if (
      lower.includes('rate') ||
      lower.includes('rating') ||
      lower.includes('score') ||
      lower.includes('1-5') ||
      lower.includes('1-10') ||
      lower.includes('out of')
    ) {
      return 'rating'
    }

    // Ranking keywords
    if (
      lower.includes('rank') ||
      lower.includes('prioritize') ||
      lower.includes('order') ||
      lower.includes('top ')
    ) {
      return 'ranking'
    }

    // Checkbox keywords
    if (
      lower.includes('select all') ||
      lower.includes('choose multiple') ||
      lower.includes('check all') ||
      lower.includes('all that apply')
    ) {
      return 'checkbox'
    }

    // Radio keywords (single choice)
    if (
      lower.includes('choose one') ||
      lower.includes('select one') ||
      lower.includes('which of the following')
    ) {
      return 'radio'
    }

    // Default to text for short answers
    return 'text'
  }

  /**
   * Finalize question (set defaults, validate)
   */
  private finalizeQuestion(question: Partial<ParsedQuestion>): ParsedQuestion {
    // Adjust type if options are present
    if (question.options && question.options.length > 0) {
      if (question.type === 'text' || question.type === 'textarea') {
        // If many options, use dropdown; else radio
        question.type = question.options.length > 6 ? 'dropdown' : 'radio'
      }
    }

    // Set defaults for rating
    if (question.type === 'rating' && !question.ratingScale) {
      question.ratingScale = 5 // Default to 1-5 scale
    }

    // Set defaults for ranking
    if (question.type === 'ranking' && !question.rankingLimit) {
      question.rankingLimit = question.options?.length || 5
    }

    return question as ParsedQuestion
  }

  /**
   * Parse CSV line (handles quoted values)
   */
  private parseCSVLine(line: string): string[] {
    const values: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }

    values.push(current.trim())
    return values
  }

  /**
   * Detect CSV column names (case-insensitive, flexible)
   */
  private detectCSVColumns(headers: string[]): CSVMapping {
    const mapping: CSVMapping = {}

    headers.forEach((header, index) => {
      const lower = header.toLowerCase().trim()

      if (lower === 'id' || lower === 'question_id') {
        mapping.id = header
      } else if (lower === 'question' || lower === 'text' || lower === 'question_text') {
        mapping.question = header
      } else if (lower === 'type' || lower === 'question_type') {
        mapping.type = header
      } else if (lower === 'section') {
        mapping.section = header
      } else if (lower === 'required') {
        mapping.required = header
      } else if (lower === 'placeholder') {
        mapping.placeholder = header
      } else if (lower === 'help' || lower === 'helptext' || lower === 'help_text') {
        mapping.helpText = header
      } else if (lower === 'options') {
        mapping.options = header
      } else if (lower === 'maxlength' || lower === 'max_length') {
        mapping.maxLength = header
      } else if (lower === 'min') {
        mapping.min = header
      } else if (lower === 'max') {
        mapping.max = header
      } else if (lower === 'ratingscale' || lower === 'rating_scale') {
        mapping.ratingScale = header
      } else if (lower === 'rankinglimit' || lower === 'ranking_limit') {
        mapping.rankingLimit = header
      }
    })

    return mapping
  }
}

/**
 * Parse questions from a file (convenience function)
 */
export async function parseQuestions(
  filePath: string,
  options?: ParserOptions
): Promise<ParsedQuestion[]> {
  const parser = new QuestionParser(options)
  return parser.parseFile(filePath)
}

/**
 * Parse questions from markdown string
 */
export function parseMarkdown(content: string, options?: ParserOptions): ParsedQuestion[] {
  const parser = new QuestionParser(options)
  return parser.parseMarkdown(content)
}

/**
 * Parse questions from CSV string
 */
export async function parseCSV(content: string, options?: ParserOptions): Promise<ParsedQuestion[]> {
  const parser = new QuestionParser(options)
  return parser.parseCSV(content)
}

/**
 * Parse questions from plain text string
 */
export function parseText(content: string, options?: ParserOptions): ParsedQuestion[] {
  const parser = new QuestionParser(options)
  return parser.parseText(content)
}

/**
 * Export all
 */
export default {
  QuestionParser,
  parseQuestions,
  parseMarkdown,
  parseCSV,
  parseText,
}
