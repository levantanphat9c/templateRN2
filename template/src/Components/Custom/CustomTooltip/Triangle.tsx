import React from 'react';
import { ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type TriangleProps = {
  pointerColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  isDown?: boolean;
};

const Triangle: React.FC<TriangleProps> = ({ style, pointerColor, isDown }) => (
  <View
    style={StyleSheet.flatten([
      styles.triangle,
      {
        backgroundColor: pointerColor,
      },
      style,
      isDown ? styles.down : {},
    ])}
  />
);

const styles = StyleSheet.create({
  down: {},
  triangle: {
    height: 12,
    transform: [
      {
        rotate: '45deg',
      },
      {
        translateY: 4,
      },
      {
        translateX: 8,
      },
    ],
    transformOrigin: 'center',
    width: 12,
    zIndex: 9,
  },
});

export default React.memo(Triangle);
