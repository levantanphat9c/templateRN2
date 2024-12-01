import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Typography } from '@/Components/Core';
import { withMemo } from '@/HOC';
import { scale } from '@/styles';
import { mapV2 } from '@/Utils';

import { ITypographyProps } from '../Typography';
import useStyles from './styles';

interface IProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  initIndex?: number;
  onPress?: (value: number) => void;
  data: string[];
  labelProps?: ITypographyProps;
  sizeIcon?: number;
  color?: string;
  colorChecked?: string;
  itemStyle?: StyleProp<ViewStyle>;
  horizontal?: boolean;
  disabled?: boolean;
}

const RadioButton = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();

  const {
    containerStyle,
    initIndex = 0,
    onPress,
    data,
    labelProps,
    sizeIcon = scale(20),
    color = dynamicColors.UI.textDisable,
    iconStyle,
    colorChecked = dynamicColors.UI.mainPurple,
    itemStyle,
    disabled = false,
  } = props;
  const [indexSelected, setIndexSelected] = useState(initIndex);

  const onPressCheckBox = (value: number) => () => {
    onPress?.(value);
    setIndexSelected(value);
  };

  return (
    <View style={containerStyle}>
      {mapV2(data, (item, index) => (
        <TouchableOpacity
          style={[styles.containerItem, itemStyle]}
          onPress={onPressCheckBox(index)}
          key={item}
          disabled={disabled}
        >
          <View
            style={[
              styles.containerBox,
              iconStyle,
              {
                width: sizeIcon,
                height: sizeIcon,
                borderColor: index === indexSelected ? colorChecked : color,
                borderRadius: sizeIcon / 2,
              },
            ]}
          >
            {index === indexSelected && (
              <View
                style={{
                  width: sizeIcon / 3,
                  height: sizeIcon / 3,
                  backgroundColor: colorChecked,
                  borderRadius: sizeIcon / 3,
                }}
              />
            )}
          </View>
          <Typography style={styles.text} {...labelProps}>
            {item}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default withMemo(RadioButton);
