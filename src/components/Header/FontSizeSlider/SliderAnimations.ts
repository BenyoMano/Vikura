import {Animated, Easing} from 'react-native';

export const animatedValue1 = new Animated.Value(0);
export const animatedValue2 = new Animated.Value(0);
export const animatedValue3 = new Animated.Value(0);

export const rotateInAnim = Animated.timing(animatedValue1, {
  toValue: 1,
  duration: 50,
  useNativeDriver: true,
});

export const rotateOutAnim = Animated.timing(animatedValue1, {
  toValue: 0,
  duration: 50,
  useNativeDriver: true,
});

export const rotatePressedAnim = Animated.timing(animatedValue2, {
  toValue: 1,
  duration: 200,
  useNativeDriver: true,
});

export const introAnim = Animated.timing(animatedValue3, {
  toValue: 1,
  duration: 300,
  easing: Easing.elastic(1.5),
  useNativeDriver: true,
});

export const outroAnim = Animated.timing(animatedValue3, {
  toValue: 0,
  duration: 75,
  useNativeDriver: true,
});

export const buttonRotatePressIn = animatedValue1.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '60deg'],
});

export const buttonRotatePress = animatedValue2.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '-360deg'],
});

export const componentOpacity = animatedValue3.interpolate({
  inputRange: [0.5, 1],
  outputRange: [0, 1],
});

export const componentTranslate = animatedValue3.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 20],
});
