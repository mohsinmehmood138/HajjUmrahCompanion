import {StyleSheet} from 'react-native';
import {AppColor, AppFontSize, AppFontFamily, WP} from '@shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColor.Primary.CopperBrown,
  },
  splashText: {
    marginTop: WP('5'),
    textAlign: 'center',
    lineHeight: WP('8'),
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_24,
    fontFamily: AppFontFamily.PlayfairDisplay_Bold,
  },
});

export default styles;
