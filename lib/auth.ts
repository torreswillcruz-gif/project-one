import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

const DATABASE_NAME = 'banco-project1';
const SESSIONS_COLLECTION = 'SESSIONS';

export type AuthUser = { name: string; email: string; role: string };

export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  const token = cookies().get('will_session')?.value;
  if (!token) return null;

  const client = await clientPromise;
  const session = await client.db(DATABASE_NAME).collection(SESSIONS_COLLECTION).findOne({ token, expiresAt: { $gt: new Date() } });
  if (!session) return null;

  return { name: String(session.name ?? session.email ?? 'Usuário'), email: String(session.email), role: String(session.role ?? 'member') };
}
