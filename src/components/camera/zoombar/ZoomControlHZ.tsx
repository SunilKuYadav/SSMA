import React, {FC, useState} from 'react';
import {StyleSheet, View, LayoutChangeEvent, Text} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ZoomControlProps} from './ZoomControl';

type ContextType = {
  translationX: number;
};
type Props = ZoomControlProps & {
  thumbWidth?: number;
};

const ZoomControlHZ: FC<Props> = ({levels, thumbWidth = 0, position, zoom}) => {
  const data = [...Array(23)];

  const translationX = useSharedValue<number>(zoom.value);

  const [width, setWidth] = useState<number>(0);

  const gestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translationX = translationX.value;
    },
    onActive: (event, context) => {
      const positions = Math.floor(event.translationX + context.translationX);
      if (positions >= 0 && positions <= (width ?? 0) - thumbWidth) {
        translationX.value = positions;

        zoom.value = Math.floor((10 * positions) / (width - thumbWidth));
      }
    },
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
      ],
    };
  });

  const onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    setWidth(nativeEvent.layout.width);
    translationX.value = 0;
  };

  return (
    <View style={[styles.conatiner, position]} onLayout={onLayout}>
      {levels?.reverse()?.map((item, index) => (
        <View
          key={index}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.scale}>{item}</Text>
          {index != levels.length - 1 && data.map(Segments)}
        </View>
      ))}
      <View style={{height: 5}} />
      <PanGestureHandler onGestureEvent={gestureEvent} maxPointers={1}>
        <Animated.View
          style={[
            {
              ...styles.thumb,
              width: thumbWidth,
            },
            thumbStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

const Segments = (item: any, index: number) => (
  <View
    key={index}
    style={{
      height: index % 2 === 0 ? 15 : 8,
      width: 1,
      marginStart: '1.5%',
      backgroundColor: 'white',
      zIndex: 1,
    }}
  />
);

ZoomControlHZ.defaultProps = {
  thumbWidth: 50,
  levels: ['3x', '2x', '1x'],
};

const styles = StyleSheet.create({
  conatiner: {
    position: 'absolute',
    left: 15,
    right: 15,
    alignItems: 'center',
    backgroundColor: '#1B1E2550',
    paddingVertical: '1%',
    borderRadius: 50,
    flexDirection: 'row',
  },
  thumb: {
    height: 20,
    backgroundColor: '#1B1E25',
    position: 'absolute',
    borderRadius: 10,
    zIndex: 1,
  },
  scale: {
    fontSize: 12,
    color: 'white',
    marginStart: '1%',
    marginEnd: '1%',
  },
});
export default ZoomControlHZ;
