import React, {FC, useState} from 'react';
import {StyleSheet, View, LayoutChangeEvent, Text} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export type ZoomControlProps = {
  zoom: SharedValue<number>;
  levels?: Array<string>;
  thumbHeight?: number;
  position: {[key: string]: number};
};

type ContextType = {
  translationY: number;
};

const ZoomControl: FC<ZoomControlProps> = ({
  levels,
  thumbHeight = 0,
  position,
  zoom,
}) => {
  const data = [...Array(20)];

  const translateY = useSharedValue<number>(zoom.value);

  const [height, setHeight] = useState<number>(0);

  const gestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.translationY = translateY.value;
    },
    onActive: (event, context) => {
      const positions = Math.floor(event.translationY + context.translationY);
      if (positions >= 0 && positions <= (height ?? 0) - thumbHeight) {
        translateY.value = positions;
        const progress =
          10 - Math.floor((10 * positions) / (height - thumbHeight));
        zoom.value = zoom.value = progress;
      }
    },
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    setHeight(nativeEvent.layout.height);
    translateY.value = Math.floor(
      nativeEvent.layout.height - (thumbHeight + 2),
    );
  };

  return (
    <View style={[styles.conatiner, position]} onLayout={onLayout}>
      {levels?.map((item, index) => (
        <View key={index} style={{alignItems: 'center'}}>
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
              height: thumbHeight,
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
      width: index % 2 === 0 ? 15 : 8,
      height: 1,
      marginTop: 8,
      backgroundColor: 'white',
      zIndex: 1,
    }}
  />
);

ZoomControl.defaultProps = {
  thumbHeight: 50,
  levels: ['3x', '2x', '1x'],
};

const styles = StyleSheet.create({
  conatiner: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    backgroundColor: '#1B1E2550',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  thumb: {
    width: 20,
    backgroundColor: '#1B1E25',
    position: 'absolute',
    borderRadius: 10,
    zIndex: 1,
  },
  scale: {
    fontSize: 12,
    color: 'white',
    marginTop: 8,
    marginBottom: 3,
  },
});
export default ZoomControl;
