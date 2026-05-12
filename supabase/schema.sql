create table if not exists public.gifts (
    id text primary key,
    category text not null,
    name text not null,
    price integer,
    detail text not null,
    sort_order integer not null,
    reserved_by_name text,
    reserved_by_phone text,
    confirmed_at timestamptz
);

create unique index if not exists gifts_name_key on public.gifts (name);
create index if not exists gifts_sort_order_idx on public.gifts (sort_order);