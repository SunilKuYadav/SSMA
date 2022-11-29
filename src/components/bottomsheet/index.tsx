import React, {FC, useEffect, memo} from 'react';
import {
  BackHandler,
  Modal,
  StyleSheet,
  ViewStyle,
  Dimensions,
  View,
  Pressable,
} from 'react-native';

export type BottomSheetProps = {
  visible: boolean;
  hide: () => void;
  children?: React.ReactNode;
  cancelable?: boolean;
  containerStyle?: ViewStyle;
};

const {height} = Dimensions.get('window');

const BottomSheet: FC<BottomSheetProps> = ({
  visible,
  hide,
  cancelable,
  children,
}) => {
  useEffect(() => {
    if (!visible) return;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (cancelable) {
          hide();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={hide}>
      <View style={styles.backgroundContainer}>
        <View style={{flex: 1}}>
          {cancelable && <Pressable style={{flex: 1}} onPress={hide} />}
          <View style={styles.rootContainer} focusable={true}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height,
  },
  backgroundContainer: {
    backgroundColor: '#3D556BCC',
    flex: 1,
    justifyContent: 'flex-end',
  },
  rootContainer: {
    maxHeight: '90%',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingBottom: 'isIphoneWithNotch()' ? 30 : 0,
  },
});

BottomSheet.defaultProps = {
  cancelable: true,
};

export default memo(BottomSheet);
