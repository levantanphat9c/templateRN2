import { ColorValue, I18nManager, OpaqueColorValue, StyleSheet, ViewStyle } from 'react-native';

import { screenHeight, screenWidth } from '@/styles';

import getTooltipCoordinate from './getTooltipCoordinate';

export const getTooltipStyle = ({
  yOffset,
  xOffset,
  elementHeight,
  elementWidth,
  width,
  height,
  withPointer,
  backgroundColor,
  containerStyle,
}: {
  yOffset: number;
  xOffset: number;
  elementHeight: number;
  elementWidth: number;
  width: number;
  height: number;
  withPointer: boolean;
  backgroundColor: ColorValue | OpaqueColorValue;
  containerStyle: any;
}): ViewStyle => {
  const { x, y } = getTooltipCoordinate(
    xOffset,
    yOffset,
    elementWidth,
    elementHeight,
    screenWidth,
    screenHeight,
    width,
    height,
    withPointer,
  );
  return StyleSheet.flatten([
    {
      position: 'absolute',
      [I18nManager.isRTL ? 'right' : 'left']: x,
      top: y,
      width,
      minHeight: height,
      backgroundColor,
      // default styles
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderRadius: 10,
      padding: 10,
      maxWidth: screenWidth * 0.8,
    },
    containerStyle,
  ]);
};
