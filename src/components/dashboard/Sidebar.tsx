'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useConnection, useDisconnect } from 'wagmi'
import { createClient } from '@/lib/supabase/client'
import {
    CreditCard,
    Key,
    LayoutDashboard,
    Settings,
    Users,
    Loader2,
    LogOut,
    Coffee,
    Code2,
    TerminalIcon
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
import { AUTH_ROUTES, MAIN_APP_ROUTES, REDIRECT_ROUTES } from '@/lib/routes'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/context/SidebarContext'

const navigation = [
    { name: 'Overview', href: MAIN_APP_ROUTES.dashboard, icon: LayoutDashboard },
    // { name: 'Usage', href: `${MAIN_APP_ROUTES.dashboard}/usage`, icon: CreditCard },
    // { name: 'Team', href: `${MAIN_APP_ROUTES.dashboard}/team`, icon: Users },
    // { name: 'Settings', href: `${MAIN_APP_ROUTES.dashboard}/settings`, icon: Settings },
]

export default function Sidebar() {
    const { isCollapsed } = useSidebar()
    const pathname = usePathname()
    const router = useRouter()
    const { address } = useConnection()
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
            router.push(REDIRECT_ROUTES.afterLogout)
            router.refresh()
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }


    return (
        <div 
            className={cn(
                "flex h-screen flex-col bg-neutral-200 border-r border-neutral-300 transition-all duration-300 ease-in-out",
                isCollapsed ? "w-0 overflow-hidden" : "w-64"
            )}
        >
            {!isCollapsed && (
                <>
                    {/* Organization Selector */}
                    <div className="p-4 pt-5">
                        <Select value={orgName || "loading"} disabled={isLoadingOrg}>
                            <SelectTrigger className="w-full bg-white border-neutral-300 h-10 text-sm font-normal">
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

                    {/* Developers Section */}
                    <div className="px-4 py-2 flex-1">
                        <div className="flex items-center gap-2 px-2 mb-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 16H18" stroke="#29100A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 8L10 12L6 16" stroke="#29100A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 18V6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18Z" stroke="#29100A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <p className="text-xl font-bold text-moloch-800 font-serif">Developers</p>
                        </div>
                        <nav className="flex flex-col space-y-0.5">
                            {navigation.map((item) => {
                                const active = item.href === MAIN_APP_ROUTES.dashboard ? pathname === item.href : pathname.startsWith(item.href)
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-normal transition-colors',
                                            active
                                                ? 'bg-white text-neutral-900 shadow-sm'
                                                : 'text-neutral-700 hover:bg-neutral-200/50 hover:text-neutral-900'
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Buy us a coffee Button */}
                    <div className="p-4">
                        <Button 
                            size="lg"
                            className=" bg-[#2D1810] hover:bg-[#3D2418] text-white text-sm font-normal rounded-lg  shadow-sm"
                            asChild
                        >
                            <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className='text-base! type-body-base! lowercase! font-normal!'>
                                Buy us a coffee
                            </a>
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
