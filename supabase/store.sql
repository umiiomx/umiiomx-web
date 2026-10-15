-- Ejecutar una vez en el editor SQL de un proyecto nuevo de Supabase.
create table if not exists public.products (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  category text not null,
  description text not null default '',
  gradient text not null default 'from-purple-200 to-fuchsia-100 dark:from-purple-950 dark:to-zinc-950',
  price numeric(12,2) check (price > 0),
  stock integer not null default 0 check (stock >= 0),
  images jsonb not null default '[]',
  active boolean not null default false,
  featured boolean not null default false
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  slug text not null references public.products(slug),
  product_name text not null,
  price numeric(12,2) not null,
  shipping numeric(12,2) not null,
  total numeric(12,2) not null,
  customer jsonb not null,
  status text not null default 'pending',
  reserved boolean not null default true,
  preference_id text,
  payment_id text,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
alter table public.orders enable row level security;
-- No hay políticas públicas: solo el servidor con service_role accede a tablas y pedidos.
revoke all on public.products, public.orders from anon, authenticated;
grant all on public.products, public.orders to service_role;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 8388608, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
-- El bucket es público para ver imágenes, pero no hay políticas de escritura pública.

create or replace function public.create_store_order(product_slug text, shipping_amount numeric, buyer jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare p public.products%rowtype; result public.orders%rowtype;
begin
  if shipping_amount < 0 or shipping_amount > 100000 then raise exception 'Invalid shipping'; end if;
  select * into p from public.products where slug = product_slug for update;
  if not found or not p.active or p.stock < 1 or p.price is null then raise exception 'Product unavailable'; end if;
  update public.products set stock = stock - 1 where slug = product_slug;
  insert into public.orders(slug,product_name,price,shipping,total,customer)
  values(p.slug,p.name,p.price,shipping_amount,p.price+shipping_amount,buyer) returning * into result;
  return to_jsonb(result);
end; $$;

create or replace function public.cancel_store_order(order_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare o public.orders%rowtype;
begin
  select * into o from public.orders where id = order_id for update;
  if not found or o.status not in ('pending','rejected','cancelled') then return; end if;
  if o.reserved then update public.products set stock = stock + 1 where slug = o.slug; end if;
  update public.orders set reserved = false, status = 'cancelled' where id = order_id;
end; $$;

create or replace function public.process_store_payment(order_id uuid, payment_id text, payment_status text, amount numeric, currency text)
returns void language plpgsql security definer set search_path = public as $$
declare o public.orders%rowtype; remaining integer;
begin
  select * into o from public.orders where id = order_id for update;
  if not found then raise exception 'Unknown order'; end if;
  if currency <> 'MXN' or amount <> o.total then raise exception 'Payment amount mismatch'; end if;
  -- Consultamos siempre el pago remoto y hacemos las transiciones idempotentes.
  if o.status in ('approved','paid_review','refunded','charged_back') then
    if o.payment_id = process_store_payment.payment_id and payment_status in ('refunded','charged_back') then
      update public.orders set status = payment_status where id = order_id;
    end if;
    return;
  end if;
  if payment_status = 'approved' then
    if not o.reserved then
      update public.products set stock = stock - 1 where slug = o.slug and stock > 0 returning stock into remaining;
      if not found then
        update public.orders set status = 'paid_review', payment_id = process_store_payment.payment_id where id = order_id;
        return;
      end if;
    end if;
    update public.orders set status = 'approved', reserved = true, payment_id = process_store_payment.payment_id where id = order_id;
  elsif payment_status in ('rejected','cancelled') then
    if o.reserved then update public.products set stock = stock + 1 where slug = o.slug; end if;
    update public.orders set status = payment_status, reserved = false, payment_id = process_store_payment.payment_id where id = order_id;
  end if;
end; $$;
revoke all on function public.create_store_order(text,numeric,jsonb) from public,anon,authenticated;
revoke all on function public.cancel_store_order(uuid) from public,anon,authenticated;
revoke all on function public.process_store_payment(uuid,text,text,numeric,text) from public,anon,authenticated;
grant execute on function public.create_store_order(text,numeric,jsonb) to service_role;
grant execute on function public.cancel_store_order(uuid) to service_role;
grant execute on function public.process_store_payment(uuid,text,text,numeric,text) to service_role;

-- Catálogo inicial: conserva datos existentes sin inventar precios ni existencias.
insert into public.products(slug,name,category,description,active) values
('rikkai-s25','Rikkai S25','Tabletas','Tableta de 10.1 pulgadas con accesorios y conectividad para trabajo, estudio y entretenimiento.',true),
('rikkai-a9-plus','Rikkai A9+','Tabletas','Una opción práctica con diseño moderno, accesorios completos y funciones para el uso diario.',true),
('asumi-i17-plus','Asumi i17 Plus','Tabletas','Pantalla amplia, almacenamiento generoso y conectividad para distintos escenarios de uso.',true),
('pz886','PZ886','Celulares','Smartphone compacto pensado para llamadas, mensajería y funciones esenciales.',true),
('power-bank','Power Bank','Accesorios','Energía portátil para mantener tus dispositivos disponibles durante el día.',true),
('cable-um-l42','Cable UM-L42','Cables','Familia de cables para distintas conexiones y necesidades de carga.',true)
on conflict (slug) do nothing;

-- Añadir características al catálogo existente (conserva los productos).
alter table public.products add column if not exists specifications jsonb not null default '[]'::jsonb;

-- Conserva los productos previamente publicados al conectar el almacenamiento.
insert into public.products(slug,name,category,description,price,stock,images,active,featured,specifications) values
('s26-ultra','Tablet S26 Ultra','Tabletas','Tablet Android 15 con pantalla de 10.1 pulgadas, ranura SIM y accesorios incluidos.',1699,25,'["/products/s26-ultra.png"]'::jsonb,true,true,'[{"name":"Marca","value":"Umiio"},{"name":"Modelo","value":"S26 Ultra"}]'::jsonb),
('s25-ultra','Tablet S25 Ultra','Tabletas','Tablet modelo anterior disponible hasta agotar existencias.',1599,12,'["/products/s25-ultra.png"]'::jsonb,true,true,'[{"name":"Marca","value":"Umiio"},{"name":"Modelo","value":"S25 Ultra"}]'::jsonb),
('jabonera-jack','Jabonera Jack','Hogar','Jabonera dispensadora con diseño decorativo para baño o cocina.',null,40,'["/products/jabonera-jack.png"]'::jsonb,true,true,'[{"name":"Marca","value":"Umiio"},{"name":"Modelo","value":"Jack"}]'::jsonb)
on conflict (slug) do nothing;
