import React from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';

import { withMemo } from '@/HOC';
import { getStylesHook } from '@/Hooks';

import useStyles from './styles';

interface IProps extends ViewStyle {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noScaling?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const RowItem = (props: IProps) => {
  const { children, style, noScaling, onLayout, ...rest } = props;
  const { styles } = useStyles();

  const scaledStyle = noScaling
    ? rest
    : getStylesHook({
        scaledStyle: { ...rest },
      })().styles.scaledStyle;

  return (
    <View style={[styles.container, style, scaledStyle]} onLayout={onLayout}>
      {children}
    </View>
  );
};

export default withMemo(RowItem);
