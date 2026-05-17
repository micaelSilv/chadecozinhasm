create table if not exists public.gifts (
    id text primary key,
    category text not null,
    name text not null,
    price integer,
    detail text not null,
    purchase_link text,
    image text,
    sort_order integer not null,
    reserved_by_name text,
    reserved_by_phone text,
    confirmed_at timestamptz
);

alter table public.gifts add column if not exists purchase_link text;
alter table public.gifts add column if not exists image text;

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

delete from public.gifts;

insert into public.gifts (
    id,
    category,
    name,
    price,
    detail,
    purchase_link,
    image,
    sort_order,
    reserved_by_name,
    reserved_by_phone,
    confirmed_at
) values
    (
        '01',
        'Cozinha',
        'Jogo de panelas',
        null,
        'Base para cozinhar arroz, feijao, molhos, legumes e refeicoes do dia a dia.',
        'https://www.mercadolivre.com.br/p/MLB32466350?offer_type=BEST_PRICE&pdp_filters=item_id:MLB4053374163&matt_tool=38524122#origin=share&sid=share&wid=MLB4053374163&action=whatsapp',
        'IMGS/produtos/1.jpeg',
        0,
        null,
        null,
        null
    ),
    (
        '02',
        'Cozinha',
        'Panela de pressao',
        null,
        'Essencial para feijao, carnes, cozidos e preparo mais rapido.',
        'https://www.mercadolivre.com.br/up/MLBU1987757783?offer_type=BEST_PRICE&pdp_filters=item_id:MLB4966648582&matt_tool=38524122#origin=share&sid=share&wid=MLB4966648582&action=whatsapp',
        'IMGS/produtos/2.jpeg',
        1,
        null,
        null,
        null
    ),
    (
        '03',
        'Cozinha',
        'Frigideira antiaderente grande',
        null,
        'Serve para ovos, carnes, legumes, tapioca, panquecas e lanches.',
        'https://www.mercadolivre.com.br/frigideira-funda-antiaderente-24-cm-com-tampa-tramontina-cor-grafite/p/MLB44274771?pdp_filters=item_id%3AMLB4196692767&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4196692767',
        'IMGS/produtos/3.jpeg',
        2,
        null,
        null,
        null
    ),
    (
        '04',
        'Cozinha',
        'Assadeira retangular',
        null,
        'Para forno: carnes, lasanha, legumes, bolos simples e gratinados.',
        'https://www.mercadolivre.com.br/jogo-de-assadeiras-aluminio-2-pecas-tramontina-bolo-e-pudim/p/MLB27497694?pdp_filters=item_id%3AMLB3659308875&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB3659308875',
        'IMGS/produtos/4.jpeg',
        3,
        null,
        null,
        null
    );