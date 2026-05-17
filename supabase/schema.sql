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
    ),
    (
        '5',
        'Cozinha',
        'Potes',
        null,
        'Conjunto versatil para armazenar e organizar alimentos.',
        'https://www.mercadolivre.com.br/kit-4-potes-vidro-1040ml-hermetico-marmita-forno-refratario/up/MLBU3534134664?pdp_filters=item_id%3AMLB4283700061&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4283700061',
        'IMGS/produtos/5.jpeg',
        4,
        null,
        null,
        null
    ),
    (
        '6',
        'Cozinha',
        'Travessa de vidro grande',
        null,
        'Travessa ideal para forno, freezer e servir a mesa.',
        'https://www.mercadolivre.com.br/kit-2-travessas-de-vidro-forno-freezer-marinex-pirex-grande/up/MLBU3544504490?pdp_filters=item_id%3AMLB5905336188&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB5905336188',
        'IMGS/produtos/6.jpeg',
        5,
        null,
        null,
        null
    ),
    (
        '7',
        'Cozinha',
        'Potes hermeticos',
        null,
        'Otimos para manter mantimentos organizados e bem vedados.',
        'https://www.mercadolivre.com.br/kit-10-organizadores-pote-hermetico-empilhavel-em-acrilico-cor-transparente/p/MLB68593211?pdp_filters=item_id%3AMLB4633860471&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4633860471',
        'IMGS/produtos/7.jpeg',
        6,
        null,
        null,
        null
    ),
    (
        '8',
        'Mesa',
        'Jogo de pratos',
        null,
        'Conjunto de pratos para o dia a dia e ocasioes especiais.',
        'https://www.mercadolivre.com.br/jogo-6-pratos-rasos-grande-vidro-branco-25cm-restaurante/up/MLBU3503321287?pdp_filters=item_id%3AMLB5832115552&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB5832115552',
        'IMGS/produtos/1.jpeg',
        7,
        null,
        null,
        null
    ),
    (
        '9',
        'Mesa',
        'Jogo de talheres',
        null,
        'Conjunto para servir as refeicoes do dia a dia.',
        'https://www.mercadolivre.com.br/faqueiro-24-pecas-buzios-inox-23799071-tramontina-cor-cinza-claro/p/MLB36638741?pdp_filters=item_id%3AMLB5214565886&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB5214565886',
        'IMGS/produtos/9.jpeg',
        8,
        null,
        null,
        null
    ),
    (
        '10',
        'Mesa',
        'Jogo de copos',
        null,
        'Copos para agua, sucos e momentos especiais.',
        'https://www.mercadolivre.com.br/jogo-6-copos-de-vidro-canelado-cameratta-agua-suco-420ml/up/MLBU3216811619?pdp_filters=item_id%3AMLB4085176731&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4085176731',
        'IMGS/produtos/10.jpeg',
        9,
        null,
        null,
        null
    ),
    (
        '11',
        'Mesa',
        'Xicaras',
        null,
        'Jogo para cafe e cha no dia a dia.',
        'https://www.mercadolivre.com.br/jogo-de-xicara-com-pires-6-pecas-brasiliano-vidro-cafe-cha/up/MLBU3563750460?pdp_filters=item_id%3AMLB5933197116&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB5933197116',
        'IMGS/produtos/11.jpeg',
        10,
        null,
        null,
        null
    ),
    (
        '12',
        'Mesa',
        'Garrafa termica',
        null,
        'Ideal para manter cafe e bebidas na temperatura certa.',
        'https://www.mercadolivre.com.br/garrafa-termica-lumina-9751-termolar-1-litro-aco-inox/p/MLB29554584?pdp_filters=item_id%3AMLB5361809522&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB5361809522',
        'IMGS/produtos/12.jpeg',
        11,
        null,
        null,
        null
    ),
    (
        '13',
        'Mesa',
        'Jarra',
        null,
        'Jarra para agua, sucos e outras bebidas.',
        'https://www.mercadolivre.com.br/jarra-de-vidro-tampa-higienica-inox-1-litro-borossilicato/up/MLBU3827967757?pdp_filters=item_id%3AMLB4516227995&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4516227995',
        'IMGS/produtos/13.jpeg',
        12,
        null,
        null,
        null
    ),
    (
        '14',
        'Eletro',
        'Liquidificador',
        null,
        'Para vitaminas, sucos, molhos e receitas da casa.',
        'https://www.mercadolivre.com.br/liquidificador-com-15-velocidades-oster-de-1400w-potente/up/MLBU2142765421?pdp_filters=item_id%3AMLB4543427767&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4543427767',
        'IMGS/produtos/14.jpeg',
        13,
        null,
        null,
        null
    ),
    (
        '15',
        'Eletro',
        'Sanduicheira ou grill',
        null,
        'Pratica para lanches, grelhados e refeicoes rapidas.',
        'https://www.mercadolivre.com.br/sanduicheira-e-grill-pgr21pi-maxx-clean-1000w-philco-prateado/p/MLB28017294?pdp_filters=item_id%3AMLB3509498657&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB3509498657',
        'IMGS/produtos/15.jpeg',
        14,
        null,
        null,
        null
    ),
    (
        '16',
        'Eletro',
        'Air fryer',
        null,
        'Para preparar receitas com praticidade no dia a dia.',
        'https://www.mercadolivre.com.br/air-fryer-philco-55l-revestimento-redstone-1500w-paf55b/p/MLB49952088?pdp_filters=item_id%3AMLB4317772143&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4317772143',
        'IMGS/produtos/16.jpeg',
        15,
        null,
        null,
        null
    ),
    (
        '17',
        'Cozinha',
        'Escorredor de louca',
        null,
        'Ajuda a organizar pratos, copos e talheres apos a lavagem.',
        'https://www.mercadolivre.com.br/escorredor-de-louca-inox-20-pratos-2-andares-porta-talheres-prateado/p/MLB36202148?pdp_filters=item_id%3AMLB4100648425&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4100648425',
        'IMGS/produtos/17.jpeg',
        16,
        null,
        null,
        null
    ),
    (
        '18',
        'Cozinha',
        'Lixeira de cozinha',
        null,
        'Item pratico para manter a cozinha organizada.',
        'https://www.mercadolivre.com.br/dispenser-sabao-detergente-lixeira-e-rodinho-kit-cozinha/up/MLBU757567821?pdp_filters=item_id%3AMLB3280727197&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB3280727197',
        'IMGS/produtos/18.jpeg',
        17,
        null,
        null,
        null
    ),
    (
        '19',
        'Cozinha',
        'Tabua de corte',
        null,
        'Essencial para apoiar o preparo das refeicoes.',
        'https://www.mercadolivre.com.br/tabua-de-vidro-temperado-pcarne-churrasco-higienica-fume/up/MLBU2173927220?pdp_filters=item_id%3AMLB2678350207&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB2678350207',
        'IMGS/produtos/19.png',
        18,
        null,
        null,
        null
    ),
    (
        '20',
        'Cozinha',
        'Jogo de facas',
        null,
        'Conjunto para o preparo das refeicoes da casa.',
        'https://www.mercadolivre.com.br/jogo-de-facas-faqueiro-9-pecas-plenus-aco-inox-tramontina/p/MLB28408264?pdp_filters=item_id%3AMLB3782589243&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB3782589243',
        'IMGS/produtos/20.jpeg',
        19,
        null,
        null,
        null
    ),
    (
        '21',
        'Cozinha',
        'Conjunto de utensilios de cozinha',
        null,
        'Conjunto pratico para o preparo das refeicoes do dia a dia.',
        'https://www.mercadolivre.com.br/conjunto-utensilios-profissional-10-pecas-cozinha-silicone/up/MLBU1729594100?pdp_filters=item_id%3AMLB5636036574&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB5636036574',
        'IMGS/produtos/21.jpeg',
        20,
        null,
        null,
        null
    ),
    (
        '22',
        'Cozinha',
        'Escorredor de arroz/macarrao',
        null,
        'Ajuda no preparo e escorrimento de arroz e macarrao.',
        'https://www.mercadolivre.com.br/kit-escorredor-de-macarrao-24cm--escorredor-arroz-inox-26cm/up/MLBU2220575429?pdp_filters=item_id%3AMLB3175145613&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB3175145613',
        'IMGS/produtos/22.jpeg',
        21,
        null,
        null,
        null
    ),
    (
        '23',
        'Cozinha',
        'Tigela grande',
        null,
        'Util para servir, misturar e preparar receitas maiores.',
        'https://www.mercadolivre.com.br/conjunto-3-bacias-tigelas-saladeiras-bowl-inox-3-litros/up/MLBU803087994?pdp_filters=item_id%3AMLB4540747558&matt_tool=38524122#origin=whatsapp&sid=whatsapp&wid=MLB4540747558',
        'IMGS/produtos/23.jpeg',
        22,
        null,
        null,
        null
    );