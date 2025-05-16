import { NextResponse } from 'next/server';
import { signIn } from '@/lib/supabase/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const data = await signIn(email, password);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// export async function POST(req: Request) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { email, password } = await req.json();

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 401 });
//   }

//   return NextResponse.json({ user: data.user });
// }