import Link from "next/link";
import type { Product } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/config";
import { formatCurrency } from "@/lib/format";
import ProductVisual from "@/components/ProductVisual";
export default function ProductCard({ product }: { product: Product }) {
  const kind = /tableta/i.test(product.category) ? "tablet" : /celular/i.test(product.category) ? "phone" : /audio|bocina/i.test(product.category) ? "audio" : /termo|vajilla/i.test(product.category) ? "home" : "accessory";
  return <article className="catalog-card"><div className="catalog-card-copy"><p className="catalog-category">{product.category}</p><h3>{product.name}</h3><p className="catalog-description">{product.description}</p></div><Link href={"/producto/"+product.slug} aria-label={"Ver " + product.name} className="catalog-product-art">{product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain"/> : <ProductVisual kind={kind}/>}</Link><div className="catalog-card-bottom"><p className="catalog-price">{product.price ? formatCurrency(product.price) : "Consulta el precio"}</p>{product.stock===0 && <p className="text-muted text-xs">Agotado</p>}<div className="catalog-card-actions"><Link href={"/producto/"+product.slug} className="showcase-button">Ver producto</Link><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="showcase-link">Consultar <span aria-hidden="true">›</span></a></div></div></article>;
}


