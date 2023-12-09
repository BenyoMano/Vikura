import {useState} from 'react';
import {useEffect} from 'react';
import {Animated, Easing} from 'react-native';

type SpinAnimationProps = {
  isRunning: boolean;
  isPressing: boolean;
};

export const useSpinAnimation = ({
  isRunning,
  isPressing,
}: SpinAnimationProps) => {
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const animatedValue2 = new Animated.Value(0);

  const pressInAnim = Animated.timing(animatedValue1, {
    toValue: 1,
    duration: 150,
    useNativeDriver: false,
  });
  const pressOutAnim = Animated.timing(animatedValue1, {
    toValue: 0,
    duration: 50,
    useNativeDriver: false,
  });

  const spinAnim = Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: 900,
        easing: Easing.elastic(1.1),
        useNativeDriver: false,
      }),
      Animated.delay(500),
    ]),
  );

  const buttonRotatePressIn = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '30deg'],
  });
  const buttonRotatePressOut = animatedValue2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-200deg', '-360deg'],
  });

  const animatedRotateStylePressIn = {
    transform: [
      {rotateZ: buttonRotatePressIn},
      {rotateZ: buttonRotatePressOut},
    ],
  };

  const startAnimation = () => {
    spinAnim.start();
  };

  const stopAnimation = () => {
    animatedValue2.setValue(0);
    spinAnim.stop();
  };

  useEffect(() => {
    if (isPressing) {
      pressInAnim.start();
    }

    if (!isPressing) {
      pressOutAnim.start();
      setTimeout(() => {
        animatedValue1.setValue(0);
        pressInAnim.stop();
        pressOutAnim.stop();
      }, 100);
    }

    return () => {
      pressInAnim.stop();
      pressOutAnim.stop();
    };
  }, [isPressing, animatedValue1]);

  useEffect(() => {
    if (isRunning) {
      startAnimation();
    }

    if (!isRunning) {
      stopAnimation();
    }
    return () => spinAnim.stop();
  }, [isRunning, spinAnim]);

  return {animatedRotateStylePressIn};
};
