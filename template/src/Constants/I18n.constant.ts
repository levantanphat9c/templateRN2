import R from 'ramda';
import { NativeModules } from 'react-native';

import { IS_IOS } from './common';

export enum LANG {
  VI = 'vi',
  EN = 'en',
  KO = 'ko',
}

export const DEVICE_LANGUAGE = R.includes(
  LANG.VI,
  IS_IOS
    ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier,
)
  ? LANG.VI
  : LANG.EN;
