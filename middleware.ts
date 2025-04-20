import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedAdminPath =
    req.nextUrl.pathname.startsWith('/admin') &&
    !req.nextUrl.pathname.startsWith('/admin/login');

  if (isProtectedAdminPath && !user) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
