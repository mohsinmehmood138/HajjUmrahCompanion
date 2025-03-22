import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dua from '@src/screens/App/Dua/Dua';

type DuaStackParamList = {
  Home: undefined;
  Dua: undefined;
};

const Stack = createNativeStackNavigator<DuaStackParamList>();

const DuaStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dua" component={Dua} />
    </Stack.Navigator>
  );
};

export default DuaStack;
