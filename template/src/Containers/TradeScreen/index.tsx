import React, { memo } from 'react';
import { View } from 'react-native';

import { TradeStackScreenProps } from '@/Navigation/NavigationType';
import { ScreenNames } from '@/Navigation/RouteName';

import { Typography } from '@/Components/Core/index';


const TradeScreen = memo((_props: TradeStackScreenProps<ScreenNames.TradeScreen>) => {
  return (
    <View>
      <Typography >Trade</Typography>
    </View>
  );
});



export default memo(TradeScreen);
