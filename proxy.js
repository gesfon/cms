import { NextResponse } from 'next/server';
import { decryptSession } from '@/lib/auth';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/register'];

export async function proxy(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get('session')?.value;
  const session = cookie ? await decryptSession(cookie) : null;

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
