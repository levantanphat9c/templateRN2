// RNRestartModule.ts

import { NativeModules } from 'react-native';

interface IRNRestartInterface {
  restart(reason: string): void;
}

export const RNRestart = NativeModules.RNRestart as IRNRestartInterface;
