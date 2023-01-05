import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {APP_CONSTANT} from '../config';
import {Dashboard} from '../pages';
import {RootStackParamList} from '../_types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const {DASHBOARD_PAGES_LIST} = APP_CONSTANT;

const Navigation = () => {
  return (
    <RootStack.Navigator initialRouteName="Dashboard">
      <RootStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      {DASHBOARD_PAGES_LIST.map((item: any) => (
        <RootStack.Screen
          key={item.name}
          name={item.naviagteTo}
          component={item.component}
        />
      ))}
    </RootStack.Navigator>
  );
};

export default Navigation;
