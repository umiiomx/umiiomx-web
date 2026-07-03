const benefits = [
  {
    title: "Envíos a todo México",
    text: "Recibe tus productos por paquetería en diferentes estados de la República.",
  },
  {
    title: "Atención por WhatsApp",
    text: "Resolvemos dudas, cotizaciones y compras de forma directa y rápida.",
  },
  {
    title: "Precios de mayoreo",
    text: "Opciones para clientes finales, revendedores y compras por volumen.",
  },
  {
    title: "Tecnología seleccionada",
    text: "Productos elegidos para ofrecer buena relación entre precio, diseño y funcionalidad.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-400">
          Por qué UmiioMx
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-black md:text-6xl">
          Compra tecnología con atención directa y confianza.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}