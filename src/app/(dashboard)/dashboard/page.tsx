'use client'

import { useState } from 'react'
import { useConnection, useSignTypedData, useSwitchChain } from 'wagmi'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ApiKeysTable from '@/components/dashboard/ApiKeysTable'
import ApiKeyGenerateDialog from '@/components/dashboard/ApiKeyGenerateDialog'
import ApiKeyDisplayDialog from '@/components/dashboard/ApiKeyDisplayDialog'
import ApiKeyRevokeDialog from '@/components/dashboard/ApiKeyRevokeDialog'
import ApiKeysPricingSelect from '@/components/dashboard/ApiKeysPricingSelect'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useApiKeys, useGenerateApiKey, useRevokeApiKey } from '@/hooks/useApiKeys'
import type { X402Payment, X402PaymentRequirements } from '@/types/api-keys'

export default function DashboardPage() {
  const { address, chainId, isConnected } = useConnection()
  const { signTypedDataAsync } = useSignTypedData()
  const { switchChainAsync } = useSwitchChain()
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [showKeyDialog, setShowKeyDialog] = useState(false)
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)
  const [newApiKey, setNewApiKey] = useState<string | null>(null)
  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [isPaying, setIsPaying] = useState(false)

  // React Query hooks
  const { data: apiKeys = [], isLoading, error } = useApiKeys(address)
  const generateMutation = useGenerateApiKey()
  const revokeMutation = useRevokeApiKey()

  const buildPayment = async (
    requirements: X402PaymentRequirements
  ): Promise<X402Payment> => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    if (chainId !== 8453) {
      if (!switchChainAsync) {
        throw new Error('Unable to switch to Base network')
      }
      await switchChainAsync({ chainId: 8453 })
    }

    const now = Math.floor(Date.now() / 1000)
    const validAfter = now.toString()
    const validBefore = (
      now + (requirements.maxTimeoutSeconds || 600)
    ).toString()

    const nonceBytes = new Uint8Array(32)
    crypto.getRandomValues(nonceBytes)
    const nonce = `0x${Array.from(nonceBytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')}`

    const verifyingContract = requirements.asset as `0x${string}`
    const domain = {
      name: requirements.extra?.name || 'USD Coin',
      version: requirements.extra?.version || '2',
      chainId: 8453,
      verifyingContract,
    }

    const types = {
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' },
      ],
    }

    const message = {
      from: address,
      to: requirements.payTo,
      value: requirements.amount,
      validAfter,
      validBefore,
      nonce,
    }

    const signature = await signTypedDataAsync({
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message,
    })

    return {
      x402Version: requirements.x402Version || 2,
      paymentPayload: {
        accepted: {
          scheme: requirements.scheme,
          network: requirements.network,
        },
        payload: {
          authorization: message,
          signature,
        },
      },
      paymentRequirements: requirements,
    }
  }

  const handleGenerate = async (params: { environment: 'live' | 'test'; name?: string }) => {
    if (!address) return

    try {
      setPaymentError(null)
      const result = await generateMutation.mutateAsync({
        walletAddress: address,
        ...params,
      })

      if ('requiresPayment' in result) {
        setIsPaying(true)
        const payment = await buildPayment(result.paymentRequirements)
        const finalResult = await generateMutation.mutateAsync({
          walletAddress: address,
          ...params,
          x402Payment: payment,
        })

        if ('success' in finalResult && finalResult.success) {
          setNewApiKey(finalResult.apiKey)
          setShowGenerateDialog(false)
          setShowKeyDialog(true)
        }
      } else if ('success' in result && result.success) {
        setNewApiKey(result.apiKey)
        setShowGenerateDialog(false)
        setShowKeyDialog(true)
      }
    } catch (err) {
      // Error is handled by React Query
      console.error('Generate error:', err)
      setPaymentError(
        err instanceof Error ? err.message : 'Failed to generate API key'
      )
    } finally {
      setIsPaying(false)
    }
  }

  const handleRevoke = async () => {
    if (!address || !keyToRevoke) return

    try {
      await revokeMutation.mutateAsync({
        walletAddress: address,
        keyId: keyToRevoke,
      })

      setShowRevokeDialog(false)
      setKeyToRevoke(null)
    } catch (err) {
      // Error is handled by React Query
      console.error('Revoke error:', err)
    }
  }

  const openRevokeDialog = (keyId: string) => {
    setKeyToRevoke(keyId)
    setShowRevokeDialog(true)
  }

  return (
    <>
      <DashboardHeader title="API keys" />
      <div className="py-8 px-8">
        {(paymentError || error || generateMutation.error || revokeMutation.error) && (
          <Alert variant="destructive" className="mb-6 max-w-[800px]">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {paymentError ||
               error?.message || 
               generateMutation.error?.message || 
               revokeMutation.error?.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Pricing Dropdown */}
        <div className="mb-6">
          <ApiKeysPricingSelect />
        </div>

        <div className="max-w-[800px]">
          {/* Section Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-3xl font-bold text-moloch-900 font-serif mb-1">
                  List of API keys
                </h2>
                <p className="text-sm text-neutral-600">
                  Find below a list of all generated API keys
                </p>
              </div>
              <button
                className="bg-[#2D1810] hover:bg-[#3D2418] text-white px-4 py-2.5 rounded-xl h-11! text-base font-normal transition-colors whitespace-nowrap disabled:opacity-50"
                onClick={() => setShowGenerateDialog(true)}
                disabled={isLoading}
              >
                Generate new key
              </button>
            </div>
          </div>

          {/* API Keys Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
            </div>
          ) : (
            <ApiKeysTable
              apiKeys={apiKeys}
              onGenerate={() => setShowGenerateDialog(true)}
              onRevoke={openRevokeDialog}
            />
          )}
        </div>
      </div>

      {/* Dialogs */}
      <ApiKeyGenerateDialog
        open={showGenerateDialog}
        onOpenChange={setShowGenerateDialog}
        onGenerate={handleGenerate}
        isGenerating={generateMutation.isPending || isPaying}
      />

      <ApiKeyDisplayDialog
        open={showKeyDialog}
        onOpenChange={setShowKeyDialog}
        apiKey={newApiKey}
      />

      <ApiKeyRevokeDialog
        open={showRevokeDialog}
        onOpenChange={setShowRevokeDialog}
        onRevoke={handleRevoke}
        isRevoking={revokeMutation.isPending}
      />
    </>
  )
}
