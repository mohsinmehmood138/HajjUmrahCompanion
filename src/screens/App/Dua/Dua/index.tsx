import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {appSVG} from '@src/shared/assets';
import {db} from '@src/config/firebaseConfig';
import {Routes, WP} from '@src/shared/exporter';
import {AppHeader} from '@src/shared/components';
import {setDuaData} from '@src/redux/app/appSlice';
import {useIsFocused} from '@react-navigation/native';
import {AppInput} from '@src/components/primitive/AppInput';
import {MainWrapper} from '@src/components/primitive/MainWrapper';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';

const Dua = ({navigation}: any) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [searchText, setSearchText] = useState('');
  const {duaData} = useSelector((state: any) => state.app);
  const [filteredData, setFilteredData] = useState(duaData);

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
    const duaCollection = collection(db, 'dua_collection');
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
        if (duaArray.length > 0) {
          dispatch(setDuaData([...duaArray]));
        }
      },
      error => {
        console.error('Error fetching dua:', error);
      },
    );

    return () => unsubscribe();
  }, []);
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.listContainer,
          {flexDirection: I18nManager?.isRTL ? 'row-reverse' : 'row'},
        ]}
        onPress={() => handleDuaPress(item)}>
        <View
          style={[
            styles.textContainer,
            {flexDirection: I18nManager?.isRTL ? 'row-reverse' : 'row'},
          ]}>
          <Text>{item.id} .</Text>
          <Text
            style={[
              styles.headingStyle,
              {
                marginRight: I18nManager?.isRTL ? WP('4') : 0,
              },
            ]}>
            {item.title}
          </Text>
        </View>
        <View
          style={{
            transform: [{rotate: I18nManager?.isRTL ? '180deg' : '0deg'}],
          }}>
          {appSVG.ChevronRightBlack}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainWrapper style={styles.container}>
      <AppHeader title={t('dua.heading')} />
      <View style={styles.bodyContainer}>
        <AppInput
          onChangeText={text => setSearchText(text)}
          value={searchText}
          leftIcon={appSVG.Search}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Search"
        />
        <View style={{flex: 1}}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </MainWrapper>
  );
};

export default Dua;
