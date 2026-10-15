-- Añadir características al catálogo existente (conserva los productos).
alter table public.products add column if not exists specifications jsonb not null default '[]'::jsonb;
