"use client"

import { ExternalLink, CloudUpload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/context/SidebarContext"
import { docsUrl } from "@/config"

interface DashboardHeaderProps {
    title: string
    children?: React.ReactNode
}

export default function DashboardHeader({ title, children }: DashboardHeaderProps) {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="flex h-16 items-center justify-between rounded-tl-xl z-20 relative  px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center w-8 h-8 hover:bg-neutral-100 rounded transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.25 10L5.5 12L7.25 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.5 21V3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="type-display-sm text-2xl font-bold text-moloch-900">{title}</h1>
            </div>
            <div className="flex items-center gap-4">
                {children}
                <Button variant="secondary" size="sm" className=" bg-white border-white border shadow-sm " asChild>
                    <a href={docsUrl} target="_blank" rel="noopener noreferrer">
                        <span> Open docs</span>
                        <ExternalLink className="h-4.5 w-4.5 ml-3" />
                    </a>
                </Button>
                <Button
                    size="sm"
                    className="gap-2 bg-moloch-800 text-white hover:bg-moloch-500 cursor-pointer"
                    asChild
                >
                    <a
                        href="https://github.com/raid-guild/x402-facilitator-go"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        One-click deploy
                        <CloudUpload className="h-4 w-4" />
                    </a>
                </Button>
            </div>
        </header>
    )
}
