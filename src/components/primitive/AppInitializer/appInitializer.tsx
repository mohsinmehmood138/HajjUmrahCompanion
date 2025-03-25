// src/components/AppInitializer.js
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {translateAppData} from '@src/shared/utils/translationUtils';

const AppInitializer = ({children}: any) => {
  const {selectedLanguage} = useSelector((state: any) => state.app);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      // Check if we need to translate
      const needsTranslation = await AsyncStorage.getItem('needsTranslation');

      if (needsTranslation === 'true' && selectedLanguage.code !== 'en') {
        setIsTranslating(true);

        // Start translating in background
        setTimeout(async () => {
          try {
            await translateAppData(selectedLanguage.code);
            await AsyncStorage.removeItem('needsTranslation');
          } catch (error) {
            console.error('Translation error:', error);
          } finally {
            setIsTranslating(false);
          }
        }, 100);
      }

      setIsInit(true);
    };

    initApp();
  }, []);

  // Show app content immediately, with an overlay indicator if translating
  if (!isInit) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      {children}

      {isTranslating && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 10,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={{color: '#fff', marginLeft: 8}}>
            Translating content...
          </Text>
        </View>
      )}
    </>
  );
};

export default AppInitializer;
