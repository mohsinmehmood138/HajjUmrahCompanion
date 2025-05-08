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
import NetInfo from '@react-native-community/netinfo';
import {AppLoader} from '@src/components/primitive/AppLoader';
import {useTranslateTextMutation} from '@src/redux/TranslationApi/translationApi';

const ViewHome = ({navigation, route}: any) => {
  const {item} = route?.params;
  const dispatch = useDispatch();
  const [isOffline, setIsOffline] = useState(false);
  const {isRTL, translationLoading, selectedLanguage} = useSelector(
    (state: any) => state.app,
  );
  const data = useSelector((state: any) => state?.app[`${item?.apiKey}`]);
  const [checklistData, setChecklistData] = useState(data);
  const [translateText, {isLoading}] = useTranslateTextMutation();

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    if (translationLoading) {
      const timer = setTimeout(() => {
        dispatch(setTranslationLoading(false));
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [translationLoading]);

  useEffect(() => {
    if (isOffline) {
      return;
    }
    const duaCollection = collection(db, item?.apiKey);
    const duaQuery = query(duaCollection, orderBy('id', 'asc'));

    const unsubscribe = onSnapshot(duaQuery, async querySnapshot => {
      const duaArray: any[] = [];
      querySnapshot.forEach(doc => {
        if (doc.exists()) {
          duaArray.push({id: doc.id, ...doc.data()});
        }
      });

      if (duaArray.length > 0) {
        const translatedData = await fetchTranslations(duaArray);
        setChecklistData([...translatedData]);

        switch (item?.apiKey) {
          case PRE_UMRAH:
            dispatch(setPreUmrah([...translatedData]));
            break;
          case HAJJ_GUIDE:
            dispatch(setHajjGuide([...translatedData]));
            break;
          case UMRAH_CHECKLIST:
            dispatch(setUmrahChecklist([...translatedData]));
            break;
          case SAFETY_GUIDE:
            dispatch(setSafetyGuide([...translatedData]));
            break;
          default:
            console.warn(
              `No dispatch action defined for apiKey: ${item?.apiKey}`,
            );
            break;
        }
      } else {
        const translatedData = await fetchTranslations([]);
        setChecklistData(checklistData);
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
      }
    });

    return () => unsubscribe();
  }, [item?.apiKey, dispatch, isOffline]);

  const fetchTranslations = async (data: any[]) => {
    try {
      dispatch(setTranslationLoading(true));

      const processedData = await Promise.all(
        data.map(async section => {
          // Translate section label
          const translatedLabel = await translateText({
            from: 'auto',
            to: selectedLanguage?.code,
            text: section.label,
          }).unwrap();

          // Translate items in each section
          const translatedItems = await Promise.all(
            (section.items || []).map(async (item: any) => {
              const translatedText = await translateText({
                from: 'auto',
                to: selectedLanguage?.code,
                text: item.text,
              }).unwrap();

              const translatedDescription = item.description
                ? await translateText({
                    from: 'auto',
                    to: selectedLanguage?.code,
                    text: item.description,
                  }).unwrap()
                : '';

              return {
                ...item,
                text: translatedText || item.text,
                description: translatedDescription || item.description,
              };
            }),
          );

          return {
            ...section,
            label: translatedLabel || section.label,
            items: translatedItems,
          };
        }),
      );

      dispatch(setTranslationLoading(false));
      return processedData;
    } catch (error) {
      console.error('Error translating data:', error);
      dispatch(setTranslationLoading(false));
      return data;
    }
  };

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
    console.log('item', item),
    (
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
          <Text style={styles.itemText}>{item.text?.trans}</Text>
          <Text
            style={[
              styles.itemDescription,
              {
                textAlign: isRTL ? 'right' : 'left',
              },
            ]}>
            {item.description?.trans}
          </Text>
        </View>
      </TouchableOpacity>
    )
  );

  const renderSection = ({item: section, index}: any) => (
    console.log('section', section),
    (
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
            <Text
              style={[
                styles.listTextStyle,
                {
                  marginRight: isRTL ? WP('4') : 0,
                },
              ]}>
              {section?.label?.trans}
            </Text>
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
                  <Text style={styles.emptyListText}>
                    {!isLoading && 'No items available.'}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    )
  );

  return (
    <>
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
            <Text
              style={[
                styles.headingStyle,
                {
                  marginTop: isRTL ? (isIOS() ? 0 : WP('4')) : WP('5'),
                },
              ]}>
              {item?.heading}
            </Text>
            <Text style={styles.subHeadingStyle}>{item?.subheading}</Text>
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
                <Text style={styles.emptyListText}>
                  {!isLoading && 'No items available.'}
                </Text>
              </View>
            )}
          />
        </View>

        <Image source={appImages.backGroundImage} style={styles.bottomImage} />
      </View>
      {isLoading && <AppLoader />}
    </>
  );
};

export default ViewHome;
