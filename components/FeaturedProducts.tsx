import Link from "next/link";
import { getProducts } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
export default async function FeaturedProducts() { const products=await getProducts(); const featured=products.filter(p=>p.featured); return <section id="productos" className="catalog-section"><div className="showcase-container"><div className="section-heading"><h2>Descubre tu próximo favorito.</h2><Link href="/productos" className="showcase-link">Ver todo <span aria-hidden="true">›</span></Link></div><p className="section-intro">Mira los detalles. Elige a tu manera.</p><div className="catalog-grid">{(featured.length?featured:products).slice(0,6).map(p=><ProductCard key={p.slug} product={p}/>)}</div>{!products.length&&<p className="text-muted mt-8">Estamos preparando nuevos productos.</p>}</div></section>; }

