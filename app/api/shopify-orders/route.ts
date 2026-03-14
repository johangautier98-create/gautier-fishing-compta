import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const clientId = process.env.SHOPIFY_CLIENT_ID
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET
    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN

    if (!clientId || !clientSecret || !storeDomain) {
      return NextResponse.json(
        {
          error: 'Variables Shopify manquantes.',
          hasClientId: !!clientId,
          hasClientSecret: !!clientSecret,
          storeDomain: storeDomain || null,
        },
        { status: 500 }
      )
    }

    const tokenRes = await fetch(`https://${storeDomain}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
      cache: 'no-store',
    })

    const rawText = await tokenRes.text()

    return NextResponse.json({
      step: 'token-request',
      url: `https://${storeDomain}/admin/oauth/access_token`,
      status: tokenRes.status,
      contentType: tokenRes.headers.get('content-type'),
      rawStart: rawText.slice(0, 500),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || 'Erreur inconnue.',
      },
      { status: 500 }
    )
  }
}
