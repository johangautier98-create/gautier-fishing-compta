import { NextResponse } from 'next/server'

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
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  })

  const tokenData = await tokenRes.json()

  if (!tokenRes.ok || !tokenData?.access_token) {
    throw new Error(tokenData?.error || 'Impossible d’obtenir le token Admin API.')
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
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.errors || 'Erreur Shopify GraphQL.' },
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
