import { Router, type Request, type Response } from 'express';
import { compare } from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import clientPromise from '../database/mongodb.js';

const router = Router();
const DATABASE_NAME = 'banco-project1';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

router.post('/login', async (request: Request, response: Response) => {
  try {
    const email = String(request.body?.email ?? '').trim().toLowerCase();
    const password = String(request.body?.password ?? '');
    if (!email || !password) return response.status(400).json({ error: 'Informe e-mail e senha.' });

    const client = await clientPromise;
    const database = client.db(DATABASE_NAME);
    const user = await database.collection('USERS').findOne({ email });
    if (!user || typeof user.passwordHash !== 'string' || !(await compare(password, user.passwordHash))) {
      return response.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await database.collection('SESSIONS').insertOne({
      token, userId: user._id, email: user.email, role: user.role ?? 'member', createdAt: new Date(), expiresAt,
    });

    response.cookie('will_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', path: '/', expires: expiresAt });
    return response.json({ success: true, user: { name: user.name, email: user.email, role: user.role ?? 'member' } });
  } catch (error) {
    console.error('Login failed', error);
    return response.status(500).json({ error: 'Não foi possível realizar o login.' });
  }
});

router.post('/logout', async (request: Request, response: Response) => {
  const token = request.cookies.will_session as string | undefined;
  if (token) {
    const client = await clientPromise;
    await client.db(DATABASE_NAME).collection('SESSIONS').deleteOne({ token });
  }
  response.clearCookie('will_session', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', path: '/' });
  return response.json({ success: true });
});

router.get('/me', async (request: Request, response: Response) => {
  const token = request.cookies.will_session as string | undefined;
  if (!token) return response.status(401).json({ error: 'Não autenticado.' });
  const client = await clientPromise;
  const database = client.db(DATABASE_NAME);
  const session = await database.collection('SESSIONS').findOne({ token, expiresAt: { $gt: new Date() } });
  if (!session) return response.status(401).json({ error: 'Sessão expirada.' });
  const user = await database.collection('USERS').findOne({ _id: session.userId });
  return response.json({ user: { name: String(user?.name ?? user?.email ?? session.email ?? 'Usuário'), email: String(user?.email ?? session.email ?? ''), role: String(user?.role ?? session.role ?? 'member') } });
});

export default router;
