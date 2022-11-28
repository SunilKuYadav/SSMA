import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface CustomSectionProps {
  label: string;
  selectedValue: string;
  selectedValueOnPress?: string;
  icon?: any;
  showButton?: boolean;
  buttonOnPress?: () => void;
}
const AlarmCustomSection = (props: CustomSectionProps) => {
  const {
    label,
    selectedValue,
    // selectedValueOnPress,
    // icon,
    // showButton,
    // buttonOnPress,
  } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{label}</Text>
        <Text style={styles.valueText}>{selectedValue}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlarmCustomSection;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9e9d9d',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  textContainer: {
    justifyContent: 'space-between',
  },
  valueText: {
    marginTop: 10,
  },
});
