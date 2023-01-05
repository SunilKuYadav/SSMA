import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import {ScreenWrapper} from './src/components';

import Navigation from './src/navigation';
import {store} from './src/_app';

const App = () => {
  return (
    <Provider store={store}>
      <ScreenWrapper>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ScreenWrapper>
    </Provider>
  );
};

export default App;
