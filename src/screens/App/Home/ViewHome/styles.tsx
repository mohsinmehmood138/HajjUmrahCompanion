import {StyleSheet} from 'react-native';
import {
  WP,
  HP,
  AppColor,
  AppFontSize,
  AppFontFamily,
} from '@src/shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.Neutrals.White,
  },
  viewImageStyle: {
    width: '100%',
    minHeight: HP('20'),
    resizeMode: 'cover',
    maxHeight: HP('25'),
  },
  overLapImage: {
    width: '100%',
    height: '100%',
    paddingBottom: WP('4'),
    paddingHorizontal: WP('3'),
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headingStyle: {
    fontWeight: '500',
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_SemiBold,
  },
  subHeadingStyle: {
    fontWeight: '300',
    marginTop: WP('2'),
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  bodyContainer: {
    flex: 1,
    zIndex: 1,
    marginTop: WP('3'),
    position: 'relative',
    marginBottom: WP('4'),
    paddingHorizontal: WP('3'),
  },
  listContainer: {
    borderRadius: 12,
    marginTop: WP('5'),
    elevation: WP('3'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: WP('4'),
    paddingHorizontal: WP('4'),
    justifyContent: 'space-between',
    backgroundColor: AppColor.Neutrals.White,
    shadowColor: AppColor.Neutrals.Gray3,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listCountingStyle: {
    width: WP('8'),
    height: WP('8'),
    alignItems: 'center',
    borderRadius: WP('8'),
    justifyContent: 'center',
    backgroundColor: AppColor.Secondary.LightPeach,
  },
  listTextStyle: {
    fontWeight: '500',
    marginLeft: WP('3'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_13,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  checklistItemsContainer: {
    marginTop: WP('5'),
  },

  checklistItem: {
    marginTop: WP('7'),
  },
  itemTextContainer: {
    width: '91%',
    alignItems: 'flex-start',
  },
  checkBoxItem: {
    position: 'relative',
    top: WP('1'),
  },
  itemText: {
    lineHeight: 25,
    color: AppColor.Neutrals.Gray6,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  itemDescription: {
    textAlign: 'left',
    color: AppColor.Neutrals.Gray1,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
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
