import en from './translations/en.json';
import ru from './translations/ru.json';

export const getMessages = (locale: string) => {
  switch (locale) {
    case 'ru':
      return ru;
    case 'en':
    default:
      return en;
  }
};

export const locales = ['ru', 'en'] as const;
export const defaultLocale = 'ru';
