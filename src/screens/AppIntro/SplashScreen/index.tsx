import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import {AppStatusBar} from '@src/shared/components';
import {appImages, Routes} from '@src/shared/exporter';

interface SplashProps {
  navigation: any;
}

const SplashScreen = ({navigation}: SplashProps) => {
  const {isWalkthrough} = useSelector((state: any) => state.app);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isWalkthrough) {
        navigation.replace(Routes.AppStack);
      } else {
        navigation.replace(Routes.GetStarted);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isWalkthrough]);

  return (
    <View style={styles.container}>
      <AppStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Image source={appImages.logo} />
      <Text style={styles.splashText}>{`Hajj and Umrah!\nCompanion`}</Text>
    </View>
  );
};

export default SplashScreen;
