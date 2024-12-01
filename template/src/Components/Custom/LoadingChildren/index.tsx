import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import { Typography } from '@/Components/Core';
import { UI_SPACING } from '@/Constants';
import { getStylesHook } from '@/Hooks';

interface ILoadingChildrenProps {
  size?: 'small' | 'large';
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  textLoading?: string;
  children: React.ReactNode;
}

const LoadingChildren = ({
  isLoading,
  size,
  color,
  style,
  textLoading,
  textStyle,
  children,
}: ILoadingChildrenProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  if (isLoading) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <ActivityIndicator size={size} color={color} style={style} />
        <Typography style={[styles.text, textStyle]}>
          {textLoading ?? t('COMMON.LOADING')}
        </Typography>
      </View>
    );
  }

  return <>{children}</>;
};

const useStyles = getStylesHook({
  text: {
    marginLeft: UI_SPACING.GAP_BASE,
  },
});

export default LoadingChildren;
