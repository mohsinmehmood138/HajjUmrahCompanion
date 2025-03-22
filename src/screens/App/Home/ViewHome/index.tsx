import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  I18nManager,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {db} from '@src/config/firebaseConfig';
import {
  setHajjGuide,
  setPreUmrah,
  setSafetyGuide,
  setUmrahChecklist,
} from '@src/redux/app/appSlice';
import {appImages, appSVG} from '@src/shared/assets';
import {useDispatch, useSelector} from 'react-redux';
import {collection, onSnapshot, orderBy, query} from '@firebase/firestore';
import {
  HP,
  WP,
  PRE_UMRAH,
  HAJJ_GUIDE,
  SAFETY_GUIDE,
  UMRAH_CHECKLIST,
} from '@src/shared/exporter';
import {t} from 'i18next';

const ViewHome = ({navigation, route}: any) => {
  const {item} = route?.params;
  console.log('item', item?.apiKey);

  const dispatch = useDispatch();
  const data = useSelector((state: any) => state?.app[`${item?.apiKey}`]);
  const [checklistData, setChecklistData] = useState(data);

  useEffect(() => {
    const duaCollection = collection(db, item?.apiKey);
    const duaQuery = query(duaCollection, orderBy('id', 'asc'));

    const unsubscribe = onSnapshot(
      duaQuery,
      querySnapshot => {
        const duaArray: any[] = [];
        querySnapshot.forEach(doc => {
          if (doc.exists()) {
            duaArray.push({id: doc.id, ...doc.data()});
          }
        });
        if (duaArray?.length == 0) return;
        setChecklistData([...duaArray]);
        switch (item?.apiKey) {
          case PRE_UMRAH:
            dispatch(setPreUmrah([...duaArray]));
            break;
          case HAJJ_GUIDE:
            dispatch(setHajjGuide([...duaArray]));
            break;
          case UMRAH_CHECKLIST:
            dispatch(setUmrahChecklist([...duaArray]));
            break;
          case SAFETY_GUIDE:
            dispatch(setSafetyGuide([...duaArray]));
            break;

          default:
            console.warn(
              `No dispatch action defined for apiKey: ${item?.apiKey}`,
            );
            break;
        }
      },
      error => {
        console.error('Error fetching dua:', error);
      },
    );

    return () => unsubscribe();
  }, [item?.apiKey]);

  const toggleSection = (sectionId: any) => {
    setChecklistData(
      checklistData.map((section: any) =>
        section.id === sectionId
          ? {...section, showValue: !section.showValue}
          : section,
      ),
    );
  };

  const toggleCheckbox = (sectionId: any, itemId: any) => {
    setChecklistData(
      checklistData.map((section: any) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item: any) =>
                item.id === itemId ? {...item, selected: !item.selected} : item,
              ),
            }
          : section,
      ),
    );
  };

  const renderChecklistItem = ({item, section}: any) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      style={[
        styles.checklistItem,
        {flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'},
      ]}
      onPress={() => toggleCheckbox(section.id, item.id)}>
      <View style={styles.checkBoxItem}>
        {item.selected ? appSVG.SelectedCheckBox : appSVG.CheckBox}
      </View>

      <View
        style={[
          styles.itemTextContainer,
          {alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start'},
        ]}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text
          style={[
            styles.itemDescription,
            {textAlign: I18nManager.isRTL ? 'right' : 'left'},
          ]}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = ({item: section}: any) => (
    <View key={section.id}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.listContainer,
          {flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'},
        ]}
        onPress={() => toggleSection(section.id)}>
        <View
          style={[
            styles.textContainer,
            {flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'},
          ]}>
          <View style={[styles.listCountingStyle]}>
            <Text>{section.id}</Text>
          </View>
          <Text
            style={[
              styles.listTextStyle,
              {marginRight: I18nManager.isRTL ? WP('4') : 0},
            ]}>
            {section.label}
          </Text>
        </View>
        {section.showValue ? appSVG.ChevronUp : appSVG.ChevronDown}
      </TouchableOpacity>

      {section.showValue && (
        <View style={styles.checklistItemsContainer}>
          <FlatList
            data={section.items}
            renderItem={itemProps =>
              renderChecklistItem({...itemProps, section})
            }
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={item?.backgroundImage}
        style={[
          styles.viewImageStyle,
          {
            minHeight: HP('22'),
            maxHeight: I18nManager.isRTL ? HP('25') : WP('23'),
          },
        ]}>
        <View
          style={[
            styles.overLapImage,
            {alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start'},
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{
              transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
            }}>
            {appSVG.GoBack}
          </TouchableOpacity>
          <Text style={styles.headingStyle}>
            {t(`home_card_section.${item?.heading}`)}
          </Text>
          <Text style={styles.subHeadingStyle}>
            {t(`home_card_section.${item?.subheading}`)}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.bodyContainer}>
        <FlatList
          style={styles.bodyContainer}
          data={checklistData}
          renderItem={renderSection}
          keyExtractor={section => section.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Image source={appImages.backGroundImage} style={styles.bottomImage} />
    </View>
  );
};

export default ViewHome;
