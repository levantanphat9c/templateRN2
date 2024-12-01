import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, BackHandler, StatusBar, View } from 'react-native';

import { IS_ANDROID } from '@/Constants';
import { withMemo } from '@/HOC';

import Typography from '../Typography';
import useStyles from './styles';

type RefType = {
  show: () => void;
  hide: () => void;
};

export const globalLoadingRef = React.createRef<RefType>();

export const globalLoading = {
  show: () => {
    globalLoadingRef?.current?.show();

    setTimeout(() => {
      globalLoadingRef?.current?.hide();
    }, 30000);
  },
  hide: () => {
    globalLoadingRef?.current?.hide();
  },
};

interface IProps {
  visible?: boolean;
}

const GlobalLoading = React.forwardRef<RefType, IProps>((props, ref) => {
  const [visible, setVisible] = useState(props?.visible ?? false);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return { show, hide };
  });

  useEffect(() => {
    if (IS_ANDROID) {
      const onBackPress = () => {
        if (visible) {
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    } else {
      return;
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={dynamicColors.Opacity.blueGray50Percent} />
      <View style={styles.containerLoading}>
        <ActivityIndicator size="small" />

        <Typography variant={'REGULAR_14'} color={dynamicColors.UI.sureface} style={styles.text}>
          {t('COMMON.PROCESSING')}
        </Typography>
      </View>
    </View>
  );
});

GlobalLoading.displayName = 'GlobalLoading';

export default withMemo(GlobalLoading);
