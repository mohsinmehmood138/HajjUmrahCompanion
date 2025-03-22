import React from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';

interface AppStatusBarProps {
  translucent?: boolean;
  barStyle: StatusBarStyle;
  backgroundColor?: string;
}
const AppStatusBar: React.FC<AppStatusBarProps> = ({
  barStyle,
  backgroundColor,
}) => {
  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      translucent={false}
    />
  );
};
export {AppStatusBar};
