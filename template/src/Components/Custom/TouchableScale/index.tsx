import React, { useCallback } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, {
  AnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { HIT_SLOP } from '@/Constants';
import { withMemo } from '@/HOC';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface IProps extends AnimatedProps<TouchableOpacityProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  minScale?: number;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const springConfig = {
  damping: 10,
  mass: 1,
  stiffness: 200,
};

const TouchableScale = ({
  style,
  children,
  activeOpacity = 1,
  minScale = 0.9,
  hitSlop = HIT_SLOP,
  delayLongPress = 200,
  onPressIn,
  onPressOut,
  ...rest
}: IProps) => {
  const scale = useSharedValue(1);

  const sz = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, springConfig),
        },
      ],
    };
  });

  const handlePressIn = useCallback(() => {
    scale.value = minScale;
    onPressIn?.();
  }, [minScale, onPressIn]);

  const handlePressOut = useCallback(() => {
    scale.value = 1;
    onPressOut?.();
  }, [onPressOut]);

  return (
    <AnimatedTouchableOpacity
      style={[sz, style]}
      {...rest}
      activeOpacity={activeOpacity}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={hitSlop}
      delayLongPress={delayLongPress}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default withMemo(TouchableScale);
