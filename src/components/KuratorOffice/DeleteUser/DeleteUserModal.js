import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, Animated} from 'react-native';
import DeleteUserButton from './DeleteButton/DeleteUserButton';
import CancelButton from './CancelButton';

export const DeleteUserModal = ({modalVisible, setModalVisible, clientId}) => {
  const [closingModal, setClosingModal] = useState(false);
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));

  const modalTranslate = animatedValue1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-15, -15, 0],
  });
  const modalOpacity = animatedValue2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.0, 1],
  });

  useEffect(() => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  if (closingModal) {
    Animated.timing(animatedValue1, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedValue2, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  const animatedTranslateStyle = {
    transform: [{translateX: modalTranslate}],
    opacity: modalOpacity,
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <Animated.View style={[styles.viewStyle, animatedTranslateStyle]}>
        <View style={styles.info}>
          <Text style={styles.textStyle}>
            Delete user profile and linked rooms (not account)?
          </Text>
        </View>
        <View style={styles.coupledButtons}>
          <DeleteUserButton
            closingModal={closingModal}
            setClosingModal={setClosingModal}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            clientId={clientId}
          />
          <CancelButton
            closingModal={closingModal}
            setClosingModal={setClosingModal}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    width: 340,
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 30,
    overflow: 'visible',
  },
  info: {
    backgroundColor: 'white',
    width: 280,
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    elevation: 100,
    zIndex: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  textStyle: {
    fontSize: 18,
    color: 'grey',
  },
  coupledButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 95,
  },
});
