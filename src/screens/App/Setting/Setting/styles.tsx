import {
  HP,
  WP,
  AppColor,
  AppFontSize,
  AppFontFamily,
} from '@src/shared/exporter';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.Neutrals.White,
  },
  settingHeader: {
    height: HP('25'),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    borderWidth: 3,
    width: WP('28'),
    height: WP('28'),
    overflow: 'hidden',
    borderRadius: WP('28'),
    borderColor: AppColor.Neutrals.White,
    backgroundColor: AppColor.Neutrals.Gray3,
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: WP('28'),
  },
  mainWrapper: {
    top: -WP('35'),
    marginTop: WP('20'),
    paddingHorizontal: WP('5'),
  },
  bodyContainer: {
    marginTop: WP('6'),
  },
  listitem: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: WP('7'),
    justifyContent: 'space-between',
    borderTopColor: `${AppColor.Neutrals.Gray1}20`,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextStyle: {
    marginLeft: WP('3'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  languageText: {
    marginRight: WP('3'),
    color: AppColor.Neutrals.Gray6,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Light,
  },
});
export default styles;
