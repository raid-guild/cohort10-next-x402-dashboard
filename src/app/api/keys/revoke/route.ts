import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/keys/revoke
 * Revoke (soft delete) a specific API key
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
    const { walletAddress, keyId } = body

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    if (!keyId) {
      return NextResponse.json(
        { error: 'Key ID is required' },
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

    // Verify the key belongs to this organization
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('id, organization_id')
      .eq('id', keyId)
      .single()

    if (keyError || !keyData) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      )
    }

    if (keyData.organization_id !== organization.id) {
      return NextResponse.json(
        { error: 'Unauthorized - key does not belong to your organization' },
        { status: 403 }
      )
    }

    // Soft delete the API key by setting is_active to false
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ is_active: false })
      .eq('id', keyId)

    if (updateError) {
      console.error('Error revoking API key:', updateError)
      return NextResponse.json(
        { error: 'Failed to revoke API key' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'API key revoked successfully',
    })

  } catch (error) {
    console.error('Error revoking API key:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
