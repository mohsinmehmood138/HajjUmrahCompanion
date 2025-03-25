import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import TranslateText from '@src/hooks/useTranslate';
import {appImages, appSVG} from '@src/shared/assets';
import NetInfo from '@react-native-community/netinfo';
import {Routes, UMRAH_DATA} from '@src/shared/exporter';
import {AppLoader} from '@src/components/primitive/AppLoader';
import {setTranslationLoading, setFirstTime} from '@src/redux/app/appSlice';
import WifiModal from '@src/components/primitive/WifiModal';

const Home = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const {translationLoading, isRTL, isFirstTime} = useSelector(
    (state: any) => state.app,
  );

  console.log(isRTL, 'isRTL', translationLoading);

  useEffect(() => {
    if (isFirstTime) {
      const checkInternet = () => {
        NetInfo.fetch().then(state => {
          console.log('Connection type:', state.type);
          console.log('Is connected?', state.isConnected);

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

  if (translationLoading) {
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
      <WifiModal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Image source={appImages.wifiImage} style={styles.wifiImage} />
          <Text style={styles.connectionError}>No Internet Connection</Text>
          <Text style={styles.pleaseText}>
            Connect With Wifi or Mobile Data
          </Text>
        </View>
      </WifiModal>
    </ScrollView>
  );
};

export default Home;
