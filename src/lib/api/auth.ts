/* eslint-disable @typescript-eslint/no-explicit-any */

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      return { success: true, message: 'Успешный вход!' };
    } else {
      throw new Error(result.error || 'Не удалось войти в систему.');
    }
  } catch (error: any) {
    throw new Error(error.message || 'Не удалось войти в систему.');
  }
};

export const logout = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error('Ошибка при выходе');
    }

    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || 'Не удалось выйти из системы.');
  }
};
