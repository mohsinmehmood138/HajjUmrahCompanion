import {StyleSheet} from 'react-native';
import {AppColor, AppFontFamily, AppFontSize, WP} from '@src/shared/exporter';

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
    fontWeight: '500',
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
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
});
export default styles;
