import { apiError, requireAdmin, sameOrigin } from "@/lib/store";
export async function POST(request: Request) {
  try {
    sameOrigin(request); await requireAdmin();
    if (Number(request.headers.get("content-length")) > 9 * 1024 * 1024) throw new Error("La foto debe pesar menos de 8 MB.");
    const file = (await request.formData()).get("file");
    if (!(file instanceof File) || file.size > 8 * 1024 * 1024 || !file.size) throw new Error("Selecciona una foto de hasta 8 MB.");
    const bytes = new Uint8Array(await file.arrayBuffer());
    const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const png = [137,80,78,71,13,10,26,10].every((b,i) => bytes[i] === b);
    const webp = String.fromCharCode(...bytes.slice(0,4)) === "RIFF" && String.fromCharCode(...bytes.slice(8,12)) === "WEBP";
    const type = jpg ? "image/jpeg" : png ? "image/png" : webp ? "image/webp" : null;
    if (!type) throw new Error("Usa una foto JPG, PNG o WebP.");
    const name = crypto.randomUUID() + (jpg ? ".jpg" : png ? ".png" : ".webp");
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const response = await fetch(process.env.SUPABASE_URL + "/storage/v1/object/product-images/" + name, { method: "POST", headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": type }, body: bytes });
    if (!response.ok) throw new Error("No se pudo subir la foto. Intenta otra vez.");
    return Response.json({ url: process.env.SUPABASE_URL + "/storage/v1/object/public/product-images/" + name });
  } catch (error) { return apiError(error); }
}
