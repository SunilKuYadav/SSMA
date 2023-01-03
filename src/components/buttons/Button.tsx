import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {onPress, title, disabled} = props;
  return (
    <Pressable
      onPress={onPress}
      style={styles.btn(disabled)}
      disabled={disabled}>
      <Text style={styles.title(disabled)}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: active => ({
    flex: 1,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    borderColor: active ? 'grey' : 'black',
  }),
  title: active => ({
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: active ? 'grey' : 'black',
  }),
});
