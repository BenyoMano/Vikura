import React from 'react';
import { Easing } from 'react-native';
import { Animated } from 'react-native';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const LogoutButton = props => {
  const {btnContainerStyle, rightSideStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const buttonTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
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

  const animatedTransform = {
    transform: [{translateX: buttonTranslate}],
    zIndex: 3,
  }

  return (
    <View style={btnContainerStyle}>
      <Pressable
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{flexDirection: 'row', alignItems: 'center'}}
      >
        <Animated.View style={[animatedTransform]}>
          <Icon name="arrow-back" type="ionicon" color="black" size={30} />
        </Animated.View>
        <View style={rightSideStyle}>
        </View>
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
