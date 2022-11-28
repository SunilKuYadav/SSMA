import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Dashboard, Counter, Alarm, AddAlarm} from '../pages';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Counter" component={Counter} />
      <Stack.Screen name="Alarm" component={Alarm} />
      <Stack.Screen name="AddAlarm" component={AddAlarm} />
    </Stack.Navigator>
  );
};

export default Navigation;
