import React from 'react';
import { Keyboard, View } from 'react-native';
import codePush from 'react-native-code-push';
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ModalWrapper from '@/Components/Core/DataDisplay/Modal/ModalWrapper';
import { Global, IS_IOS } from '@/Constants';
import { persistor, store } from '@/ReduxSaga';

import Navigation from '../Navigation';

const ComponentTap = IS_IOS ? TapGestureHandler : NativeViewGestureHandler;

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ModalWrapper>
                <View style={{flex: 1}}>
                  <ComponentTap
                    onEnded={() => {
                      if (Global.disableTapGestureHandler === false) {
                        Keyboard.dismiss();
                      }
                    }}
                    shouldCancelWhenOutside={false}
                  >
                    <View style={{flex: 1}}>
                      <Navigation />
                    </View>
                  </ComponentTap>
                </View>
              </ModalWrapper>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const codePushOptions = {
  updateDialog: null,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

export default codePush(codePushOptions)(App);
