"use client";
import { useState } from "react";
import Link from "next/link";
import ProductDescription from "@/components/ProductDescription";
import ProductAttributes from "@/components/ProductAttributes";
import ThemeToggle from "@/components/ThemeToggle";
import type { Product } from "@/data/products";
export default function AttributePreview() {
  const [product,setProduct] = useState<Product>({ name: "", slug: "", category: "", description: "", gradient: "", specifications: [] });
  return <main className="bg-app text-app min-h-screen"><div className="mx-auto max-w-3xl px-5 py-8"><header className="flex items-center justify-between"><Link href="/admin" className="font-semibold text-zinc-500">← Mi tienda</Link><ThemeToggle /></header><p className="mt-10 text-sm font-semibold uppercase tracking-widest text-zinc-500">Prueba de formulario</p><h1 className="mt-3 text-3xl font-bold">Una ficha para cada producto</h1><p className="text-muted mt-4 leading-7">Escribe el título y la categoría y el formulario cambiarán automáticamente cuando haya una coincidencia clara. Puedes corregir la categoría cuando quieras. Esta prueba no guarda ni publica productos.</p><div className="border-app bg-surface mt-7 space-y-6 rounded-3xl border p-5 sm:p-8"><label className="block text-sm font-semibold">Nombre del producto<input value={product.name} placeholder="Ej. Tenis deportivos para mujer o contenedor de vidrio" className="border-app bg-app mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-500" onChange={e => setProduct({ ...product, name: e.target.value })} /></label><ProductDescription value={product.description} onChange={description => setProduct({ ...product, description })} /><ProductAttributes product={product} onChange={setProduct} />{Boolean(product.specifications?.some(s => s.name && s.value)) && <section className="border-app border-t pt-6"><h2 className="text-xl font-bold">Así verá las características tu cliente</h2><dl className="mt-4 space-y-2">{product.specifications?.filter(s => s.name && s.value).map((s,i) => <div key={i} className="bg-app grid grid-cols-2 gap-4 rounded-xl p-3 text-sm"><dt className="text-muted break-words">{s.name}</dt><dd className="break-words font-semibold">{s.value}</dd></div>)}</dl></section>}</div></div></main>;
}

