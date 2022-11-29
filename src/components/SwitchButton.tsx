import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import Animated, {interpolateColors, spring} from 'react-native-reanimated';

type ComponentProps = {
  onChange?: (value: boolean) => void;
  value?: boolean;
  activeColor: string;
  inactiveColor: string;
  thumbColor?: string;
  thumbStyle?: ViewStyle;
  containerStyle?: ViewStyle;
};
const SwitchButton = ({
  onChange,
  activeColor,
  inactiveColor,
  thumbColor,
  value,
  thumbStyle,
  containerStyle,
}: ComponentProps) => {
  const switchTranslate = useRef(new Animated.Value(0)).current;
  const [layout, setLayout] = useState<{
    thumbWidth: number;
    switchWidth: number;
  }>({
    switchWidth: 0,
    thumbWidth: 0,
  });
  const toValue = useMemo(() => {
    if (layout.switchWidth && layout.thumbWidth) {
      return layout.switchWidth - layout.thumbWidth - 5; //extra margin and paddings;
    }
    return 0;
  }, [layout]);

  useEffect(() => {
    if (!layout.switchWidth) return;
    spring(switchTranslate, {
      toValue: value ? toValue : 0,
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();
  }, [layout, value]);

  const interpolateBackgroundColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, toValue],
      outputColorRange: [inactiveColor, activeColor],
    }),
  };

  const onPress = React.useCallback(() => {
    if (onChange) onChange(!value);
  }, [onChange, value]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          styles.containerStyle,
          containerStyle,
          interpolateBackgroundColor,
        ]}
        onLayout={event => {
          if (layout.switchWidth) return;
          const {width} = event.nativeEvent.layout;
          setLayout(prev => ({...prev, switchWidth: width}));
        }}>
        <Animated.View
          style={[
            styles.circleStyle,
            {...thumbStyle, backgroundColor: thumbColor},
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
            styles.shadowValue,
          ]}
          onLayout={event => {
            if (layout.thumbWidth) return;
            const {width} = event.nativeEvent.layout;
            setLayout(prev => ({...prev, thumbWidth: width}));
          }}
        />
      </Animated.View>
    </Pressable>
  );
};

SwitchButton.defaultProps = {
  activeColor: '#0f09',
  inactiveColor: '#7f7f7f',
  thumbColor: '#FFF',
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  containerStyle: {
    width: 45,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
  },
  shadowValue: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
export default SwitchButton;
