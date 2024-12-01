import React from 'react';
import {
  ColorValue,
  Dimensions,
  I18nManager,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { IS_IOS } from '@/Constants';
import { screenWidth } from '@/styles';

import { getElementVisibleWidth } from './helpers/getTooltipCoordinate';
import { getTooltipStyle } from './helpers/getTooltipStyle';
import Triangle from './Triangle';

export interface ITooltipProps {
  /** To show the tooltip. */
  visible?: boolean;

  /** Flag to determine whether or not to display the pointer. */
  withPointer?: boolean;

  /** Component to be rendered as the display container. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  popover?: React.ReactElement<any>;

  /** Flag to determine to toggle or not the tooltip on press. */
  toggleOnPress?: boolean;

  /** Define type of action that should trigger tooltip. Available options _onPress_, _onLongPress_ */
  toggleAction?: string | 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut';

  /** Tooltip container height. Necessary in order to render the container in the correct place. Pass height according to the size of the content rendered inside the container. */
  height?: number;

  /** Tooltip container width. Necessary in order to render the container in the correct place. Pass height according to the size of the content rendered inside the container. */
  width?: number;

  /** Passes style object to tooltip container */
  containerStyle?: StyleProp<ViewStyle>;

  /** Color of tooltip pointer, it defaults to the [`backgroundColor`](#backgroundcolor) if none is passed. */
  pointerColor?: ColorValue;

  /** Function which gets called on closing the tooltip. */
  onClose?(): void;

  /** Function which gets called on opening the tooltip. */
  onOpen?(): void;

  /** Color of overlay shadow when tooltip is open. */
  overlayColor?: ColorValue;

  /** Flag to determine whether or not display overlay shadow when tooltip is open. */
  withOverlay?: boolean;

  /** Sets backgroundColor of the tooltip and pointer. */
  backgroundColor?: ColorValue;

  /** Color to highlight the item the tooltip is surrounding. */
  highlightColor?: ColorValue;

  /** Force skip StatusBar height when calculating element position. Pass `true` if Tooltip used inside react-native Modal component. */
  skipAndroidStatusBar?: boolean;

  /** Flag to determine whether to disable auto hiding of tooltip when touching/scrolling anywhere inside the active tooltip popover container. When `true`, Tooltip closes only when overlay backdrop is pressed (or) highlighted tooltip button is pressed. */
  closeOnlyOnBackdropPress?: boolean;

  /** Override React Native `Modal` component (usable for web-platform). */
  ModalComponent?: typeof React.Component;

  /** Style to be applied on the pointer. */
  pointerStyle?: StyleProp<ViewStyle>;

  /** */
  animationType?: 'fade' | 'none';
  children?: React.ReactNode;
}
const CustomTooltip: React.FunctionComponent<ITooltipProps> = ({
  withOverlay = true,
  overlayColor = '#fafafa14',
  highlightColor = 'transparent',
  withPointer = true,
  toggleOnPress = true,
  toggleAction = 'onPress',
  height = 40,
  width = 150,
  containerStyle = {},
  backgroundColor = 'red',
  pointerColor = backgroundColor,
  pointerStyle,
  onClose = () => {},
  onOpen = () => {},
  visible = false,
  skipAndroidStatusBar = false,
  ModalComponent = Modal,
  closeOnlyOnBackdropPress = false,
  animationType = 'fade',

  ...props
}) => {
  const isMounted = React.useRef(false);
  const renderedElement = React.useRef<View>(null);

  const [dimensions, setDimensions] = React.useState({
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  });

  const getElementPosition = React.useCallback(() => {
    renderedElement.current?.measure(
      (_frameOffsetX, _frameOffsetY, _width = 0, _height = 0, pageOffsetX = 0, pageOffsetY = 0) => {
        isMounted.current &&
          setDimensions({
            xOffset: pageOffsetX,
            yOffset:
              IS_IOS || skipAndroidStatusBar
                ? pageOffsetY
                : pageOffsetY -
                  Platform.select({
                    android: StatusBar.currentHeight,
                    ios: 20,
                    default: 0,
                  }),
            elementWidth: _width,
            elementHeight: _height,
          });
      },
    );
  }, [skipAndroidStatusBar]);

  const handleOnPress = React.useCallback(() => {
    getElementPosition();
    isMounted.current && toggleOnPress && (visible ? onClose?.() : onOpen?.());
  }, [getElementPosition, onClose, onOpen, toggleOnPress, visible]);

  const Pointer: React.FC<{
    tooltipY: number | string;
  }> = ({ tooltipY }) => {
    const { yOffset, xOffset, elementHeight, elementWidth } = dimensions;
    const pastMiddleLine = yOffset > ((tooltipY as number) || 0);
    if (!withPointer) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
          [I18nManager.isRTL ? 'right' : 'left']:
            xOffset + getElementVisibleWidth(elementWidth, xOffset, screenWidth) / 2 - 7.5,
          zIndex: 99,
        }}
      >
        <Triangle style={pointerStyle} pointerColor={pointerColor} isDown={pastMiddleLine} />
      </View>
    );
  };

  const TooltipHighlightedButtonStyle = React.useMemo<ViewStyle>(() => {
    const { yOffset, xOffset, elementWidth, elementHeight } = dimensions;
    return {
      position: 'absolute',
      top: yOffset,
      [I18nManager.isRTL ? 'right' : 'left']: xOffset,
      backgroundColor: highlightColor,
      overflow: 'visible',
      width: elementWidth,
      height: elementHeight,
    };
  }, [dimensions, highlightColor]);

  const HighlightedButton: React.FC = () => {
    if (!closeOnlyOnBackdropPress) {
      return (
        <Pressable
          testID="tooltipTouchableHighlightedButton"
          onPress={handleOnPress}
          style={TooltipHighlightedButtonStyle}
        >
          {props.children}
        </Pressable>
      );
    } else {
      return (
        <View testID="tooltipTouchableHighlightedButton" style={TooltipHighlightedButtonStyle}>
          {props.children}
        </View>
      );
    }
  };

  /**
   * Listen for change in layout, i.e. Portrait or Landscape
   */
  React.useEffect(() => {
    isMounted.current = true;
    // Wait till element's position is calculated
    requestAnimationFrame(getElementPosition);
    const dimensionsListener = Dimensions.addEventListener('change', getElementPosition);

    return () => {
      isMounted.current = false;
      if (dimensionsListener?.remove) {
        dimensionsListener.remove();
      }
    };
  }, [getElementPosition]);

  /**
   * Calculate position of tooltip
   */
  const tooltipStyle = React.useMemo(
    () =>
      getTooltipStyle({
        ...dimensions,
        backgroundColor,
        containerStyle,
        height,
        width,
        withPointer,
      }),
    [backgroundColor, containerStyle, dimensions, height, width, withPointer],
  );

  return (
    <View collapsable={false} ref={renderedElement}>
      <Pressable {...{ [toggleAction]: handleOnPress }} delayLongPress={250}>
        {props.children}
      </Pressable>
      <ModalComponent transparent visible={visible} onShow={onOpen} animationType={animationType}>
        <TouchableOpacity
          style={{
            backgroundColor: withOverlay ? overlayColor : undefined,
            flex: 1,
          }}
          onPress={handleOnPress}
          activeOpacity={1}
        >
          <View>
            <HighlightedButton />
            <Pointer tooltipY={tooltipStyle.top as number} />
            <View style={[tooltipStyle, { width: 'auto' }]}>{props.popover}</View>
          </View>
        </TouchableOpacity>
      </ModalComponent>
    </View>
  );
};

export default CustomTooltip;
