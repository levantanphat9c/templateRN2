import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

import { UI_COLOR_PALETTES, UI_SIZE } from '@/Constants';
import { ExcludeKeys } from '@/Interfaces';

import { TypographyVariantLiteral } from '../../DataDisplay/Typography/type';

export enum BUTTON_VARIANT {
  CONTAINED = 'contained',
  OUTLINE = 'outline',
  TEXT = 'text',
}
export type ButtonVariantLiteral = keyof typeof BUTTON_VARIANT;

export type ButtonSizeLiteral = keyof typeof UI_SIZE;

export type ButtonColorLiteral = ExcludeKeys<
  typeof UI_COLOR_PALETTES,
  'DARK' | 'BLACK' | 'WHITE' | 'DANGER' | 'SUCCESS' | 'INFO' | 'WARNING'
>;

export interface IButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariantLiteral;
  size?: ButtonSizeLiteral;
  color?: ButtonColorLiteral;
  pressInColor?: string;
  pressOutColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textColor?: string;
  textVariant?: TypographyVariantLiteral;
  disabled?: boolean;
  isLoading?: boolean;
  textLoading?: string;
  minScale?: number;
  children?: string | number | React.ReactNode;
  onPress?: () => void;
}
