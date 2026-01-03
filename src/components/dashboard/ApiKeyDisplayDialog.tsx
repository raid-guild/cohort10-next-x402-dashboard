import { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface ApiKeyDisplayDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  apiKey: string | null
}

export default function ApiKeyDisplayDialog({
  open,
  onOpenChange,
  apiKey,
}: ApiKeyDisplayDialogProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (apiKey) {
      await navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6" style={{ width: '373px', maxWidth: '373px' }}>
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-serif font-normal text-neutral-900 mb-1">
              Your API key
            </h2>
            <p className="text-sm text-neutral-600">
              this key will be shown once. copy and store it securely.
            </p>
          </div>

          {/* API Key Input with Copy Icon */}
          <div className="relative">
            <div
              className={`font-mono text-sm bg-neutral-50 border border-neutral-300 rounded-md px-3 py-2 pr-10 ${
                !isRevealed ? 'blur-sm select-none' : ''
              }`}
            >
              {apiKey || ''}
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-neutral-200 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-neutral-600" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => setIsRevealed(!isRevealed)}
              className="flex-1 bg-[#2D1810] hover:bg-[#3D2418] py-2.5! text-white rounded-lg h-11 type-body-base capitalize! font-normal! text-base!"
            >
              {isRevealed ? 'Hide key' : 'Reveal key'}
            </Button>
            <Button
              onClick={() => {
                setIsRevealed(false)
                onOpenChange(false)
              }}
              variant="outline"
              className="flex-1 border-moloch-800 border-1 text-moloch-900 hover:bg-neutral-50 rounded-lg h-11 type-body-base  capitalize! font-normal! text-base!"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
