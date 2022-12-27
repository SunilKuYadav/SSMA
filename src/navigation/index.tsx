import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Dashboard, Timer, Alarm} from '../pages';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Timer" component={Timer} />
      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
};

export default Navigation;
