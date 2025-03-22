import React from 'react';
import {
  View,
  Text,
  Image,
  Share,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {AppHeader} from '@src/shared/components';
import {appImages, appSVG} from '@src/shared/assets';
import {MainWrapper} from '@src/components/primitive/MainWrapper';

const ViewDua = ({route}: any) => {
  const {dua} = route.params;
  console.log('dua', dua);

  const handleShare = async () => {
    try {
      const shareContent = {
        title: dua.title,
        message: `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}\n\n${dua.additionalInfo}`,
      };

      const result = await Share.share(shareContent);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <MainWrapper>
      <AppHeader title={dua?.title} />
      <ScrollView style={styles.container}>
        <View style={styles.arabicContainer}>
          <Text style={styles.arabicText}>{dua.arabic}</Text>
        </View>
        <Text style={styles.transliteration}>{dua.transliteration}</Text>
        <Text style={styles.translation}>{dua.translation}</Text>
        <Text style={styles.sectionTitle}>{dua.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{dua.additionalInfo}</Text>
        </View>
      </ScrollView>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          {appSVG.Media}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          {appSVG.Task}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          {appSVG.Heart}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          {appSVG.Share}
        </TouchableOpacity>
      </View>
      <Image source={appImages.backGroundImage} style={styles.bottomImage} />
    </MainWrapper>
  );
};

export default ViewDua;
