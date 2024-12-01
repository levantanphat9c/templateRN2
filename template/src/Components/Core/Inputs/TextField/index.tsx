import { isNotNilOrEmpty } from 'ramda-adjunct';
import React, { ForwardedRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import useStylesText from '@/Components/Core/DataDisplay/Typography/styles';
import { IconNames } from '@/Constants';
import { withMemo } from '@/HOC';
import { scale } from '@/styles';
import { insertObjectIf, insertObjectIfElse } from '@/Utils';

import { IIcoMoonProps } from '../../DataDisplay/Icon';
import ButtonIcon from '../../DataDisplay/Icon/ButtonIcon';
import Tooltip from '../../DataDisplay/Tooltip';
import Typography from '../../DataDisplay/Typography';
import { TypographyVariantLiteral } from '../../DataDisplay/Typography/type';
import useStyles from './styles';

export interface ITextFieldProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  containerInputStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelVariant?: TypographyVariantLiteral;
  labelColor?: string;
  errorMessage?: string;
  typeErrorMessage?: TypographyVariantLiteral;
  iconLeft?: IIcoMoonProps;
  iconRight?: IIcoMoonProps;
  onPressIconLeft?: () => void;
  onPressIconRight?: () => void;
  type?: 'horizontal' | 'vertical';
  showIconInfo?: boolean;
  variantInput?: TypographyVariantLiteral;
  lineColor?: string;
  lineFocusColor?: string;
  backgroundType?: 'line' | 'solid';
  backgroundColor?: string;
  backgroundColorFocus?: string;
  tooltipText?: string;
  rightComponent?: React.ReactNode;
}

const TextField = (props: ITextFieldProps, ref: ForwardedRef<TextInput>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors, isLight } = useStyles();
  const { styles: stylesText } = useStylesText();
  const {
    containerStyle,
    containerInputStyle,
    style,
    label = '',
    labelVariant: labelType = 'MEDIUM_13',
    labelColor = 'black',
    errorMessage = '',
    typeErrorMessage = 'REGULAR_12',
    iconLeft,
    iconRight,
    onPressIconLeft,
    onPressIconRight,
    type = 'vertical',
    showIconInfo = false,
    variantInput = 'REGULAR_18',
    lineFocusColor = dynamicColors.UI.textContent,
    lineColor = dynamicColors.UI.stroke,
    onFocus,
    onBlur,
    backgroundType = 'line',
    backgroundColor = dynamicColors.UI.bGDroplist,
    backgroundColorFocus = dynamicColors.UI.forcusInputField,
    tooltipText,
    rightComponent,
    ...rest
  } = props;

  const isHorizontal = type === 'horizontal';

  const borderColor = useSharedValue(lineColor);
  const background = useSharedValue(backgroundColor);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderBottomWidth: 1,
      borderColor: withTiming(borderColor.value),
    };
  });

  const animatedSolidStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(background.value),
      borderColor: withTiming(borderColor.value),
      borderRadius: 8,
    };
  });

  const onFocusTextInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.(e);

    if (isNotNilOrEmpty(errorMessage)) {
      background.value = dynamicColors.Flag.bG.bGVeryHighRisk;
      borderColor.value = dynamicColors.Flag.bG.bGVeryHighRisk;
      return;
    }
    borderColor.value = lineFocusColor;
    background.value = backgroundColorFocus;
  };
  const onBlurTextInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(e);

    if (isNotNilOrEmpty(errorMessage)) {
      background.value = dynamicColors.Flag.bG.bGVeryHighRisk;
      borderColor.value = dynamicColors.Flag.bG.bGVeryHighRisk;
      return;
    }
    borderColor.value = lineColor;
    background.value = backgroundColor;
  };

  useEffect(() => {
    if (isNotNilOrEmpty(errorMessage)) {
      background.value = dynamicColors.Flag.bG.bGVeryHighRisk;
      borderColor.value = dynamicColors.Flag.bG.bGVeryHighRisk;
    } else {
      borderColor.value = lineColor;
      background.value = backgroundColor;
    }
  }, [errorMessage]);

  return (
    <View style={[insertObjectIf(isHorizontal, styles.container), containerStyle]}>
      {isNotNilOrEmpty(label) && (
        <View
          style={insertObjectIfElse(
            isHorizontal,
            styles.containerLabelHorizontal,
            styles.containerLabel,
          )}
        >
          <Typography variant={labelType} color={labelColor} style={styles.label}>
            {t(label)}
          </Typography>
          {showIconInfo && (
            <Tooltip showArrow={true} content={tooltipText} arrowStyle={styles.toolTipArrow}>
              <ButtonIcon
                icon={{
                  icon: IconNames['Info_Circle'],
                  size: scale(16),
                  color: dynamicColors.Main.mainPurple,
                }}
              />
            </Tooltip>
          )}
        </View>
      )}
      <Animated.View
        style={[
          insertObjectIfElse(
            isHorizontal,
            styles.containerInputTextHorizontal,
            styles.containerInputText,
          ),
          insertObjectIfElse(backgroundType === 'solid', animatedSolidStyle, animatedStyle),
          containerInputStyle,
        ]}
      >
        {iconLeft && <ButtonIcon icon={iconLeft} onPress={onPressIconLeft} />}

        <TextInput
          ref={ref}
          style={[styles.input, stylesText[variantInput], style]}
          onFocus={onFocusTextInput}
          onBlur={onBlurTextInput}
          selectionColor={dynamicColors.UI.mainPurple}
          keyboardAppearance={isLight ? 'light' : 'dark'}
          placeholderTextColor={dynamicColors.UI.textPlaceholder}
          {...rest}
          allowFontScaling={false}
        />

        {rightComponent ||
          (iconRight && <ButtonIcon icon={iconRight} onPress={onPressIconRight} />)}
      </Animated.View>

      {isNotNilOrEmpty(errorMessage) && (
        <Typography
          variant={typeErrorMessage}
          color={dynamicColors.UI.textError}
          style={styles.errorMessage}
        >
          {errorMessage}
        </Typography>
      )}
    </View>
  );
};

export default withMemo(React.forwardRef<TextInput, ITextFieldProps>(TextField));
