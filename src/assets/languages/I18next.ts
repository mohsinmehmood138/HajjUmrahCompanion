import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import {store} from '@src/redux/store';

export const languageResources = {
  en: {translation: en},
  ar: {translation: ar},
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const storedLanguage = store.getState().app.selectedLanguage.code;
    const defaultLanguage = 'en';
    const selectedLanguage = storedLanguage || defaultLanguage;
    callback(selectedLanguage);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next.use(languageDetector).use(initReactI18next).init({
  compatibilityJSON: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;
