import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {CircularButton} from '../../components';

const Alarm = ({navigation}) => {
  const handleAddAlarmOnPress: () => void = () => {
    navigation.navigate('AddAlarm');
  };
  return (
    <View style={styles.wrapper}>
      <Text>Alarm</Text>
      <View style={styles.alarmWrapper}>
        <CircularButton label="+" labelAction={handleAddAlarmOnPress} />
      </View>
    </View>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  alarmWrapper: {
    position: 'absolute',
    bottom: '12%',
    right: '8%',
  },
});
