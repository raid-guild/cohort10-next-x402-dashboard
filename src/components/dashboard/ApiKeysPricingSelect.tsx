import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ApiKeysPricingSelect() {
  const price = process.env.NEXT_PUBLIC_PRICE_IN_USDC || '0.1'
  const recipient = process.env.NEXT_PUBLIC_SERVICE_RECIPIENT_ADDRESS || 'RaidGuild'
  const displayRecipient =
    recipient.startsWith('0x') && recipient.length > 10
      ? `${recipient.slice(0, 6)}...${recipient.slice(-4)}`
      : recipient

  return (
    <Select>
      <SelectTrigger className="w-full max-w-xs bg-white border-neutral-300">
        <SelectValue placeholder="See API key pricing details" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-100">
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-900">Price</span>
            <span className="text-sm text-neutral-900">{price} USDC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-900">Network</span>
            <span className="text-sm text-neutral-900">Base</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-900">Recipient</span>
            <span className="text-sm text-neutral-900">{displayRecipient}</span>
          </div>
        </div>
      </SelectContent>
    </Select>
  )
}
