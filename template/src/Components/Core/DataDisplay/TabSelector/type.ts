import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

import { IIcoMoonProps } from '../Icon';
import { TypographyVariantLiteral } from '../Typography/type';

export type TabSelectorRef = {
  changeCurrentIndex: (index: number) => void;
  currentIndex: number;
};

interface IConditionTab {
  condition: boolean;
  tabs: number[];
}

export interface ITabSelectorProps {
  labels: string[];
  iconLabels?: IIcoMoonProps[] | ImageSourcePropType[];
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: ViewStyle;
  backgroundColorSelected?: string;
  variant?: TabSelectorVariant;
  variantText?: TypographyVariantLiteral;
  variantTextSelected?: TypographyVariantLiteral;
  colorText?: string;
  colorTextSelected?: string;
  isScrollable?: boolean;
  labelsHighlight?: string[];
  scrollable?: boolean;
  initialItem?: number;
  conditionTab?: IConditionTab;
  itemSpacing?: number;
  initTab?: number;
  tabWrapperStyle?: StyleProp<ViewStyle>;

  onPressItem?: (index: number) => void;
}

export const TabSelectorVariant = {
  SOLID: 'SOLID',
  TOGGLE: 'TOGGLE',
  LINE: 'LINE',
  OUTLINE: 'OUTLINE',
};
export type TabSelectorVariant = keyof typeof TabSelectorVariant;

export type TabSelectorRefType = {
  onPressItem: (index: number, ignoreCallback?: boolean) => void;
  getCurrentIndex: () => number;
};
