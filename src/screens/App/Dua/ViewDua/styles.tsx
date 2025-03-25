import {StyleSheet} from 'react-native';
import {AppColor, AppFontFamily, AppFontSize, WP} from '@src/shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WP('4'),
  },
  arabicContainer: {
    textAlign: 'left',
    marginVertical: WP('8'),
  },
  arabicText: {
    textAlign: 'right',
    lineHeight: WP('13'),
    color: AppColor.Neutrals.Black,
    fontFamily: 'Traditional Arabic',
    fontSize: AppFontSize.FONT_SIZE_32,
  },
  transliteration: {
    textAlign: 'left',
    lineHeight: WP('6'),
    marginBottom: WP('6'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  translation: {
    textAlign: 'left',
    lineHeight: WP('6'),
    marginBottom: WP('8'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  sectionTitle: {
    marginBottom: WP('6'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_18,
    fontFamily: AppFontFamily.CerebriSansPro_Medium,
  },
  borderLeft: {
    borderLeftWidth: 3,
    marginBottom: WP('5'),
    borderLeftColor: AppColor.Primary.DarkBrown,
  },
  borderRight: {
    borderRightWidth: 3,
    marginBottom: WP('5'),
    borderRightColor: AppColor.Primary.DarkBrown,
  },

  infoText: {
    lineHeight: 24,
    marginLeft: WP('4'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  actionContainer: {
    zIndex: 1,
    elevation: 3,
    width: '90%',
    shadowRadius: 4,
    bottom: WP('7'),
    shadowOpacity: 0.1,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: WP('50'),
    paddingVertical: WP('3'),
    paddingHorizontal: WP('5'),
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: 2},
    shadowColor: AppColor.Neutrals.Gray3,
    backgroundColor: AppColor.Neutrals.White,
  },
  actionButton: {
    padding: WP('3'),
  },
  bottomImage: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default styles;
