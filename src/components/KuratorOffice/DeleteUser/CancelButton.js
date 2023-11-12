import React, {useEffect} from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';

const CancelButton = ({
  closingModal,
  setClosingModal,
  modalVisible,
  setModalVisible,
}) => {
  const {btnContainerStyle} = styles;
  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);
  const [animatedValue3, setAnimatedValue3] = useState(new Animated.Value(0));
  const [animatedValue4, setAnimatedValue4] = useState(new Animated.Value(0));

  const onPressFn = () => {
    setClosingModal(true);
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 120);
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

  useEffect(() => {
    Animated.timing(animatedValue3, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedValue4, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, []);

  if (closingModal) {
    Animated.timing(animatedValue3, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedValue4, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }

  const onPressIn = () => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    animatedValue2.setValue(0);
    animatedValue1.setValue(0);
    Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
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

  return (
    <Animated.View style={[animatedTranslateStyle]}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPressFn}
        style={btnContainerStyle}>
        <Animated.View style={[animatedRotateStylePressIn]}>
          <Icon name="undo" type="material-icons" size={24} />
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
    borderColor: 'black',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: 30,
  },
});

export default CancelButton;
