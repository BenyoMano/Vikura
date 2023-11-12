import {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';

export const useSuccessFailAnim = ({
  delFinished,
  closingModal,
  setClosingModal,
}) => {
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));

  const anim1 = Animated.timing(animatedValue1, {
    toValue: 1,
    easing: Easing.linear,
    duration: 1500,
    useNativeDriver: false,
  });

  const anim2 = Animated.timing(animatedValue2, {
    toValue: 1,
    easing: Easing.linear,
    duration: 2000,
    useNativeDriver: false,
  });

  const buttonSuccessColor = animatedValue1.interpolate({
    inputRange: [0, 0.1, 0.6, 1],
    outputRange: ['black', 'lightgreen', 'lightgreen', 'black'],
  });
  const buttonFailedColor = animatedValue2.interpolate({
    inputRange: [0, 0.1, 0.7, 1],
    outputRange: ['black', 'red', 'red', 'black'],
  });

  const animatedColorStyleFailed = {
    borderColor: buttonFailedColor,
    borderWidth: 1.5,
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: 30,
  };
  const animatedColorStyleSuccess = {
    borderColor: buttonSuccessColor,
    borderWidth: 1.5,
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: 30,
  };

  useEffect(() => {
    if (delFinished === 'success') {
      anim1.start();
      setTimeout(() => {
        setClosingModal(!closingModal);
      }, 400);
    }
    if (delFinished === 'failed') {
      anim2.start();
    }
    return () => {
      anim1.stop();
      anim2.stop();
    };
  }, [delFinished, anim1, anim2]);

  return {animatedColorStyleFailed, animatedColorStyleSuccess};
};
