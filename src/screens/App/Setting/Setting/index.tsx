import React, {useState} from 'react';
import {Text, View, Image, I18nManager, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {AppColor, appImages, appSVG, Routes, WP} from '@src/shared/exporter';

const Setting = ({navigation}: any) => {
  const {selectedLanguage} = useSelector((state: any) => state.app);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
          <View
            style={[
              styles.listitem,
              {flexDirection: I18nManager?.isRTL ? 'row-reverse' : 'row'},
            ]}>
            <View
              style={[
                styles.textContainer,
                {flexDirection: I18nManager?.isRTL ? 'row-reverse' : 'row'},
              ]}>
              {appSVG.LanguageSharp}
              <Text
                style={[
                  styles.profileTextStyle,
                  {marginRight: I18nManager?.isRTL ? WP('2') : 0},
                ]}>
                Language
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.textContainer,
                {flexDirection: I18nManager?.isRTL ? 'row-reverse' : 'row'},
              ]}
              onPress={() => navigation.navigate(Routes.Language)}>
              <Text style={styles.languageText}>{selectedLanguage?.name}</Text>
              <View
                style={{
                  transform: [{rotate: I18nManager?.isRTL ? '180deg' : '0deg'}],
                  marginRight: I18nManager ? WP('2') : 0,
                }}>
                {appSVG.ChevronRightGray}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Setting;
