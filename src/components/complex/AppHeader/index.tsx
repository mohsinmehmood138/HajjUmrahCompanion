import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  WP,
  isIOS,
  appSVG,
  AppColor,
  AppFontSize,
  AppFontFamily,
} from '@shared/exporter';
import {useSelector} from 'react-redux';
import TranslateText from '@src/hooks/useTranslate';

interface AppHeaderProps {
  title?: any;
  leftIcon?: boolean;
  rightIcon?: boolean;
  shadowStyle?: boolean;
  onPressBack?: () => {};
  onPressView?: () => void;
}
const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onPressBack,
  leftIcon = true,
  rightIcon = false,
  shadowStyle = true,
  onPressView = () => {},
}) => {
  const navigation: any = useNavigation();
  const {isRTL} = useSelector((state: any) => state.app);

  return (
    <>
      <LinearGradient
        colors={[AppColor.Primary.CopperBrown, AppColor.Primary.DarkBrown]}>
        <View
          style={[
            styles.container,
            {
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.leftIconContainer,
              {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
            ]}
            onPress={() => (onPressBack ? onPressBack() : navigation.goBack())}>
            {leftIcon ? appSVG.BackIcon : <View style={styles.emptyView} />}
          </TouchableOpacity>
          <TranslateText style={styles.textStyle}>{title}</TranslateText>
          {rightIcon ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.rightIconContainer}
              onPress={onPressView}>
              {appSVG.NotificationIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyView} />
          )}
        </View>
      </LinearGradient>
      <View style={shadowStyle ? styles.shadowStyle : styles.noShadowStyle} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WP('29'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: WP('5'),
    justifyContent: 'space-between',
    paddingBottom: isIOS() ? WP('4') : WP('6'),
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_SemiBold,
  },
  leftIconContainer: {
    width: WP('10'),
  },
  rightIconContainer: {
    width: WP('20'),
    paddingRight: WP('3'),
    alignItems: 'flex-end',
  },
  emptyView: {
    width: '10%',
  },
  shadowStyle: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    height: 0.5,
    elevation: 2,
    shadowRadius: 1.51,
    shadowOpacity: 0.16,
    marginBottom: WP('1'),
    shadowColor: AppColor.Neutrals.Gray1,
    backgroundColor: AppColor.Neutrals.White,
  },
  noShadowStyle: {
    height: 0.5,
    marginTop: WP('3'),
    marginBottom: WP('1'),
    backgroundColor: AppColor.Neutrals.White,
  },
});

export {AppHeader};
