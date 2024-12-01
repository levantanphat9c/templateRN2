import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MoreScreen } from '@/Containers/MoreTab';

import { MoreStackParamList } from '../NavigationType';
import { ScreenNames } from '../RouteName';

const Stack = createNativeStackNavigator<MoreStackParamList>();
const options = { headerShown: false };

const MoreStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        key={ScreenNames.MoreScreen}
        name={ScreenNames.MoreScreen}
        component={MoreScreen}
      />
    </Stack.Navigator>
  );
};

export default MoreStack;
