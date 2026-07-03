export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        <div>
          <h1 className="text-2xl font-black text-white">
            Umiio<span className="text-blue-400">Mx</span>
          </h1>

          <p className="text-xs text-blue-400">
            Tecnología que te conecta
          </p>
        </div>

        <nav className="hidden gap-8 text-white md:flex">
          <a href="#">Inicio</a>
          <a href="#">Productos</a>
          <a href="#">Categorías</a>
          <a href="#">Mayoreo</a>
          <a href="#">Contacto</a>
        </nav>

        <a
          href="https://wa.me/5624732141"
          className="rounded-full bg-blue-500 px-6 py-2 font-semibold text-white transition hover:bg-blue-400"
        >
          WhatsApp
        </a>

      </div>
    </header>
  );
}