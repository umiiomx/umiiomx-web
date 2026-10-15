import { createHmac, timingSafeEqual } from "node:crypto";
import { supabase } from "@/lib/store";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret || !process.env.MERCADOPAGO_ACCESS_TOKEN) return new Response("Not configured", { status: 503 });
  const id = new URL(request.url).searchParams.get("data.id")?.toLowerCase();
  const signature = Object.fromEntries((request.headers.get("x-signature") || "").split(",").map(part => part.trim().split("=")));
  const requestId = request.headers.get("x-request-id");
  if (!id || !/^[0-9]+$/.test(id) || !signature.ts || !/^[a-f0-9]{64}$/.test(signature.v1 || "") || !requestId) return new Response("Invalid signature", { status: 401 });
  const manifest = "id:" + id + ";request-id:" + requestId + ";ts:" + signature.ts + ";";
  const expected = createHmac("sha256", secret).update(manifest).digest();
  if (!timingSafeEqual(expected, Buffer.from(signature.v1, "hex"))) return new Response("Invalid signature", { status: 401 });
  try {
    const response = await fetch("https://api.mercadopago.com/v1/payments/" + id, { cache: "no-store", headers: { Authorization: "Bearer " + process.env.MERCADOPAGO_ACCESS_TOKEN } });
    if (!response.ok) throw new Error("Payment lookup failed");
    const payment = await response.json();
    if (!/^[0-9a-f-]{36}$/.test(payment.external_reference || "")) return Response.json({ received: true });
    const expectedLive = process.env.MERCADOPAGO_TEST_MODE !== "true";
    if (payment.live_mode !== expectedLive) return new Response("Invalid payment mode", { status: 400 });
    await supabase("/rest/v1/rpc/process_store_payment", { method: "POST", body: JSON.stringify({ order_id: payment.external_reference, payment_id: String(payment.id), payment_status: payment.status, amount: payment.transaction_amount, currency: payment.currency_id }) });
    return Response.json({ received: true });
  } catch { return new Response("Retry later", { status: 500 }); }
}
