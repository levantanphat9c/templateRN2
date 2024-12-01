import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MarketScreen from '@/Containers/MarketTab/MarketScreen';

import { MarketStackParamList } from '../NavigationType';
import { ScreenNames } from '../RouteName';

const Stack = createNativeStackNavigator<MarketStackParamList>();
const options = { headerShown: false };

const MarketStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        key={ScreenNames.MarketScreen}
        name={ScreenNames.MarketScreen}
        component={MarketScreen}
      />
    </Stack.Navigator>
  );
};

export default MarketStack;
