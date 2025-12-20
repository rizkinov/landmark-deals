/**
 * Secure Password Generator
 * Generates cryptographically secure passwords for site access
 */

// Character sets for password generation
const UPPERCASE = 'ABCDEFGHJKLMNPQRSTUVWXYZ' // Excluded I, O to avoid confusion
const LOWERCASE = 'abcdefghjkmnpqrstuvwxyz' // Excluded i, l, o to avoid confusion
const NUMBERS = '23456789' // Excluded 0, 1 to avoid confusion
const SYMBOLS = '!@#$%^&*-_+='

interface PasswordOptions {
  length?: number
  includeUppercase?: boolean
  includeLowercase?: boolean
  includeNumbers?: boolean
  includeSymbols?: boolean
  excludeAmbiguous?: boolean // Already excluded by default in character sets
}

const DEFAULT_OPTIONS: Required<PasswordOptions> = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: true
}

/**
 * Generate a cryptographically secure random password
 * @param options Password generation options
 * @returns Generated password string
 */
export function generateSecurePassword(options: PasswordOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  
  // Build character set based on options
  let charset = ''
  const requiredChars: string[] = []
  
  if (opts.includeUppercase) {
    charset += UPPERCASE
    requiredChars.push(getRandomChar(UPPERCASE))
  }
  if (opts.includeLowercase) {
    charset += LOWERCASE
    requiredChars.push(getRandomChar(LOWERCASE))
  }
  if (opts.includeNumbers) {
    charset += NUMBERS
    requiredChars.push(getRandomChar(NUMBERS))
  }
  if (opts.includeSymbols) {
    charset += SYMBOLS
    requiredChars.push(getRandomChar(SYMBOLS))
  }
  
  if (charset.length === 0) {
    throw new Error('At least one character type must be enabled')
  }
  
  // Generate password ensuring minimum length for required chars
  const minLength = Math.max(opts.length, requiredChars.length)
  const password: string[] = [...requiredChars]
  
  // Fill remaining length with random characters
  for (let i = password.length; i < minLength; i++) {
    password.push(getRandomChar(charset))
  }
  
  // Shuffle the password array to randomize position of required chars
  return shuffleArray(password).join('')
}

/**
 * Get a cryptographically secure random character from a string
 */
function getRandomChar(str: string): string {
  const randomBytes = new Uint32Array(1)
  crypto.getRandomValues(randomBytes)
  return str[randomBytes[0] % str.length]
}

/**
 * Fisher-Yates shuffle for cryptographically secure randomization
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  const randomBytes = new Uint32Array(shuffled.length)
  crypto.getRandomValues(randomBytes)
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomBytes[i] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

/**
 * Generate a memorable but secure password with word-like patterns
 * Format: Word-Number-Word-Symbol (e.g., Tiger-42-Storm!)
 */
export function generateMemorablePassword(): string {
  const adjectives = [
    'Swift', 'Bold', 'Bright', 'Noble', 'Grand', 'Prime', 'Royal', 'Steel',
    'Storm', 'Thunder', 'Crystal', 'Golden', 'Silver', 'Cosmic', 'Epic', 'Ultra'
  ]
  
  const nouns = [
    'Tiger', 'Eagle', 'Phoenix', 'Dragon', 'Falcon', 'Panther', 'Hawk', 'Wolf',
    'Lion', 'Shark', 'Bear', 'Raven', 'Cobra', 'Viper', 'Raptor', 'Titan'
  ]
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const number = Math.floor(Math.random() * 90) + 10 // 10-99
  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  
  return `${adj}-${number}-${noun}${symbol}`
}

/**
 * Validate password strength
 * @returns Object with strength score and issues
 */
export function validatePasswordStrength(password: string): {
  score: number // 0-100
  level: 'weak' | 'fair' | 'strong' | 'very-strong'
  issues: string[]
} {
  const issues: string[] = []
  let score = 0
  
  // Length checks
  if (password.length >= 8) score += 15
  if (password.length >= 12) score += 15
  if (password.length >= 16) score += 10
  if (password.length < 8) issues.push('Password should be at least 8 characters')
  
  // Character type checks
  if (/[a-z]/.test(password)) score += 15
  else issues.push('Add lowercase letters')
  
  if (/[A-Z]/.test(password)) score += 15
  else issues.push('Add uppercase letters')
  
  if (/[0-9]/.test(password)) score += 15
  else issues.push('Add numbers')
  
  if (/[^a-zA-Z0-9]/.test(password)) score += 15
  else issues.push('Add special characters')
  
  // Bonus for mixed character distribution
  const uniqueChars = new Set(password).size
  if (uniqueChars >= password.length * 0.7) score += 10
  
  // Determine level
  let level: 'weak' | 'fair' | 'strong' | 'very-strong'
  if (score < 40) level = 'weak'
  else if (score < 60) level = 'fair'
  else if (score < 80) level = 'strong'
  else level = 'very-strong'
  
  return { score: Math.min(100, score), level, issues }
}
