# Publicacao com Vercel + Supabase

## 1. Criar o projeto no Supabase

1. Crie um projeto em https://supabase.com.
2. Abra o SQL Editor e execute o arquivo `supabase/schema.sql`.
3. Rode `npm run supabase:seed` para gerar o arquivo `supabase/seed.json`.
4. Na tabela `gifts`, importe os registros do arquivo `supabase/seed.json`.

## 2. Variaveis na Vercel

Defina estas variaveis no projeto da Vercel:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3. Deploy

1. Importe o repositório na Vercel.
2. Mantenha framework preset como `Other`.
3. Nao precisa alterar build command.
4. Faça o deploy.

## 4. Observacao importante

O `SUPABASE_SERVICE_ROLE_KEY` deve ficar apenas no servidor. O frontend continua chamando `/api/gifts` e `/api/confirm`, e a Vercel executa essas rotas no backend.