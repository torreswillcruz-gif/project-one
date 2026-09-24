import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { randomUUID } from 'crypto';
import clientPromise from '@/lib/mongodb';

const DATABASE_NAME = 'banco-project1';
const USERS_COLLECTION = 'USERS';
const SESSIONS_COLLECTION = 'SESSIONS';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');

    if (!email || !password) {
      return NextResponse.json({ error: 'Informe e-mail e senha.' }, { status: 400 });
    }

    const client = await clientPromise;
    const database = client.db(DATABASE_NAME);
    const user = await database.collection(USERS_COLLECTION).findOne({ email });

    if (!user || typeof user.passwordHash !== 'string') {
      return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 });
    }

    const passwordMatches = await compare(password, user.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 });
    }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await database.collection(SESSIONS_COLLECTION).insertOne({
      token,
      userId: user._id,
      email: user.email,
      role: user.role ?? 'member',
      createdAt: new Date(),
      expiresAt,
    });

    const response = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role ?? 'member' },
    });

    response.cookies.set('will_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error('Login failed', error);
    return NextResponse.json({ error: 'Não foi possível realizar o login.' }, { status: 500 });
  }
}
