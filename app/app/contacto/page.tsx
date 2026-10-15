import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

export const metadata = {
  title: "Contacto",
};

export default function ContactPage() {
  return (
    <div className="bg-app text-app min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-36 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
          Contacto
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Estamos para ayudarte.
        </h1>
        <p className="text-muted mt-5 max-w-2xl text-lg leading-8">
          Escríbenos para información de productos, disponibilidad, mayoreo,
          soporte o garantía.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover border-app bg-surface rounded-3xl border p-8"
          >
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              WhatsApp
            </p>
            <h2 className="mt-3 text-2xl font-bold">Atención rápida</h2>
            <p className="text-muted mt-3 leading-7">
              Consulta productos, existencias, cotizaciones y soporte.
            </p>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="card-hover border-app bg-surface rounded-3xl border p-8"
          >
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              Correo
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              {SITE_CONFIG.contact.email}
            </h2>
            <p className="text-muted mt-3 leading-7">
              Ideal para solicitudes que requieren documentos o información
              detallada.
            </p>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

