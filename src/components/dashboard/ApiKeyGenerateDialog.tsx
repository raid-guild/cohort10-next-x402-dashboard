import { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface ApiKeyGenerateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (params: { environment: 'live' | 'test'; name?: string }) => Promise<void>
  isGenerating: boolean
}

export default function ApiKeyGenerateDialog({
  open,
  onOpenChange,
  onGenerate,
  isGenerating,
}: ApiKeyGenerateDialogProps) {
  const [environment, setEnvironment] = useState<'live' | 'test'>('live')
  const [keyName, setKeyName] = useState('')

  const handleGenerate = async () => {
    await onGenerate({
      environment,
      name: keyName || undefined,
    })
    // Reset form
    setKeyName('')
    setEnvironment('live')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6" style={{ width: '373px', maxWidth: '373px' }}>
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-serif font-normal text-neutral-900 mb-1">
              Generate API Key
            </h2>
            <p className="text-sm text-neutral-600">
              create a new API key for your organization.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="key-name" className="text-sm text-neutral-700">
                Key Name (Optional)
              </Label>
              <Input
                id="key-name"
                placeholder="e.g., Production Server"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="bg-neutral-50 border-neutral-300"
              />
              <p className="text-xs text-neutral-500">
                Give this key a name to help identify it later
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment" className="text-sm text-neutral-700">
                Environment
              </Label>
              <Select value={environment} onValueChange={(v) => setEnvironment(v as 'live' | 'test')}>
                <SelectTrigger id="environment" className="bg-neutral-50 border-neutral-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Production (rg_live_...)</SelectItem>
                  <SelectItem value="test">Test (rg_test_...)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-neutral-500">
                {environment === 'live'
                  ? 'Use for production environments'
                  : 'Use for development and testing'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 bg-[#2D1810] hover:bg-[#3D2418] py-2.5! text-white rounded-lg h-11 type-body-base capitalize! font-normal! text-base!"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 border-moloch-800 border-1 text-moloch-900 hover:bg-neutral-50 rounded-lg h-11 type-body-base capitalize! font-normal! text-base!"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
