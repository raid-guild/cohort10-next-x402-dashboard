import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { generateApiKey, getKeyPrefix } from '@/lib/api-keys'

/**
 * POST /api/keys/generate
 * Generate a new API key for the user's organization
 */
export async function POST(request: NextRequest) {
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
    
    // Get request body
    const body = await request.json().catch(() => ({}))
    const { walletAddress, environment = 'live', expiryYears = 1, name } = body

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
      .select('id, name, owner_id')
      .eq('owner_id', user.id)
      .limit(1)

    if (orgError || !organizations || organizations.length === 0) {
      return NextResponse.json(
        { error: 'No organization found. Please create an organization first.' },
        { status: 404 }
      )
    }

    const organization = organizations[0]

    // Generate new API key
    const apiKey = await generateApiKey(environment === 'test' ? 'test' : 'live', expiryYears)
    const keyPrefix = getKeyPrefix(apiKey.key)

    console.log('Generated API key for org:', organization.id)
    console.log('Key prefix:', keyPrefix)
    console.log('Environment:', apiKey.environment)

    // Insert into api_keys table
    const { data: insertData, error: insertError } = await supabase
      .from('api_keys')
      .insert({
        organization_id: organization.id,
        name: name || null,
        key_prefix: keyPrefix,
        key_hash: apiKey.hash,
        expires_at: apiKey.expiresAt.toISOString(),
        environment: apiKey.environment,
        is_active: true,
      })
      .select()

    console.log('Insert result:', { data: insertData, error: insertError })

    if (insertError) {
      console.error('Error inserting API key:', insertError)
      return NextResponse.json(
        { error: 'Failed to generate API key', details: insertError.message },
        { status: 500 }
      )
    }

    if (!insertData || insertData.length === 0) {
      console.error('Insert succeeded but no data returned')
      return NextResponse.json(
        { error: 'Failed to create API key - no rows affected' },
        { status: 500 }
      )
    }

    // Return the plain-text key (only time it will be shown)
    return NextResponse.json({
      success: true,
      apiKey: apiKey.key,
      keyId: insertData[0].id,
      expiresAt: apiKey.expiresAt.toISOString(),
      environment: apiKey.environment,
      name: name || null,
      message: 'API key generated successfully. Please save it securely - you won\'t be able to see it again.',
    })

  } catch (error) {
    console.error('Error generating API key:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
