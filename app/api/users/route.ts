import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

const DATABASE_NAME = 'banco-project1';
const COLLECTION_NAME = 'USERS';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');
    const role = String(body.role ?? 'member');

    if (!name || !email || password.length < 8) {
      return NextResponse.json({ error: 'Informe nome, e-mail e uma senha com pelo menos 8 caracteres.' }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
    }

    if (!['member', 'manager', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Perfil de acesso inválido.' }, { status: 400 });
    }

    const client = await clientPromise;
    const users = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
    const existingUser = await users.findOne({ email }, { projection: { _id: 1 } });

    if (existingUser) {
      return NextResponse.json({ error: 'Já existe um cadastro com este e-mail.' }, { status: 409 });
    }

    const now = new Date();
    const result = await users.insertOne({
      name,
      email,
      role,
      passwordHash: await hash(password, 12),
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ id: result.insertedId.toString(), message: 'Cadastro criado com sucesso.' }, { status: 201 });
  } catch (error) {
    console.error('User registration failed', error);
    return NextResponse.json({ error: 'Não foi possível criar o cadastro.' }, { status: 500 });
  }
}
