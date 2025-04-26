'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import AddTranslationModal from '@/components/admin/translations/AddTranslationModal';
import EditableCell from '@/components/admin/translations/EditableCell';

type Translation = {
  key: string;
  languages: Record<string, string>;
};

export default function TranslationsPage() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [translationToDelete, setTranslationToDelete] =
    useState<Translation | null>(null);

  const handleAddTranslation = (key: string) => {
    if (translations.find((t) => t.key === key)) {
      toast.error('Такой ключ уже существует');
      return;
    }

    setTranslations((prev) => [
      ...prev,
      { key, languages: { en: '', ru: '' } },
    ]);
    toast.success('Перевод добавлен');
    setShowAddModal(false);
  };

  const handleEditTranslation = (
    key: string,
    language: string,
    value: string
  ) => {
    setTranslations((prev) =>
      prev.map((translation) =>
        translation.key === key
          ? {
              ...translation,
              languages: { ...translation.languages, [language]: value },
            }
          : translation
      )
    );
  };

  const handleOpenDeleteModal = (translation: Translation) => {
    setTranslationToDelete(translation);
    setShowDeleteModal(true);
  };

  const handleDelete = (key: string) => {
    setTranslations((prev) =>
      prev.filter((translation) => translation.key !== key)
    );
    toast.success('Перевод удален');
    setShowDeleteModal(false);
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-semibold mb-4">Переводы</h1>

      <Button onClick={() => setShowAddModal(true)} className="mb-4">
        Добавить новый перевод
      </Button>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Ключ</th>
            <th className="px-4 py-2 border-b text-left">en</th>
            <th className="px-4 py-2 border-b text-left">ru</th>
            <th className="px-4 py-2 border-b text-left">Действия</th>
          </tr>
        </thead>
        <tbody>
          {translations.map((translation) => (
            <tr key={translation.key} className="border-b">
              <td className="px-4 py-2">{translation.key}</td>
              <td className="px-4 py-2">
                <EditableCell
                  value={translation.languages.en}
                  onSave={(value: string) =>
                    handleEditTranslation(translation.key, 'en', value)
                  }
                />
              </td>
              <td className="px-4 py-2">
                <EditableCell
                  value={translation.languages.ru}
                  onSave={(value: string) =>
                    handleEditTranslation(translation.key, 'ru', value)
                  }
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleOpenDeleteModal(translation)}
                  className="text-red-500 p-2 cursor-pointer hover:text-red-700"
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
