/**
 * API Key Types
 * Shared type definitions for API key management
 */

export type ApiKeyEnvironment = 'live' | 'test'
export type ApiKeyStatus = 'Active' | 'Inactive'

/**
 * API Key data for table display
 */
export interface ApiKeyData {
  id: string
  keyId: string // Masked key for display
  name?: string
  createdBy: string // Formatted date string
  status: ApiKeyStatus
  environment?: ApiKeyEnvironment
}

/**
 * API Key from backend (list response)
 */
export interface ApiKeyResponse {
  id: string
  name?: string
  masked: string
  expiresAt: string
  environment: ApiKeyEnvironment
  isExpired: boolean
  createdAt: string
  lastUsedAt?: string
  isActive: boolean
}

/**
 * Generate API key request
 */
export interface GenerateApiKeyRequest {
  walletAddress: string
  environment: ApiKeyEnvironment
  name?: string
  expiryYears?: number
}

/**
 * Generate API key response
 */
export interface GenerateApiKeyResponse {
  success: boolean
  apiKey: string
  keyId: string
  expiresAt: string
  environment: ApiKeyEnvironment
  name?: string
  message: string
}

/**
 * List API keys response
 */
export interface ListApiKeysResponse {
  apiKeys?: ApiKeyResponse[]
  count?: number
  error?: string
}

/**
 * Revoke API key request
 */
export interface RevokeApiKeyRequest {
  walletAddress: string
  keyId: string
}

/**
 * Revoke API key response
 */
export interface RevokeApiKeyResponse {
  success: boolean
  message: string
}
