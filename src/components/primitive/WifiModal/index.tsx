import React from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const WifiModal: React.FC<ModalProps> = ({isVisible, children, onClose}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{}}>{children ? children : <Text>Hello!</Text>}</View>
    </Modal>
  );
};

export default WifiModal;
