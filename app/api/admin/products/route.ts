import { validateSpecifications } from "@/lib/product-attributes";
import { apiError, getProducts, requireAdmin, sameOrigin, supabase } from "@/lib/store";
export async function GET() { try { await requireAdmin(); return Response.json(await getProducts(true)); } catch (error) { return apiError(error, 401); } }
export async function POST(request: Request) {
  try {
    sameOrigin(request); await requireAdmin();
    const value = await request.json();
    if (typeof value.name !== "string" || !value.name.trim() || value.name.length > 150 || typeof value.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) || value.slug.length > 150) throw new Error("Revisa el nombre y el identificador del producto.");
    if (typeof value.category !== "string" || !value.category.trim() || value.category.length > 80 || typeof value.description !== "string" || value.description.length > 5000) throw new Error("Revisa la categoría y descripción.");
    if (value.active === true && !value.description.trim()) throw new Error("Agrega una descripción antes de publicar el producto.");
    if (value.price !== null && (typeof value.price !== "number" || !Number.isFinite(value.price) || value.price <= 0 || value.price > 1000000 || Math.round(value.price * 100) / 100 !== value.price)) throw new Error("Escribe un precio válido con hasta dos decimales.");
    if (!Number.isInteger(value.stock) || value.stock < 0 || value.stock > 1000000) throw new Error("Escribe existencias válidas.");
    const prefix = process.env.SUPABASE_URL + "/storage/v1/object/public/product-images/";
    if (!Array.isArray(value.images) || value.images.length > 8 || value.images.some((url: unknown) => typeof url !== "string" || (!url.startsWith(prefix) && !["/products/s26-ultra.png", "/products/s25-ultra.png", "/products/jabonera-jack.png"].includes(url)))) throw new Error("Sube hasta 8 fotos desde el panel.");
    const specifications = validateSpecifications(value.specifications, value.category, value.active === true);
    const product = { specifications, slug: value.slug, name: value.name.trim(), category: value.category.trim(), description: value.description.trim(), price: value.price, stock: value.stock, images: value.images, active: value.active === true, featured: value.featured === true, gradient: "from-purple-200 to-fuchsia-100 dark:from-purple-950 dark:to-zinc-950" };
    await supabase("/rest/v1/products?on_conflict=slug", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(product) });
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}
