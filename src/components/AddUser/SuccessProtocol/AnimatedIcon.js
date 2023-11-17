import React from 'react';
import {Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSuccessFailAnim} from './useSuccessFailAnim';
import {useState} from 'react';
import {Easing} from 'react-native';
import {useEffect} from 'react';

export const AnimatedIcon = ({
  animatedIconObject,
  successProtocol,
  allActionsFinished,
}) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const successFailAnimStyling = {
    iconSize: 35,
    elevation: 5,
  };
  const {actionFinished, name, type, color, size} = animatedIconObject;

  const {animatedColorStyleFailed, animatedColorStyleSuccess} =
    useSuccessFailAnim({
      actionFinished,
      successFailAnimStyling,
    });

  const introAnim = Animated.sequence([
    Animated.delay(300),
    Animated.timing(animatedValue, {
      toValue: 1,
      easing: Easing.linear,
      duration: 400,
      useNativeDriver: false,
    }),
  ]);
  const outroAnim = Animated.timing(animatedValue, {
    toValue: 0,
    easing: Easing.linear,
    duration: 100,
    useNativeDriver: false,
  });

  const opacityStyle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const visibilityStyle = {
    opacity: opacityStyle,
  };

  useEffect(() => {
    if (successProtocol) {
      introAnim.start();
    }
    if (allActionsFinished) {
      setTimeout(() => {
        introAnim.stop();
        outroAnim.start(() => animatedValue.setValue(0));
      }, 1200);
    }
    return () => {
      introAnim.stop();
      outroAnim.stop();
    };
  }, [successProtocol, allActionsFinished]);

  return (
    <Animated.View
      style={[
        visibilityStyle,
        actionFinished === 'success'
          ? animatedColorStyleSuccess
          : animatedColorStyleFailed,
      ]}>
      <Icon
        name={String(name)}
        type={String(type)}
        color={String(color)}
        size={size}
      />
    </Animated.View>
  );
};
