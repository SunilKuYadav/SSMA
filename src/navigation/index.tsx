import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {APP_CONSTANT} from '../config';

const Stack = createNativeStackNavigator();
const {DASHBOARD_PAGES_LIST} = APP_CONSTANT;

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      {DASHBOARD_PAGES_LIST.map(item => (
        <Stack.Screen name={item.naviagteTo} component={item.component} />
      ))}
    </Stack.Navigator>
  );
};

export default Navigation;
