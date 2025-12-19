'use server';

import { signIn, signOut } from '@/auth';

export async function handleTwitterSignIn() {
  await signIn('twitter');
}

export async function handleSignOut() {
  await signOut();
}
