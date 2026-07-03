import Image from "next/image";

const products = [
  {
    name: "Tablet S26 Ultra",
    image: "/products/s26-ultra.png",
    price: "$1,350 mayoreo",
    category: "Tablet",
    badge: "Más vendida",
  },
  {
    name: "Tablet S25 Ultra",
    image: "/products/s25-ultra.png",
    price: "$1,280 mayoreo",
    category: "Tablet",
    badge: "Nueva",
  },
  {
    name: "Jabonera Jack",
    image: "/products/jabonera-jack.png",
    price: "Consulta precio",
    category: "Hogar",
    badge: "Nuevo",
  },
];

export default function FeaturedProducts() {
  return (
    <section
      id="productos"
      className="bg-zinc-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-400">
          Productos destacados
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-4xl font-black md:text-6xl">
            Tecnología lista para vender.
          </h2>

          <a
            href="https://wa.me/525525291764"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full bg-blue-500 px-6 py-3 font-bold transition hover:bg-blue-600"
          >
            Pedir catálogo
          </a>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Información */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-400">
                    {product.category}
                  </span>

                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
                    {product.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black">
                  {product.name}
                </h3>

                <p className="mt-2 text-lg font-semibold text-zinc-300">
                  {product.price}
                </p>

                <div className="mt-6 flex gap-3">
                  <a
                    href="https://wa.me/525525291764"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-full bg-white px-4 py-3 text-center text-sm font-bold text-black transition hover:bg-zinc-200"
                  >
                    WhatsApp
                  </a>

                  <button className="flex-1 rounded-full border border-white/10 px-4 py-3 text-sm font-bold transition hover:border-blue-500 hover:bg-blue-500/10">
                    Ver detalles
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}