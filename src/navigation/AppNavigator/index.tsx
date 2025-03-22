import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStack from '../BottomTab';
import ViewDua from '@src/screens/App/Dua/ViewDua';
import ViewHome from '@src/screens/App/Home/ViewHome';
import Language from '@src/screens/App/Setting/Language';
import GetStarted from '@src/screens/AppIntro/GetStarted';
import SplashScreen from '@src/screens/AppIntro/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{navigationBarHidden: true}}
        />
        <Stack.Screen name="AppStack" component={AppStack} />
        <Stack.Screen name="ViewHome" component={ViewHome} />
        <Stack.Screen name="ViewDua" component={ViewDua} />
        <Stack.Screen name="Language" component={Language} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
