'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConnection } from 'wagmi'
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { MAIN_APP_ROUTES } from '@/lib/routes'

export default function CreateOrgPage() {
    const router = useRouter()
    const { address } = useConnection()
    const [orgName, setOrgName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!address || !orgName.trim()) return

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
                router.push(MAIN_APP_ROUTES.dashboard)
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
                    <div className="rounded-lg border border-moloch-300  p-8  max-w-[475px] w-full">
                        <h1 className=" mb-2 text-4xl! font-bold text-moloch-800 text-center type-display-md">
                            Create an organisation
                        </h1>
                        <p className="mb-8 text-base text-neutral-600 text-center">
                            Create a shared organisation to manage api keys and access centrally.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6 max-w-[284px] w-full mx-auto">
                            <div className="space-y-2">
                                <Label htmlFor="orgName">Organization Name</Label>
                                <Input
                                    id="orgName"
                                    placeholder="Enter your org name"
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    required

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email address<span className="text-neutral-400 text-sm">(optional)</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-moloch-800 text-white hover:bg-moloch-900 font-normal! capitalize!"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Create'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
