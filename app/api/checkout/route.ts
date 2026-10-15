import { apiError, paymentsReady, sameOrigin, supabase } from "@/lib/store";
export async function POST(request: Request) {
  let order: { id: string; total: number; product_name: string; price: number; shipping: number } | undefined;
  try {
    sameOrigin(request);
    if (!paymentsReady()) return Response.json({ error: "El pago en línea todavía no está activado. Puedes pedir por WhatsApp." }, { status: 503 });
    const { slug, customer } = await request.json();
    if (typeof slug !== "string" || !/^[a-z0-9-]{1,150}$/.test(slug) || !customer || typeof customer.name !== "string" || customer.name.trim().length < 2 || customer.name.length > 150 || typeof customer.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) || customer.email.length > 254 || typeof customer.phone !== "string" || !/^[+()\d\s-]{10,25}$/.test(customer.phone) || typeof customer.address !== "string" || customer.address.trim().length < 20 || customer.address.length > 600) throw new Error("Revisa tus datos de contacto y dirección de entrega.");
    order = await supabase("/rest/v1/rpc/create_store_order", { method: "POST", body: JSON.stringify({ product_slug: slug, shipping_amount: Number(process.env.SHIPPING_MXN), buyer: { name: customer.name.trim(), email: customer.email.trim(), phone: customer.phone.trim(), address: customer.address.trim() } }) });
    if (!order) throw new Error("No se pudo crear el pedido. Revisa disponibilidad.");
    const base = process.env.STORE_URL!.replace(/\/$/, "");
    const items = [{ id: slug, title: order.product_name, quantity: 1, currency_id: "MXN", unit_price: order.price }];
    if (order.shipping > 0) items.push({ id: "shipping", title: "Envío", quantity: 1, currency_id: "MXN", unit_price: order.shipping });
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", { method: "POST", headers: { Authorization: "Bearer " + process.env.MERCADOPAGO_ACCESS_TOKEN, "Content-Type": "application/json" }, body: JSON.stringify({ items, payer: { email: customer.email }, external_reference: order.id, back_urls: { success: base + "/pedido", failure: base + "/pedido", pending: base + "/pedido" }, auto_return: "approved", notification_url: base + "/api/mercadopago/webhook", expires: true, expiration_date_from: new Date().toISOString(), expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString() }) });
    const preference = await response.json();
    if (!response.ok || !preference.init_point) throw new Error("Mercado Pago no pudo iniciar el pago. Intenta más tarde.");
    await supabase("/rest/v1/orders?id=eq." + order.id, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ preference_id: preference.id }) });
    const url = process.env.MERCADOPAGO_TEST_MODE === "true" ? preference.sandbox_init_point : preference.init_point;
    if (!url || !new URL(url).hostname.endsWith("mercadopago.com.mx")) throw new Error("No se pudo abrir el pago de forma segura.");
    return Response.json({ url });
  } catch (error) {
    if (order) { try { await supabase("/rest/v1/rpc/cancel_store_order", { method: "POST", body: JSON.stringify({ order_id: order.id }) }); } catch { /* A failed release remains visible to the owner as a pending order. */ } }
    return apiError(error);
  }
}
