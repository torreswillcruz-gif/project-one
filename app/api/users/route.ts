import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, email, password, role = 'member' } = await request.json();
    const cleanName = String(name ?? '').trim();
    const cleanEmail = String(email ?? '').trim().toLowerCase();

    if (!cleanName || !cleanEmail || String(password ?? '').length < 8) {
      return NextResponse.json({ error: 'Nome, e-mail e senha com pelo menos 8 caracteres são obrigatórios.' }, { status: 400 });
    }

    const client = await clientPromise;
    const users = client.db('project-one').collection('users');
    if (await users.findOne({ email: cleanEmail }, { projection: { _id: 1 } })) {
      return NextResponse.json({ error: 'Já existe um usuário com este e-mail.' }, { status: 409 });
    }

    const result = await users.insertOne({ name: cleanName, email: cleanEmail, role: String(role), passwordHash: await hash(String(password), 12), createdAt: new Date(), updatedAt: new Date() });
    return NextResponse.json({ id: result.insertedId.toString(), message: 'Usuário cadastrado com sucesso.' }, { status: 201 });
  } catch (error) {
    console.error('User registration failed', error);
    return NextResponse.json({ error: 'Não foi possível cadastrar o usuário.' }, { status: 500 });
  }
}
