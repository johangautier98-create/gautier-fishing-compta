import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const clientId = process.env.SHOPIFY_CLIENT_ID
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET
    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN

    if (!clientId || !clientSecret || !storeDomain) {
      return NextResponse.json({
        ok: false,
        step: 'env',
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        storeDomain: storeDomain || null,
      })
    }

    const res = await fetch(`https://${storeDomain}/admin/oauth/access_token`, {
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

    const raw = await res.text()

    return NextResponse.json({
      ok: res.ok,
      step: 'token',
      status: res.status,
      contentType: res.headers.get('content-type'),
      rawStart: raw.slice(0, 500),
    })
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      step: 'catch',
      error: error?.message || 'Erreur inconnue',
    })
  }
}
