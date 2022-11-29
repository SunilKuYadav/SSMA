import counterSlice, {decrement, increment, incrementByValue} from './counter';
import cameraSlice, {
  resetUser,
  updateCameraConfig,
  updateCameraSettings,
} from './camera';

export {
  counterSlice,
  decrement,
  increment,
  incrementByValue,
  cameraSlice,
  resetUser,
  updateCameraConfig,
  updateCameraSettings,
};

// Suggestion :  can't we use export from {} "./dir" instead ? , would reduce the number of lines
