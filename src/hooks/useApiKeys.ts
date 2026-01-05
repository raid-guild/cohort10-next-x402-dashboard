import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format, formatDistanceToNow } from 'date-fns'
import type {
  ApiKeyData,
  ApiKeyResponse,
  GenerateApiKeyRequest,
  GenerateApiKeyResponse,
  GenerateApiKeySuccessResponse,
  ListApiKeysResponse,
  RevokeApiKeyRequest,
  RevokeApiKeyResponse,
} from '@/types/api-keys'

/**
 * Query Keys
 */
export const apiKeysQueryKeys = {
  all: ['apiKeys'] as const,
  list: (walletAddress: string) => ['apiKeys', 'list', walletAddress] as const,
}

/**
 * Format API key response for table display
 */
function formatApiKeyForDisplay(key: ApiKeyResponse): ApiKeyData {
  const createdDate = new Date(key.createdAt)
  const expiresDate = new Date(key.expiresAt)
  const formattedDate = format(createdDate, 'yyyy-dd-MM')
  const formattedExpiryDate = format(expiresDate, 'yyyy-dd-MM')
  const relativeTime = formatDistanceToNow(createdDate, { addSuffix: true })
  const expiresRelative = formatDistanceToNow(expiresDate, { addSuffix: true })
  
  return {
    id: key.id,
    name: key.name,
    keyId: key.masked,
    createdBy: `${formattedDate} · ${relativeTime}`,
    expiresBy: `${formattedExpiryDate} · ${expiresRelative}`,
    status: key.isExpired ? 'Inactive' : 'Active',
    environment: key.environment,
  }
}

/**
 * Fetch API keys for a wallet address
 */
async function fetchApiKeys(walletAddress: string): Promise<ApiKeyData[]> {
  const response = await fetch(`/api/keys/list?walletAddress=${walletAddress}`)
  const data: ListApiKeysResponse = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch API keys')
  }

  return data.apiKeys?.map(formatApiKeyForDisplay) || []
}

/**
 * Generate a new API key
 */
async function generateApiKey(
  request: GenerateApiKeyRequest
): Promise<GenerateApiKeyResponse> {
  const { x402Payment, ...payload } = request
  const response = await fetch('/api/keys/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(x402Payment ? { 'X-402-Payment': JSON.stringify(x402Payment) } : {}),
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()

  if (response.status === 402) {
    if (x402Payment) {
      throw new Error(data.error || 'Payment required')
    }
    return {
      requiresPayment: true,
      paymentRequirements: data.paymentRequirements,
    }
  }

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate API key')
  }

  return data
}

/**
 * Revoke an API key
 */
async function revokeApiKey(request: RevokeApiKeyRequest): Promise<RevokeApiKeyResponse> {
  const response = await fetch('/api/keys/revoke', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to revoke API key')
  }

  return data
}

/**
 * Hook to fetch API keys
 */
export function useApiKeys(walletAddress: string | undefined) {
  return useQuery({
    queryKey: apiKeysQueryKeys.list(walletAddress || ''),
    queryFn: () => fetchApiKeys(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to generate API key
 */
export function useGenerateApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: generateApiKey,
    onSuccess: (data, variables) => {
      const response = data as GenerateApiKeySuccessResponse
      if (response.success) {
        queryClient.invalidateQueries({
          queryKey: apiKeysQueryKeys.list(variables.walletAddress),
        })
      }
    },
  })
}

/**
 * Hook to revoke API key
 */
export function useRevokeApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: revokeApiKey,
    onSuccess: (_, variables) => {
      // Invalidate and refetch API keys list
      queryClient.invalidateQueries({
        queryKey: apiKeysQueryKeys.list(variables.walletAddress),
      })
    },
  })
}
