import React from 'react';
import Setting from '@src/screens/App/Setting/Setting';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type SettingStackParamList = {
  Setting: undefined;
};

const Stack = createNativeStackNavigator<SettingStackParamList>();

const SettingStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default SettingStack;
