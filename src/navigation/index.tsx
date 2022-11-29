import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Dashboard, Counter, Alarm, AddAlarm, Camera} from '../pages';
import CameraSettings from '../components/camera/CameraSettings';

const Stack = createNativeStackNavigator();

const CamaraNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen
        name="Cameras"
        options={{headerShown: false}}
        component={Camera}
      />
      <Stack.Screen name="CameraSettings" component={CameraSettings} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Counter" component={Counter} />
      <Stack.Screen name="Alarm" component={Alarm} />
      <Stack.Screen name="AddAlarm" component={AddAlarm} />
      <Stack.Screen
        name="Camera"
        options={{headerShown: false}}
        component={CamaraNavigation}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
