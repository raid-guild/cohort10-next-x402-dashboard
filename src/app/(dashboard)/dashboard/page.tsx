'use client'

import { useState } from 'react'
import { useConnection } from 'wagmi'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ApiKeysTable from '@/components/dashboard/ApiKeysTable'
import ApiKeyGenerateDialog from '@/components/dashboard/ApiKeyGenerateDialog'
import ApiKeyDisplayDialog from '@/components/dashboard/ApiKeyDisplayDialog'
import ApiKeyRevokeDialog from '@/components/dashboard/ApiKeyRevokeDialog'
import ApiKeysPricingSelect from '@/components/dashboard/ApiKeysPricingSelect'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useApiKeys, useGenerateApiKey, useRevokeApiKey } from '@/hooks/useApiKeys'

export default function DashboardPage() {
  const { address } = useConnection()
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [showKeyDialog, setShowKeyDialog] = useState(false)
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)
  const [newApiKey, setNewApiKey] = useState<string | null>(null)
  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null)

  // React Query hooks
  const { data: apiKeys = [], isLoading, error } = useApiKeys(address)
  const generateMutation = useGenerateApiKey()
  const revokeMutation = useRevokeApiKey()

  const handleGenerate = async (params: { environment: 'live' | 'test'; name?: string }) => {
    if (!address) return

    try {
      const result = await generateMutation.mutateAsync({
        walletAddress: address,
        ...params,
      })

      setNewApiKey(result.apiKey)
      setShowGenerateDialog(false)
      setShowKeyDialog(true)
    } catch (err) {
      // Error is handled by React Query
      console.error('Generate error:', err)
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
        {(error || generateMutation.error || revokeMutation.error) && (
          <Alert variant="destructive" className="mb-6 max-w-[800px]">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error?.message || 
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
        isGenerating={generateMutation.isPending}
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
