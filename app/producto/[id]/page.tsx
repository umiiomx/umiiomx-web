import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";
import { contact } from "@/data/contact";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        <div>
          <span className="uppercase tracking-widest text-blue-400">
            {product.category}
          </span>

          <h1 className="mt-4 text-5xl font-black">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl font-bold">
            {formatCurrency(product.wholesalePrice)}
          </p>

          <div className="mt-10">
            <a
              href={`https://wa.me/${contact.salesWhatsapp}?text=${encodeURIComponent(
                `Hola, me interesa el producto ${product.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-blue-500 px-8 py-4 font-bold transition hover:bg-blue-600"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}