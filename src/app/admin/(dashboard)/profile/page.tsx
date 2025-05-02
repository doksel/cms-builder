'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { LogOut, Settings, Languages } from 'lucide-react';
import { URL_SETTINGS } from '@/constants/path';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>

      <div className="flex flex-col gap-2">
        <Link
          href={URL_SETTINGS}
          className="flex items-center gap-2 text-indigo-900"
        >
          <Settings size={18} /> Настройки
        </Link>

        <Link href="#" className="flex items-center gap-2 text-indigo-900">
          <Languages size={18} /> Язык
        </Link>

        <div
          onClick={handleLogout}
          className="flex items-center gap-2 text-indigo-900 cursor-pointer"
        >
          <LogOut size={18} /> Выйти
        </div>
      </div>
    </div>
  );
}
