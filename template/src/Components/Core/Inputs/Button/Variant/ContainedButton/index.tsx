import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Typography } from '@/Components/Core';
import { LoadingChildren, TouchableScale } from '@/Components/Custom';
import { withMemo } from '@/HOC';
import { useColor } from '@/Hooks/useColor';
import { checkChildIsElement, insertObjectIf } from '@/Utils';

import { ButtonContext } from '../..';
import { getButtonColorPalette, mergeStyleNames } from '../../hepler';
import { animatedConfig, MAP_TEXT_SIZE } from './config';
import useStyles from './styles';

const ContainedButton = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const { dynamicColor } = useColor();
  const context = useContext(ButtonContext);

  /* Size & color */
  const currentSize = context.size || 'NORMAL';
  const currentColor = context.color || 'PRIMARY';
  const currentColorPalette = getButtonColorPalette(dynamicColor, currentColor);
  const staticButtonStyle = [
    styles.container,
    styles[currentSize],
    context.disabled ? styles.buttonDisabled : undefined,
  ];
  const staticTextStyle = [
    styles[mergeStyleNames(currentSize, 'TEXT')],
    styles[mergeStyleNames(currentColor, 'TEXT')],
    context.textStyle,
    insertObjectIf(context.textColor, { color: context.textColor }),
  ];

  /* Animation */
  const backgroundInStyle = StyleSheet.flatten(context.buttonStyle || {}).backgroundColor as string;
  const originalBackground =
    context.pressOutColor || backgroundInStyle || currentColorPalette.original;
  const pressedBackground =
    context.pressInColor || backgroundInStyle || currentColorPalette.pressed;
  const pressed = useSharedValue<string>(originalBackground);
  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value,
  }));
  const onPressIn = () => {
    if (context.disabled) return;
    pressed.value = pressedBackground;
  };
  const onPressOut = () => {
    if (context.disabled) return;

    pressed.value = withSpring(originalBackground, animatedConfig);
  };

  return (
    <TouchableScale
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[...staticButtonStyle, animatedStyles, context.buttonStyle]}
      disabled={context.disabled}
      onPress={context.onPress}
      {...context}
    >
      <LoadingChildren
        isLoading={context.isLoading}
        textLoading={context.textLoading}
        textStyle={staticTextStyle}
      >
        {checkChildIsElement(context.children) ? (
          context.children
        ) : (
          <Typography
            variant={context.textVariant ?? MAP_TEXT_SIZE[currentSize]}
            style={staticTextStyle}
          >
            {t(String(context.children))}
          </Typography>
        )}
      </LoadingChildren>
    </TouchableScale>
  );
};

export default withMemo(ContainedButton);
