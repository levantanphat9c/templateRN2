import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import TradeScreen from '@/Containers/TradeScreen';

import { TradeStackParamList } from '../NavigationType';
import { ScreenNames } from '../RouteName';

const Stack = createNativeStackNavigator<TradeStackParamList>();
const options = { headerShown: false };

const TradeStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name={ScreenNames.TradeScreen} component={TradeScreen} />
    </Stack.Navigator>
  );
};

export default TradeStack;
