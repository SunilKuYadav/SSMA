import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import {APP_CONSTANT} from '../../config';

const {DASHBOARD_PAGES_LIST} = APP_CONSTANT;

const Dashboard = ({navigation}: {navigation: any}) => {
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {DASHBOARD_PAGES_LIST.map(item => (
        <Text
          key={item.name}
          style={styles.box}
          onPress={() => navigation.navigate(item.naviagteTo)}>
          {item.name}
        </Text>
      ))}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    padding: 10,
    paddingBottom: 50,
    width: '100%',
  },
  box: {
    textAlign: 'center',
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
