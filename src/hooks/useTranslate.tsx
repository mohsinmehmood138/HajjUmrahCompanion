import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslateTextMutation} from '@src/redux/TranslationApi/translationApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TranslateText = ({children, style, cacheKey, ...props}: any) => {
  const [translateText] = useTranslateTextMutation();
  const {selectedLanguage} = useSelector((state: any) => state.app);
  const [translatedContent, setTranslatedContent] = useState<string | null>(
    null,
  );

  const textToTranslate = typeof children === 'string' ? children : '';

  useEffect(() => {
    const uniqueCacheKey =
      cacheKey || `${selectedLanguage.code}:${textToTranslate}`;

    const fetchTranslation = async () => {
      if (!textToTranslate) return;

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
        const result = await translateText({
          from: 'auto',
          to: selectedLanguage.code,
          text: textToTranslate,
        }).unwrap();

        setTranslatedContent(result.trans);
        await AsyncStorage.setItem(uniqueCacheKey, result.trans);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedContent(textToTranslate);
      }
    };

    setTranslatedContent(null);
    fetchTranslation();
  }, [textToTranslate, selectedLanguage.code]);

  return (
    <Text style={style} {...props}>
      {translatedContent?.replace('_', ' ') || 'Loading ...'}
    </Text>
  );
};

export default TranslateText;
