import { NextResponse } from 'next/server';
import { signOut } from '@/lib/supabase/auth';

export async function POST() {
  try {
    const result = await signOut();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
