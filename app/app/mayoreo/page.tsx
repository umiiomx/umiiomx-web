import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Mayoreo",
};

export default function WholesalePage() {
  const url = getWhatsAppUrl(
    "Hola, quiero información sobre precios y compras de mayoreo en UNOVIX."
  );

  return (
    <div className="bg-app text-app min-h-screen">
      <Navbar />
      <main className="mx-auto flex min-h-[75vh] max-w-5xl items-center px-5 pb-24 pt-36 sm:px-6">
        <section className="border-app bg-surface relative w-full overflow-hidden rounded-[2rem] border p-8 shadow-2xl sm:p-14">
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-zinc-500/20 blur-3xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
            Ventas de mayoreo
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Haz crecer tu negocio con tecnología seleccionada.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-8">
            Solicita disponibilidad, escalas de precio y condiciones para
            distribuidores. La cotización se prepara de acuerdo con productos y
            volumen.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-gradient mt-9 inline-flex rounded-full px-7 py-3.5 font-semibold text-white shadow-lg shadow-zinc-500/20 transition hover:scale-[1.02]"
          >
            Solicitar cotización
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

