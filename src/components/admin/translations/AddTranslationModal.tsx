'use client';

import { useState } from 'react';
import ConfirmModal from '@/components/ui/ConfirmModal';

type AddTranslationModalProps = {
  isOpen: boolean;
  onConfirm: (key: string) => void;
  onCancel: () => void;
};

export default function AddTranslationModal({
  isOpen,
  onConfirm,
  onCancel,
}: AddTranslationModalProps) {
  const [key, setKey] = useState('');

  const handleConfirm = () => {
    if (key.trim() !== '') {
      onConfirm(key.trim());
      setKey('');
    }
  };

  const handleCancel = () => {
    onCancel();
    setKey('');
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Добавить новый перевод"
      description={
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Введите ключ"
          className="w-full mt-2 p-2 border rounded"
          autoFocus
        />
      }
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText="Добавить"
      cancelText="Отмена"
    />
  );
}
