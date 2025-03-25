import {StyleSheet} from 'react-native';
import {AppColor, AppFontFamily, AppFontSize, WP} from '@shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  languageContainer: {
    marginTop: WP('20'),
    marginRight: WP('5'),
    alignSelf: 'flex-end',
  },

  bodyContainer: {
    flex: 1,
    marginBottom: WP('0'),
    paddingHorizontal: WP('5'),
    justifyContent: 'flex-end',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: WP('7'),
    height: WP('7'),
  },
  textStyle: {
    fontWeight: '100',
    marginLeft: WP('2'),
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.PlayfairDisplay_Bold,
  },
  journeyTextStyle: {
    marginTop: WP('4'),
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_32,
    fontFamily: AppFontFamily.CerebriSansPro_Medium,
  },
  descriptionTextStyle: {
    lineHeight: 24,
    width: WP('80'),
    marginTop: WP('4'),
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  buttonStyle: {
    marginVertical: WP('10'),
  },
});
export default styles;
