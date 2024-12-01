import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export enum BUTTON_GROUP_VARIANT {
  NORMAL_GROUP = 'NORMAL_GROUP',
  BOTTOM_GROUP = 'BOTTOM_GROUP',
}
export type ButtonGroupVariantLiteral = keyof typeof BUTTON_GROUP_VARIANT;

export interface IButtonConfig {
  label?: string;
  subLabel?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}
