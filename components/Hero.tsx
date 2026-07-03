export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">

        {/* Texto */}
        <div className="w-full lg:w-1/2">

          <p className="mb-4 tracking-[0.4em] uppercase text-blue-400 text-sm">
            Tienda Oficial
          </p>

          <h1 className="text-6xl font-black leading-tight">
            Tecnología
            <br />
            premium para
            <br />
            tu día a día.
          </h1>

          <p className="mt-8 max-w-xl text-lg text-zinc-300">
            Tablets, celulares, audífonos, accesorios y tecnología
            seleccionada para ofrecer la mejor relación calidad-precio
            en todo México.
          </p>

          <div className="mt-10 flex gap-4">

            <a
              href="#productos"
              className="rounded-full bg-white px-8 py-3 font-bold text-black transition hover:bg-zinc-300"
            >
              Ver productos
            </a>

            <a
              href="https://wa.me/5624732141?text=Hola%20quiero%20información"
              target="_blank"
              className="rounded-full border border-white/20 px-8 py-3 font-bold transition hover:bg-white hover:text-black"
            >
              Cotizar por WhatsApp
            </a>

          </div>

        </div>

        {/* Imagen */}
        <div className="hidden w-1/2 justify-center lg:flex">

          <div className="rounded-[50px] border border-white/10 bg-gradient-to-br from-blue-500 via-cyan-400 to-zinc-900 p-8 shadow-2xl">

            <div className="aspect-square w-[420px] rounded-[35px] bg-black/40 backdrop-blur flex items-center justify-center">

              <span className="text-zinc-400">
                Aquí irá la Tablet Umiio
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}