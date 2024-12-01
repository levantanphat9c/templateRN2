import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { withMemo } from '@/HOC';
import { getStylesHook } from '@/Hooks';

interface IProps extends ViewStyle {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noScaling?: boolean;
}

const CardContent = (props: IProps) => {
  const { children, style, noScaling, ...rest } = props;
  const { styles } = useStyles();

  const scaledStyle = noScaling
    ? rest
    : getStylesHook({
        scaledStyle: { ...rest },
      })().styles.scaledStyle;

  return <View style={[styles.container, style, scaledStyle]}>{children}</View>;
};

const useStyles = getStylesHook({
  container: {
    padding: 10,
  },
});

export default withMemo(CardContent);
