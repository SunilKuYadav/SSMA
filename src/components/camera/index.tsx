import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useRef, useEffect, FC, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Vibration,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  Camera,
  CameraProps,
  PhotoFile,
  useCameraDevices,
} from 'react-native-vision-camera';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DeviceInfo from 'react-native-device-info';
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {stat} from 'react-native-fs';
import RNFS from 'react-native-fs';

import Controls, {ActionButton} from './Controls';
import SettingsIcon from '../../assets/icon_settings.svg';
import AddLabel from '../../assets/add_label.svg';

import CameraGrid from './CameraGrid';
import {formatSeconds} from '../../utils/Utils';
import Zoombar from './zoombar';
import {useAppDispatch, useAppSelector} from '../../_app';
import {updateCameraConfig} from '../../_features';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

type Props = {
  lastCaptureImage?: string;
  onCapture?: (media: any) => void;
  label?: string;
  onAddLabel?: () => void;
};

type DeviceInfo = {
  software?: string;
  device: string;
};

const CameraView: FC<Props> = ({
  lastCaptureImage,
  label,
  onAddLabel,
  onCapture,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  const orderNumber = 1000;
  const {latitude, longitude} = {latitude: 10.9, longitude: 20};
  const {flashMode, torchMode, timer, brightness, grid} = useAppSelector(
    state => state.camera.cameraConfig,
  );
  const {zoomBar, vibrate} = useAppSelector(
    state => state.camera.cameraSettings,
  );

  const dispatch = useAppDispatch();
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const devices = useCameraDevices('wide-angle-camera');
  const backFacing = devices.back;

  const mediaFilePath = `${RNFS.DocumentDirectoryPath}/survey`;
  let intervalId: any;
  let recordingInterval: any;

  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');
  const [cameraFacing, setCameraFacing] = useState('back');
  const [controlsHeight, setControlsHeight] = useState<number>(0);
  const [recordingVideo, setRecordingVideo] = useState<boolean>(false);
  const [cameraHeight, setCameraHeight] = useState<number>(0);

  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>();

  const zoom = useSharedValue(1);
  const FOCUS_FRAME_SIZE = 60;
  const [focusPosition, setFocusPosition] = useState<{x: number; y: number}>();

  const animatedProps = useAnimatedProps<Partial<CameraProps>>(
    () => ({zoom: zoom.value}),
    [zoom],
  );

  useEffect(() => {
    //get device configs
    const brand = DeviceInfo.getBrand();
    const deviceid = DeviceInfo.getDeviceId();
    const systemName = DeviceInfo.getSystemName().toLowerCase();
    const systemVersion = DeviceInfo.getSystemVersion();
    const software =
      DeviceInfo.getApplicationName() + '_v' + DeviceInfo.getBuildNumber();

    setDeviceInfo({
      device: `${brand} ${deviceid} ${systemName}_${systemVersion}`,
      software,
    });

    //check for camera permissions
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'denied') {
        await Camera.requestCameraPermission();
      }
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      if (microphonePermission === 'denied') {
        await Camera.requestMicrophonePermission();
      }

      ///check for media dir
      const exists = await RNFS.exists(mediaFilePath);
      if (!exists) {
        RNFS.mkdir(mediaFilePath);
      }
    })();
  }, []);

  useEffect(() => {
    if (timer !== 'off' && timerRunning) {
      intervalId = setInterval(() => {
        if (remainingTime > 0) {
          console.log(remainingTime);
          setRemainingTime(prev => prev - 1);
        } else {
          setRemainingTime(0);
          onCaptureImage();
          setTimerRunning(false);
          clearInterval(intervalId);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [remainingTime, timerRunning]);

  useEffect(() => {
    if (recordingVideo) {
      recordingInterval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(recordingInterval);
  }, [recordingDuration, recordingVideo]);

  const startDelayedCapture = () => {
    const time = timer?.replace(/[^0-9]/g, '');
    setRemainingTime(time ? Number(time) : 0);
    setTimerRunning(true);
  };

  const processMedia = async (file: PhotoFile) => {
    const name = file.path.substring(file.path.lastIndexOf('/') + 1);
    const details = await stat(file.path);
    const newFilePath = `${mediaFilePath}/${name}`;

    RNFS.moveFile(file.path, newFilePath)
      .then(() => {
        const media = {
          name,
          path: newFilePath,
          thumbnail: newFilePath,
          type: 'photo',
          dimensions: `${file.width}X${file.height}`,
          colorspace: `${file.metadata['{Exif}'].ColorSpace}`,
          size: details.size / 1024,
          orientation: file.height > file.width ? 'portrait' : 'landscape',
          label,
          orderNumber,
          latitude,
          longitude,
          ...deviceInfo,
        };
        if (onCapture) onCapture(media);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        if (vibrate) {
          setTimeout(() => Vibration.vibrate(100), 100);
        }
      });
  };

  const onCaptureImage = async () => {
    try {
      if (cameraMode === 'photo') {
        const photo = await camera?.current?.takePhoto({
          flash: flashMode,
        });
        if (!photo?.path) return;
        processMedia(photo);
      }

      if (cameraMode === 'video') {
        setRecordingDuration(0);

        if (recordingVideo) {
          return setRecordingVideo(false);
        }
        setRecordingVideo(true);
        // camera?.current?.startRecording({
        //     flash: flashMode,
        //     onRecordingFinished: video => {
        //         console.log('video', video)
        //         setRecordingVideo(false)
        //     },
        //     onRecordingError: error => console.error(error),
        // });
      }
    } catch (error) {
      console.log('Capture error', error);
    }
  };

  const onAction = (action: string, data: any) => {
    switch (action) {
      case 'flip':
        setCameraFacing(prev => (prev == 'front' ? 'back' : 'front'));
        break;
      case 'flash':
        if (data === 'always on') {
          dispatch(updateCameraConfig({torchMode: 'on', flashMode: 'on'}));
        } else {
          dispatch(updateCameraConfig({torchMode: 'off', flashMode: data}));
        }
        break;
      case 'brightness':
        dispatch(updateCameraConfig({brightness: data}));
        break;
      case 'timer':
        if (timerRunning) return;
        dispatch(updateCameraConfig({timer: data}));
        break;
      case 'video':
        if (recordingVideo) return;
        setCameraMode(prev => (prev === 'video' ? 'photo' : 'video'));
        break;
      case 'grid':
        dispatch(updateCameraConfig({grid: !grid}));
        break;
      case 'capture':
        if (timer === 'off' || recordingVideo) return onCaptureImage();
        startDelayedCapture();
        break;
      default:
        break;
    }
  };

  return (
    <View style={{flex: 1}}>
      <ActionButton
        icon={<SettingsIcon />}
        style={{position: 'absolute', top: 15, left: 15}}
        onPress={() => navigation.navigate('CameraSettings')}
      />

      <ActionButton
        // icon={<Icon name="close-outline" width={24} height={24} fill="white" />}
        icon={undefined}
        style={{position: 'absolute', top: 15, right: 15}}
        onPress={() => navigation.goBack()}
      />

      {backFacing ? (
        <ReanimatedCamera
          ref={camera}
          style={{flex: 1, backgroundColor: 'black'}}
          onLayout={({nativeEvent}) =>
            setCameraHeight(nativeEvent.layout.height)
          }
          // @ts-ignore
          device={cameraFacing === 'back' ? backFacing : devices.front}
          torch={torchMode}
          isActive={isFocused}
          enableZoomGesture
          photo={true}
          animatedProps={animatedProps}
          onTouchEnd={async event => {
            const {pageX, pageY} = event.nativeEvent;
            try {
              await camera?.current?.focus({x: pageX, y: pageY});
              setFocusPosition({x: pageX, y: pageY});
            } catch (err) {}
          }}
        />
      ) : (
        <ActivityIndicator
          style={{flex: 1, backgroundColor: 'black'}}
          color="white"
        />
      )}

      <View
        style={[
          styles.focusView,
          {width: FOCUS_FRAME_SIZE, height: FOCUS_FRAME_SIZE},
          focusPosition?.x
            ? {
                left: focusPosition.x - FOCUS_FRAME_SIZE / 2,
                top: focusPosition.y - FOCUS_FRAME_SIZE / 2,
              }
            : {
                opacity: 0,
              },
        ]}
      />

      {grid && <CameraGrid gridHeight={cameraHeight} />}
      {timerRunning && <Text style={styles.timer}>{remainingTime}</Text>}

      {
        recordingVideo ? (
          <Text style={{...styles.recordingDuration, bottom: controlsHeight}}>
            {formatSeconds(recordingDuration)}
          </Text>
        ) : null
        // <TouchableOpacity
        //   activeOpacity={0.8}
        //   style={{...styles.labelContainer, bottom: controlsHeight}}
        //   onPress={onAddLabel}>
        //   {/* <AddLabel /> */}
        //   <Text>Add label</Text>
        //   <Text style={styles.label}>{label ? label : 'Add Label'}</Text>
        // </TouchableOpacity>
      }

      {zoomBar && <Zoombar zoom={zoom} contentHeight={controlsHeight} />}

      <Controls
        flashMode={torchMode === 'on' ? 'always on' : flashMode}
        brightnessLevel={brightness}
        cameraMode={cameraMode}
        timer={timer}
        grid={grid}
        onAction={onAction}
        onLayout={({nativeEvent}) =>
          setControlsHeight(nativeEvent.layout.height)
        }
        containerStyle={
          cameraMode === 'video'
            ? styles.videoControlsContainer
            : styles.photoControlsContainer
        }
        previewUri={lastCaptureImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#1B1E2560',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
    position: 'absolute',
  },
  label: {
    color: 'white',
    marginStart: 10,
  },
  timer: {
    fontSize: 80,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '90%',
    textAlignVertical: 'center',
    color: 'white',
  },
  videoControlsContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  photoControlsContainer: {
    backgroundColor: '#202020',
  },
  recordingDuration: {
    position: 'absolute',
    backgroundColor: '#FF414140',
    borderColor: '#FF4141',
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 18,
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    alignSelf: 'center',
  },
  focusView: {
    borderColor: 'red',
    position: 'absolute',
    borderWidth: 1,
  },
});

export default React.memo(CameraView);
