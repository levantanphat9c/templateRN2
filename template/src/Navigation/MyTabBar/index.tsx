import { BottomTabBarProps, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Icon, Typography } from '@/Components/Core';
import { IconNames } from '@/Constants';
import { withMemo } from '@/HOC';
import { getStylesHook } from '@/Hooks';
import { BOTTOM_BAR_HEIGHT, scale } from '@/styles';

import { ScreenNames } from '../RouteName';

const MyTabBar = withMemo((props: BottomTabBarProps) => {
  const { styles } = useStyles();
  const { state, navigation } = props;

  return (
    <Animated.View
      style={styles.tabBarStyle}
      entering={FadeIn.delay(200).duration(200)}
      exiting={FadeOut.duration(200)}
    >
      {state.routes.map((route, index) => {
        const isFocused = index === state.index;
        return (
          <Item
            key={`MyTabBar_routes_${route.name}`}
            isFocused={isFocused}
            screenName={route.name}
            navigation={navigation}
          />
        );
      })}
    </Animated.View>
  );
});

export default MyTabBar;

interface IItemProps {
  isFocused: boolean;
  screenName: string;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const Item = withMemo(({ isFocused, screenName, navigation }: IItemProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const onPress = useCallback(() => {
    navigation.navigate(screenName);
  }, [screenName, navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      key={`tabBarJson[screenName].label-${isFocused}`}
    >
      {isFocused ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Icon icon={tabBarJson[screenName].iconSelectedName} size={scale(24)} />
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Icon icon={tabBarJson[screenName].iconName} size={scale(24)} />
        </Animated.View>
      )}

      <Typography variant={isFocused ? 'BOLD_13' : 'REGULAR_13'}>
        {t(`BOTTOM_TAB.${tabBarJson[screenName].label}`)}
      </Typography>
    </TouchableOpacity>
  );
});

export const useStyles = getStylesHook(dynamicColors => ({
  tabBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: dynamicColors.UI.bGHeader01,
    paddingBottom: 20,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    height: BOTTOM_BAR_HEIGHT,
    alignItems: 'center',
  },
}));

export const tabBarJson: {
  [key: string]: {
    iconName: IconNames;
    iconSelectedName: IconNames;
    label: string;
  };
} = {
  [ScreenNames.HomeStack]: {
    iconName: IconNames.Home,
    iconSelectedName: IconNames.HomeActive,
    label: 'HOME',
  },
  [ScreenNames.MarketStack]: {
    iconName: IconNames.Market,
    iconSelectedName: IconNames.MarketActive,
    label: 'MARKET',
  },
  [ScreenNames.TradeStack]: {
    iconName: IconNames.Trade,
    iconSelectedName: IconNames.TradeActive,
    label: 'TRADE',
  },
  [ScreenNames.AssetStack]: {
    iconName: IconNames.Product,
    iconSelectedName: IconNames.ProductActive,
    label: 'ASSET',
  },
  [ScreenNames.MoreStack]: {
    iconName: IconNames.More,
    iconSelectedName: IconNames.MoreActive,
    label: 'MORE',
  },
};
