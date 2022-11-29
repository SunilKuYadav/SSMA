import React, {ReactNode, FC, useState} from 'react';
import {
  View,
  Animated,
  TouchableHighlightProps,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  LayoutChangeEvent,
  Text,
  Easing,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// import VideoIcon from '../../assets/icon_video.svg';
// import VideoSelected from '../../assets/video_selected.svg';
import CameraGrid from '../../assets/camera_grid.svg';
import TimerIcon from '../../assets/timer.svg';
import FlashIcon from '../../assets/flash.svg';
import GridSelected from '../../assets/grid_selected.svg';
import IconImage from '../../assets/image.svg';
import CameraAction from '../../assets/camera_action.svg';
import IconFlipCamera from '../../assets/flip_camera.svg';

type ControlsProp = {
  flashMode?: any;
  timer?: string;
  brightnessLevel?: string;
  grid?: boolean;
  cameraMode?: 'photo' | 'video';
  containerStyle?: ViewStyle;
  previewUri?: string;
  onAction: (type: string, data?: any) => void;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
};

const Controls: FC<ControlsProp> = ({
  flashMode,
  grid,
  timer,
  containerStyle,
  previewUri,
  onLayout,
  onAction,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const flipAnimation = new Animated.Value(0);

  const cameraOptions = [
    {
      type: 'image',
      icon: <IconImage />,
    },
    {
      type: 'flash',
      selected: flashMode,
      icon: <FlashIcon />,
      options: ['Auto', 'On', 'Off', 'Always On'],
    },
    // {
    //   type: 'brightness',
    //   selected: brightnessLevel,
    //   icon: <Icon name="sun-outline" width={24} height={24} fill="white" />,
    //   options: ['25%', '50%', '75%', '100%'],
    // },
    // {
    //   type: 'video',
    //   icon: cameraMode == 'video' ? <VideoSelected /> : <VideoIcon />,
    // },
    {
      type: 'grid',
      icon: grid ? <GridSelected width={20} /> : <CameraGrid width={20} />,
    },
    {
      type: 'timer',
      selected: timer,
      icon: <TimerIcon />,
      options: ['3 sec', '5 sec', '10 sec', 'off'],
    },
  ];

  const CameraOption = (item: any, index: number) => {
    if (selectedOption && selectedOption != item.type) return null;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
        <ActionButton
          icon={item.icon}
          onPress={() => {
            if (!item.options) return onAction(item.type);
            LayoutAnimation.configureNext({
              duration: 300,
              create: {type: 'easeInEaseOut', property: 'opacity'},
              update: {type: 'easeInEaseOut', property: 'opacity'},
            });
            setSelectedOption(prev => (prev ? '' : item.type));
          }}
        />

        {selectedOption && item.options && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flex: 1,
            }}>
            {item.options.map((el: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={{paddingHorizontal: 5}}
                activeOpacity={0.8}
                onPress={() => onAction(item.type, el?.toLowerCase())}>
                <Text
                  style={{
                    ...styles.optionText,
                    color:
                      el.toLowerCase() == item?.selected?.toLowerCase()
                        ? 'yellow'
                        : 'white',
                  }}>
                  {el}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{...styles.root, ...containerStyle}} onLayout={onLayout}>
      <View
        style={{
          ...styles.container,
          backgroundColor: selectedOption ? '#2B2A2A40' : 'transparent',
        }}>
        {cameraOptions.map(CameraOption)}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
          alignItems: 'center',
        }}>
        <FastImage
          style={styles.previewImage}
          source={{uri: previewUri}}
          resizeMode={'cover'}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onAction('capture')}>
          <CameraAction />
        </TouchableOpacity>

        <Animated.View
          style={{
            transform: [
              {
                rotate: flipAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          }}>
          <IconFlipCamera
            onPress={() => {
              Animated.timing(flipAnimation, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start(() => {
                onAction('flip');
              });
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

type ActionButtonProp = TouchableHighlightProps & {
  icon: ReactNode;
  style?: ViewStyle;
};

export const ActionButton: FC<ActionButtonProp> = ({icon, style, ...props}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={{...styles.actionButton, ...(style as ViewStyle)}}
    {...props}>
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#202020',
    padding: 15,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 50,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: '#2B2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    fontSize: 13,
    color: 'white',
  },
  previewImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});

export default React.memo(Controls);
