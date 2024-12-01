import React, { forwardRef, useImperativeHandle } from 'react';
import { LayoutChangeEvent, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { withMemo } from '@/HOC';
import { scale } from '@/styles';
import { insertObjectIf } from '@/Utils';

import useStyles from './styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface IProps {
  size?: number;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  backgroundColorActive?: string;
  colorDot?: string;
  colorDotActive?: string;
  onPress?: (isActive: boolean) => void;
  isActive?: boolean;
  disabled?: boolean;
}

export interface IToggleRef {
  forceToggle: (isActive: boolean) => void;
}

const Toggle = forwardRef<IToggleRef, IProps>((props: IProps, ref) => {
  const { styles, dynamicColors } = useStyles();
  const {
    size = scale(24),
    containerStyle,
    backgroundColor = dynamicColors.Component.subButtonL1,
    backgroundColorActive = dynamicColors.Main.mainPurple,
    colorDot = dynamicColors.UI.sureface,
    colorDotActive = colorDot,
    onPress,
    isActive,
    disabled = false,
  } = props;

  const maxX = useSharedValue(0);
  const active = useSharedValue(isActive ? 1 : 0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      borderRadius: size,
      backgroundColor: interpolateColor(
        active.value,
        [0, 1],
        [backgroundColor, backgroundColorActive],
      ),
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: size,
      height: size,
      borderRadius: size,
      transform: [{ translateX: interpolate(active.value, [0, 1], [0, maxX.value]) }],
      backgroundColor: interpolateColor(active.value, [0, 1], [colorDot, colorDotActive]),
    };
  });

  const onPressItem = () => {
    active.value = withTiming(active.value === 0 ? 1 : 0);
    onPress?.(active.value === 0);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const padding =
      (containerStyle?.['padding'] as number) ??
      containerStyle?.['paddingHorizontal'] ??
      containerStyle?.['paddingRight'] ??
      styles.container['paddingHorizontal'];
    maxX.value = event.nativeEvent.layout.width - size - padding - 4;
  };

  useImperativeHandle(ref, () => {
    return {
      forceToggle: (isActive: boolean) => {
        active.value = withTiming(isActive ? 1 : 0);
      },
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        containerStyle,
        animatedContainerStyle,
        insertObjectIf(disabled, { opacity: 0.5 }),
      ]}
      onLayout={onLayout}
      onPress={onPressItem}
      disabled={disabled}
    >
      <Animated.View style={[styles.containerItem, animatedStyle]} />
    </AnimatedTouchableOpacity>
  );
});

export default withMemo(Toggle);
