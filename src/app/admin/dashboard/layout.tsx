'use client';

import Sidebar from '@/components/admin/Sidebar';
import SettingsPanel from '@/components/admin/SettingsPanel';
import { AdminHeader } from '@/components/admin/Layout/AdminHeader';
import { Toaster } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <Sidebar />
        <aside className="w-64 border-r">[Sidebar]</aside>

        <SettingsPanel />
        <main className="flex-1 p-4 bg-muted overflow-auto">{children}</main>

        <Toaster richColors position="top-right" />
      </div>
    </div>
  );
}
