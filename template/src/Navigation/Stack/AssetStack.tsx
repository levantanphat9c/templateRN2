import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AssetScreen from '@/Containers/AssetTab/AssetScreen';

import { AssetStackParamList } from '../NavigationType';
import { ScreenNames } from '../RouteName';

const Stack = createNativeStackNavigator<AssetStackParamList>();
const options = { headerShown: false };

const AssetStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        key={ScreenNames.AssetScreen}
        name={ScreenNames.AssetScreen}
        component={AssetScreen}
      />
    </Stack.Navigator>
  );
};

export default AssetStack;
