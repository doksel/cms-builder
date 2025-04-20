'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SettingsPanel() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-white border-l transition-all duration-200 ${
        collapsed ? 'w-12' : 'w-80'
      } flex flex-col`}
    >
      <div className="p-2 flex justify-start">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-black"
        >
          {collapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      {!collapsed && (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Настройки страницы</h2>
          <p className="text-sm text-gray-600">
            Выберите блок или настройте мета
          </p>
        </div>
      )}
    </div>
  );
}
