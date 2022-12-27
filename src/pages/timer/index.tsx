import React from 'react';

import {Button, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../_app';
import {decrement, increment} from '../../_features';

const Timer = () => {
  const dispatch = useAppDispatch();

  const count = useAppSelector(state => state.counter.value);
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleIncrement = () => {
    dispatch(increment());
  };
  return (
    <View>
      <Button title="-" onPress={handleDecrement} />
      <Text>{count}</Text>
      <Button title="+" onPress={handleIncrement} />
    </View>
  );
};

export default Timer;
