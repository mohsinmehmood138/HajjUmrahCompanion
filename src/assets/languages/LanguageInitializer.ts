import {useEffect} from 'react';
import {I18nManager} from 'react-native';
import i18next from './I18next';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedLanguage} from '@src/redux/app/appSlice';
import {COUNTRY_LANGUAGES} from '@src/shared/exporter';

const LanguageInitializer = () => {
  const dispatch = useDispatch();
  const {selectedLanguage} = useSelector((state: any) => state.app);
  useEffect(() => {
    async function initializeLanguage() {
      try {
        if (selectedLanguage) {
          i18next.changeLanguage(selectedLanguage.code);
        } else {
          const defaultLanguage = COUNTRY_LANGUAGES[0];
          i18next.changeLanguage(defaultLanguage.code);
          I18nManager.forceRTL(defaultLanguage.isRTL);
          dispatch(setSelectedLanguage(defaultLanguage));
        }
      } catch (error) {
        console.error('Error initializing language', error);
      }
    }

    initializeLanguage();
  }, []);

  return null;
};

export default LanguageInitializer;
