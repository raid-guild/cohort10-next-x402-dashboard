import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'

interface ApiKeyRevokeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRevoke: () => Promise<void>
  isRevoking: boolean
}

export default function ApiKeyRevokeDialog({
  open,
  onOpenChange,
  onRevoke,
  isRevoking,
}: ApiKeyRevokeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke API Key</DialogTitle>
          <DialogDescription>
            Are you sure you want to revoke this API key?
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This action cannot be undone. Any applications using this key will immediately lose access.
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onRevoke} disabled={isRevoking}>
            {isRevoking ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Revoking...
              </>
            ) : (
              'Revoke Key'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
