export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shop = searchParams.get("shop");

  return Response.json({
    ok: true,
    route: "shopify-debug",
    shop,
    message: "Route debug Shopify OK"
  });
}
