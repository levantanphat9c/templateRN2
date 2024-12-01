import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import MyTabBar from '../MyTabBar';
import { TabStackParamList } from '../NavigationType';
import { ScreenNames } from '../RouteName';
import AssetStack from './AssetStack';
import HomeStack from './HomeStack';
import MarketStack from './MarketStack';
import MoreStack from './MoreStack';
import TradeStack from './TradeStack';

const Tab = createBottomTabNavigator<TabStackParamList>();

const screenOptions = {
  lazy: true,
  freezeOnBlur: true,
  headerShown: false,
  footerShown: false,
  tabBarShowLabel: false,
};

const TabStack = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen key={ScreenNames.HomeStack} name={ScreenNames.HomeStack} component={HomeStack} />
      <Tab.Screen
        key={ScreenNames.MarketStack}
        name={ScreenNames.MarketStack}
        component={MarketStack}
      />
      <Tab.Screen
        key={ScreenNames.TradeStack}
        name={ScreenNames.TradeStack}
        component={TradeStack}
      />
      <Tab.Screen
        key={ScreenNames.AssetStack}
        name={ScreenNames.AssetStack}
        component={AssetStack}
      />
      <Tab.Screen key={ScreenNames.MoreStack} name={ScreenNames.MoreStack} component={MoreStack} />
    </Tab.Navigator>
  );
};

export default TabStack;
