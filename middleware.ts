import { NextResponse } from 'next/server';

// A autenticação é feita pela API Node.js. O frontend não deve bloquear a rota
// com cookies locais, pois o cookie HTTP-only pertence ao domínio da API.
export function middleware() {
  return NextResponse.next();
}
