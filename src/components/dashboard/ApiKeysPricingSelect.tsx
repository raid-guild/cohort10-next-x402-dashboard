import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ApiKeysPricingSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-xs bg-white border-neutral-300">
        <SelectValue placeholder="See API key pricing details" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-100">
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-900">Price</span>
            <span className="text-sm text-neutral-900">$5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-900">Network</span>
            <span className="text-sm text-neutral-900">EVM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-900">Recipient</span>
            <span className="text-sm text-neutral-900">RaidGuild</span>
          </div>
        </div>
      </SelectContent>
    </Select>
  )
}
