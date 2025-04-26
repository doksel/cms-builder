'use client';

import { Toaster } from 'sonner';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-sky-900 h-screen w-screen overflow-auto p-4 ">
      {children}
      <Toaster richColors position="top-right" />
    </main>
  );
}
