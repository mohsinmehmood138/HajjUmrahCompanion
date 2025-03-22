import React from 'react';
import {Provider} from 'react-redux';
import {store} from '@src/redux/store';
import AppNavigation from '@src/navigation/AppNavigator';
import LanguageInitializer from '@src/assets/languages/LanguageInitializer';

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />;
        <LanguageInitializer />
      </Provider>
    </>
  );
}

export default App;
