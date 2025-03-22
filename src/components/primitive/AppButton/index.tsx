import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  WP,
  isIOS,
  AppColor,
  AppFontSize,
  AppFontFamily,
} from '@shared/exporter';

interface AppButtonProps {
  icon?: any;
  title: string;
  textStyle?: any;
  isEmpty?: boolean;
  buttonStyle?: any;
  disabled?: boolean;
  handleClick?: () => void;
}
const AppButton: React.FC<AppButtonProps> = ({
  icon,
  title,
  disabled,
  textStyle,
  buttonStyle,
  handleClick,
  isEmpty = true,
}) => (
  <TouchableOpacity
    disabled={disabled}
    activeOpacity={0.8}
    onPress={handleClick}
    style={[styles.buttonContainer, buttonStyle]}>
    {isEmpty && <View style={styles.emptyViewStyle} />}
    <Text style={[styles.typeTextStyle, textStyle]}>{title}</Text>
    {icon ? icon : <View style={styles.emptyViewStyle} />}
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: WP('12'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: WP('10'),
    paddingHorizontal: WP('5'),
    justifyContent: 'space-between',
    backgroundColor: AppColor.Primary.CopperBrown,
  },
  typeTextStyle: {
    top: isIOS() ? 0 : -2,
    color: AppColor.Neutrals.White,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_SemiBold,
  },
  emptyViewStyle: {
    width: WP('7'),
    height: WP('7'),
  },
  buttonStyle: {
    marginTop: WP('10'),
    marginBottom: WP('3'),
  },
});
export {AppButton};
