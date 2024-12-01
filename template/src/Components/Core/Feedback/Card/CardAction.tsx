import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { withMemo } from '@/HOC';
import { getStylesHook } from '@/Hooks';

interface IProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const CardAction = ({ children, style }: IProps) => {
  const { styles } = useStyles();

  return <View style={[styles.container, style]}>{children}</View>;
};

const useStyles = getStylesHook({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default withMemo(CardAction);
