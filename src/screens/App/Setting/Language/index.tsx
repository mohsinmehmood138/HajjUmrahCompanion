import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, TouchableOpacity, Text} from 'react-native';
import i18next from 'i18next';
import RNRestart from 'react-native-restart';
import styles from './styles';
import {AppHeader} from '@src/shared/components';
import {setIsRTL} from '@src/redux/app/appSlice';
import {appImages, appSVG} from '@src/shared/assets';
import {useDispatch, useSelector} from 'react-redux';
import {COUNTRY_LANGUAGES} from '@src/shared/exporter';
import {setSelectedLanguage} from '@src/redux/app/appSlice';
import {AppButton} from '@src/components/primitive/AppButton';
import {setTranslationLoading} from '@src/redux/app/appSlice';
import {MainWrapper} from '@src/components/primitive/MainWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = () => {
  const dispatch = useDispatch();
  const {selectedLanguage, isRTL} = useSelector((state: any) => state.app);
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
  }, []);

  const handleLanguageSelect = (id: any) => {
    const updatedLanguages = languages.map(lang => ({
      ...lang,
      selected: lang.id === id,
    }));

    setLanguages(updatedLanguages);
  };

  const handleChangeLanguage = async () => {
    console.log('selectedLang', selectedLanguage);
    try {
      const selectedLang = languages.find(lang => lang.selected === true);
      dispatch(setTranslationLoading(true));
      dispatch(setIsRTL(selectedLang?.isRTL));
      dispatch(setSelectedLanguage(selectedLang));
      await AsyncStorage.setItem('needsTranslation', 'true');

      i18next.changeLanguage(selectedLang?.code);

      setTimeout(() => {
        RNRestart.Restart();
      }, 1000);
    } catch (error) {
      console.error('Error changing language', error);
    }
  };

  const renderLanguageItem = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
      ]}
      onPress={() => handleLanguageSelect(item.id)}>
      <Text style={styles.languageStyle}>{item.name}</Text>
      {item.selected ? appSVG.SelectedRadioButton : appSVG.RadioButton}
    </TouchableOpacity>
  );

  return (
    <MainWrapper edges={['bottom', 'left', 'right']}>
      <AppHeader title={<Text>Language</Text>} />
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
