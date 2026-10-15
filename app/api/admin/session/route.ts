import { cookies } from "next/headers";
import { apiError, requireAdmin, sameOrigin, storeReady } from "@/lib/store";
export async function GET() { try { await requireAdmin(); return Response.json({ authenticated: true }); } catch { return Response.json({ authenticated: false, configured: storeReady() }, { status: 401 }); } }
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    if (!storeReady()) return Response.json({ error: "Falta conectar Supabase para activar el panel." }, { status: 503 });
    const { email, password } = await request.json();
    if (typeof email !== "string" || typeof password !== "string" || email.length > 254 || password.length > 256) throw new Error("Revisa tu correo y contraseña.");
    const response = await fetch(process.env.SUPABASE_URL + "/auth/v1/token?grant_type=password", { method: "POST", headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }), cache: "no-store" });
    const session = await response.json();
    if (!response.ok || session.user?.app_metadata?.role !== "admin") return Response.json({ error: "Acceso no autorizado. Revisa tus datos." }, { status: 401 });
    (await cookies()).set("unovix-admin", session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: Math.min(session.expires_in, 3600) });
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}
export async function DELETE(request: Request) { try { sameOrigin(request); (await cookies()).delete("unovix-admin"); return Response.json({ ok: true }); } catch (error) { return apiError(error); } }
