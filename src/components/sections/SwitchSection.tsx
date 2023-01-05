import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Switch} from 'react-native';
import {SwitchSecInterface} from '../../_types';

const SwitchSections = (props: SwitchSecInterface) => {
  const {label, isSwitchEnabled, setIsSwitchEnabled} = props;

  const toggleSwitch = () => {
    setIsSwitchEnabled(!isSwitchEnabled);
  };
  // todo : remove the static colors
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{label}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isSwitchEnabled ? '#ffffff' : '#ffffff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isSwitchEnabled}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SwitchSections;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    marginVertical: '2%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: {},
});
