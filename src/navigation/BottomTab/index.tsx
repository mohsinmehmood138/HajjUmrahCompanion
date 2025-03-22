import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DuaStack from '../Stacks/DuaStack';
import SettingStack from '../Stacks/Setting';
import HomeStack from '../Stacks/HomeStack';
import {BottomTab} from '@src/shared/exporter';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTab {...props} />}>
      <Tab.Screen
        options={{unmountOnBlur: false}}
        component={HomeStack}
        name={'HomeStack'}
      />
      <Tab.Screen
        options={{unmountOnBlur: false}}
        component={DuaStack}
        name={'DuaStack'}
      />

      <Tab.Screen
        options={{unmountOnBlur: false}}
        component={SettingStack}
        name={'SettingStack'}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
