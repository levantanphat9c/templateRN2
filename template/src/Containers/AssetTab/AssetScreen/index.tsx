import React from 'react';
import { View } from 'react-native';

import { HeaderScreen } from '@/Components';
import { AssetStackScreenProps } from '@/Navigation/NavigationType';
import { ScreenNames } from '@/Navigation/RouteName';

const AssetScreen = (_props: AssetStackScreenProps<ScreenNames.AssetScreen>) => {
  return (
    <View>
      <HeaderScreen title={'Assets'} canGoBack={false} />
    </View>
  );
};

export default AssetScreen;
