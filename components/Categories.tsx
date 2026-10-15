import Link from "next/link";
import { getProducts } from "@/lib/store";
import { categoryPath } from "@/lib/product-attributes";
import { ArrowUpRight, Headphones, Home, Gamepad2, Smartphone, ShoppingBag, Package } from "lucide-react";
function icon(name: string) { return /audio|electrónica/i.test(name) ? Headphones : /hogar|electrodomésticos/i.test(name) ? Home : /consola|juguete/i.test(name) ? Gamepad2 : /celular|computación/i.test(name) ? Smartphone : /ropa/i.test(name) ? ShoppingBag : Package; }
export default async function Categories({ expanded = false }: { expanded?: boolean }) {
  const products = await getProducts();
  const categories = expanded ? Array.from(new Set(products.map(p => p.category))) : Array.from(new Set(products.map(p => categoryPath(p.category)[0])));
  return <section className="category-section"><div className="showcase-container"><div className="section-heading"><h2>Encuentra lo tuyo.</h2>{!expanded && <Link href="/categorias" className="showcase-link">Ver categorías <span aria-hidden="true">›</span></Link>}</div><p className="section-intro">Explora las categorías de nuestro catálogo.</p><div className="category-list">{categories.map(name => { const Icon=icon(name); return <Link key={name} href={"/productos?" + (expanded ? "categoria=" : "familia=") + encodeURIComponent(name)} className="category-item"><span className="category-icon"><Icon strokeWidth={1.1} size={35}/></span><span>{name}</span><ArrowUpRight size={16}/></Link>; })}</div>{!categories.length && <p className="text-muted mt-6">Próximamente encontrarás aquí nuestras categorías.</p>}</div></section>;
}

