import { IColor } from '@/styles';

import { ButtonColorLiteral } from './type';

export const mergeStyleNames = (...str: string[]) => {
  return str.join('-');
};

export const getButtonColorPalette = (dynamicColor: IColor, buttonColor: ButtonColorLiteral) => {
  switch (buttonColor) {
    case 'SECONDARY':
      return {
        original: dynamicColor.Component.subButtonL1,
        pressed: dynamicColor.Component.subButtonL1Pressed,
      };

    case 'TERTIARY':
      return {
        original: dynamicColor.Component.subButtonL2,
        pressed: dynamicColor.Component.subButtonL2Pressed,
      };

    case 'MUTED':
      return {
        original: dynamicColor.Component.subButtonL3,
        pressed: dynamicColor.Component.subButtonL3Pressed,
      };

    case 'LIGHT':
      return {
        original: dynamicColor.Component.subButtonL4,
        pressed: dynamicColor.Component.subButtonL4Pressed,
      };

    case 'TRANSPARENT':
      return {
        original: 'transparent',
        pressed: 'transparent',
      };

    default:
      return {
        original: dynamicColor.UI.mainPurple,
        pressed: dynamicColor.UI.mainPurplePressed,
      };
  }
};
