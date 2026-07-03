const categories = [
  "Tablets",
  "Audífonos",
  "Smartwatch",
  "Bocinas",
  "Cargadores",
  "Accesorios",
];

export default function Categories() {
  return (
    <section id="categorias" className="bg-zinc-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-400">
          Categorías
        </p>

        <h2 className="mt-4 text-4xl font-black md:text-6xl">
          Explora por tipo de producto.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <h3 className="text-2xl font-bold">{item}</h3>
              <p className="mt-3 text-zinc-400">
                Productos seleccionados para venta al público y mayoreo.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}