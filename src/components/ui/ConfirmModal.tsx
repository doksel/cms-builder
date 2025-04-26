'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string | React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }} // начальная непрозрачность 0
      animate={{ opacity: 1 }} // финальная непрозрачность 1
      exit={{ opacity: 0 }} // при закрытии — непрозрачность 0
      transition={{ duration: 0.3 }} // продолжительность анимации
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-80 text-center"
        initial={{ scale: 0.9 }} // начальный размер элемента
        animate={{ scale: 1 }} // финальный размер элемента
        exit={{ scale: 0.9 }} // при закрытии — элемент уменьшится
        transition={{ duration: 0.3 }} // продолжительность анимации
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {description && (
          <p className="mb-6 text-gray-600 text-sm">{description}</p>
        )}
        <div className="flex justify-between gap-2">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            {cancelText}
          </Button>
          <Button variant="default" onClick={onConfirm} className="flex-1">
            {confirmText}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
