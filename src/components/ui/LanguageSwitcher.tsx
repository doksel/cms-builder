'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

const languages = [
  { label: 'Русский', code: 'ru' },
  { label: 'English', code: 'en' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (!pathname) return null;

  const handleChange = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    startTransition(() => router.push(newPath));
  };

  return (
    <select
      className="border p-1 rounded"
      disabled={isPending}
      onChange={(e) => handleChange(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
