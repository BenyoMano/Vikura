import React, {useEffect, useState} from 'react';
import {Easing} from 'react-native';
import {Animated} from 'react-native';
import {Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const LogoutButton = ({setMessageLimit, closeAdjustButtons}) => {

  const {btnContainerStyle} = styles;
  const animatedValue1 = new Animated.Value(0);
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));
  const [animatedValue3, setAnimatedValue3] = useState(new Animated.Value(0));
  
  const arrowDownTranslate = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 2],
  });
  const arrowUpTranslate = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [2, -2],
  });
  const buttonTranslate = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [-75, 0]
  });
  const buttonOpacity = animatedValue3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1]
  });


  useEffect(() => {
    Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedValue3, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [])

  if (closeAdjustButtons) {
    Animated.timing(animatedValue2, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedValue3, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  const onPressIn = () => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animatedValue1, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const animatedArrowDownTransform = {
    transform: [{translateY: arrowDownTranslate}],
    zIndex: 1,
  };
  const animatedArrowUpTransform = {
    transform: [{translateY: arrowUpTranslate}],
    zIndex: 1,
  };
  const animatedTranslateStyle = {
    transform: [{translateY: buttonTranslate}],
    opacity: buttonOpacity,
  };

  return (
    <Animated.View style={[animatedTranslateStyle]}>
      <Pressable
        onPress={ () => {
          setMessageLimit(0);
          }
        }
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={btnContainerStyle}>
        <Animated.View style={[animatedArrowDownTransform]}>
          <Icon name="arrow-down" type="ionicon" color="black" size={19} paddingTop={2} />
        </Animated.View>
        <Animated.View style={[animatedArrowUpTransform]}>
          <Icon name="arrow-up" type="ionicon" color="black" size={19} paddingBottom={2} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 45,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    elevation: 30,
  },
});

export default LogoutButton;
