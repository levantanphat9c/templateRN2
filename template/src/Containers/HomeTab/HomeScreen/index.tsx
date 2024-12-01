import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { HeaderScreen } from '@/Components';
import { HomeStackScreenProps } from '@/Navigation/NavigationType';
import { ScreenNames } from '@/Navigation/RouteName';

import useStyles from './styles';

const HomeScreen = (_props: HomeStackScreenProps<ScreenNames.HomeScreen>) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <HeaderScreen
        canGoBack={false}
        title={t('HOME.TITLE')}
        containerStyle={styles.containerHeader}
      />
    </View>
  );
};

export default HomeScreen;
