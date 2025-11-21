import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languageOptions = [
  { code: 'th', label: 'TH', name: 'ไทย' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ms', label: 'MS', name: 'Melayu' },
  { code: 'zh', label: 'ZH', name: '中文' },
  { code: 'ja', label: 'JA', name: '日本語' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'hi', label: 'HI', name: 'हिन्दी' }
];

const translationModules = import.meta.glob('./locales/*/translation.json', { eager: true });

const resources = Object.entries(translationModules).reduce((acc, [path, module]) => {
  const match = path.match(/\.\/locales\/([a-zA-Z-]+)\/translation\.json$/);
  if (!match) return acc;

  const language = match[1];
  acc[language] = { translation: module.default || module };
  return acc;
}, {});

const supportedLngs = languageOptions.map((lang) => lang.code);
const fallbackLng = 'en';
const storedLanguage =
  typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
const getBrowserLanguage = () => {
  if (typeof navigator === 'undefined') return null;

  const browserLanguages = navigator.languages || [navigator.language];

  for (const language of browserLanguages) {
    if (!language) continue;
    const baseCode = language.split('-')[0];
    if (supportedLngs.includes(baseCode)) {
      return baseCode;
    }
  }

  return null;
};

const initialLanguage =
  storedLanguage && supportedLngs.includes(storedLanguage)
    ? storedLanguage
    : getBrowserLanguage() || fallbackLng;
const basePath = import.meta.env.BASE_URL || '/';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng,
    supportedLngs,
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    backend: {
      loadPath: `${basePath}locales/{{lng}}/translation.json`
    }
  });

export default i18n;
