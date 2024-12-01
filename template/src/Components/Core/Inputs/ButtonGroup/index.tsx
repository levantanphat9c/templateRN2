import React, { memo } from 'react';
import { StyleProp, View, ViewProps } from 'react-native';

import useStyles from './styles';
import { ButtonGroupVariantLiteral } from './type';

interface INormalGroupButtonProps {
  variant?: ButtonGroupVariantLiteral;
  style?: StyleProp<ViewProps>;
  children: React.ReactNode;
}

const ButtonGroup = ({ variant = 'NORMAL_GROUP', style, children }: INormalGroupButtonProps) => {
  const { styles } = useStyles();
  const containerStyles = [styles[variant], style];

  return <View style={containerStyles}>{children}</View>;
};

export default memo(ButtonGroup);
