import React, {useEffect, useRef} from 'react';
import {Routes} from '@src/shared/exporter';
import {appImages, appSVG} from '@src/shared/assets';
import {AppButton} from '@src/components/primitive/AppButton';
import {MainWrapper} from '@src/components/primitive/MainWrapper';
import AppBottomSheet from '@src/components/primitive/LanguageSheet';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {setIsWalkthrough} from '@src/redux/app/appSlice';

const GetStarted = ({navigation}: any) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.open();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const handleSubmit = () => {
    dispatch(setIsWalkthrough());
    navigation.navigate(Routes.AppStack);
  };
  return (
    <>
      <ImageBackground style={styles.container} source={appImages.getStarted}>
        <MainWrapper style={styles.container}>
          <TouchableOpacity
            style={styles.languageContainer}
            activeOpacity={0.8}
            onPress={() => bottomSheetRef.current.open()}>
            {appSVG.SelectLanguage}
          </TouchableOpacity>
          <View style={styles.bodyContainer}>
            <View style={styles.logoContainer}>
              <Image source={appImages.logo} style={styles.imageStyle} />
              <Text style={styles.textStyle}>Hajj and Umrah Companion</Text>
            </View>
            <Text style={styles.journeyTextStyle}>
              Embark on a Blessed Journey
            </Text>
            <Text style={styles.descriptionTextStyle}>
              Your ultimate Umrah guide for a smooth, spiritual, and stress-free
              pilgrimage.
            </Text>
            <AppButton
              title="Get Started"
              buttonStyle={styles.buttonStyle}
              handleClick={handleSubmit}
            />
          </View>
        </MainWrapper>
      </ImageBackground>
      <AppBottomSheet
        bottomSheetHeader="Select preferred language"
        refRBSheet={bottomSheetRef}
      />
    </>
  );
};
export default GetStarted;
