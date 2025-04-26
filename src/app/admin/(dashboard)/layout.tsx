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
      <Toaster richColors position="top-right" />

      <AdminHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 bg-muted">{children}</main>

        <SettingsPanel />
      </div>
    </div>
  );
}
