'use client';

import { useEffect, useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import Button from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import EditableCell from '@/components/admin/translations/EditableCell';
import AddTranslationModal from '@/components/admin/translations/AddTranslationModal';

import {
  fetchTranslations,
  updateTranslation,
  addTranslation,
  deleteTranslation,
  type Translation,
} from '@/lib/api/translations';
import { languagesOptions } from '@/utils/staticValues';

const languages = [
  { label: 'Русский', code: 'ru' },
  { label: 'English', code: 'en' },
];

export default function TranslationsPage() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [initLanguages, setInitLanguages] = useState(languages);
  const [isLoading, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [translationToDelete, setTranslationToDelete] =
    useState<Translation | null>(null);
  const [newLanguage, setNewLanguage] = useState<string>(''); // Для выбора нового языка

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchTranslations();
        setTranslations(data);
      } catch (error: any) {
        toast.error('Ошибка загрузки переводов', {
          description: error.message,
        });
      }
    });
  }, []);

  const handleDelete = async (key: string) => {
    try {
      await deleteTranslation(key);
      setTranslations((prev) => prev.filter((t) => t.key !== key));
      toast.success('Перевод удален');
    } catch (error: any) {
      toast.error('Ошибка удаления', { description: error.message });
    }
  };

  const handleAddTranslation = async (
    key: string,
    values: Record<string, string>
  ) => {
    try {
      await addTranslation(key, values);
      setTranslations((prev) => [...prev, { key, values }]);
      toast.success('Перевод добавлен');
    } catch (error: any) {
      toast.error('Ошибка добавления перевода', { description: error.message });
    }
  };

  const handleEditTranslation = async (
    key: string,
    lang: string,
    value: string
  ) => {
    const updated = translations.map((t) =>
      t.key === key ? { ...t, values: { ...t.values, [lang]: value } } : t
    );
    setTranslations(updated);

    try {
      await updateTranslation(key, updated.find((t) => t.key === key)!.values);
      toast.success('Перевод обновлен');
    } catch (error: any) {
      toast.error('Ошибка при обновлении', { description: error.message });
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewLanguage(e.target.value);
  };

  const handleAddNewLanguage = async (code: string) => {
    if (!newLanguage) {
      toast.error('Выберите язык для добавления');
      return;
    }

    setTranslations((prev) =>
      prev.map((translation) =>
        translation.key === code
          ? {
              ...translation,
              values: { ...translation.values, [code]: '' },
            }
          : translation
      )
    );

    console.log('code', code);

    const lang = languagesOptions.find((lang) => lang.code === code);

    setInitLanguages([...initLanguages, lang]);

    setNewLanguage(''); // сбрасываем выбранный язык
  };

  console.log('initLanguages', initLanguages);

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-semibold mb-4">Переводы</h1>

      <div className="mb-4 flex items-center">
        <Button onClick={() => setShowAddModal(true)} className="mr-4">
          Добавить новый перевод
        </Button>

        {/* Селектор для выбора языка */}
        <select
          className="border p-1 rounded mr-4"
          value={newLanguage}
          onChange={handleLanguageChange}
        >
          <option value="">Выберите язык</option>
          {languagesOptions
            .filter((lang) => !translations.some((t) => t.values[lang.code]))
            .map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
        </select>
        <Button
          variant="outline"
          onClick={() => handleAddNewLanguage(newLanguage)}
        >
          Добавить язык
        </Button>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ключ</th>
            {initLanguages.map((lang) => (
              <th key={lang.code} className="px-4 py-2 border-b">
                {lang.label}
              </th>
            ))}
            <th className="px-4 py-2 border-b">Действия</th>
          </tr>
        </thead>
        <tbody>
          {translations.map((translation) => (
            <tr key={translation.key} className="border-b">
              <td className="px-4 py-2">{translation.key}</td>
              {initLanguages.map((lang) => (
                <td key={lang.code} className="px-4 py-2">
                  <EditableCell
                    value={translation.values[lang.code] || ''}
                    onSave={(val) =>
                      handleEditTranslation(translation.key, lang.code, val)
                    }
                  />
                </td>
              ))}
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    setTranslationToDelete(translation);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Удалить"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddTranslationModal
        isOpen={showAddModal}
        onConfirm={handleAddTranslation}
        onCancel={() => setShowAddModal(false)}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Удалить перевод?"
        description="Это действие нельзя отменить."
        onConfirm={() =>
          translationToDelete && handleDelete(translationToDelete.key)
        }
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </div>
  );
}
