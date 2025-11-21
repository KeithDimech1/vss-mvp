/**
 * String Transformation Utilities
 *
 * Provides consistent string transformations for code generation:
 * - camelCase: variable names, function names, field names
 * - PascalCase: component names, type names, model names
 * - kebab-case: file names, URLs, slugs
 * - SCREAMING_SNAKE_CASE: constants, environment variables
 * - snake_case: database columns (if needed)
 * - Title Case: display names, labels
 *
 * @example
 * ```ts
 * const { toCamelCase, toPascalCase, toKebabCase } = require('./string-transforms')
 *
 * toCamelCase('user profile form')     // 'userProfileForm'
 * toPascalCase('user profile form')    // 'UserProfileForm'
 * toKebabCase('user profile form')     // 'user-profile-form'
 * toTitleCase('user profile form')     // 'User Profile Form'
 * ```
 */

/**
 * Normalize input string by removing special characters and splitting into words
 */
function normalizeString(str: string): string[] {
  return str
    .trim()
    // Replace special characters with spaces
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    // Split on word boundaries (camelCase, PascalCase, spaces, etc.)
    .split(/(?=[A-Z])|[\s_-]+/)
    .map(word => word.toLowerCase())
    .filter(word => word.length > 0)
}

/**
 * Convert string to camelCase
 * Used for: variable names, function names, field names
 *
 * @example
 * toCamelCase('user profile form')  // 'userProfileForm'
 * toCamelCase('UserProfileForm')    // 'userProfileForm'
 * toCamelCase('user-profile-form')  // 'userProfileForm'
 */
