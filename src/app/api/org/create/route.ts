import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { name, email, walletAddress } = await request.json()

        if (!name || !email || !walletAddress) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
        }

        const supabase = await createClient()

        // 1. Get User by Wallet
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('wallet_address', walletAddress)
            .single()

        if (userError || !user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
        }

        // 2. Create Organization
        const { error: createError } = await supabase
            .from('organizations')
            .insert({
                name,
                email,
                owner_id: user.id
            })

        if (createError) throw createError

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Create Org Error:', error)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
