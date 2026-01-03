import { randomBytes } from 'crypto'
import bcrypt from 'bcryptjs'

/**
 * API Key environment types
 */
export type ApiKeyEnvironment = 'live' | 'test'

/**
 * API Key data structure (for generation)
 */
export interface ApiKey {
  key: string // The full prefixed key (e.g., "rg_live_abc123...")
  hash: string // Bcrypt hash of the key
  expiresAt: Date
  environment: ApiKeyEnvironment
}

/**
 * Stored API Key (database record)
 */
export interface StoredApiKey {
  id: string
  organizationId: string
  name?: string
  keyPrefix: string // e.g., "rg_live_"
  keyHash: string
  expiresAt: Date
  environment: ApiKeyEnvironment
  createdAt: Date
  lastUsedAt?: Date
  isActive: boolean
}

/**
 * Masked API key for display
 */
export interface MaskedApiKey {
  id: string
  name?: string
  masked: string // e.g., "rg_live_****...****1234"
  expiresAt: Date
  environment: ApiKeyEnvironment
  isExpired: boolean
  createdAt: Date
  lastUsedAt?: Date
  isActive: boolean
}

/**
 * Extract the prefix from a full API key
 * e.g., "rg_live_abc123..." -> "rg_live_"
 */
export function getKeyPrefix(key: string): string {
  const parts = key.split('_')
  if (parts.length >= 2) {
    return `${parts[0]}_${parts[1]}_`
  }
  return ''
}

/**
 * Generate a new API key with the specified environment
 * Format: rg_{environment}_{32_random_chars}
 * 
 * @param environment - 'live' or 'test'
 * @param expiryYears - Number of years until expiry (default: 1)
 * @returns ApiKey object with key, hash, and expiry
 */
export async function generateApiKey(
  environment: ApiKeyEnvironment = 'live',
  expiryYears = 1
): Promise<ApiKey> {
  // Generate 32 random characters (using crypto.randomBytes for security)
  const randomPart = randomBytes(16).toString('hex') // 16 bytes = 32 hex chars
  
  // Create prefixed key
  const key = `rg_${environment}_${randomPart}`
  
  // Hash the key using bcrypt (10 rounds)
  const hash = await bcrypt.hash(key, 10)
  
  // Calculate expiry date
  const expiresAt = new Date()
  expiresAt.setFullYear(expiresAt.getFullYear() + expiryYears)
  
  return {
    key,
    hash,
    expiresAt,
    environment,
  }
}

/**
 * Verify an API key against its hash
 * 
 * @param key - The plain-text API key
 * @param hash - The bcrypt hash to compare against
 * @returns True if the key matches the hash
 */
export async function verifyApiKey(key: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(key, hash)
  } catch (error) {
    console.error('Error verifying API key:', error)
    return false
  }
}

/**
 * Mask an API key for display
 * Shows: prefix + **** + last 4 characters
 * Example: rg_live_abc123...xyz789 -> rg_live_****...****z789
 * 
 * @param key - The full API key
 * @returns Masked version of the key
 */
export function maskApiKey(key: string): string {
  if (!key) return ''
  
  // Extract prefix (e.g., "rg_live_" or "rg_test_")
  const parts = key.split('_')
  if (parts.length < 3) return '****'
  
  const prefix = `${parts[0]}_${parts[1]}_` // "rg_live_" or "rg_test_"
  const randomPart = parts.slice(2).join('_') // Everything after the prefix
  
  // Show last 4 characters
  const lastFour = randomPart.slice(-4)
  
  return `${prefix}****...****${lastFour}`
}

/**
 * Validate API key format
 * Must match: rg_(live|test)_[32 hex chars]
 * 
 * @param key - The API key to validate
 * @returns True if the format is valid
 */
export function isValidApiKeyFormat(key: string): boolean {
  const pattern = /^rg_(live|test)_[a-f0-9]{32}$/
  return pattern.test(key)
}

/**
 * Check if an API key is expired
 * 
 * @param expiresAt - The expiry date
 * @returns True if the key is expired
 */
export function isApiKeyExpired(expiresAt: Date): boolean {
  return new Date() > new Date(expiresAt)
}

/**
 * Extract environment from API key
 * 
 * @param key - The API key
 * @returns The environment ('live' or 'test') or null if invalid
 */
export function getApiKeyEnvironment(key: string): ApiKeyEnvironment | null {
  const parts = key.split('_')
  if (parts.length < 3) return null
  
  const env = parts[1]
  if (env === 'live' || env === 'test') {
    return env
  }
  
  return null
}
