import { NativeStackScreenProps } from '@react-navigation/native-stack';


import { ScreenNames } from './RouteName';

export type RootStackParamList = {
  [ScreenNames.BottomTab]: {
    screen?:
      | ScreenNames.HomeStack
      | ScreenNames.MarketStack
      | ScreenNames.TradeStack
      | ScreenNames.AssetStack
      | ScreenNames.MoreStack;
    params?: {
      screen:
        | ScreenNames.HomeScreen
        | ScreenNames.MarketScreen
        | ScreenNames.TradeScreen
        | ScreenNames.AssetScreen
        | ScreenNames.MoreScreen;
      params:
        | MarketStackParamList[ScreenNames.MarketScreen]
        | TradeStackParamList[ScreenNames.TradeScreen]
        | AssetStackParamList[ScreenNames.AssetScreen]
        | MoreStackParamList[ScreenNames.MoreScreen]
        | HomeStackParamList[ScreenNames.HomeScreen];
    };
  };
  [ScreenNames.ModalScreen]: { sort: 'latest' | 'top' } | undefined;
  [ScreenNames.LoginScreen]:
    | {
        screenAfterLogin?:
          | ScreenNames.HomeStack
          | ScreenNames.MarketStack
          | ScreenNames.TradeStack
          | ScreenNames.AssetStack
          | ScreenNames.MoreStack;
      }
    | undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type HomeStackParamList = {
  [ScreenNames.HomeScreen]: undefined;
} & RootStackParamList;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<
  HomeStackParamList,
  T
>;

export type MarketStackParamList = {
  [ScreenNames.MarketScreen]: {
    initTab?: {
      tab: number;
    };
  };
} & RootStackParamList;

export type MarketStackScreenProps<T extends keyof MarketStackParamList> = NativeStackScreenProps<
  MarketStackParamList,
  T
>;

export type TradeStackParamList = {
  [ScreenNames.TradeScreen]: undefined;
} & RootStackParamList;

export type TradeStackScreenProps<T extends keyof TradeStackParamList> = NativeStackScreenProps<
  TradeStackParamList,
  T
>;

export type AssetStackParamList = {
  [ScreenNames.AssetScreen]: {
    initTab?: {
      tab: number;
    };
  };
} & RootStackParamList;

export type AssetStackScreenProps<T extends keyof AssetStackParamList> = NativeStackScreenProps<
  AssetStackParamList,
  T
>;

export type MoreStackParamList = {
  [ScreenNames.MoreScreen]: undefined;
} & RootStackParamList;

export type MoreStackScreenProps<T extends keyof MoreStackParamList> = NativeStackScreenProps<
  MoreStackParamList,
  T
>;

export type TabStackParamList = {
  [ScreenNames.HomeStack]: undefined;
  [ScreenNames.MarketStack]: undefined;
  [ScreenNames.TradeStack]: undefined;
  [ScreenNames.AssetStack]: undefined;
  [ScreenNames.MoreStack]: undefined;
};