export function toCamelCase(str: string): string {
  const words = normalizeString(str)
  if (words.length === 0) return ''

  return words[0] + words
    .slice(1)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Convert string to PascalCase
 * Used for: component names, type names, model names, class names
 *
 * @example
 * toPascalCase('user profile form')  // 'UserProfileForm'
 * toPascalCase('userProfileForm')    // 'UserProfileForm'
 * toPascalCase('user-profile-form')  // 'UserProfileForm'
 */
export function toPascalCase(str: string): string {
  const words = normalizeString(str)

  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Convert string to kebab-case
 * Used for: file names, URLs, slugs, CSS classes
 *
 * @example
 * toKebabCase('user profile form')  // 'user-profile-form'
 * toKebabCase('UserProfileForm')    // 'user-profile-form'
 * toKebabCase('userProfileForm')    // 'user-profile-form'
 */
export function toKebabCase(str: string): string {
  const words = normalizeString(str)
  return words.join('-')
}

/**
 * Convert string to snake_case
 * Used for: database columns, Python-style naming
 *
 * @example
 * toSnakeCase('user profile form')  // 'user_profile_form'
 * toSnakeCase('UserProfileForm')    // 'user_profile_form'
 * toSnakeCase('userProfileForm')    // 'user_profile_form'
 */
export function toSnakeCase(str: string): string {
  const words = normalizeString(str)
  return words.join('_')
}

/**
 * Convert string to SCREAMING_SNAKE_CASE
 * Used for: constants, environment variables, enum values
 *
 * @example
 * toScreamingSnakeCase('user profile form')  // 'USER_PROFILE_FORM'
 * toScreamingSnakeCase('UserProfileForm')    // 'USER_PROFILE_FORM'
 * toScreamingSnakeCase('userProfileForm')    // 'USER_PROFILE_FORM'
 */
export function toScreamingSnakeCase(str: string): string {
  const words = normalizeString(str)
  return words.join('_').toUpperCase()
}

/**
 * Convert string to Title Case
 * Used for: display names, labels, headings
 *
 * @example
 * toTitleCase('user profile form')  // 'User Profile Form'
 * toTitleCase('UserProfileForm')    // 'User Profile Form'
 * toTitleCase('userProfileForm')    // 'User Profile Form'
 */
export function toTitleCase(str: string): string {
  const words = normalizeString(str)

  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Pluralize a word (simple English pluralization)
 * Used for: collection names, table names
 *
 * @example
 * pluralize('user')       // 'users'
 * pluralize('category')   // 'categories'
 * pluralize('person')     // 'people' (special case)
 */
export function pluralize(word: string): string {
  const lower = word.toLowerCase()

  // Special cases
  const irregulars: Record<string, string> = {
    'person': 'people',
    'child': 'children',
    'man': 'men',
    'woman': 'women',
    'tooth': 'teeth',
    'foot': 'feet',
    'mouse': 'mice',
    'goose': 'geese',
  }

  if (irregulars[lower]) {
    return irregulars[lower]
  }

  // Words ending in consonant + y → ies
  if (lower.match(/[^aeiou]y$/)) {
    return word.slice(0, -1) + 'ies'
  }

  // Words ending in s, x, z, ch, sh → es
  if (lower.match(/(s|x|z|ch|sh)$/)) {
    return word + 'es'
  }

  // Words ending in consonant + o → es
  if (lower.match(/[^aeiou]o$/)) {
    return word + 'es'
  }

  // Default: add s
  return word + 's'
}

/**
 * Singularize a word (simple English singularization)
 * Used for: model names from collection names
 *
 * @example
 * singularize('users')       // 'user'
 * singularize('categories')  // 'category'
 * singularize('people')      // 'person' (special case)
 */
export function singularize(word: string): string {
  const lower = word.toLowerCase()

  // Special cases
  const irregulars: Record<string, string> = {
    'people': 'person',
    'children': 'child',
    'men': 'man',
    'women': 'woman',
    'teeth': 'tooth',
    'feet': 'foot',
    'mice': 'mouse',
    'geese': 'goose',
  }

  if (irregulars[lower]) {
    return irregulars[lower]
  }

  // Words ending in ies → y
  if (lower.match(/ies$/)) {
    return word.slice(0, -3) + 'y'
  }

  // Words ending in consonant + es (but not -oes)
  if (lower.match(/[^aeiou]es$/) && !lower.match(/oes$/)) {
    return word.slice(0, -2)
  }

  // Words ending in s (but not ss)
  if (lower.match(/[^s]s$/)) {
    return word.slice(0, -1)
  }

  // Already singular
  return word
}

/**
 * Generate all common variations of a string for code generation
 *
 * @example
 * generateVariations('user profile')
 * // {
 * //   original: 'user profile',
 * //   camelCase: 'userProfile',
 * //   PascalCase: 'UserProfile',
 * //   kebabCase: 'user-profile',
 * //   snakeCase: 'user_profile',
 * //   screamingSnakeCase: 'USER_PROFILE',
 * //   titleCase: 'User Profile',
 * //   plural: 'userProfiles',
 * //   singular: 'userProfile'
 * // }
 */
export function generateVariations(str: string): {
  original: string
  camelCase: string
  PascalCase: string
  kebabCase: string
  snakeCase: string
  screamingSnakeCase: string
  titleCase: string
  plural: string
  singular: string
} {
  const camel = toCamelCase(str)
  const pascal = toPascalCase(str)
  const words = normalizeString(str)
  const lastWord = words[words.length - 1] || ''

  return {
    original: str,
    camelCase: camel,
    PascalCase: pascal,
    kebabCase: toKebabCase(str),
    snakeCase: toSnakeCase(str),
    screamingSnakeCase: toScreamingSnakeCase(str),
    titleCase: toTitleCase(str),
    plural: toCamelCase([...words.slice(0, -1), pluralize(lastWord)].join(' ')),
    singular: toCamelCase([...words.slice(0, -1), singularize(lastWord)].join(' ')),
  }
}

/**
 * Type guard to check if a string is in camelCase
 */
export function isCamelCase(str: string): boolean {
  return /^[a-z][a-zA-Z0-9]*$/.test(str)
}

/**
 * Type guard to check if a string is in PascalCase
 */
export function isPascalCase(str: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str)
}

/**
 * Type guard to check if a string is in kebab-case
 */
export function isKebabCase(str: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str)
}

/**
 * Type guard to check if a string is in snake_case
 */
export function isSnakeCase(str: string): boolean {
  return /^[a-z0-9]+(_[a-z0-9]+)*$/.test(str)
}

/**
 * Export all functions as default object for convenience
 */
export default {
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
  toScreamingSnakeCase,
  toTitleCase,
  pluralize,
  singularize,
  generateVariations,
  isCamelCase,
  isPascalCase,
  isKebabCase,
  isSnakeCase,
}
