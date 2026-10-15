"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Check, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const options = [
  { value: "light", label: "Claro", detail: "Un estilo fresco y luminoso", icon: Sun },
  { value: "dark", label: "Oscuro", detail: "Menos brillo, más contraste", icon: Moon },

];

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const effectiveTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";
  const current = options.find((option) => option.value === effectiveTheme) ?? options[0];
  const Icon = current.icon;

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Cambiar tema: ${current.label}`}
        aria-expanded={open}
        aria-controls={panelId}
        title="Cambiar apariencia"
        className="text-app inline-flex h-10 items-center justify-center gap-2 rounded-full border border-zinc-500/30 bg-zinc-500/10 px-3 shadow-sm transition duration-200 hover:border-zinc-500/70 hover:bg-zinc-500/20 hover:shadow-md hover:shadow-zinc-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:text-zinc-100"
      >
        <Icon aria-hidden="true" className="h-[18px] w-[18px] text-zinc-600 dark:text-zinc-300" strokeWidth={1.8} />
        <span className="hidden text-sm font-semibold lg:inline">{current.label}</span>
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 opacity-60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div id={panelId} role="group" aria-label="Apariencia de la página" className="border-app bg-surface text-app absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border p-2 shadow-xl shadow-black/15 dark:shadow-black/40">
          <p className="text-muted px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.2em]">Apariencia</p>
          {options.map((option) => {
            const OptionIcon = option.icon;
            const selected = current.value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${selected ? "bg-zinc-500/15" : "hover:bg-zinc-500/10"}`}
              >
                <OptionIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-zinc-600 dark:text-zinc-300" strokeWidth={1.8} />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{option.label}</span>
                  <span className="text-muted mt-0.5 block text-[11px]">{option.detail}</span>
                </span>
                {selected && <Check aria-hidden="true" className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


