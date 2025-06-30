import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {verifySession} from '@/lib/auth';

const protectedRoutes = ['/admin'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute) {
    const session = await verifySession().catch(() => null);
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (path === '/login') {
    const session = await verifySession().catch(() => null);
    if (session) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
