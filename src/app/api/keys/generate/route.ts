import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { generateApiKey, getKeyPrefix } from '@/lib/api-keys'

const PAYMENT_TIMEOUT_SECONDS = 600
const USDC_DECIMALS = 6
const KEY_EXPIRY_DAYS = 30

function parseUsdcAmount(amountDecimal: string) {
  const normalized = amountDecimal.trim()
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error('Invalid PRICE_IN_USDC value')
  }

  const [whole = '0', fraction = ''] = normalized.split('.')
  const paddedFraction = `${fraction}000000`.slice(0, USDC_DECIMALS)
  const amount =
    BigInt(whole) * BigInt(10 ** USDC_DECIMALS) + BigInt(paddedFraction)

  return {
    amount: amount.toString(),
    amountDecimal: normalized,
  }
}

function buildPaymentRequirements() {
  const facilitatorUrl = process.env.X402_FACILITATOR_URL
  const facilitatorKey = process.env.X402_FACILITATOR_API_KEY
  const recipient = process.env.SERVICE_RECIPIENT_ADDRESS
  const asset = process.env.USDC_BASE_ADDRESS
  const priceInUsdc = process.env.PRICE_IN_USDC || '0.1'

  if (!facilitatorUrl || !facilitatorKey || !recipient || !asset) {
    throw new Error('Missing x402 facilitator configuration')
  }

  const { amount, amountDecimal } = parseUsdcAmount(priceInUsdc)

  return {
    paymentRequirements: {
      scheme: 'exact' as const,
      network: 'eip155:8453',
      asset,
      payTo: recipient,
      amount,
      amountDecimal,
      maxTimeoutSeconds: PAYMENT_TIMEOUT_SECONDS,
      extra: {
        name: 'USD Coin',
        version: '2',
      },
      x402Version: 2,
    },
    facilitatorUrl,
    facilitatorKey,
  }
}

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

    const { paymentRequirements, facilitatorUrl, facilitatorKey } =
      buildPaymentRequirements()

    const paymentHeader = request.headers.get('X-402-Payment')

    if (!paymentHeader) {
      return NextResponse.json(
        { paymentRequirements },
        { status: 402 }
      )
    }

    let paymentPayload: unknown
    try {
      paymentPayload = JSON.parse(paymentHeader)
    } catch (error) {
      console.error('Invalid X-402-Payment header:', error)
      return NextResponse.json(
        { error: 'Invalid X-402-Payment header' },
        { status: 400 }
      )
    }

    console.log('x402 verify -> sending to facilitator')
    const verifyResponse = await fetch(`${facilitatorUrl}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': facilitatorKey,
      },
      body: JSON.stringify(paymentPayload),
    })

    const verifyData = await verifyResponse.json().catch(() => ({}))
    console.log('x402 verify <- response', {
      status: verifyResponse.status,
      ok: verifyResponse.ok,
      body: verifyData,
    })

    if (!verifyResponse.ok || !verifyData?.isValid) {
      console.error('x402 verify failed:', verifyData)
      return NextResponse.json(
        { error: 'Payment verification failed', paymentRequirements },
        { status: 402 }
      )
    }

    console.log('x402 settle -> sending to facilitator')
    const settleResponse = await fetch(`${facilitatorUrl}/settle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': facilitatorKey,
      },
      body: JSON.stringify(paymentPayload),
    })

    const settleData = await settleResponse.json().catch(() => ({}))
    console.log('x402 settle <- response', {
      status: settleResponse.status,
      ok: settleResponse.ok,
      body: settleData,
    })

    if (!settleResponse.ok) {
      console.error('x402 settle failed:', settleData)
      return NextResponse.json(
        { error: 'Payment settlement failed', paymentRequirements },
        { status: 402 }
      )
    }

    // Generate new API key
    const apiKey = await generateApiKey(
      environment === 'test' ? 'test' : 'live',
      expiryYears,
      KEY_EXPIRY_DAYS
    )
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
        key_plaintext: apiKey.key,
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
