import { isEqual } from 'lodash';
import React, { useContext } from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import Icon from '@/Components/Core/DataDisplay/Icon';
import Typography from '@/Components/Core/DataDisplay/Typography';
import { TypographyVariantLiteral } from '@/Components/Core/DataDisplay/Typography/type';
import { withMemo } from '@/HOC';
import { checkChildIsElement, insertObjectIf } from '@/Utils';

import { SelectContext } from '../Select';
import useStyles from './styles';

interface ISelectItemProps<V> extends TouchableOpacityProps {
  value: V;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textProps?: {
    variant?: TypographyVariantLiteral;
    color?: string;
  };
}

const SelectItem = <V,>({ value, style, children, textProps, ...rest }: ISelectItemProps<V>) => {
  const { styles, dynamicColors } = useStyles();
  const {
    value: selectValue,
    selectedBgColor,
    selectedTextColor,
    selectedRightIcon,
    onChange,
    setVisible,
  } = useContext(SelectContext);

  const selectedBackground = selectedBgColor
    ? { backgroundColor: selectedBgColor }
    : styles.selected;

  const containerStyle = [
    styles.container,
    style,
    isEqual(selectValue, value) ? selectedBackground : undefined,
    insertObjectIf(isEqual(selectValue, value), selectedBackground),
  ];

  const textColor = () => {
    if (rest.disabled) {
      return dynamicColors.UI.textDisable;
    }
    if (isEqual(selectValue, value)) {
      return selectedTextColor || dynamicColors.UI.textTitle;
    }
    return dynamicColors.UI.textContent;
  };

  const onPressItem = () => {
    onChange?.(value);
    setVisible(false);
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={onPressItem} {...rest}>
      {checkChildIsElement(children) ? (
        children
      ) : (
        <>
          <Typography variant="REGULAR_14" color={textColor()} {...textProps}>
            {children}
          </Typography>
          {selectedRightIcon && isEqual(selectValue, value) && <Icon {...selectedRightIcon} />}
        </>
      )}
    </TouchableOpacity>
  );
};

export default withMemo(SelectItem);
