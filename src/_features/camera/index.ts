import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TorchMode = 'on' | 'off' | undefined;
export type FlashMode = 'auto' | TorchMode;

interface CameraCofig {
  brightness?: string;
  flashMode?: FlashMode;
  torchMode?: TorchMode;
  grid?: boolean;
  timer?: string;
}

interface CameraSettings {
  vibrate?: boolean;
  zoomBar?: boolean;
  zoombarLocation?: string;
  zoombarWidth?: string;
  focusDelay?: string;
  orientationState?: boolean;
}
export interface Location {
  latitude: number;
  longitude: number;
}

// User data types
interface Props {
  cameraConfig: CameraCofig;
  cameraSettings: CameraSettings;
}

// initial state of user's data
const initialState: Props = {
  cameraConfig: {
    flashMode: 'auto',
    torchMode: 'off',
    brightness: '50%',
    grid: false,
    timer: 'off',
  },
  cameraSettings: {
    vibrate: false,
    zoomBar: true,
    orientationState: false,
    zoombarLocation: 'Right',
    zoombarWidth: 'Medium',
    focusDelay: 'Infinte',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,

    updateCameraConfig: (state: Props, action: PayloadAction<CameraCofig>) => {
      state.cameraConfig = Object.assign(state.cameraConfig, action.payload);
    },
    updateCameraSettings: (
      state: Props,
      action: PayloadAction<CameraSettings>,
    ) => {
      state.cameraSettings = Object.assign(
        state.cameraSettings,
        action.payload,
      );
    },
  },
});

export const {resetUser, updateCameraConfig, updateCameraSettings} =
  userSlice.actions;
export default userSlice.reducer;
