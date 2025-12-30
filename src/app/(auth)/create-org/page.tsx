'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function CreateOrgPage() {
    const router = useRouter()
    const { address } = useAccount()
    const [orgName, setOrgName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!address || !orgName.trim() || !email.trim()) return

        try {
            setIsLoading(true)
            const res = await fetch('/api/org/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: orgName, email, walletAddress: address }),
            })

            if (!res.ok) {
                throw new Error('Failed to create organization')
            }

            const data = await res.json()
            if (data.success) {
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            console.error('Create Org Error:', error)
            alert('Failed to create organization. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex min-h-screen flex-col relative">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="rounded-lg border border-moloch-200  p-8 shadow-sm max-w-xl w-full">
                        <h1 className="type-display-md mb-2 text-4xl font-bold text-moloch-800 text-center">
                            Create an organisation
                        </h1>
                        <p className="mb-8 text-sm text-neutral-600 text-center">
                            Create a shared organisation to manage api keys and access centrally.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="orgName">Organization Name</Label>
                                <Input
                                    id="orgName"
                                    placeholder="e.g. Acme Corp"
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    required

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-moloch-800 text-white hover:bg-moloch-900"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Create Organization'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
