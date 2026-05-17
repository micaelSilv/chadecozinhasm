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

create table if not exists public.presence_confirmations (
    id bigint generated always as identity primary key,
    guest_name text not null,
    guest_phone text not null,
    created_at timestamptz not null default timezone('utc', now())
);

create index if not exists presence_confirmations_created_at_idx on public.presence_confirmations (created_at desc);

create table if not exists public.pix_confirmations (
    id bigint generated always as identity primary key,
    guest_name text not null,
    guest_phone text not null,
    created_at timestamptz not null default timezone('utc', now())
);

create index if not exists pix_confirmations_created_at_idx on public.pix_confirmations (created_at desc);