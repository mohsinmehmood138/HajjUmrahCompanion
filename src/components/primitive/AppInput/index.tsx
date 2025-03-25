import React, {ReactNode} from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  KeyboardTypeOptions,
} from 'react-native';
import {
  WP,
  isIOS,
  AppColor,
  AppFontSize,
  AppFontFamily,
} from '@shared/exporter';
import {useSelector} from 'react-redux';

interface AppInputProps extends TextInputProps {
  value?: string;
  icon?: ReactNode;
  editable?: boolean;

  maxLength?: number;
  multiline?: boolean;
  leftIcon?: ReactNode;
  placeholder?: string;
  onEndEditing?: () => void;
  onSubmitEditing?: () => void;
  container?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  inputContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
}

const AppInput: React.FC<AppInputProps> = ({
  value,

  leftIcon,
  maxLength,
  inputStyle,
  placeholder,
  onChangeText,
  onEndEditing,
  editable = true,
  onSubmitEditing,
  multiline = false,
  inputContainerStyle,
  keyboardType = 'default',
  autoCapitalize = 'none',
  textAlignVertical = 'auto',
}) => {
  const {isRTL} = useSelector((state: any) => state.app);
  return (
    <View
      style={[
        inputContainerView(),
        inputContainerStyle,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
      ]}>
      {leftIcon}
      <TextInput
        placeholder={placeholder}
        value={value}
        editable={editable}
        placeholderTextColor={AppColor.Neutrals.Gray1}
        onChangeText={onChangeText}
        style={[
          AppInputStyle(),
          inputStyle,
          {
            textAlign: isRTL ? 'right' : 'left',
          },
        ]}
        maxLength={maxLength}
        multiline={multiline}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        textAlignVertical={textAlignVertical}
      />
    </View>
  );
};

function inputContainerView(): ViewStyle {
  return {
    position: 'relative',
    width: '100%',
    borderWidth: 1,
    height: WP('12'),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('2'),
    borderRadius: WP('1'),
    justifyContent: 'space-between',
    borderColor: AppColor.Neutrals.Gray3,
    paddingHorizontal: isIOS() ? WP('4') : WP('3'),
  };
}

function AppInputStyle() {
  return {
    height: WP('14'),
    width: '100%',
    color: AppColor.Neutrals.Black,
    fontSize: AppFontSize.FONT_SIZE_16,
    fontFamily: AppFontFamily.CerebriSansPro_Medium,
  } as TextStyle;
}

export {AppInput};
