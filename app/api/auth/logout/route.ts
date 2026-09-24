import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

export async function POST() {
  const token = cookies().get('will_session')?.value;

  if (token) {
    const client = await clientPromise;
    await client.db('banco-project1').collection('SESSIONS').deleteOne({ token });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('will_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });

  return response;
}
