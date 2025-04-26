'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function SettingsPage() {
  const { locale, setLocale } = useLanguage(); // Используем хук для получения и изменения языка

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value;
    setLocale(newLocale); // Обновляем язык в контексте
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Настройки</h1>
      <div>
        <label htmlFor="language" className="block mb-2">
          Выберите язык
        </label>
        <select
          id="language"
          value={locale}
          onChange={handleLanguageChange}
          className="border p-2 rounded"
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}
