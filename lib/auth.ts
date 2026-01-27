import { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function getServerSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }

  return session;
}

export function getUserIdFromSession(session: any): string {
  if (!session?.user?.id) {
    throw new Error('User ID not found in session');
  }
  return session.user.id;
}
