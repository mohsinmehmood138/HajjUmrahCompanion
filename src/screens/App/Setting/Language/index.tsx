import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import i18next from 'i18next';
import RNRestart from 'react-native-restart';
import styles from './styles';
import {AppHeader} from '@src/shared/components';
import {appImages, appSVG} from '@src/shared/assets';
import {useDispatch, useSelector} from 'react-redux';
import {COUNTRY_LANGUAGES} from '@src/shared/exporter';
import {setSelectedLanguage} from '@src/redux/app/appSlice';
import {AppButton} from '@src/components/primitive/AppButton';
import {MainWrapper} from '@src/components/primitive/MainWrapper';

const Language = () => {
  const dispatch = useDispatch();
  const {selectedLanguage} = useSelector((state: any) => state.app);
  const [languages, setLanguages] = useState(COUNTRY_LANGUAGES);

  useEffect(() => {
    const selectLanguage: any = languages.find(
      lang => lang.code === selectedLanguage.code,
    );
    const updatedLanguages = languages.map(lang => ({
      ...lang,
      selected: lang?.id === selectLanguage?.id,
    }));
    setLanguages(updatedLanguages);
    console.log(languages, 'languages');
  }, []);

  const handleLanguageSelect = (id: any) => {
    const updatedLanguages = languages.map(lang => ({
      ...lang,
      selected: lang.id === id,
    }));
    setLanguages(updatedLanguages);
  };

  const handleChangeLanguage = async () => {
    try {
      const selectedLanguage: any = languages.find(
        lang => lang.selected === true,
      );
      const selectedLanguageCode = languages.find(
        lang => lang.selected === true,
      )?.code;
      dispatch(setSelectedLanguage(selectedLanguage));
      i18next.changeLanguage(selectedLanguageCode);
      I18nManager.forceRTL(selectedLanguage?.isRTL);

      setTimeout(() => {
        RNRestart.Restart();
      }, 500);
    } catch (error) {
      console.error('Error changing language', error);
    }
  };

  const renderLanguageItem = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        },
      ]}
      onPress={() => handleLanguageSelect(item.id)}>
      <Text style={styles.languageStyle}>{item.name}</Text>
      {item.selected ? appSVG.SelectedRadioButton : appSVG.RadioButton}
    </TouchableOpacity>
  );

  return (
    <MainWrapper edges={['bottom', 'left', 'right']}>
      <AppHeader title="Language" />
      <View style={styles.container}>
        <FlatList
          data={languages}
          keyExtractor={item => item.id}
          renderItem={renderLanguageItem}
          contentContainerStyle={styles.scrollContent}
          style={styles.languageContainer}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.buttonContainer}>
          <AppButton title="Save Changes" handleClick={handleChangeLanguage} />
        </View>
      </View>
      <Image source={appImages.backGroundImage} style={styles.bottomImage} />
    </MainWrapper>
  );
};

export default Language;
