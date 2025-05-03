import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/supabase/auth';

export async function GET() {
  try {
    const user = await getProfile();
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
