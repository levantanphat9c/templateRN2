/* eslint-disable @typescript-eslint/no-explicit-any */
import { includes } from 'ramda';
import { ImageStyle, StyleSheet as RNStyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DarkMode, IColor, LightMode, scale, scaleHorizontal, scaleVertical } from '@/styles';

import { useColor } from './useColor';

export const objectColorMode = (object: any) => {
  return Object.keys(object).reduce((result: { [x: string]: any }, key: string) => {
    const styleField = object[key];

    const typeOfField = typeof styleField;
    const skipChangeColorOrScaleSize = key.startsWith('_');

    const shouldScale =
      typeOfField === 'number' &&
      includes(key, ['lineHeight', 'fontSize']) &&
      !skipChangeColorOrScaleSize;

    const shouldScaleVertical =
      typeOfField === 'number' &&
      includes(key, [
        'height',
        'maxHeight',
        'minHeight',
        'top',
        'bottom',
        'paddingTop',
        'paddingBottom',
        'marginTop',
        'marginBottom',
        'paddingVertical',
        'marginVertical',
        'padding',
        'borderRadius',
      ]) &&
      !skipChangeColorOrScaleSize;

    const shouldScaleHorizontal =
      typeOfField === 'number' &&
      includes(key, [
        'width',
        'maxWidth',
        'minWidth',
        'left',
        'right',
        'paddingLeft',
        'paddingRight',
        'marginLeft',
        'marginRight',
        'paddingHorizontal',
        'marginHorizontal',
      ]) &&
      !skipChangeColorOrScaleSize;

    const newKey = skipChangeColorOrScaleSize ? key.substring(1) : key;
    if (shouldScaleVertical) {
      result[newKey] = scaleVertical(styleField);
    } else if (shouldScaleHorizontal) {
      result[newKey] = scaleHorizontal(styleField);
    } else if (shouldScale) {
      result[newKey] = scale(styleField);
    } else {
      result[newKey] = styleField;
    }

    return result;
  }, {});
};

type InputStyle =
  | ViewStyle
  | TextStyle
  | ImageStyle
  | {
      _backgroundColor?: string;
      _color?: string;
      _borderColor?: string;
      _borderTopColor?: string;
      _borderBottomColor?: string;
      _borderLeftColor?: string;
      _borderRightColor?: string;
      _shadowColor?: string;
      _height?: number;
      _width?: number;
      _borderRadius?: number;
    };

export type InputNamedStyles<T> = {
  [K in keyof T]: InputStyle;
};

const objectMap = <T extends RNStyleSheet.NamedStyles<T> | RNStyleSheet.NamedStyles<any>>(
  object: InputNamedStyles<any>,
  mapFn: any,
) => {
  return Object.keys(object).reduce((result: { [s: string]: InputStyle }, key: string) => {
    result[key] = mapFn(object[key]);

    return result;
  }, {});
};

export const AppStyleSheet = {
  create: <T extends RNStyleSheet.NamedStyles<T> | RNStyleSheet.NamedStyles<any>>(
    styleSheet: T | InputNamedStyles<T>,
  ): T =>
    RNStyleSheet.create(
      objectMap(styleSheet, (style: InputStyle) =>
        objectColorMode(style),
      ) as RNStyleSheet.NamedStyles<T>,
    ) as T,
};

export function getStylesHook<
  T extends RNStyleSheet.NamedStyles<T> | RNStyleSheet.NamedStyles<any>,
>(inputStylesOrCreatorFunction: T | ((color: IColor, darkModeColor: IColor) => T)) {
  if (typeof inputStylesOrCreatorFunction === 'function') {
    const darkMode = AppStyleSheet.create(inputStylesOrCreatorFunction(DarkMode, DarkMode));
    const lightMode = AppStyleSheet.create(inputStylesOrCreatorFunction(LightMode, DarkMode));

    return () => {
      const { isLight } = useColor();
      const inset = useSafeAreaInsets();
      const styles = isLight ? lightMode : darkMode;
      return {
        styles,
        dynamicColors: isLight ? LightMode : DarkMode,
        isLight,
        insetBottom: inset.bottom,
        insetTop: inset.top,
      };
    };
  } else {
    const styles = AppStyleSheet.create(inputStylesOrCreatorFunction);
    return () => {
      const { isLight } = useColor();
      const inset = useSafeAreaInsets();
      return {
        styles,
        dynamicColors: isLight ? LightMode : DarkMode,
        isLight,
        insetBottom: inset.bottom,
        insetTop: inset.top,
      };
    };
  }
}

export type GetStylesHookResult = ReturnType<ReturnType<typeof getStylesHook>>;
