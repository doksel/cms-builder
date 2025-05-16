export type Translation = {
  key: string;
  values: {
    [lang: string]: string;
  };
};

export const fetchTranslations = async () => {
  try {
    const res = await fetch('/api/translations');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Не удалось загрузить переводы.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Ошибка при загрузке переводов');
  }
};

export const addTranslation = async (
  key: string,
  values: Record<string, string>
) => {
  try {
    const res = await fetch('/api/translations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, values }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Не удалось добавить перевод.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Ошибка при добавлении перевода');
  }
};

export const updateTranslation = async (
  key: string,
  values: Record<string, string>
) => {
  try {
    const res = await fetch(`/api/translations/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Не удалось обновить перевод.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Ошибка при обновлении перевода');
  }
};

export const deleteTranslation = async (key: string) => {
  try {
    const res = await fetch(`/api/translations/${key}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Не удалось удалить перевод.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Ошибка при удалении перевода');
  }
};
