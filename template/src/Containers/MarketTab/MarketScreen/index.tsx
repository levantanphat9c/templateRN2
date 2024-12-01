import React from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HeaderScreen } from '@/Components';
import { MarketStackScreenProps } from '@/Navigation/NavigationType';
import { ScreenNames } from '@/Navigation/RouteName';

import useStyles from './MarketScreen.styles';

const MarketScreen = (_props: MarketStackScreenProps<ScreenNames.MarketScreen>) => {
  const { t } = useTranslation();
  const { styles,  } = useStyles();

  return (
    <GestureHandlerRootView style={styles.container}>
      <HeaderScreen
        title={t('COMMON.MARKET')}
        canGoBack={false}
      />
    </GestureHandlerRootView>
  );
};

export default MarketScreen;
