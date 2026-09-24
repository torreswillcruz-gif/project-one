import { Router, type Request, type Response } from 'express';
import { hash } from 'bcryptjs';
import clientPromise from '../database/mongodb.js';

const router = Router();
const DATABASE_NAME = 'banco-project1';

router.post('/', async (request: Request, response: Response) => {
  try {
    const name = String(request.body?.name ?? '').trim();
    const email = String(request.body?.email ?? '').trim().toLowerCase();
    const password = String(request.body?.password ?? '');
    const role = String(request.body?.role ?? 'member');
    if (!name || !email || password.length < 8) return response.status(400).json({ error: 'Informe nome, e-mail e uma senha com pelo menos 8 caracteres.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ error: 'Informe um e-mail válido.' });
    if (!['member', 'manager', 'admin'].includes(role)) return response.status(400).json({ error: 'Perfil de acesso inválido.' });

    const client = await clientPromise;
    const users = client.db(DATABASE_NAME).collection('USERS');
    if (await users.findOne({ email }, { projection: { _id: 1 } })) return response.status(409).json({ error: 'Já existe um cadastro com este e-mail.' });
    const now = new Date();
    const result = await users.insertOne({ name, email, role, passwordHash: await hash(password, 12), createdAt: now, updatedAt: now });
    return response.status(201).json({ id: result.insertedId.toString(), message: 'Cadastro criado com sucesso.' });
  } catch (error) {
    console.error('User registration failed', error);
    return response.status(500).json({ error: 'Não foi possível criar o cadastro.' });
  }
});

export default router;
