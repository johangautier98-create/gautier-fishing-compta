import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')
    const code = req.nextUrl.searchParams.get('code')
    const state = req.nextUrl.searchParams.get('state')

    const savedState = req.cookies.get('shopify_oauth_state')?.value
    const clientId = process.env.SHOPIFY_CLIENT_ID
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET

    if (!shop || !code || !state) {
      return NextResponse.json(
        { error: 'Paramètres OAuth manquants.' },
        { status: 400 }
      )
    }

    if (!savedState || savedState !== state) {
      return NextResponse.json(
        { error: 'State OAuth invalide.' },
        { status: 400 }
      )
    }

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Variables Shopify manquantes.' },
        { status: 500 }
      )
    }

    const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    const tokenText = await tokenRes.text()

    let tokenData: any
    try {
      tokenData = JSON.parse(tokenText)
    } catch {
      return NextResponse.json(
        {
          error: 'Réponse Shopify non JSON.',
          rawStart: tokenText.slice(0, 300),
        },
        { status: 500 }
      )
    }

    if (!tokenRes.ok || !tokenData?.access_token) {
      return NextResponse.json(
        { error: tokenData },
        { status: tokenRes.status || 500 }
      )
    }

    const response = NextResponse.redirect(
      'https://gautier-fishing-compta.vercel.app/ventes'
    )

    response.cookies.set('shopify_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Erreur OAuth Shopify.' },
      { status: 500 }
    )
  }
}
