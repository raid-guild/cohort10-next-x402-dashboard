'use client'

import StatusBadge from '@/components/ui/StatusBadge'
import { Trash2 } from 'lucide-react'
import type { ApiKeyData } from '@/types/api-keys'

interface ApiKeysTableProps {
    apiKeys: ApiKeyData[]
    onGenerate?: () => void
    onRevoke?: (keyId: string) => void
}

export default function ApiKeysTable({ apiKeys, onGenerate, onRevoke }: ApiKeysTableProps) {
    if (apiKeys.length === 0) {
        return (
            <div className="rounded-md border border-neutral-300 bg-white p-12 text-center">
                <h3 className="mb-2 text-lg font-medium text-moloch-900">No API Keys Found</h3>
                <p className="text-neutral-600 mb-4">Generate your first API key to get started.</p>
                {onGenerate && (
                    <button 
                        className="bg-[#2D1810] hover:bg-[#3D2418] text-white px-6 py-2 rounded-lg text-sm font-normal transition-colors"
                        onClick={onGenerate}
                    >
                        Generate new key
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className="rounded-md border border-neutral-300 bg-white overflow-hidden">
            <table className="w-full border-collapse">
                <thead className="border-b border-neutral-300">
                    <tr>
                        <th className="px-6 py-3 text-left type-body-lg font-bold! text-black border-r border-neutral-300">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left type-body-lg  font-bold! text-black border-r border-neutral-300">
                            API Key ID
                        </th>
                        <th className="px-6 py-3 text-left type-body-lg font-bold! text-black border-r border-neutral-300">
                            Created
                        </th>
                        <th className="px-6 py-3 text-left type-body-lg font-bold! text-black border-r border-neutral-300">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left type-body-lg font-bold! text-black">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {apiKeys.map((key, index) => (
                        <tr
                            key={key.id}
                            className={index !== apiKeys.length - 1 ? 'border-b border-neutral-300' : ''}
                        >
                            <td className="px-6 py-4 type-body-base text-neutral-900 border-r border-neutral-300">
                                {key.name || <span className="text-neutral-500 italic">Unnamed</span>}
                                {key.environment && (
                                    <span className="ml-2 text-xs px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
                                        {key.environment}
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 type-body-base text-neutral-900 font-mono text-sm border-r border-neutral-300">
                                {key.keyId}
                            </td>
                            <td className="px-6 py-4 type-body-base text-neutral-900 border-r border-neutral-300">
                                {key.createdBy}
                            </td>
                            <td className="px-6 py-4 border-r border-neutral-300">
                                <StatusBadge status={key.status} />
                            </td>
                            <td className="px-6 py-4">
                                {onRevoke && (
                                    <button
                                        onClick={() => onRevoke(key.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                                        title="Revoke this key"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
