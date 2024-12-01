import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { withMemo } from '@/HOC';
import { getStylesHook } from '@/Hooks';

interface IProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const Card = ({ children, style }: IProps) => {
  const { styles } = useStyles();

  return <View style={[styles.container, style]}>{children}</View>;
};

const useStyles = getStylesHook(dynamicColors => ({
  container: {
    backgroundColor: dynamicColors.UI.sureface,
    borderRadius: 10,
    marginBottom: 16,
  },
}));

export default withMemo(Card);
