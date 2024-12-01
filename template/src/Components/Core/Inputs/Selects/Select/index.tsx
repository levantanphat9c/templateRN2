import React, { useId, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import Icon from '@/Components/Core/DataDisplay/Icon';
import { MyScrollView } from '@/Components/Custom';
import { INormalIconProps } from '@/Constants';
import { withMemo } from '@/HOC';
import { useOrientation } from '@/Hooks/useOrientation';
import { screenHeight, screenWidth } from '@/styles';
import { insertObjectIf } from '@/Utils';

import Modal from '../../../DataDisplay/Modal';
import Typography from '../../../DataDisplay/Typography';
import useStyles from './styles';

interface ISelectProps<V> {
  value?: V;
  labelContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelIcon?: INormalIconProps;
  selectedRightIcon?: INormalIconProps;
  paperStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  selectedBgColor?: string;
  selectedTextColor?: string;
  selectedIconColor?: string;
  selectedRightComponent?: React.ReactNode;
  hideArrowIcon?: boolean;
  disabled?: boolean;
  focusStyle?: StyleProp<ViewStyle>;

  getValueLabel?: (value: V) => string;
  onChange?: (value: V) => void;
}

interface ISelectState {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectContext = React.createContext<ISelectProps<any> & ISelectState>({
  visible: false,
  value: undefined,
  getValueLabel: () => '',
  setVisible: () => {},
});

const Select = <V,>(props: ISelectProps<V>) => {
  const id = useId();
  const { styles, dynamicColors } = useStyles();
  const [visible, setVisible] = useState<boolean>(false);
  const { appOrientation } = useOrientation();
  const btnRef = useRef<View>(null);
  const btnPosition = useSharedValue({ x: 0, y: 0, width: 0, height: 0 });
  const paperPositionX = useSharedValue<number>(0);
  const paperWidth = useSharedValue<number>(0);
  const paperStyles = useSharedValue<ViewStyle>(StyleSheet.flatten(props.paperStyle || {}));

  const openModal = () => {
    btnRef.current?.measureInWindow((x, y, width, height) => {
      btnPosition.value = { x, y, width, height };
    });
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const animatedPaperStyle = useAnimatedStyle(() => {
    const topInStyle = typeof paperStyles.value.top === 'number' ? paperStyles.value.top : 0;
    return {
      left: paperPositionX.value,
      top: btnPosition.value.y + btnPosition.value.height + topInStyle,
    };
  });

  const onPaperLayout = (e: LayoutChangeEvent) => {
    const screenSize = appOrientation === 'PORTRAIT' ? screenWidth : screenHeight;
    const wPaper = e.nativeEvent.layout.width;
    const { x: xButton, width: wButton } = btnPosition.value;
    const isOutOfScreen = xButton + wPaper > screenSize;
    const xModalPosition = isOutOfScreen ? xButton + wButton - wPaper : xButton;

    paperWidth.value = wPaper;
    paperPositionX.value = xModalPosition;
  };

  const memoizeContextValue = useMemo(
    () => ({
      visible,
      setVisible,
      ...props,
    }),
    [visible, setVisible, props],
  );

  const labelContainerStyles = [
    styles.labelContainer,
    props.labelContainerStyle,
    visible && styles.labelContainerFocus,
    visible && props.focusStyle,
  ];

  return (
    <TouchableOpacity
      ref={btnRef}
      onPress={openModal}
      style={labelContainerStyles}
      disabled={props.disabled}
    >
      {props.getValueLabel && (
        <Typography
          variant="REGULAR_14"
          style={props.labelStyle}
          {...insertObjectIf(props.disabled, { color: dynamicColors.UI.textDisable })}
        >
          {props.value && props.getValueLabel(props.value)}
        </Typography>
      )}
      {!props.hideArrowIcon && (
        <Icon
          icon={visible ? 'Alt_Arrow_Up' : 'Alt_Arrow_Down'}
          size={20}
          color={dynamicColors.UI.textContent}
          {...props.labelIcon}
          {...insertObjectIf(visible, { color: props.selectedIconColor })}
          {...insertObjectIf(props.disabled, { color: dynamicColors.UI.textDisable })}
        />
      )}

      {visible && (
        <Modal
          onCloseModal={closeModal}
          isVisible={visible}
          keyModal={`select-modal-${id}`}
          containerStyle={styles.modalContainer}
          supportedOrientations={['portrait', 'landscape']}
        >
          <Animated.View
            onLayout={onPaperLayout}
            style={[styles.modalShadowContainer, paperStyles.value, animatedPaperStyle]}
          >
            <View style={styles.modalContentContainer}>
              <SelectContext.Provider value={memoizeContextValue}>
                <MyScrollView showsVerticalScrollIndicator={false}>{props.children}</MyScrollView>
              </SelectContext.Provider>
            </View>
          </Animated.View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export default withMemo(Select);
