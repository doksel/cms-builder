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
