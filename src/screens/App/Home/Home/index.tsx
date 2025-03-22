import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  I18nManager,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {t} from 'i18next';
import styles from './styles';
import {appImages, appSVG} from '@src/shared/assets';
import {Routes, UMRAH_DATA} from '@src/shared/exporter';

const Home = ({navigation}: any) => {
  console.log(I18nManager.isRTL, 'isRTL');
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
              {flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'},
            ]}>
            <View
              style={{
                alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
              }}>
              <Text style={styles.cardTextStyle}>
                {t(`home_card_section.${item?.heading}`)}
              </Text>
              <Text style={styles.desTextStyle}>
                {t(`home_card_section.${item?.subheading}`)}
              </Text>
            </View>
            <View
              style={{
                transform: [{rotate: I18nManager?.isRTL ? '180deg' : '0deg'}],
              }}>
              {appSVG.ChevronRight}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image source={appImages.home} style={styles.imageStyle} />
        <View style={styles.bodyContainer}>
          <Text
            style={[
              styles.homeTextStyle,
              {alignSelf: I18nManager?.isRTL ? 'flex-end' : 'flex-start'},
            ]}>
            {t('home.heading')}
          </Text>
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
