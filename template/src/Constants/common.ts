import { Platform } from 'react-native';

import { IconNamesLiteral } from './IconNames';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const HIT_SLOP = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

export interface INormalIconProps {
  icon: IconNamesLiteral;
  size: number;
  color: string;
}

export const Global = {
  disableTapGestureHandler: false,
};
