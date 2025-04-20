'use client';
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-gray-50 overflow-auto p-4">{children}</main>
  );
}
