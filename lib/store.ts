import "server-only";
import { cookies } from "next/headers";
import { products, type Product } from "@/data/products";

export const storeReady = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export const paymentsReady = () => process.env.ENABLE_ONLINE_PAYMENTS === "true" && Number.isFinite(Number(process.env.SHIPPING_MXN)) && Number(process.env.SHIPPING_MXN) >= 0 && Boolean(process.env.SHIPPING_MXN?.trim()) && storeReady() && Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN && process.env.MERCADOPAGO_WEBHOOK_SECRET && process.env.STORE_URL?.startsWith("https://"));
export async function supabase(endpoint: string, init: RequestInit = {}) {
  if (!storeReady()) throw new Error("Primero conecta el almacenamiento de la tienda.");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const response = await fetch(process.env.SUPABASE_URL + endpoint, { ...init, cache: "no-store", headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json", ...init.headers } });
  if (!response.ok) throw new Error("No se pudo guardar o consultar la tienda. Revisa la conexión y vuelve a intentar.");
  const body = await response.text(); return body ? JSON.parse(body) : null;
}
export async function getProducts(includeHidden = false): Promise<Product[]> {
  if (!storeReady()) return products;
  return supabase("/rest/v1/products?select=*&order=name.asc" + (includeHidden ? "" : "&active=eq.true"));
}
export async function requireAdmin() {
  if (!storeReady()) throw new Error("Configura primero la tienda.");
  const token = (await cookies()).get("unovix-admin")?.value;
  if (!token) throw new Error("Inicia sesión como administrador.");
  const response = await fetch(process.env.SUPABASE_URL + "/auth/v1/user", { cache: "no-store", headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, Authorization: "Bearer " + token } });
  const user = response.ok ? await response.json() : null;
  if (user?.app_metadata?.role !== "admin") throw new Error("Inicia sesión como administrador.");
  return user;
}
export function sameOrigin(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new Error("Solicitud no permitida.");
}
export function apiError(error: unknown, status = 400) { return Response.json({ error: error instanceof Error ? error.message : "No se pudo completar la operación." }, { status }); }

