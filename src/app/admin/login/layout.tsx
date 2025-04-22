'use client';

import { Toaster } from 'sonner';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-gray-50 overflow-auto p-4">
      {children}
      <Toaster richColors position="top-right" />
    </main>
  );
}
