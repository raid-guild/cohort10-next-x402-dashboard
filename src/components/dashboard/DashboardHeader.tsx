'use client'

import { ExternalLink, CloudUpload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardHeaderProps {
    title: string
    children?: React.ReactNode
}

export default function DashboardHeader({ title, children }: DashboardHeaderProps) {
    return (
        <header className="flex h-16 items-center justify-between rounded-tl-xl z-20 relative  px-8">
            <div className="flex items-center gap-4">
                {/* Could add sidebar toggle here for mobile */}
                <h1 className="type-display-sm text-2xl font-bold text-moloch-900">{title}</h1>
            </div>
            <div className="flex items-center gap-4">
                {children}
                <Button variant="secondary" size="sm" className="gap-2">
                    Open docs
                    <ExternalLink className="h-4 w-4" />
                </Button>
                <Button size="sm" className="gap-2 bg-moloch-800 text-white hover:bg-moloch-500 cursor-pointer">
                    One-click deploy
                    <CloudUpload className="h-4 w-4" />
                </Button>
            </div>
        </header>
    )
}
