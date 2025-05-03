// PUT /api/translations/my_key — update
// DELETE /api/translations/my_key — delete

import { NextResponse } from 'next/server';
import {
  updateTranslation,
  deleteTranslation,
} from '@/lib/supabase/translations';

export async function PUT(
  req: Request,
  { params }: { params: { key: string } }
) {
  try {
    const body = await req.json();
    const { values } = body;

    if (!values) {
      return NextResponse.json(
        { error: 'Values are required' },
        { status: 400 }
      );
    }

    await updateTranslation(params.key, values);
    return NextResponse.json({ message: 'Translation updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { key: string } }
) {
  try {
    await deleteTranslation(params.key);
    return NextResponse.json({ message: 'Translation deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
