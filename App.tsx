import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@src/redux/store';
import AppNavigation from '@src/navigation/AppNavigator';
import LanguageInitializer from '@src/assets/languages/LanguageInitializer';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
        <LanguageInitializer />
      </PersistGate>
    </Provider>
  );
}

export default App;
