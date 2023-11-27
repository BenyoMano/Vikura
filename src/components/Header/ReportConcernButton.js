import React from 'react';
import {View, Pressable, StyleSheet, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';

const Button = props => {
  const {buttonContainerStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const buttonRotate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-20deg', '20deg'],
  });

  const handlePressInAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const animatedRotateStyle = {
    transform: [{rotateZ: buttonRotate}],
  };

  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable
        onPress={props.onPress}
        onPressIn={handlePressInAnimation}
        onPressOut={handlePressOutAnimation}
        style={buttonContainerStyle}>
        <Animated.View style={[animatedRotateStyle]}>
          <Icon name="warning" type="antdesign" color="#d12304" size={28} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 0,
    borderColor: 'black',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});

export default Button;
