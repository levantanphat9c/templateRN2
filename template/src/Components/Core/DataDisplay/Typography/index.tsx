import { isNotNilOrEmpty } from 'ramda-adjunct';
import React, { useMemo } from 'react';
import { TextProps, View } from 'react-native';
import ParsedText, { ParseShape } from 'react-native-parsed-text';
import Animated, { AnimatedProps } from 'react-native-reanimated';

import { IconNamesLiteral } from '@/Constants';
import withMemo from '@/HOC/withMemo';
import { useColor } from '@/Hooks';

import Icon from '../Icon';
import useStyles from './styles';
import { TypographyVariantLiteral } from './type';

export interface ITypographyProps
  extends TextProps,
    Pick<AnimatedProps<TextProps>, 'entering' | 'exiting' | 'layout'> {
  variant?: TypographyVariantLiteral;
  parse?: ParseShape[];
  color?: string;
  secureTextEntry?: boolean;
  secureTextEntryLength?: number;
  secureTextEntryText?: string;
  secureTextEntryIcon?: {
    name: IconNamesLiteral;
    size?: number;
    color?: string;
  };
}

const Typography = (props: ITypographyProps) => {
  const { dynamicColor } = useColor();
  const {
    children,
    variant = 'REGULAR_13',
    color = dynamicColor.UI.textContent,
    parse,
    style,
    secureTextEntry,
    secureTextEntryIcon,
    secureTextEntryText = '*',
    secureTextEntryLength = 5,
    ...rest
  } = props;
  const { styles } = useStyles();
  const finalStyle = [styles.container, styles[variant], { color }, style];
  const isParse = isNotNilOrEmpty(parse);
  const TextComponent = isParse ? ParsedText : Animated.Text;

  const secureTextEntryDisplay = useMemo(() => {
    if (secureTextEntryIcon) {
      return (
        <View style={styles.secureTextEntryIconContainer}>
          {Array.from({ length: secureTextEntryLength }).map((_, index) => (
            <Icon
              key={'secureTextEntryIcon-' + index}
              icon={secureTextEntryIcon.name}
              size={secureTextEntryIcon.size}
              color={secureTextEntryIcon.color}
            />
          ))}
        </View>
      );
    }
    const childEntryLen = typeof children === 'string' ? children.length : 0;
    const finalEntryLen = Math.max(childEntryLen, secureTextEntryLength);
    return secureTextEntryText.repeat(finalEntryLen);
  }, [secureTextEntry, secureTextEntryLength, secureTextEntryIcon]);

  return (
    <TextComponent parse={parse} style={finalStyle} {...rest} allowFontScaling={false}>
      {secureTextEntry ? secureTextEntryDisplay : children}
    </TextComponent>
  );
};

export default withMemo(Typography);
