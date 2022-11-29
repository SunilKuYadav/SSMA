import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {AlarmCustomSections, TimeEditor} from '../../components';

const AddAlarm = () => {
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const handleSaveOnPress = () => {};
  const handleCancelOnPress = () => {};
  const handleHourChange = (text: string) => {
    setTime(state => ({...state, hours: Number(text)}));
  };
  const handleMinuteChange = (text: string) => {
    setTime(state => ({...state, minutes: Number(text)}));
  };

  return (
    <View>
      <Text>Type in time</Text>
      <TimeEditor
        time={time}
        onHoursPress={handleHourChange}
        onMinutesPress={handleMinuteChange}
      />
      <AlarmCustomSections label="Label" selectedValue="add your label here" />
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={handleSaveOnPress} />
        <Button title="Save" onPress={handleCancelOnPress} />
      </View>
    </View>
  );
};

export default AddAlarm;
const styles = StyleSheet.create({
  buttonContainer: {},
});
