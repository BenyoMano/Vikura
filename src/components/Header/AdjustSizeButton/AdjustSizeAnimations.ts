import {Animated, Easing} from 'react-native';
import {Path} from 'react-native-svg';

export const animatedValue = new Animated.Value(0);
export const AnimatedPath = Animated.createAnimatedComponent(Path);

export const pathInterpolation = animatedValue.interpolate({
  inputRange: [0, 1],
  outputRange: [
    'M3 17V19H10V17H3ZM3 5V7H14V5H3ZM13 21V15H11V21H13M14 19H21V17H14ZM7 9V15H9V9H7M6 13H3V11H6ZM21 13V11H10V13H21M15 9H17V3H15V9M18 5V7 7H21V5H18',
    'M3 17V19H5V17H3ZM3 5V7H7V5H3ZM8 21V15H6V21H8M9 19H21V17H9ZM15 9V15H17V9H15M14 13H3V11H14ZM21 13V11H18V13H21M8 9H10V3H8V9M11 5V7 7H21V5H11',
  ],
});

export const pressAnim = Animated.timing(animatedValue, {
  toValue: 1,
  duration: 50,
  easing: Easing.linear,
  useNativeDriver: true,
});
export const pressInAnim1 = Animated.timing(animatedValue, {
  toValue: 0.25,
  duration: 25,
  easing: Easing.linear,
  useNativeDriver: true,
});
export const pressInAnim2 = Animated.timing(animatedValue, {
  toValue: 0.75,
  duration: 25,
  easing: Easing.linear,
  useNativeDriver: true,
});
export const pressOutAnim1 = Animated.timing(animatedValue, {
  toValue: 0,
  duration: 50,
  easing: Easing.linear,
  useNativeDriver: true,
});
export const pressOutAnim2 = Animated.timing(animatedValue, {
  toValue: 1,
  duration: 50,
  easing: Easing.linear,
  useNativeDriver: true,
});
