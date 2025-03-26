import {StyleSheet} from 'react-native';
import {
  AppColor,
  AppFontFamily,
  AppFontSize,
  HP,
  WP,
} from '@src/shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: WP('5'),
  },
  imageStyle: {
    width: WP('100%'),
  },
  bodyContainer: {
    paddingTop: WP('8'),
    paddingHorizontal: WP('4'),
  },
  homeTextStyle: {
    alignSelf: 'flex-start',
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_18,
    fontFamily: AppFontFamily.CerebriSansPro_SemiBold,
  },
  flatListContainer: {
    marginTop: WP('4'),
    borderRadius: WP('3'),
    overflow: 'hidden',
  },
  flatListBackground: {
    height: WP('28'),
    borderRadius: WP('3'),
  },
  overLapView: {
    width: '100%',
    height: '100%',
    paddingBottom: WP('3'),
    alignItems: 'flex-end',
    paddingHorizontal: WP('3'),
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cardTextStyle: {
    paddingVertical: WP('2'),
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_SemiBold,
  },
  desTextStyle: {
    alignSelf: 'flex-end',
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  modalContainer: {
    width: '80%',
    height: HP('25'),
    padding: WP('3'),
    alignSelf: 'center',
    borderRadius: WP('3'),
    backgroundColor: AppColor.Neutrals.White,
  },
  wifiImage: {
    width: WP('18'),
    height: WP('18'),
    marginTop: WP('3'),
    alignSelf: 'center',
  },
  connectionError: {
    marginTop: WP('3'),
    textAlign: 'center',
    color: AppColor.Neutrals.Red,
    fontSize: AppFontSize.FONT_SIZE_18,
    fontFamily: AppFontFamily.CerebriSansPro_SemiBold,
  },
  pleaseText: {
    width: WP('40%'),
    marginTop: WP('3'),
    textAlign: 'center',
    lineHeight: WP('6'),
    alignSelf: 'center',
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Medium,
  },
});
export default styles;
