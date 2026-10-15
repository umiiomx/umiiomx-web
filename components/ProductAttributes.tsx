"use client";
import { useEffect, useRef, useState } from "react";
import { ListChecks, Plus, Sparkles, X } from "lucide-react";
import type { Product } from "@/data/products";
import { changeSpecifications, classifyTitle, categoryPath, getTemplate, normalize, templates, type Specification } from "@/lib/product-attributes";
const input = "border-app bg-app text-app mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-500";
export default function ProductAttributes({ product, onChange, autoDetect = true }: { product: Product; onChange: (product: Product) => void; autoDetect?: boolean }) {
  const [automatic, setAutomatic] = useState(autoDetect);
  const cache = useRef<Record<string, Specification[]>>({});
  const template = getTemplate(product.category);
  const specs = product.specifications || [];
  const fields = new Set(template.fields.map(f => normalize(f.name)));
  const extras = specs.filter(s => !fields.has(normalize(s.name)));
  const classification = classifyTitle(product.name);
  const knownCategory = templates.some(t => t.category === product.category);
  function changeCategory(category: string, manual = true) {
    if (manual) setAutomatic(false);
    cache.current[product.category] = specs;
    const saved = cache.current[category];
    const carried = changeSpecifications(specs, category);
    const merged = saved ? [...saved.filter(s => !carried.some(c => normalize(c.name) === normalize(s.name))), ...carried] : carried;
    onChange({ ...product, category, specifications: merged });
  }
  useEffect(() => {
    if (!automatic || !product.name.trim()) return;
    const timer = setTimeout(() => {
      const result = classifyTitle(product.name);
      const target = result.confident ? result.candidates[0].category : "";
      if (target !== product.category) {
        cache.current[product.category] = product.specifications || [];
        const carried = changeSpecifications(product.specifications || [], target);
        const saved = cache.current[target] || [];
        onChange({ ...product, category: target, specifications: [...saved.filter(s => !carried.some(c => normalize(c.name) === normalize(s.name))), ...carried] });
      }
    }, 650);
    return () => clearTimeout(timer);
  }, [product, automatic, onChange]);
  function setValue(name: string, value: string) {
    const rest = specs.filter(s => normalize(s.name) !== normalize(name));
    onChange({ ...product, specifications: value ? [...rest, { name, value }] : rest });
  }
  function updateExtra(index: number, name: string, value: string) {
    const updated = extras.map((s,i) => i === index ? { name, value } : s);
    onChange({ ...product, specifications: [...specs.filter(s => fields.has(normalize(s.name))), ...updated] });
  }
  return <section className="space-y-5">
    <div className="rounded-2xl border border-zinc-500/25 bg-zinc-500/5 p-4">
      <p className="flex items-center gap-2 font-semibold"><Sparkles size={18} className="text-zinc-500" />{automatic ? "Clasificación automática por título" : "Categoría elegida por ti"}</p>
      <p role="status" aria-live="polite" className="text-muted mt-2 text-sm">{!product.name.trim() ? "Primero escribe qué vas a vender." : !automatic ? "Tu selección se conservará aunque edites el título." : classification.confident ? "La categoría y el formulario se ajustan al título." : classification.candidates.length ? "El título puede pertenecer a varias categorías. Elige la que corresponda." : "No encontramos una coincidencia clara. Agrega más detalles al título o elige la categoría."}</p>
      {product.category && <p className="mt-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">{categoryPath(product.category).join(" → ")}</p>}
      {!automatic && <button type="button" onClick={() => setAutomatic(true)} className="mt-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">Volver a detectar por el título</button>}
      {automatic && !classification.confident && classification.candidates.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{classification.candidates.map(candidate => <button key={candidate.category} type="button" onClick={() => changeCategory(candidate.category)} className="border-app bg-app rounded-full border px-3 py-2 text-sm">{candidate.category}</button>)}</div>}
    </div>
    <label className="block text-sm font-medium">Categoría<select aria-label="Categoría" required value={knownCategory ? product.category : product.category ? "other" : ""} className={input} onChange={e => changeCategory(e.target.value === "other" ? "Otra categoría" : e.target.value)}><option value="" disabled>Escribe el título o selecciona una categoría</option>{Array.from(new Set(templates.map(t => categoryPath(t.category)[0]))).map(group => <optgroup key={group} label={group}>{templates.filter(t => categoryPath(t.category)[0] === group).map(t => <option key={t.category} value={t.category}>{categoryPath(t.category).slice(1).join(" / ") || t.category}</option>)}</optgroup>)}<option value="other">Otra categoría / Personalizada</option></select></label>
    {!knownCategory && product.category && <label className="block text-sm font-medium">Nombre de la categoría<input required maxLength={80} value={product.category} className={input} onChange={e => onChange({ ...product, category: e.target.value })} placeholder="Ej. Juguetes" /></label>}
    <div className="border-app rounded-2xl border p-4 sm:p-5"><h3 className="flex items-center gap-2 text-lg font-bold"><ListChecks size={20} className="text-zinc-500" />Características del producto</h3><p className="text-muted mt-2 text-sm">Formulario de {template.category.toLowerCase()}. Completa los datos reales de tu producto. Los campos con * se necesitan para publicarlo.</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{template.fields.map(f => {
      const value = specs.find(s => normalize(s.name) === normalize(f.name))?.value || "";
      return <label key={f.name} className="block text-sm font-medium">{f.name}{f.required ? " *" : ""}{f.options ? <select className={input} value={value} required={product.active && f.required} onChange={e => setValue(f.name, e.target.value)}><option value="">Seleccionar</option>{f.options.map(option => <option key={option}>{option}</option>)}</select> : <input className={input} maxLength={500} value={value} required={product.active && f.required} placeholder={f.placeholder} onChange={e => setValue(f.name, e.target.value)} />}</label>;
    })}</div><div className="border-app mt-6 border-t pt-5"><h4 className="font-semibold">Más características</h4><p className="text-muted mt-1 text-xs">Agrega cualquier dato que no aparezca en la plantilla.</p><div className="mt-3 space-y-3">{extras.map((spec,index) => <div key={index} className="flex items-end gap-2"><div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2"><label className="text-xs">Nombre del dato<input aria-label={"Nombre de característica adicional " + (index+1)} maxLength={80} className={input} value={spec.name} placeholder="Ej. Resistencia al calor" onChange={e => updateExtra(index,e.target.value,spec.value)} /></label><label className="text-xs">Valor<input aria-label={"Valor de característica adicional " + (index+1)} maxLength={500} className={input} value={spec.value} placeholder="Ej. Hasta 100 °C" onChange={e => updateExtra(index,spec.name,e.target.value)} /></label></div><button type="button" aria-label={"Quitar característica adicional " + (index+1)} onClick={() => onChange({ ...product, specifications: [...specs.filter(s => fields.has(normalize(s.name))), ...extras.filter((_,i) => i !== index)] })} className="border-app mb-1 rounded-full border p-2"><X size={16} /></button></div>)}</div><button type="button" disabled={specs.length >= 50} onClick={() => onChange({ ...product, specifications: [...specs, { name: "", value: "" }] })} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 disabled:opacity-40 dark:text-zinc-300"><Plus size={16} />Agregar característica</button></div></div>
  </section>;
}

