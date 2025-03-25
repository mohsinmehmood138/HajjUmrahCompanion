// src/utils/translationUtils.js
import {store} from '@src/redux/store';
import {
  setDuaData,
  setPreUmrah,
  setHajjGuide,
  setSafetyGuide,
  setUmrahChecklist,
} from '@src/redux/app/appSlice';
import {translationApi} from '@src/redux/TranslationApi/translationApi';

// Helper function to translate a single text string
const translateSingleText = async (text: any, targetLanguage: any) => {
  if (!text || targetLanguage === 'en') return text;

  try {
    const response = await store
      .dispatch(
        translationApi.endpoints.translateText.initiate({
          from: 'auto',
          to: targetLanguage,
          text: text,
        }),
      )
      .unwrap();

    return response.trans;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

// Helper function to deep translate an object or array
const deepTranslate = async (data, targetLanguage) => {
  if (!data) return data;

  // Don't translate if target language is English
  if (targetLanguage === 'en') return data;

  // Handle array
  if (Array.isArray(data)) {
    const translatedArray = [];
    for (let item of data) {
      translatedArray.push(await deepTranslate(item, targetLanguage));
    }
    return translatedArray;
  }

  // Handle object
  if (typeof data === 'object') {
    const translatedObj = {};
    for (let key in data) {
      if (typeof data[key] === 'object' || Array.isArray(data[key])) {
        translatedObj[key] = await deepTranslate(data[key], targetLanguage);
      } else if (typeof data[key] === 'string') {
        translatedObj[key] = await translateSingleText(
          data[key],
          targetLanguage,
        );
      } else {
        translatedObj[key] = data[key];
      }
    }
    return translatedObj;
  }

  // Handle string
  if (typeof data === 'string') {
    return await translateSingleText(data, targetLanguage);
  }

  // Return as is for other types
  return data;
};

// Function to translate all app data
export const translateAppData = async targetLanguage => {
  const {duaData, pre_umrah, hajj_guide, safety_guide, umrah_checklist} =
    store.getState().app;

  // Translate all data in parallel
  const [
    translatedDuaData,
    translatedPreUmrah,
    translatedHajjGuide,
    translatedSafetyGuide,
    translatedUmrahChecklist,
  ] = await Promise.all([
    deepTranslate(duaData, targetLanguage),
    deepTranslate(pre_umrah, targetLanguage),
    deepTranslate(hajj_guide, targetLanguage),
    deepTranslate(safety_guide, targetLanguage),
    deepTranslate(umrah_checklist, targetLanguage),
  ]);

  // Update Redux store with translated data
  store.dispatch(setDuaData(translatedDuaData));
  store.dispatch(setPreUmrah(translatedPreUmrah));
  store.dispatch(setHajjGuide(translatedHajjGuide));
  store.dispatch(setSafetyGuide(translatedSafetyGuide));
  store.dispatch(setUmrahChecklist(translatedUmrahChecklist));
};
