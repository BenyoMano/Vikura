import React, {useEffect, useState} from 'react';
import {Animated, Easing, Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import {SettingsLevel} from './UserSettingsScreen';

type BackArrowProps = {
  setSettingsLevel: React.Dispatch<React.SetStateAction<SettingsLevel>>;
  setShowBackArrow: React.Dispatch<React.SetStateAction<boolean>>;
};

const BackArrow = ({setSettingsLevel, setShowBackArrow}: BackArrowProps) => {
  const [animatedValue1, setAnimatedValue] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));

  const slideInAnim = Animated.timing(animatedValue1, {
    toValue: 1.5,
    duration: 200,
    easing: Easing.elastic(1.1),
    useNativeDriver: true,
  });
  const rotateOutAnim = Animated.timing(animatedValue2, {
    toValue: 1,
    duration: 200,
    easing: Easing.elastic(1.1),
    useNativeDriver: true,
  });
  const pressInAnim = Animated.timing(animatedValue1, {
    toValue: 0.5,
    duration: 200,
    easing: Easing.elastic(1.1),
    useNativeDriver: true,
  });

  const slideInInterpolate = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });
  const rotateOutInterpolate = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  const fadeInOpacity = animatedValue1.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 1],
  });
  const fadeOutOpacity = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const combinedOpacity = Animated.add(
    fadeInOpacity,
    fadeOutOpacity,
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  const animatedSlideInStyle = {
    transform: [
      {translateX: slideInInterpolate},
      {rotateZ: rotateOutInterpolate},
    ],
  };

  const onPress = () => {
    animatedValue2.setValue(0);
    rotateOutAnim.start(() => setShowBackArrow(false));
    setSettingsLevel('settings');
  };
  const onPressIn = () => {
    pressInAnim.start();
  };
  const onPressOut = () => {
    slideInAnim.start();
  };

  useEffect(() => {
    slideInAnim.start();
    return () => {
      slideInAnim.stop();
    };
  }, [slideInAnim]);

  return (
    <Animated.View
      style={[
        animatedSlideInStyle,
        {
          opacity: combinedOpacity,
        },
      ]}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Icon name="chevron-left" type="octicon" color="black" size={32} />
      </Pressable>
    </Animated.View>
  );
};

export default BackArrow;
