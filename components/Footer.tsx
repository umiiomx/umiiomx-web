export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-black">
            Umiio<span className="text-blue-400">Mx</span>
          </h2>

          <p className="mt-3 text-zinc-400">
            Tecnología que te conecta.
          </p>

          <p className="mt-6 text-sm text-zinc-500">
            Venta de tablets, celulares, accesorios,
            smartwatches y tecnología seleccionada
            para todo México.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Productos</h3>

          <ul className="mt-4 space-y-2 text-zinc-400">
            <li>Tablets</li>
            <li>Celulares</li>
            <li>Audífonos</li>
            <li>Accesorios</li>
            <li>Smartwatch</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Contacto</h3>

          <ul className="mt-4 space-y-3 text-zinc-400">
            <li>📱 552 529 1764</li>
            <li>✉️ umiiomx@gmail.com</li>
            <li>
              📍 Lázaro Cárdenas 38
              <br />
              Bodega 315
              <br />
              Centro CDMX
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">
            Síguenos
          </h3>

          <div className="mt-4 flex flex-col gap-3">

            <a
              href="https://facebook.com/Umiiomx"
              target="_blank"
              className="rounded-xl border border-white/10 px-4 py-3 hover:bg-white/5"
            >
              Facebook
            </a>

            <a
              href="https://www.mercadolibre.com.mx/pagina/umiiomx"
              target="_blank"
              className="rounded-xl border border-white/10 px-4 py-3 hover:bg-white/5"
            >
              Mercado Libre
            </a>

            <a
              href="https://wa.me/5624732141"
              target="_blank"
              className="rounded-xl bg-blue-500 px-4 py-3 text-center font-bold hover:bg-blue-600"
            >
              WhatsApp
            </a>

          </div>
        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-zinc-500">
        © 2026 UmiioMx · Todos los derechos reservados.
      </div>
    </footer>
  );
}