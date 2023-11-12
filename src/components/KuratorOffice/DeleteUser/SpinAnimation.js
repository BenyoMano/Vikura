import {useEffect} from 'react';
import {Animated, Easing} from 'react-native';

export const useSpinAnimation = ({isRunning}) => {
  const animatedValue = new Animated.Value(0);

  const anim = Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 900,
        easing: Easing.elastic(1.1),
        useNativeDriver: false,
      }),
      Animated.delay(500),
    ]),
  );

  const buttonRotatePressOut = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-200deg', '-360deg'],
  });

  const startAnimation = () => {
    anim.start();
  };

  const stopAnimation = () => {
    animatedValue.setValue(0);
    anim.stop();
  };

  useEffect(() => {
    if (isRunning) {
      startAnimation();
    }

    if (!isRunning) {
      stopAnimation();
    }
    return () => anim.stop();
  }, [isRunning, anim]);

  return {buttonRotatePressOut};
};
