import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

const Dashboard = ({navigation}: {navigation: any}) => {
  const handleOnPress: (type: string) => void = (type: string) => {
    switch (type) {
      case 'Alarm':
        navigation.navigate('Alarm');
        break;
      case 'Timer':
        navigation.navigate('Counter');
        break;
      case 'Camera':
        navigation.navigate('Camera');
        break;
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.box} onPress={() => handleOnPress('Alarm')}>
        Alarm
      </Text>
      <Text style={styles.box}>To Do</Text>
      <Text style={styles.box} onPress={() => handleOnPress('Timer')}>
        Timer
      </Text>
      <Text style={styles.box}>Reminder</Text>
      <Text style={styles.box}>SM-based Tracker</Text>
      <Text style={styles.box}>Music Player</Text>
      <Text style={styles.box}>Video Player</Text>
      <Text style={styles.box} onPress={() => handleOnPress('Camera')}>
        Camera
      </Text>
      <Text style={styles.box}>Blutooth Connectivity</Text>
      <Text style={styles.box}>Wifi Connectivity</Text>
      <Text style={styles.box}>Hotspot Data Share</Text>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    marginTop: 50,
    width: '100%',
    marginBottom: 20,
  },
  box: {
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 10,
    height: 40,
    padding: 5,
    fontSize: 20,
    marginVertical: 10,
  },
});
