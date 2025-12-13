import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vi from './locales/vi.json';
import en from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi }, // bọc JSON vào 'translation'
      en: { translation: en }  // bọc JSON vào 'translation'
    },
    lng: localStorage.getItem('lang') || 'vi',
    fallbackLng: 'vi',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;
