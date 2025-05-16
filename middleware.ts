import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import { URL_ADMIN, URL_LOGIN, URL_REGISTER } from '@/constants/path';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('middleware user: ', user);

  const pathname = req.nextUrl.pathname;

  const isProtectedAdminPath =
    pathname.startsWith(URL_ADMIN) &&
    pathname !== URL_LOGIN &&
    pathname !== URL_REGISTER;

  if (isProtectedAdminPath && !user) {
    return NextResponse.redirect(new URL(URL_LOGIN, req.url));
  }

  return res;
}

export const config = {
  matcher: [`${URL_ADMIN}/:path*`],
};
