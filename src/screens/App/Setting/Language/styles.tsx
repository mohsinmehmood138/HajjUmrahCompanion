import {StyleSheet} from 'react-native';
import {WP, AppColor, AppFontSize, AppFontFamily} from '@src/shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WP('4'),
    backgroundColor: AppColor.Neutrals.White,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: WP('20'),
  },
  languageContainer: {
    zIndex: 1,
    marginTop: WP('5'),
    marginBottom: WP('18'),
  },
  listItem: {
    zIndex: 1,
    alignItems: 'center',
    marginBottom: WP('8'),
    flexDirection: 'row',
    paddingHorizontal: WP('3'),
    justifyContent: 'space-between',
  },
  languageStyle: {
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.PlayfairDisplay_Regular,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: WP('2'),
    left: WP('4'),
    right: WP('4'),
    zIndex: 1,
  },
  bottomImage: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: WP('5'),
  },
  loadingText: {
    marginTop: WP('4'),
    fontSize: WP('4'),
    fontWeight: '500',
  },
  modalContainer: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: WP('3'),
    paddingVertical: WP('5'),
    paddingHorizontal: WP('3'),
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
    width: WP('60%'),
    marginTop: WP('4'),
    textAlign: 'center',
    lineHeight: WP('4'),
    alignSelf: 'center',
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_14,
    fontFamily: AppFontFamily.CerebriSansPro_Medium,
  },
});

export default styles;
