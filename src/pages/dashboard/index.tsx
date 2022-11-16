import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Dashboard = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.box}>1</Text>
      <Text style={styles.box}>2</Text>
      <Text style={styles.box}>3</Text>
      <Text style={styles.box}>4</Text>
      <Text style={styles.box}>5</Text>
      <Text style={styles.box}>6</Text>
      <Text style={styles.box}>7</Text>
      <Text style={styles.box}>8</Text>
      <Text style={styles.box}>9</Text>
      <Text style={styles.box}>10</Text>
      <Text style={styles.box}>11</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    marginTop: 100,
  },
  box: {
    borderWidth: 2,
    width: 100,
    padding: 5,
    margin: 10,
  },
});
