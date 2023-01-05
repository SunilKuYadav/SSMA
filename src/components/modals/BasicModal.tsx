import React from 'react';
import {Button, Modal, StyleSheet, View, Text} from 'react-native';

import {BasicModalProps} from '../../_types';

const BasicModal = ({
  children,
  isVisible,
  setIsVisible,
  title,
}: BasicModalProps) => {
  const handleCloseOnPress = () => {
    setIsVisible(false);
  };
  return (
    <Modal visible={isVisible} animationType={'slide'} style={styles.modal}>
      <View style={styles.modalHeader}>
        <View style={styles.closeButtonView}>
          <Button title="Close" onPress={handleCloseOnPress} />
        </View>
        <Text>{title}</Text>
      </View>
      <View style={styles.modalBody}>{children}</View>
    </Modal>
  );
};

export default BasicModal;
const styles = StyleSheet.create({
  modal: {height: 500},
  closeButtonView: {position: 'absolute', left: 10},
  modalBody: {flex: 1},
  modalHeader: {
    flexDirection: 'row',
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
