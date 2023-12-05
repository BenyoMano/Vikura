import {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';

type SuccessFailAnimProps = {
  actionFinished: 'success' | 'failed';
  successFailAnimStyling: {
    iconSize: number;
    elevation: number;
  };
};

export const useSuccessFailAnim = ({
  actionFinished,
  successFailAnimStyling,
}: SuccessFailAnimProps) => {
  const {iconSize, elevation} = successFailAnimStyling;
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));

  const anim1 = Animated.timing(animatedValue1, {
    toValue: 1,
    easing: Easing.bounce,
    duration: 500,
    useNativeDriver: false,
  });

  const anim2 = Animated.timing(animatedValue2, {
    toValue: 1,
    easing: Easing.bounce,
    duration: 500,
    useNativeDriver: false,
  });

  const buttonSuccessColor = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#5CB85C'],
  });
  const buttonFailedColor = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#D9534F'],
  });

  const animatedColorStyleFailed = {
    borderColor: buttonFailedColor,
    borderWidth: 2.5,
    width: iconSize + 21 || 45,
    height: iconSize + 21 || 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: elevation || 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  };
  const animatedColorStyleSuccess = {
    borderColor: buttonSuccessColor,
    borderWidth: 2.5,
    width: iconSize + 21 || 45,
    height: iconSize + 21 || 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: elevation || 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  };

  useEffect(() => {
    if (actionFinished === 'success') {
      anim1.start();
    }
    if (actionFinished === 'failed') {
      anim2.start();
    }
    return () => {
      anim1.stop();
      anim2.stop();
    };
  }, [actionFinished, anim1, anim2]);

  return {animatedColorStyleFailed, animatedColorStyleSuccess};
};
