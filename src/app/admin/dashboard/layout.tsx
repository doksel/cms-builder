'use client';
import Sidebar from '@/components/admin/Sidebar';
import SettingsPanel from '@/components/admin/SettingsPanel';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 overflow-auto p-4">{children}</main>
      <SettingsPanel />
    </div>
  );
}
