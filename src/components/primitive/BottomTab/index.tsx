import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AppColor, WP, appSVG} from '@shared/exporter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

type BottomTabProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

type Route = {
  key: string;
  name: string;
};

interface TabIconProps {
  index: number;
  isFocused: boolean;
}

const TabIcon = ({index, isFocused}: TabIconProps) => {
  const icons: Record<number, any> = {
    0: isFocused ? appSVG.HomeTab : appSVG.Home,
    1: isFocused ? appSVG.DuaTab : appSVG.Dua,
    2: isFocused ? appSVG.SettingTab : appSVG.Setting,
  };

  return icons[index] || null;
};

const RenderTabs: React.FC<{
  item: Route;
  index: number;
  state: any;
  navigation: any;
  descriptors: any;
}> = ({item, index, state, navigation, descriptors}) => {
  const isFocused = state.index === index;
  const {options} = descriptors[item.key];

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: item.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(item.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: item.key,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.tabContainer}
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}>
      <TabIcon index={index} isFocused={isFocused} />
    </TouchableOpacity>
  );
};

export const BottomTab: React.FC<BottomTabProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabsContainer, {paddingBottom: insets.bottom}]}>
      <FlatList
        numColumns={4}
        data={state?.routes}
        scrollEnabled={false}
        keyExtractor={item => item.key}
        columnWrapperStyle={[styles.tabRow]}
        renderItem={({item, index}) => (
          <RenderTabs
            item={item}
            index={index}
            state={state}
            navigation={navigation}
            descriptors={descriptors}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    // height: WP('20'),
    borderTopWidth: 1,
    paddingTop: WP('1'),
    paddingHorizontal: WP('3'),
    shadowColor: AppColor.Neutrals.Black,
    borderTopColor: AppColor.Neutrals.Gray5,
    backgroundColor: AppColor.Neutrals.White,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabRow: {
    justifyContent: 'space-between',
    width: '100%',
  },
  tabContainer: {
    paddingTop: WP('2'),
    alignItems: 'center',
    paddingBottom: WP('1'),
    width: width / 4 - WP('4'),
  },
});
