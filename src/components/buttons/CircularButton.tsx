import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const CircularButton = ({
  label,
  labelAction,
}: {
  label: string;
  labelAction: () => void;
}) => {
  return (
    <Pressable style={styles.button} onPress={labelAction}>
      <Text style={styles.pressButton}>{label}</Text>
    </Pressable>
  );
};

export default CircularButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#40a1ad',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    borderRadius: 100,
  },
  pressButton: {fontSize: 25},
});
