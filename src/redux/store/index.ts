import appReducer from '@src/redux/app/appSlice';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {translationApi} from '../TranslationApi/translationApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  app: appReducer,
  [translationApi.reducerPath]: translationApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app'],
  blacklist: [translationApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const root = (state: object | any, action: object | any) => {
  if (action.type === 'app/logOut') {
    return persistedReducer(state, action);
  } else {
    return persistedReducer(state, action);
  }
};

export const store = configureStore({
  reducer: root,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(translationApi.middleware),
});

export const persistor = persistStore(store);
