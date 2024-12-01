import React, { memo } from 'react';
import { View } from 'react-native';

import { getStylesHook } from '@/Hooks';
import { scale } from '@/styles';
import { insertObjectIf, insertObjectIfElse } from '@/Utils';

interface IProps {
  variant?: 'fullWidth' | 'inset' | 'middle';
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
}

const Divider = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const {
    variant = 'fullWidth',
    orientation = 'horizontal',
    color = dynamicColors.UI.saperator,
    thickness = 1,
  } = props;

  const isHorizontal = orientation === 'horizontal';
  const fullWidthStyle = insertObjectIf(variant === 'fullWidth', { flex: 1 });
  const insetStyle = insertObjectIf(
    variant === 'inset',
    isHorizontal ? { marginHorizontal: scale(16) } : { marginVertical: scale(16) },
  );
  const middleStyle = insertObjectIf(
    variant === 'middle',
    isHorizontal ? { marginHorizontal: scale(8) } : { marginVertical: scale(8) },
  );
  const thicknessStyle = insertObjectIfElse(
    isHorizontal,
    { height: thickness },
    { width: thickness },
  );
  const backgroundColor = { backgroundColor: color };

  return (
    <View
      style={[
        styles[orientation],
        fullWidthStyle,
        insetStyle,
        middleStyle,
        thicknessStyle,
        backgroundColor,
      ]}
    />
  );
};

const useStyles = getStylesHook({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});

export default memo(Divider);
