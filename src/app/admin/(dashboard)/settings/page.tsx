'use client';

import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/admin/settings/translations"
          className="block p-6 border rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Переводы</h2>
          <p className="text-gray-600 text-sm">
            Управление переводами по ключам и языкам.
          </p>
        </Link>

        {/* На будущее — сюда можно добавить еще карточки других настроек */}
      </div>
    </div>
  );
}
