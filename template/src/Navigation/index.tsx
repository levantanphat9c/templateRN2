import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';

import ModalScreen from '@/Containers/ModalScreen';
import { IS_ANDROID } from '@/Constants';
import { navigationRef } from '@/Services';

import { RootStackParamList } from './NavigationType';
import { ScreenNames } from './RouteName';
import MainStack from './Stack/MainStack';
import TabStack from './Stack/TabStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type StackType = typeof Stack;

export const options = { headerShown: false, freezeOnBlur: true };

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name={ScreenNames.BottomTab} component={TabStack} />
        {MainStack(Stack)}
        {/* Common ModalSlideFromBottomIOS */}
        <Stack.Group
          screenOptions={{
            presentation: IS_ANDROID ? 'transparentModal' : 'modal',
            headerShown: false,
            ...(IS_ANDROID && {
              animation: 'slide_from_bottom',
            }),
          }}
          navigationKey="Modal"
        >
          <Stack.Screen name={ScreenNames.ModalScreen} component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
