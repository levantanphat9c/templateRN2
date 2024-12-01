/* eslint-disable react-native/no-color-literals */
import { isNotNilOrEmpty } from 'ramda-adjunct';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Icon, Typography } from '@/Components/Core';
import { withMemo } from '@/HOC';
import { scale } from '@/styles';
import { insertObjectIf } from '@/Utils';

import { ITypographyProps } from '../Typography';
import useStyles from './styles';

const CHECKBOX_VARIANT = {
  square: 'square',
  rounded: 'rounded',
} as const;
export type CheckBoxVariantLiteral = keyof typeof CHECKBOX_VARIANT;

interface IProps {
  variant?: CheckBoxVariantLiteral;
  containerStyle?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  value?: boolean;
  defaultValue?: boolean;
  label?: string | React.ReactNode;
  labelProps?: ITypographyProps;
  sizeIcon?: number;
  colorIcon?: string;
  backgroundChecked?: string;
  disabled?: boolean;
  disabledColor?: {
    checkbox: string;
    label: string;
  };
  colorTextChecked?: string;
  variantTextChecked?: ITypographyProps['variant'];
  onPress?: (checked: boolean) => void;
}

const CheckBox = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();

  const {
    variant = 'square',
    containerStyle,
    value,
    defaultValue,
    label,
    labelProps,
    sizeIcon = scale(24),
    colorIcon = dynamicColors.Main.white,
    boxStyle,
    backgroundChecked = dynamicColors.UI.mainPurple,
    disabled,
    disabledColor = {
      checkbox: dynamicColors.UI.mainPurpleDisable,
      label: dynamicColors.UI.textDisable,
    },
    colorTextChecked,
    variantTextChecked,
    onPress,
  } = props;
  const [isChecked, setIsChecked] = React.useState(defaultValue ?? false);
  const chooseBetweenChecked = value ?? isChecked;

  const onPressCheckBox = () => {
    onPress?.(!chooseBetweenChecked);
    if (value == null) setIsChecked(!chooseBetweenChecked);
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPressCheckBox}
      disabled={disabled}
    >
      <View
        style={[
          styles[`${variant}ContainerBox`],
          boxStyle,
          {
            width: sizeIcon,
            height: sizeIcon,
            backgroundColor: backgroundChecked,
            borderColor: chooseBetweenChecked
              ? backgroundChecked
              : dynamicColors.UI.textPlaceholder,
            opacity: disabled ? 0.4 : 1,
          },
          insertObjectIf(!chooseBetweenChecked, { backgroundColor: 'transparent' }),
          insertObjectIf(disabled, {
            backgroundColor: chooseBetweenChecked ? disabledColor.checkbox : 'transparent',
            borderColor: disabledColor.checkbox,
          }),
        ]}
      >
        {chooseBetweenChecked && <Icon icon={'Check'} size={sizeIcon * 0.75} color={colorIcon} />}
      </View>

      {isNotNilOrEmpty(label) && (
        <Typography
          style={styles.text}
          {...labelProps}
          {...insertObjectIf(chooseBetweenChecked, {
            color: colorTextChecked,
            variant: variantTextChecked,
          })}
          {...insertObjectIf(disabled, { color: disabledColor.label })}
        >
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default withMemo(CheckBox);
