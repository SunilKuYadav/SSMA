import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInpSection} from '../../_types';

const TextInputSection = (props: TextInpSection) => {
  const {label, selectedValue} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{label}</Text>
        <Text style={styles.valueText}>{selectedValue}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextInputSection;
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
