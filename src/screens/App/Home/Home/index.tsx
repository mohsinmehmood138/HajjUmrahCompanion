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
import NetInfo from '@react-native-community/netinfo';
import WifiModal from '@src/components/primitive/WifiModal';
import {Routes, UMRAH_DATA, WP} from '@src/shared/exporter';
import {AppLoader} from '@src/components/primitive/AppLoader';
import {setTranslationLoading, setFirstTime} from '@src/redux/app/appSlice';
import {useTranslateTextMutation} from '@src/redux/TranslationApi/translationApi';

const Home = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const {translationLoading, isRTL, isFirstTime} = useSelector(
    (state: any) => state.app,
  );
  const [translateText, {isLoading}] = useTranslateTextMutation();

  useEffect(() => {
    if (isFirstTime) {
      const checkInternet = () => {
        NetInfo.fetch().then(state => {
          if (!state.isConnected) {
            setModalVisible(true);
          } else {
            setModalVisible(false);
            dispatch(setFirstTime(false));
          }
        });
      };

      const interval = setInterval(checkInternet, 5000);
      checkInternet();

      return () => clearInterval(interval);
    }
  }, [isFirstTime]);

  useEffect(() => {
    if (translationLoading) {
      const timer = setTimeout(() => {
        dispatch(setTranslationLoading(false));
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
                translateText={translateText}
                style={[
                  styles.cardTextStyle,
                  {
                    alignSelf: isRTL ? 'flex-end' : 'flex-start',
                    width: !isRTL && WP('75'),
                  },
                ]}>
                {item?.heading}
              </TranslateText>
              <TranslateText
                translateText={translateText}
                style={[
                  styles.desTextStyle,
                  {
                    textAlign: isRTL ? 'right' : 'left',
                    width: WP('75'),
                  },
                ]}>
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

  if (translationLoading) {
    return <AppLoader />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image source={appImages.home} style={styles.imageStyle} />
        <View style={styles.bodyContainer}>
          <TranslateText
            translateText={translateText}
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

      <WifiModal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Image source={appImages.wifiImage} style={styles.wifiImage} />
          <Text style={styles.connectionError}>No Internet Connection</Text>
          <Text style={styles.pleaseText}>
            Connect With Wifi or Mobile Data
          </Text>
        </View>
      </WifiModal>
      {isLoading && <AppLoader />}
    </ScrollView>
  );
};

export default Home;
