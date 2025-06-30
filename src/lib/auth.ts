'use server';

import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const {payload} = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const session = await encrypt({userId, expires});

  cookies().set('session', session, {expires, httpOnly: true});
}

export async function verifySession() {
  const cookie = cookies().get('session')?.value;
  if (!cookie) {
    throw new Error('No session found');
  }

  const session = await decrypt(cookie);
  if (!session?.userId) {
    throw new Error('Invalid session');
  }

  return {isAuth: true, userId: session.userId};
}

export async function deleteSession() {
  cookies().delete('session');
}
