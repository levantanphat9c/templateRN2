import React from 'react';

import { StackType } from '..';
import { ScreenNames } from '../RouteName';

const options = { headerShown: false };

const MainStack = (Stack: StackType) => {
  return (
    <Stack.Group screenOptions={options}>
      {/* // Authentication */}
      <Stack.Screen
        key={ScreenNames.LoginScreen}
        name={ScreenNames.LoginScreen}
        component={() => null}
      />
    </Stack.Group>
  );
};

export default MainStack;
