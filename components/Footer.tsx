import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-surface border-app border-t">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Ir al inicio de UNOVIX" className="inline-flex"><BrandLogo footer /></Link>
            <p className="text-muted mt-6 max-w-md leading-7">
              Tecnología, productos para el hogar y detalles para tu día a día.
              Conoce el catálogo y encuentra lo que va contigo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="border-app bg-surface rounded-full border px-5 py-2.5 text-sm font-semibold"
              >
                Correo
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Tienda</h2>
            <ul className="text-muted mt-5 space-y-3 text-sm">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/productos">Productos</Link></li>
              <li><Link href="/categorias">Categorías</Link></li>
              <li><Link href="/mayoreo">Mayoreo</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Ayuda</h2>
            <ul className="text-muted mt-5 space-y-3 text-sm">
              <li><Link href="/contacto">Contacto</Link></li>
              <li><a href={getWhatsAppUrl("Hola, necesito soporte de UNOVIX.")}>Soporte</a></li>
              <li><a href={getWhatsAppUrl("Hola, quiero información sobre garantía.")}>Garantías</a></li>
            </ul>
          </div>
        </div>

        <div className="border-app text-muted mt-14 flex flex-col gap-4 border-t pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} UNOVIX. Todos los derechos reservados.</p>
          <p>umiiomx.com</p>
        </div>
      </div>
    </footer>
  );
}


