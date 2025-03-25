import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslateTextMutation} from '@src/redux/TranslationApi/translationApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppLoader} from '@src/components/primitive/AppLoader';

const TranslateText = ({children, style, cacheKey, ...props}: any) => {
  const [translateText] = useTranslateTextMutation();
  const {selectedLanguage} = useSelector((state: any) => state.app);
  const [translatedContent, setTranslatedContent] = useState(null);

  useEffect(() => {
    const uniqueCacheKey = cacheKey || `${selectedLanguage.code}:${children}`;

    const fetchTranslation = async () => {
      if (!children) return;

      try {
        const cached = await AsyncStorage.getItem(uniqueCacheKey);
        if (cached) {
          setTranslatedContent(cached);
          return;
        }
      } catch (error) {
        console.log('Cache read error', error);
      }

      try {
        // Fetch translation
        const result = await translateText({
          from: 'auto',
          to: selectedLanguage.code,
          text: children,
        }).unwrap();

        setTranslatedContent(result.trans);

        // Save to cache
        await AsyncStorage.setItem(uniqueCacheKey, result.trans);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedContent(children);
      }
    };

    setTranslatedContent(null);
    fetchTranslation();
  }, [children, selectedLanguage.code]);

  return (
    <Text style={style} {...props}>
      {translatedContent ? translatedContent : 'Loading ...'}
    </Text>
  );
};

export default TranslateText;
