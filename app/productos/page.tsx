import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categoryPath } from "@/lib/product-attributes";
import { getProducts } from "@/lib/store";
export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ categoria?: string; familia?: string; grupo?: string }> }) {
  const { categoria, familia, grupo } = await searchParams;
  const products = (await getProducts()).filter(p => (!categoria || p.category === categoria) && (!familia || categoryPath(p.category)[0] === familia) && (!grupo || (grupo === "audio" ? /audífono|bocina/i.test(p.category) : grupo === "hogar" ? /Hogar|Electrodomésticos/.test(categoryPath(p.category)[0]) : true)));
  return <><Navbar /><main className="mx-auto min-h-screen max-w-7xl px-5 pb-20 pt-36"><p className="font-semibold text-zinc-500">Catálogo UNOVIX</p><h1 className="mt-3 text-4xl font-bold">{categoria || familia || (grupo === "audio" ? "Audio" : grupo === "hogar" ? "Hogar" : "Todos los productos")}</h1><div className="catalog-grid mt-10">{products.map(p => <ProductCard key={p.slug} product={p} />)}</div>{!products.length && <p className="text-muted mt-8">Todavía no hay productos en esta categoría.</p>}</main><Footer /></>;
}

