import Link from "next/link";
export default function BuyButton({ slug, enabled }: { slug: string; enabled: boolean }) {
  return <div className="space-y-2">{enabled ? <Link href={"/comprar/" + slug} className="brand-gradient block w-full rounded-full px-5 py-3 text-center font-semibold">Comprar en línea</Link> : <><button disabled className="brand-gradient w-full rounded-full px-5 py-3 font-semibold opacity-50">Comprar en línea</button><p className="text-muted text-xs">Compra en línea no disponible. Puedes consultar por WhatsApp.</p></>}</div>;
}

