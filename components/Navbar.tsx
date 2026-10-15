"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Categorías", href: "/categorias" },
  { name: "Mayoreo", href: "/mayoreo" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass border-app fixed inset-x-0 top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-col" onClick={() => setMenuOpen(false)}>
          <span className="text-app text-xl font-semibold tracking-[-0.05em]">
            {SITE_CONFIG.name}
          </span>
          <span className="text-muted hidden truncate text-[9px] font-medium tracking-wide sm:block">
            By UMIIOMX
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted hover:text-app text-sm font-medium transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="showcase-button hidden md:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="border-app bg-surface inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="glass border-app border-t px-5 py-5 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:bg-surface-strong rounded-xl px-4 py-3 font-medium transition"
              >
                {item.name}
              </Link>
            ))}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient mt-2 rounded-full px-5 py-3 text-center font-semibold text-white"
            >
              Contactar por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

