import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {Pressable, StyleSheet, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';

const Button = ({closingModal, clientId}) => {
  const {btnContainerStyle} = styles;
  const [delFinished, setDelFinished] = useState(false);
  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);
  const [animatedValue3, setAnimatedValue3] = useState(new Animated.Value(0));
  const [animatedValue4, setAnimatedValue4] = useState(new Animated.Value(0));
  const [animatedValue5, setAnimatedValue5] = useState(new Animated.Value(0));
  const [animatedValue6, setAnimatedValue6] = useState(new Animated.Value(0));

  const handlePress = async () => {
    setDelFinished(false);
    console.log(clientId);
    const fetchRoomName = await firestore()
      .collection('rooms')
      .where('users.client.id', '==', clientId)
      .get();

    const docID = fetchRoomName.docs[0].id;
    const db = fetchRoomName.docs[0].ref.collection('messages');

    try {
      try {
        await db.get().then(querySnapshot => {
          querySnapshot.forEach(element => {
            element.ref.delete();
            console.log('Successfully deleted messages!');
          });
        });
      } catch (error) {
        console.error('Error deleting messages: ', error);
      }
      try {
        await firestore().collection('rooms').doc(docID).delete();
        console.log('Room successfully deleted!');
        setDelFinished(true);
      } catch (error) {
        console.error('Error deleting room: ', error);
      }
      try {
        await firestore().collection('Users').doc(clientId).delete();
        console.log('User successfully deleted!');
      } catch (error) {
        console.error('Error deleting user: ', error);
      }
    } catch (error) {
      console.error('Error in deleting sequence: ', error);
    }
  };

  const buttonRotatePressIn = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '30deg'],
  });
  const buttonRotatePressOut = animatedValue2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-240deg', '-360deg'],
  });
  const buttonTranslate = animatedValue3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-15, -15, 0],
  });
  const buttonOpacity = animatedValue4.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.0, 1],
  });
  const buttonFinishedColor = animatedValue5.interpolate({
    inputRange: [0, 0.9, 1],
    outputRange: ['black', 'lightgreen', 'black'],
  });
  const buttonFinishedBorderWidth = animatedValue6.interpolate({
    inputRange: [0, 0.9, 1],
    outputRange: [1.5, 3, 1.5],
  });

  useEffect(() => {
    Animated.timing(animatedValue3, {
      toValue: 1,
      duration: 380,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedValue4, {
      toValue: 1,
      duration: 380,
      useNativeDriver: false,
    }).start();
  }, []);

  if (closingModal) {
    Animated.timing(animatedValue3, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedValue4, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }
  if (delFinished) {
    animatedValue5.setValue(0);
    animatedValue6.setValue(0);
    Animated.timing(animatedValue5, {
      toValue: 1,
      easing: Easing.linear,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedValue6, {
      toValue: 1,
      easing: Easing.linear,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  const onPressIn = () => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    animatedValue2.setValue(0);
    animatedValue1.setValue(0);
    Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const animatedRotateStylePressIn = {
    transform: [
      {rotateZ: buttonRotatePressIn},
      {rotateZ: buttonRotatePressOut},
    ],
  };

  const animatedTranslateStyle = {
    transform: [{translateY: buttonTranslate}],
    opacity: buttonOpacity,
  };

  const animatedColorStyle = {
    borderColor: buttonFinishedColor,
    borderWidth: buttonFinishedBorderWidth,

    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: 30,
  };

  return (
    <Animated.View style={[animatedTranslateStyle, animatedColorStyle]}>
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

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 45,
    height: 45,
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: 30,
  },
});

export default Button;
