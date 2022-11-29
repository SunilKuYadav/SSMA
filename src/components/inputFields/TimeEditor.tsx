import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

interface TimeProps {
  minutes: number;
  hours: number;
}
interface TimeEditorProps {
  time: TimeProps;
  onPress?: () => void;
  onHoursPress: (text: string) => void;
  onMinutesPress: (text: string) => void;
}

const TimeEditor = (props: TimeEditorProps) => {
  return (
    <View style={styles.editTimeContainer}>
      <View>
        <TimerInputField
          value={props.time.hours.toString()}
          onChangeAction={props.onHoursPress}
        />
        <Text style={styles.subText}>hour</Text>
      </View>
      <Text style={{fontSize: 85, marginTop: -40}}>:</Text>
      <View>
        <TimerInputField
          value={props.time.minutes.toString()}
          onChangeAction={props.onMinutesPress}
        />
        <Text style={styles.subText}>minute</Text>
      </View>
    </View>
  );
};

export const TimerInputField = ({
  value,
  onChangeAction,
}: {
  value: string;
  onChangeAction: (text: string) => void;
}): JSX.Element => {
  return (
    <TextInput
      value={value}
      onChangeText={(text: string) => onChangeAction(text)}
      style={styles.textInput}
      maxLength={2}
      keyboardType={'numeric'}
    />
  );
};

export default TimeEditor;
const styles = StyleSheet.create({
  textInput: {
    fontSize: 85,
    borderBottomWidth: 2,
  },
  editTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  subText: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
