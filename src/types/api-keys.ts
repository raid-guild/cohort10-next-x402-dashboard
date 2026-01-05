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
  expiresBy: string // Formatted date string
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
  x402Payment?: X402Payment
}

/**
 * Generate API key response
 */
export interface GenerateApiKeySuccessResponse {
  success: boolean
  apiKey: string
  keyId: string
  expiresAt: string
  environment: ApiKeyEnvironment
  name?: string
  message: string
}

export interface X402PaymentRequirements {
  scheme: 'exact'
  network: string
  asset: string
  payTo: string
  amount: string
  amountDecimal?: string
  maxTimeoutSeconds?: number
  extra?: {
    name?: string
    version?: string
  }
  x402Version?: number
}

export interface X402Payment {
  x402Version: number
  paymentPayload: {
    accepted: {
      scheme: string
      network: string
    }
    payload: {
      authorization: {
        from: string
        to: string
        value: string
        validAfter: string
        validBefore: string
        nonce: string
      }
      signature: string
    }
  }
  paymentRequirements: X402PaymentRequirements
}

export interface GenerateApiKeyPaymentRequiredResponse {
  requiresPayment: true
  paymentRequirements: X402PaymentRequirements
}

export type GenerateApiKeyResponse =
  | GenerateApiKeySuccessResponse
  | GenerateApiKeyPaymentRequiredResponse

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
