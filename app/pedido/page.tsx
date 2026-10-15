import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getWhatsAppUrl } from "@/lib/config";
export default function OrderPage() { return <><Navbar /><main className="mx-auto min-h-screen max-w-2xl px-5 pt-40"><h1 className="text-3xl font-bold">Consulta el estado de tu pago</h1><p className="text-muted mt-6 leading-8">Revisa el comprobante y el estado en tu cuenta de Mercado Pago. Volver a esta página no confirma el pago: tu pedido se actualizará cuando Mercado Pago nos notifique el resultado.</p><p className="text-muted mt-4">Si tienes dudas sobre el pago o la entrega, contáctanos con tu comprobante.</p><a href={getWhatsAppUrl("Hola, quiero consultar un pedido realizado en la página.")} className="brand-gradient mt-8 inline-block rounded-full px-6 py-3">Consultar por WhatsApp</a><Link href="/productos" className="mt-6 block font-semibold text-zinc-500">Volver al catálogo</Link></main></>; }

