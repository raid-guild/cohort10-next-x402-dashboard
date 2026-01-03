'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useConnection, useSignMessage } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { createSiweMessage } from '@/lib/auth/siwe'
import { API_ROUTES, REDIRECT_ROUTES } from '@/lib/routes'
import { ExternalLink } from 'lucide-react' // Using as placeholder for eth icon if needed, or just text

export default function LoginPage() {
    const router = useRouter()
    const { open } = useAppKit()
    const { address, chainId, isConnected } = useConnection()
    const { signMessageAsync } = useSignMessage()
    const [isLoading, setIsLoading] = useState(false)
    const [isSigningIn, setIsSigningIn] = useState(false)

    const handleAction = async () => {
        if (!isConnected) {
            open()
        } else {
            await handleSignIn()
        }
    }

    const handleSignIn = async () => {
        if (!address || !chainId) return

        try {
            setIsSigningIn(true)

            // 1. Get nonce
            const nonceRes = await fetch(API_ROUTES.auth.nonce)
            const { nonce } = await nonceRes.json()

            // 2. Create message
            const message = await createSiweMessage(address, chainId, nonce)

            // 3. Sign message
            const signature = await signMessageAsync({ message })

            // 4. Verify signature
            const verifyRes = await fetch(API_ROUTES.auth.verify, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, signature }),
            })

            if (!verifyRes.ok) throw new Error('Verification failed')

            const data = await verifyRes.json()
            if (data.success) {
                // Redirect to dashboard or onboarding
                router.push(data.redirectTo || REDIRECT_ROUTES.afterLogin)
                router.refresh()
            }
        } catch (error) {
            console.error('Sign in failed:', error)
            alert('Sign in failed. Please try again.')
        } finally {
            setIsSigningIn(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col  relative">
            {/* Center Content */}
            <main className="flex flex-1 flex-col items-center justify-center p-4">
                <div className="w-full max-w-[400px] rounded-lg border border-neutral-200 bg-transparent p-12 text-center">

                    <h1 className="type-display-md mb-2 text-4xl font-bold text-moloch-800">
                        Get started
                    </h1>
                    <p className="mb-8 text-sm text-neutral-600">
                        Choose how you want to get started
                    </p>


                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleAction}
                            disabled={isLoading || isSigningIn}
                            className="flex items-center justify-center gap-2 w-full rounded-md border border-neutral-300 bg-transparent px-4 py-3 text-sm font-medium text-moloch-800 transition-colors hover:bg-neutral-100 disabled:opacity-50"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 12L12 19L17 12M7 12L12 5M7 12L12 13M12 5L17 12M12 5L12 13M17 12L12 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {isSigningIn
                                ? 'Signing in...'
                                : isConnected
                                    ? 'Sign In with Ethereum'
                                    : 'Continue with Ethereum'
                            }
                        </button>
                    </div>

                </div>

                {/* Footer Terms */}
                <div className="mt-8 text-center px-4">
                    <p className="type-body-sm text-xs text-neutral-500">
                        By using <strong>x402RG</strong>, you agree to accept our{' '}
                        <Link href="/terms" className="underline hover:text-moloch-800">
                            Terms of Use
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="underline hover:text-moloch-800">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
