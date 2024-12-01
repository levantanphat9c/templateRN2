import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeScreen } from '@/Containers/HomeTab';

import { HomeStackParamList } from '../NavigationType';
import { ScreenNames } from '../RouteName';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const options = { headerShown: false };

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        key={ScreenNames.HomeScreen}
        name={ScreenNames.HomeScreen}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
