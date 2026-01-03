import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { maskApiKey, isApiKeyExpired } from '@/lib/api-keys'

/**
 * GET /api/keys/list?walletAddress=0x...
 * Get all API keys for the user's organization (masked)
 */
export async function GET(request: NextRequest) {
  try {
    // Check for auth cookie
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    
    // Get wallet address from query params
    const walletAddress = request.nextUrl.searchParams.get('walletAddress')
    
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Get the user by wallet address
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get the user's organization
    const { data: organizations, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('owner_id', user.id)
      .limit(1)

    if (orgError || !organizations || organizations.length === 0) {
      return NextResponse.json(
        { error: 'No organization found' },
        { status: 404 }
      )
    }

    const organization = organizations[0]

    // Get all active API keys for this organization
    const { data: apiKeys, error: keysError } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, expires_at, environment, created_at, last_used_at, is_active')
      .eq('organization_id', organization.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    console.log('List query - Org ID:', organization.id)
    console.log('List query - API Keys:', apiKeys)
    console.log('List query - Error:', keysError)

    if (keysError) {
      console.error('Error fetching API keys:', keysError)
      return NextResponse.json(
        { error: 'Failed to fetch API keys' },
        { status: 500 }
      )
    }

    if (!apiKeys || apiKeys.length === 0) {
      return NextResponse.json({
        apiKeys: [],
        count: 0,
      })
    }

    // Mask the keys and format response
    const maskedKeys = apiKeys.map(key => {
      // Reconstruct masked key from prefix
      const masked = `${key.key_prefix}****...****${key.key_prefix.slice(-4)}`
      const expiresAt = new Date(key.expires_at)
      const isExpired = isApiKeyExpired(expiresAt)

      return {
        id: key.id,
        name: key.name,
        masked,
        expiresAt: expiresAt.toISOString(),
        environment: key.environment,
        isExpired,
        createdAt: key.created_at,
        lastUsedAt: key.last_used_at,
        isActive: key.is_active,
      }
    })

    return NextResponse.json({
      apiKeys: maskedKeys,
      count: maskedKeys.length,
    })

  } catch (error) {
    console.error('Error listing API keys:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
