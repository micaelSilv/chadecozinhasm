# Publicar no Render

## O que ja ficou pronto

- O servidor aceita persistencia por `DATA_DIR` ou `DATA_FILE`.
- O arquivo `render.yaml` ja cria um Web Service chamado `chadecozinhasm`.
- As confirmacoes dos presentes podem ficar em disco persistente no Render.

## Como publicar

1. Envie esta pasta para um repositorio no GitHub.
2. Entre em https://render.com e conecte sua conta do GitHub.
3. Clique em `New +` > `Blueprint`.
4. Selecione o repositorio deste projeto.
5. Confirme a criacao do servico `chadecozinhasm`.

## Resultado esperado

- URL inicial parecida com `https://chadecozinhasm.onrender.com`.
- As reservas continuam salvas no disco montado em `/var/data`.

## Observacao

- Para usar disco persistente no Render, escolha um plano que suporte `disk`.
- Se publicar sem disco persistente, as confirmacoes podem ser perdidas ao reiniciar o servico.