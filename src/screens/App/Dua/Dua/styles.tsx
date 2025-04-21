import {StyleSheet} from 'react-native';
import {AppColor, AppFontFamily, AppFontSize, WP} from '@src/shared/exporter';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.Neutrals.White,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: WP('3'),
  },
  inputContainerStyle: {
    marginTop: WP('5'),
    marginBottom: WP('8'),
  },
  inputStyle: {
    width: '90%',
  },
  listContainer: {
    padding: WP('3'),
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('3'),
    paddingBottom: WP('5'),
    justifyContent: 'space-between',
    borderBottomColor: `${AppColor.Neutrals.Gray1}20`,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingStyle: {
    marginLeft: WP('3'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Regular,
  },
  emptyListContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    marginTop: WP('5'),
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Medium,
  },
});
export default styles;
