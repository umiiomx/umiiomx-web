"use client";
import { useState } from "react";
export default function CheckoutForm({ slug }: { slug: string }) {
  const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const input = "border-app bg-app mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-500";
  async function checkout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); const form = new FormData(event.currentTarget);
    try { const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, customer: Object.fromEntries(form.entries()) }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); window.location.assign(data.url); } catch(e) { setError((e as Error).message); setBusy(false); }
  }
  return <form onSubmit={checkout} className="mt-8 space-y-5"><h3 className="font-semibold">Datos de contacto y entrega</h3><label className="block text-sm">Nombre completo<input name="name" autoComplete="name" required maxLength={150} className={input} /></label><label className="block text-sm">Correo<input name="email" type="email" autoComplete="email" required maxLength={254} className={input} /></label><label className="block text-sm">Teléfono<input name="phone" type="tel" autoComplete="tel" required minLength={10} maxLength={25} className={input} /></label><label className="block text-sm">Dirección completa<textarea name="address" autoComplete="street-address" required minLength={20} maxLength={600} rows={4} placeholder="Calle, número, colonia, código postal, ciudad y estado (México)" className={input} /></label><p className="text-muted text-sm">Usaremos estos datos para atender y entregar tu pedido. El pago se realiza en la página segura de Mercado Pago.</p>{error && <p role="alert" className="text-red-500">{error}</p>}<button disabled={busy} className="brand-gradient w-full rounded-full py-3 font-semibold disabled:opacity-50">{busy ? "Preparando tu pedido…" : "Continuar a Mercado Pago"}</button></form>;
}

