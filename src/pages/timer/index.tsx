import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';

import {getFormatedTimeByMiliSecond} from '../../utils';

const Timer = () => {
  // timer states
  const [timerInMinute, setTimerInMinute] = useState<string>('15');
  const [timer, setTimer] = useState<number>(15 * 600);
  const [timerStatus, setTimerStatus] = useState<boolean>(false);

  // stop watch states
  const [stopWatchTimmer, setStopWatchTimmer] = useState<number>(0);
  const [stopWatchStatus, setStopWatchStatus] = useState<boolean>(false);
  const [stopWatchPings, setStopWatchPings] = useState<number[]>([]);

  // handle timer input by in minutes
  const handleTimerInput = (text: any) => {
    const numbersOnly = text.replace(/[^0-9]/g, '');
    if (timerInMinute !== numbersOnly) {
      setTimerInMinute(numbersOnly);
      setTimer(numbersOnly * 600);
    }
  };
  // toggle timer
  const handleTimerStatus = () => setTimerStatus(prev => !prev);

  // toggle stopwatch
  const handleStopWatchStatus = () => setStopWatchStatus(prev => !prev);
  // handle ping while stop watch running
  const handleStopWatchPings = () =>
    setStopWatchPings(prev => [...prev, stopWatchTimmer]);

  // effext of timer
  useEffect(() => {
    let interval: any;

    // check for status and timer value
    if (timerStatus && timer > 0) {
      // if status is true and timer is greater than 0 then start interval of 100 mili second
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 100);
    } else {
      if (timer === 0 && timerStatus) {
        // if timer was running and get to end then set timer to previous time and status to false
        setTimer(parseInt(timerInMinute, 10) * 600);
        setTimerStatus(prev => !prev);
      }
      // handle clean up
      clearInterval(interval);
    }

    // handle clean up in case of component unmounting
    return () => {
      clearInterval(interval);
    };
  }, [timer, timerInMinute, timerStatus]);

  // effect of stop watch
  useEffect(() => {
    let interval: any;

    if (stopWatchStatus) {
      // if status is true then start interval of 100 mili second
      interval = setInterval(() => {
        setStopWatchTimmer(prev => prev + 1);
      }, 100);
    } else {
      // handle clean up
      setStopWatchTimmer(0);
      clearInterval(interval);
    }

    // handle clean up in case of component unmounting
    return () => {
      clearInterval(interval);
    };
  }, [stopWatchStatus]);

  return (
    <ScrollView>
      <View style={styles.cardWrapper}>
        <View style={styles.row}>
          <Text style={styles.title}>Timer</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={timerInMinute}
            onChangeText={handleTimerInput}
          />
        </View>
        <Text style={styles.time(timerStatus)}>
          {getFormatedTimeByMiliSecond(timer)}
        </Text>
        <Button
          style={styles.btn}
          title={timerStatus ? 'stop' : 'start'}
          onPress={handleTimerStatus}
        />
      </View>
      <View style={styles.cardWrapper}>
        <Text style={styles.title}>Stop Watch</Text>
        <Text style={styles.time(stopWatchStatus)}>
          {getFormatedTimeByMiliSecond(stopWatchTimmer)}
        </Text>
        <Button
          style={styles.btn}
          title={stopWatchStatus ? 'stop' : 'start'}
          onPress={handleStopWatchStatus}
        />
        <Button
          style={styles.btn}
          title="ping"
          disabled={!stopWatchStatus}
          onPress={handleStopWatchPings}
        />
        {stopWatchPings.map((item, index) => (
          <View key={item} style={styles.row}>
            <Text>{index + 1} - </Text>
            <Text>{getFormatedTimeByMiliSecond(item)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Timer;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    borderWidth: 4,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  title: {fontSize: 20, fontWeight: 'bold'},
  input: {borderWidth: 1, minWidth: 200, minHeight: 30, paddingHorizontal: 10},
  btn: {
    borderWidth: 1,
    minWidth: 200,
    minHeight: 30,
    paddingHorizontal: 10,
  },
  time: (active: boolean): TextStyle => ({
    fontSize: 30,
    fontWeight: 'bold',
    color: active ? 'green' : 'red',
    textAlign: 'center',
    margin: 10,
  }),
});
