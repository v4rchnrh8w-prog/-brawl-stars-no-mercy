# Dashboard conectado — #82982PR9C

Esta versão usa um backend Node/Express para consultar a API do Brawl Stars sem expor o token no navegador.

## 1. Instalar
Node.js 18+ recomendado.

```bash
npm install
```

## 2. Criar a chave
Crie uma API key no portal de desenvolvedores do Brawl Stars e configure a chave com a variável `BRAWL_API_TOKEN`.

Copie `.env.example` para `.env` e preencha:
BRAWL_API_TOKEN=sua_chave

Não publique o `.env` no GitHub.

## 3. Rodar
```bash
npm start
```
Abra `http://localhost:3000`.

## Endpoints usados
- GET /v1/clubs/{clubTag}
- GET /v1/clubs/{clubTag}/members

O projeto já está configurado para `#82982PR9C`.

## Observação importante
A API entrega o estado atual. Para calcular automaticamente “+1.000 na semana”, é necessário salvar snapshots periódicos dos membros (por exemplo, 1x por dia) em um banco de dados. Esta versão já deixa o local preparado para essa próxima etapa.
