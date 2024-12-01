import React, { useContext, useEffect } from 'react';
import {
  ModalProps,
  Modal as RNModal,
  StatusBar,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { ModalContext } from './ModalWrapper';
import useStyles from './styles';

export interface IModalProps extends ModalProps {
  isVisible: boolean;
  children?: React.ReactNode;
  isCloseBackdrop?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Define a modal key to handle pushing to the stack if displaying multiple modals at the same time
   */
  keyModal: string;
  backgroundColorStatusBar?: string;

  onCloseModal: () => void;
  onHideModal?: () => void;
}

const Modal = (props: IModalProps) => {
  const { styles, dynamicColors } = useStyles();

  const {
    containerStyle,
    onCloseModal,
    isVisible,
    children,
    isCloseBackdrop = true,
    keyModal,
    backgroundColorStatusBar = dynamicColors.Opacity.blueGray50Percent,
    onHideModal,
    ...rest
  } = props;

  const { onPushStackModal, onPopStackModal, stackModal } = useContext(ModalContext);

  useEffect(() => {
    return () => {
      onPopStackModal(keyModal);
      onHideModal?.();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      onPopStackModal(keyModal);
    } else {
      onPushStackModal(keyModal);
    }
  }, [isVisible]);

  if (stackModal?.[0] !== keyModal) return null;

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onCloseModal}
      supportedOrientations={['portrait', 'landscape']}
      {...rest}
    >
      <StatusBar backgroundColor={backgroundColorStatusBar} />
      <View style={[styles.modalBackground, containerStyle]}>
        {children}
        {isCloseBackdrop && (
          <TouchableWithoutFeedback onPress={onCloseModal}>
            <View style={styles.modalContainer} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </RNModal>
  );
};

export default Modal;
