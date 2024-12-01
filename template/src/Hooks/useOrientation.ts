import { useEffect } from 'react';
import Orientation, {
  OrientationType,
  useDeviceOrientationChange,
} from 'react-native-orientation-locker';

import useMergingState from './useMergingState';

export type OrientationLiteral = keyof typeof OrientationType;

interface IState {
  appOrientation: OrientationLiteral;
  deviceOrientation: OrientationLiteral;
}

export function useOrientation() {
  const [state, setState] = useMergingState<IState, null>({
    appOrientation: Orientation.getInitialOrientation(),
    deviceOrientation: Orientation.getInitialOrientation(),
  });

  Orientation.getOrientation(res => {
    if (res !== state.appOrientation) {
      setState({ appOrientation: res });
    }
  });

  useDeviceOrientationChange(res => {
    if (res !== state.deviceOrientation) {
      setState({ deviceOrientation: res });
    }
  });

  useEffect(() => {
    Orientation.getDeviceOrientation((res: OrientationLiteral) => {
      if (res !== state.deviceOrientation) {
        setState({ deviceOrientation: res });
      }
    });
  }, []);

  return state;
}
