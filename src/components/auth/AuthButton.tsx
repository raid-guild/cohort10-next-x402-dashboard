'use client'

import { useState, useEffect } from 'react'
import { useConnection, useSignMessage } from 'wagmi'
import { createSiweMessage } from '@/lib/auth/siwe'

export default function AuthButton() {
    const { address, chainId, isConnected } = useConnection()
    const { signMessageAsync } = useSignMessage()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Reset auth state if wallet disconnects or changes
    useEffect(() => {
        if (!isConnected) {
            setIsAuthenticated(false)
        }
    }, [isConnected, address])

    const handleSignIn = async () => {
        if (!address || !chainId) return

        try {
            setIsLoading(true)

            // 1. Get nonce
            const nonceRes = await fetch('/api/auth/nonce')
            const { nonce } = await nonceRes.json()

            // 2. Create message
            const message = await createSiweMessage(address, chainId, nonce)

            // 3. Sign message
            const signature = await signMessageAsync({ message })

            // 4. Verify signature
            const verifyRes = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, signature }),
            })

            if (!verifyRes.ok) throw new Error('Verification failed')

            const data = await verifyRes.json()
            if (data.success) {
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Sign in failed:', error)
            alert('Sign in failed, please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // If not connected, AppKit handles the UI via <appkit-button />
    // If connected but not authenticated, show Sign In button
    // If authenticated, show generic user info or "Verified"

    return (
        <div className="flex items-center gap-4">
            {isConnected && !isAuthenticated && (
                <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="rounded-md bg-moloch-500 px-4 py-2 text-sm font-medium text-white hover:bg-moloch-600 disabled:opacity-50"
                >
                    {isLoading ? 'Signing in...' : 'Sign In with Ethereum'}
                </button>
            )}

            {/* Reown AppKit Button - Handles connection state automatically */}
            <appkit-button />

            {isAuthenticated && <span className="text-sm font-bold text-green-500 hidden sm:block">Verified</span>}
        </div>
    )
}
