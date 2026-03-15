import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  const shop = process.env.SHOPIFY_STORE_DOMAIN
  const clientId = process.env.SHOPIFY_CLIENT_ID

  if (!shop || !clientId) {
    return NextResponse.json(
      { error: 'Variables Shopify manquantes.' },
      { status: 500 }
    )
  }

  const redirectUri =
    'https://gautier-fishing-compta.vercel.app/api/shopify/callback'

  const scopes = [
    'read_orders',
    'read_customers',
    'read_products',
    'read_inventory',
    'read_fulfillments',
  ].join(',')

  const state = crypto.randomUUID()

  const authUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${encodeURIComponent(state)}`

  const response = NextResponse.redirect(authUrl)
  response.cookies.set('shopify_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  })

  return response
}
