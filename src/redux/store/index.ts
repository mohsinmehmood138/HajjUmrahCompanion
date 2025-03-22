import {persistReducer, persistStore} from 'redux-persist';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appReducer from '@src/redux/app/appSlice';

const rootReducer = combineReducers({
  app: appReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app'],
  blacklist: [],
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
    }).concat(),
});
export const persistor = persistStore(store);
