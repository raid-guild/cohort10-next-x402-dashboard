'use client'

import { useState } from 'react'
import { Copy, Check, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface ApiKeyDisplayProps {
  apiKey: string
  masked: string
  expiresAt: string
  environment: 'live' | 'test'
  isExpired: boolean
  isNewKey?: boolean
}

export default function ApiKeyDisplay({
  apiKey,
  masked,
  expiresAt,
  environment,
  isExpired,
  isNewKey = false,
}: ApiKeyDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [showFullKey, setShowFullKey] = useState(isNewKey)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey || masked)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayKey = showFullKey && apiKey ? apiKey : masked

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {environment === 'live' ? 'Production' : 'Test'} API Key
        </CardTitle>
        <CardDescription>
          {isNewKey
            ? 'Save this key securely - you won\'t be able to see it again'
            : 'Use this key to authenticate with the x402 facilitator'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isNewKey && (
          <Alert className="bg-scroll-100 border-scroll-400">
            <AlertCircle className="h-4 w-4 text-scroll-700" />
            <AlertDescription className="text-scroll-800">
              <strong>Important:</strong> Copy and save this key now. For security reasons, you won't be able to view it again.
            </AlertDescription>
          </Alert>
        )}

        {isExpired && !isNewKey && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This API key has expired. Generate a new one to continue using the service.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">API Key</label>
            <div className="flex gap-2">
              {apiKey && !isNewKey && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullKey(!showFullKey)}
                  className="h-8 px-2"
                >
                  {showFullKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className={cn(
            "p-3 rounded-md font-mono text-sm break-all",
            isExpired ? "bg-neutral-100 text-neutral-400" : "bg-neutral-100 text-neutral-900"
          )}>
            {displayKey}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-neutral-600">Environment</p>
            <p className="font-medium capitalize">{environment}</p>
          </div>
          <div>
            <p className="text-neutral-600">Expires</p>
            <p className={cn(
              "font-medium",
              isExpired && "text-red-600"
            )}>
              {new Date(expiresAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isNewKey && (
          <Alert className="bg-neutral-100 border-neutral-300">
            <AlertDescription className="text-sm text-neutral-700">
              <strong>Security Best Practices:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Store this key in a secure location (e.g., environment variables)</li>
                <li>Never commit this key to version control</li>
                <li>Rotate keys regularly for enhanced security</li>
                <li>Use test keys for development and live keys for production</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
