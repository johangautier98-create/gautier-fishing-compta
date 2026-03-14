import { NextResponse } from 'next/server'

async function safeJson(res: Response) {
  const text = await res.text()

  try {
    return JSON.parse(text)
  } catch {
    throw new Error(
      `Réponse non JSON reçue (status ${res.status}). Début: ${text.slice(0, 180)}`
    )
  }
}

async function getAdminAccessToken() {
  const clientId = process.env.SHOPIFY_CLIENT_ID
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN

  if (!clientId || !clientSecret || !storeDomain) {
    throw new Error('Variables Shopify manquantes.')
  }

  const tokenRes = await fetch(`https://${storeDomain}/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
    cache: 'no-store',
  })

  const tokenData = await safeJson(tokenRes)

  if (!tokenRes.ok || !tokenData?.access_token) {
    throw new Error(
      tokenData?.error_description ||
      tokenData?.error ||
      JSON.stringify(tokenData) ||
      'Impossible d’obtenir le token Admin API.'
    )
  }

  return tokenData.access_token as string
}

export async function GET() {
  try {
    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN

    if (!storeDomain) {
      return NextResponse.json(
        { error: 'SHOPIFY_STORE_DOMAIN manquant.' },
        { status: 500 }
      )
    }

    const accessToken = await getAdminAccessToken()

    const query = `
      query OrdersList {
        orders(first: 25, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              id
              name
              createdAt
              displayFinancialStatus
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              customer {
                firstName
                lastName
                email
              }
            }
          }
        }
      }
    `

    const res = await fetch(`https://${storeDomain}/admin/api/2026-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    })

    const data = await safeJson(res)

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.errors || data || 'Erreur Shopify GraphQL.' },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Erreur inconnue.' },
      { status: 500 }
    )
  }
}
