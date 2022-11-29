import React, {useMemo} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {useAppSelector} from '../../../_app';
import ZoomControl from './ZoomControl';
import ZoomControlHZ from './ZoomControlHZ';

type Props = {
  zoom: SharedValue<number>;
  contentHeight: number;
};

const Zoombar = ({zoom, contentHeight}: Props) => {
  const {zoombarLocation} = useAppSelector(
    state => state.camera.cameraSettings,
  );

  const position = useMemo(() => {
    let value = {};
    switch (zoombarLocation?.toLowerCase()) {
      case 'left':
        value = {left: 20};
        break;
      case 'right':
        value = {right: 20};
        break;
      case 'top':
        value = {top: '10%'};
        break;
      case 'bottom':
        value = {bottom: contentHeight + 60};
        break;
      case 'center':
        value = {bottom: '55%'};
        break;
      default:
        break;
    }
    return value;
  }, [zoombarLocation]);

  if (
    zoombarLocation?.toLowerCase() === 'left' ||
    zoombarLocation?.toLowerCase() === 'right'
  ) {
    return <ZoomControl zoom={zoom} position={position} />;
  }

  return <ZoomControlHZ zoom={zoom} position={position} />;
};

export default React.memo(Zoombar);
