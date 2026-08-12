'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession, destroySession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function registerAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: 'An account with this email already exists.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    },
  });

  await createSession(newUser.id);
  redirect('/dashboard');
}

export async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: 'Invalid credentials.' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { error: 'Invalid credentials.' };
  }

  await createSession(user.id);
  redirect('/dashboard');
}

export async function logoutAction() {
  await destroySession();
  redirect('/login');
}
