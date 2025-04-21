import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import { URL_ADMIN, URL_LOGIN } from '@/constants/path';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedAdminPath =
    req.nextUrl.pathname.startsWith(URL_ADMIN) &&
    !req.nextUrl.pathname.startsWith(URL_LOGIN);

  if (isProtectedAdminPath && !user) {
    return NextResponse.redirect(new URL(URL_LOGIN, req.url));
  }

  return res;
}

export const config = {
  matcher: [`${URL_ADMIN}/:path*'`],
};
