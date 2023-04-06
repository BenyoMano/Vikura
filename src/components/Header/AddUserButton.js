import React, { useState } from 'react';
import {View, Pressable, StyleSheet, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';

const AddUserButton = props => {
  const {btnContainerStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const buttonRotate = animatedValue.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: ['0deg', '-20deg', '20deg'],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  const animatedRotateStyle = {
    transform: [{rotateZ: buttonRotate}],
  }

  return (
    <View style={{
      borderRadius: 10,
      overflow: 'hidden'
      }}>
      <Pressable 
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={btnContainerStyle}
      // android_ripple={{color: '#b5dfb7'}}
      >
        <Animated.View style={[animatedRotateStyle]}>
          <Icon name="adduser" type="antdesign" color="black" size={35} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 65,
    height: 59,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#166C1B',
    justifyContent: 'center',
    // backgroundColor: '#b5dfb7'
  },
});

export default AddUserButton;
