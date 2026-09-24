# Frontend + Backend

Este repositório contém a aplicação Next.js e uma API Node.js independente.

## Estrutura

- A aplicação Next.js na raiz é o frontend (`app/`, `components/` e `lib/brand.ts`).
- A API Node.js fica em `backend/`.
- As rotas da API são:
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
  - `POST /api/users`
  - `GET /health`

> As rotas `app/api/*` existentes foram mantidas temporariamente para compatibilidade com o deploy atual. O frontend novo deve usar `NEXT_PUBLIC_API_URL` e a API em `backend/`. Elas podem ser removidas depois que o deploy estiver apontando para o backend.

## Desenvolvimento

### Frontend

```bash
npm install
npm run dev
```

O frontend roda em `http://localhost:3000`.

Configure no `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

A API roda em `http://localhost:4000`.

Variáveis do backend:

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

Em produção, `FRONTEND_URL` deve ser a URL pública do Next.js. O backend usa cookies HTTP-only e CORS com credenciais para manter a sessão entre as duas aplicações.
