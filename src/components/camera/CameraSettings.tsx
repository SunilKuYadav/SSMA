import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, Vibration, View} from 'react-native';

import IconVibrate from '../../assets/icon_vibrate.svg';
import IconShowSidebar from '../../assets/icon_show_sidebar.svg';
import IconSidebarLocation from '../../assets/slider_location.svg';
import SidebarWidth from '../../assets/slider_width.svg';
import IconAutofocus from '../../assets/icon_autofocus.svg';
import IconOrientationState from '../../assets/orientatioin_state.svg';

import SwitchButton from '../SwitchButton';
import {useDispatch} from 'react-redux';
import Bottomsheet from '../bottomsheet';
import SingleSelectButton from '../SingleSelectButton';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useAppSelector} from '../../_app';
import {updateCameraSettings} from '../../_features';

const CameraSettings = () => {
  const dispatch = useDispatch();
  const {setItem} = useAsyncStorage('camera_settings');

  const cameraSettings = useAppSelector(state => state.camera.cameraSettings);
  const {
    vibrate,
    orientationState,
    zoomBar,
    zoombarWidth,
    zoombarLocation,
    focusDelay,
  } = cameraSettings;

  const [visible, setVisible] = useState<{
    visible: boolean;
    details?: SettingsDetail;
  }>({
    visible: false,
  });

  useEffect(() => {
    setItem(JSON.stringify(cameraSettings), () => {
      console.log('Value saved');
    });
  }, [cameraSettings]);

  const sidebarLocationOptions: SettingsDetail = {
    title: 'Zoom Silder Bar Location',
    selected: zoombarLocation,
    data: ['Top', 'Bottom', 'Left', 'Right', 'Center'],
    onSelect: value => dispatch(updateCameraSettings({zoombarLocation: value})),
  };
  const sidebarWidthOptions: SettingsDetail = {
    title: 'Zoom Silder Bar Width',
    selected: zoombarWidth,
    data: ['Small', 'Medium', 'Large'],
    onSelect: value => dispatch(updateCameraSettings({zoombarWidth: value})),
  };
  const focusDelayOptions: SettingsDetail = {
    title: 'Auto Focus',
    selected: focusDelay,
    data: ['Infinte', '2 seconds', '5 seconds', '10 seconds', '30 seconds'],
    onSelect: value => dispatch(updateCameraSettings({focusDelay: value})),
  };

  const options = [
    {
      icon: <IconVibrate />,
      title: 'Vibrate device while taking a photo',
      rightAction: (
        <SwitchButton
          value={vibrate}
          onChange={value => {
            dispatch(updateCameraSettings({vibrate: value}));
            setTimeout(() => Vibration.vibrate(100), 100);
          }}
        />
      ),
    },
    {
      icon: <IconShowSidebar />,
      title: 'Show Zoom Slider Bar',
      rightAction: (
        <SwitchButton
          value={zoomBar}
          onChange={value => dispatch(updateCameraSettings({zoomBar: value}))}
        />
      ),
    },
    {
      icon: <IconSidebarLocation />,
      title: 'Zoom Silder Bar Location',
      subtitle: zoombarLocation,
      onPress: () =>
        setVisible({visible: true, details: sidebarLocationOptions}),
    },
    {
      icon: <SidebarWidth />,
      title: 'Zoom Silder Bar Width',
      subtitle: zoombarWidth,
      onPress: () => setVisible({visible: true, details: sidebarWidthOptions}),
    },
    {
      icon: <IconAutofocus />,
      title: 'Focus delay before returning to Auto Focus',
      subtitle: focusDelay,
      onPress: () => setVisible({visible: true, details: focusDelayOptions}),
    },
    {
      icon: <IconOrientationState />,
      title: 'Show screen orientation stats',
      subtitle: '',
      rightAction: (
        <SwitchButton
          value={orientationState}
          onChange={value =>
            dispatch(updateCameraSettings({orientationState: value}))
          }
        />
      ),
    },
  ];

  const SettingsOption = (item: any, index: number) => {
    return (
      <Pressable
        key={index}
        style={styles.buttonContainer}
        onPress={item.onPress}>
        {item.icon}
        <View style={{flex: 1, marginHorizontal: 10}}>
          <Text style={styles.heading}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.subheading}>{item.subtitle}</Text>
          )}
        </View>
        {item?.rightAction ? (
          item.rightAction
        ) : (
          // <Icon
          //   name="arrow-ios-forward-outline"
          //   width={24}
          //   height={24}
          //   fill="#0006"
          // />
          <Text>arrow-ios-forward-outline</Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text>Camara setting</Text>
      {options.map(SettingsOption)}

      <Bottomsheet
        visible={visible.visible}
        hide={() => setVisible(prev => ({...prev, visible: false}))}>
        <View style={{marginHorizontal: 15, marginTop: 15}}>
          <Text style={styles.bottomSheetTitle}>{visible.details?.title}</Text>
          {visible.details?.data.map(el => (
            <SingleSelectButton
              key={el}
              label={el}
              checked={
                el.toLowerCase() ==
                visible.details?.selected?.toLocaleLowerCase()
              }
              onPress={() => {
                if (visible.details?.onSelect) visible.details?.onSelect(el);
                setVisible(prev => ({...prev, visible: false}));
              }}
            />
          ))}
          <View style={{height: 20}} />
        </View>
      </Bottomsheet>
    </View>
  );
};

type SettingsDetail = {
  title: string;
  selected?: string;
  onSelect?: (value: string) => void;
  data: Array<string>;
};

const styles = StyleSheet.create({
  bottomSheetTitle: {
    color: '#00f',
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginHorizontal: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    color: '#00f',
    lineHeight: 24,
  },
  subheading: {
    fontSize: 14,
    color: '#0004',
    lineHeight: 24,
    textTransform: 'capitalize',
  },
});

export default CameraSettings;
