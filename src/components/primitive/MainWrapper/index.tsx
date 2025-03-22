import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {AppStatusBar, AppColor} from '@shared/exporter';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

interface MainWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
}
const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  style,
  edges = [],
}) => {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={edges ? edges : ['top', 'left', 'right']}>
      <AppStatusBar
        barStyle="dark-content"
        backgroundColor={AppColor.Neutrals.White}
      />
      {children}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.Neutrals.White,
  },
});
export {MainWrapper};
