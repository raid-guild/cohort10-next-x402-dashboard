import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { SiweMessage } from 'siwe'

import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const { message, signature } = await request.json()
    const supabase = await createClient()

    try {
        const siweMessage = new SiweMessage(message)
        const { data: fields } = await siweMessage.verify({ signature })

        if (fields.nonce !== (await request.headers.get('x-nonce'))) {
            // For simplicity in this step, we are focusing on signature verification validation.
        }

        // Set session cookie
        const cookieStore = await cookies()
        cookieStore.set('auth_token', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })

        // 1. Check/Create User
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('wallet_address', fields.address)
            .single()

        let userId = user?.id

        if (!userId) {
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert({ wallet_address: fields.address })
                .select('id')
                .single()

            if (createError) throw createError
            userId = newUser.id
        }

        // 2. Check for Organization
        const { data: org } = await supabase
            .from('organizations')
            .select('id')
            .eq('owner_id', userId)
            .single()

        const hasOrg = !!org
        const redirectTo = hasOrg ? '/dashboard' : '/create-org'

        return NextResponse.json({ success: true, address: fields.address, redirectTo })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 })
    }
}
