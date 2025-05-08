import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {appSVG} from '@src/shared/assets';
import {Routes, WP} from '@src/shared/exporter';
import {db} from '@src/config/firebaseConfig';
import {AppHeader} from '@src/shared/components';
import {setDuaData} from '@src/redux/app/appSlice';
import TranslateText from '@src/hooks/useTranslate';
import NetInfo from '@react-native-community/netinfo';
import {AppInput} from '@src/components/primitive/AppInput';
import {AppLoader} from '@src/components/primitive/AppLoader';
import {MainWrapper} from '@src/components/primitive/MainWrapper';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {useTranslateTextMutation} from '@src/redux/TranslationApi/translationApi';

const Dua = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const {duaData, isRTL, selectedLanguage} = useSelector(
    (state: any) => state.app,
  );
  const [filteredData, setFilteredData] = useState(duaData);
  const [translateText, {isLoading: translateLoading}] =
    useTranslateTextMutation();

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = duaData.filter((item: any) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(duaData);
    }
  }, [searchText, duaData]);

  const handleDuaPress = (dua: any) => {
    navigation.navigate(Routes.ViewDua, {dua});
  };

  useEffect(() => {
    if (isOffline) {
      return;
    }

    const duaCollection = collection(db, 'dua_collection');
    const duaQuery = query(duaCollection, orderBy('id', 'asc'));

    const unsubscribe = onSnapshot(
      duaQuery,
      querySnapshot => {
        let duaArray: any = [];
        querySnapshot.forEach(doc => {
          if (doc.exists()) {
            duaArray.push({id: doc.id, ...doc.data()});
          }
        });
        if (duaArray.length > 0) {
          fetchTranslations(duaArray);
        } else {
          fetchTranslations([]);
        }
      },
      error => {
        console.error('Error fetching dua:', error);
      },
    );

    return () => unsubscribe();
  }, [isOffline]);

  const fetchTranslations = async (duaArray: any) => {
    try {
      const translatedData = await Promise.all(
        duaArray.map(async (item: any) => {
          const translatedTitle = await translateText({
            from: 'auto',
            to: selectedLanguage?.code,
            text: item.title,
          }).unwrap();

          const translateTranslation = await translateText({
            from: 'auto',
            to: selectedLanguage?.code,
            text: item.translation,
          }).unwrap();

          const translatedDescription = await translateText({
            from: 'auto',
            to: selectedLanguage?.code,
            text: item.description,
          }).unwrap();

          const translatedAdditionalInfo = await translateText({
            from: 'auto',
            to: selectedLanguage?.code,
            text: item.additionalInfo,
          }).unwrap();

          return {
            ...item,
            title: translatedTitle || item.title,
            description: translatedDescription || item.description,
            additionalInfo: translatedAdditionalInfo || item.additionalInfo,
            translation: translateTranslation || item.translation,
          };
        }),
      );

      dispatch(setDuaData(translatedData));
    } catch (error) {
      console.error('Error translating data:', error);
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.listContainer,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        ]}
        onPress={() => handleDuaPress(item)}>
        <View
          style={[
            styles.textContainer,
            {
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}>
          <Text>
            {isRTL && '.'} {index + 1} {!isRTL && '.'}
          </Text>
          <TranslateText
            translateText={translateText}
            style={[
              styles.headingStyle,
              {
                marginRight: isRTL ? WP('4') : 0,
              },
            ]}>
            {item.title?.trans}
          </TranslateText>
        </View>
        <View
          style={{
            transform: isRTL ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
          }}>
          {appSVG.ChevronRightBlack}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainWrapper style={styles.container}>
      <AppHeader title="Prayer" />
      <View style={styles.bodyContainer}>
        <AppInput
          onChangeText={text => setSearchText(text)}
          value={searchText}
          leftIcon={appSVG.Search}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Search"
        />
        {translateLoading ? (
          <AppLoader />
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              key={filteredData.length}
              data={filteredData}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyListContainer}>
                  <Text style={styles.emptyListText}>
                    {!translateLoading && 'No Dua found.'}
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </MainWrapper>
  );
};

export default Dua;
