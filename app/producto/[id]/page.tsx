import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuyButton from "@/components/BuyButton";
import { getProducts, paymentsReady } from "@/lib/store";
import { getWhatsAppUrl } from "@/lib/config";
import { formatCurrency } from "@/lib/format";
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getProducts()).find(p => p.slug === id);
  if (!product) notFound();
  return <><Navbar /><main className="mx-auto min-h-screen max-w-6xl px-5 pb-20 pt-36"><div className="grid gap-12 md:grid-cols-2"><div className="space-y-4">{product.images?.length ? product.images.map((image, i) => <img key={image} src={image} alt={product.name + " — foto " + (i+1)} className="border-app bg-surface aspect-square w-full rounded-3xl border object-contain p-6" />) : <div className="bg-surface text-muted flex aspect-square items-center justify-center rounded-3xl">Fotografías próximamente</div>}</div><div><p className="font-semibold text-zinc-500">{product.category}</p><h1 className="mt-4 text-4xl font-bold">{product.name}</h1><p className="mt-6 text-3xl font-bold">{product.price ? formatCurrency(product.price) : "Precio por confirmar"}</p><section className="mt-8"><h2 className="text-xl font-bold">Descripción del producto</h2><p className="text-muted mt-3 whitespace-pre-wrap break-words leading-8">{product.description}</p></section><p className="mt-6 text-sm">{product.stock === undefined ? "Consulta disponibilidad" : product.stock > 0 ? product.stock + " disponibles" : "Agotado"}</p><div className="mt-8 space-y-3"><BuyButton slug={product.slug} enabled={paymentsReady() && Boolean(product.price && product.stock && product.stock > 0)} /><a className="border-app block rounded-full border px-5 py-3 text-center font-semibold" href={getWhatsAppUrl("Hola, quiero pedir " + product.name + ".")} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a></div>{Boolean(product.specifications?.length) && <section className="mt-10"><h2 className="text-2xl font-bold">Características del producto</h2><dl className="border-app mt-5 overflow-hidden rounded-2xl border">{product.specifications?.map((spec,index) => <div key={spec.name} className={"grid grid-cols-2 gap-4 px-4 py-3 text-sm " + (index % 2 === 0 ? "bg-surface" : "bg-app")}><dt className="text-muted break-words">{spec.name}</dt><dd className="break-words font-medium">{spec.value}</dd></div>)}</dl></section>}</div></div></main><Footer /></>;
}

