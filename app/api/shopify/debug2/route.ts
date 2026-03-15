export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shop = searchParams.get("shop");

  return Response.json({
    ok: true,
    route: "debug2",
    shop,
    message: "Route Shopify debug2 OK"
  });
}
