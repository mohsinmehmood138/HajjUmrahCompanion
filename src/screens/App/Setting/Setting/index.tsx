import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import TranslateText from '@src/hooks/useTranslate';
import LinearGradient from 'react-native-linear-gradient';
import {AppColor, appImages, appSVG, Routes} from '@src/shared/exporter';

const Setting = ({navigation}: any) => {
  const {selectedLanguage} = useSelector((state: any) => state.app);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColor.Primary.CopperBrown, AppColor.Primary.DarkBrown]}>
        <View style={styles.settingHeader} />
      </LinearGradient>

      <View style={styles.mainWrapper}>
        <View style={styles.profileContainer}>
          <Image
            source={appImages.dummyImage}
            style={styles.profileImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={[styles.listitem, {}]}>
            <View style={[styles.textContainer]}>
              {appSVG.LanguageSharp}
              <TranslateText style={[styles.profileTextStyle]}>
                Language
              </TranslateText>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.textContainer]}
              onPress={() => navigation.navigate(Routes.Language)}>
              <Text style={styles.languageText}>{selectedLanguage?.name}</Text>

              {appSVG.ChevronRightGray}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Setting;
