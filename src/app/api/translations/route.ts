// GET /api/translations — get all
// POST /api/translations — add translation

import { NextResponse } from 'next/server';
import { fetchTranslations, addTranslation } from '@/lib/supabase/translations';

export async function GET() {
  try {
    const translations = await fetchTranslations();
    return NextResponse.json(translations);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, values } = body;

    if (!key || !values) {
      return NextResponse.json(
        { error: 'Key and values are required' },
        { status: 400 }
      );
    }

    await addTranslation({ key, values });
    return NextResponse.json({ message: 'Translation added successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
