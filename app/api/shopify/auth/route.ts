import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shop = searchParams.get("shop");

  if (!shop) {
    return NextResponse.json({ error: "Paramètre shop manquant." }, { status: 400 });
  }

  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const redirectUri = "https://gautier-fishing-compta.vercel.app/api/shopify/callback";
  const scopes = "read_customers,read_fulfillments,read_inventory,read_orders,read_products";
  const state = "test123";

  const installUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${clientId}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${state}`;

  return NextResponse.redirect(installUrl);
}
