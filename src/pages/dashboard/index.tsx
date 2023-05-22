import React, {useRef} from 'react';
import {StyleSheet, Text, View, PanResponder, Animated} from 'react-native';
import {Slider} from '../../assets';

import {APP_CONSTANT} from '../../config';

const Dashboard = ({navigation}: {navigation: any}) => {
  const animationRef = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {dx: animationRef.x, dy: animationRef.y},
    ]),
  });

  return (
    // <ScrollView contentContainerStyle={styles.wrapper}>
    <>
      {APP_CONSTANT.DASHBOARD_PAGES_LIST.map(item => (
        <Text
          key={item.name}
          style={styles.box}
          onPress={() => navigation.navigate(item.naviagteTo)}>
          {item.name}
        </Text>
      ))}
      <View style={{backgroundColor: 'pink', height: 90}}>
        <Animated.View
          {...pan.panHandlers}
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'red',
            position: 'absolute',
            transform: [
              {translateX: animationRef.x},
              {translateY: animationRef.y},
            ],
          }}
        />
        <Slider />
      </View>
    </>
    // </ScrollView>
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
