import { requireAdmin, supabase, apiError, sameOrigin } from "@/lib/store";
export async function GET() { try { await requireAdmin(); return Response.json(await supabase("/rest/v1/orders?select=id,status,total,customer,product_name,created_at&order=created_at.desc&limit=100")); } catch (error) { return apiError(error, 401); } }
export async function POST(request: Request) {
  try { sameOrigin(request); await requireAdmin(); const { id } = await request.json(); if (typeof id !== "string" || !/^[0-9a-f-]{36}$/.test(id)) throw new Error("Pedido inválido."); await supabase("/rest/v1/rpc/cancel_store_order", { method: "POST", body: JSON.stringify({ order_id: id }) }); return Response.json({ ok: true }); } catch (error) { return apiError(error); }
}
