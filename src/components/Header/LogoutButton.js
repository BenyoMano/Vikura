import React from 'react';
import { Easing } from 'react-native';
import { Animated } from 'react-native';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import { Circle, Polygon, Polyline, Svg } from 'react-native-svg';

const LogoutButton = props => {
  const {btnContainerStyle, rightSideStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const arrowTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });
  const doorTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  const animatedArrowTransform = {
    transform: [{translateX: arrowTranslate}],
    zIndex: 2,
  }
  const animatedDoorTransform = {
    transform: [{translateX: doorTranslate}],
    zIndex: 1,
  }

  return (
    <View style={btnContainerStyle}>
      <Pressable
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{flexDirection: 'row', alignItems: 'center'}}
      >
        <Animated.View style={[animatedArrowTransform]}>
          <Icon name="arrow-back" type="ionicon" color="black" size={30} />
        </Animated.View>
        <Animated.View style={[animatedDoorTransform, rightSideStyle]}>
        </Animated.View>
        {/* <Svg height={50} width={40}>
          <Polyline points="35,10 5,10 5,45 35,45 35,10" fill="none" stroke="black" strokeWidth="2" />
          <Polyline points="5,18 5,38" fill="none" stroke="white" strokeWidth="3" />
          <Polygon points="11,8 11,47 35,45 35,10" fill="black" stroke="black" strokeWidth="2" />
          <Circle cx="16" cy="27" r="2" fill="white" strokeWidth="2" />
          <Polygon points="20,5 20,50 35,45 35,10" fill="black" stroke="black" strokeWidth="2" />
          <Circle cx="25" cy="28" r="2" fill="white" strokeWidth="2" />
        </Svg> */}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    borderRadius: 10,
    overflow: 'visible',
  },
  rightSideStyle: {
    left: -20,
    width: 35,
    height: 50,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 10,
    borderLeftColor: 'white',
    borderRadius: 10,
    // borderColor: 'black',
    justifyContent: 'center',
  },
});

export default LogoutButton;
