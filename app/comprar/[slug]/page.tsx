import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CheckoutForm from "@/components/CheckoutForm";
import { getProducts, paymentsReady } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import { getWhatsAppUrl } from "@/lib/config";
export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = (await getProducts()).find(p => p.slug === slug);
  if (!product) notFound();
  const enabled = paymentsReady() && Boolean(product.price && product.stock && product.stock > 0);
  const shipping = Number(process.env.SHIPPING_MXN || 0);
  return <><Navbar /><main className="mx-auto min-h-screen max-w-3xl px-5 pb-20 pt-36"><h1 className="text-3xl font-bold">Finaliza tu compra</h1><div className="border-app bg-surface mt-8 rounded-3xl border p-7"><h2 className="text-xl font-bold">{product.name}</h2><p className="text-muted mt-2">1 unidad · {product.price ? formatCurrency(product.price) : "Precio por confirmar"}</p>{enabled ? <><p className="mt-3">Envío: {formatCurrency(shipping)}</p><p className="mt-3 text-2xl font-bold">Total: {formatCurrency(product.price! + shipping)}</p><CheckoutForm slug={slug} /></> : <p className="text-muted mt-5">El pago en línea aún no está disponible para este producto.</p>}<a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="mt-6 block text-center font-semibold text-zinc-500">Prefiero pedir por WhatsApp</a></div></main></>;
}


