import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

import {Counter} from './src/pages';
import {store} from './src/_app';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.wrapper}>
        <Counter />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
