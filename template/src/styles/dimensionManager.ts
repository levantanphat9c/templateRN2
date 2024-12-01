import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

import { IS_IOS } from '@/Constants';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = IS_IOS
  ? Dimensions.get('window').height
  : // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');
// React-Native has a few issues detecting the correct device width/height of some devices.

const isIphoneX = IS_IOS && screenHeight >= 812;

export const statusBarHeight = Platform.select({
  ios: isIphoneX ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

export const BOTTOM_BAR_HEIGHT = 60;
export const BASE_WIDTH = 375;
export const BASE_HEIGHT = 812;

export const widthPercentageToDP = (widthPercent: number) => {
  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * widthPercent) / 100);
};

export const heightPercentageToDP = (heightPercent: number) => {
  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * heightPercent) / 100);
};

export const scaleVertical = (size: number) => {
  return (screenHeight / BASE_HEIGHT) * size;
};

export const scaleHorizontal = (size: number) => {
  return (screenWidth / BASE_WIDTH) * size;
};

export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scaleVertical(size) - size) * factor;
};

const isUseScaleVertical = BASE_WIDTH / BASE_HEIGHT < screenWidth / screenHeight;

export const scaleText = (size: number) => {
  return isUseScaleVertical ? scaleVertical(size) : scaleHorizontal(size);
};

export const scale = (size: number) => {
  return isUseScaleVertical ? scaleVertical(size) : scaleHorizontal(size);
};

export default {
  widthPercentageToDP,
  heightPercentageToDP,
  scaleVertical,
  scaleHorizontal,
  moderateScale,
  scaleText,
  scale,
  screenHeight,
};
