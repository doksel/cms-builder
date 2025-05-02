'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, User } from 'lucide-react';

import Button from '@/components/ui/Button';
import { URL_PROFILE, URL_SETTINGS } from '@/constants/path';

export function AdminHeader() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <Link href="/admin" className="text-xl font-semibold">
        Admin Panel
      </Link>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(URL_SETTINGS)}
        >
          <Settings className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(URL_PROFILE)}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
