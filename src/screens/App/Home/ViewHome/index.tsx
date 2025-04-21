import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {db} from '@src/config/firebaseConfig';
import {
  setPreUmrah,
  setHajjGuide,
  setSafetyGuide,
  setUmrahChecklist,
  setTranslationLoading,
} from '@src/redux/app/appSlice';
import {appImages, appSVG} from '@src/shared/assets';
import {useDispatch, useSelector} from 'react-redux';
import {collection, onSnapshot, orderBy, query} from '@firebase/firestore';
import {
  HP,
  WP,
  isIOS,
  PRE_UMRAH,
  HAJJ_GUIDE,
  SAFETY_GUIDE,
  UMRAH_CHECKLIST,
} from '@src/shared/exporter';
import TranslateText from '@src/hooks/useTranslate';
import {AppLoader} from '@src/components/primitive/AppLoader';
import {
  HAJJ_GUIDE_DATA,
  SAFETY_GUIDE_DATA,
  UMRAH_CHECKLIST_DATA,
  PRE_UMRAH_PREPARATION,
} from '@src/shared/utils/constant';

const ViewHome = ({navigation, route}: any) => {
  const {item} = route?.params;
  const dispatch = useDispatch();

  const [allTextsLoaded, setAllTextsLoaded] = useState(false);
  const {translationLoading, isRTL} = useSelector((state: any) => state.app);
  const data = useSelector((state: any) => state?.app[`${item?.apiKey}`]);
  const [checklistData, setChecklistData] = useState(data);
  console.log('data', data);
  useEffect(() => {
    if (translationLoading) {
      const timer = setTimeout(() => {
        dispatch(setTranslationLoading(false));
        setAllTextsLoaded(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [translationLoading]);

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
        if (duaArray?.length === 0) {
          switch (item?.apiKey) {
            case PRE_UMRAH:
              dispatch(setPreUmrah([]));
              break;
            case HAJJ_GUIDE:
              dispatch(setHajjGuide([]));
              break;
            case UMRAH_CHECKLIST:
              dispatch(setUmrahChecklist([]));
              break;
            case SAFETY_GUIDE:
              dispatch(setSafetyGuide([]));
              break;
          }

          setChecklistData([]);
        } else {
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
        }
      },
      error => {
        console.error('Error fetching dua:', error);
      },
    );

    return () => unsubscribe();
  }, [item?.apiKey, dispatch]);

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
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          paddingHorizontal: WP('4'),
        },
      ]}
      onPress={() => toggleCheckbox(section.id, item.id)}>
      <View style={[styles.checkBoxItem]}>
        {item.selected ? appSVG.SelectedCheckBox : appSVG.CheckBox}
      </View>
      <View
        style={[
          styles.itemTextContainer,
          {
            alignItems: isRTL ? 'flex-end' : 'flex-start',
            marginRight: isRTL ? WP('4') : 0,
            marginLeft: isRTL ? 0 : WP('4'),
          },
        ]}>
        <TranslateText style={styles.itemText}>{item.text}</TranslateText>
        <TranslateText
          style={[
            styles.itemDescription,
            {
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}>
          {item.description}
        </TranslateText>
      </View>
    </TouchableOpacity>
  );

  const renderSection = ({item: section, index}: any) => (
    <View key={section.id}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.listContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        ]}
        onPress={() => toggleSection(section.id)}>
        <View
          style={[
            styles.textContainer,
            {
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
            },
          ]}>
          <View style={[styles.listCountingStyle]}>
            <Text>{index + 1}</Text>
          </View>
          <TranslateText
            style={[
              styles.listTextStyle,
              {
                marginRight: isRTL ? WP('4') : 0,
              },
            ]}>
            {section.label}
          </TranslateText>
        </View>

        {section.showValue ? appSVG.ChevronUp : appSVG.ChevronDown}
      </TouchableOpacity>

      {section.showValue && (
        <View style={styles.checklistItemsContainer}>
          <FlatList
            data={section?.items}
            renderItem={itemProps =>
              renderChecklistItem({...itemProps, section})
            }
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <View style={styles.emptyListContainer}>
                <TranslateText style={styles.emptyListText}>
                  No items available.
                </TranslateText>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );

  if (translationLoading) {
    return <AppLoader />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={item?.backgroundImage}
        style={[
          styles.viewImageStyle,
          {
            minHeight: HP('20'),
            maxHeight: HP('22'),
          },
        ]}>
        <View
          style={[
            styles.overLapImage,
            {
              alignItems: isRTL ? 'flex-end' : 'flex-start',
              paddingRight: isRTL ? WP('5') : 0,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              transform: isRTL ? [{rotate: '180deg'}] : undefined,
            }}
            onPress={() => navigation.goBack()}>
            {appSVG.GoBack}
          </TouchableOpacity>
          <TranslateText
            style={[
              styles.headingStyle,
              {
                marginTop: isRTL ? (isIOS() ? 0 : WP('4')) : WP('5'),
              },
            ]}>
            {item?.heading}
          </TranslateText>
          <TranslateText style={styles.subHeadingStyle}>
            {item?.subheading}
          </TranslateText>
        </View>
      </ImageBackground>
      <View style={styles.bodyContainer}>
        <FlatList
          style={styles.bodyContainer}
          data={checklistData}
          renderItem={renderSection}
          keyExtractor={section => section.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <TranslateText style={styles.emptyListText}>
                No items available.
              </TranslateText>
            </View>
          )}
        />
      </View>
      <Image source={appImages.backGroundImage} style={styles.bottomImage} />
    </View>
  );
};

export default ViewHome;
