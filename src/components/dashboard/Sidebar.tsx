'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAccount, useDisconnect } from 'wagmi'
import { createClient } from '@/lib/supabase/client'
import {
    CreditCard,
    Key,
    LayoutDashboard,
    Settings,
    Users,
    Loader2,
    LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { name: 'Usage', href: '/dashboard/usage', icon: CreditCard },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const [orgName, setOrgName] = useState<string>('')
    const [isLoadingOrg, setIsLoadingOrg] = useState(true)

    useEffect(() => {
        async function fetchOrg() {
            if (!address) return

            const supabase = createClient()
            try {
                // 1. Get user by wallet
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('id')
                    .eq('wallet_address', address)
                    .single()

                if (userError || !userData) {
                    // console.error('User fetch error:', userError)
                    return
                }

                // 2. Get first organization owned by user
                const { data: orgData, error: orgError } = await supabase
                    .from('organizations')
                    .select('name')
                    .eq('owner_id', userData.id)
                    .single()

                if (orgData) {
                    setOrgName(orgData.name)
                }
            } catch (error) {
                console.error('Org fetch error:', error)
            } finally {
                setIsLoadingOrg(false)
            }
        }

        fetchOrg()
    }, [address])

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            disconnect()
            router.push('/')
            router.refresh()
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }


    return (
        <div className="flex h-screen w-64 flex-col border-r border-moloch-800 bg-neutral-100">
            <div className="flex h-16 items-center border-b border-moloch-200 px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className="type-display-sm text-lg font-bold text-moloch-900">x402RG</span>
                </Link>
            </div>

            <div className="p-4">
                <Select value={orgName || "loading"} disabled={isLoadingOrg}>
                    <SelectTrigger className="w-full bg-white border-moloch-200">
                        <SelectValue placeholder="Select Organization">
                            {isLoadingOrg ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                orgName || "Create Organization"
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {orgName ? (
                            <SelectItem value={orgName}>{orgName}</SelectItem>
                        ) : (
                            <SelectItem value="loading">Loading...</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            <div className="px-4 py-2">
                <p className="px-2 text-xs font-semibold uppercase text-moloch-500 mb-2">Developers</p>
                <nav className="flex flex-col space-y-1">
                    {navigation.map((item) => {
                        const active = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    active
                                        ? 'bg-moloch-100 text-moloch-900'
                                        : 'text-moloch-700 hover:bg-neutral-200 hover:text-moloch-900'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="mt-auto border-t border-moloch-200 p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-moloch-700 hover:bg-neutral-200 outline-none">
                            <div className="h-6 w-6 rounded-full bg-moloch-500"></div>
                            <span>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'User'}</span>
                            <LogOut className="ml-auto h-4 w-4 opacity-50" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
