'use client';

import { useState } from 'react';

type EditableCellProps = {
  value: string;
  onSave: (value: string) => void;
};

export default function EditableCell({ value, onSave }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onSave(draftValue);
  };

  return (
    <div onClick={() => setIsEditing(true)} className="cursor-pointer">
      {isEditing ? (
        <input
          className="w-full p-1 border rounded"
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span className="block min-h-[24px]">{value || '—'}</span>
      )}
    </div>
  );
}
