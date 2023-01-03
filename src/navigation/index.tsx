import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {APP_CONSTANT} from '../config';
import {Dashboard} from '../pages';
import AddAlarm from '../pages/alarm/AddAlarm';
import {RootStackParamList} from '../_types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const {DASHBOARD_PAGES_LIST} = APP_CONSTANT;

const Navigation = () => {
  return (
    <RootStack.Navigator initialRouteName="Dashboard">
      <RootStack.Screen name="Dashboard" component={Dashboard} />
      {DASHBOARD_PAGES_LIST.map((item: any) => (
        <RootStack.Screen
          key={item.name}
          name={item.naviagteTo}
          component={item.component}
        />
      ))}
      <RootStack.Screen name="AddAlarm" component={AddAlarm} />
    </RootStack.Navigator>
  );
};

export default Navigation;
