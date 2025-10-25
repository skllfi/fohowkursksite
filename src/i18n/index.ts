
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../../public/locales/en/common.json';
import ru from '../../public/locales/ru/common.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['cookie', 'navigator'],
    },
    fallbackLng: 'ru',
    resources: {
      ru: {
        translation: ru,
      },
      en: {
        translation: en,
      },
    },
  });
