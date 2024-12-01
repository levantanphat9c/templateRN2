import React, { useCallback, useId, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { withMemo } from '@/HOC';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import { scaleHorizontal, scaleVertical } from '@/styles';

import Modal from '../Modal';
import { TypographyVariantLiteral } from '../Typography/type';
import { calculatePopoverPosition } from './helper';
import ModalContent from './ModalContent';
import useStyles from './styles';

export type TooltipPosition = 'top' | 'bottom' | 'right' | 'left';
export interface IProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  popoverSpaceX?: number;
  popoverSpaceY?: number;
  contentVariant?: TypographyVariantLiteral;
  contentColor?: string;
  disabled?: boolean;
  triggerCloseModal?: boolean;
  showArrow?: boolean;
  popoverStyle?: StyleProp<ViewStyle>;
  arrowStyle?: StyleProp<ViewStyle>;
  position?: TooltipPosition;
}

const Tooltip = ({
  children,
  content,
  popoverSpaceX = 10,
  popoverSpaceY = 10,
  contentVariant,
  contentColor,
  disabled,
  triggerCloseModal,
  showArrow = true,
  popoverStyle,
  arrowStyle,
  position = 'top',
}: IProps) => {
  const id = useId();
  const { styles } = useStyles();
  const [visible, setVisible] = useState<boolean>(false);

  // Refs
  const btnRef = useRef<View>(null);

  // Shared values
  const popoverPosition = useSharedValue({ x: 0, y: 0 });
  const arrowPosition = useSharedValue({ x: 0, y: 0 });

  useUpdateEffect(() => {
    if (triggerCloseModal != null) {
      setVisible(false);
    }
  }, [triggerCloseModal]);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    const { width: popoverWidth, height: popoverHeight } = event.nativeEvent.layout;
    Orientation.getOrientation(orientation => {
      if (!btnRef.current) return;
      const isPortrait = orientation === OrientationType.PORTRAIT;
      const scaleX = isPortrait ? scaleHorizontal : scaleVertical;
      const scaleY = isPortrait ? scaleVertical : scaleHorizontal;

      btnRef.current.measureInWindow((x = 0, y = 0, width, height = 0) => {
        const popoverPlacement = calculatePopoverPosition(
          position,
          x,
          y,
          width,
          height,
          popoverWidth,
          popoverHeight,
          orientation,
          popoverSpaceX,
          popoverSpaceY,
          scaleX,
          scaleY,
        );

        popoverPosition.value = popoverPlacement;

        if (showArrow) {
          arrowPosition.value = {
            x,
            y: popoverPlacement.y + popoverHeight - scaleY(9),
          };
        }
      });
    });
  }, []);

  const popoverAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: popoverPosition.value.x,
      top: popoverPosition.value.y,
    };
  });

  // Animation is error if popoverStyle has right, bottom
  const arrowStyles = useMemo(() => {
    const resultStyle = StyleSheet.flatten(arrowStyle) || {};
    if (resultStyle.right) delete resultStyle.right;
    if (resultStyle.bottom) delete resultStyle.bottom;

    return resultStyle;
  }, [arrowStyle]);

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      ...arrowStyles,
      left: arrowPosition.value.x,
      top: arrowPosition.value.y,
    };
  });

  return (
    <TouchableOpacity disabled={disabled} ref={btnRef} onPress={openModal}>
      {children}
      {visible && (
        <Modal
          isVisible={true}
          onCloseModal={closeModal}
          keyModal={`select-modal-${id}`}
          containerStyle={styles.modalContainer}
          supportedOrientations={['portrait', 'landscape']}
        >
          <Animated.View
            onLayout={onLayoutChange}
            style={[styles.modalShadowContainer, popoverStyle, popoverAnimatedStyle]}
          >
            <ModalContent
              content={content}
              contentVariant={contentVariant}
              contentColor={contentColor}
            />
          </Animated.View>
          {showArrow && <Animated.View style={[styles.arrow, arrowAnimatedStyle]} />}
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export default withMemo(Tooltip);
