import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import TranslateText from '@src/hooks/useTranslate';
import {appImages, appSVG} from '@src/shared/assets';
import {Routes, UMRAH_DATA} from '@src/shared/exporter';
import {AppLoader} from '@src/components/primitive/AppLoader';
import {setTranslationLoading} from '@src/redux/app/appSlice';

const Home = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [allTextsLoaded, setAllTextsLoaded] = useState(false);
  const {translationLoading, isRTL} = useSelector((state: any) => state.app);

  console.log(isRTL, 'isRTL', translationLoading);

  useEffect(() => {
    if (translationLoading) {
      const timer = setTimeout(() => {
        dispatch(setTranslationLoading(false));
        setAllTextsLoaded(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [translationLoading]);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.flatListContainer}
        onPress={() => {
          navigation.navigate(Routes.ViewHome, {
            item: item,
          });
        }}>
        <ImageBackground
          source={item?.backgroundImage}
          style={styles.flatListBackground}>
          <View
            style={[
              styles.overLapView,
              {
                flexDirection: isRTL ? 'row-reverse' : 'row',
              },
            ]}>
            <View>
              <TranslateText
                style={[
                  styles.cardTextStyle,
                  {
                    alignSelf: isRTL ? 'flex-end' : 'flex-start',
                  },
                ]}>
                {item?.heading}
              </TranslateText>
              <TranslateText style={[styles.desTextStyle]}>
                {item?.subheading}
              </TranslateText>
            </View>
            <View
              style={{
                transform: isRTL ? [{rotateY: '180deg'}] : [{rotateY: '0deg'}],
              }}>
              {appSVG.ChevronRight}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (translationLoading && !allTextsLoaded) {
    return <AppLoader />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image source={appImages.home} style={styles.imageStyle} />
        <View style={styles.bodyContainer}>
          <TranslateText
            style={[
              styles.homeTextStyle,
              {
                alignSelf: isRTL ? 'flex-end' : 'flex-start',
              },
            ]}>
            The Umrah Guide
          </TranslateText>

          <FlatList
            data={UMRAH_DATA}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
