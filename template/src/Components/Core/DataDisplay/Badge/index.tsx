import React, { memo } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import { IconNames, IconNamesLiteral } from '@/Constants';
import { scale } from '@/styles';

import { Typography } from '../..';
import { insertObjectIf } from '../../../../Utils';
import Icon from '../Icon';
import { TypographyVariantLiteral } from '../Typography/type';
import useStyles from './styles';

export interface IBadgeProps {
  text: string;
  colorText?: string;
  colorContainer?: string;
  variant?: TypographyVariantLiteral;
  icon?: IconNames | IconNamesLiteral;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconRight?: IconNames | IconNamesLiteral;
  iconRightSize?: number;
  iconRightColor?: string;
  fitFontSize?: boolean;
}

const Badge = (props: IBadgeProps) => {
  const {
    text,
    colorText = 'black',
    variant = 'REGULAR_12',
    icon,
    iconSize = scale(16),
    iconColor,
    containerStyle,
    textStyle,
    iconRight,
    iconRightSize = scale(16),
    iconRightColor,
  } = props;
  const { styles } = useStyles();

  return (
    <View style={[styles.container, { backgroundColor: props.colorContainer }, containerStyle]}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} style={styles.icon} />}
      <Typography
        variant={variant}
        color={colorText}
        style={textStyle}
        {...insertObjectIf(props.fitFontSize, { adjustsFontSizeToFit: true, numberOfLines: 1 })}
      >
        {text}
      </Typography>
      {iconRight && (
        <Icon icon={iconRight} size={iconRightSize} color={iconRightColor} style={styles.icon} />
      )}
    </View>
  );
};

export default memo(Badge);
