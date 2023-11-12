import React, {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Pressable, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSpinAnimation} from './SpinAnimation';
import {showMessage} from 'react-native-flash-message';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {useSuccessFailAnim} from './useSuccessFailAnim';
import {useIntroOutroAnim} from './useIntroOutroAnim';
import {
  useDynamicErrorHandling,
  useGeneralErrorHandling,
} from './errorHandling';

const DeleteUserButton = ({
  closingModal,
  setClosingModal,
  modalVisible,
  setModalVisible,
  clientId,
}) => {
  const [delFinished, setDelFinished] = useState('initial');
  const animatedValue1 = new Animated.Value(0);
  const [animatedValue3, setAnimatedValue3] = useState(new Animated.Value(0));
  const [animatedValue4, setAnimatedValue4] = useState(new Animated.Value(0));

  const [clipboardString, setClipboardString] = useClipboard();
  const [isRunning, setIsRunning] = useState(false);
  const {buttonRotatePressOut} = useSpinAnimation({isRunning});
  const {animatedTranslateStyle} = useIntroOutroAnim({
    closingModal,
    modalVisible,
    setModalVisible,
  });
  const {animatedColorStyleFailed, animatedColorStyleSuccess} =
    useSuccessFailAnim({delFinished, closingModal, setClosingModal});
  const operationsCount = useRef(0);

  const handlePress = async () => {
    // setClipboardString(clientId);
    // const fetchRoomName = await firestore()
    //   .collection('rooms')
    //   .where('users.client.id', '==', clientId)
    //   .get();

    // const docID = fetchRoomName.docs[0].id;
    // const db = fetchRoomName.docs[0].ref.collection('messages');

    try {
      try {
        // await db.get().then(querySnapshot => {
        //   querySnapshot.forEach(element => {
        //     element.ref.delete();
        //   });
        // });
        // throw new Error('DOuba');
        operationsCount.current += 1;
      } catch (error) {
        let subject = 'meddelanden';
        useDynamicErrorHandling({error, clientId, subject, setDelFinished});
      }
      try {
        // await firestore().collection('rooms').doc(docID).delete();
        operationsCount.current += 1;
      } catch (error) {
        let subject = 'chatt-rummet';
        useDynamicErrorHandling({error, clientId, subject, setDelFinished});
      }
      try {
        // await firestore().collection('Users').doc(clientId).delete();
        operationsCount.current += 1;
      } catch (error) {
        let subject = 'användarprofilen';
        useDynamicErrorHandling({error, clientId, subject, setDelFinished});
      }
      if (operationsCount.current === 3) {
        setDelFinished('success');
      } else {
        setTimeout(() => {
          setIsRunning(false);
        }, 100);
      }
    } catch (error) {
      setIsRunning(false);
      useGeneralErrorHandling({error, setDelFinished});
    }
  };

  const buttonRotatePressIn = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '30deg'],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    setIsRunning(true);
  };

  const animatedRotateStylePressIn = {
    transform: [
      {rotateZ: buttonRotatePressIn},
      {rotateZ: buttonRotatePressOut},
    ],
  };

  return (
    <Animated.View
      style={[
        animatedTranslateStyle,
        delFinished === 'success'
          ? animatedColorStyleSuccess
          : animatedColorStyleFailed,
      ]}>
      <Pressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Animated.View style={[animatedRotateStylePressIn]}>
          <Icon name="trash-outline" type="ionicon" size={24} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default DeleteUserButton;
