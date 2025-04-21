import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {appSVG} from '@src/shared/assets';
import {DUA_DATA, Routes, WP} from '@src/shared/exporter';
import {db} from '@src/config/firebaseConfig';
import {AppHeader} from '@src/shared/components';
import {setDuaData} from '@src/redux/app/appSlice';
import TranslateText from '@src/hooks/useTranslate';
import {AppInput} from '@src/components/primitive/AppInput';
import {MainWrapper} from '@src/components/primitive/MainWrapper';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';

const Dua = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const {duaData, isRTL} = useSelector((state: any) => state.app);
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

    console.log('duaQuery', duaQuery);

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
        } else {
          dispatch(setDuaData([]));
        }
      },
      error => {
        console.error('Error fetching dua:', error);
      },
    );

    return () => unsubscribe();
  }, []);
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
            style={[
              styles.headingStyle,
              {
                marginRight: isRTL ? WP('4') : 0,
              },
            ]}>
            {item.title}
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
        <View style={{flex: 1}}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No Dua found</Text>
              </View>
            }
          />
        </View>
      </View>
    </MainWrapper>
  );
};

export default Dua;
