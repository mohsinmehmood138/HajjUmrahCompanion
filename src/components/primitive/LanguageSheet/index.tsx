import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import i18next from 'i18next';
import {useDispatch} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  HP,
  WP,
  appSVG,
  AppColor,
  AppFontSize,
  AppFontFamily,
  COUNTRY_LANGUAGES,
} from '../../../shared/exporter';
import {setIsRTL, setSelectedLanguage} from '@src/redux/app/appSlice';

interface BottomSheetProps {
  refRBSheet: any;
  bottomSheetHeader: string;
  onPress?: () => void | any;
}

const AppBottomSheet: React.FC<BottomSheetProps> = ({
  refRBSheet,
  bottomSheetHeader,
}) => {
  const dispatch = useDispatch();
  const [dragContent, setDragContent] = useState(true);
  const [languages, setLanguages] = useState(COUNTRY_LANGUAGES);

  const renderLanguageItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleLanguageSelect(item.id)}>
      <Text style={styles.languageStyle}>{item.name}</Text>
      {item.selected ? appSVG.SelectedRadioButton : appSVG.RadioButton}
    </TouchableOpacity>
  );

  useEffect(() => {
    const updatedLanguages = languages.map(lang => ({
      ...lang,
      selected: lang.id === '1',
    }));
    setLanguages(updatedLanguages);
  }, []);

  const handleLanguageSelect = (id: any) => {
    const updatedLanguages = languages.map(lang => ({
      ...lang,
      selected: lang.id === id,
    }));
    const selectedLanguage = updatedLanguages.find(lang => lang.selected);
    setLanguages(updatedLanguages);
    dispatch(setSelectedLanguage(selectedLanguage));
    dispatch(setIsRTL(selectedLanguage?.isRTL));
    i18next.changeLanguage(selectedLanguage?.code);
  };

  return (
    <RBSheet
      dragOnContent={dragContent}
      draggable={true}
      ref={refRBSheet}
      openDuration={1000}
      useNativeDriver={false}
      closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopLeftRadius: WP('4'),
          borderTopRightRadius: WP('4'),
          backgroundColor: AppColor.Neutrals.White,
          height: 'auto',
          minHeight: HP('60'),
          maxHeight: HP('80'),
        },
        draggableIcon: {
          backgroundColor: AppColor.Neutrals.Black,
        },
      }}>
      <View style={styles.header}>
        <Text style={styles.bottomSheetHeading}>{bottomSheetHeader}</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          onScroll={() => setDragContent(false)}
          data={languages}
          keyExtractor={item => item.id}
          renderItem={renderLanguageItem}
          contentContainerStyle={styles.scrollContent}
          style={styles.languageContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WP('4'),
    backgroundColor: AppColor.Neutrals.White,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: WP('5'),
  },
  bottomSheetHeading: {
    fontFamily: AppFontFamily.CerebriSansPro_Medium,
    fontSize: AppFontSize.FONT_SIZE_18,
  },
  cancelButton: {
    position: 'absolute',
    right: WP('4'),
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: WP('-2'),
    right: WP('4'),
    left: WP('4'),
  },
  languageContainer: {
    zIndex: 1,
    marginTop: WP('3'),
  },
  listItem: {
    zIndex: 1,
    alignItems: 'center',
    marginBottom: WP('8'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
  },
  languageStyle: {
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
});

export default AppBottomSheet;
